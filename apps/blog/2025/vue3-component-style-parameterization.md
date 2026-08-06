---
title: Vue 3 组件样式参数化
outline: deep
createAt: 2025-08-13 10:14
expires: 1096
tags:
    - 开发
    - Vue 3
excerpt:
    有时候可能希望同一个 Vue 组件有不同的颜色（样式），本文对比了两种实现方法。
---

# Vue 3 组件样式参数化

## 提供自定义属性（变量）

在只有一个顶层元素的情况下，子组件可以将允许重写的样式用自定义属性（变量）代替并放到顶层元素。

这种方法比较方便、直接，且原生，但需要很多命名，对可能会经常重构的朋友不甚友好，并且与 Tailwind 风格不搭。

子组件示例：

```vue :line-numbers [AiField.vue]
<script lang="ts" setup>
defineProps<{ prompt: string, code: string }>()
</script>

<template>
<code class="ai-field">
    <span class="prompt">{{ prompt }}</span>
    <div class="content" contenteditable="plaintext-only">{{ code }}</div>
    <button class="operation">复制</button>
</code>
</template>

<style lang="css" scoped>
.ai-field {
    --border-normal: gray;
    --border-focus: darkcyan;
    --prompt-normal: darkgrey;
    --prompt-focus: cyan;

    border-color: var(--border-normal);

    .prompt {
        background-color: var(--prompt-normal);
    }

    &:focus-within {
        border-color: var(--border-focus);

        .prompt {
            background-color: var(--prompt-focus);
        }
    }
}
</style>
```

父组件示例：


```vue :line-numbers [Home.vue]
<template>
<div class="container">
    <ai-field prompt="昵称" code="路狐羽" />
    <ai-field prompt="ＩＤ" code="aixcyi" />
    <ai-field prompt="链接" code="https://navifox.net/" />
</div>
</template>

<style lang="css" scoped>
.ai-field {
    --prompt-normal: darkred;
    --prompt-focus: red;
}
</style>
```

## `:deep()` 样式穿透

子组件的 `<script>` 块因为具有 `scoped`，父组件无法对其染指，此时需要借助
[`:deep()`](https://cn.vuejs.org/api/sfc-css-features.html#deep-selectors)
才能对子组件内部造成影响。

子组件示例：

```vue :line-numbers [AiField.vue]
<script lang="ts" setup>
defineProps<{ prompt: string, code: string }>()
</script>

<template>
<code class="ai-field">
    <span class="prompt">{{ prompt }}</span>
    <div class="content" contenteditable="plaintext-only">{{ code }}</div>
    <button class="operation">复制</button>
</code>
</template>

<style lang="css" scoped>
.ai-field {
    border-color: gray;

    .prompt {
        background-color: darkgrey;
    }

    &:focus-within {
        border-color: darkcyan;

        .prompt {
            background-color: cyan;
        }
    }
}
</style>
```

父组件示例：


```vue :line-numbers [Home.vue]
<template>
<div class="container">
    <ai-field prompt="昵称" code="路狐羽" />
    <ai-field prompt="ＩＤ" code="aixcyi" />
    <ai-field prompt="链接" code="https://navifox.net/" />
</div>
</template>

<style lang="css" scoped>
.ai-field:deep(.prompt) {
    background-color: black;
}
</style>
```

## 双向同步

子组件将允许重写的样式定义成一个对象引用，并借助 `defineExpose()` 公开；父组件通过引用的方式拿到这个对象，对其进行修改。

这种方式无须纠结命名，而且可以借助嵌套对象来解构、抽象参数（样式），同时具备一定的类型提示，但缺点是样式需要写在脚本中（所以比较适合批量时使用），并且伴随一堆额外代码。

子组件示例：

```vue :line-numbers [AiField.vue]
<script lang="ts" setup>
import {defineExpose, ref } from "vue"; 
const colors = ref({
    border: { normal: 'gray', focus: 'darkcyan' },
    prompt: {
        bg: { normal: 'darkgrey', focus: 'darkcyan' },
        text: { normal: '#ffffff7F', focus: 'cyan' },
    },
})
defineProps<{ prompt: string, code: string }>()
defineExpose({ colors })
</script>

<template>
<code class="ai-field">
    <span class="prompt">{{ prompt }}</span>
    <div class="content" contenteditable="plaintext-only">{{ code }}</div>
    <button class="operation">复制</button>
</code>
</template>

<style lang="css" scoped>
.ai-field {
    border-color: v-bind('colors.border.normal');

    .prompt {
        background-color: v-bind('colors.prompt.bg.normal');
    }

    &:focus-within {
        border-color: v-bind('colors.border.focus');

        .prompt {
            background-color: v-bind('colors.prompt.bg.focus');
        }
    }
}
</style>
```

父组件示例：


```vue :line-numbers [Home.vue]
<script lang="ts" setup>
import { onMounted, useTemplateRef } from "vue"; 
const fields = useTemplateRef('field')

onMounted(() => {
    Array.from(fields.value?.values() || []).filter(Boolean).forEach(v => {
        v!.colors.prompt.bg.focus = 'darkorange'
        v!.colors.border.focus = 'orange'
    })
})
</script>

<template>
<div class="container">
    <ai-field ref="field" prompt="昵称" code="路狐羽" />
    <ai-field ref="field" prompt="ＩＤ" code="aixcyi" />
    <ai-field ref="field" prompt="链接" code="https://navifox.net/" />
</div>
</template>
```
