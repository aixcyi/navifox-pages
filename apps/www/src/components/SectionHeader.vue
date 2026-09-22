<script lang="ts" setup>
import type { AnchorTarget } from '@navifox/types';

import AnchorHeading from '#/components/AnchorHeading.vue';

interface Props {
    /** 眉题（标题上方的英文小标题）。 */
    eyebrow?: string;

    /** 纯文本标题。 */
    title?: string;

    /** 富文本标题（与 title 二选一，传入时优先）。 */
    html?: string;

    /** 标题下方的成段介绍（富文本）；传入默认插槽时改用插槽内容。 */
    description?: string;

    /** 锚点目标（见 AnchorTarget）：传入时标题渲染成可跳转的锚链接。 */
    id?: AnchorTarget;

    /** 标题层级：页面级标题用 `h1`，区块标题用 `h2`。 */
    level?: 'h1' | 'h2';

    /** 是否居中：页面级标题居中，首页各区块标题左对齐。 */
    centered?: boolean;
}

withDefaults(defineProps<Props>(), { level: 'h2' });
defineSlots<{ default?(): any }>();
</script>

<template>
    <!-- 字号以“网上友邻”的标题块为准，全站各区块保持一致。 -->
    <header :class="centered ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'">
        <p
            v-if="eyebrow"
            class="text-starlight-600 dark:text-starlight-300 font-mono text-[0.72rem] tracking-[0.28em] uppercase sm:text-sm"
            v-html="eyebrow"
        />
        <component
            :is="level"
            class="text-night-900 mt-3 text-3xl font-bold tracking-tight sm:text-4xl dark:text-white"
        >
            <AnchorHeading v-if="id !== undefined" :html="html" :id="id" :text="title" />
            <span v-else-if="html" v-html="html" />
            <template v-else>{{ title }}</template>
        </component>
        <p v-if="$slots.default || description" class="mt-3 leading-relaxed text-stone-500 dark:text-slate-300">
            <slot v-if="$slots.default" />
            <span v-else v-html="description" />
        </p>
    </header>
</template>
