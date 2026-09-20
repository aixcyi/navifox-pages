<script lang="ts" setup>
import { Icon } from '@iconify/vue/offline';
import { SkillsBadge } from '@navifox/constants';
import type { Badge } from '@navifox/types';
import { useWindowSize } from '@vueuse/core';
import { computed, ref } from 'vue';

const badges: Badge[] = [
    SkillsBadge.Python,
    SkillsBadge.Django,
    SkillsBadge.DjangoRESTFramework,
    SkillsBadge.FastAPI,
    SkillsBadge.Celery,
    SkillsBadge.NumPy,
    SkillsBadge.Pandas,
    SkillsBadge.Kotlin,
    SkillsBadge.JavaScript,
    SkillsBadge.TypeScript,
    SkillsBadge.TailwindCSS,
    SkillsBadge.VitePress,
    SkillsBadge.Vue,
    SkillsBadge.Vite,
    SkillsBadge.Npm,
    SkillsBadge.Pnpm,
    SkillsBadge.WebCSS,
    SkillsBadge.Gsap,
    SkillsBadge.Golang,
    SkillsBadge.Java,
    SkillsBadge.Bash,
    SkillsBadge.Cmd,
    SkillsBadge.Powershell,
    SkillsBadge.Git,
    SkillsBadge.GitHubAction,
    SkillsBadge.Apifox,
    SkillsBadge.Grafana,
    SkillsBadge.PostgreSQL,
    SkillsBadge.MySQL,
    SkillsBadge.Redis,
    SkillsBadge.SQLite,
    SkillsBadge.PyCharm,
    SkillsBadge.IntelliJ,
    SkillsBadge.WebStorm,
    SkillsBadge.DataGrip,
    SkillsBadge.Goland,
    SkillsBadge.VisualStudioCode,
    SkillsBadge.VisualStudio,
    SkillsBadge.Ubuntu,
    SkillsBadge.Kali,
    SkillsBadge.Firefox,
    SkillsBadge.Chrome,
    SkillsBadge.Markdown,
].sort((a, b) => a.text!.localeCompare(b.text!));

/**
 * 格距分档：≥768px 用 96，768～640px 用 80，<640px 用 64。
 * 图标尺寸是格宽的一半（`calc(var(--hex-w) * 0.5)`），所以图标、六边形、缝隙、行距一起缩。
 */
const PITCH_TIERS: { min: number; pitch: number }[] = [
    { min: 768, pitch: 96 },
    { min: 640, pitch: 80 },
    { min: 0, pitch: 64 },
];

/** 图标带最宽与时间线正文（`max-w-3xl` = 48rem = 768px）同宽，换算成格数。 */
const ICON_BAND = 768;

const container = ref<HTMLElement | null>(null);

/**
 * 排版视口宽度：`innerWidth` 与 `vw` 都把竖向滚动条算在内，而页面内容是排在去掉滚动条的宽度里的，
 * 拿含滚动条的宽度去算，两侧会各偏出半条滚动条。
 */
const { width: windowWidth } = useWindowSize();

const viewportWidth = computed(() => windowWidth.value - (window.innerWidth - document.documentElement.clientWidth));

const pitch = computed(() => PITCH_TIERS.find((tier) => viewportWidth.value >= tier.min)!.pitch);

/** 一行铺几格：按视口宽度算，并在两侧各多铺一格，宁可溢出视口也不让蜂窝在两侧留空缺。 */
const columns = computed(() => Math.max(2, Math.ceil(viewportWidth.value / pitch.value) + 2));

/**
 * 蜂窝排布：整行铺满 `columns` 格、窄行 `columns - 1` 格交替（窄行居中后自然错开半格）。
 * 图标只占中间那一带，上下各一行、左右两侧都是空蜂窝；溢出视口的部分由外层裁剪，这里不管。
 *
 * 图标带的格数要**保证两侧各留得下半个空格子**：相邻两行的格子错开半格，
 * 所以两行的图标带边缘也差半格，窄的那侧就是最坏情况。按「格子中心对齐视口中心」推下来，
 * 取 `floor(视口 / 格距) - 2` 时，最坏一侧刚好留半个格子（另一侧留一格）；再与时间线正文取小。
 */
const rows = computed(() => {
    const step = pitch.value;
    const wide = columns.value;
    const narrow = Math.max(1, columns.value - 1);
    const band = Math.max(1, Math.min(Math.floor(ICON_BAND / step), Math.floor(viewportWidth.value / step) - 2));
    const contentRows = Math.ceil(badges.length / band);
    const result: { cells: (Badge | null)[]; nominal: number }[] = [];
    let cursor = 0;
    for (let row = 0; row <= contentRows + 1; row++) {
        const nominal = row % 2 === 0 ? wide : narrow;
        const cells: (Badge | null)[] = Array.from({ length: nominal }, () => null);
        if (row > 0 && row <= contentRows) {
            const start = Math.floor((nominal - band) / 2);
            for (let column = 0; column < band && cursor < badges.length; column++) {
                cells[start + column] = badges[cursor++] ?? null;
            }
        }
        result.push({ cells, nominal });
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
        class="Honeycomb relative isolate flex flex-col items-center"
        :style="{ '--hex-w': `${pitch}px`, width: `${columns * pitch}px` }"
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
        <div v-for="(row, rowIndex) in rows" :key="rowIndex" class="HexRow flex">
            <div
                v-for="(badge, cellIndex) in row.cells"
                :key="cellIndex"
                :aria-hidden="badge ? undefined : 'true'"
                :aria-label="badge?.text"
                :role="badge ? 'img' : undefined"
                :title="badge?.text"
                class="HexCell relative"
            >
                <span aria-hidden="true" class="HexRing bg-starlight-500/20 dark:bg-white/10">
                    <span aria-hidden="true" class="HexFill" />
                </span>
                <Icon v-if="badge" aria-hidden="true" class="HexIcon" :icon="badge.logo" />
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

/* 行间咬合：相邻两行之间才拉负外边距。
   用 `+` 而不是 `:not(:first-child)`——容器里第一个孩子是高光那层，不是第一行。 */
.HexRow + .HexRow {
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
