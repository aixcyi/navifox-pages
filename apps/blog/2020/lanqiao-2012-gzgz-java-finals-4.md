---
title: Excel 地址转换
createAt: 2020-01-20 15:09
tags:
    - 算法
    - 蓝桥杯
excerpt:
    2012 年高职高专组 JAVA 组 决赛第 4 题，2012 年高职高专组 C 语言组 决赛第 3 题
---

## 题干

将一个整数转换为Excel的列号，整数范围为 \[1, 2147483647\] 。

> Excel的单元格中，列号表示如下：
> 
> "A" 表示第1列，  
> "B" 表示第2列，  
> "Z" 表示第26列，  
> "AA" 表示第27列，  
> "AB" 表示第28列，  
> "BA" 表示第53列，  
> ……

|    | 样例1 | 样例2  |
|----|-----|------|
| 输入 | 26  | 2054 |
| 输出 | Z   | BZZ  |

## 思路

从题目附加描述中的“列号”可以看出，这一题应该用“进制转换”的解法，即除n求余倒插（n为进制数），但这题的坑在于——**Excel的列号没有0**！

十六进制符号有0到F十六个，分别代表0到15；Excel列号的符号有A到Z二十六个，按描述来说分别代表1到26，显然没有0。没有0的话不能按常规进位制算法处理，于是在前期将A到Z对应成0到25，再在后期“+1”，对应回原来的1到26。

假设在前期的处理中，A对应0，Z对应25，那么Z+1（即25+1==26）对应什么呢？再进一步，假设此时存在列号“AA”，那么它的两个A是代表十进制数的0还是1呢？

那么对题目附加描述进行分析，可以得到下表：

| 列号 |        代数式 |       分解算式 | 十进制数 |
|---:|-----------:|-----------:|-----:|
|  A | 26\*0+1\*A | 26\*0+1\*1 |    1 |
|  B | 26\*0+1\*B | 26\*0+1\*2 |    2 |
| AA | 26\*A+1\*A | 26\*1+1\*1 |   27 |
| AB | 26\*A+1\*B | 26\*1+1\*2 |   28 |
| BA | 26\*B+1\*A | 26\*2+1\*1 |   53 |

按照正常进制算法用短除法分析样例中的2054，得到 `2054 == 676*3 + 26*1 + 1*0`，对照ASCII表得到的`CA@`或`DBA`都是错的。

因为Excel的列号没有0，于是按照进位制的思想向前借一，得到 `2054 == 676*3 + 26*0 + 1*26`，仍然有0。  
于是再向前借一，得到 `2054 == 676*2 + 26*26 + 1*26`，对照ASCII表得到`BZZ`，正确！

```java :line-numbers
package net.navifox.test;
import java.util.Scanner;

public class Main {
    /** ASCII表中字符A的前一个字符，代表进位制中的0。用于判断分解的结果中是否有0。 */
    final static char FLAG = 'A' - 1;

    public static void main(String[] args) {
        // 使用Scanner从输入流中获取等待被转换为Excel的整数num：
        Scanner sr = new Scanner(System.in);
        int num = sr.nextInt();
        sr.close();

        // 为了提升效率，使用StringBuffer存放结果：
        StringBuffer n26bf = new StringBuffer();

        // N进制转十进制的算法：
        // 将整数num除以二十六进制的进制数26，将余数转换为字母，插入到StringBuffer的位置0中（即先出现的余数放到结果的右端，后出现的余数放到左端）；将商作为整数num送入下一循环再次运算。
        while (num > 0) {
            n26bf.insert(0, (char) ((num % 26) + 64));
            num /= 26;
        }

        // 将结果转换为字符数组：
        char[] n26cs = n26bf.toString().toCharArray();

        // 从结果的右端（最后一位数）循环遍历到左端（第二位数），若有0则向前借一：
        for (int i = n26cs.length - 1; i > 0; i--) {
            if (n26cs[i] == FLAG) {
                n26cs[i] += 26;
                n26cs[i - 1]--;
            }
        }

        // 借位完毕后，如果第一位为0，则只需从第二位开始输出。
        if (n26cs[0] == FLAG) {
            System.out.print(String.valueOf(n26cs).substring(1, n26cs.length));
        } else {
            System.out.print(String.valueOf(n26cs));
        }
    }
}
```
