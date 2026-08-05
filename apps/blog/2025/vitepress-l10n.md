---
title: VitePress 汉化摘要
outline: deep
createAt: 2025-03-12 15:20
updateAt: 2025-03-21 15:41
expires: 1096
tags:
    - 开发
    - VitePress
    - L10N
excerpt:
    VitePress 没有自带翻译，一些不可避免展示文字的地方会使用英文，需要汉化时可以参考本文进行配置。
---

## 默认主题

<LinkCard href="https://vitepress.dev/zh/reference/default-theme-config" text="默认主题配置 | VitePress" />

> 如果重写（而非扩展）了主题，那么本小节的配置可能并不适用。

### 刚性配置

下面这些不配置就会显示英文：

- “切换到深色主题”“切换到浅色主题”是鼠标悬停在右上角的日夜开关上显示的。
- “颜色主题”在窄屏下的导航栏菜单内可以看到。
- “目录”在窄屏下隐藏了侧边栏后显示在导航栏下方左侧。
- “回到顶部”在窄屏下隐藏了大纲后显示在导航栏下方右侧。
- “切换语言”在配置[国际化](https://vitepress.dev/zh/guide/i18n)后才会显示。

```typescript [.vitepress/config.ts]
import { DefaultTheme, UserConfig } from 'vitepress'

const configs: UserConfig<DefaultTheme.Config> = {
  themeConfig: {
    langMenuLabel: '切换语言',
    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '目录',
    darkModeSwitchLabel: '颜色主题',
    darkModeSwitchTitle: '切换到深色主题',
    lightModeSwitchTitle: '切换到浅色主题',
    outline: { label: '大纲' },
    docFooter: { prev: '上一篇', next: '下一篇' },
  },
}
```

### 弹性配置

而下面这些配置了会多出一些东西，所以要看有没有需求：

- 页脚 `footer` 由于设计原因，仅当页面不包含侧边栏时才会显示页脚。
- `lastUpdated` 配置后会自动读取 `git` 当前页面对应的文件的提交时间，并显示在正文的右下角。
- `editLink` 是[编辑链接](https://vitepress.dev/zh/reference/default-theme-edit-link)，显示在正文的左下角，是用于指向本页在托管仓库中的位置，方便贡献者快速编辑。

```typescript [.vitepress/config.ts]
import { DefaultTheme, UserConfig } from 'vitepress'

const configs: UserConfig<DefaultTheme.Config> = {
  themeConfig: {
    footer: {
      message: '<a href="https://beian.miit.gov.cn/" target="_blank">粤 ICP 备 ********** 号</a>',
      copyright: `Copyright © 2025 <a href="https://navifox.net/">路狐羽</a>`,
    },
    lastUpdated: {
      text: '最后更新于：',
      formatOptions: { dateStyle: 'full', timeStyle: 'medium' }
    },
    editLink: {
      text: '前往 GitHub 编辑此页',
      pattern: 'https://github.com/vuejs/vitepress/edit/main/docs/:path',
    },
  },
}
```

### 404 页面

若是需要定制 404 页面，可以在[布局插槽](https://vitepress.dev/zh/guide/extending-default-theme#layout-slots)中使用“渲染函数”来填充 `not-found` 插槽。

而如果能接受自带的 404 页面样式，可以使用以下配置（对照着来）进行汉化：

```typescript [.vitepress/config.ts]
import { DefaultTheme, UserConfig } from 'vitepress'

const configs: UserConfig<DefaultTheme.Config> = {
  themeConfig: {
    notFound: {
      title: 'PAGE NOT FOUND',
      quote: "But if you don't change your direction, and if you keep looking, you may end up where you are heading.",
      linkText: 'Take me home',
      linkLabel: 'go to home',
      code: '404',
    }
  },
}
```

## 元数据

<LinkCard href="https://vitepress.dev/zh/reference/site-config#site-metadata" text="站点元数据  | VitePress" />

如果要为页面 HTML 设置 `<html lang="zh-CN">` 标签，可以：

```typescript [.vitepress/config.ts]
import { DefaultTheme, UserConfig } from 'vitepress'

const configs: UserConfig<DefaultTheme.Config> = {
  lang: 'zh-CN',
}
```

## Markdown

[自定义容器](https://vitepress.dev/zh/guide/markdown#custom-containers)是
VitePress 支持的一种语法，使用一对 `:::` 定义，类似于使用一对 <code>```</code> 定义的代码块。

以下配置用于修改 VitePress 一些容器的 **默认** 标题；[GitHub 风格的警报](https://vitepress.dev/zh/guide/markdown#github-flavored-alerts)的标题不受该配置影响。

```typescript [.vitepress/config.ts]
import { DefaultTheme, UserConfig } from 'vitepress'

const configs: UserConfig<DefaultTheme.Config> = {
  markdown: {
    container: {
      tipLabel: '提示',
      warningLabel: '警告',
      dangerLabel: '危险',
      infoLabel: '信息',
      detailsLabel: '详细信息',
    },
  },
}
```
