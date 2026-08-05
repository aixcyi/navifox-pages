---
navTitle: 字典中，键的顺序
title: Python 字典中，键的顺序
createAt: 2023-12-21 10:02
expires: 3650
tags:
    - 测试
    - 兼容
    - Python
    - 数组 集合 映射
excerpt:
    '`dict` 里的键原本是无序排列的，后来改成有序的了。'
---

<style scoped>
.VPDoc p:not(.custom-block-title) {
    text-indent: 2em;
}
</style>

## `dict`

从 3.7 版本开始，字典的键是按插入顺序排列的，从 [`dict.popitem()`](https://docs.python.org/zh-cn/3/library/stdtypes.html#dict.popitem) 的注释可以看到是后进先出（LIFO）。另外，`update()` 不会影响键的顺序。

[3.6 版本](https://docs.python.org/zh-cn/3/whatsnew/3.6.html#pep-520-preserving-class-attribute-definition-order)开始，函数签名中的 `**kwargs` 现在将保证是一个保留插入顺序的映射对象（[**PEP 468**](https://peps.python.org/pep-0468/)）；另外 [`__dict__`](https://docs.python.org/zh-cn/3/library/stdtypes.html#object.__dict__) 属性中关于当前类的属性的key会按照代码定义顺序来排序。

> [!IMPORTANT] 注意！
> [`set`](https://docs.python.org/zh-cn/3/library/stdtypes.html#set-types-set-frozenset) 的元素从始自终都是无序的。

## `OrderedDict`

像 Django 这样在 3.7 版本之前就已经发行的 Web 框架一般使用标准库 collections 的 [`OrderedDict`](https://docs.python.org/zh-cn/3/library/collections.html#ordereddict-objects) 来封装 JSON 等，来确保返回时的数据顺序与前端收到的一致。

> [!NOTE] 备注
> 这个得 3.1+ 版本才有。

`OrderedDict` 与 `dict` 在使用上几乎没有区别，除了在 `==` 比较时，前者会比较键的顺序，比如 `OrderedDict(z=1,a=2) == OrderedDict(a=2,z=1)` 求值为 `False` ，而用 `dict` 构造的字典则不会出现这种情况。

不过它的 representation 会按照键值对列表的格式输出，比如 `OrderedDict(z=1,a=2)` 会显示为 `OrderedDict([('z', 1), ('a', 2)])` ，debug时不是很友好。

它的 [`popitem()`](https://docs.python.org/zh-cn/3/library/collections.html#collections.OrderedDict.popitem) 默认按后进先出（LIFO）顺序返回键，指定参数 `last=False` 可以改为先进先出（FIFO）返回。

比较值得留意的特性就这些，更多特性请查阅文档。

