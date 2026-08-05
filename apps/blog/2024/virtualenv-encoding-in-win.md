---
title: virtualenv 在 Windows 中无法激活
createAt: 2024-02-28 16:29
expires: 365
tags:
    - 运维
    - 包管理器
    - 开发
    - Windows
    - Python
    - 虚拟环境
excerpt:
    使用 PyCharm 创建带有基于 Python 3.10 的虚拟环境的项目后，在命令行中无法激活虚拟环境，虽然前缀
    `(venv)` 字样，但 `pip -V` 显示当前 pip 并没有指向父环境。
---

<style scoped>
.VPDoc p:not(.custom-block-title) {
    text-indent: 2em;
}
</style>

## 环境（参考）

- 系统：Windows 11 x64
- 软件：PyCharm 2023.3
- 运行时：Python 3.7、3.10、3.11，Miniconda (3.9)

## 原因

项目目录含有中文，而 `activate.bat` 文件编码默认是 UTF-8，导致注入的环境变量值是乱码。

#### 检测方法

浏览 `activate.bat` 的源码可知，它会将当前虚拟环境的 Python 运行路径注入到环境变量 `PATH` 中，于是决定在除了 PyCharm 以外的地方激活虚拟环境，并观察 `PATH` 的值是否有乱码。

```bat
cd %PROJECT%/venv/Scripts  # 你的项目目录下的虚拟环境
activate
echo %PATH%
```

> [!WARNING] 注意
> 我的 PyCharm 不知道为什么始终会有乱码。如果你需要在 PyCharm 中甄别，可以事先往 `PATH` 中插入一个含有中文的路径，并观察手动插入的路径是否在 PyCharm 中正确显示；如果不能正确显示，则观察乱码内容是否在更改 `activate.bat` 编码后发生变化。

#### 检测多版本共存

一开始以为是多版本共存的问题，但是之前别的项目也可以正确创建，觉得不对劲，于是创建了一个带有相同版本号的虚拟环境的、名为 `test` 的项目，并成功激活。`pip -V` 正确指向了父环境（Python 3.10）。

## 解决

将 `activate.bat` 的文件编码从 UTF-8 改为 GB2312 或 GBK 即可。但是更改编码后，PyCharm 部分与虚拟环境有关的功能无法正常使用，所以最好的办法还是去掉项目路径上的中文字符。
