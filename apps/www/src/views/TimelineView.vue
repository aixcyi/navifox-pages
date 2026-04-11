<script lang="ts" setup>
import BannerGI from '#/assets/genshin.jpg';
import BannerHei from '#/assets/hei.jpg';
import BannerHoney from '#/assets/honey.jpg';
import BannerZZZ from '#/assets/zzz.webp';
import AiDivider from '#/components/AiDivider.vue';
import AiTimelineItem from '#/components/AiTimelineItem.vue';
import { Icon } from '@iconify/vue';
import { navifoxHome, tighnari } from '@navifox/constants';
</script>


<template>
<div class="mx-auto px-4 max-w-[210mm] min-h-screen text-slate-400">

    <div class="mx-2 text-slate-800/25 text-nowrap overflow-x-hidden selection:bg-slate-900 selection:text-slate-600">
        <i v-html="tighnari.description?.replaceAll('<br>','')" />
    </div>

    <article class="py-8 bg-slate-800 rounded-xl flex flex-col gap-8">
        <b class="mx-8 text-slate-50!">风带来了故事的种子</b>
        <AiDivider />
        <section class="Content mx-8">
            <ul>
                <AiTimelineItem :colors="['#00A2E8']" timestamp="2012 年，暑假">
                    迷上了
                    <a href="https://store.steampowered.com/app/11330"
                       target="_blank">Obulis</a>，初窥计算机世界，偶遇易语言。<br />
                </AiTimelineItem>
                <AiTimelineItem :colors="['#00A2E8']" timestamp="2016 年 8 月">
                    以“砹小翼”为笔名在博客园发布第一篇博客。<br />
                </AiTimelineItem>
                <AiTimelineItem :colors="['#00A2E8']" timestamp="2018 年 10 月">
                    初遇
                    <Icon height="24" icon="logos:python" inline />
                    和
                    <Icon height="24" icon="logos:java" inline />
                    ，开始接触集成开发环境
                    <Icon height="24" icon="logos:pycharm" />
                    ，逐渐领略其它语言的魅力。<br />
                </AiTimelineItem>
                <AiTimelineItem :colors="['#00A2E8']" timestamp="2019 年，暑假">
                    开始接触
                    <Icon height="24" icon="logos:go" />
                    并配合 LiteIDE 学习区块链。<br />
                </AiTimelineItem>
                <AiTimelineItem :colors="['#00A2E8','#A349A4']" timestamp="2020 年 10 月 24 日">
                    <div class="relative flex-1 max-w-lg">
                        <pre class="absolute right-4 bottom-3 text-neutral-200 z-1 text-nowrap">UID 138527563</pre>
                        <img :src="BannerGI"
                             alt="原神，Genshin Impact"
                             class="select-none rounded-2xl opacity-25 transition-opacity duration-500 size-full -z-1 hover:opacity-100"
                             draggable="false" />
                    </div>
                </AiTimelineItem>
                <AiTimelineItem :colors="['#A349A4']" timestamp="2020 年 12 月">
                    找到一处名为 GitHub 的乐园，取“砹小翼”双拼拼音 <code>aixcyi</code> 为常用 ID，翻开岁月史书
                    <Icon height="24" icon="logos:git-icon" />
                    的第一页。<br />
                </AiTimelineItem>
                <AiTimelineItem :colors="['#A349A4']" timestamp="2021 年 3 月">
                    进入中山一家跨境电商公司实习，接触到
                    <Icon height="24" icon="logos:django-icon" />
                    与
                    <Icon height="24" icon="logos:postgresql" />
                    。<br />
                </AiTimelineItem>
                <AiTimelineItem :colors="['#A349A4']" timestamp="2021 年 6 月">
                    带领同事重构公司项目，抽象出仓库管理系统 WMS 与订单管理系统 OMS，使用
                    <Icon height="24" icon="logos:bootstrap" />
                    为项目增添色彩。<br />
                </AiTimelineItem>
                <AiTimelineItem :colors="['#A349A4']" timestamp="2021 下半年">
                    作为主面试官参与到公司 Django 后端开发岗位面试的技术环节。<br />
                </AiTimelineItem>
                <AiTimelineItem :colors="['#A349A4']" timestamp="2022 年 2 月">
                    发现 Quick Reference 并参与贡献，在名为开源的道路上迈出了第一步。<br />
                </AiTimelineItem>
                <AiTimelineItem :colors="['#A349A4']" timestamp="2022 年 3 月">
                    辗转广州，承担电商、餐饮、零售、进销存等生态服务的建模、后端开发、测试、硬件对接、维护、性能优化……<br />
                </AiTimelineItem>
                <AiTimelineItem :colors="['#A349A4']" timestamp="2023 年 4 月 25 日">
                    购买
                    <Icon height="24" icon="vscode-icons:file-type-minecraft" />
                    Minecraft: Java & Bedrock Edition for PC<br />
                </AiTimelineItem>
                <AiTimelineItem :colors="['#A349A4']" timestamp="2023 年 7 月">
                    囿于 PyCharm 功能的不全，借助
                    <Icon height="24" icon="logos:kotlin-icon" />
                    手搓插件 TinySnake 用以解决 Python <code>__all__</code> 的生成和更新。<br />
                </AiTimelineItem>
                <AiTimelineItem :colors="['#A349A4']" timestamp="2024 年 1 月">
                    注册并备案以常用 ID 为域名的
                    <a class="cursor-no-drop"><code>aixcyi.cn</code></a>。<br />
                </AiTimelineItem>
                <AiTimelineItem :colors="['#A349A4']" timestamp="2024 年 4 月">
                    在
                    <Icon height="24" icon="logos:jetbrains" />
                    Marketplace 中发布 TinySnake 插件。<br />
                </AiTimelineItem>
                <AiTimelineItem :colors="['#A349A4','#A44967']" timestamp="2024 年 7 月 4 日">
                    <div class="relative flex-1 max-w-lg">
                        <pre class="absolute right-4 bottom-3 text-neutral-200 z-1 text-nowrap">UID 10141611</pre>
                        <img :src="BannerZZZ"
                             alt="绝区零，Zenless Zone Zero"
                             class="select-none rounded-2xl opacity-25 transition-opacity duration-500 size-full -z-1 hover:opacity-100"
                             draggable="false" />
                    </div>
                </AiTimelineItem>
                <AiTimelineItem :colors="['#A44967','#FF7F27']" timestamp="2024 年 7 月">
                    受 <a href="https://plugins.jetbrains.com/vendor/fab53479-05ec-4e6d-a40e-05df95be4921"
                          target="_blank">Csense</a>
                    系列启发，将 TinySnake 拆分为多个 HooTool 系列小插件。<br />
                </AiTimelineItem>
                <AiTimelineItem :colors="['#FF7F27']" timestamp="2024 年 11 月">
                    从零手搓
                    <Icon height="24" icon="logos:vue" />
                    ＋
                    <Icon height="24" icon="logos:vitejs" />
                    ＋
                    <Icon height="24" icon="logos:element" />
                    个人网站并配置
                    <Icon height="24" icon="logos:nginx" />
                    域名转发，自此轰开前端大门。<br />
                </AiTimelineItem>
                <AiTimelineItem :colors="['#FF7F27']" timestamp="2024 年 12 月">
                    按图索骥从 Vue 生态了解到 VitePress 并着手编写
                    <a href="https://blog.navifox.net/" target="_blank">羽音</a>
                    博客。<br />
                    其意为阿羽的声音，英文名 <i>Seraphonogram</i> 由 <i>Seraph</i> 与 <i>phonogram</i>
                    两个单词合成，分别指代「羽」「音」二字。<br />
                </AiTimelineItem>
                <AiTimelineItem :colors="['#FF7F27']" timestamp="2025 年 1 月">
                    主站从 <a class="cursor-no-drop"><code>aixcyi.cn</code></a>
                    迁移到从“阿羽”全拼衍生的更好记的
                    <a class="cursor-no-drop"><code>ayuu.cc</code></a>。<br />
                </AiTimelineItem>
                <AiTimelineItem :colors="['#FF7F27']" timestamp="2025 年 6 月">
                    为了更喜爱的狐狸，移居
                    <a href="https://navifox.net/" target="_blank">
                        <code>navifox.net</code>
                    </a>，并为小站定名
                    <u class="underline decoration-orange-500 decoration-2 underline-offset-6">“路狐领航”</u>，同时更名为
                    “路狐羽”。<br />
                </AiTimelineItem>
                <AiTimelineItem :colors="['#FF7F27']" timestamp="2025 年 7 月">
                    用 Reka UI +
                    <Icon height="20" icon="logos:tailwindcss-icon" />
                    代替
                    <Icon height="24" icon="logos:element" />
                    精细化手搓(重构)主页，开始深入了解 CSS。<br />
                </AiTimelineItem>
                <AiTimelineItem :colors="['#FF7F27']" timestamp="2025 年 7 月 19 日 19:15">
                    <div class="relative flex-1 max-w-lg mb-1.5">
                        <pre class="absolute right-4 bottom-3 text-neutral-200 z-1 text-nowrap">0:11:42</pre>
                        <img :src="BannerHei"
                             alt="《罗小黑战记2》"
                             class="select-none rounded-2xl opacity-25 transition-opacity duration-500 size-full -z-1 hover:opacity-100"
                             draggable="false" />
                    </div>
                    <span>《罗小黑战记2》首映次日线下观影，品味妖灵会馆之于国人的浪漫。</span>
                </AiTimelineItem>
                <AiTimelineItem :colors="['#FF7F27']" timestamp="2025 年 8 月 16 日 11 点">
                    <div class="relative flex-1 max-w-lg mb-1.5">
                        <pre class="absolute right-4 bottom-3 text-neutral-200 z-1 text-nowrap">p156</pre>
                        <img :src="BannerHoney"
                             alt="《凡人修仙传》156集"
                             class="select-none rounded-2xl opacity-50 transition-opacity duration-500 size-full -z-1 hover:opacity-100"
                             draggable="false" />
                    </div>
                    <span>与 43 万+ 道友共同见证韩立结婴！（有幸出现在本集片尾名单）</span>
                </AiTimelineItem>
                <AiTimelineItem :colors="['#FF7F27']" timestamp="2026 年 1 月">
                    从
                    <Icon height="20" icon="devicon:npm" />
                    换成
                    <Icon height="20" icon="devicon:pnpm" />
                    并创建 Monorepo 仓库容纳 Navifox Pages 向现代化前端开发发展。<br />
                </AiTimelineItem>
                <AiTimelineItem :colors="['#FF7F27']" timestamp="2026 年 3 月">
                    从古法手敲代码入坑 AI 辅助开发，从 Cursor 到 Trae 再到 Trae CN，最后还是换回
                    VSCode 然后搭配 Kimi Code 使用，并且尝试编写前端、后端开发工程师的 SKILL。<br />
                </AiTimelineItem>
                <AiTimelineItem :colors="['#FF7F27','var(--color-slate-800)']">
                    <div v-html="navifoxHome.description" />
                </AiTimelineItem>
            </ul>
        </section>
    </article>

    <!-- 页尾 -->
    <div class="my-12">
        <Icon class="max-md:size-12 size-18 mx-auto" icon="fluent-emoji:fox" />
    </div>

</div>
</template>
