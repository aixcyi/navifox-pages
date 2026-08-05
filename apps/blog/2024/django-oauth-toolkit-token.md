---
title: Django OAuth Toolkit 令牌机制
outline: deep
createAt: 2024-02-20 11:55
expires: 1096
tags:
    - 开发
    - Django
    - 协议
    - ORM
excerpt:
    简述 [Django OAuth Toolkit](https://django-oauth-toolkit.readthedocs.io/en/latest/)
    中的令牌 `Token` 的生成、刷新、撤销、获取时，数据库层面的行为，以及 ORM 模型字段的变化。
---

<style scoped>
.VPDoc p:not(.custom-block-title) {
    text-indent: 2em;
}
</style>

> [!TIP] 提示
> 正常来说应该继承 `OAuthLibMixin` 写一个类视图，调用 `create_token_response()` 来生成和刷新令牌，调用 `create_revocation_response()` 来撤销令牌，但如果要手动实现某些过程，可以参考本文的伪代码。

## 生成（grant）

令牌字符串（即 `token` 字段的值）使用 `oauthlib.common` 的 `generate_token()` 生成。因为 RefreshToken 要指向 AccessToken，所以应当先创建后者。

```python
from oauth2_provider.models import AccessToken, RefreshToken

AccessToken(id=1, source_refresh_token=None)
RefreshToken(id=1, access_token=AccessToken(id=1))
```

## 刷新（refresh）

业务层面上看，无论 access_token 是否已过期，只要使用 refresh_token 进行刷新，都会创建一对全新的令牌（字符串），旧的那对会一并立刻失效。

> 有的平台约定了刷新令牌的有效期，有的没有，有的则语焉不详，然而实际上并不需要知道刷新令牌的有效期，因为当刷新令牌失效的时候，唯一能采取的手段是重新登录，但刷新令牌的存在恰恰是为了减少用户交互。见 [Refreshing an Access Token](https://www.oauth.com/oauth2-servers/making-authenticated-requests/refreshing-an-access-token/)

数据库层面上看，AccessToken 一直都是那一行，即 `id` 不变，只是 `token` 的值会重新生成，过期时间 `expires` 也会被重置；而 RefreshToken 则是在表中添加新的一行，原来那一行的 `token` 不变。

```python
from datetime import timedelta
from django.utils import timezone
from oauthlib.common import generate_token
from oauth2_provider.settings import oauth2_settings
from oauth2_provider.models import AccessToken, RefreshToken

# 撤销旧的刷新令牌（标记删除）
RefreshToken(id=1).revoked = timezone.now()
# 取消与访问令牌的关联
RefreshToken(id=1).access_token = None
# 创建新的刷新令牌，并关联旧的访问令牌
RefreshToken(id=2, access_token_id=1)

# 为旧的访问令牌设置一个全新的令牌字符串
AccessToken(id=1).token = generate_token()
# 表示由旧的刷新令牌刷新而来
AccessToken(id=1).source_refresh_token = RefreshToken(id=1)
# 重置旧的访问令牌的过期时间
AccessToken(id=1).expires = timezone.now() + timedelta(seconds=oauth2_settings.ACCESS_TOKEN_EXPIRE_SECONDS)
```

## 撤销（revoke）

指不再承认当前登录状态。只需要调用 RefreshToken 的 `revoke()` 就好了，内部逻辑是标记删除 AccessToken 并物理删除 RefreshToken。

```python
from oauth2_provider.models import RefreshToken

refresh = RefreshToken.objects.get(token='<刷新令牌>')
refresh.revoke()
```

> [!WARNING] 注意
> 虽然 AccessToken 对象也有 `revoke()` 方法，但这仅用于解耦，直接调用没有任何实际意义。

## 获取

#### 通过 RefreshToken 获取 AccessToken

RefreshToken 的字段 `access_token` 一对一关联了 AccessToken，所以直接访问这个属性就好了。

```python
from oauth2_provider.models import RefreshToken

refresh = RefreshToken.objects.get(token='<刷新令牌>')
access = refresh.access_token
```

#### 通过 AccessToken 获取 RefreshToken

RefreshToken 的字段 `access_token` 一对一关联并反射到 AccessToken 对象上，反射的名称是 `refresh_token`。注意，没有对应的 RefreshToken 实际上表现为 AccessToken 对象上没有这个属性。

```python
from oauth2_provider.models import AccessToken

access = AccessToken.objects.get(token='<访问令牌>')
refresh = access.refresh_token if hasattr(access, 'refresh_token') else None
```

> [!NOTE] 关于“反射”
> 见 ForeignKey 的 [related_name](https://docs.djangoproject.com/zh-hans/5.2/ref/models/fields/#django.db.models.ForeignKey.related_name)，在 [OneToOneField](https://docs.djangoproject.com/zh-hans/5.0/ref/models/fields/#onetoonefield) 中将反射为单个对象，而非一个查询集。
