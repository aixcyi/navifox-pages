---
title: 多个整数连接为最大整数问题
createAt: 2020-03-13 15:08
tags:
    - 算法
excerpt:
    有 n 个正整数（n<=20），将它们对应的字符串连接成一排，组成一个最大的多位整数。
---

## 题干

有 n 个正整数（n<=20），将它们对应的字符串连接成一排，组成一个最大的多位整数。

例如3个整数13，312，343连接成的最大整数为34331213；  
又如4个整数7，13，4，246连接成的最大整数为7424613。

## 输入

n

n个数，0<每个数<2000000000

```text
3
13 312 343
```

## 输出

连接成的最大整数。

```text
34331213
```

## 思路

这题就是排序问题，只不过是以字符串的形式进行比较，而不是以整数的形式。所以输入时不应将其处理成整数。

比较原则：两个数，同一位数字大的数排在前面，比如 `567` 应排在 `561` 前面，`66` 应排在 `567` 前面。

比较流程：

- 如果两数长度相等，按照原则确定排序。
- 如果两数长度不相等
  - 没有多出来的部分不相等（如 `56` 和 `789` ，只比较 `56` 和 `78`）
    - 按照原则确定排序
  - 没有多出来的部分相等（如 `56` 和 `567`）
    - 将多出来的部分跟长度较短的那个数比较，重复比较流程

然而，其实判断一下string1 + string2 < string2 + string1就知道哪个数更大了。  
不过，Java里，小于号和大于号不能用在字符串的比较上，要用 `"str".compareTo("other-str")` 来比较。

```java :line-numbers
package net.navifox.test;
import java.util.Arrays;
import java.util.Comparator;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sr = new Scanner(System.in);
        String[] numbers = new String[sr.nextInt()];
        for (int i = 0; i < numbers.length; i++) {
            numbers[i] = sr.next();
        }
        sr.close();

        /* compare方法里，返回-1代表小于、0代表等于、1代表大于；
         * 但是Arrays.sort()是正向排序，小的放前面，而这题需要将大的放前面。
         * 而后者与前者的的比较刚好是返回大小相反的结果，
         * 因此不是用o1+o2与o2+o1比较，而是用o2+o1与o1+o2比较。
         */
        Arrays.sort(numbers, new Comparator<String>() {
            @Override
            public int compare(String o1, String o2) {
                return (o2 + o1).compareTo(o1 + o2);
            }
        });
        for (String s : numbers) {
            System.out.print(s);
        }
    }
}
```

