<script lang="ts" setup>
import { BrandsBadge, SkillsBadge } from '@navifox/constants';
import { AiBadge, Markdown } from '@navifox/ui';
import { newDate } from '@navifox/utils/dnt';

import BannerGI from '#/assets/genshin.jpg';
import BannerHei from '#/assets/hei.jpg';
import BannerHoney from '#/assets/honey.jpg';
import BannerZZZ from '#/assets/zzz.webp';
import AiTimelineItem from '#/components/AiTimelineItem.vue';
</script>

<template>
    <ul>
        <AiTimelineItem color="#FF7F27" anchor="Currently" :moment="newDate(2026, 8, 22)">
            借助 onnx 和 OpenCV 对漫画中的文本进行 OCR 识别，并通过
            <AiBadge :badge="BrandsBadge.HuggingFace" height="24" />
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
        <AiTimelineItem color="#FF7F27" :moment="newDate(2026, 5, 22)">
            在好友的推荐下入手一台水冷笔记本，开始接触
            <AiBadge :badge="BrandsBadge.Nvidia" height="24" />
            GPU 和
            <AiBadge :badge="BrandsBadge.Ollama" height="24" />
            Ollama。<br />
        </AiTimelineItem>
        <AiTimelineItem color="#FF7F27" date="2026 年 3 月">
            从古法手敲代码入坑 AI 辅助开发，从
            <AiBadge :badge="BrandsBadge.Cursor" height="24" />
            Cursor 到 Trae 再到 Trae CN，最后还是换回<br />
            <AiBadge :badge="SkillsBadge.VisualStudioCode" height="24" />
            VSCode 然后搭配
            <AiBadge :badge="BrandsBadge.Kimi" height="24" />
            Kimi Code 使用，并且尝试编写前端、后端开发工程师的 SKILL。<br />
        </AiTimelineItem>
        <AiTimelineItem color="#FF7F27" anchor="2026" :moment="newDate(2026, 1, 15, 14, 33)">
            从
            <AiBadge :badge="SkillsBadge.Npm" height="24" />
            换成
            <AiBadge :badge="SkillsBadge.Pnpm" height="24" />
            并创建 Monorepo 仓库容纳 Navifox Pages 向现代化前端开发发展。<br />
        </AiTimelineItem>
        <AiTimelineItem color="#FF7F27" :moment="newDate(2025, 8, 16, 11, 0)">
            <div class="relative mb-1.5 max-w-[95%] flex-1">
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
            <div class="relative mb-1.5 max-w-[95%] flex-1">
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
        <AiTimelineItem color="#FF7F27" :moment="newDate(2025, 7, 8, 15, 43)">
            用 Reka UI +
            <AiBadge :badge="SkillsBadge.TailwindCSS" height="24" />
            Tailwind CSS 代替
            <AiBadge :badge="SkillsBadge.ElementUI" height="24" />
            Element UI 精细化手搓(重构)主页，开始深入了解 CSS。<br />
        </AiTimelineItem>
        <AiTimelineItem color="#FF7F27" :moment="newDate(2025, 6, 24, 1, 25)" markdown>
            为了更喜爱的狐狸，毅然移居 [`navifox.net`](https://navifox.net/) 并为小站定名 __“路狐领航”__，同时更名为
            “路狐羽”。
        </AiTimelineItem>
        <AiTimelineItem color="#FF7F27" :moment="newDate(2025, 2, 21, 11, 47)">
            <AiBadge :badge="BrandsBadge.DeepSeek" height="24" />
            横空出世，开始接触对话式 AI 并利用其搜索信息、辅助开发。<br />
        </AiTimelineItem>
        <AiTimelineItem class="**:[a]:cursor-no-drop" color="#FF7F27" anchor="2025" date="2025 年 1 月" markdown>
            主站从 [`aixcyi.cn`]() 迁移到从“阿羽”全拼衍生的更好记的 [`ayuu.cc`]() 。
        </AiTimelineItem>
        <AiTimelineItem color="#FF7F27" :moment="newDate(2024, 12, 24, 18, 18)" markdown>
            按图索骥从 Vue 生态了解到 VitePress 并着手编写 [羽音](https://blog.navifox.net/) 博客。
            其意为阿羽的声音，英文名 _Seraphonogram_ 由 _Seraph_ 与 _phonogram_ 两个单词合成，分别指代「羽」「音」二字。
        </AiTimelineItem>
        <AiTimelineItem color="#FF7F27" date="2024 年 11 月">
            从零手搓
            <AiBadge :badge="SkillsBadge.Vue" height="24" />
            ＋
            <AiBadge :badge="SkillsBadge.Vite" height="24" />
            ＋
            <AiBadge :badge="SkillsBadge.ElementUI" height="24" />
            个人网站并配置
            <AiBadge :badge="SkillsBadge.Nginx" height="24" />
            域名转发，自此轰开前端大门。<br />
        </AiTimelineItem>
        <AiTimelineItem color="#FF7F27" :moment="newDate(2024, 7, 10, 16, 53)" markdown>
            受 [Csense](https://plugins.jetbrains.com/vendor/fab53479-05ec-4e6d-a40e-05df95be4921) 系列启发，将
            TinySnake 拆分为多个 HooTool 系列小插件。
        </AiTimelineItem>
        <AiTimelineItem color="#FF7F27" gradientColor="#A44967" :moment="newDate(2024, 7, 4)">
            <div class="relative max-w-[95%] flex-1">
                <pre class="absolute right-4 bottom-3 z-1 text-nowrap text-neutral-200">UID 10141611</pre>
                <img
                    :src="BannerZZZ"
                    alt="绝区零，Zenless Zone Zero"
                    class="-z-1 size-full rounded-2xl transition-opacity duration-500 select-none hover:opacity-100 dark:opacity-25"
                    draggable="false"
                />
            </div>
        </AiTimelineItem>
        <AiTimelineItem color="#A44967" gradientColor="#A349A4" :moment="newDate(2024, 4, 12)">
            在
            <AiBadge :badge="BrandsBadge.JetBrains" height="24" />
            Marketplace 中发布 TinySnake 插件。<br />
        </AiTimelineItem>
        <AiTimelineItem class="::[a]:cursor-no-drop" color="#A349A4" anchor="2024" date="2024 年 1 月" markdown>
            注册并备案以常用 ID 为域名的 [`aixcyi.cn`]()。
        </AiTimelineItem>
        <AiTimelineItem color="#A349A4" :moment="newDate(2023, 7, 14, 22, 29)">
            囿于 PyCharm 功能的不全，借助
            <AiBadge :badge="SkillsBadge.Kotlin" height="24" />
            手搓插件 TinySnake 用以解决 Python <code>__all__</code> 的生成和更新。<br />
        </AiTimelineItem>
        <AiTimelineItem color="#A349A4" anchor="2023" :moment="newDate(2023, 4, 25)">
            购买
            <AiBadge :badge="BrandsBadge.Minecraft" height="24" />
            Minecraft: Java & Bedrock Edition for PC<br />
        </AiTimelineItem>
        <AiTimelineItem color="#A349A4" :moment="newDate(2022, 3, 15)">
            辗转广州，承担电商、餐饮、零售、进销存等生态服务的建模、后端开发、测试、硬件对接、维护、性能优化……<br />
        </AiTimelineItem>
        <AiTimelineItem color="#A349A4" anchor="2022" :moment="newDate(2022, 2, 27, 10, 45)">
            发现 Quick Reference 并参与贡献，在名为开源的道路上迈出了第一步。<br />
        </AiTimelineItem>
        <AiTimelineItem color="#A349A4" date="2021 下半年">
            作为主面试官参与到公司 Django 后端开发岗位面试的技术环节。<br />
        </AiTimelineItem>
        <AiTimelineItem color="#A349A4" date="2021 年 6 月">
            带领同事重构公司项目，抽象出仓库管理系统 WMS 与订单管理系统 OMS，使用
            <AiBadge :badge="SkillsBadge.Bootstrap" height="24" />
            为项目增添色彩。<br />
        </AiTimelineItem>
        <AiTimelineItem color="#A349A4" anchor="2021" :moment="newDate(2021, 3, 1)">
            进入中山一家跨境电商公司实习，接触到
            <AiBadge :badge="SkillsBadge.Django" height="24" />
            与
            <AiBadge :badge="SkillsBadge.PostgreSQL" height="24" />
            。<br />
        </AiTimelineItem>
        <AiTimelineItem color="#A349A4" :moment="newDate(2020, 12, 12, 17, 18)">
            找到一处名为 GitHub 的乐园，取“砹小翼”双拼拼音 <code>aixcyi</code> 为常用 ID，翻开
            <AiBadge :badge="SkillsBadge.Git" height="24" />
            的第一页。<br />
        </AiTimelineItem>
        <AiTimelineItem color="#A349A4" anchor="2020" gradientColor="#00A2E8" :moment="newDate(2020, 10, 22)">
            <div class="relative max-w-[95%] flex-1">
                <pre class="absolute right-4 bottom-3 z-1 text-nowrap text-neutral-200">UID 138527563</pre>
                <img
                    :src="BannerGI"
                    alt="原神，Genshin Impact"
                    class="-z-1 size-full rounded-2xl transition-opacity duration-500 select-none hover:opacity-100 dark:opacity-25"
                    draggable="false"
                />
            </div>
        </AiTimelineItem>
        <AiTimelineItem color="#00A2E8" date="2019 年 9 月 1 ~ 5 号">
            参加第一届区块链技术及应用解决方案大赛并获得团队一等奖。<br />
        </AiTimelineItem>
        <AiTimelineItem color="#00A2E8" date="2019 年，暑假">
            开始接触
            <AiBadge :badge="BrandsBadge.Golang" height="24" />
            并配合 LiteIDE 学习区块链。<br />
        </AiTimelineItem>
        <AiTimelineItem color="#00A2E8" anchor="2019" :moment="newDate(2019, 4, 10, 12, 15)" markdown>
            刷到[小驭龙](https://b23.tv/BV1VW411D7SW)极兽聚的视频，第一次了解到兽装（Fursuit）与毛茸茸。
        </AiTimelineItem>
        <AiTimelineItem color="#00A2E8" :moment="newDate(2018, 10, 13, 13, 20)">
            第一次接触并安装 Linux 系统
            <AiBadge :badge="SkillsBadge.Ubuntu" height="24" />
            Ubuntu。<br />
        </AiTimelineItem>
        <AiTimelineItem color="#00A2E8" :moment="newDate(2018, 9, 30, 20, 19)">
            初遇
            <AiBadge :badge="SkillsBadge.Python" height="24" />
            和
            <AiBadge :badge="SkillsBadge.Java" height="24" />
            ，开始接触集成开发环境
            <AiBadge :badge="SkillsBadge.PyCharm" height="24" />
            ，逐渐领略其它语言的魅力。<br />
        </AiTimelineItem>
        <AiTimelineItem color="#00A2E8" anchor="2018" :moment="newDate(2018, 8, 26, 11, 7)">
            成为“哔哩哔哩无限矿业公司”的一位用户。<br />
        </AiTimelineItem>
        <AiTimelineItem color="#00A2E8" anchor="2016" :moment="newDate(2016, 8, 22, 15, 6)">
            以“砹小翼”为笔名在博客园发布第一篇博客。<br />
        </AiTimelineItem>
        <AiTimelineItem color="#00A2E8" anchor="2012" date="2012 年，暑假" markdown>
            迷上了 [Obulis](https://store.steampowered.com/app/11330)，偶遇易语言，初窥计算机世界。
        </AiTimelineItem>
        <AiTimelineItem color="#00A2E8" :moment="newDate(2011, 12, 3)" markdown>
            入坑洛克王国，选择了喵喵。
        </AiTimelineItem>
        <AiTimelineItem color="#00A2E8" anchor="2011" :moment="newDate(2011, 11, 30)" markdown>
            在懵懂中注册了QQ。
        </AiTimelineItem>
        <AiTimelineItem color="#00A2E8" last markdown>_狐途初遇，月色未沉；雪落无声，风过无痕_</AiTimelineItem>
    </ul>
</template>
