---
title: VitePress 数据加载机制备忘
outline: deep
createAt: 2026-08-21 02:17
domain: 工程
genre: 笔记
tags:
  - VitePress
  - createContentLoader
  - transformPageData
  - gray-matter
excerpt:
  结合 VitePress 官方文档与 GitHub 源码，梳理页面数据钩子 `transformPageData()` 与 _构建期数据加载_ 两套数据加载机制。
---

# VitePress 数据加载机制备忘

> [!NOTE]
> 本文基于 VitePress
> [`2.0.0-alpha.18`](https://github.com/vuejs/vitepress/tree/v2.0.0-alpha.18)
> 版本源码及官方文档整理。

　　VitePress 官方文档把构建期数据处理分成**互不相通**的两套机制，这两套机制都在 Node 侧执行，并将结果序列化为 JSON 注入到客户端。

|          |                           [页面数据钩子](https://vitepress.dev/zh/reference/site-config#transformpagedata)                            |                    [构建期数据加载](https://vitepress.dev/zh/guide/data-loading)                    |
|:--------:|:-------------------------------------------------------------------------------------------------------------------------------:|:--------------------------------------------------------------------------------------------:|
| **数据源**  |                   当前 Markdown<br/>顶部的 [_frontmatter_](https://vitepress.dev/zh/reference/frontmatter-config)                    |             一般是所有匹配的 Markdown，<br/>也可以是任意本地文件、<br/>任意远程接口响应……<br/>总之是加载器获取的任意数据              |
|  **提供**  | 站点配置 ./.vitepress/config.ts 中的<br/>[`transformPageData()`](https://vitepress.dev/zh/reference/site-config#transformpagedata) 钩子 | 定义一个 [xxx.data.ts](https://vitepress.dev/zh/guide/data-loading)<br/>默认导出 `{ watch, load() }` |
|  **取用**  |                         页面或组件内调用 [`useData()`](https://vitepress.dev/zh/reference/runtime-api#usedata)                          |                     页面或组件内直接导入<br/>`import { data } from 'xxx.data.ts';`                     |
| **执行时机** |                                                每个页面编译时执行<br/>也就是 dev 与 build 均执行                                                |                               模块被构建、被请求时执行<br/>dev 下随 HMR 重新运行                               |
|  **用途**  |                                                 侧边栏<br/>写作日期<br/>动态路由参数<br/>……                                                  |                            目录页<br/>归档页<br/>搜索索引<br/>RSS 生成<br/>……                            |

## 页面数据钩子

### 提供

　　在站点配置中添加 `transformPageData()` 钩子，然后可以原地修改 PageData，通常是改 _frontmatter_
或往里面添加字段；一般不用写返回语句，但如果返回一个对象，VitePress 会浅合并进 PageData（顶层同名键覆盖）。

```ts [.vitepress/config.ts]
import { defineConfig, type PageData } from 'vitepress';

export default defineConfig({
    transformPageData(pageData: PageData, { siteConfig }) {
        pageData.frontmatter.head ??= [];
        pageData.frontmatter.head.push(
            ['meta', { name: 'og:title', content: pageData.title }]
        );
        return {
            extraField: 'value',
        };
    },
});
```

[PageData](https://github.com/vuejs/vitepress/blob/v2.0.0-alpha.18/types/shared.d.ts#L22)数据结构如下：

```ts
export interface PageData {
    relativePath: string
    filePath: string
    title: string
    titleTemplate?: string | boolean
    description: string
    headers: Header[]
    frontmatter: Record<string, any>
    params?: Record<string, any>
    isNotFound?: boolean
    lastUpdated?: number
}
```

|      字段      | 说明                                                                                                                                                                               |
|:------------:|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|   filePath   | 源 Markdown 文件的原始路径（相对 srcDir），虚拟页面（如 404 页）为空字符串。                                                                                                                                |
| relativePath | 如果站点配置了 [rewrites](https://vitepress.dev/zh/reference/site-config#rewrites) 的话会[重写路由](https://vitepress.dev/zh/guide/routing#route-rewrites)，这个值是重写后的 path；没有配置时与 filePath 相同。   |
|    title     | 将 _frontmatter_.title 作为 Markdown 解析为 HTML 后再剥离 HTML 反转义成 **纯文本**；如果没有，则取正文第一个标题。                                                                                                |
| description  | 读取 _frontmatter_.description，如果没有则查找 _frontmatter_.head 里的 `meta[name=description]`；都没有则为空字符串。                                                                                   |
| lastUpdated  | _frontmatter_.lastUpdated 如果是 Date 实例则直接取用，如果不是 _false_ 就会取最后一次提交该文件的 git 时间戳；如果没有在站点配置启用 [lastUpdated](https://vitepress.dev/zh/reference/site-config#lastupdated) 选项则不会出现这个字段。 |

### 取用

　　在 Vue 组件或 Markdown 页面中调用 `useData()` 即可拿到一个
`VitePressData` 类型的对象，结构见[官方文档](https://vitepress.dev/zh/reference/runtime-api#usedata)，其中
`page` 字段的值就是上面钩子修改过的那个。

　　这个（站点配置中的）钩子执行完毕后，如果当前页面由路径加载器 [xxx.paths.ts](https://vitepress.dev/zh/guide/routing#dynamically-generating-paths) 动态生成，还会接着执行其中定义的 `transformPageData()` 钩子（如果有的话）。

## 构建期数据加载

### 提供

　　VitePress 会自动识别并执行 xxx.data.ts 中的加载器代码来提供数据。当然，命名为 xxx.data.js、xxx.data.mjs 或 xxx.data.mts 也都是可以识别的。

　　代码中需要 **默认导出** 一个至少包含 `load()` 方法的对象（见下方），这个方法只会在 Node.js 中调用，可以放心使用
Node API、npm 依赖，甚至 `fetch()` 远程数据。

　　如果只有 `load()` 方法，那就只是简单触发一次方法调用，不会有其它动作，而方法会收到一个空数组。

　　而如果需要扫描特定文件，则需要补充 `watch` 属性，值是 glob 匹配模式数组，相对于 xxx.data.ts 文件所在的目录，这样 `load()` 就会收到一个匹配到的文件的 **绝对路径** 的数组。

　　如果需要精细控制 glob 扫描行为，可以补充 `options` 属性，值是一个 `{ globOptions: GlobOptions }` 对象，只需提供 [GlobOptions](https://github.com/vuejs/vitepress/blob/v2.0.0-alpha.18/src/node/utils/glob.ts#L5) 即可。

　　另外，`defineLoader<T>()` 只是带类型推断的透传辅助函数（`LoaderModule` 的完整类型为 `{ watch?, load(watchedFiles), options? }`），不写也可以。

::: code-group

```ts [xxx.data.ts]
import { defineLoader } from 'vitepress';

interface MyData {
    hello: string;
}

declare const data: MyData;
export { data };

export default defineLoader({
    watch: ['posts/*.md', '!posts/*.draft.md'],
    options: { globOptions: { dot: true } },
    load(files?: string[]): MyData {
        return { hello: 'navifox' };
    },
});
```

```ts [异步 xxx.data.ts]
import { defineLoader } from 'vitepress';

interface MyData {
    hello: string;
}

declare const data: MyData;
export { data };

export default defineLoader({
    watch: ['posts/*.md', '!posts/*.draft.md'],
    options: { globOptions: { dot: true } },
    async load(files?: string[]): Promise<MyData> {
        return { hello: 'navifox' };
    },
});
```

:::

　　如果希望能自动读取并解析 Markdown 文件，则可以改用 [`createContentLoader`](https://vitepress.dev/zh/guide/data-loading#createcontentloader) 方法，它接受一个相对于[源目录](https://vitepress.dev/zh/guide/routing#source-directory)的 glob 模式，并返回一个 `{ watch, load }` 对象。

　　第二个参数是可选选项，详见下方代码注释。

```ts [xxx.data.ts]
import { createContentLoader } from 'vitepress';

export default createContentLoader('posts/*.md', {
    includeSrc: true, // 包含原始 markdown 源?
    render: true,     // 包含渲染的整页 HTML?
    excerpt: true,    // 包含摘录?
    transform(rawData) {
        // 根据需要对原始数据进行 map、sort 或 filter
        // 最终的结果是将发送给客户端的内容
        return rawData.sort((a, b) => {
            return +new Date(b.frontmatter.date)
                 - +new Date(a.frontmatter.date);
        }).map((page) => {
            page.src;     // 原始 markdown 源
            page.html;    // 渲染的整页 HTML
            page.excerpt; // 渲染的摘录 HTML（第一个 `---` 上面的内容）
            return { /* ... */ };
        });
    },
});
```

### 取用

```markdown [任意页面.md]
---
title: 任意页面
---

<script setup>
import { data as xxx } from './xxx.data.js';
</script>

这里是正文……
```

```vue [任意组件.vue]
<script setup>
import { data as posts } from './posts.data.js';
</script>

<template>
    <ul>
        <li v-for="post of posts">
            <a :href="post.url">{{ post.frontmatter.title }}</a>
        </li>
    </ul>
</template>
```

　　与页面数据钩子的 `useData()` 不同，这里的 `data` 是构建期就定型的**普通对象或数组**，不是 ref，也没有响应式更新——改了数据源只能重新构建，dev
下则等 HMR 重新计算。它本质是内联进 bundle 的静态常量，多个引用处拿到的是同一份数据，应视为只读。

　　类型方面，加载器文件里的 `declare const data: MyData; export { data }` 声明会随模块一起被消费方感知，导入处即可获得完整类型提示。

　　数据会以 JSON 形式内联进客户端 bundle，体积要克制（`createContentLoader` 默认只返回 `url` 与 `frontmatter`
也是出于这个考虑）；同时它必须可 JSON 序列化——`Date` 会变成 ISO 字符串、函数会被丢弃，需要时间戳就自己 `+new Date(...)` 转换。

　　如果只想在构建期（Node 侧）消费同一份数据、不经过客户端 bundle，可以在
[buildEnd](https://vitepress.dev/zh/reference/site-config#buildend) 钩子里直接调用
`createContentLoader('posts/*.md').load()`，它会重新 glob 并返回完整数据，适合用来生成 RSS、sitemap 等产物。

### excerpt

　　启用 `createContentLoader()` 的 `excerpt` 选项后，会按以下格式自动提取简介。不过
gray-matter 的提取只是把这段文字复制进 `excerpt` 字段，并不会把它从正文中移除；而
VitePress 渲染管线又没有内置的"隐藏摘要区"机制，因此简介部分会原样溢出到正文（连分隔符本身也会渲染成一条水平线），这个参数形同虚设。

```markdown
---
title: 标题
field: 其它frontmatter字段值
---
简介……
---

正文内容
```
