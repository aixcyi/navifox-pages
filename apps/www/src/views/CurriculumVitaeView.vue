<script lang="ts" setup>
import AiDivider from '#/components/AiDivider.vue';
import Job2021 from '#/components/experiences/Job2021.vue';
import Job2022 from '#/components/experiences/Job2022.vue';
import NavifoxPages from '#/components/experiences/NavifoxPages.vue';
import ProgrammerPanel from '#/components/ProgrammerPanel.vue';
import SkillsPanel from '#/components/SkillsPanel.vue';
import { Icon } from '@iconify/vue';
import { tighnari } from '@navifox/constants';
import type { Badge } from '@navifox/types';
import { BackToTopButton, Button } from '@navifox/ui';
import { type ComponentPublicInstance, ref, useTemplateRef } from 'vue';
import '#/styles/content.css';

function* getStates(): Generator<Badge> {
    if (tighnari.location)
        yield { logo: 'zondicons:location', text: tighnari.location }
    if (tighnari.age)
        yield { logo: 'material-symbols:schedule', text: `${tighnari.age}岁` }
    if (tighnari.wxid)
        yield { logo: 'bi:wechat', text: tighnari.wxid }
    if (cvLastUpdateTime)
        yield { logo: 'stash:last-updates-solid', text: cvLastUpdateTime }
}

const cvLastUpdateTime = '2026.3'
const egoStates = [ ...getStates() ]
const isShowingCatalog = ref(false)
const experiencePanel = useTemplateRef<ComponentPublicInstance>('experiencePanel')
const programmerPanel = useTemplateRef<ComponentPublicInstance>('programmerPanel')
const skillsPanel = useTemplateRef<ComponentPublicInstance>('skillsPanel')
</script>


<template>
<div class="mx-auto px-4 max-w-[210mm] min-h-screen text-slate-600 dark:text-slate-400">
    <div
        class="mx-2 text-slate-300/25 dark:text-slate-800/25 text-nowrap overflow-x-hidden selection:bg-slate-200 dark:selection:bg-slate-900 selection:text-slate-400 dark:selection:text-slate-600"
    >
        <i v-html="tighnari.description?.replaceAll('<br>','')" />
    </div>

    <article class="Content py-8 rounded-xl bg-white dark:bg-slate-800 flex flex-col gap-8">

        <!-- 头部信息 -->
        <div class="mx-8 flex flex-col gap-3 text-center items-center">
            <h1 class="text-4xl"><b class="text-slate-950 dark:text-slate-50">阿羽</b></h1>
            <div class="flex flex-wrap gap-1 justify-center items-center">
                <div v-for="state in egoStates" class="inline-flex flex-nowrap items-center">
                    <Icon :icon="state.logo" height="16" />
                    <span class="ml-1 mr-3 text-nowrap">{{ state.text }}</span>
                </div>
            </div>
            <p v-if="tighnari.titles" class="text-center">
                {{ tighnari.titles.join(' ・ ') }}
            </p>
        </div>

        <!-- 项目经历 -->
        <AiDivider ref="experiencePanel" />
        <NavifoxPages class="mx-8" />
        <AiDivider />
        <Job2022 class="mx-8" />
        <AiDivider />
        <Job2021 class="mx-8" />

        <!-- 技能评级 -->
        <AiDivider ref="programmerPanel" />
        <section class="mx-8">
            <span class="mr-2"><b class="text-slate-950 dark:text-slate-50">技能评估等级</b></span>
            <span class="ml-2 float-end"><code>{{ cvLastUpdateTime }}</code></span>
            <span>
            <a class="not-hover:text-slate-400! dark:not-hover:text-slate-500!"
               href="https://github.com/bennyhuo/programmer-levels"
               target="_blank">霍丙乾 Programmer Levels v0.4</a>
        </span>
        </section>
        <ProgrammerPanel class="mx-8" />

        <!-- 技能面板 -->
        <AiDivider ref="skillsPanel" />
        <div class="mx-8">
            <SkillsPanel />
        </div>

    </article>

    <!-- 页尾 -->
    <div class="my-12">
        <Icon class="max-md:size-12 size-18 mx-auto" icon="fluent-emoji:fox" />
    </div>

    <!-- 浮动工具 -->
    <div class="fixed right-10 bottom-10">
        <div class="flex gap-3 text-slate-200">
            <BackToTopButton :see="experiencePanel?.$el"
                             class="rounded-full bg-sky-800 hover:bg-sky-700 cursor-pointer"
                             size="icon-2xl">
                <Icon class="size-6" icon="tdesign:backtop" />
            </BackToTopButton>
            <Button class="rounded-full bg-sky-800 hover:bg-sky-700 cursor-pointer"
                    size="icon-2xl"
                    @click="isShowingCatalog = !isShowingCatalog"
                    @focusout="isShowingCatalog = false">
                <Icon class="size-6" icon="carbon:catalog-publish" />
            </Button>
        </div>
    </div>
    <div class="fixed right-10 bottom-25">
        <Transition
            enter-active-class="transition-opacity duration-300 ease-out"
            enter-from-class="opacity-0"
            enter-to-class="opacity-100"
            leave-active-class="transition-opacity duration-200 ease-in"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
        >
            <div v-if="isShowingCatalog" class="flex flex-col gap-3 items-end text-slate-200">
                <BackToTopButton :to="experiencePanel?.$el"
                                 class="rounded-full bg-sky-800 hover:bg-sky-700 cursor-pointer"
                                 size="lg">
                    <span>项目经历</span>
                </BackToTopButton>
                <BackToTopButton :to="programmerPanel?.$el"
                                 class="rounded-full bg-sky-800 hover:bg-sky-700 cursor-pointer"
                                 size="lg">
                    <span>技能评估等级</span>
                </BackToTopButton>
                <BackToTopButton :to="skillsPanel?.$el"
                                 class="rounded-full bg-sky-800 hover:bg-sky-700 cursor-pointer"
                                 size="lg">
                    <span>技能面板</span>
                </BackToTopButton>
            </div>
        </Transition>
    </div>
</div>
</template>


<!--suppress CssUnusedSymbol -->
<style scoped>
:deep(.n-float-button) {
    transition: all .3s;
    background-color: var(--color-sky-800);
}

:deep(.n-float-button):hover {
    color: white;
    background-color: var(--color-sky-600);
}

.n-float-button :deep(.n-float-button__menu) {
    right: 0;
    align-items: end;
}
</style>
