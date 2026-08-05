---
title: 避免 Decimal 溢出
createAt: 2025-01-14 14:49
expires: 1096
tags:
    - DRF
    - 开发
    - 序列化
    - 测试
    - Python
    - Django
    - 小数
excerpt:
    后端使用 Decimal 时，前端应当配合传递 string 而非 number，否则会从数据源就可能出现过长的小数，导致排查链路过长或者问题反复出现。
---

## 背景交代

::: details 概念
**二进制小数**

最早在计算机中表示数学上的小数的类型，一般语言都会内置的类型之一，不能够精确表示一个小数。

**十进制小数**

能够精确表示一个小数的类型，通常需要引入语言的标准库或第三方库才能使用。

**浮点数**

小数长度可以变化的小数类型，比如 `0.5 / 2 = 0.25` 中的小数由两位数变为三位数，一般用于运算。

**定点数**

小数长度不可以变化的小数类型，一般用于存储。
:::

`float` 以及其它语言中的 `double` 是二进制小数，没办法精确地表达数学上的“小数”，比如

```python
print(0.1 + 0.2)
# 打印 0.30000000000000004

print(0.1 + 0.2 == 0.3)
# 打印 False
```

因此后来有了十进制小数，在 Python 中用 [`Decimal`](https://docs.python.org/zh-cn/3/library/decimal.html) 存储。

```python
from decimal import Decimal

print(Decimal('0.1') + Decimal('0.2'))
# 打印 Decimal('0.3')

print(Decimal('0.1') + Decimal('0.2') == Decimal('0.3'))
# 打印 True
```

需要注意的是，从 Python 3.2 开始，`Decimal` 支持 `float` 类型的值作为入参，但无法将其还原为“字面值”。

```python
from decimal import Decimal

print(Decimal(0.3))
# 打印 Decimal('0.299999999999999988897769753748434595763683319091796875')
```

以上，在简单场景下总是可以正确使用。

## 问题初现

项目使用以下技术栈开发

- Python 3.7
- Django 3.2
- Django REST Framework
- Vue 2
- Element

并定义以下模型和序列化器：

```python [models.py]
from django.db import models

class Order(models.Model):
    ...
    discount = models.DecimalField(max_digits=12, decimal_places=2)
    ...
```

```python [serializers.py]
from rest_framework import serializers
from my_app.models import Order

class OrderSerializer(serializers.ModelSerializer):

    class Meta:
        model = Order
        fields = (
            ...
            'discount',
            ...
        )
```

由于历史原因，前端同时使用了 `string` 和 `number` 两种类型传参，但因为是 Python 3.7，因此
`DecimalField` 反序列化的 `Decimal` 都可以接受，再加上项目前期阶段客户并未使用优惠功能，因此一直相安无事。

直到有一天客户为顾客总价 `3324` 的订单打了六折，后端报了一个小数部分超出
[`NUMERIC(12,2)`](https://www.postgresql.org/docs/current/datatype-numeric.html#DATATYPE-NUMERIC-DECIMAL)
的错误。

经过复现排查发现，传到后端的总价 `3324` 和折扣 `0.6` 都是 `float` 类型，相乘后得到的小数超出了 `NUMERIC(12,2)` 的范围：

```python
from decimal import Decimal

print(Decimal(3324 * 0.6))
# 打印 Decimal('1994.399999999999863575794734060764312744140625')
```

## 修复之路

首先尝试用 `Decimal` 包住前端传值，但发现仍然溢出

```python
from decimal import Decimal

print(Decimal(3324) * Decimal(0.6))
# 打印 Decimal('1994.399999999999926192373323')
```

于是再包了一层 `str`，问题得到缓解：

```python
from decimal import Decimal

print(Decimal(str(3324)) * Decimal(str(0.6)))
# 打印 Decimal('1994.4')
```

为什么说是缓解呢？因为后来系统又陆续报告了大量超出 `NUMERIC(12,2)` 范围的异常。因为用
`str` 包一层能够解决大部分输入，所以我用来封装了
`Decimal` 的构造，但这种方法只能针对一次传值、也就是直接包装前端传的值，不能应对二次计算、就是说在后端经过计算的结果，因而无法形成通用的解决方案。

```python
from decimal import Decimal

print(Decimal(str(3324 * 0.6)))
# 打印 Decimal('1994.3999999999999')
```

也就是说，最优的解决方案其实还是让前端传递 `string` 而非 `number` 类型的值，这样后端就可以确保在数据源即可拿到精确地小数，后续也不用再为小数溢出的问题进行舍入，从而把系统逻辑复杂化。
