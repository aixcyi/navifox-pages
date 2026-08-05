---
title: PyCharm 配置 Django 控制台
createAt: 2024-01-24 16:28
expires: 1096
tags:
    - 开发
    - IntelliJ IDE
    - Django
    - shell
    - 配置
excerpt:
    PyCharm 社区版并没有 Django 控制台，本文提供了将 Python 控制台配置为 Django 控制台的方法。
---

> [!NOTE] 备注
> Django 控制台比 Python 控制台更方便执行诸如 `User.objects.pass(is_active=True).get(id=1)` 等数据库相关的代码。

> [!IMPORTANT] 重要
> 1. 这个配置仅针对当前项目，不会影响、也无法影响其它项目。
> 2. Django 不能正常运行（因为报错而直接退出）会导致控制台无法使用。

## 1、打开设置页

中文环境下搜索“控制台”：

![设置页面](/media/django-console-search-cn.png)

Search "console" by settings searcher if you are using English:

![Settings Page](/media/django-console-search-en.png)

## 2、设置“启动脚本”

```python
import sys; print('Python %s on %s' % (sys.version, sys.platform))
import django; print('Django %s' % django.get_version())
sys.path.extend([WORKING_DIR_AND_PYTHON_PATHS])
if 'setup' in dir(django): django.setup()
```

也就是专业版中省去引入 `django_manage_shell` 之后的启动脚本（Starting script）。

![设置启动脚本](/media/django-console-starting-script.png)

## 3、设置环境变量

展开上方的环境一栏（Environment）找到环境变量（Environment variables），填入你的 settings 的包地址 `DJANGO_SETTINGS_MODULE=my_service.settings` 。

![配置环境变量](/media/django-console-env-var.png)

## 4、启动！

在左侧的工具栏找到 Python 控制台（Python Console），打开选项卡即可启动。

