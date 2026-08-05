---
title: Python 中的负数与比特位
outline: deep
createAt: 2025-03-14 15:09
expires: 3650
tags:
    - Python
    - 开发
    - 设计
excerpt:
    Python 中负整数使用符号+原码进行“表达”，归根到底是传统的补码需要依赖有穷的存储空间，而 Python 支持无穷的存储空间；但在“运算”时仍然需要翻译成补码。
---

## 比特

传统的补码需要依靠一个约定的比特位上限来标记符号位，例如 `-67` 使用 32 位有符号整数类型中存储为

<pre style="text-align: center">
<span style="color: var(--vp-c-text-1)">1111 1111 1111 1111</span>
<span style="color: var(--vp-c-text-1)">1111 1111 1011 1101</span>
</pre>

使用 16 位有符号整数类型中存储为

<pre style="text-align: center">
<span style="color: var(--vp-c-text-3)">0000 0000 0000 0000</span>
<span style="color: var(--vp-c-text-1)">1111 1111 1011 1101</span>
</pre>

使用 8 位有符号整数类型中存储为

<pre style="text-align: center">
<span style="color: var(--vp-c-text-3)">0000 0000 0000 0000</span>
<span style="color: var(--vp-c-text-3)">0000 0000 </span><span style="color: var(--vp-c-text-1)">1011 1101</span>
</pre>

而与其它只能 **有限存储** 的类型系统不同，Python 中的整数是可以 **无限存储** 的，也就是说，只要内存足够大，就可以存储一个超大整数。

在这种情况下，补码显然很难表达（无限意味着没有约定的比特位上限，也无法用有限个前导 `1` 来表示无限），因此 Python 选择在 **原码** 的基础上直接增添符号位，来表达负整数的比特位。

因此在 Python 中：

<pre style="text-align: center">
<span style="color: var(--vp-c-text-1)">  10 1011  ( 43)</span>
<span style="color: var(--vp-c-text-1)"> -10 1011  (-43)</span>
<span style="color: var(--vp-c-text-1)"> 100 0011  ( 67)</span>
<span style="color: var(--vp-c-text-1)">-100 0011  (-67)</span>
</pre>

## 位运算

非负数与其它语言一样使用原码表达，因而非负数的位运算也与其它语言一致。

<pre style="text-align: center">
  0100 0011  (67)
& 0010 1011  (43)
————————————————————
= 0000 1011  ( 3)
</pre>

在负数范畴下，虽然 Python 用的是原码+符号位的方式表达负数的比特位，但在运算时，依然使用“补码”进行计算，以确保与其它语言的结果一致。

<pre style="text-align: center">
            -100 0011  ( -67)
&            -10 1011  ( -43)
————————————————————————————————
= 1111 1111 1011 1101  (补码)
& 1111 1111 1101 0101  (补码)
————————————————————————————————
= 1111 1111 1001 0101  (补码)
=           -110 1011  (-107)
</pre>

### Python 如何补码

在其它语言的 16 位有符号整数类型中，

1、计算 `-67` 的原码

<pre style="text-align: center">
<span style="color: var(--vp-c-text-3)">0000 0000 0000 0000</span>
<span style="color: var(--vp-c-text-1)">0000 0000 0100 0011</span>
</pre>

2、反转所有比特位

<pre style="text-align: center">
<span style="color: var(--vp-c-text-3)">0000 0000 0000 0000</span>
<span style="color: var(--vp-c-text-1)">1111 1111 1011 1100</span>
</pre>

3、再执行“+1”

<pre style="text-align: center">
<span style="color: var(--vp-c-text-3)">0000 0000 0000 0000</span>
<span style="color: var(--vp-c-text-1)">1111 1111 1011 1101</span>
</pre>

而在 Python 的位运算中，补码的过程（近似）为：

1、计算 `-67` 的原码，并补充符号

<pre style="text-align: center">
<span style="color: var(--vp-c-text-1)">          -100 0011</span>
</pre>

2、反转所有比特位

<pre style="text-align: center">
<span style="color: var(--vp-c-text-1)">          -011 1100</span>
</pre>

3、再执行“+1”

<pre style="text-align: center">
<span style="color: var(--vp-c-text-1)">          -011 1101</span>
</pre>

4、最后将符号替换为前导 `0` 或前导 `1`

<pre style="text-align: center">
<span style="color: var(--vp-c-text-3)">0000 0000 0000 0000</span>
<span style="color: var(--vp-c-text-1)">1111 1111 1011 1101</span>
</pre>

### 位移与无符号右移

位移同样需要将被操作数翻译成补码，而不是直接对原码移位。

另外，Python 中没有无符号右移。
