---
title: 使用乘号复制变量引起的问题
outline: deep
createAt: 2020-12-20 23:29
expired: 1000
tags:
    - 开发
    - Python
    - 浅拷贝
excerpt:
    '`[...] * n` 是浅拷贝，所以尽量避免用来复制对象。'
---

## 问题复现

有N个月的盈亏数据（每个月要么盈利要么亏损），按月份统计盈亏（分开统计是为了看到亏损了多少），使用字典列表 `List[Dict]` 存储，列表下标就是月份，发现结果的每个月的数据都相等。

代码如下：

```python
# 随机生成100个月的盈亏数据（减去0.5是为了模拟亏损）
from random import random
DATA = [random() - 0.5 for _ in range(100)]

# 构造一个累加值容器，分别累计盈利/亏损
counter = [{"income": 0.0, "paid": 0.0}] * 12

# 开始累计
for i in range(len(DATA)):
    counter[i % 12]["income"] += DATA[i] if DATA[i] >= 0 else 0
    counter[i % 12]["paid"] += DATA[i] if DATA[i] <= 0 else 0

# 出现问题
print(counter[0] == counter[11])
```

打印 `counter` 的每个成员，发现数据都一样，所以输出总是为 `True` 。

## 解决过程

### 1、企图解决

最开始对 `{"income": 0.0, "paid": 0.0}` 这个结构体加 `.copy()` 获取深复制的副本，但是无论用什么方法，问题依旧。

```python
counter = [{"income": 0.0, "paid": 0.0}.copy() for _ in range(12)]
```

### 2、初步解决

头疼半天，最后发现是 `[...] * 12` 的问题。原来 `somthing * n` 重复是浅复制，所以导致最后修改的是同一个对象，因此整个列表自然相同。解决方法是将

```python
counter = [{"income": 0.0, "paid": 0.0}] * 12
```

改成

```python
counter = [{"income": 0.0, "paid": 0.0} for _ in range(12)]
```

### 3、问题衍生

但实际上我用了一个变量存储：

```python
STRUCT = {"income": 0.0, "paid": 0.0}
counter = [STRUCT for _ in range(12)]
```

发现问题依旧，于是改成

```python
STRUCT = {"income": 0.0, "paid": 0.0}
counter = [STRUCT.copy() for _ in range(12)]
```

