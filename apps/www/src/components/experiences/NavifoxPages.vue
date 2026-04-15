<script lang="ts" setup>
import Experience from '#/components/Experience.vue';
import { ColorBadge, navifoxDocs, navifoxHome, navifoxRefs } from '@navifox/constants';
import type { Project } from '@navifox/types';
import { Markdown as down } from '@navifox/ui';

const project: Project = {
    name: 'Navifox Pages',
    description: '',
    stack: [
        ColorBadge.TypeScript,
        ColorBadge.Vue,
        ColorBadge.TailwindCSS,
        ColorBadge.Gsap,
        ColorBadge.VueUse,
        ColorBadge.Vite,
        ColorBadge.Pnpm,
    ],
}
</script>


<template>
<Experience :project start="2026.1" title="前端开发">
    <down paragraph>
        一个使用 `pnpm` 构建的 Monorepo 架构的仓库，整个仓库包含了多个存在依赖的子项目，业务层主要有以下几个：
    </down>
    <p>
        <down>{{ `[${navifoxHome.name}](${navifoxHome.link})（我的主页），` }}</down>
        <span>主页本身即是导航，需要站内站外各个项目的链接，自然是最先收纳进 Monorepo 仓库的项目；</span>
        <down>它也是我最开始接触 __Tailwind CSS__ 的项目，因为起类名太麻烦了，它简直就是神器，</down>
        <down>不过需要适时拆分成几层 `div` 不然类名会很长，不方便阅读代码。</down>
        <span>后面合并了展示简历、技能、动态，对抗时间磨损的时光胶囊。</span>
    </p>
    <p>
        <down>{{ `[${navifoxDocs.name}](${navifoxDocs.link})（文档中心），` }}</down>
        <down>指向散落在各个仓库的文档，本体放在 `docs.navifox.net` 中，</down>
        <down>散落的文档则用 Nginx 转发到 `docs.navifox.net/project/` 下。</down>
        <span>这个子项目出现的背景是：现在（未来也是）总有项目的文档是集成在源码仓库中的，</span>
        <span>实在太分散了，非常需要一个类似于“文档中心”的页面来统一展示。</span>
        <down>文档与文档之间的翻滚效果、文档跳转按钮都使用了 __GSAP__ 实现动效。</down>
    </p>
    <p>
        <down>{{ `[${navifoxRefs.name}](${navifoxRefs.link})（Cheatsheet），` }}</down>
        <down>包含通过 `git` 固化的技术类书签收藏，以及一些用于快速参考的页面。</down>
        <span>因为是“路狐领航”下具有参考作用的页面，于是取名“星笺”寓意星间的导航与参考。</span>
    </p>
    <p>
        <down>在这个大仓库之前，我对前端技术栈的使用一直停留在单项目仓库、简单 `npm install` 的阶段；</down>
        <down>后来在朋友的推荐下接触到 [Vben Admin](https://doc.vben.pro/) 这个企业级管理系统框架，</down>
        <span>在与 AI 的辅助沟通下逐渐了解 Monorepo，而后创建了这个项目，开始向现代化前端开发发展。</span>
    </p>
    <p>
        <span>得益于大仓可以提取公共代码，最开始疯狂造轮子，</span>
        <down>从比照 Python 的多签名 `range()`，</down>
        <down>到手搓 `String.prototype.trimPrefix()`，</down>
        <down>最后决心拥抱 JavaScript 生态，慢慢摸索用上了 __Lodash__、__VueUse__ 等等前人造好的轮子。</down>
    </p>
</Experience>
</template>
