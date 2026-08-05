---
title: 针对不同对象抛出不同 KeyError
outline: deep
createAt: 2025-05-31 22:26
expires: 1096
tags:
    - 开发
    - Python
    - 类型系统
    - 数组 集合 映射
excerpt:
    '在有些情况下，你可能需要在访问 **不同的字典对象** 时抛出不同的 `KeyError` 来进行不同的提示。'
---

## 问题来源

有一个 Django 项目下的订单工具类，用于各种场景下订单相关要素（例如价格和库存）的校验。

在 Django ORM 模型中，直接访问外键字段就可以很方便地得到对应的模型实例，但访问时也可能会触发一次额外的 SQL
查询，因此这个工具类在设计时通过提供“外键ID-模型实例”的方式来避免这一点。

而查询过程中，可能会有“外键ID”存在但“模型实例”不存在的情况，因此需要捕获
`KeyError`，但同时又希望对不同“外键ID-模型实例”的 `KeyError` 给出不同的提示。

于是乎，我需要在访问 **不同的字典对象** 时抛出不同的 `KeyError` 来进行不同的提示。

## 解决方案

没有现成可用的解决方案，需要手动定制一个
[`UserDict`](https://docs.python.org/zh-cn/3/library/collections.html#collections.UserDict) 来实现。

`UserDict.__getitem__()` 的逻辑是 key 不存在于 `self.data` 中的话就访问 **类** 的 `__missing__()`，但由于需要针对不同的 **对象** 抛出不同的
`KeyError`，因此需要继承修改它的 `__getitem__()`，接着在实例化后 **重写** 每个字典对象的 `__missing__()` 来实现针对不同的对象抛出不同的错误。

```python:line-numbers
from collections import UserDict

class DynamissingDict(UserDict):
    def __getitem__(self, key):
        if key in self.data:
            return self.data[key]
        if hasattr(self, "__missing__"):  # [!code ++]
            return self.__missing__(self, key) # [!code ++]
        if hasattr(self.__class__, "__missing__"):  # [!code --]
            return self.__class__.__missing__(self, key)  # [!code --]
        raise KeyError(key)
```

### 为何用 `UserDict` 而非 `dict`

虽然 `dict` 可以作为父类被继承，但重写 `__getitem__(self, key)` 时无法判断 `key` 是否在字典中，而
[`UserDict`](https://docs.python.org/zh-cn/3/library/collections.html#collections.UserDict) 拥有一个
`data` 属性，可以在重写时进行判断。

其次，而 `dict.__getitem__(self, key)` 在 `key` 不存在时只会抛出 `KeyError`
而不会调用 `__missing__()`，故而无法重写对象上的 `__missing__()` 来实现不同的对象报不同的 `KeyError`。

## 代码示例

```python:line-numbers{24,26} [./apps/oms/tools.py]
from decimal import Decimal

from apps.wms.models import Production, StockKeppingUnit
from apps.oms.models import Order, OrderItem


class OrderChecker:

    def __init__(self,
                 order: Order,
                 items: list[OrderItem],
                 prods: dict[int, Production],
                 skus: dict[int, StockKeppingUnit]):

        def missingProduction(myself, key):
            raise self.ProductionDoesNotExist(prod_id=key)

        def missingSKU(myself, key):
            raise self.SKUDoesNotExist(sku_id=key)

        self.order = order
        self.items = items
        self.prods = DynamissingDict(prods)
        self.prods.__missing__ = missingProduction
        self.skus = DynamissingDict(skus)
        self.skus.__missing__ = missingSKU

    # 小程序下单时，因为不含折扣等，订单总价由后端计算，因此需要一个单独的方法。
    def summarize(self) -> Decimal:
        """
        计算订单内的商品总价。
        
        :return: 包括原价商品和折后商品。
        :raise SKUDoesNotExist: SKU 不存在。
        :raise ProductionDoesNotExist: 商品不存在。
        """
        priceOriginal = sum(
            self.skus[i.sku_id].price
            for i in self.items if not self.prods[i.prod_id].is_discountable
        )
        priceDiscounted = self.order.discount * sum(
            self.skus[i.sku_id].price
            for i in self.items if self.prods[i.prod_id].is_discountable
        )
        return priceOriginal + priceDiscounted

    # 收银台下单时，因为会有折扣、人工改价等，订单总价由前端计算，所以需要一个校验方法。
    def check(self) -> bool:
        """
        判断订单的总价是否与计算的总价相符。

        :return:
        :raise SKUDoesNotExist: SKU 不存在。
        :raise ProductionDoesNotExist: 商品不存在。
        """
        # 这里省去了对人工改价的判断。
        return self.summarize() == self.order.price_total

    class CheckingException(Exception):
        def __init__(self, message: str):
            self.message = message

        def __repr__(self):
            return f'<{self.__class__.__name__} {self.message}>'

    # 附带额外信息用于日志记录
    class ProductionDoesNotExist(KeyError, CheckingException):
        def __init__(self, prod_id: int):
            super().__init__('商品不存在')
            self.prod_id = prod_id

    class SKUDoesNotExist(KeyError, CheckingException):
        def __init__(self, sku_id: int):
            super().__init__('SKU 不存在')
            self.sku_id = sku_id
```
