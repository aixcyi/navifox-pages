---
title: 宝塔面板与 Python 3 的恩怨情仇
createAt: 2020-03-02 22:06
expires: 1096
tags:
    - 运维
    - CentOS
    - Python
excerpt:
---

## 问题描述

服务器镜像有宝塔面板 + Python 2，用 yum 和 pip3 安装 Python3＋Flask＋Gunicorn 后，宝塔面板打不开了。报错如下：

```console
Starting Bt-Panel..........failed
------------------------------------------------------

[Traceback (most recent call last):
  File "/usr/local/lib/python3.6/site-packages/gunicorn/util.py", line 135, in load_class
    mod = import_module('.'.join(components))
  File "/usr/local/lib/python3.6/importlib/__init__.py", line 126, in import_module
    return _bootstrap._gcd_import(name[level:], package, level)
  File "<frozen importlib._bootstrap>", line 994, in _gcd_import
  File "<frozen importlib._bootstrap>", line 971, in _find_and_load
  File "<frozen importlib._bootstrap>", line 941, in _find_and_load_unlocked
  File "<frozen importlib._bootstrap>", line 219, in _call_with_frames_removed
  File "<frozen importlib._bootstrap>", line 994, in _gcd_import
  File "<frozen importlib._bootstrap>", line 971, in _find_and_load
  File "<frozen importlib._bootstrap>", line 941, in _find_and_load_unlocked
  File "<frozen importlib._bootstrap>", line 219, in _call_with_frames_removed
  File "<frozen importlib._bootstrap>", line 994, in _gcd_import
  File "<frozen importlib._bootstrap>", line 971, in _find_and_load
  File "<frozen importlib._bootstrap>", line 953, in _find_and_load_unlocked
ModuleNotFoundError: No module named 'geventwebsocket'
]

------------------------------------------------------
Error: BT-Panel service startup failed.
        done
```

> 报错早就刷上去了，找不回来，这段照搬别人的[^引用1]，因为看着差不了多少。  
> 其实我的情况跟引用1差不多，但是就是最后一步依然报错。

## 解决过程

### 01 | 卸载 Python 3，修复软链接

听说宝塔面板使用 Python 2 编写，直接安装 Python 3 的话会出现问题。[^引用4]

卸载 Python 3 之后依然报如上的错，路径居然依然是 python3.6，猜测可能是软链接接错了。

```console
$ ll | grep python
 lrwxrwxrwx    1 root root         7 Jul 11  2019 python -> python2
 lrwxrwxrwx    1 root root         9 Jul 11  2019 python2 -> python2.7
 -rwxr-xr-x    1 root root      7216 Jun 21  2019 python2.7
 -rwxr-xr-x    1 root root      1835 Jun 21  2019 python2.7-config
 lrwxrwxrwx    1 root root        16 Jul 11  2019 python2-config -> python2.7-config
 lrwxrwxrwx    1 root root        14 Jul 11  2019 python-config -> python2-config
```

虽然看着好像没错，但还是按照[官方论坛里的方法](https://www.bt.cn/bbs/thread-32532-1-1.html)操作一遍。

```console
$ ll | grep python
 lrwxrwxrwx    1 root root        18 Mar  2 17:01 python -> /usr/bin/python2.7
 -rwxr-xr-x    1 root root      7216 Jun 21  2019 python2.7
 -rwxr-xr-x    1 root root      1835 Jun 21  2019 python2.7-config
 lrwxrwxrwx    1 root root        16 Jul 11  2019 python2-config -> python2.7-config
 lrwxrwxrwx    1 root root        14 Jul 11  2019 python-config -> python2-config
```

### 02 | 再次启动，路径正常了但仍报错

```console
Error: Not a string: ['0.0.0.0:8888\n']
.........failed
------------------------------------------------------
    from BTPanel import app,sys,public
  File "/usr/lib64/python2.7/site-packages/gevent/builtins.py", line 96, in __import__
    result = _import(*args, **kwargs)
  File "/www/server/panel/BTPanel/__init__.py", line 28, in <module>
    from flask_sockets import Sockets
  File "/usr/lib64/python2.7/site-packages/gevent/builtins.py", line 96, in __import__
    result = _import(*args, **kwargs)
  File "class/flask_sockets.py", line 11, in <module>
    from geventwebsocket.gunicorn.workers import GeventWebSocketWorker as Worker
  File "/usr/lib64/python2.7/site-packages/gevent/builtins.py", line 96, in __import__
    result = _import(*args, **kwargs)
  File "/usr/lib/python2.7/site-packages/geventwebsocket/gunicorn/workers.py", line 2, in <module>
    from gunicorn.workers.ggevent import GeventPyWSGIWorker
  File "/usr/lib64/python2.7/site-packages/gevent/builtins.py", line 96, in __import__
    result = _import(*args, **kwargs)
  File "/usr/lib/python2.7/site-packages/gunicorn/workers/ggevent.py", line 39, in <module>
    class GeventWorker(AsyncWorker):
  File "/usr/lib/python2.7/site-packages/gunicorn/workers/ggevent.py", line 90, in GeventWorker
    if hasattr(gevent.core, 'dns_shutdown'):
AttributeError: 'module' object has no attribute 'core'
------------------------------------------------------
Error: BT-Panel service startup failed.
```

### 03 | 根据引用1重装gunicorn

不明白为什么使用 Python 2 的 pip 安装会出现这个错误

```console
ERROR: Package 'gunicorn' requires a different Python: 2.7.5 not in '>=3.4'
```

但还是找到了[解决方法](https://blog.csdn.net/zhou_438/article/details/104375229)：

```console
$ pip install gunicorn==999
$ pip install gunicorn==0.14.1
```

先指定安装一个不存在的版本 999，回车后会提示可以安装的版本，然后随便挑一个安装就好了，我挑了偏中间的 0.14.1 安装。

### 04 | 重装 gunicorn 后报错依旧

到这步就没辙了，甚至更新过宝塔面板也依然没用。耗了很久，心态爆炸。

看了很多资料，看见有人去分析过宝塔面板的源码去纠错，于是我也找到了宝塔面板的开源地址，无意间看到源代码根目录下有一份 `requirements.txt`（pip freeze导出的需要的库的名单和版本），发现里面根本就没有 gunicorn，人家用的是 gevent！

嗯，心态爆炸了。

卸载掉 gunicorn，下一刻就启动起来了……

简单测试过后，一点猫饼都没有。

## 参考和引用

1. [lib.im - 解决宝塔面板升级后因Python2.7与Python3.6共存启动失败](https://lib.im/linux/bt-gunicorn)
2. [宝塔论坛 - 解决升级Python，重启主机后宝塔不能启动](https://www.bt.cn/bbs/thread-32532-1-1.html)
3. [CSDN - ERROR: Package 'gunicorn' requires a different Python: 2.7.5 not in '>=3.4'](https://blog.csdn.net/zhou_438/article/details/104375229)
4. [主机贴士 - 在宝塔面板python2的基础上安装python3](https://zhujitips.com/653)
5. [GitHub - BaoTa/requirements.txt](https://github.com/aaPanel/BaoTa/blob/master/requirements.txt)
6. [主机贴士 - 在宝塔面板python2的基础上安装python3](https://zhujitips.com/653)
