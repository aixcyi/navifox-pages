---
title: 微信扫码支付的响应
outline: deep
createAt: 2024-01-24 15:41
expires: 365
tags:
    - 开发
    - 测试
excerpt:
    本地调试返回的一些响应，不代表全部。不过之前的解析做得比较混乱，这里记个备忘。
---

目前[微信扫码支付](https://pay.weixin.qq.com/wiki/doc/api/micropay.php?chapter=9_10&index=1)还属于v2接口，所以 wechatpayv3 没有。

## 代码示例

`<return_code>` 和 `<result_code>` 只要有一个不为 `SUCCESS` 就会报 `WeChatPayException` 。

```python :line-numbers
from django.conf import settings
from wechatpy import WeChatPay, WeChatPayException

total_price = 0.01
api = WeChatPay(
    appid=settings.WECHAT_PAY_APP_ID,
    mch_id=settings.WECHAT_PAY_MCH_ID,
    api_key=settings.WECHAT_PAY_API_KEY,
    mch_key=settings.WECHAT_PAY_MCH_KEY,
    sub_appid=None,
    sub_mch_id='每个子商户的mch_id',
)
try:
    result: dict = api.micropay.create(
        body='商品描述',
        auth_code='微信用户付款码',
        total_fee=int(total_price * 100),  # 要支付的最终价，单位从元转为分
        out_trade_no='我们自己的订单号',
    )
except WeChatPayException as e:
    print(e.errcode)  # <err_code></err_code>
    print(e.errmsg)  # <err_code_des></err_code_des>
    print(e.return_code)  # <return_code></return_code>
    print(e.result_code)  # <result_code></result_code>
    print(e.return_msg)  # <return_msg></return_msg>
```

## 响应内容示例

### 双SUCCESS示例（`return_code` 和 `result_code`）

#### 支付成功

```xml :line-numbers
<xml>
    <return_code><![CDATA[SUCCESS]]></return_code>
    <return_msg><![CDATA[OK]]></return_msg>
    <result_code><![CDATA[SUCCESS]]></result_code>
    <mch_id><![CDATA[**********]]></mch_id>
    <appid><![CDATA[wx****************]]></appid>
    <openid><![CDATA[oj0ed5**********************]]></openid>
    <is_subscribe><![CDATA[N]]></is_subscribe>
    <sub_mch_id><![CDATA[**********]]></sub_mch_id>
    <trade_type><![CDATA[MICROPAY]]></trade_type>
    <trade_state><![CDATA[SUCCESS]]></trade_state>
    <bank_type><![CDATA[OTHERS]]></bank_type>
    <total_fee>1</total_fee>
    <fee_type><![CDATA[CNY]]></fee_type>
    <cash_fee>1</cash_fee>
    <cash_fee_type><![CDATA[CNY]]></cash_fee_type>
    <transaction_id><![CDATA[42000***********************]]></transaction_id>
    <out_trade_no><![CDATA[KATI1706***********]]></out_trade_no>
    <attach><![CDATA[]]></attach>
    <time_end><![CDATA[202401********]]></time_end>
    <trade_state_desc><![CDATA[支付成功]]></trade_state_desc>
    <nonce_str><![CDATA[base62字符串]]></nonce_str>
    <sign><![CDATA[BASE64字符串]]></sign>
</xml>
```

#### 支付失败，请撤销订单

```xml :line-numbers
<xml>
    <return_code><![CDATA[SUCCESS]]></return_code>
    <return_msg><![CDATA[OK]]></return_msg>
    <result_code><![CDATA[SUCCESS]]></result_code>
    <mch_id><![CDATA[**********]]></mch_id>
    <appid><![CDATA[wx****************]]></appid>
    <sub_mch_id><![CDATA[**********]]></sub_mch_id>
    <trade_state><![CDATA[PAYERROR]]></trade_state>
    <out_trade_no><![CDATA[KATI1706***********]]></out_trade_no>
    <attach><![CDATA[]]></attach>
    <trade_state_desc><![CDATA[支付失败，请撤销订单]]></trade_state_desc>
    <nonce_str><![CDATA[base62字符串]]></nonce_str>
    <sign><![CDATA[BASE64字符串]]></sign>
</xml>
```

#### 等待用户输入密码

```xml :line-numbers
<xml>
    <return_code><![CDATA[SUCCESS]]></return_code>
    <return_msg><![CDATA[OK]]></return_msg>
    <result_code><![CDATA[SUCCESS]]></result_code>
    <mch_id><![CDATA[**********]]></mch_id>
    <appid><![CDATA[wx****************]]></appid>
    <sub_mch_id><![CDATA[**********]]></sub_mch_id>
    <trade_state><![CDATA[USERPAYING]]></trade_state>
    <out_trade_no><![CDATA[KATI1706***********]]></out_trade_no>
    <attach><![CDATA[]]></attach>
    <trade_state_desc><![CDATA[需要用户输入支付密码]]></trade_state_desc>
    <nonce_str><![CDATA[base62字符串]]></nonce_str>
    <sign><![CDATA[BASE64字符串]]></sign>
</xml>
```

### 单SUCCESS（仅 `return_code`）

#### 付款码已被使用

```xml :line-numbers
<xml>
    <return_code><![CDATA[SUCCESS]]></return_code>
    <return_msg><![CDATA[OK]]></return_msg>
    <result_code><![CDATA[FAIL]]></result_code>
    <err_code_des><![CDATA[101 每个二维码仅限使用一次，请刷新再试]]></err_code_des>
    <err_code><![CDATA[AUTH_CODE_INVALID]]></err_code>
    <mch_id><![CDATA[**********]]></mch_id>
    <appid><![CDATA[wx****************]]></appid>
    <sub_mch_id><![CDATA[**********]]></sub_mch_id>
    <nonce_str><![CDATA[base62字符串]]></nonce_str>
    <sign><![CDATA[BASE64字符串]]></sign>
</xml>
```

#### 用户取消支付

```xml :line-numbers
<xml>
    <return_code><![CDATA[SUCCESS]]></return_code>
    <return_msg><![CDATA[OK]]></return_msg>
    <result_code><![CDATA[FAIL]]></result_code>
    <err_code_des><![CDATA[用户取消支付]]></err_code_des>
    <err_code><![CDATA[TRADE_ERROR]]></err_code>
    <mch_id><![CDATA[**********]]></mch_id>
    <appid><![CDATA[wx****************]]></appid>
    <sub_mch_id><![CDATA[**********]]></sub_mch_id>
    <nonce_str><![CDATA[base62字符串]]></nonce_str>
    <sign><![CDATA[BASE64字符串]]></sign>
</xml>
```

#### 需要用户确认支付

```xml :line-numbers
<xml>
    <return_code><![CDATA[SUCCESS]]></return_code>
    <return_msg><![CDATA[OK]]></return_msg>
    <result_code><![CDATA[FAIL]]></result_code>
    <err_code_des><![CDATA[用户已在1分钟内支付过金额相同的订单，需用户确认后继续支付。]]></err_code_des>
    <err_code><![CDATA[USERPAYING]]></err_code>
    <mch_id><![CDATA[**********]]></mch_id>
    <appid><![CDATA[wx****************]]></appid>
    <sub_mch_id><![CDATA[**********]]></sub_mch_id>
    <nonce_str><![CDATA[base62字符串]]></nonce_str>
    <sign><![CDATA[BASE64字符串]]></sign>
</xml>
```

