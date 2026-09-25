<script lang="ts" setup>
import type { Website } from '@navifox/types';
import { website } from '@navifox/utils';
import IconArrowOutward from '~icons/material-symbols/arrow-outward';

/**
 * 项目卡片：自上而下是标题、社交链接、简介，发行类型图标做成右下角的水印。
 *
 * 发行类型与社交徽章都由调用方经插槽传入——它们是编译期图标组件，不再由数据里的图标名决定。
 * 水印只传图标本身即可：尺寸与位置由这里的外层盒子决定（`[&>svg]:size-full`），
 * 调用方不必自己定尺寸，与 docs 的 ProjectShowcase 同一套约定。
 *
 * 水印常态隐藏、悬停淡入，与朋友圈卡片、友链卡片的日期水印同一套写法。
 * devicon 那批图标是 `fill="currentColor"`，所以深浅靠 `text-night-900/10` 这类文字色控制，
 * 而不是再叠一层 `opacity`。`-bottom-28` 是刻意让它探出下沿、被卡片裁平的，故卡片必须 `overflow-hidden`。
 *
 * 有链接时整卡可点击：卡片内还有社交链接、锚点不能嵌套，故由标题锚点用 `::after` 铺满整卡
 * （stretched link），社交链接抬到它上一层；水印靠 `pointer-events-none` 让开这一层锚点。
 */
defineProps<{ project: Website }>();
</script>

<template>
    <article
        :class="[
            'GlassCard group relative overflow-hidden p-6 transition-all duration-300 sm:p-8',
            project.link ? 'Hoverable' : '',
        ]"
    >
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
            class="mt-3 text-sm leading-relaxed text-stone-500 transition-colors duration-300 group-hover:text-inherit dark:text-slate-400"
            v-html="website.description(project)"
        />

        <span
            v-if="$slots.watermark"
            aria-hidden="true"
            class="text-night-900/10 pointer-events-none absolute right-18 -bottom-28 size-48 opacity-0 transition-opacity duration-300 select-none group-hover:opacity-100 dark:text-white/10 [&>svg]:size-full"
        >
            <slot name="watermark" />
        </span>
    </article>
</template>
