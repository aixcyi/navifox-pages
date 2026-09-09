<script lang="ts" setup>
import { Icon } from '@iconify/vue/offline';
import type { Project } from '@navifox/types';

/**
 * 项目经历。
 */
interface ExperienceDetail {
    /** 岗位／担任／职能。 */
    title: string;

    /** 开始时间。 */
    start: string;

    /** 结束时间。 */
    stop?: string;

    /** 所在组织／团队／公司。 */
    team?: string;

    /** 负责项目。 */
    project?: Project;
}

defineProps<ExperienceDetail>();
</script>

<template>
    <section class="flex flex-col gap-2">
        <div>
            <b class="mr-2">{{ project?.name ?? team }}</b>
            <span class="float-end ml-2">
                <code>{{ start }}</code>
                <code v-if="stop"> - {{ stop }}</code>
                <span v-else> 至今</span>
            </span>
            <span class="text-slate-400 dark:text-slate-500">
                <span v-if="project?.description">{{ project.description }}・</span>
                <span v-if="team">{{ team }}・</span>
                <span>{{ title }}</span>
            </span>
        </div>
        <div v-if="project?.stack" class="flex flex-wrap gap-x-3 gap-y-1 text-sm text-slate-400 dark:text-slate-500">
            <div v-for="skill in project.stack" class="flex flex-nowrap items-center gap-1">
                <Icon :icon="skill.logo" height="16" />
                <span v-if="skill.text">{{ skill.text }}</span>
            </div>
        </div>
        <slot></slot>
    </section>
</template>
