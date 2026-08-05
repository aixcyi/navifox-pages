---
title: 注册表：文件关联与关联文件
createAt: 2019-01-28 12:06
expires: 1096
tags:
    - 开发
    - 运维
    - 注册表
excerpt:
---

<hr style="margin-top: 48px"/>

注册表中储存文件关联信息的一些位置：

1. HKEY_CLASSES_ROOT\
2. HKEY_CURRENT_USER\Software\Classes\
3. HKEY_LOCAL_MACHINE\Software\Classes\
4. HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Explorer\FileExts\
5. HKEY_LOCAL_MACHINE\Software\Microsoft\Windows\CurrentVersion\Explorer\FileExts\

::: details 说明
【前三项】(1)处存放的是本机文件关联的备份，会自动同步后面两处的信息。但实际操作时有些信息只有(1)处有，所以建议在枚举本机文件关联时以此处为准，以其它两处作补充。以下所说的“Classes目录”指代(1)(2)(3)中的任意一个，(2)是现行用户的，(3)是本地机器的，不建议选(1)。

【后两项】在尝试打开文件时或选择打开方式后会自动生成。以下所说的“FileExts目录”指代(4)(5)中的一个，按需选择。
:::

## 格式

### Classes目录\.扩展名

【(默认)】值为ProgID，对应目录下的同名子项（下称程序标识符）。

【DefaultIcon】在没有(默认)的值时会用它的值来指示这类文件的图标。

### Classes目录\.扩展名\ShellNew

【NullFile】有这一项表示新建时新建一个空的文件，与下面二选一。

【FileName】它的值是新建时 需要建立的文件 的地址，这文件一般在C:\WINDOWS\SHELLNEW下（没试过）。

> 如果要在新建菜单中显示这种文件，必须要有文件的类型名称

### Classes目录\程序标识符

【(默认)】值是这类文件的类型名称（在文件浏览器中显示的“类型”，比如平时看到的“文本文档”，不写的话会显示“XXX 文件”）

### Classes目录\程序标识符\DefaultIcon

【(默认)】值是这类文件的图标。

### Classes目录\程序标识符\shell\菜单项

::: details 备注
“菜单项”指的是右键菜单项，一般为“open”，也可以自定义字符（中文也行）。它在MUIVerb不存在或值为空时作为右键菜单的标题。这些右键菜单先显示“菜单项”为open的项，然后显示为英文的项，最后显示为中文的项。
:::

【MUIVerb】值不为空的话就会覆盖“菜单标题”，但显示时还是按照“菜单标题”排序。

【icon】值是右键菜单中的图标的地址。（在Win7测试可以，XP不知道为什么不显示）

### Classes目录\程序标识符\shell\菜单项\command

【(默认)】值是被调用的命令行。

### FileExts目录\.扩展名\OpenWithList

【MRUList】右键菜单中“打开方式”子菜单的排列顺序，就是下面这些。

【a】值是打开文件的程序的名称（包括扩展名）。可以没有，但有的话，MRUList要出现a这个字母。

【b】同上。

【c】同上。

以此类推……

### FileExts目录\.扩展名\OpenWithProgids

> [!NOTE] 备注
> ProgIDs，programmatic identifiers，程序标识符。该子项下存放着1个或多个程序标识符，作用不太清楚。

### FileExts目录\.扩展名\UserChoice

【Progid】用户选择的程序的程序标识符。

## 命令行

添加注册表：

```bat
REG ADD KeyName [/v ValueName | /ve] [/t Type] [/s Separator] [/d Data] [/f]
```

删除注册表：

```bat
REG DELETE KeyName [/v ValueName | /ve | /va] [/f]
```

### 说明

- KeyName：注册项路径，上文标下划线的即是。
- ValueName：注册项下的名称，上文冒号前面的即是。若是(默认)就要用/ve。
- Type：类型。没有/t Type就默认为REG_SZ。REG_SZ类型的值中，形如%xx%的变量不会被解析，而REG_EXPAND_SZ的则会被解析。另外，易语言系统支持库的注册表读取命令无法读取REG_EXPAND_SZ的值。
- /f：强制写入而不询问。
- （其它没用过，捂脸）

### 注意事项

例子："\"%%SystemRoot%%\system32\NOTEPAD.EXE\" %%1"

1. 命令行中，引号是字符串的边界，当需要在注册表中写入引号时，要用字符\转义。
2. 命令行中，形如%xxx%、%x的是变量，比如%cd%代表脚本运行目录、%1代表传入脚本的第一个参数，所以需要写入%SystemRoot%时，需要用字符%转义。
