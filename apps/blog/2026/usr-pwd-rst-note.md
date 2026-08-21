---
title: 用户密码重置注意事项
createAt: 2026-01-25 00:57
domain: 框架
genre: 复盘
tags:
  - Django
  - DRF
  - 缓存
excerpt:
  实施在帮助门店管理员重置密码时发现，重置完成后（前端没有跳转退出）手动退出，再次登录时只能使用旧密码登录。
---

# 用户密码重置注意事项

## 问题描述

　　实施在帮助门店管理员重置密码时发现，重置完成后（前端没有跳转退出）手动退出，再次登录时只能使用旧密码登录。

## 排查思路

　　首先在本地给密码重置接口打上非挂起断点，发现接口密码哈希变量有值，用户 ORM
对象密码字段有发生变化，说明哈希成功；静置一分钟用数据库工具查询用户密码字段，也已经改变，说明事务已提交，排除事务问题。

　　接着给“登录”接口打上非挂起断点，发现登录时取得的用户 ORM 对象密码字段还是旧密码的哈希，说明在密码重置后、用户登录前，数据已被“回滚”。

　　此时没有什么头绪，于是打开本地 db 日志（平时为了减少信息量基本是关着的），复现了一遍从重置、退出，到登录的过程，发现出现了两条对用户表的 UPDATE：

　　第一条是重置密码产生的，对比密码字段发现是新哈希；第二条则将密码字段“重置”回了旧哈希。对比日志上下文，定位到“退出”接口。

　　之前同事拆分了认证鉴权与具体业务，“退出”接口的伪代码大致如下：

```python
from django.core.cache import cache

def logout(user):
    if user:
        cache.delete(f'token:{user.token}')
        user.token = ""
        user.save()
```

　　在这里打上非挂起断点，发现 `user.password` 确实是旧哈希。初步定位到问题。

　　方法的参数 `user` 是通过上层统一调度的，上层直接从请求的 `request.user` 提取提供。

　　项目使用了 Django REST Framework，直接暴露的视图拿到的是
[`Request().user`](https://www.django-rest-framework.org/api-guide/requests/#user)，这个是在
`APIView().initialize_request()` 时由 `@authentication_classes([...])`
提供的。

　　现在定位到通用视图的注解
`@authentication_classes([UserAuthentication])` 中的
`UserAuthentication.authenticate(request)`，发现它使用了缓存，在失效前会始终返回缓存，缓存是很简单的
`cache.set(..., user)` 。

　　Django 的 Model 实现了
[`__getstate__()`](https://docs.python.org/zh-cn/3/library/pickle.html#object.__getstate__)
属于[可 pickle 对象](https://docs.python.org/zh-cn/3/library/pickle.html#what-can-be-pickled-and-unpickled)，所以可以直接被
Django 的[底层缓存 API](https://docs.djangoproject.com/zh-hans/5.2/topics/cache/#the-low-level-cache-api)
接受。然而，它的 `__getstate__()` 是简单的 `self.__dict__.copy()`，这也意味着密码字段 `password` 也被一并复制。

　　公司开发更倾向于使用 `Model().save()`，一般情况下并无不妥，但在这里，旧密码的哈希残留在了缓存中，“退出”接口被调用后，随着空白令牌、更新时间等字段一并
UPDATE，从而被“回滚”了。

## 总结

1. “登出”接口、“密码重置”接口等不应使用来自缓存的用户信息，而应该触发
   SQL 查询重新获得一个新的 ORM 对象，这样可以避免来自缓存的干扰，不管是不是“密码”字段。
2. “密码重置”接口应当承接“登出”的功能，主动执行清除缓存中的用户信息、数据库中的令牌，更新时间等操作，避免其它环节受到来自缓存的干扰。
