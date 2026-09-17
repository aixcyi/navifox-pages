<script lang="ts" setup>
import { Icon } from '@iconify/vue/offline';
import { navifox, signature, socials } from '@navifox/constants';
import type { Anchor } from '@navifox/types';
import { AvatarFallback, AvatarImage, AvatarRoot } from 'reka-ui';
import { onMounted } from 'vue';

import Chronicle from '#/components/Chronicle.vue';
import Job2021 from '#/components/experiences/Job2021.vue';
import Job2022 from '#/components/experiences/Job2022.vue';
import Navbar from '#/components/Navbar.vue';
import ProgrammerPanel from '#/components/ProgrammerPanel.vue';
import SectionHeader from '#/components/SectionHeader.vue';
import SkillsPanel from '#/components/SkillsPanel.vue';
import Stardust from '#/components/Stardust.vue';

console.log('%c' + signature, 'color: #459199; font-size: 12px; font-family: Consolas;');

const cvLastUpdateTime = '2026.3';

const anchorIntro = {
    id: 'intro',
    title: '有狐说',
    eyebrow: 'Navifox · Intro',
    description: '有狐善捕蛇，精于 Python 而安于 Kotlin',
} satisfies Anchor;

const anchorStacks = {
    id: 'stacks',
    title: '技能树',
    eyebrow: 'Navifox · Skills',
} satisfies Anchor;

const anchorChronology = {
    id: 'chronology',
    title: '时间线',
    eyebrow: 'Navifox · Chronicle',
    description: navifox.slogan || '',
} satisfies Anchor;

const aboutStates: { logo: string; text: string }[] = [
    { logo: 'zondicons:location', text: navifox.location ?? '' },
    { logo: 'material-symbols:schedule', text: `${navifox.age}岁` },
    { logo: 'bi:wechat', text: navifox.wxid ?? '' },
];

/** 带 URL fragment（如 /#intro）直达时的兜底滚动（router.scrollBehavior 之外再保一次）。 */
onMounted(() => {
    if (location.hash) document.querySelector(location.hash)?.scrollIntoView({ behavior: 'smooth' });
});
</script>

