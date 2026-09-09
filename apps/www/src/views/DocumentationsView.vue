<script lang="ts" setup>
import { Icon } from '@iconify/vue';
import { foxeryGuild, navifoxDocs, projects, sinceYear } from '@navifox/constants';
import { useDark, useWindowSize, watchDebounced } from '@vueuse/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import QRCode from 'qrcode';
import { onMounted, onUnmounted, ref, watch } from 'vue';

import Navbar from '#/components/Navbar.vue';

gsap.registerPlugin(ScrollTrigger);

const isDark = useDark();

/**
 * 罗狐会馆群聊二维码：浅色单元保持透明（透出面板底色），
 * 墨色（含三个定位点）采用盒面圆角外框带颜色（浅色 paper-300／深色 night-700）。
 */
const qrcode = ref('');
watch(
    isDark,
    () => {
        QRCode.toDataURL(foxeryGuild.link, {
            width: 512,
            color: {
                light: '#FFFFFF00',
                dark: isDark.value ? '#3a4a72' : '#d8ccb6',
            },
        }).then((url) => (qrcode.value = url));
    },
    { immediate: true },
);

/** 面板列表：由 initializePanels 收集，供吸附点重算使用。 */
let panels: HTMLDivElement[] = [];

/** 吸附目标：各面板在文档流中的实际上沿（进度）。随布局刷新重算，不冻结初始化快照。 */
let snapPoints: number[] = [];

/** 越过末屏上沿（页脚自由滚动区）即解除吸附的进度阈值。 */
let freeFrom = 0;

/** 按当前布局重算吸附点：依次累计各面板高度即得流式上沿，不受钉住位移／滚动位置影响。 */
function measurePanels() {
    if (panels.length == 0) return;
    const scroller = document.scrollingElement ?? document.documentElement;
    const maxScroll = Math.max(1, scroller.scrollHeight - window.innerHeight);
    let top = 0;
    snapPoints = panels.map((panel) => {
        const progress = Math.min(1, Math.max(0, top / maxScroll));
        top += panel.offsetHeight;
        return progress;
    });
    freeFrom = snapPoints[snapPoints.length - 1] ?? 0;
}

/**
 * 面板逐屏钉住 + 滚动吸附（复刻 docs 站的 GSAP 翻滚交互）。
 * - 除最后一屏（月饼盒）外逐屏钉住：末屏保留在文档流中，让页脚随它自然滑出；
 * - 吸附点覆盖**全部**屏面的实际起始位（而非按整页均分），
 *   因此末屏同样满足“滚动过半自动吸附翻页”；
 * - 越过末屏上沿（页脚的自由滚动区）后解除吸附；
 * - 吸附点不冻结：ScrollTrigger 布局刷新（resize／旋转等）与窗口尺寸变化（vueuse 兜底）
 *   时都会按面板当前真实位置重算，缩放视口后依然对齐。
 */
function initializePanels() {
    panels = gsap.utils.toArray('.js-panel');
    if (panels.length < 2) return;

    panels.slice(0, -1).forEach((panel) => {
        ScrollTrigger.create({
            trigger: panel,
            start: 'top top',
            pin: true,
            pinSpacing: false,
        });
    });
    measurePanels();
    // ScrollTrigger 在窗口尺寸变化等场景会自动 refresh，这里让吸附点同步重算
    ScrollTrigger.addEventListener('refresh', measurePanels);
    ScrollTrigger.create({
        snap: {
            snapTo(value: number) {
                if (value >= freeFrom) return value;
                return gsap.utils.snap(snapPoints, value);
            },
            duration: { min: 0.1, max: 0.4 },
            ease: 'power1.inOut',
            delay: 0.1,
        },
    });
}

