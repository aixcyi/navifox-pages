---
title: 通过命令行打开文件夹
createAt: 2016-09-23 17:57
expires: 1096
tags:
    - 开发
    - 易语言
    - shell
excerpt:
    本文介绍如何通过运行命令打开文件夹。
---

<hr style="margin-top: 48px"/>

`explorer.exe /select,addr`

- 说明：addr是文件的绝对地址。比如“C:\WINDOWS\system\clac.exe”。
- 效果：打开它所在的文件夹、选中这个文件。
- 要求：文件必须存在，否则打开的文件夹可能不是该文件所在的文件夹。
- 其它：在这个文件夹已经打开的情况下，仍然可以再打开相同的一个。


`explorer.exe /n,addr`

- 说明：addr是文件夹的绝对地址。比如“C:\WINDOWS\system”。
- 效果：打开文件夹。
- 要求：必须是个文件夹，可以不以“\”结尾。
- 其它：在这个文件夹已经打开的情况下，仍然可以再打开相同的一个。
- 备注：如果add是文件地址的话，会运行或使用程序打开这个文件。

::: details 截取文件地址的文件夹路径
```易语言
.版本 2

.程序集变量 对象, 对象, , , 易语言COM对象

对象.创建 (“Scripting.FileSystemObject”, )

对象.文本方法 (“GetParentFolderName”, address)
```
:::
