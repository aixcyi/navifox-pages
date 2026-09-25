<script lang="ts" setup>
/**
 * 项目经历。
 */
interface Props {
    /** 岗位／担任／职能。 */
    title: string;

    /** 开始时间。 */
    start: string;

    /** 结束时间。 */
    stop?: string;

    /** 所在组织／团队／公司。 */
    team?: string;

    /** 负责项目。 */
    project?: string;
}

defineProps<Props>();
</script>

<template>
    <section class="GlassCard flex flex-col gap-2 p-6 sm:p-8">
        <div>
            <b class="mr-2">{{ project ?? team }}</b>
            <!-- 「至今」是汉字，不能落在 `code` 里：mono 字体链没有 CJK 字形，会回退成宋体一类；
                 也不用 `i`／`em` 承接，那样会带上合成斜体。改用显式的 `font-sans`。 -->
            <span class="float-end ml-2">
                <code>{{ start }}</code>
                <code v-if="stop"> - {{ stop }}</code>
                <span v-else class="font-sans">&nbsp;至今</span>
            </span>
            <span class="text-slate-400 dark:text-slate-500">
                <span v-if="team">{{ team }}・</span>
                <span>{{ title }}</span>
            </span>
        </div>
        <div v-if="$slots.stack" class="flex flex-wrap gap-x-3 gap-y-1 text-sm text-slate-400 dark:text-slate-500">
            <slot name="stack"></slot>
        </div>
        <slot></slot>
    </section>
</template>