<template>
    <Navbar cover />
    <div class="MaxContainer selection:bg-starlight-400/40 sticky top-0 z-10 flex h-screen flex-col **:z-20">
        <div class="mb-8 flex h-full flex-col justify-end md:mb-20">
            <div
                class="border-starlight-100/40 bg-starlight-400/25 text-starlight-100 dark:border-starlight-300/30 dark:bg-starlight-400/10 dark:text-starlight-300 mb-4 w-fit rounded-lg border px-3 py-1 font-mono text-xl backdrop-blur-sm md:text-2xl"
                v-html="`@${navifox.uid}`"
            />
            <div class="text-4xl font-medium md:max-w-[75%] md:text-6xl">
                <span class="text-white">{{ navifox.name }}</span>
                <span v-for="tag in navifox.tags" class="text-gray-300/75 dark:text-gray-400/75">／{{ tag }}</span>
            </div>
            <div
                class="font-sign text-starlight-200 dark:text-starlight-300 mt-4 text-4xl md:text-5xl"
                v-html="navifox.descriptionRich"
            />
        </div>
    </div>

    <div
        class="Starry from-paper-100 via-paper-50 to-paper-50 dark:from-night-900 dark:via-night-950 dark:to-night-950 relative z-20 flow-root bg-gradient-to-b"
    >
        <div :id="anchorIntro.id" class="MaxContainer relative my-24 scroll-mt-28 text-stone-600 dark:text-slate-300">
            <SectionHeader
                :description="anchorIntro.description"
                :eyebrow="anchorIntro.eyebrow"
                :id="anchorIntro.id"
                :title="anchorIntro.title"
            />
            <div class="mt-12 grid gap-10 lg:grid-cols-[minmax(17rem,24rem)_minmax(0,1fr)] lg:items-start">
                <!-- 名片 -->
                <div
                    class="border-starlight-500/20 relative overflow-hidden rounded-[2rem] border bg-white/70 backdrop-blur-sm lg:order-1 dark:border-white/10 dark:bg-white/5"
                >
                    <div
                        aria-hidden="true"
                        class="font-sign text-starlight-500/10 dark:text-starlight-300/5 pointer-events-none absolute -right-8 -bottom-10 text-[9rem] leading-none select-none"
                        v-html="navifox.wxid"
                    />
                    <div class="relative flex flex-col gap-7 p-6 sm:p-8">
                        <div class="flex items-center gap-5 lg:flex-col lg:items-center lg:gap-4">
                            <AvatarRoot
                                class="border-starlight-500/25 dark:border-starlight-300/15 size-24 shrink-0 overflow-hidden rounded-3xl border-2 select-none lg:aspect-square lg:h-auto lg:w-full lg:rounded-full"
                            >
                                <AvatarImage
                                    :src="navifox.avatar512"
                                    :alt="navifox.name"
                                    class="size-full object-cover"
                                />
                                <AvatarFallback class="flex size-full items-center justify-center" :delay-ms="200">
                                    <Icon class="size-1/2" icon="fluent-emoji:fox" />
                                </AvatarFallback>
                            </AvatarRoot>
                            <div class="min-w-0 lg:text-center">
                                <p
                                    class="text-night-900 text-2xl font-bold tracking-tight dark:text-white"
                                    v-html="navifox.name"
                                />
                                <p
                                    class="dark:text-night-500 mt-1 font-mono text-xs text-stone-500"
                                    v-html="`@${navifox.uid}`"
                                />
                                <p
                                    v-if="navifox.titles"
                                    class="mt-2 text-sm font-medium text-stone-600 dark:text-slate-300"
                                    v-html="navifox.titles.join(' ・ ')"
                                />
                            </div>
                        </div>
                        <div class="min-w-0">
                            <i
                                class="text-starlight-600 dark:text-starlight-300 block text-2xl leading-snug italic sm:text-3xl lg:text-base"
                                v-html="navifox.descriptionRich"
                            />
                            <p
                                class="mt-4 leading-relaxed text-stone-600 dark:text-slate-300"
                                v-html="navifox.status"
                            />
                            <div
                                class="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-stone-600 dark:text-slate-300"
                            >
                                <span
                                    v-for="state in aboutStates"
                                    :key="state.text"
                                    class="inline-flex flex-nowrap items-center gap-1.5"
                                >
                                    <Icon
                                        :icon="state.logo"
                                        class="text-starlight-500 dark:text-starlight-300"
                                        height="15"
                                    />
                                    {{ state.text }}
                                </span>
                            </div>
                            <div class="mt-5 flex flex-wrap items-center gap-4">
                                <template v-for="social in socials" :key="social.name">
                                    <a
                                        v-if="social.logo"
                                        :href="social.link"
                                        :title="social.name"
                                        class="hover:text-starlight-600 dark:text-night-500 dark:hover:text-starlight-300 flex h-9 cursor-pointer items-center text-stone-500 transition-colors duration-200"
                                        target="_blank"
                                    >
                                        <Icon :icon="social.logo" height="22" />
                                    </a>
                                </template>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 项目经历 -->
                <div class="flex min-w-0 flex-col gap-6 lg:order-2">
                    <Job2022 class="Content" />
                    <Job2021 class="Content" />
                </div>
            </div>
        </div>

        <!-- 技能树 -->
        <section
            :id="anchorStacks.id"
            class="MaxContainer relative my-24 scroll-mt-28 text-stone-600 dark:text-slate-300"
        >
            <SectionHeader :eyebrow="anchorStacks.eyebrow" :id="anchorStacks.id" :title="anchorStacks.title">
                <code class="font-mono" v-html="`${cvLastUpdateTime} × `" />
                <a
                    href="https://github.com/bennyhuo/programmer-levels"
                    target="_blank"
                    v-html="'霍丙乾 Programmer Levels v0.4'"
                />
            </SectionHeader>
            <div class="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start">
                <aside class="min-w-0 lg:order-2 lg:w-[26.5rem]">
                    <div class="GlassCard p-6 sm:p-8">
                        <h3
                            class="text-starlight-600 dark:text-starlight-200 mb-5 text-lg font-semibold tracking-tight"
                            v-html="'技能面板'"
                        />
                        <SkillsPanel two-columns />
                    </div>
                </aside>
                <div class="GlassCard Content min-w-0 p-6 sm:p-8 lg:order-1">
                    <h3 class="text-starlight-600 dark:text-starlight-200 mb-5 text-lg font-semibold tracking-tight">
                        程序员等级评估<br />
                    </h3>
                    <ProgrammerPanel />
                </div>
            </div>
        </section>

        <!-- 时间线 -->
        <section
            :id="anchorChronology.id"
            class="MaxContainer relative my-24 scroll-mt-28 text-stone-600 dark:text-slate-300"
        >
            <SectionHeader
                centered
                :description="anchorChronology.description"
                :eyebrow="anchorChronology.eyebrow"
                :id="anchorChronology.id"
                :title="anchorChronology.title"
            />
            <div class="Content mx-auto mt-12 max-w-3xl">
                <Chronicle />
            </div>
        </section>

        <!-- 星光尘覆盖：置于所有区块之后，使各区块卡片（含技能树、时与风）均覆盖星光 -->
        <Stardust />

        <!-- 页尾 -->
        <div class="MaxContainer relative -mt-12 mb-24">
            <Icon class="mx-auto size-18 max-md:size-12" icon="fluent-emoji:fox" />
        </div>
    </div>
</template>
