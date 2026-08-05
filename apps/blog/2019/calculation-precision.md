---
title: Java 运算精度
createAt: 2019-11-20 21:26
expires: 1096
tags:
    - 开发
    - Java
    - 类型系统
excerpt:
---

<hr style="margin-top: 48px"/>

Java的 `+` `-` `*` `/` 的最低运算精度是 `int` ，所以以下代码会报错：

```java
short s1 = 3;
short s2 = 5;
s1 = s1 + s2;
```

原因是 s1 + s2 的结果是 `int` 类型，不能存入 `short` 类型变量。但如果是 `+=` `-=` `*=` `/=` 就不会有这个问题：

```java
short s1 = 3;
short s2 = 5;
s1 += s2;
```

运算的最高精度跟算式中最高精度（最大存储范围）的那个量有关系：

```java
int a = 2147483647;
System.out.print(a+2);  // 此时会输出-2147483647
```

因为 `a`（`int` 类型）和 `2`（默认为最低精度：`int` 类型）最高精度是 `int` ，但结果超过 `int`（32位有符号整数）的存储范围。

而改成 `long` 就能得到符合直观的结果：

```java
long a = 2147483647;
System.out.print(a+2);  // 此时会输出2147483649
```
