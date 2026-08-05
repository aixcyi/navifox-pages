---
title: 十进制转任意进制与 yield
outline: deep
createAt: 2022-08-18 00:10
expires: 1096
tags:
    - 算法
    - 进位制
    - Python
    - 语法特性
excerpt:
    十进制转任意进制用的是除 N 求余法，一般可以用循环和迭代的方式组织代码，但在
    Python 中，还可以写成一个生成器函数，并且执行效率远高于迭代和直接循环。
---

## 过程描述

用除N求余法计算3500266221对应的十六进制的过程如下：

$$
\begin{aligned}
3500266221 \div 16 &= 218766638  \cdots 13 \\
218766638 \div 16 &= 13672914  \cdots 14 \\
13672914 \div 16 &= 854557  \cdots 2 \\
854557 \div 16 &= 53409  \cdots 13 \\
53409 \div 16 &= 3338  \cdots 1 \\
3338 \div 16 &= 208  \cdots 10 \\
208 \div 16 &= 13  \cdots 0 \\
13 \div 16 &= 0 \cdots 13
\end{aligned}
$$

余数倒序组成数列 `[13, 0, 10, 1, 13, 2, 14, 13]`，按顺序查询进制对应的字符集，得到结果 `D0A1D2ED`。

|    | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 |
|:--:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:--:|:--:|:--:|:--:|:--:|:--:|
|    | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | A  | B  | C  | D  | E  | F  |
| 13 |   |   |   |   |   |   |   |   |   |   |    |    |    | D  |    |    |
| 0  | 0 |   |   |   |   |   |   |   |   |   |    |    |    |    |    |    |
| 10 |   |   |   |   |   |   |   |   |   |   | A  |    |    |    |    |    |
| 1  |   | 1 |   |   |   |   |   |   |   |   |    |    |    |    |    |    |
| 13 |   |   |   |   |   |   |   |   |   |   |    |    |    | D  |    |    |
| 2  |   |   | 2 |   |   |   |   |   |   |   |    |    |    |    |    |    |
| 14 |   |   |   |   |   |   |   |   |   |   |    |    |    |    | E  |    |
| 13 |   |   |   |   |   |   |   |   |   |   |    |    |    | D  |    |    |

## 循环实现

```python :line-numbers
def dec2n(x, charset):
    base = len(charset)
    result = ''
    quotient = x  # 商
    while quotient >= base:
        # 同时计算商和余数，并存起来：
        quotient, remainder = quotient // base, quotient % base
        result += charset[remainder]
    else:
        result += charset[quotient]
    return result[::-1]

if __name__ == '__main__':
    print(dec2n(3500266221, '0123456789ABCDEF'))
    # 输出：D0A1D2ED
```

## 递归实现

```python :line-numbers
def dec2n(x, base, charset):
    if x < base:
        return charset[x]
    return dec2n(x // base, base, charset) + charset[x % base]

if __name__ == '__main__':
    BASE16 = '0123456789ABCDEF'
    print(dec2n(3500266221, len(BASE16), BASE16))
    # 输出：D0A1D2ED
```

## 迭代器实现

```python :line-numbers
def dec2n(x, charset):
    # i=3500266221, base=16, charset="0123456789ABCDEF"
    # -> [13, 14, 2, 13, 1, 10, 0, 13]
    # -> ['D', 'E', '2', 'D', '1', 'A', '0', 'D']
    def dec2seq(i, base):
        while i >= base:
            yield charset[i % base]
            i //= base
        yield charset[i]

    # x=3500266221, charset="0123456789ABCDEF"
    # -> ['D', 'E', '2', 'D', '1', 'A', '0', 'D']
    # -> "DE2D1A0D"
    # -> "D0A1D2ED"
    return ''.join(dec2seq(int(x), len(charset)))[::-1]


if __name__ == '__main__':
    print(dec2n(3500266221, '0123456789ABCDEF'))
    # 输出：D0A1D2ED
```

[`yield`](https://docs.python.org/zh-cn/3/reference/simple_stmts.html#the-yield-statement) 只在[生成器函数](https://docs.python.org/zh-cn/3/glossary.html#term-generator)内使用。不同于 `return` 的一旦返回则立即结束，[`yield`](https://docs.python.org/zh-cn/3/reference/expressions.html#yieldexpr) 可以多次返回不同的值，直到函数执行结束。

