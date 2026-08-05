---
title: Golang 创建同一个变量
createAt: 2019-11-04 10:32
expires: 1096
tags:
    - 开发
    - Golang
    - 语法特性
excerpt:
---

<hr style="margin-top: 48px"/>

在阅读别人的工程代码时，发现有一个函数内调用的方法都是返回一个不同类型的值+error。

显然，为了避免错误，除了获取目的返回值，还应该获取返回的error，判断它有没有出错。

而工程代码中的写法是：

```go
aaa, err := function(……)
if err != nil {
    return ……
}

bbb, err := function(……)
if err != nil {
    return ……
}
```

是的，没错，工程代码中使用了 `:=` 创建了同一个变量 `err`。

不是说 `:=` 左边必须是一个新的变量吗？于是编写试验代码：（go1.12.7 windows/amd64）

```go
package main

import (
    "fmt"
)

func main() {
    val := 123
    val := 456
    fmt.Println(val)
}
```

果不其然，报 “no new variables on left side of :=” 。

于是换一种方法：

```go
package main

import (
    "fmt"
)

func main() {
    bytes, kk := 789, 123
    result, kk := 112, 456
    fmt.Println(bytes, result)
    fmt.Println(kk)
}
```

发现竟然编译通过。

也就是说，的确可以通过创建多个变量的方式，创建一个已经创建过的变量。

原理尚不清楚，日后再深究。
