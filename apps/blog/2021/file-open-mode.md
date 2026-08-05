---
navTitle: 文件打开模式
title: Python 文件打开模式
createAt: 2021-10-21 00:00
expires: 3650
tags:
    - 开发
    - Python
    - I/O
excerpt:
    内置函数 [`open()`](https://docs.python.org/zh-cn/3/library/functions.html#open) 打开模式这个参数的归纳。
---

## 打开模式

下表改编自 [Stack Overflow](https://stackoverflow.com/a/30931305) 和 [Stack Overflow](https://stackoverflow.com/a/67558256) 两个回答。

|        | `r` | `r+` | `w` | `w+` | `a` | `a+` | `x` | `x+` |
|:-------|:---:|:----:|:---:|:----:|:---:|:----:|:---:|:----:|
| 允许读    |  +  |  +   |     |  +   |     |  +   |     |  +   |
| 允许写    |     |  +   |  +  |  +   |  +  |  +   |  +  |  +   |
| 流的位置   | 开头  |  开头  | 开头  |  开头  | 结尾  |  结尾  | 开头  |  开头  |
| 当文件存在  |     |      | 清空  |  清空  |     |      | 异常  |  异常  |
| 当文件不存在 | 异常  |  异常  | 创建  |  创建  | 创建  |  创建  | 创建  |  创建  |

> [!WARNING] 注意
> 上表中的模式 `x` 以及衍生的模式在 Python 3.3 版本开始才有。

## 流类型

- `t` ，文本模式，以 `str` 类型返回，使用指定的encoding或平台默认编码来解码。
- `b` ，二进制模式，以 `bytes` 类型返回。

不指定 `b` 则默认以 `t` 模式打开。
