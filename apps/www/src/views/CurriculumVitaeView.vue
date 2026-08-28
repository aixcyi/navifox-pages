<script lang="ts" setup>
import { Icon } from '@iconify/vue';
import { tighnari } from '@navifox/constants';
import type { Badge } from '@navifox/types';
import { BackToTopButton, Button } from '@navifox/ui';
import { type ComponentPublicInstance, ref, useTemplateRef } from 'vue';

import AiDivider from '#/components/AiDivider.vue';
import Job2021 from '#/components/experiences/Job2021.vue';
import Job2022 from '#/components/experiences/Job2022.vue';
import NavifoxPages from '#/components/experiences/NavifoxPages.vue';
import Navbar from '#/components/Navbar.vue';
import NavDropdownMenu from '#/components/NavDropdownMenu.vue';
import ProgrammerPanel from '#/components/ProgrammerPanel.vue';
import SkillsPanel from '#/components/SkillsPanel.vue';

function* getStates(): Generator<Badge> {
    if (tighnari.location) yield { logo: 'zondicons:location', text: tighnari.location };
    if (tighnari.age) yield { logo: 'material-symbols:schedule', text: `${tighnari.age}岁` };
    if (tighnari.wxid) yield { logo: 'bi:wechat', text: tighnari.wxid };
    if (cvLastUpdateTime) yield { logo: 'stash:last-updates-solid', text: cvLastUpdateTime };
}

const cvLastUpdateTime = '2026.3';
const egoStates = [...getStates()];
const isShowingCatalog = ref(false);
const experiencePanel = useTemplateRef<ComponentPublicInstance>('experiencePanel');
const programmerPanel = useTemplateRef<ComponentPublicInstance>('programmerPanel');
const skillsPanel = useTemplateRef<ComponentPublicInstance>('skillsPanel');
</script>

<template>
    <Navbar />
    <NavDropdownMenu class="fixed inset-x-0 top-0 z-50" />
    <div class="mx-auto min-h-screen max-w-[210mm] px-4 text-slate-600 dark:text-slate-400">
        <div
            class="mx-2 overflow-x-hidden pt-28 text-nowrap text-slate-300/25 selection:bg-slate-100 selection:text-slate-400 dark:text-slate-800/25 dark:selection:bg-slate-900 dark:selection:text-slate-600"
        >
            <i>{{ tighnari.description }}</i>
        </div>

        <article class="Content flex flex-col gap-8 rounded-xl bg-white py-8 dark:bg-slate-800">
            <!-- 头部信息 -->
            <div class="mx-8 flex flex-col items-center gap-3 text-center">
                <h1 class="text-4xl"><b class="text-slate-950 dark:text-slate-50">阿羽</b></h1>
                <div class="flex flex-wrap items-center justify-center gap-1">
                    <div v-for="state in egoStates" class="inline-flex flex-nowrap items-center">
                        <Icon :icon="state.logo" height="16" />
                        <span class="mr-3 ml-1 text-nowrap">{{ state.text }}</span>
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
                <span class="float-end ml-2">
                    <code>{{ cvLastUpdateTime }}</code>
                </span>
                <span>
                    <a
                        class="not-hover:text-slate-400! dark:not-hover:text-slate-500!"
                        href="https://github.com/bennyhuo/programmer-levels"
                        target="_blank"
                        v-html="'霍丙乾 Programmer Levels v0.4'"
                    />
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
            <Icon class="mx-auto size-18 max-md:size-12" icon="fluent-emoji:fox" />
        </div>

        <!-- 浮动工具 -->
        <div class="fixed right-10 bottom-10">
            <div class="flex gap-3 text-slate-200">
                <BackToTopButton
                    :see="experiencePanel?.$el"
                    class="cursor-pointer rounded-full bg-sky-600 hover:bg-sky-700 dark:bg-sky-800"
                    size="icon-2xl"
                >
                    <Icon class="size-6" icon="tdesign:backtop" />
                </BackToTopButton>
                <Button
                    class="cursor-pointer rounded-full bg-sky-600 hover:bg-sky-700 dark:bg-sky-800"
                    size="icon-2xl"
                    @click="isShowingCatalog = !isShowingCatalog"
                    @focusout="isShowingCatalog = false"
                >
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
                <div v-if="isShowingCatalog" class="flex flex-col items-end gap-3 text-slate-200">
                    <BackToTopButton
                        :to="experiencePanel?.$el"
                        class="cursor-pointer rounded-full bg-sky-600 hover:bg-sky-700 dark:bg-sky-800"
                        size="lg"
                    >
                        <span>项目经历</span>
                    </BackToTopButton>
                    <BackToTopButton
                        :to="programmerPanel?.$el"
                        class="cursor-pointer rounded-full bg-sky-600 hover:bg-sky-700 dark:bg-sky-800"
                        size="lg"
                    >
                        <span>技能评估等级</span>
                    </BackToTopButton>
                    <BackToTopButton
                        :to="skillsPanel?.$el"
                        class="cursor-pointer rounded-full bg-sky-600 hover:bg-sky-700 dark:bg-sky-800"
                        size="lg"
                    >
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
    transition: all 0.3s;
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
