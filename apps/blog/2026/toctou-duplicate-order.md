---
title: 重复下单的 TOCTOU 竞态的排查与修复
createAt: 2026-08-31 15:09
category: 开发
tags:
  - TOCTOU
  - 并发
  - Redis
  - Django
  - 幂等
excerpt:
  门店反馈短时间内出现了两笔完全相同的订单，但下单接口明明有防重逻辑，说明设计上仍有缺陷。
---

# 重复下单的 TOCTOU 竞态的排查与修复

## 现象：重复下单

　　门店反馈短时间内出现了两笔完全相同的订单：同一收银员、同一台收银机，连续打出两张内容一模一样的小票（同一种饮品 ×2，现金 40 元），订单牌号还是连号的（038、039）。

　　一开始是怀疑前端没做 loading 导致收银员手滑重复点击，但两笔订单db给的创建时间只差了 1.1 毫秒，这个量级只可能是程序层面的重复请求。

## 排查：发现 TOCTOU

　　查之前发现由毫秒时间戳 + 两位随机数的订单号 `178798698331731` 和 `178798698331779` 只有随机数不同，说明两个订单号是在同一毫秒内生成出来的。

　　订单牌号由 Redis 原子自增分配，产生了连续的 `038`、`039` 说明两个完整的下单请求都执行到了分配牌号这一步，而不是“一个请求创建了两笔订单”。

　　再把统计范围放宽：同一收银员 1 秒内连续创建两笔订单的情况，一周内出现了 30 余例，涉及 5 家门店，间隔大多在 0.4~15 毫秒，甚至出现过一毫秒内三笔。

　　到这已经排除了偶发因素，代码里应该是存在一个稳定的并发窗口，能够导致两个几乎同时到达的请求，都通过了同一道防重检查。

　　不过下单接口原本就有防重检查，会自动查同一个收银员的上一笔订单，如果创建时间距今不足 1 秒，就拒绝本次下单。大概逻辑如下：

```python
def counter_ordering(request):
    previous = Order.objects.filter(cashier=request.user).order_by('-id').first()
    if previous and (now() - previous.created_at).total_seconds() <= 1:
        return resp200(msg='下单请求过快')
    # ... 创建订单
```

　　既然出现了重复下单问题，就说明这段代码没有防住，最有可能的情况是两个请求几乎同时到达（部署用的 gunicorn 默认开 4 条进程，不并发就有鬼了），然后分别执行了上面的查询，但因为各自都没有保存，所以拿到的上一笔订单的创建时间差值肯定远大于 1 秒，导致两个请求都执行下去了，最后呈现为重复下单。

　　问了下 AI 发现这是一个 **TOCTOU**（Time-of-check to time-of-use，检查时点与使用时点）竞态：**先检查、后执行**，而检查与执行之间没有任何原子性。

　　在 DSH 让大肥鱼审计代码发现，订单号生成函数里也有一个竞态：

```python
def gen_order_no():
    while True:
        order_no = str(int(time.time() * 1000)) + random_two_digits()
        if not cache.get(order_no):  # 先检查
            break
    cache.set(order_no, True, timeout=1)  # 后占用
    return order_no
```

　　同样是“先检查、后占用”：两个并发请求在同一毫秒生成了相同前缀的订单号、随机后缀又恰好不同时，都能通过 `cache.get()`（此时谁都没写入），于是两笔订单拿到了同前缀的订单号。

　　虽然随机数这次侥幸没撞，但始终都会存在同毫秒下随机数相同导致产生 **一模一样的订单号** 的问题。

## 修复：合并原子操作

　　原来的逻辑其实也还可以，只是需要把检查和占用合并成一个原子操作。刚好 Redis 的 `SETNX` 就是原子原语，对应 Django 的 `cache.add()`，key 不存在时设置并返回 `True`，已存在时直接返回 `False`，两者之间没有窗口。

　　大肥鱼把防重逻辑从视图函数里抽成一个装饰器，订单号生成也改成原子占用：

```python
def single_order_lock(timeout=3):
    def decorator(view_func):
        @wraps(view_func)
        def wrapper(request, *args, **kwargs):
            lock_key = f'OrderingLock:{request.user.id}'
            if not cache.add(lock_key, True, timeout=timeout):  # SETNX 原子占用
                return resp200(msg='下单请求过快')
            try:
                return view_func(request, *args, **kwargs)
            finally:
                cache.delete(lock_key)  # 请求结束立即释放
        return wrapper
    return decorator
```

> 1. **原子占用**：`cache.add` 把“检查有没有锁”和“写入锁”合并为一步，并发请求只有一个能成功，其余直接返回“下单请求过快”；
> 2. **finally 释放**：锁只保护“检查 + 创建”这段临界区，请求一结束就释放，正常连续下单不受影响（原实现“上一单 1 秒内拒绝”的副作用也随之消失）；
> 3. **超时兜底**：`timeout=3` 秒，万一进程在持锁期间崩溃，锁也会自动过期，不会把收银台卡死。

```python
def gen_order_no():
    while True:
        order_no = str(int(time.time() * 1000)) + random_two_digits()
        if cache.add(order_no, True, timeout=1):  # 原子 SETNX，占用成功才跳出
            break
    return order_no
```
