<script lang="ts" setup>
import type { AnchorTarget } from '@navifox/types';

interface Props {
    /** 滚动目标（见 AnchorTarget）：为字符串时渲染成锚链接，悬停显示前置 `#`；为数字时仅渲染标题文本。 */
    id: AnchorTarget;

    /** 纯文本标题。 */
    text?: string;

    /** 富文本标题（与 text 二选一，传入时优先）。 */
    html?: string;
}

defineProps<Props>();
</script>

<template>
    <!-- 默认颜色继承标题本色、无下划线；悬停才转金色（见全局 style.css 的 .AnchorHeading 规则）。 -->
    <a
        v-if="typeof id === 'string'"
        :href="`#${id}`"
        class="AnchorHeading group relative inline-flex items-center whitespace-nowrap"
    >
        <span
            aria-hidden="true"
            class="text-starlight-600 dark:text-starlight-300 absolute top-1/2 -left-7 -translate-y-1/2 opacity-0 transition-opacity duration-200 select-none group-hover:opacity-33"
            v-html="'#'"
        />
        <span v-if="html" v-html="html" />
        <span v-else>{{ text }}</span>
    </a>
    <span v-else-if="html" v-html="html" />
    <span v-else>{{ text }}</span>
</template>
