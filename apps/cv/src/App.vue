<script lang="ts" setup>
import AiTimeline from '#/components/AiTimeline.vue';
import Job2021 from '#/components/experiences/Job2021.vue';
import Job2022 from '#/components/experiences/Job2022.vue';
import NavifoxPages from '#/components/experiences/NavifoxPages.vue';
import ProgrammerPanel from '#/components/ProgrammerPanel.vue';
import SkillsPanel from '#/components/SkillsPanel.vue';
import { Icon } from '@iconify/vue';
import { curriculumVitae, signature, tighnari } from '@navifox/constants';
import type { Badge } from '@navifox/types';
import { BackToTopButton, Button } from '@navifox/ui';
import { logger, useWebsiteLinks, useWebsiteMetas } from '@navifox/utils';
import { useHead } from '@unhead/vue';
import { ref, useTemplateRef } from 'vue';

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
const experiencePanel = useTemplateRef('experiencePanel')
const programmerPanel = useTemplateRef('programmerPanel')
const skillsPanel = useTemplateRef('skillsPanel')
const timeline = useTemplateRef('timeline')

logger.draw(signature, '#459199')

useHead({
    title: curriculumVitae.name,
    meta: [ ...useWebsiteMetas(curriculumVitae) ],
    link: [ ...useWebsiteLinks(curriculumVitae) ],
})
</script>


<template>
<div class="mt-2 mx-2 text-slate-800/25 text-nowrap overflow-x-hidden selection:bg-slate-900 selection:text-slate-600"
     v-html="tighnari.description?.replaceAll('<br>','')" />
<article class="py-8 rounded-xl bg-slate-800 flex flex-col gap-8"
         style="--tick-stroke: var(--color-slate-700)">

    <!-- 头部信息 -->
    <div class="mx-8 flex flex-col gap-3 text-center items-center">
        <h1 class="text-4xl"><b class="text-slate-50!">阿羽</b></h1>
        <div class="flex flex-wrap gap-1 justify-center items-center">
            <div v-for="state in egoStates" class="inline-flex flex-nowrap items-center">
                <Icon :icon="state.logo" height="16" />
                <span class="ml-1 mr-3 text-nowrap">{{ state.text }}</span>
            </div>
        </div>
        <span class="text-center text-slate-600 tracking-[.5em]">・{{ curriculumVitae.description }}・</span>
    </div>

    <!-- 项目经历 -->
    <div ref="experiencePanel" class="relative border border-dashed border-(--tick-stroke) tick-left tick-right" />
    <NavifoxPages class="mx-8" />
    <div class="relative border border-dashed border-(--tick-stroke) tick-left tick-right" />
    <Job2022 class="mx-8" />
    <div class="relative border border-dashed border-(--tick-stroke) tick-left tick-right" />
    <Job2021 class="mx-8" />

    <!-- 技能评级 -->
    <div ref="programmerPanel" class="relative border border-dashed border-(--tick-stroke) tick-left tick-right" />
    <section class="mx-8">
        <span class="mr-2"><b class="text-slate-50!">技能评估等级</b></span>
        <span class="ml-2 float-end"><code>{{ cvLastUpdateTime }}</code></span>
        <span>
            <a class="not-hover:text-slate-500!"
               href="https://github.com/bennyhuo/programmer-levels"
               target="_blank">霍丙乾 Programmer Levels v0.4</a>
        </span>
    </section>
    <ProgrammerPanel class="mx-8" />

    <!-- 技能面板 -->
    <div ref="skillsPanel" class="relative border border-dashed border-(--tick-stroke) tick-left tick-right" />
    <div class="mx-8">
        <SkillsPanel />
    </div>

    <!-- 大事年表 -->
    <div ref="timeline" class="relative border border-dashed border-(--tick-stroke) tick-left tick-right" />
    <b class="mx-8 text-slate-50!">风带来了故事的种子</b>
    <section class="mx-8">
        <AiTimeline />
    </section>

</article>

<!-- 页尾 -->
<div class="my-12">
    <Icon class="max-md:size-12 size-18 mx-auto" icon="fluent-emoji:fox" />
</div>

<!-- 浮动工具 -->
<div class="fixed right-10 bottom-10">
    <div class="flex gap-3">
        <BackToTopButton :see="experiencePanel"
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
        <div v-if="isShowingCatalog" class="flex flex-col gap-3 items-end">
            <BackToTopButton :to="experiencePanel"
                             class="rounded-full bg-sky-800 hover:bg-sky-700 cursor-pointer"
                             size="lg">
                <span>项目经历</span>
            </BackToTopButton>
            <BackToTopButton :to="programmerPanel"
                             class="rounded-full bg-sky-800 hover:bg-sky-700 cursor-pointer"
                             size="lg">
                <span>技能评估等级</span>
            </BackToTopButton>
            <BackToTopButton :to="skillsPanel"
                             class="rounded-full bg-sky-800 hover:bg-sky-700 cursor-pointer"
                             size="lg">
                <span>技能面板</span>
            </BackToTopButton>
            <BackToTopButton :to="timeline"
                             class="rounded-full bg-sky-800 hover:bg-sky-700 cursor-pointer"
                             size="lg">
                <span>时间线</span>
            </BackToTopButton>
        </div>
    </Transition>
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

.tick-right::after {
    content: "";
    border-top: 5px solid #0000;
    border-right: 5px solid var(--tick-stroke);
    border-bottom: 5px solid #0000;
    border-left: 5px solid #0000;
    width: 0;
    height: 0;
    position: absolute;
    top: -5px;
    right: 0;
}

.tick-left::before {
    content: "";
    border-top: 5px solid #0000;
    border-bottom: 5px solid #0000;
    border-right: 5px solid #0000;
    border-left: 5px solid var(--tick-stroke);
    width: 0;
    height: 0;
    position: absolute;
    top: -5px;
    left: 0;
}
</style>
