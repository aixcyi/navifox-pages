---
title: 连续自然数之和
createAt: 2020-04-06 12:53
tags:
    - 算法
excerpt:
    对一个给定的自然数M，求出所有的连续的自然数段（连续个数大于1），这些连续的自然数段中的全部数之和为M。
---

## 题干

对一个给定的自然数M，求出所有的连续的自然数段（连续个数大于1），这些连续的自然数段中的全部数之和为M。

例子：1998+1999+2000+2001+2002 = 10000，所以从1998到2002的一个自然数段为M=10000的一个解。

## 输入

包含一个整数的单独一行给出M的值（10 <= M <= 1000000000）

```text
10000
```

## 输出

每行两个自然数，给出一个满足条件的连续自然数段中的第一个数和最后一个数，两数之间用一个空格隔开，所有输出行的第一个按从小到大的升序排列，对于给定的输入数据，保证至少有一个解。

```text
18 142
297 328
388 412
1998 2002
```

## 思路

这题实际是公差为1的等差数列求和，解法是将数列长度作为遍历变量，动态求出数列的第一个数和最后一个数，再使用数列求和公式求出总和，并与输入进行比较，决定是否输出。

这题的自然数设定为不包括0，所以这里的数列只包含正整数。

样例输出：（M = 10000）

| 数列长度-1  | 数列中间数     | 第一个数             | 最后一个数           |
| ----------- | -------------- | -------------------- | -------------------- |
| 2002-1998=4 | 10000/5=2000   | 2000-(5/2-0.5)=1998  | 2000+(5/2-0.5)=2002  |
| 412-388=24  | 10000/25=400   | 400-(25/2-0.5)=388   | 400+(25/2-0.5)=412   |
| 328-297=31  | 10000/32=312.5 | 312.5-(32/2-0.5)=297 | 312.5+(32/2-0.5)=328 |
| 142-18=124  | 10000/125=80   | 80-(125/2-0.5)=18    | 80+(125/2-0.5)=142   |

记数列长度为 `i`，那么数列第一个数为 `(M/i)-(i/2-0.5)`，最后一个数为 `(M/i)+(i/2-0.5)`。

题目说连续的自然数段的连续个数大于1，也就是说i>1，那么可以从i=2开始循环求第一个数和最后一个数。

如果无法确定for循环终点（`i` 的最大值），可以用while循环、动态计算第一个数是否大于0。

```java :line-numbers
package net.navifox.test;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sr = new Scanner(args[0]);
        double m = sr.nextInt();
        sr.close();
        StringBuffer buffer = new StringBuffer();
        // 数列长度：
        int i = 2;
        // 数列中间数、(i/2-0.5)：
        double center = m / i, sub = (i - 1) / 2.0;
        // 第一个数、最后一个数：
        int left=(int)(center-sub), right=(int)(center+sub);
        while (left > 0) {
            // 只有数列求和等于m才能输出：
            if ((right+left) * (right-left+1) / 2.0 == m) {
                buffer.insert(0, '\n');
                buffer.insert(0, right);
                buffer.insert(0, ' ');
                buffer.insert(0, left);
            }
            center = m / ++i;
            sub = (i - 1) / 2.0;
            left = (int) (center - sub);
            right = (int) (center + sub);
        }
        System.out.print(buffer.toString());
    }
}
```

可以这样确定 `i` 的最大值：

第一个数必须大于0，所以数列长度 `i` 要满足
$$
\frac{M}{i} - (\frac{i}{2} - \frac{1}{2}) > 0
$$
变换上式
$$
M-\frac{i^{2}-i}{2}>0
$$
得到
$$
i^{2}+i<2M
$$
在实际操作中可以近似认为
$$
i<\sqrt{2M}
$$
在遍历的时候，为了避免漏掉可能的情况，可以令
$$
i \in [2, \sqrt{2M}]
$$

```java :line-numbers
package st.zspt;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sr = new Scanner(args[0]);
        double m = sr.nextInt();
        sr.close();
        StringBuffer buffer = new StringBuffer();
        double center, sub;    // 数列中间值、(i/2-0.5)
        int left, right,    // 第一个数、最后一个数
            END_POINT = (int) Math.sqrt(2 * m);    // 数列长度最值
        // 只有数列求和等于m才能输出：
        for (int i = 2; i <= END_POINT; i++) {
            center = m / i;
            sub = (i - 1) / 2.0;
            left = (int) (center - sub);
            right = (int) (center + sub);
            if ((right+left) * (right-left+1) / 2.0 == m) {
                buffer.insert(0, '\n');
                buffer.insert(0, right);
                buffer.insert(0, ' ');
                buffer.insert(0, left);
            }
        }
        System.out.print(buffer.toString());
    }
}
```

