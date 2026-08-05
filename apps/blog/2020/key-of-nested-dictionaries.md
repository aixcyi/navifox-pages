---
title: 字典添加二级键值的问题
createAt: 2020-12-19 17:19
expires: 1096
tags:
    - 开发
    - Python
    - 数组 集合 映射
excerpt:
---

<style scoped>
.VPDoc p:not(.custom-block-title) {
    text-indent: 2em;
}
</style>

## 问题来源

分类统计n个带两级分类的数值。

## 解决过程

最简单的办法是直接 `result["一级分类"]["二级分类"] += amount` 。

但是这样会报 `KeyError` 错误，原因是Python只能自动新建一级不存在的键，比如直接 `result["一级分类"] += amount` 是可以的，即使一级分类在累加前不存在。

因此需要确保两级分类先存在，可是这样显然需要 `if "一级分类" not in result` 和 `if "二级分类" not in result["一级分类"]` 并依次进行处理，麻烦了一些。

后来经过测试发现，Python是自动新建**最末尾一级**不存在的键，于是代码可以 `if "一级分类" not in result` 确保第一级存在后直接 `result["一级分类"]["二级分类"] += amount`。

对于有限层的字典，可以像这样确保更新时所有层级都存在。虽然有些冗长，但这是最省事的实现。

```python :line-numbers
dataset = dict()

def update(first: str, second: str, third: str, fourth: str, /, value=None):
    if first not in dataset:
        dataset[first] = dict()
    if second not in dataset[first]:
        dataset[first][second] = dict()
    if third not in dataset[first][second]:
        dataset[first][second][third] = dict()
    dataset[first][second][third][fourth] = value
```

