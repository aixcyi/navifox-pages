---
title: 编译安装 Python3 后 pip3 安装的库如何在命令行调用
createAt: 2020-03-04 11:13
expires: 1096
tags:
    - 运维
    - CentOS
    - Python
excerpt:
---

<style scoped>
.VPDoc p:not(.custom-block-title) {
    text-indent: 2em;
}
</style>

## 问题描述

服务器原本安装了 Python 2，不能直接用 yum 等安装 Python 3，于是我按照
[《在宝塔面板python2的基础上安装python3》](https://zhujitips.com/653)
编译安装了 Python 3。

然而 `pip3 install gunicorn` 后并不能直接在命令行启动 gunicorn，会提示

```console
-bash: gunicorn: command not found
```

## 解决

多番查找无果后，我发现 `/usr/local/python37/bin/`（也就是 Python 3 安装目录下的 bin 目录）下有一个名为 gunicorn 的可执行文件。

试着运行，提示如下：

```console
$ ./gunicorn
usage: gunicorn [OPTIONS] [APP_MODULE]
```

看来就是它没错了。原来通过 pip 安装的扩展的启动入口放在了 Python 3 安装目录下的 bin 目录里面。

于是将 Python 3 安装目录里的 bin 目录下的可执行文件 gunicorn 链接到 /usr/bin/ 下（python3也是这样链接的）

```console
$ ln -s /usr/local/python37/bin/gunicorn /usr/bin/gunicorn3
$ cd ~
$ gunicorn3
usage: gunicorn3 [OPTIONS] [APP_MODULE]
gunicorn3: error: No application module specified.
```

在家目录下可以运行，算解决了。
