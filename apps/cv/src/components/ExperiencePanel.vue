<script lang="ts" setup>
import Job2021 from '#/components/experiences/Job2021.vue';
import Job2022 from '#/components/experiences/Job2022.vue';
import Repo2026NavifoxPages from '#/components/experiences/Repo2026NavifoxPages.vue';
import { Icon } from '@iconify/vue';
import { ColorBadge } from '@navifox/constants';
import type { Experience } from '@navifox/types';

const experiences: Experience[] = [
    {
        title: '前端开发+部署',
        start: { year: 2026, month: 1 },
        project: { name: 'Navifox Pages', description: '' },
        detail: Repo2026NavifoxPages,
        skills: [
            ColorBadge.TypeScript,
            ColorBadge.Vue,
            ColorBadge.TailwindCSS,
            ColorBadge.Gsap,
            ColorBadge.VueUse,
            ColorBadge.Lodash,
            ColorBadge.Vite,
            ColorBadge.Pnpm,
        ],
    },
    {
        title: '后端开发',
        start: { year: 2022, month: 3 },
        team: '广州某某科技',
        project: { name: '景区生态系统', description: '' },
        detail: Job2022,
        skills: [
            ColorBadge.Python,
            ColorBadge.Django,
            ColorBadge.DjangoRESTFramework,
            ColorBadge.Vue,
            ColorBadge.JavaScript,
            ColorBadge.PostgreSQL,
            ColorBadge.Redis,
            ColorBadge.Apifox,
            ColorBadge.Grafana,
        ],
    },
    {
        title: '后端开发',
        start: { year: 2021, month: 3 },
        stop: { year: 2022, month: 1 },
        team: '中山一件科技',
        project: { name: '跨境电商ERP', description: '' },
        detail: Job2021,
        skills: [
            ColorBadge.Python,
            ColorBadge.Django,
            ColorBadge.Bootstrap,
            ColorBadge.PostgreSQL,
        ],
    },
]
</script>


<template>
<section class="flex flex-col gap-8">
    <section v-for="e in experiences"
             class="flex flex-col gap-1">
        <div>
            <span class="mr-2"><b>{{ e.project?.name ?? e.team }}</b></span>
            <span class="ml-2 float-end">
                    <code>{{ e.start.year }}.{{ e.start.month }}</code>
                    <code v-if="e.stop"> - {{ e.stop!.year }}.{{ e.stop!.month }}</code>
                    <span v-else> 至今</span>
            </span>
            <span class="text-gray-500">
                    <span v-if="e.project?.description">{{ e.project!.description }}・</span>
                    <span v-if="e.team">{{ e.team }}・</span>
                    <span>{{ e.title }}</span>
            </span>
        </div>
        <div v-if="e.skills" class="text-gray-500 text-sm flex flex-wrap gap-x-3 gap-y-1">
            <div v-for="stack in e.skills" class="flex flex-nowrap gap-1 items-center">
                <Icon :icon="stack.logo" height="16" />
                <span v-if="stack.text">{{ stack.text }}</span>
            </div>
        </div>
        <component :is="e.detail" v-if="e.detail" />
    </section>
</section>
</template>


<style scoped>
svg {
    /* Tailwind 的 @layer base { svg } 自带了 display: block，
     * 没办法用 Icon 自带的 inline 属性覆盖。 */
    display: inline;
}

:deep(u) {
    text-decoration: underline 3px var(--color-orange-500);
    text-underline-offset: 3px;
}
</style>
