<script lang="ts" setup>
import { Icon } from '@iconify/vue';
import { signature, socials, tighnari } from '@navifox/constants';
import { logger } from '@navifox/utils';

import { sectionChronology, sectionIntro, sectionSkills } from '#/anchors.ts';
import Background from '#/assets/background.jpg';
import Chronicle from '#/components/Chronicle.vue';
import Job2021 from '#/components/experiences/Job2021.vue';
import Job2022 from '#/components/experiences/Job2022.vue';
import NavifoxPages from '#/components/experiences/NavifoxPages.vue';
import Navbar from '#/components/Navbar.vue';
import NavDropdownMenu from '#/components/NavDropdownMenu.vue';
import ProgrammerPanel from '#/components/ProgrammerPanel.vue';
import SkillsPanel from '#/components/SkillsPanel.vue';

logger.draw(signature, '#459199');

const cvLastUpdateTime = '2026.3';

const aboutStates = [
    { logo: 'zondicons:location', text: tighnari.location ?? '' },
    { logo: 'material-symbols:schedule', text: `${tighnari.age}岁` },
    { logo: 'bi:wechat', text: tighnari.brand ?? '' },
    { logo: 'streamline-logos:qq-logo-solid', text: tighnari.groupQQ ?? '' },
].filter((state) => state.text);
</script>

