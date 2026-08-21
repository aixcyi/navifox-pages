<script setup lang="ts">
import { useClipboard } from '@vueuse/core';
import { VPLink } from 'vitepress/theme';
import { onMounted } from 'vue';

import type { SpiritInfo } from '#/spirits';

defineProps<SpiritInfo & { copyOnly?: boolean }>();

const { copy, copied } = useClipboard();

// 非整数缩放（如 Windows 150%，devicePixelRatio = 1.5）下，1px CSS 像素
// 会落在非整数物理像素上，渐变边框环带四边粗细不均；按 DPR 反推环带
// 宽度（1px / DPR），使其恰好对齐 1 物理像素。SSR 阶段不执行，仅客户端生效
onMounted(() => {
    const dpr = window.devicePixelRatio || 1;
    document.documentElement.style.setProperty('--hairline', `${1 / dpr}px`);
});
</script>

<template>
    <VPLink
        class="SpiritCard"
        :class="{ faded: faded }"
        :href="copyOnly ? '' : link"
        target="_self"
        :no-icon="true"
        :style="{ cursor: copyOnly ? 'copy' : link ? 'pointer' : 'default' }"
        @click="copyOnly && !copied && copy(link)"
    >
        <article class="box">
            <div v-if="copied" class="avatar">已复制</div>
            <img v-else-if="avatar" :src="avatar" :alt="name" class="avatar" />
            <div v-else class="avatar"></div>
            <div class="content">
                <div class="name" v-html="name" />
                <div class="tags">
                    <div v-for="(tag, i) in tags" :key="i" v-html="tag" />
                </div>
            </div>
        </article>
    </VPLink>
</template>

<style scoped>
.SpiritCard {
    position: relative;
    isolation: isolate;
    display: block;
    color: inherit;
    border: 1px solid var(--vp-c-bg-soft);
    border-radius: 12px;
    width: 360px;
    height: 100%;
    background-color: var(--vp-c-bg-soft);
    text-decoration: none;
    transition:
        border-color 0.25s,
        background-color 0.25s;
}

.SpiritCard:hover {
    background-color: var(--vp-c-gray-soft);
}

.SpiritCard.faded:hover img {
    filter: grayscale(100%);
    transition: filter 1s ease;
}

/* 带链接的卡片 hover：背景变灰（同无链接卡片）的同时边框呈现渐变。
   ::before 用 mask 裁出 2px 边框环带（宽度取自 --hairline 的 2 倍，即恰好
   2 物理像素，避免 150% 等非整数缩放下的四边粗细不均），渐变只渲染在
   环带上、内部完全透明，不遮挡卡片自身的半透明背景（gray-soft 与页面
   背景直接叠加，与无链接卡片一致）；hover 时实色边框钉在 gray-soft，
   防止默认品牌红边框在渐变淡入时透出 */
.SpiritCard.link:hover {
    color: inherit;
    border-color: var(--vp-c-gray-soft);
}

.SpiritCard.link::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: -1;
    border-radius: 12px;
    padding: calc(var(--hairline, 1px) * 2);
    background: var(--vp-home-hero-name-background);
    -webkit-mask:
        linear-gradient(#fff 0 0) content-box,
        linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask:
        linear-gradient(#fff 0 0) content-box,
        linear-gradient(#fff 0 0);
    mask-composite: exclude;
    opacity: 0;
    transition: opacity 0.25s ease;
}

.SpiritCard.link:hover::before {
    opacity: 1;
}

.box {
    display: flex;
    gap: 16px;
    padding: 24px;
    height: 100%;
}

.content {
    height: fit-content;
    align-self: center;
}

.avatar {
    width: 80px;
    height: 80px;
    margin: 0;
    color: var(--vp-c-text-3);
    border-radius: 50%;
    background-color: rgba(0 0 0 / 20%);
    text-align: center;
    align-content: center;
    flex-shrink: 0;
}

.name {
    color: var(--vp-c-text-1);
    font-size: 16px;
    font-weight: 600;
    line-height: 24px;
}

.tags {
    color: var(--vp-c-text-2);
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    font-size: 14px;
    column-gap: 8px;
}
</style>
