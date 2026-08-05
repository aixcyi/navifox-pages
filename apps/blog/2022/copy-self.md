---
title: 为自身定义 copy 方法
createAt: 2022-08-17 00:04
expires: 1096
tags:
    - 开发
    - Python
    - 浅拷贝
excerpt:
    一些类自带了 `copy()` 或者用于浅拷贝的方法，比如内置的
    `list`、`dict`、decimal 的 `Decimal`
    等等。如果不借助标准库 copy，可以在 **类体内** 调用自身的 **构造方法** 达到相同目的。
---

<style scoped>
.VPDoc p:not(.custom-block-title) {
    text-indent: 2em;
}
</style>

## 直接调用

```python
class DateRange:
    def __init__(self, start, stop):
        self._start = start
        self._stop = stop
        if not start < stop:
            raise ValueError("开始日期必须早于结束日期")

    def copy(self):
        return DateRange(self._start, self._stop)
```

因为类内的方法是动态加载的，因此在 Python 中，方法内可以直接使用类名而不会被警告“名称未定义”。

这种办法的好处就是输入快，而且易读性很强；但缺点是如果类被继承了，且子类没有重写 `copy` 方法，会导致返回父类，而不是当前的子类。因此可以——

## 间接调用

```python
class DateRange:
    def __init__(self, start, stop):
        self._start = start
        self._stop = stop
        if not start < stop:
            raise ValueError("开始日期必须早于结束日期")

    def copy(self):
        return type(self)(self._start, self._stop)
```

与直接调用的唯一区别是：将 `DateRange()` 改成了 `type(self)()`。

实际上，`DateRange` 是一个“类”对象（而不是实例化后的那个对象），它的类型就是 `type`，而 `type(self)` 得到的正是这个对象，故而 `DateRange()` 等价于 `type(self)()`。

当然，其也等价于被 `@classmethod` 注解后的第一个方法参数—— `cls`。

## 类方法调用

```python
class DateRange:
    def __init__(self, start, stop):
        self._start = start
        self._stop = stop
        if not start < stop:
            raise ValueError("开始日期必须早于结束日期")

    @classmethod
    def operate(cls, start, stop):
        return cls(start, stop)
```

有些情况下，可能需要在类方法中调用自身的构造方法。此时，最方便也最保险的做法是直接使用 `cls()` 构造自身。因为 `cls` 本身会随着子类继承而改变，也无需再用 `type()` 转换，就能得到当前“类”对象。
