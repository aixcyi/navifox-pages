---
title: 默认值导致抽象泄漏
outline: false
createAt: 2024-01-30 23:42
expires: 1096
tags:
    - 设计
    - 开发
    - Python
excerpt:
    使用默认值有可能导致抽象泄漏（Leaky Abstraction），指本应对用户隐藏实现细节的抽象行为会不可避免地暴露出底层细节与局限性。
---

<style scoped>
.VPDoc p:not(.custom-block-title) {
    text-indent: 2em;
}
</style>

<hr style="margin-top: 48px"/>

对于已事先声明的参数——即不通过 `args` 或 `kwargs` 传递的参数，Python 无法检测到是否被省略，因为无法分辨入参来源于调用还是默认值。

以下示例封装了一个用于构造自定义标准响应的函数，标准响应约定为必定带有三个字段的JSON对象，其中 `code` 字段必定为整数，`message` 必定为字符串，`data` 可以为任意值。

```python :line-numbers
from typing import Any
from django.db.models import IntegerChoices

class ErrorCode(IntegerChoices):
    """
    自定义错误代码。
    """
    SUCCESS = 1, 'success.'
    DONE = 0, 'done.'
    FAIL = -1, 'fail, see message.'

def response(data: Any = None,
             code: ErrorCode = ErrorCode.FAIL,
             message: str = None,
             **kwargs):
    """
    构造项目自定义的 RESTful API 标准响应内容。
    """
    return {
        'code': code.value,
        'message': message or code.label,
        'data': data,
        **kwargs,
    }

body = response(message=None)
```

完成 `response()` 的抽象后，返回的 `message` 不会为 `None`，而参数 `message` 的默认值又为 `None`，导致前后矛盾，调用者往往需要参阅源码了解编写场景，继而造成抽象泄漏。

笔者认为比较好的做法是将参数 `message` 的默认值改为不常用的字面值 `...`，这样在阅读函数的文档时，调用者不再会认为 `message` 允许为 `None`，与标准响应不允许 `message` 为 `null` 的约定一致。

但需要注意的是，`None` 的布尔值对应为 `False`，`...` 的布尔值对应为 `True`，改换默认值之后 `or` 之类的逻辑表达式需要同步变换。

```python :line-numbers
from typing import Any
from django.db.models import IntegerChoices

class ErrorCode(IntegerChoices):
    """
    自定义错误代码。
    """
    SUCCESS = 1, 'success.'
    DONE = 0, 'done.'
    FAIL = -1, 'fail, see message.'

def response(data: Any = None,
             code: ErrorCode = ErrorCode.FAIL,
             message: str = ...,
             **kwargs):
    """
    构造项目自定义的 RESTful API 标准响应内容。
    """
    msg = None if message is ... else message
    return {
        'code': code.value,
        'message': msg or code.label,
        'data': data,
        **kwargs,
    }

body = response(message=None)
```