/** 封面“下滑”箭头提示：三支纵向排列，高亮波依次从上往下“流动”。 */
function initializeArrows() {
    const arrows = gsap.utils.toArray<HTMLElement>('.arrow-bounce');
    if (arrows.length == 0) return;
    gsap.set(arrows, { opacity: 0.35 });
    gsap.to(arrows, {
        keyframes: { y: [0, 6, 0], opacity: [0.35, 1, 0.35] },
        ease: 'sine.inOut',
        duration: 1.4,
        stagger: { each: 0.3, from: 'start' },
        repeat: -1,
    });
}

/** 盒面“包装参数”。 */
const boxStates: Record<string, string> = {
    产地: foxeryGuild.name,
    包装规格: `${projects.length} 个/盒`,
    生产日期: `${sinceYear} 年`,
    保质期: `${sinceYear + 1000} 年`,
};

/**
 * 项目文档多为 docs 站内的相对路径（由 Nginx 转发到 docs.navifox.net 下），
 * 移植到 www 后需补全 docs 子站域名，避免落到本域 404。
 */
function resolveDocLink(link: string) {
    return link.startsWith('/') ? navifoxDocs.link + link : link;
}

/** 窗口尺寸变化兜底：视口缩放后按面板当前实际位置重算吸附点（防抖，避免拖拽中频繁计算）。 */
const { width, height } = useWindowSize();
watchDebounced(
    [width, height],
    () => {
        if (panels.length > 0) measurePanels();
    },
    { debounce: 150 },
);

onMounted(() => {
    setTimeout(initializePanels, 100);
    setTimeout(initializeArrows, 100);
});

onUnmounted(() => {
    ScrollTrigger.removeEventListener('refresh', measurePanels);
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
});
</script>

