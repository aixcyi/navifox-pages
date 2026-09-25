<script lang="ts" setup>
import { useElementSize } from '@vueuse/core';
import { computed, reactive, ref, useTemplateRef, watch } from 'vue';
import IconLocation from '~icons/zondicons/location';

import Navbar from '#/components/Navbar.vue';
import SectionHeader from '#/components/SectionHeader.vue';

/** 画布相对视口的放大倍数：保证画布始终大于视口，两个方向都留出可拖拽的余量。 */
const CANVAS_SCALE = 1.6;

/** 视口尚未测量时的兜底尺寸（px），避免首帧算出 0 尺寸的画布。 */
const FALLBACK_WIDTH = 1280;
const FALLBACK_HEIGHT = 720;

interface Spot {
    /** 地点名。 */
    name: string;

    /** 一句话备注。 */
    note: string;

    /** 画布内横坐标百分比（0～100）。 */
    x: number;

    /** 画布内纵坐标百分比（0～100）。 */
    y: number;
}

/** 占位地点：用百分比定位，画布尺寸变化时不必改动数据。 */
const spots: Spot[] = [
    { name: '成都', note: '待归处', x: 40, y: 60 },
    { name: '重庆', note: '两江夜色', x: 47, y: 63 },
    { name: '西安', note: '城墙之上', x: 44, y: 45 },
    { name: '北京', note: '初雪未逢', x: 60, y: 30 },
    { name: '上海', note: '台风过境', x: 72, y: 55 },
    { name: '杭州', note: '梅雨不停', x: 69, y: 60 },
    { name: '广州', note: '落脚之地', x: 62, y: 76 },
    { name: '昆明', note: '四季如春', x: 38, y: 70 },
    { name: '拉萨', note: '还没去过', x: 22, y: 52 },
    { name: '三亚', note: '还没去过', x: 58, y: 88 },
];

const viewport = useTemplateRef<HTMLDivElement>('viewport');
const { width, height } = useElementSize(viewport);

/** 画布尺寸：跟随视口放大，从而始终有可拖拽的余量。 */
const canvasWidth = computed(() => Math.round(Math.max(width.value, FALLBACK_WIDTH) * CANVAS_SCALE));
const canvasHeight = computed(() => Math.round(Math.max(height.value, FALLBACK_HEIGHT) * CANVAS_SCALE));

/** 画布相对视口中心的位移，`0` 即居中。 */
const offset = reactive({ x: 0, y: 0 });

/** 拖拽位移上限：恒为正，画布总比视口大。 */
const limitX = computed(() => Math.max(0, (canvasWidth.value - width.value) / 2));
const limitY = computed(() => Math.max(0, (canvasHeight.value - height.value) / 2));

const isDragging = ref(false);

/** 一次拖拽的起点：指针位置与当时的位移，用于换算增量。 */
let dragOrigin = { pointerX: 0, pointerY: 0, offsetX: 0, offsetY: 0 };

/** 把位移限制在 ±limit 内。 */
function clamp(value: number, limit: number): number {
    return Math.min(limit, Math.max(-limit, value));
}

/** 视口尺寸变化后重新夹取位移，避免画布被拖到尽头后留下空白。 */
watch([limitX, limitY], () => {
    offset.x = clamp(offset.x, limitX.value);
    offset.y = clamp(offset.y, limitY.value);
});

