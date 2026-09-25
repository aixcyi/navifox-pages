<script lang="ts" setup>
import type { Website } from '@navifox/types';
import { website } from '@navifox/utils';
import IconArrowOutward from '~icons/material-symbols/arrow-outward';

/**
 * 项目卡片：左侧发行类型图标，右侧自上而下是标题、社交链接、简介。
 *
 * 发行类型与社交徽章都由调用方经插槽传入——它们是编译期图标组件，不再由数据里的图标名决定。
 *
 * 有链接时整卡可点击：卡片内还有社交链接、锚点不能嵌套，故由标题锚点用 `::after` 铺满整卡
 * （stretched link），社交链接抬到它上一层。
 */
defineProps<{ project: Website }>();
</script>

<template>
    <article
        :class="[
            'GlassCard group relative flex items-start gap-4 p-5 transition-all duration-300 sm:p-6',
            project.link ? 'Hoverable' : '',
        ]"
    >
        <slot name="releaseType" />
        <div class="min-w-0 flex-1">
            <div class="flex items-center gap-2">
                <h3 class="min-w-0 text-lg font-bold tracking-tight">
                    <a
                        v-if="project.link"
                        :href="project.link"
                        class="AnchorHeading after:absolute after:inset-0 after:content-['']"
                        rel="noopener noreferrer"
                        target="_blank"
                        v-html="project.text"
                    />
                    <template v-else>{{ project.text }}</template>
                </h3>
                <div v-if="$slots.socials" class="relative z-10 flex flex-wrap items-center gap-2">
                    <slot name="socials" />
                </div>
                <IconArrowOutward
                    v-if="project.link"
                    class="text-starlight-500 dark:text-starlight-300 ml-auto size-4.5 shrink-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                />
            </div>
            <p
                v-if="website.description(project)"
                class="mt-2 text-sm leading-relaxed text-stone-500 dark:text-slate-400"
                v-html="website.description(project)"
            />
        </div>
    </article>
</template>