<template>
    <!-- 整页为“月饼盒”翻页舞台：底色随浅色/深色主题切换（纸面 ↔ 夜色） -->
    <div class="bg-paper-50 dark:bg-night-950 relative min-h-dvh overflow-x-clip text-stone-600 dark:text-slate-300">
        <Navbar />

        <!-- 盒盖 -->
        <section
            class="js-panel bg-paper-50 dark:bg-night-950 relative flex h-screen w-full flex-col items-center justify-center overflow-hidden"
        >
            <div
                aria-hidden="true"
                class="pointer-events-none absolute inset-0"
                style="
                    background:
                        radial-gradient(ellipse 62% 46% at 50% 16%, rgb(111 106 230 / 0.12), transparent 62%),
                        radial-gradient(ellipse 55% 42% at 82% 78%, rgb(216 164 87 / 0.1), transparent 60%);
                "
            />
            <div class="relative z-10 flex flex-col items-center gap-6 px-6 text-center">
                <p
                    class="text-starlight-600 dark:text-starlight-300 font-mono text-[0.72rem] tracking-[0.28em] uppercase sm:text-sm"
                    v-html="'Navifox · Documentation'"
                />
                <h1
                    class="text-night-900 text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl dark:text-white"
                    v-html="'文档月饼盒'"
                />
                <div class="from-starlight-500 to-aurora-500 h-1 w-24 rounded-full bg-gradient-to-r" />
                <p class="max-w-xl text-base leading-relaxed text-stone-500 sm:text-lg dark:text-slate-300">
                    · {{ navifoxDocs.description }} ·
                </p>
            </div>
            <div
                aria-hidden="true"
                class="text-starlight-600 dark:text-starlight-300 absolute bottom-14 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1.5"
            >
                <Icon v-for="n in 3" :key="n" class="arrow-bounce" height="26" icon="bytesize:chevron-bottom" />
            </div>
        </section>

        <!-- 盒中：各个项目 -->
        <section
            v-for="(project, index) in projects"
            :key="project.name"
            :class="[
                index % 2 ? 'bg-paper-100 dark:bg-night-900' : 'dark:bg-night-850 bg-white',
                'js-panel relative flex h-screen w-full items-center justify-center overflow-hidden',
            ]"
        >
            <Icon
                v-if="project.releaseType"
                :icon="project.releaseType"
                aria-hidden="true"
                class="text-night-900 pointer-events-none absolute bottom-6 left-6 opacity-[0.12] select-none md:bottom-14 md:left-14 dark:text-white"
                style="--size: calc(min(100vh, 100vw) / 3); width: var(--size); height: var(--size)"
                width="unset"
                height="unset"
            />
            <div class="relative z-10 flex w-full max-w-3xl flex-col items-center gap-7 px-6 py-24 text-center">
                <p
                    class="text-starlight-600/80 dark:text-starlight-300/80 font-mono text-xs tracking-[0.28em] uppercase"
                    v-html="`Project · ${String(index + 1).padStart(2, '0')}`"
                />
                <h2 class="text-night-900 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl dark:text-white">
                    {{ project.name }}
                </h2>
                <div class="dark:text-starlight-300/80 flex items-center gap-6 text-stone-500">
                    <template v-for="social in project.socials" :key="social.link">
                        <a
                            v-if="social.logo"
                            :href="social.link"
                            :title="social.link"
                            class="hover:text-starlight-600 transition-all duration-200 hover:scale-110 dark:hover:text-white"
                            target="_blank"
                        >
                            <Icon :icon="social.logo" height="28" />
                        </a>
                    </template>
                </div>
                <p class="max-w-xl indent-8 text-base leading-relaxed sm:text-lg" v-html="project.description" />
                <template v-if="project.documentation">
                    <a
                        :href="resolveDocLink(project.documentation)"
                        class="from-starlight-500 to-aurora-500 shadow-starlight-600/30 inline-flex items-center gap-2 rounded-full bg-gradient-to-r px-7 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:brightness-110"
                        target="_blank"
                    >
                        <span v-html="'浏览文档'" />
                        <Icon class="size-4" icon="material-symbols:arrow-outward" />
                    </a>
                </template>
            </div>
        </section>

        <!-- 盒底：包装参数 -->
        <section
            class="js-panel bg-paper-50 dark:bg-night-950 relative flex h-screen w-full items-center justify-center overflow-hidden"
        >
            <div class="MooncakeRect bg-paper-300 dark:bg-night-700 p-1.5 select-none">
                <div
                    class="MooncakeRect bg-paper-50 dark:bg-night-950 flex flex-col items-center gap-8 p-10 sm:flex-row sm:p-14"
                >
                    <dl class="min-w-0 space-y-1">
                        <div
                            v-for="(value, label) in boxStates"
                            :key="label"
                            class="border-starlight-500/30 flex items-baseline gap-8 border-b border-dashed pb-1 last:border-b-0 dark:border-white/10"
                        >
                            <dt
                                class="w-28 shrink-0 text-justify text-nowrap text-stone-500 dark:text-slate-400"
                                style="text-align-last: justify"
                                v-html="label"
                            />
                            <dd class="font-medium text-nowrap text-stone-800 dark:text-slate-100" v-html="value" />
                        </div>
                    </dl>
                    <div class="flex shrink-0 flex-col items-center gap-4">
                        <img
                            v-if="qrcode"
                            :src="qrcode"
                            :alt="`${foxeryGuild.name}群聊二维码`"
                            class="size-36 select-none sm:size-44"
                            draggable="false"
                        />
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<style scoped>
/* 月饼盒的圆角裁切外框（沿用 docs 站的 MooncakeRect 遮罩） */
.MooncakeRect {
    mask:
        radial-gradient(circle at calc(100% + 10px) calc(100% + 10px), transparent 0, transparent 24px, #2179f5 25px),
        radial-gradient(circle at -10px -10px, transparent 0, transparent 24px, #2179f5 25px),
        radial-gradient(circle at calc(100% + 10px) -10px, transparent 0, transparent 24px, #2179f5 25px),
        radial-gradient(circle at -10px calc(100% + 10px), transparent 0, transparent 24px, #2179f5 25px);
    mask-repeat: no-repeat;
    mask-position:
        right bottom,
        left top,
        right top,
        left bottom;
    mask-size: 70% 70%;
}
</style>
