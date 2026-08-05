---
navTitle: 20. 有效的括号
title: LeetCode 20. 有效的括号
createAt: 2024-01-10 00:04
tags:
    - 算法
    - LeetCode
excerpt:
    判断给定字符串内的括号是否正确匹配。
---

## 题目

<el-space wrap class="status-bar" style="width: 100%">
    <a href="https://leetcode.cn/problems/valid-parentheses/" target="_blank">
        <img alt="力扣-20" src="https://img.shields.io/badge/LeetCode-20. 有效的括号-895200?logo=leetcode&logoColor=FFA116"/>
    </a>
    <a href="https://leetcode.com/problems/valid-parentheses/" target="_blank">
        <img alt="LeetCode-20" src="https://img.shields.io/badge/LeetCode-20. Valid Parentheses-895200?logo=leetcode&logoColor=FFA116"/>
    </a>
</el-space>

给定一个只包括 `'('`，`')'`，`'{'`，`'}'`，`'['`，`']'` 的字符串 `s` ，判断字符串是否有效。

有效字符串需满足：

1. 左括号必须用相同类型的右括号闭合。
2. 左括号必须以正确的顺序闭合。
3. 每个右括号都有一个对应的相同类型的左括号。

## 样例

| 输入             | 输出      | 备注 |
|----------------|---------|----|
| `s = "()"`     | `true`  |    |
| `s = "()[]{}"` | `true`  |    |
| `s = "(]"`     | `false` |    |

## 约束

- <code>1 <= s.length <= 10<sup>4</sup></code>
- `s` 仅由括号 `'()[]{}'` 组成

## 思路

一开始想到的是用递归去做，但看到约束条件给得太宽了，递归的话很有可能会爆栈。

后来想到，右括号必定会 **呼应** 相同类型的左括号，且 **不会跨越** 不同类型，于是用一个列表存放 **左括号** 并在遍历到 右括号 时将前一个左括号消掉，当左括号全部消掉之后即可证明表达式的括号有效。

不过题干有一个坑：给定的字符串有可能以右括号开头，导致 `lasts[-1]` 报下标越界，因此在判断右括号的时候在 `not lasts` 时 `return False` 。因为输入只有左右两种括号，所以可以放心在这个位置判断。

```python :line-numbers
class Solution:

    def isValid(self, s: str) -> bool:
        lasts = []
        for c in s:
            if c in '([{':
                lasts.append(c)
                continue
            elif not lasts:
                return False
            elif c == ')' and lasts[-1] != '(':
                return False
            elif c == ']' and lasts[-1] != '[':
                return False
            elif c == '}' and lasts[-1] != '{':
                return False
            lasts.pop()
        return not lasts


sol = Solution()
assert sol.isValid("()") is True
assert sol.isValid("()[]{}") is True
assert sol.isValid("(]") is False
```

