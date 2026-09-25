<script lang="ts" setup>
import { useWindowSize } from '@vueuse/core';
import { computed, ref, type Component } from 'vue';
import IconMarkdown from '~icons/catppuccin/markdown';
import IconCmd from '~icons/codicon/terminal-cmd';
import IconBash from '~icons/devicon-plain/bash';
import IconDjangoRESTFramework from '~icons/devicon/djangorest-wordmark';
import IconGit from '~icons/devicon/git';
import IconGitHubAction from '~icons/devicon/githubactions';
import IconGolang from '~icons/devicon/go';
import IconGrafana from '~icons/devicon/grafana';
import IconKali from '~icons/devicon/kalilinux';
import IconKotlin from '~icons/devicon/kotlin';
import IconMySQL from '~icons/devicon/mysql';
import IconNpm from '~icons/devicon/npm';
import IconPnpm from '~icons/devicon/pnpm';
import IconPostgreSQL from '~icons/devicon/postgresql';
import IconPowershell from '~icons/devicon/powershell';
import IconRedis from '~icons/devicon/redis';
import IconSQLite from '~icons/devicon/sqlite';
import IconTailwindCSS from '~icons/devicon/tailwindcss';
import IconVisualStudio from '~icons/devicon/visualstudio';
import IconVite from '~icons/devicon/vitejs';
import IconVscode from '~icons/devicon/vscode';
import IconVue from '~icons/devicon/vuejs';
import IconChrome from '~icons/logos/chrome';
import IconCss from '~icons/logos/css';
import IconDataGrip from '~icons/logos/datagrip';
import IconFastAPI from '~icons/logos/fastapi-icon';
import IconFirefox from '~icons/logos/firefox';
import IconGoland from '~icons/logos/goland';
import IconIntelliJ from '~icons/logos/intellij-idea';
import IconJava from '~icons/logos/java';
import IconNumPy from '~icons/logos/numpy';
import IconPandas from '~icons/logos/pandas-icon';
import IconPyCharm from '~icons/logos/pycharm';
import IconPython from '~icons/logos/python';
import IconUbuntu from '~icons/logos/ubuntu';
import IconWebStorm from '~icons/logos/webstorm';
import IconApifox from '~icons/simple-icons/apifox';
import IconCelery from '~icons/simple-icons/celery';
import IconGsap from '~icons/simple-icons/gsap';
import IconVitePress from '~icons/simple-icons/vitepress';
import IconDjango from '~icons/skill-icons/django';
import IconJavaScript from '~icons/skill-icons/javascript';
import IconTypeScript from '~icons/skill-icons/typescript';

/**
 * 蜂窝里的一格。
 *
 * - `logo`：构建期编译进来的图标组件；
 * - `text`：悬浮提示与排序用的文案；
 * - `scale`：该图标相对格宽（`--hex-w`）的**高度倍率**，逐枚由「让墨水的长边恰好等于半格宽」
 *   反推而来。图稿的 viewBox 比例与四周留白各不相同，只限制单个维度（或同时限制成方盒）都会
 *   让它们看起来大小不一——留白多的显小、长条形的显窄；归一**墨水**尺寸才能让 43 格视觉等重。
 *   宽度不写死，交给 `width: auto` 按 viewBox 的固有比例推。
 */
interface HoneycombBadge {
    logo: Component;
    text: string;
    scale: number;
}

