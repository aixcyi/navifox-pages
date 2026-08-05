---
navTitle: Django 及衍生的类视图
title: 浅析 Django 及衍生的类视图
outline: deep
createAt: 2022-10-11 11:52
expires: 1096
tags:
    - 开发
    - Django
    - DRF
excerpt:
    浅析 [Django](https://docs.djangoproject.com/zh-hans/5.2/topics/class-based-views/)
    与 [Django REST Framework](https://www.django-rest-framework.org/api-guide/views/) 两个框架视图类的脉络。
---

## 类的继承脉络 {#hierarchy}

### 视图（基类） {#view}

主要逻辑通过在这几个类扩写，它们通过单继承来扩展：

- `View` 只提供了基本的将HTTP请求转发到同名类方法处理的功能。
- `APIView` 提供了标头定制、权限检查、限流、请求内容解析定制、响应内容序列化定制、异常处理、接口版本管理等功能。
- `GenericAPIView` 提供了查询集、对象、序列化器的获取接口，以及分页接口。

以上，所有HTTP请求都会按照HTTP方法转发给 **同名类方法** 来处理。梳理基类的脉络可以看[dispatch线](#dispatch)。

### 视图集 {#viewset}

混入了 `ViewSetMixin` 通过其中的 `as_view` 方法允许一个视图类处理多个同种HTTP请求，比如列表的GET和详情的GET分别转发到自定义的 `.list()` 和 `retrieve()` ，继而衍生出以下视图集类：

- `ViewSet` = `ViewSetMixin` + `APIView`
- `GenericViewSet` = `ViewSetMixin` + `GenericAPIView`

写路由时必须要使用 `as_view` 并且指定HTTP请求与类方法的映射。梳理视图集的脉络可以看[as_view线](#as_view)。

### 视图集 Pro Max Plus {#viewset-subclass}

`GenericAPIView` 和 `GenericViewSet` 又可以通过混入以下几个基础的 Mix-in 衍生出一堆预制的视图类。

- **ListModelMixin** 通过 `.list()` 列出一份查询集，并调用 `GenericAPIView` 的 `.paginate_queryset()` 和 `.get_paginated_response()` 进行分页。
- **CreateModelMixin** 通过 `.create()` 创建一个模型并返回201，最终是通过 `.perform_create()` 用序列化器创建。
- **RetrieveModelMixin** 通过 `.retrieve()` 获取一个模型实例。
- **UpdateModelMixin** 通过 `.update()` 全量更新和 `.partial_update()` 部分更新一个模型实例，最终是通过 `.perform_update()` 用序列化器更新。
- **DestroyModelMixin** 通过 `.destroy()` 删除一个模型实例并返回无内容的204，最终是通过 `.perform_destroy()` 直接删除模型实例。

![各个类视图的关系](/media/drf-views.png)

下面通过两条主线来浅析视图(集)。

## `dispatch()` 线 {#dispatch}

Django 的 `View` 通过 `.dispatch()` 将接收到的 [`HttpRequest`](https://docs.djangoproject.com/zh-hans/5.2/ref/request-response/#httprequest-objects) 转发到HTTP同名类方法处理并返回 [`HttpResponse`](https://docs.djangoproject.com/zh-hans/5.2/ref/request-response/#httpresponse-objects) ，流程如以下代码所示意：

```python
from django.views.generic.base import View

class MeowView(View):

    # GET 请求将被转发到这个函数来处理
    def get(self, request, *args, **kwargs):
        pass

    # POST 请求将被转发到这里
    def post(self, request, *args, **kwargs):
        pass

    # OPTIONS、PUT、DELETE 等同理
```

方法的代码大致如下：

```python
# 省略了很多细节...
def dispatch(self, request, *args, **kwargs):
    # 将请求转发到同名类方法来处理
    if request.method.lower() in self.http_method_names:
        handler = getattr(self, request.method.lower(),
                          self.http_method_not_allowed)
    # 如果找不到，或请求方法是非法的，
    # 就转到 self.http_method_not_allowed() 处理。
    else:
        handler = self.http_method_not_allowed
    return handler(request, *args, **kwargs)
```

DRF 的 `APIView` 重载了 `.dispatch()`，主要作用与前者一样，但添加了

- `.initialize_request()` 定制请求对象；
- `.initial()` 在处理前初始化；
- 兜住处理时的异常，并交给 `.handle_exception()` 处理；
- `.finalize_response()` 定制响应对象

几个特性。其代码大致如下：

```python
# 省略了很多细节...
def dispatch(self, request, *args, **kwargs):
    # 初始化request的一些东西，比如身份验证。
    request = self.initialize_request(request, *args, **kwargs)

    # 附加到对象中。在不能或不便传参的地方使用视图对象来获得当前请求。
    self.request = request

    try:
        # 初始化。身份验证、权限检查、频率限制就是在这里做的。
        # 可以继承重写添加自己的初始化，比如控制查询集范围等。
        self.initial(request, *args, **kwargs)

        # 将请求转发到同名类方法来处理
        if request.method.lower() in self.http_method_names:
            handler = getattr(self, request.method.lower(),
                              self.http_method_not_allowed)
        # 如果找不到，或请求方法是非法的，
        # 就转到 self.http_method_not_allowed() 处理。
        else:
            handler = self.http_method_not_allowed
        response = handler(request, *args, **kwargs)

    # 处理异常。注意这里拦截的是 Exception，像 KeyboardInterrupt 这些是拦截不到的。
    except Exception as exc:
        response = self.handle_exception(exc)

    # 整理response。在这里定制自己需要的返回值格式、响应码等等。
    self.response = self.finalize_response(request, response, *args, **kwargs)
    return self.response
```

## `as_view()` 线 {#as_view}

`.as_view()` 是将视图类的初始化、执行等操作存储在一个函数中（有点装饰器那味儿），供路由调用，也就是处理请求和响应的主入口（Main entry point for a request-response process.）。

`View` 的 `as_view()` 代码大致如下：

```python
# 省略了很多细节...
@classonlymethod
def as_view(cls, **initkwargs):
    # 这个 initkwargs 是下面用来初始化 View 的参数，
    # 键不能是HTTP请求方法，也不能是 View 没有的属性；
    # 而回看 View 发现 __init__() 是自定义 self 的属性或方法，
    # 因此 as_view() 实际上是允许我们
    # 覆盖 View 对象原有的属性和方法（除了处理请求那部分）。

    def view(request, *args, **kwargs):
        self = cls(**initkwargs)
        self.setup(request, *args, **kwargs)
        if not hasattr(self, 'request'):
            raise AttributeError()
        return self.dispatch(request, *args, **kwargs)

    view.view_class = cls
    view.view_initkwargs = initkwargs
    return view
```

而 `APIView` 的 `as_view()` 除了要求 **视图类** 不能直接存储查询集之外，也仅仅充当一个基类的作用，并没有添加什么东西。

代码大致如下：

```python
# 省略了很多细节...
@classmethod
def as_view(cls, **initkwargs):

    view = super().as_view(**initkwargs)
    view.cls = cls
    view.initkwargs = initkwargs

    # 对基于会话的身份验证进行CSRF校验。
    return csrf_exempt(view)
```

`ViewSetMixin` 允许一个视图类处理多个同种HTTP请求，比如列表的GET和详情的GET分别转发到自定义的 `.list()` 和 `retrieve()` 。

究其原因是在 `MeowViewSet.as_view()` 时将 `MeowViewSet` 对象的 `list` 复制到了 `get` 上，导致虽然 `.dispatch()` 虽然还是机械地转发GET请求到 `.get()` 、POST请求到 `.post()` ……，但此时调用的 `.get()` 实际上就是 `.list()` ，故而只要创建不同的 `MeowViewSet` 对象就能实现一句代码分别处理列表的GET和详情的GET。

代码大致如下：

```python
# 省略了很多细节...
@classonlymethod
def as_view(cls, actions=None, **initkwargs):

    def view(request, *args, **kwargs):
        self = cls(**initkwargs)

        if 'get' in actions and 'head' not in actions:
            actions['head'] = actions['get']

        # 从这里可以看出来，
        # actions 的键是 HTTP 方法名，值则是已经存在的方法的方法名。
        self.action_map = actions
        for method, action in actions.items():
            handler = getattr(self, action)
            setattr(self, method, handler)

        # 3.14.0 的版本依然有这段代码，
        # 感觉貌似是跟 dispatch() 里的重复了。
        self.request = request
        self.args = args
        self.kwargs = kwargs

        return self.dispatch(request, *args, **kwargs)

    view.cls = cls
    view.initkwargs = initkwargs
    view.actions = actions
    return csrf_exempt(view)
```
