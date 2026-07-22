---
title: 源代码仓库提交指南
outline: deep
---

# 源代码仓库提交指南

非常感谢对《蓝溪拾遗》感兴趣！  
本文档描述了如何添加或修改妖灵、会馆等《蓝溪拾遗》项目下的内容。

## 快速开始

1. 分叉（fork）整个[源代码仓库](https://github.com/aixcyi/navifox-pages)到你的账号中。
2. 克隆你的仓库到本地。
3. 新建并切换到一条分支，建议以 `hei` 为分组名，例如 `hei/feat-new-guild` 对应新建会馆。
4. 根据仓库根目录下的 README.md 安装并配置环境。
5. 修改需要的位置，或添加必要的文件。
6. 在仓库根目录下运行 `pnpm run dev:hei`。
7. 浏览器访问 `http://localhost:5173` 即可预览《蓝溪拾遗》。
8. 修改完毕后，在仓库根目录下运行 `pnpm run build:hei` 确认构建无误。
9. 推送分支到你的仓库。
10. 前往 GitHub 创建推送请求（Pull Request）。
11. 前往[罗狐会馆](/guild/foxery)~~在线催更~~（追踪状态）。

## 妖灵

每位妖精与人类（以下合称妖灵）都有一页详情信息和一张指引卡片，卡片用于在聚合页中统一展示，也用于从会馆详情页跳转到妖灵详情。

所有卡片的数据存储在妖灵数据的 `spirits` 常量中，数据结构为同在文件中的 `SpiritInfo`：原创妖灵存储在 `spiritsOC`
常量，原著中的妖灵存储在 `spiritsAV` 常量。

下表是主要改动位置：

| 相关条目 | 原创妖灵   | 原著中的妖灵 | 文件路径                                        |
|------|--------|--------|---------------------------------------------|
| 聚合页  | 忽略     | 忽略     | ./apps/hei/spirit/index.md                  |
| 详情页  | **必填** | **必填** | ./apps/hei/spirit/\<name>.md                |
| 妖灵数据 | **必填** | **必填** | ./apps/hei/.vitepress/spirits.ts            |
| 头像   | 必填URL  | **必填** | ./apps/hei/public/assets/spirit/\<name>.jpg |

1. 如果有多个妖灵的设定，或者区分 OC 与本体，请选择最喜爱或最能代表的一个设定。 
2. 原创妖灵的**头像**需要以 URL 形式填写，不应存放在 git 仓库中。
3. 原创妖灵的详情页可参考 [演示页](/spirit/navifox) 并在此基础上自由发挥。
4. 原著中的妖灵的详情页可参考 [无限](/spirit/wuxian) 。

### 妖灵们的命名

在罗小黑世界架构下，妖精的命名风格偏向于二字汉字，人类则偏向于真实姓名（的风格），《蓝溪拾遗》也比较建议原创妖灵遵循这种风格。

各个文件名命名一般使用妖灵的**英文名**，如果没有则使用对应的**全拼**，多数情况下全拼不需要添加横线，除非在英文语境下可能会产生误读。英文名也建议遵循正则表达式 `^[A-Za-z][A-Za-z0-9-_]{3,}$` 以便日后用作其它项目的用户名。

### 详情页模板

```markdown
---
title: 妖灵名称
aside: false
---

# 妖灵名称

<SpiritBanner names="妖灵名称" />

简单介绍。

## 能力

| 派系  | 子派系／命名 | 描述／备注 |
|:-----:|:----------:|------------|
| 御灵系 |     木     |            |

基于罗小黑世界架构的能力设定……

## 坐标

可以公开的联系方式（三思隐私泄露的可能）。
```

### 在会馆页面中引用妖灵

在会馆的详情页中使用 `<SpiritBanner>` 组件：

```markdown
## 妖灵

<SpiritBanner names="雨笛 西木子 池年" />
```

1. 组件的 `names` 值可以按**半角空格**或**英文逗号**分隔多个妖灵名，但一般情况下建议只用空格。
2. 组件会按**名称**查找卡片数据来渲染卡片。如果名字打错或者没有在 `spirits.ts` 中注册，就会自动跳过这个妖灵（且不会报错）。

## 会馆

| 相关条目   | 原创会馆             | 原著中的会馆 | 文件路径                          |
|--------|------------------|--------|-------------------------------|
| 会馆信息   | **必填**               | **必填**     | `./apps/hei/guild/<name>.md`  |
| 馆长信息   | **必填**，参见[妖灵](#妖灵)一节 | 选填     | `./apps/hei/spirit/<name>.md` |
| 常驻妖灵信息 | 选填，参见[妖灵](#妖灵)一节 | 选填     | `./apps/hei/spirit/<name>.md` |

### 添加原创会馆

在 `./apps/hei/guild/` 目录下新建 `<name>.md`，内容与布局自由发挥，图片请以 URL 形式提供，不应存储在 git 历史中。参考模板：

```markdown
---
title: 会馆名称
aside: false
---

# 会馆名称

> 简介、理念、目标、使命、寄语等。

## 妖灵

<SpiritBanner names="馆长名称 妖灵名称1 妖灵名称2 妖灵名称3 ……" />

## 传送门

<div style="display: flex; flex-direction: column; justify-content: center; align-items: center">
    <a href="会馆入群链接" target="_blank">
        <img
            alt="GuildQRCode"
            src="会馆群聊二维码URL"
            style="width: 240px; margin-top: 64px; padding: 24px; background-color: var(--vp-c-bg); border-radius: 32px"
        />
    </a>
    <code>群号码</code>
</div>
```

### 添加原著中的会馆

同样在 `./apps/hei/guild/` 目录下新建 `<name>.md`，可参考[苍南会馆](https://hei.navifox.net/guild/cangnan)：

```markdown
---
title: 会馆名称
aside: false
---

# 会馆名称

> 一句话简介。

## 妖灵

<SpiritBanner names="馆长名称 妖灵名称1 妖灵名称2 妖灵名称3 ……" />

## 时间线

## 出场

## 考据
```

## 其它

### 草稿机制

文件名以 `.draft.md` 结尾表示草稿，例如 `./apps/hei/guild/maomao.draft.md`：

| 模式                   | 行为              |
|----------------------|-----------------|
| `pnpm run dev:hei`   | 正常预览，出现在侧边栏和导航栏 |
| `pnpm run build:hei` | 自动排除，不出现在构建产物中  |

确认提交时只需将文件名中的 `.draft` 移除即可。