const badges: HoneycombBadge[] = [
    { logo: IconPython, text: 'Python', scale: 0.499 },
    { logo: IconDjango, text: 'Django', scale: 0.5 },
    { logo: IconDjangoRESTFramework, text: 'Django REST Framework', scale: 0.549 },
    { logo: IconFastAPI, text: 'FastAPI', scale: 0.5 },
    { logo: IconCelery, text: 'Celery', scale: 0.45 },
    { logo: IconNumPy, text: 'NumPy', scale: 0.501 },
    { logo: IconPandas, text: 'Pandas', scale: 0.501 },
    { logo: IconKotlin, text: 'Kotlin', scale: 0.5 },
    { logo: IconJavaScript, text: 'JavaScript', scale: 0.5 },
    { logo: IconTypeScript, text: 'TypeScript', scale: 0.5 },
    { logo: IconTailwindCSS, text: 'Tailwind CSS', scale: 0.5 },
    { logo: IconVitePress, text: 'VitePress', scale: 0.5 },
    { logo: IconVue, text: 'Vue', scale: 0.5 },
    { logo: IconVite, text: 'Vite', scale: 0.5 },
    { logo: IconNpm, text: 'NPM', scale: 0.45 },
    { logo: IconPnpm, text: 'PNPM', scale: 0.45 },
    { logo: IconCss, text: 'CSS', scale: 0.5 },
    { logo: IconGsap, text: 'GSAP', scale: 0.5 },
    { logo: IconGolang, text: 'Golang', scale: 0.533 },
    { logo: IconJava, text: 'Java', scale: 0.501 },
    { logo: IconBash, text: 'bash', scale: 0.5 },
    { logo: IconCmd, text: 'cmd', scale: 0.541 },
    { logo: IconPowershell, text: 'Powershell', scale: 0.516 },
    { logo: IconGit, text: 'git', scale: 0.507 },
    { logo: IconGitHubAction, text: 'GitHub Action', scale: 0.5 },
    { logo: IconApifox, text: 'Apifox', scale: 0.5 },
    { logo: IconGrafana, text: 'Grafana', scale: 0.5 },
    { logo: IconPostgreSQL, text: 'PostgreSQL', scale: 0.522 },
    { logo: IconMySQL, text: 'MySQL', scale: 0.501 },
    { logo: IconRedis, text: 'Redis', scale: 0.51 },
    { logo: IconSQLite, text: 'SQLite', scale: 0.5 },
    { logo: IconPyCharm, text: 'PyCharm', scale: 0.5 },
    { logo: IconIntelliJ, text: 'IntelliJ', scale: 0.5 },
    { logo: IconWebStorm, text: 'WebStorm', scale: 0.5 },
    { logo: IconDataGrip, text: 'DataGrip', scale: 0.5 },
    { logo: IconGoland, text: 'Goland', scale: 0.5 },
    { logo: IconVscode, text: 'Visual Studio Code', scale: 0.5 },
    { logo: IconVisualStudio, text: 'Visual Studio', scale: 0.5 },
    { logo: IconUbuntu, text: 'Ubuntu', scale: 0.501 },
    { logo: IconKali, text: 'Kali', scale: 0.6 },
    { logo: IconFirefox, text: 'Firefox', scale: 0.501 },
    { logo: IconChrome, text: 'Chrome', scale: 0.5 },
    { logo: IconMarkdown, text: 'Markdown', scale: 0.533 },
].sort((a, b) => a.text.localeCompare(b.text));

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
    const result: { cells: (HoneycombBadge | null)[]; nominal: number }[] = [];
    let cursor = 0;
    for (let row = 0; row <= contentRows + 1; row++) {
        const nominal = row % 2 === 0 ? wide : narrow;
        const cells: (HoneycombBadge | null)[] = Array.from({ length: nominal }, () => null);
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
                <component
                    :is="badge.logo"
                    v-if="badge"
                    aria-hidden="true"
                    class="HexIcon"
                    :style="{ height: `calc(var(--hex-w) * ${badge.scale})` }"
                />
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

/* 每格图标的行为：高度由内联样式按该枚图标的 `scale` 给出，宽度交给 `width: auto`
   按 viewBox 的固有比例推——这样不同比例、不同留白的图稿墨水长边都等于半格宽，视觉等重。 */
.HexIcon {
    position: absolute;
    inset: 0;
    z-index: 2;
    width: auto;
    margin: auto;
}
</style>
