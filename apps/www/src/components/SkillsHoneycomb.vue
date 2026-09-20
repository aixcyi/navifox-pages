<script lang="ts" setup>
import { Icon } from '@iconify/vue/offline';
import { skillStacks } from '@navifox/constants';
import type { Badge } from '@navifox/types';
import { useElementSize } from '@vueuse/core';
import { computed, ref } from 'vue';

/** 蜂窝里的技能图标：与技能面板同源，同一枚徽章只取一次，最后按名称整体排序。 */
const badges: Badge[] = [];
for (const branch of skillStacks) {
    for (const skill of branch.skills) {
        if (!badges.some((badge) => badge.logo === skill.badge.logo)) badges.push(skill.badge);
    }
}
badges.sort((a, b) => a.text!.localeCompare(b.text!));

/** 格距（即格宽）：只用来算一行放得下几格。 */
const PITCH = 96;

const container = ref<HTMLElement | null>(null);
const { width } = useElementSize(container);

/** 一行放得下的格数：不缩小格子，放不下就折行；至少留 2 格，否则相邻两行没法错位咬合。 */
const columns = computed(() => Math.max(2, Math.floor(width.value / PITCH)));

/**
 * 蜂窝排布：宽行 `columns` 格、窄行 `columns - 1` 格交替，窄行居中后自然错开半格。
 * `nominal` 是这一行「本该」有几格——最后一行常填不满，若按实际格数居中，它的起点就成了随机的
 * （可能正好与上一行在 x 轴上重合），补一段右侧外边距撑回整行宽即可。
 */
const rows = computed(() => {
    const result: { items: Badge[]; nominal: number }[] = [];
    const wide = columns.value;
    const narrow = Math.max(1, columns.value - 1);
    for (let index = 0, isWide = true; index < badges.length; isWide = !isWide) {
        const size = isWide ? wide : narrow;
        result.push({ items: badges.slice(index, index + size), nominal: size });
        index += size;
    }
    return result;
});

/**
 * 高光：一团跟着指针走的柔光，铺在所有格面之下，于是只能从缝隙里露出来。
 * 位置直接写进 `transform`，靠 `will-change-transform` 把重绘留在合成层里；不加过渡，否则光会拖在指针后面。
 * 离开蜂窝时只收不透明度、保留最后位置——位置一并清掉的话，元素会弹回左上角再淡出。
 */
const spot = ref<{ x: number; y: number } | null>(null);
const spotVisible = ref(false);

function trackPointer(event: PointerEvent) {
    const rect = container.value?.getBoundingClientRect();
    if (!rect) return;
    spot.value = { x: event.clientX - rect.left, y: event.clientY - rect.top };
    spotVisible.value = true;
}

const spotStyle = computed(() =>
    spot.value ? { transform: `translate3d(${spot.value.x}px, ${spot.value.y}px, 0) translate(-50%, -50%)` } : {},
);
</script>

<template>
    <div
        ref="container"
        class="Honeycomb relative isolate flex w-full flex-col items-center"
        :style="{ '--hex-w': `${PITCH}px` }"
        @pointerenter="trackPointer"
        @pointerleave="spotVisible = false"
        @pointermove="trackPointer"
    >
        <div
            aria-hidden="true"
            :class="spotVisible ? 'opacity-100' : 'opacity-0'"
            :style="spotStyle"
            class="HexSpot bg-starlight-400/45 dark:bg-aurora-300/32 pointer-events-none absolute top-0 left-0 z-0 size-[8rem] rounded-full blur-3xl transition-opacity duration-300 ease-out will-change-transform"
        />
        <div
            v-for="(row, rowIndex) in rows"
            :key="rowIndex"
            :style="{ marginRight: `${(row.nominal - row.items.length) * PITCH}px` }"
            class="HexRow flex"
        >
            <div
                v-for="badge in row.items"
                :key="badge.logo"
                :aria-label="badge.text"
                :title="badge.text"
                class="HexCell relative"
                role="img"
            >
                <span aria-hidden="true" class="HexRing bg-starlight-500/20 dark:bg-white/10">
                    <span aria-hidden="true" class="HexFill" />
                </span>
                <Icon aria-hidden="true" class="HexIcon" :icon="badge.logo" />
            </div>
        </div>
    </div>
</template>

<style scoped>
/* 正六边形（尖顶）宽高比 1 : 2/√3 ≈ 1 : 1.1547。
   同一行内相邻两格共用左右竖边，因此行宽就是「格数 × 格宽」；
   上一行的下顶点正好落在下一行两格之间的凹口里，行距取 3/4 格高，即行间负外边距 -1/4 格高。 */
.Honeycomb {
    --hex-h: calc(var(--hex-w) * 1.1547);
}

.HexRow:not(:first-child) {
    margin-top: calc(var(--hex-h) * -0.25);
}

.HexCell {
    width: var(--hex-w);
    height: var(--hex-h);
}

/* 六边形边框：剪裁轮廓吃不到 `border`，于是叠两层同形六边形——外层铺边框色、内层缩进约 1px 铺底色。
   外层的 0.9 缩放顺带让相邻格子留出缝隙（约合格宽的 1/10）。 */
.HexRing,
.HexFill {
    position: absolute;
    inset: 0;
    clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
}

.HexRing {
    z-index: 1;
    transform: scale(0.9);
}

.HexFill {
    transform: scale(0.975);
    background: var(--color-paper-50);
}

/* 深色格面 = GlassCard 的底色压在不透明的夜底色上：观感一致，但 white/5 只有 5% 不透明度，
   挡不住底下跟着指针走的那团光（backdrop-blur 只会把光糊开，并不遮住它）。 */
.dark .HexFill {
    background: color-mix(in oklab, white 5%, var(--color-night-950));
}

.HexIcon {
    position: absolute;
    inset: 0;
    z-index: 2;
    width: calc(var(--hex-w) * 0.5);
    height: calc(var(--hex-w) * 0.5);
    margin: auto;
}
</style>
