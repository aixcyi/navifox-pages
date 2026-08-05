---
title: date 格式化失败
outline: deep
createAt: 2023-11-14 23:32
expires: 1096
tags:
    - 开发
    - Python
    - 兼容
    - Windows
    - 格式化
excerpt:
    Windows 下 Python 3.7 中 `date().strftime(fmt)` 参数 `fmt` 不能含有中文。
---

## 复现

```python
from datetime import date

print(date(2023, 11, 3).strftime('%Y年%m月%d日'))
```

以上代码在 Windows 下 Python 3.7 中可以复现，在其它操作系统或者更高版本就没有。

错误如下：

```text
Traceback (most recent call last):
  File "C:\Program Files\Python37\lib\code.py", line 90, in runcode
    exec(code, self.locals)
  File "<input>", line 1, in <module>
UnicodeEncodeError: 'locale' codec can't encode character '\u5e74' in position 2: encoding error
```

这个问题是写业务时指定了 Django REST Framework 序列化器日期字段格式之后发现的：

```python
from rest_framework import serializers

class MemberInfoSerializer(serializers.ModelSerializer):
    create_at = serializers.DateTimeField(format='%Y/%m/%d')
    gender = serializers.BooleanField()
    birth = serializers.DateField(format='%Y年%m月%d日')
```

在 `create_at` 序列化时不会报错，轮到 `birth` 就会报 `UnicodeEncodeError` ，且错误的消息一致。

## 解决

### 1、指定全局设置

指定DRF的 **默认** 日期时间格式，并去掉序列化器字段中的 `format` 参数，这是最佳方案。

```python [settings.py]
REST_FRAMEWORK = {
    'DATE_FORMAT': '%Y-%m-%d',
    'TIME_FORMAT': '%H:%M:%S',
    'DATETIME_FORMAT': '%Y-%m-%d %H:%M:%S',
}
```

### 2、手动格式化

如果必须自定义格式，但字段只读，只需要改用类方法进行序列化：

```python [serializers.py]
from rest_framework import serializers

class MemberInfoSerializer(serializers.ModelSerializer):
    birth = serializers.SerializerMethodField()

    def get_birth(self, instance) -> str:
        return instance.birth.strftime('%Y{0}%m{1}%d{2}').format(*'年月日')
```

这个方案摘自[Stack Overflow](https://stackoverflow.com/a/16035152)。注意：[`SerializerMethodField`](https://www.django-rest-framework.org/api-guide/fields/#serializermethodfield) 会将 `read_only` 参数的值覆写为 `True` 。

### 3、自定义字段

如果必须自定义格式，并且字段需要允许读和写，那么只能[自定义字段](https://www.django-rest-framework.org/api-guide/fields/#a-basic-custom-field)：

```python
from datetime import date, datetime
from rest_framework import serializers

class MeowDateField(serializers.Field):

    def to_representation(self, value: date) -> str:
        return value.strftime('%Y{0}%m{1}%d{2}').format(*'年月日')

    def to_internal_value(self, value: str) -> date:
        return datetime.strptime(value, '%Y年%m月%d日')
```

### 4、设置语言环境

如果不是用DRF的话，可以用 [`setlocale()`](https://docs.python.org/zh-cn/3.7/library/locale.html#locale.setlocale) 方法：

```python
from contextlib import contextmanager
import datetime
import locale

@contextmanager
def localize(local_name: str, lc_var=locale.LC_ALL):
    orgin_local = locale.getlocale()
    try:
        yield locale.setlocale(lc_var, local_name)
    finally:
        locale.setlocale(lc_var, orgin_local)


with localize('zh'):
    print(datetime.datetime.now().strftime('%Y年%m月%d日'))
```

这个方案搬运自[Stack Overflow](https://stackoverflow.com/a/62790288)，不过我没有实际在业务中使用，你需要参阅[国际化服务](https://docs.python.org/zh-cn/3.7/library/locale.html)这个标准库来了解可能潜在的bug。
