<script lang="ts" setup>
import { Icon } from '@iconify/vue/offline';
import { Markdown } from '@navifox/ui';
import { newDate } from '@navifox/utils/dnt';

import BannerGI from '#/assets/genshin.jpg';
import BannerHei from '#/assets/hei.jpg';
import BannerHoney from '#/assets/honey.jpg';
import BannerZZZ from '#/assets/zzz.webp';
import AiTimelineItem from '#/components/AiTimelineItem.vue';
</script>

<template>
    <ul>
        <AiTimelineItem color="#FF7F27" :moment="newDate(2026, 8, 22)">
            借助 onnx 和 OpenCV 对漫画中的文本进行 OCR 识别，并通过
            <Icon height="24" icon="devicon:huggingface" />
            HuggingFace 下载了
            <Markdown>`qwen3:8b` 和 `qwen3:14b`</Markdown>
            模型推理气泡冒泡对象，不过因为 DSH 同时开了十几二十个子 Agent 而损失惨重，从此开始手搓积累自己的
            <Markdown>`AGENTS.md`／`AGENTS.local.md`</Markdown>
            通用规则。<br />
            <img
                alt="蓝色大肥鱼表情包"
                src="https://bjumymxtfpfswthiusfr.storage.supabase.co/storage/v1/object/public/ai-meme/0_preview/meme/085.webp"
                class="my-2 max-w-80 rounded-2xl transition-opacity duration-500 select-none hover:opacity-100 dark:opacity-50"
                draggable="false"
            />
            <Markdown>
                [Whale-chan 表情包](https://github.com/the-beating-light-of-the-nail/deepseek-chan-meme-pack)项目
            </Markdown>
        </AiTimelineItem>
        <AiTimelineItem color="#FF7F27" :moment="newDate(2026, 8, 13)" markdown>
            蓝色大肥鱼推出 __DeepSeek-V4-Pro-0813__ 和
            [**DeepSeek Harness**](https://github.com/deepseek-ai/deepseek-harness/)
            大烧货，自此开始深度使用 AI Coding，一发不可收拾。
        </AiTimelineItem>
        <AiTimelineItem color="#FF7F27" date="2026 年 5 月底">
            在朋友的推荐下入手一台水冷笔记本，开始接触
            <Icon height="24" icon="logos:nvidia" />
            GPU 和
            <Icon height="24" icon="simple-icons:ollama" />
            Ollama。<br />
        </AiTimelineItem>
        <AiTimelineItem color="#FF7F27" date="2026 年 3 月">
            从古法手敲代码入坑 AI 辅助开发，从
            <Icon height="24" icon="devicon:cursor" />
            Cursor 到 Trae 再到 Trae CN，最后还是换回
            <Icon height="24" icon="devicon:vscode" />
            VSCode 然后搭配
            <Icon height="24" icon="simple-icons:kimi" />
            Kimi Code 使用，并且尝试编写前端、后端开发工程师的 SKILL。<br />
        </AiTimelineItem>
        <AiTimelineItem color="#FF7F27" :moment="newDate(2026, 1, 15, 14, 33)">
            从
            <Icon height="24" icon="devicon:npm" />
            换成
            <Icon height="24" icon="devicon:pnpm" />
            并创建 Monorepo 仓库容纳 Navifox Pages 向现代化前端开发发展。<br />
        </AiTimelineItem>
        <AiTimelineItem color="#FF7F27" :moment="newDate(2025, 10, 14)" markdown>
            购入正版 [Obulis](https://store.steampowered.com/app/11330)，了却遗憾。
        </AiTimelineItem>
        <AiTimelineItem color="#FF7F27" :moment="newDate(2025, 8, 16, 11, 0)">
            <div class="relative mb-1.5 max-w-3xl flex-1">
                <pre class="absolute right-4 bottom-3 z-1 text-nowrap text-neutral-200">p156</pre>
                <img
                    :src="BannerHoney"
                    alt="《凡人修仙传》156集"
                    class="-z-1 size-full rounded-2xl transition-opacity duration-500 select-none hover:opacity-100 dark:opacity-50"
                    draggable="false"
                />
            </div>
            <span>与 43 万+ 道友共同见证韩立结婴！（有幸出现在本集片尾名单）</span>
        </AiTimelineItem>
        <AiTimelineItem color="#FF7F27" :moment="newDate(2025, 7, 19, 19, 15)">
            <div class="relative mb-1.5 max-w-3xl flex-1">
                <pre class="absolute right-4 bottom-3 z-1 text-nowrap text-neutral-200">0:11:42</pre>
                <img
                    :src="BannerHei"
                    alt="《罗小黑战记2》"
                    class="-z-1 size-full rounded-2xl transition-opacity duration-500 select-none hover:opacity-100 dark:opacity-25"
                    draggable="false"
                />
            </div>
            <span>《罗小黑战记2》首映次日线下观影，品味妖灵会馆之于国人的浪漫。</span>
        </AiTimelineItem>
        <AiTimelineItem color="#FF7F27" date="2025 年 7 月">
            用 Reka UI +
            <Icon height="24" icon="logos:tailwindcss-icon" />
            代替
            <Icon height="24" icon="logos:element" />
            精细化手搓(重构)主页，开始深入了解 CSS。<br />
        </AiTimelineItem>
        <AiTimelineItem color="#FF7F27" date="2025 年 6 月" markdown>
            为了更喜爱的狐狸，毅然移居 [`navifox.net`](https://navifox.net/) 并为小站定名 __“路狐领航”__，同时更名为
            “路狐羽”。
        </AiTimelineItem>
        <AiTimelineItem color="#FF7F27" date="2025 年 2 月">
            <Icon height="24" icon="logos:deepseek" />
            横空出世，开始接触对话式 AI 并利用其搜索信息、辅助开发。<br />
        </AiTimelineItem>
        <AiTimelineItem class="**:[a]:cursor-no-drop" color="#FF7F27" date="2025 年 1 月" markdown>
            主站从 [`aixcyi.cn`]() 迁移到从“阿羽”全拼衍生的更好记的 [`ayuu.cc`]() 。
        </AiTimelineItem>
        <AiTimelineItem color="#FF7F27" date="2024 年 12 月" markdown>
            按图索骥从 Vue 生态了解到 VitePress 并着手编写 [羽音](https://blog.navifox.net/) 博客。
            其意为阿羽的声音，英文名 _Seraphonogram_ 由 _Seraph_ 与 _phonogram_ 两个单词合成，分别指代「羽」「音」二字。
        </AiTimelineItem>
        <AiTimelineItem color="#FF7F27" date="2024 年 11 月">
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
        <AiTimelineItem color="#FF7F27" date="2024 年 7 月" markdown>
            受 [Csense](https://plugins.jetbrains.com/vendor/fab53479-05ec-4e6d-a40e-05df95be4921) 系列启发，将
            TinySnake 拆分为多个 HooTool 系列小插件。
        </AiTimelineItem>
        <AiTimelineItem color="#FF7F27" gradientColor="#A44967" :moment="newDate(2024, 7, 4)">
            <div class="relative max-w-lg flex-1">
                <pre class="absolute right-4 bottom-3 z-1 text-nowrap text-neutral-200">UID 10141611</pre>
                <img
                    :src="BannerZZZ"
                    alt="绝区零，Zenless Zone Zero"
                    class="-z-1 size-full rounded-2xl transition-opacity duration-500 select-none hover:opacity-100 dark:opacity-25"
                    draggable="false"
                />
            </div>
        </AiTimelineItem>
        <AiTimelineItem color="#A44967" gradientColor="#A349A4" date="2024 年 4 月">
            在
            <Icon height="24" icon="logos:jetbrains" />
            Marketplace 中发布 TinySnake 插件。<br />
        </AiTimelineItem>
        <AiTimelineItem class="::[a]:cursor-no-drop" color="#A349A4" date="2024 年 1 月" markdown>
            注册并备案以常用 ID 为域名的 [`aixcyi.cn`]()。
        </AiTimelineItem>
        <AiTimelineItem color="#A349A4" date="2023 年 7 月">
            囿于 PyCharm 功能的不全，借助
            <Icon height="24" icon="logos:kotlin-icon" />
            手搓插件 TinySnake 用以解决 Python <code>__all__</code> 的生成和更新。<br />
        </AiTimelineItem>
        <AiTimelineItem color="#A349A4" :moment="newDate(2023, 4, 25)">
            购买
            <Icon height="24" icon="vscode-icons:file-type-minecraft" />
            Minecraft: Java & Bedrock Edition for PC<br />
        </AiTimelineItem>
        <AiTimelineItem color="#A349A4" :moment="newDate(2022, 3, 15)">
            辗转广州，承担电商、餐饮、零售、进销存等生态服务的建模、后端开发、测试、硬件对接、维护、性能优化……<br />
        </AiTimelineItem>
        <AiTimelineItem color="#A349A4" date="2022 年 2 月">
            发现 Quick Reference 并参与贡献，在名为开源的道路上迈出了第一步。<br />
        </AiTimelineItem>
        <AiTimelineItem color="#A349A4" date="2021 下半年">
            作为主面试官参与到公司 Django 后端开发岗位面试的技术环节。<br />
        </AiTimelineItem>
        <AiTimelineItem color="#A349A4" date="2021 年 6 月">
            带领同事重构公司项目，抽象出仓库管理系统 WMS 与订单管理系统 OMS，使用
            <Icon height="24" icon="logos:bootstrap" />
            为项目增添色彩。<br />
        </AiTimelineItem>
        <AiTimelineItem color="#A349A4" :moment="newDate(2021, 3, 1)">
            进入中山一家跨境电商公司实习，接触到
            <Icon height="24" icon="logos:django-icon" />
            与
            <Icon height="24" icon="logos:postgresql" />
            。<br />
        </AiTimelineItem>
        <AiTimelineItem color="#A349A4" date="2020 年 12 月">
            <Markdown> 找到一处名为 GitHub 的乐园，取“砹小翼”双拼拼音 `aixcyi` 为常用 ID，翻开 </Markdown>
            <span>&nbsp;</span>
            <Icon height="24" icon="logos:git-icon" />
            的第一页。<br />
        </AiTimelineItem>
        <AiTimelineItem color="#A349A4" gradientColor="#00A2E8" :moment="newDate(2020, 10, 24)">
            <div class="relative max-w-lg flex-1">
                <pre class="absolute right-4 bottom-3 z-1 text-nowrap text-neutral-200">UID 138527563</pre>
                <img
                    :src="BannerGI"
                    alt="原神，Genshin Impact"
                    class="-z-1 size-full rounded-2xl transition-opacity duration-500 select-none hover:opacity-100 dark:opacity-25"
                    draggable="false"
                />
            </div>
        </AiTimelineItem>
        <AiTimelineItem color="#00A2E8" date="2019 年，暑假">
            开始接触
            <Icon height="24" icon="logos:go" />
            并配合 LiteIDE 学习区块链。<br />
        </AiTimelineItem>
        <AiTimelineItem color="#00A2E8" :moment="newDate(2018, 10, 13, 13, 20)">
            第一次接触并安装 Linux 系统
            <Icon height="24" icon="logos:ubuntu" />
            Ubuntu。
        </AiTimelineItem>
        <AiTimelineItem color="#00A2E8" :moment="newDate(2018, 9, 30, 20, 19)">
            初遇
            <Icon height="24" icon="logos:python" />
            和
            <Icon height="24" icon="logos:java" />
            ，开始接触集成开发环境
            <Icon height="24" icon="logos:pycharm" />
            ，逐渐领略其它语言的魅力。<br />
        </AiTimelineItem>
        <AiTimelineItem color="#00A2E8" :moment="newDate(2018, 9, 22, 21, 35)" markdown>
            与舍友一同解构 [Obulis](https://store.steampowered.com/app/11330) 存档结构并伪造数据来解锁隐藏关卡。
        </AiTimelineItem>
        <AiTimelineItem color="#00A2E8" :moment="newDate(2018, 8, 26, 11, 7)">
            成为“哔哩哔哩无限矿业公司”的一位用户。
        </AiTimelineItem>
        <AiTimelineItem color="#00A2E8" :moment="newDate(2016, 8, 22, 15, 6)">
            以“砹小翼”为笔名在博客园发布第一篇博客。<br />
        </AiTimelineItem>
        <AiTimelineItem color="#00A2E8" date="2012 年，暑假" markdown>
            迷上了 [Obulis](https://store.steampowered.com/app/11330)，初窥计算机世界，偶遇易语言。
        </AiTimelineItem>
        <AiTimelineItem color="#00A2E8" last>狐途初遇，前缘未续</AiTimelineItem>
    </ul>
</template>