<template>
    <img :src="Background" alt="背景图片" class="fixed z-0 size-full object-cover select-none" />
    <div class="fixed z-10 size-full bg-black/33 dark:bg-black/67" />
    <!-- 星夜氛围渐变（浅色模式交给遮罩，深色模式额外压暗） -->
    <div
        class="fixed inset-0 z-10 bg-gradient-to-t from-transparent via-transparent to-transparent dark:from-black/40 dark:via-transparent"
    />
    <Navbar cover />
    <NavDropdownMenu class="fixed inset-x-0 top-0 z-50" />
    <div class="MaxContainer selection:bg-starlight-400/40 z-20 flex h-screen flex-col **:z-20">
        <div class="mb-8 flex h-full flex-col justify-end md:mb-20">
            <div
                class="border-starlight-100/40 bg-starlight-400/25 text-starlight-100 dark:border-starlight-300/30 dark:bg-starlight-400/10 dark:text-starlight-300 mb-4 w-fit rounded-lg border px-3 py-1 font-mono text-xl backdrop-blur-sm md:text-2xl"
                v-html="`@${tighnari.uid}`"
            />
            <div class="text-4xl font-medium md:max-w-[75%] md:text-6xl">
                <span class="text-white">{{ tighnari.name }}</span>
                <span v-for="tag in tighnari.tags" class="text-gray-300/75 dark:text-gray-400/75">／{{ tag }}</span>
            </div>
            <div
                class="font-sign text-starlight-200 dark:text-starlight-300 mt-4 text-4xl md:text-5xl"
                v-html="tighnari.descriptionRich"
            />
        </div>
    </div>

    <div
        class="Starry from-paper-100 via-paper-50 to-paper-50 dark:from-night-900 dark:via-night-950 dark:to-night-950 relative z-20 flow-root bg-gradient-to-b"
    >
        <!-- 有狐说：名片 + 项目经历 -->
        <div id="intro" class="Trail MaxContainer relative my-24 scroll-mt-28 text-stone-600 dark:text-slate-200">
            <header class="max-w-2xl">
                <p
                    class="text-starlight-600 dark:text-starlight-300 font-mono text-[0.72rem] tracking-[0.28em] uppercase"
                    v-html="sectionIntro.eyebrow"
                />
                <h2
                    class="text-night-900 mt-3 text-3xl font-bold tracking-tight sm:text-4xl dark:text-white"
                    v-html="sectionIntro.title"
                />
                <p class="mt-3 leading-relaxed text-stone-500 dark:text-slate-300" v-html="sectionIntro.description" />
            </header>
            <div class="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(17rem,24rem)] lg:items-start">
                <!-- 名片 -->
                <div
                    class="border-starlight-500/20 relative overflow-hidden rounded-[2rem] border bg-white/70 backdrop-blur-sm lg:order-2 dark:border-white/10 dark:bg-white/5"
                >
                    <div
                        aria-hidden="true"
                        class="font-sign text-starlight-500/10 dark:text-starlight-300/5 pointer-events-none absolute -right-8 -bottom-10 text-[9rem] leading-none select-none"
                        v-html="tighnari.brand"
                    />
                    <div class="relative flex flex-col gap-7 p-6 sm:p-8">
                        <div class="flex items-center gap-5 lg:flex-col lg:items-center lg:gap-4">
                            <img
                                :src="tighnari.avatar512"
                                :alt="tighnari.name"
                                class="size-24 shrink-0 rounded-3xl border-2 border-rose-400/40 object-cover select-none lg:aspect-square lg:h-auto lg:w-full lg:rounded-full dark:border-rose-300/40"
                            />
                            <div class="min-w-0 lg:text-center">
                                <p
                                    class="text-night-900 text-2xl font-bold tracking-tight dark:text-white"
                                    v-html="tighnari.name"
                                />
                                <p
                                    class="dark:text-night-500 mt-1 font-mono text-xs text-stone-500"
                                    v-html="`@${tighnari.uid}`"
                                />
                                <p
                                    v-if="tighnari.titles"
                                    class="mt-2 text-sm font-medium text-stone-600 dark:text-slate-300"
                                    v-html="tighnari.titles.join(' ・ ')"
                                />
                            </div>
                        </div>
                        <div class="min-w-0">
                            <i
                                class="text-starlight-600 dark:text-starlight-300 block text-2xl leading-snug italic sm:text-3xl lg:text-xl"
                                v-html="tighnari.descriptionRich"
                            />
                            <p
                                class="mt-4 leading-relaxed text-stone-600 dark:text-slate-300"
                                v-html="tighnari.status"
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
                <div class="flex min-w-0 flex-col gap-6 lg:order-1">
                    <div
                        class="Content border-starlight-500/20 rounded-3xl border bg-white/70 p-6 backdrop-blur-sm sm:p-8 dark:border-white/10 dark:bg-white/5"
                    >
                        <NavifoxPages />
                    </div>
                    <div
                        class="Content border-starlight-500/20 rounded-3xl border bg-white/70 p-6 backdrop-blur-sm sm:p-8 dark:border-white/10 dark:bg-white/5"
                    >
                        <Job2022 />
                    </div>
                    <div
                        class="Content border-starlight-500/20 rounded-3xl border bg-white/70 p-6 backdrop-blur-sm sm:p-8 dark:border-white/10 dark:bg-white/5"
                    >
                        <Job2021 />
                    </div>
                </div>
            </div>
        </div>

        <!-- 技能树 -->
        <section id="skills" class="MaxContainer relative my-24 scroll-mt-28 text-stone-600 dark:text-slate-300">
            <header class="max-w-2xl">
                <p
                    class="text-starlight-600 dark:text-starlight-300 font-mono text-[0.72rem] tracking-[0.28em] uppercase"
                    v-html="sectionSkills.eyebrow"
                />
                <h2 class="text-night-900 mt-3 text-3xl font-bold tracking-tight sm:text-4xl dark:text-white">
                    {{ sectionSkills.title }}
                </h2>
                <p class="mt-3 leading-relaxed text-stone-500 dark:text-slate-300">
                    <code class="font-mono">{{ cvLastUpdateTime }}</code> ×
                    <a href="https://github.com/bennyhuo/programmer-levels" target="_blank">
                        霍丙乾 Programmer Levels v0.4<br />
                    </a>
                </p>
            </header>
            <div class="mt-12 grid gap-10 lg:grid-cols-[auto_minmax(0,1fr)] lg:items-start">
                <aside class="min-w-0 lg:w-[26.5rem]">
                    <div
                        class="border-starlight-500/20 rounded-3xl border bg-white/70 p-6 backdrop-blur-sm sm:p-8 dark:border-white/10 dark:bg-white/5"
                    >
                        <h3
                            class="text-starlight-600 dark:text-starlight-200 mb-5 text-lg font-semibold tracking-tight"
                        >
                            技能面板<br />
                        </h3>
                        <SkillsPanel two-columns />
                    </div>
                </aside>
                <div
                    class="Content border-starlight-500/20 min-w-0 rounded-3xl border bg-white/70 p-6 backdrop-blur-sm sm:p-8 dark:border-white/10 dark:bg-white/5"
                >
                    <h3 class="text-starlight-600 dark:text-starlight-200 mb-5 text-lg font-semibold tracking-tight">
                        程序员等级评估<br />
                    </h3>
                    <ProgrammerPanel />
                </div>
            </div>
        </section>

        <!-- 时间线 -->
        <section id="chronology" class="MaxContainer relative my-24 scroll-mt-28 text-stone-600 dark:text-slate-300">
            <header class="max-w-2xl">
                <p
                    class="text-starlight-600 dark:text-starlight-300 font-mono text-[0.72rem] tracking-[0.28em] uppercase"
                    v-html="sectionChronology.eyebrow"
                />
                <h2
                    class="text-night-900 mt-3 text-3xl font-bold tracking-tight sm:text-4xl dark:text-white"
                    v-html="sectionChronology.title"
                />
                <p
                    class="mt-3 leading-relaxed text-stone-500 dark:text-slate-300"
                    v-html="sectionChronology.description"
                />
            </header>
            <div
                class="Content border-starlight-500/20 mt-12 rounded-3xl border bg-white/70 p-6 backdrop-blur-sm sm:p-8 dark:border-white/10 dark:bg-white/5"
            >
                <Chronicle />
            </div>
        </section>

        <!-- 星光尘覆盖：置于所有区块之后，使各区块卡片（含技能树、时与风）均覆盖星光 -->
        <div class="Dusty pointer-events-none absolute inset-0" aria-hidden="true" />
        <div
            class="Dusty pointer-events-none absolute inset-0 opacity-60"
            aria-hidden="true"
            style="background-size: 300px 300px"
        />

        <!-- 页尾 -->
        <div class="MaxContainer relative my-16!">
            <Icon class="mx-auto size-18 max-md:size-12" icon="fluent-emoji:fox" />
        </div>
    </div>
