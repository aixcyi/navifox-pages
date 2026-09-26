<script lang="ts" setup>
/**
 * 按字段优先级渲染图标，供书签、导航、页脚等
 * 「图标 + 文字」的列表项复用一个统一的回退链。
 */
import { Icon } from '@iconify/vue';
import type { Hyperlink } from '@navifox/types';
import type { Component } from 'vue';

interface Props {
    /** 待渲染的超链接数据，读取其中的 `logo` / `icon`。 */
    item: Hyperlink;

    /** 图标边长（像素）。 */
    size?: number;

    /** 既无 `mark`、`logo` 也无 `icon` 时使用的兜底图片地址。 */
    fallback?: string;

    /** 编译期图标组件，优先级最高；宽度按图稿自身的比例推。 */
    mark?: Component;
}

const props = withDefaults(defineProps<Props>(), {
    size: 16,
    fallback: '',
});
</script>

<template>
    <component :is="props.mark" v-if="props.mark" :style="{ height: `${props.size}px`, width: 'auto' }" />
    <Icon
        v-else-if="props.item.logo"
        :icon="props.item.logo"
        :width="props.size"
        :height="props.size"
    />
    <img
        v-else-if="props.item.icon"
        :src="props.item.icon"
        :width="props.size"
        :height="props.size"
        alt="ico"
        loading="lazy"
        decoding="async"
    />
    <img
        v-else-if="props.fallback"
        :src="props.fallback"
        :width="props.size"
        :height="props.size"
        alt="ico"
        loading="lazy"
        decoding="async"
    />
</template>
