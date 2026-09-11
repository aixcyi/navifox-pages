<script lang="ts" setup>
import { onMounted, useTemplateRef } from 'vue';

/** 每块铺贴内的星点数量；视口 1258×802 时约铺 4×4 块（background-size 260px，见 style.css）。 */
const SPECKS_COUNT = 14;

/** 星点半径取值：多数 1px，少数 1.5px，避免整屏尺寸均匀反而失真。 */
const SPECKS_RADII = [1, 1, 1, 1.5] as const;

const surfer = useTemplateRef<HTMLDivElement>('surfer');

/**
 * 一次性随机生成星点，写入 `--dust-specks` 供 `.Dusty` 作为平铺背景使用。
 *
 * 刻意不做 opacity 呼吸等逐帧动画：那会让合成器在整个会话里持续出帧，核显上实测
 * 滚动／切换视图后稳定占用 13%～23%（瞬时冲到 80%），去掉动画即回落到 0%。
 */
function sprinkle(): string {
    const position = () => `${(Math.random() * 100).toFixed(2)}% ${(Math.random() * 100).toFixed(2)}%`;
    const speck = (radius: number) =>
        `radial-gradient(${radius}px ${radius}px at ${position()}, var(--specks) 50%, transparent 51%)`;
    const layers: string[] = [];
    for (let i = 0; i < SPECKS_COUNT; i++) {
        layers.push(speck(SPECKS_RADII[Math.floor(Math.random() * SPECKS_RADII.length)] ?? 1));
    }
    return layers.join(', ');
}

onMounted(() => {
    surfer.value?.style.setProperty('--dust-specks', sprinkle());
});
</script>

<template>
    <!-- 星光尘覆盖层：置于区块之后，使页面卡片均覆盖星光（样式见全局 style.css 的 .Dusty） -->
    <div ref="surfer" class="Dusty pointer-events-none absolute inset-0" aria-hidden="true" />
</template>
