<script lang="ts" setup>
import { Icon } from '@iconify/vue/offline';
import type { Project } from '@navifox/types';
import { website } from '@navifox/utils';

/**
 * 项目卡片：左侧发行类型图标，右侧自上而下是标题、社交链接、简介。
 *
 * 有链接时整卡可点击：卡片内还有社交链接、锚点不能嵌套，故由标题锚点用 `::after` 铺满整卡
 * （stretched link），社交链接抬到它上一层。
 */
defineProps<{ project: Project }>();
</script>

<template>
    <article
        :class="[
            'GlassCard group relative flex items-start gap-4 p-5 transition-all duration-300 sm:p-6',
            project.link
                ? 'hover:border-starlight-500/50 hover:shadow-starlight-600/10 hover:-translate-y-1 hover:shadow-xl'
                : '',
        ]"
    >
        <Icon
            v-if="project.releaseType"
            :icon="project.releaseType"
            aria-hidden="true"
            class="shrink-0 select-none"
            height="40"
        />
        <div class="min-w-0 flex-1">
            <div class="flex items-center gap-2">
                <h3 class="text-night-900 min-w-0 text-lg font-bold tracking-tight dark:text-white">
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
                <div v-if="project.socials" class="relative z-10 flex flex-wrap items-center gap-2">
                    <template v-for="social in project.socials" :key="social.link ?? social.logo">
                        <a
                            v-if="social.logo"
                            :href="social.link"
                            :title="social.text ?? social.link"
                            class="dark:hover:text-starlight-300 hover:text-starlight-600 flex h-4 items-center text-stone-400 transition-colors duration-200 dark:text-slate-500"
                            rel="noopener noreferrer"
                            target="_blank"
                        >
                            <Icon :icon="social.logo" height="24" />
                        </a>
                    </template>
                </div>
                <Icon
                    v-if="project.link"
                    class="text-starlight-500 dark:text-starlight-300 ml-auto shrink-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                    height="18"
                    icon="material-symbols:arrow-outward"
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