function onPointerDown(event: PointerEvent): void {
    isDragging.value = true;
    dragOrigin = { pointerX: event.clientX, pointerY: event.clientY, offsetX: offset.x, offsetY: offset.y };
    (event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
}

function onPointerMove(event: PointerEvent): void {
    if (!isDragging.value) return;
    offset.x = clamp(dragOrigin.offsetX + (event.clientX - dragOrigin.pointerX), limitX.value);
    offset.y = clamp(dragOrigin.offsetY + (event.clientY - dragOrigin.pointerY), limitY.value);
}

function onPointerUp(event: PointerEvent): void {
    if (!isDragging.value) return;
    isDragging.value = false;
    (event.currentTarget as HTMLElement).releasePointerCapture(event.pointerId);
}

/** 复位到画布中心。 */
function resetView(): void {
    offset.x = 0;
    offset.y = 0;
}
</script>

<template>
    <!-- 全屏地图位：暂无可直接使用的地图组件，先用一块可拖拽的示意画布铺满整屏。
         小标题只是浮在画布上的注释，始终不接收指针事件；鼠标移到画布上时整块淡出，让出视线。 -->
    <div class="bg-paper-100 dark:bg-night-900 relative">
        <Navbar />
        <div
            ref="viewport"
            :class="isDragging ? 'cursor-grabbing' : 'cursor-grab'"
            class="relative h-dvh w-full touch-none overflow-hidden select-none"
            @pointerdown="onPointerDown"
            @pointermove="onPointerMove"
            @pointerup="onPointerUp"
            @pointercancel="onPointerUp"
        >
            <div
                class="dark:from-night-800 dark:via-night-900 dark:to-night-850 from-moss-300/25 via-paper-100 to-starlight-200/30 absolute top-1/2 left-1/2 overflow-hidden bg-gradient-to-br"
                :style="{
                    width: `${canvasWidth}px`,
                    height: `${canvasHeight}px`,
                    transform: `translate(calc(-50% + ${offset.x}px), calc(-50% + ${offset.y}px))`,
                }"
            >
                <!-- 示意陆地：几团模糊色块，仅作视觉填充 -->
                <div
                    class="bg-moss-400/25 dark:bg-moss-500/15 absolute top-[10%] left-[6%] size-[40%] rounded-[45%] blur-3xl"
                />
                <div
                    class="bg-starlight-300/40 dark:bg-starlight-500/10 absolute right-[4%] bottom-[8%] size-[36%] rounded-[48%] blur-3xl"
                />
                <div
                    class="bg-aurora-300/25 dark:bg-aurora-500/10 absolute top-[42%] left-[48%] size-[28%] rounded-[42%] blur-3xl"
                />
                <!-- 点阵网格 -->
                <div
                    class="absolute inset-0 [background-image:radial-gradient(circle_at_center,rgba(120,113,108,0.35)_1.5px,transparent_1.5px)] [background-size:32px_32px] opacity-40 dark:[background-image:radial-gradient(circle_at_center,rgba(255,255,255,0.25)_1.5px,transparent_1.5px)]"
                />

                <!-- 地点标记 -->
                <div
                    v-for="spot in spots"
                    :key="spot.name"
                    class="absolute flex -translate-x-1/2 -translate-y-full flex-col items-center gap-1"
                    :style="{ left: `${spot.x}%`, top: `${spot.y}%` }"
                >
                    <span
                        v-html="`${spot.name} · ${spot.note}`"
                        class="border-starlight-500/20 text-night-900 rounded-full border bg-white/80 px-2 py-0.5 text-xs whitespace-nowrap backdrop-blur-sm dark:border-white/10 dark:bg-white/10 dark:text-slate-200"
                    />
                    <IconLocation class="text-starlight-600 dark:text-starlight-400 size-6.5" />
                </div>
            </div>

            <!-- 小标题：外层沿用与其它视图相同的 MaxContainer + mt-48，上边距据此与它们保持一致；
                 整层不吃指针事件，只有标题自己开着，因此 hover 检测对象仍是标题自身。
                 拖拽期间无条件隐藏：鼠标一旦拖离标题，:hover 就不再成立，不额外兜住会让标题在拖拽中重新浮现。 -->
            <div class="pointer-events-none absolute inset-x-0 top-0 z-10">
                <div class="MaxContainer">
                    <SectionHeader
                        :class="isDragging ? 'opacity-0' : 'hover:opacity-0'"
                        class="pointer-events-auto mt-48 transition-opacity duration-300"
                        centered
                        eyebrow="Navifox · Map"
                        level="h1"
                        title="游地简"
                    >
                        游地随简，寻壑经丘<br />
                    </SectionHeader>
                </div>
            </div>

            <!-- 操作提示与复位按钮 -->
            <span
                :class="isDragging ? 'opacity-0' : 'opacity-100'"
                class="bg-paper-50/85 dark:bg-night-900/80 pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full px-4 py-1.5 text-xs text-stone-500 backdrop-blur-sm transition-opacity duration-300 dark:text-slate-400"
            >
                按住画布拖拽浏览
            </span>
            <button
                type="button"
                class="border-starlight-500/25 bg-paper-50/85 dark:bg-night-900/80 hover:border-starlight-500/60 hover:text-starlight-600 dark:hover:text-starlight-300 absolute top-20 right-6 z-20 cursor-pointer rounded-full border px-4 py-1.5 text-xs text-stone-600 backdrop-blur-sm transition-colors duration-200 dark:border-white/10 dark:text-slate-300"
                title="回到画布中心"
                @click="resetView"
                @pointerdown.stop
            >
                复位
            </button>
        </div>
    </div>
</template>
