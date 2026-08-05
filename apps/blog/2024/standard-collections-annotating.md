---
title: 标准多项集的标注方式
createAt: 2024-01-31 17:13
expires: 3650
tags:
    - 开发
    - 语法特性
    - Python
    - 类型系统
    - 数组 集合 映射
excerpt:
    列表、元组、集合、字典的正确类型标注方式，细节可参阅
    [**PEP 484**](https://peps.python.org/pep-0484/#the-typing-module)。
---

> [!NOTE] 备注
> Python 3.9 之前，内置数据类型不支持下标操作，像 `list[]` 要用 `typing.List[]` 代替，其余类型同理。但如果需要跨版本，可以用 `from __future__ import annotations` 实现向前兼容。

## 列表、集合、不可变集合 {#set}

标注时只提供一个参数：

```python
list01: list[int] = []
list02: list[int] = [0]
list03: list[int] = [0, 1, 2, -1]

set01: set[int] = set()
set02: set[int] = {0}
set03: set[int] = {0, 1, 2, -1}
```

对于多种类型，需要通过 `typing.Union[A, B]` 或者 `A | B` 的形式进行联合：

```python
list04: list[int | str] = []
list05: list[int | str] = [0]
list06: list[int | str] = ["meow"]
list07: list[int | str] = [0, "meow", 1, 2]

set04: set[int | str] = set()
set05: set[int | str] = {0}
set06: set[int | str] = {"meow"}
set07: set[int | str] = {0, "meow", 1, 2}
```

对于任意类型，两种标注是等价的：

```python
import typing

list08: list = [0, "meow", 1, 2]
list09: list[typing.Any] = [0, "meow", 1, 2]

set08: set = {0, "meow", 1, 2}
set09: set[typing.Any] = {0, "meow", 1, 2}
```

## 字典 {#map}

字典的标注只使用两个参数，第一个表示键的类型，第二个表示值的类型。

```python
dict01: dict[int, str] = {}
dict02: dict[int, str] = {200: "OK"}
dict03: dict[int, str] = {200: "OK", 404: "Not Found"}
```

对于多种类型，需要通过 `typing.Union[A, B]` 或者 `A | B` 的形式进行联合，类似于[列表](#set)。

对于任意键值类型，以下两种标注是等价的：

```python
import typing

dict04: dict = {200: "OK", "OK": 200}
dict05: dict[typing.Any, typing.Any] = {200: "OK", "OK": 200}
```

## 元组 {#tuple}

元组的标注与实际值需要一一对应：

```python
tuple01: tuple[()] = ()
tuple02: tuple[int] = (0,)
tuple03: tuple[int, int] = (0, 1)
tuple04: tuple[int, int, str] = (0, 1, "meow")
tuple05: tuple[int, int, str, int] = (0, 1, "meow", 2)
```

对于任意长度的值，需要按照 `tuple[TYPE, ...]` 的形式进行标注：

> [!IMPORTANT] 重要
> 类型标注中的 `...` 表示重复前一个类型零次、一次或多次。

```python
tuple06: tuple[int, ...] = ()
tuple07: tuple[int, ...] = (0, 1)
tuple08: tuple[int, ...] = (0, 1, 2)
```

对于多种类型的任意长度元组，需要通过 `typing.Union[A, B]` 或者 `A | B` 的形式进行联合：

```python
tuple09: tuple[int | str, ...] = (0, 1, "meow", 2)
```

对于任意类型的任意长度元组，以下两种标注是等价的：

```python
import typing

tuple0A: tuple = (0, 1, "meow", 2)
tuple0B: tuple[typing.Any, ...] = (0, 1, "meow", 2)
```
