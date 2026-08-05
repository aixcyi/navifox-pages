---
title: 外键的 id 与实例
createAt: 2025-06-01 01:15
expires: 1096
tags:
    - 开发
    - Django
    - ORM
excerpt:
    '在创建 Django ORM 模型实例时，如果仅向外键字段提供模型实例，或仅提供相应的 `_id` 属性，能否在保存（到数据库）前得到另一属性值？'
---

其实是都可以的，只要是[外键](https://docs.djangoproject.com/zh-hans/5.2/ref/models/fields/#foreignkey)的模型实例，都会自动给相应的
`instance_id` 属性赋予 `Instance().id` 的值，只不过由于新创建、未保存的实例的 `id` 为 `None`，相应的 `instance_id` 也为
`None`；反之，向 `instance_id` 属性赋值之后，访问 `instance` 属性也可以得到模型实例，除非这个 `id` 不存在。

假如有以下模型：

```python:line-numbers
from decimal import Decimal

from django.db import models
from django.contrib.postgres.fields import ArrayField

ZERO = Decimal('0.00')


class Goods(models.Model):
    """
    商品信息。
    """
    title = models.CharField('品名', max_length=100)
    price = models.DecimalField('单价', max_digits=12, decimal_places=2)
    images = ArrayField(models.CharField('配图地址', max_length=100))
    deleted = models.BooleanField(default=False, blank=True)
    available = models.BooleanField(default=True, blank=True)


class Order(models.Model):
    """
    订单信息。
    """
    no_internal = models.CharField('订单号', max_length=40, db_index=True)
    no_tracking = models.CharField('快递单号', max_length=100, default='')
    fee_raw = models.DecimalField('总价', max_digits=12, decimal_places=2)
    fee_due = models.DecimalField('应收', max_digits=12, decimal_places=2, default=ZERO)
    fee_real = models.DecimalField('实收', max_digits=12, decimal_places=2, default=ZERO)
    fee_refund = models.DecimalField('退款', max_digits=12, decimal_places=2, default=ZERO)


class OrderItem(models.Model):
    """
    订单中的商品。
    """
    order = models.ForeignKey(Order, on_delete=models.CASCADE, verbose_name='所在订单')
    goods = models.ForeignKey(Goods, on_delete=models.CASCADE, verbose_name='所购商品')
    quantity = models.IntegerField('所购数量', help_text='负数表示冲正，比如收银台退菜。')
```

## 仅有模型实例

在 **没有保存** 任何模型实例的情况下，访问相应的 `_id` 属性：

```python:line-numbers
from random import randint


prods = {
    prod: randint(1,9)
    for prod in Goods.objects.filter(id__in=[11,22,33,44])
}
order = Order(
    no_internal='CS17900000001',
    fee_raw=sum(p.price for p in prods),
)
items = [
    OrderItem(
        order=order,
        goods=prod,
        quantity=qty,
    )
    for prod, qty in prods.items()
]

print(items[0].order_id)  # 输出 None
print(items[0].goods_id)  # 输出 11
```

## 仅有外键 `id`

如果 `id` 值存在的情况下，可以正常得到模型实例

```python:line-numbers
order = Order(
    no_internal='CS17900000001',
    fee_raw=sum(p.price for p in prods),
)
item = OrderItem(
    order=order,
    goods_id=11,
    quantity=qty,
)

print(item.goods)  # 输出 <Goods: Goods object (11)>
```

而如果 `id` 不存在，则会抛出 `KeyError('goods')` 并连带抛出 `Goods.DoesNotExist` 。

```python:line-numbers
order = Order(
    no_internal='CS17900000001',
    fee_raw=sum(p.price for p in prods),
)
item = OrderItem(
    order=order,
    goods_id=0,
    quantity=qty,
)

print(item.goods)
```

```
Traceback (most recent call last):
  File "/home/navifox/project-x/.venv/lib/site-packages/django/db/models/fields/related_descriptors.py", line 173, in __get__
    rel_obj = self.field.get_cached_value(instance)
  File "/home/navifox/project-x/.venv/lib/site-packages/django/db/models/fields/mixins.py", line 15, in get_cached_value
    return instance._state.fields_cache[cache_name]
KeyError: 'goods'

During handling of the above exception, another exception occurred:

Traceback (most recent call last):
  File "/usr/bin/python3/lib/code.py", line 90, in runcode
    exec(code, self.locals)
  File "<input>", line 1, in <module>
  File "/home/navifox/project-x/.venv/lib/site-packages/django/db/models/fields/related_descriptors.py", line 187, in __get__
    rel_obj = self.get_object(instance)
  File "/home/navifox/project-x/.venv/lib/site-packages/django/db/models/fields/related_descriptors.py", line 154, in get_object
    return qs.get(self.field.get_reverse_related_filter(instance))
  File "/home/navifox/project-x/.venv/lib/site-packages/django/db/models/query.py", line 437, in get
    self.model._meta.object_name
apps.wms.models.DoesNotExist: Goods matching query does not exist.
```
