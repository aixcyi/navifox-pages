---
title: Django Channels 主动模式
outline: deep
createAt: 2025-02-21 20:55
expires: 1096
tags:
    - 开发
    - Python
    - Django
excerpt:
    如何通过 Django Channels 在 Django 项目中通过 WebSocket 实现后端主动通知前端。
---

## 背景

<p class="paragraph">
公司的支付系统提供了「同步支付」和「回调支付」两种模式。原来使用的是「同步支付」
，在前端调起支付后，后端调用支付接口并阻塞，直到拿到支付系统的响应；如果超时或失败，则调起 celery 定时器对订单状态进行重试轮询。
</p>

<p class="paragraph">
现在用户量激增，为了避免阻塞后端，需要改为「回调支付」，也就是前端调起支付后，后端调用支付接口并立即返回，之后在回调中改写订单状态并通过
WebSocket 通知前端成功与否。在老大的介绍下，我选择了 Django Channels。
</p>

> [!CAUTION] 当心
> 这里指的是 [`channels`](https://pypi.org/project/channels/) 而非 [`django-channels`](https://pypi.org/project/django-channels/)，后者早在十年前就已经停更了。

> [!WARNING] 注意
> 如果只是简单接收 WebSocket 并响应，按照[教程](https://channels.readthedocs.io/en/latest/tutorial/index.html)配置即可，下面配置的是后端主动通知前端的场景。

## 安装

```shell
python -m pip install -U 'channels[daphne]'
```

对于旧版本的 Python：

```shell
python -m pip install -U channels
python -m pip install -U daphne
```

## 配置

下面以 [ws://localhost:8000/ws/order/{biz}/](/) 为例。

### 添加消费者

> 消费者 Consumer 是类似视图 View 一样的存在。

在 APP 下创建一个 `consumers.py` 文件，创建一个订单通知的异步消费者 `OrderConsumer`。

当然啦，也可以直接放在 `views.py` 里。另外，

1. `room_name` 有字符要求，不过写错了会有报错提示。
2. `scope['url_route']` 可以拿到 `args` 和 `kwargs`，跟视图一样是来自路由的。
3. `send_data_to_frontend` 可以随意改名，只要跟方法对得上就好。
4. `channel_layer` 的 `group_send()`
   - 参数二的 `data` 可以随意改名，只要跟 `send_data_to_frontend` 的 `event` 格式对上就好。
   - 会对参数二的 `type` 处理，比如把名字 `send_data.to_frontend` 处理成方法 `send_data_to_frontend()`。

```python [./your_app/consumers.py]
import json

from channels.generic.websocket import AsyncWebsocketConsumer


class OrderConsumer(AsyncWebsocketConsumer):
    room_name = ''

    async def connect(self):
        biz = self.scope['url_route']['kwargs']['biz']
        self.room_name = f'order_{biz}'
        await self.channel_layer.group_add(self.room_name, self.channel_name)
        await self.accept()

    async def disconnect(self, code):
        await self.channel_layer.group_discard(self.room_name, self.channel_name)

    async def receive(self, text_data=None, bytes_data=None):
        await self.channel_layer.group_send(self.room_name, dict(
            type='send_data_to_frontend',
            data=text_data,
        ))

    async def send_data_to_frontend(self, event):
        await self.send(text_data=json.dumps(event['data'], ensure_ascii=False))
```

如果不使用异步，需要用 `asgiref` 库进行转换：

```python{13,17,20-23} [./your_app/consumers.py]
import json

from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer


class OrderConsumer(WebsocketConsumer):
    room_name = ''

    def connect(self):
        biz = self.scope['url_route']['kwargs']['biz']
        self.room_name = f'order_{biz}'
        async_to_sync(self.channel_layer.group_add)(self.room_name, self.channel_name)
        self.accept()

    def disconnect(self, code):
        async_to_sync(self.channel_layer.group_discard)(self.room_name, self.channel_name)

    def receive(self, text_data=None, bytes_data=None):
        async_to_sync(self.channel_layer.group_send)(self.room_name, dict(
            type='send_data_to_frontend',
            data=text_data,
        ))

    def send_data_to_frontend(self, event):
        self.send(text_data=json.dumps(event['data'], ensure_ascii=False))
```

### 添加根路由

这一段也可以放在 `./your_project/urls.py` 里，但是需要将 `urlpatterns` 改名为 `websocket_urlpatterns`，不能跟普通的 HTTP 路由 `urlpatterns` 混在一起。

```python [./your_project/routings.py]
from django.urls import re_path

from your_app.consumers import OrderConsumer

urlpatterns = [
    re_path(r"ws/order/(?P<biz>[a-z0-9]{32})/$", OrderConsumer.as_asgi()),
]
```

### 配置 ASGI，安装 APP

```python [./your_project/asgi.py]
import os

from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.security.websocket import AllowedHostsOriginValidator
from django.core.asgi import get_asgi_application

from your_app.routings import urlpatterns

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'your_project.settings')

application = ProtocolTypeRouter({
    "http": get_asgi_application(),
    "websocket": AllowedHostsOriginValidator(
        AuthMiddlewareStack(URLRouter(urlpatterns))
    ),
})
```

以及

```python [./your_project/settings.py]
ASGI_APPLICATION = 'your_project.asgi.application'

INSTALLED_APPS = [
    'daphne',
    ...
]
```

### 配置存储

不配置的时候默认用内存进行存储，但生产环境中不建议。推荐用

```shell
pip install channels-redis
```

然后配置

```python [./your_project/settings.py]
CHANNEL_LAYERS = {
    "default": dict(
        BACKEND="channels_redis.core.RedisChannelLayer",
        CONFIG={
            "hosts": [("127.0.0.1", 6379)],
        },
    ),
}
```

### 修改（回调）视图

```python
from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer
from rest_framework.decorators import api_view

@api_view(['POST'])
def callback(request, biz: str):
    channel_layer = get_channel_layer()
    async_to_sync(channel_layer.group_send)(
        f'order_{order.biz}',
        dict(
            type='send_data_to_frontend',
            data={ 'biz': biz, 'paid': True },
        )
    )
```

## 参考

1. StackOverflow：[Send message using Django Channels from outside Consumer class](https://stackoverflow.com/a/58372995)
2. Channels：[Channel Layers](https://channels.readthedocs.io/en/latest/topics/channel_layers.html)
