---
title: 直接运行 Python 脚本
outline: deep
createAt: 2023-09-05 23:32
updateAt: 2024-01-03 09:44
expires: 365
tags:
    - 运维
    - Python
    - Windows
    - Ubuntu
excerpt:
    本文介绍了在 Ubuntu 和 Windows 下直接运行 Python 脚本所需的配置。
---

## 在 Ubuntu 下 {#ubuntu}

### 1、准备 {#ubuntu1}

假设 Python 3 安装在 `/usr/bin/python` ，用户名、当前所在目录、要操作的脚本名称如下：

```console
$ touch meow.py
$ whereis python
python: /usr/bin/python
```

然后通过 `/usr/bin/python -V` 确认版本号是不是你需要调用的。

### 2、修改脚本文件 {#ubuntu2}

在首行添加 `#!/usr/bin/python` 表示通过绝对路径查找 Python，  
添加 `#!/usr/bin/env python3` 表示从环境变量查找。

### 3、添加执行权限 {#ubuntu3}

用 `chmod u+x meow.py` 添加当前用户的执行权限；  
用 `chmod u+x *.py` 为当前目录下所有脚本加权限。

### 4、尾声 {#ubuntu4}

（此时已经可以输入 `./meow.py` 直接运行）

如果只是临时使用，可以通过 `alias meow=/home/kitten/meow.py` 设置别名；  
如果只是永久使用，可以通过 `ln -s meow.py /usr/local/bin/meow` 创建符号链接。

（此时已经可以输入 `meow` 直接运行）

## 在 Windows 下 #{windows4}

Python 3.3+ Windows 安装包附带了一个叫 py.exe 的程序，可以 **自动** 将调用转发到本地安装的最新版本的 Python，也可以在 **命令行** 手动指定使用特定版本进行调用，还可以识别 **Shebang** 行并将调用转向指定的解释器。详见[适用于 Windows 的 Python 启动器](https://docs.python.org/zh-cn/3/using/windows.html#python-launcher-for-windows)。

### 1、准备 {#windows1}

看下 py.exe 在哪个地方，如果都没有，那么可能需要重新安装 Python 。

- `C:\Windows\py.exe`
- `C:\Users\{YourName}\AppData\Local\Programs\Python\Launcher\py.exe`

再检查一下系统环境变量 `PATH` 里看看有没有二者其一，都没有就按需添加一个。

### 2、修改脚本文件 {#windows2}

在文件首行添加具体的版本号（本地要先有），比如 `#!python3.7` ；  
也可以直接指向绝对路径，比如 `#!C:\Program Files\Python37\python.exe` ；  
虚拟环境中可以指向相对当前文件的路径，比如 `#!./venv/Scripts/python.exe` 可以不激活虚拟环境；  
如果要跟 Linux 兼容，那么需要 `#!/usr/bin/env python3` 。

### 3、配置全局调用 {#windows3}

首先需要确保可以全局调用 `py` 或 `py.exe` ，  
然后将脚本目录追加到系统环境变量 `PATH` 中，  
或者将脚本放到 `PATH` 的其中一个目录里，比如 `C:\Windows` 。

（此时可以在命令行输入 `meow.py` 直接运行）

在命令行直接输入 `meow` 来调用，跟[双击运行](#windows4)的配置方法是一样的。见下方。

### 4、配置双击运行 {#windows4}

在命令行查询注册表，看看是不是已经配置好：

```bat
reg query "HKCR\.py" /ve
reg query "HKCR\py_auto_file\shell\open\command" /ve
```

然后修改注册表：（需要管理员权限）（修改前注意备份数据）

```bat
reg add "HKCR\.py" /ve /d "py_auto_file"
reg add "HKCR\py_auto_file\shell\open\command" /ve /d "\"C:\Windows\py.exe\" \"%1\" %*"
```

如果 `py.exe` 的全局调用对应的是 `C:\Users\{YourName}\AppData\Local\Programs\Python\Launcher\py.exe` ，那么上面的修改要换成

```bat
reg add "HKCR\.py" /ve /d "py_auto_file"
reg add "HKCR\py_auto_file\shell\open\command" /ve /d "\"C:\Users\{YourName}\AppData\Local\Programs\Python\Launcher\py.exe\" \"%1\" %*"
```

