---
navTitle: 13. 罗马数字转整数
title: LeetCode 13. 罗马数字转整数
createAt: 2024-01-09 17:37
tags:
    - 算法
    - LeetCode
excerpt:
    给定一个罗马数字，将其转换成整数。
---

## 题目

<el-space wrap class="status-bar" style="width: 100%">
    <a href="https://leetcode.cn/problems/roman-to-integer/" target="_blank">
        <img alt="力扣-13" src="https://img.shields.io/badge/LeetCode-13. 罗马数字转整数-895200?logo=leetcode&logoColor=FFA116"/>
    </a>
    <a href="https://leetcode.com/problems/roman-to-integer/" target="_blank">
        <img alt="LeetCode-13" src="https://img.shields.io/badge/LeetCode-13. Roman to Integer-895200?logo=leetcode&logoColor=FFA116"/>
    </a>
</el-space>

罗马数字包含以下七种字符：`I`，`V`，`X`，`L`，`C`，`D` 和 `M` 。

```text
字符          数值
I             1
V             5
X             10
L             50
C             100
D             500
M             1000
```

例如， 罗马数字 `2` 写做 `II` ，即为两个并列的 1（而非累加为 2）。`12` 写做 `XII` ，即为 `X` + `II` 。 `27` 写做 `XXVII`, 即为 `XX` + `V` + `II` 。

通常情况下，罗马数字中小的数字在大的数字的右边。但也存在特例，例如 4 不写做 `IIII`，而是 `IV`。数字 1 在数字 5 的左边，所表示的数等于大数 5 减小数 1 得到的数值 4 。同样地，数字 9 表示为 `IX`。这个特殊的规则只适用于以下六种情况：

- `I` 可以放在 `V` (5) 和 `X` (10) 的左边，来表示 4 和 9。
- `X` 可以放在 `L` (50) 和 `C` (100) 的左边，来表示 40 和 90。 
- `C` 可以放在 `D` (500) 和 `M` (1000) 的左边，来表示 400 和 900。

给定一个罗马数字，将其转换成整数。

## 样例

| 输入            | 输出   | 备注                                 |
| --------------- | ------ | ------------------------------------ |
| `s = "III"`     | `3`    |                                      |
| `s = "IV"`      | `4`    |                                      |
| `s = "IX"`      | `9`    |                                      |
| `s = "LVIII"`   | `58`   | L = 50, V= 5, III = 3.               |
| `s = "MCMXCIV"` | `1994` | M = 1000, CM = 900, XC = 90, IV = 4. |

## 约束

1. `1 <= s.length <= 15`
2. `s` 仅含字符 `('I', 'V', 'X', 'L', 'C', 'D', 'M')`
3. 题目数据保证 `s` 是一个有效的罗马数字，且表示整数在范围 `[1, 3999]` 内

## 思路

罗马数字拼写规则（见[维基百科](https://zh.wikipedia.org/wiki/%E7%BD%97%E9%A9%AC%E6%95%B0%E5%AD%97)）是大致如下：

1. 大数+小数，表示大数加上小数，比如 `XI` 换算为 11 。
2. 小数+大数，表示大数减去小数，比如 `IX` 换算为 9 。
3. 最多连续拼接三个相同的数。所以 40 应当是 `XL` 而不是 `XXXX` 。
4. 小数+大数不能越级，比如 999 应当是 `CMXCIX` 而不是 `IM` 。

推论：

- 由 3、4 可知 “小数+大数” 中的小数最多一位，且不会粘连。
- 由 1、2 结合上一条推论可知，只要左侧比右侧小，那么左侧就是负数。
- 由罗马数字本身可知，它的读取是求和。

综上，可以将每一位映射出来，并变换成负数，最后直接相加即可。

```python :line-numbers
class Solution:
    symbols = {'I': 1, 'V': 5, 'X': 10, 'L': 50, 'C': 100, 'D': 500, 'M': 1000}

    def romanToInt(self, s: str) -> int:
        digits = list(map(self.symbols.__getitem__, s))
        return digits[-1] + sum(
            -prev if prev < nuxt else prev
            for prev, nuxt in zip(digits[:-1], digits[1:])
        )


sol = Solution()
assert sol.romanToInt('III') == 3
assert sol.romanToInt('IV') == 4
assert sol.romanToInt('IX') == 9
assert sol.romanToInt('LVIII') == 58
assert sol.romanToInt('MCMXCIV') == 1994
```