</template>

<style scoped>
.Dusty {
    --specks: rgb(43 52 44 / 0.35);
    background-image:
        radial-gradient(1.5px 1.5px at 22% 18%, var(--specks) 50%, transparent 51%),
        radial-gradient(1px 1px at 58% 42%, var(--specks) 50%, transparent 51%),
        radial-gradient(1.5px 1.5px at 84% 68%, var(--specks) 50%, transparent 51%),
        radial-gradient(1px 1px at 38% 82%, var(--specks) 50%, transparent 51%),
        radial-gradient(1px 1px at 12% 52%, var(--specks) 50%, transparent 51%),
        radial-gradient(1.5px 1.5px at 68% 12%, var(--specks) 50%, transparent 51%),
        radial-gradient(1px 1px at 92% 36%, var(--specks) 50%, transparent 51%),
        radial-gradient(1px 1px at 30% 64%, var(--specks) 50%, transparent 51%);
    background-repeat: repeat;
    background-size: 220px 220px;
    animation: dust-breathe 7s ease-in-out infinite alternate;
}

.dark .Dusty {
    --specks: rgb(255 255 255 / 0.35);
}

@keyframes dust-breathe {
    from {
        opacity: 0.4;
    }
    to {
        opacity: 0.85;
    }
}
</style>
