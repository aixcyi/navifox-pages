<script lang="ts" setup>
import Experience from '#/components/Experience.vue';
import { ColorBadge, curriculumVitae, mooncakeDocs, navifox, navifoxRefs } from '@navifox/constants';
import type { Project } from '@navifox/types';

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
    <p>
        一个使用 <code>pnpm</code> 构建的 Monorepo
        架构的仓库，整个仓库包含了多个存在依赖的子项目，业务层主要有以下几个：<br />
    </p>
    <p>
        <span><a :href="navifox.link">{{ navifox.name }}</a>（我的主页）。</span>
        <span>主页本身即是导航，需要站内站外各个项目的链接，自然是最先收纳进 Monorepo 仓库的项目；</span>
        <span>它也是我最开始接触 <u>Tailwind CSS</u> 的项目，因为起类名太麻烦了，它简直就是神器，</span>
        <span>不过需要适时拆分成几层 <code>div</code> 不然类名会很长，不方便阅读代码。</span>
    </p>
    <p>
        <span><a :href="mooncakeDocs.link">{{ mooncakeDocs.name }}</a>（文档中心），指向散落在各个仓库的文档，</span>
        <span>本体放在 <code>docs.navifox.net</code> 中，散落的文档则用 Nginx 转发到
            <code>docs.navifox.net/project/</code> 下。</span>
        <span>这个子项目出现的背景是：现在（未来也是）总有项目的文档是集成在源码仓库中的，</span>
        <span>实在太分散了，非常需要一个类似于“文档中心”的页面来统一展示。</span>
        <span>文档与文档之间的翻滚效果、文档跳转按钮都使用了 <u>GSAP</u> 实现动效。</span>
    </p>
    <p>
        <span><a :href="curriculumVitae.link">{{ curriculumVitae.name }}</a>（时光胶囊），</span>
        <span>用来展示项目经历、技能树等富文本信息。</span>
        <span>PDF 简历写太长可能不受 HR 待见，写太短又放不下很多经历；</span>
        <span>更重要的也是，希望有个地方能刻下过往值得铭记的经历，对抗时间的磨损。</span>
    </p>
    <p>
        <span><a :href="navifoxRefs.link">{{ navifoxRefs.name }}</a>（Cheatsheet），</span>
        <span>包含通过 <code>git</code> 固化的技术类书签收藏，以及一些用于快速参考的页面。</span>
        <span>因为是“路狐领航”下具有参考作用的页面，于是取名“星笺”寓意星间的导航与参考。</span>
    </p>
    <p>
        <span>在这个大仓库之前，我对前端技术栈的使用一直停留在单项目仓库、简单 <code>npm install</code> 的阶段；</span>
        <span>后来在朋友的推荐下接触到 <a href="https://doc.vben.pro/" target="_blank">Vben Admin</a>
            这个企业级管理系统框架，</span>
        <span>在与 AI 的辅助沟通下逐渐了解 Monorepo，而后创建了这个项目，开始向现代化前端开发发展。</span>
    </p>
    <p>
        <span>得益于大仓可以提取公共代码，最开始疯狂造轮子，</span>
        <span>从比照 Python 的多签名 <code>range()</code>，</span>
        <span>到手搓 <code>String.prototype.trimPrefix()</code>，</span>
        <span>最后决心拥抱 JavaScript 生态，慢慢摸索用上了 <u>Lodash</u>、<u>VueUse</u> 等等前人造好的轮子。</span>
    </p>
</Experience>
</template>
