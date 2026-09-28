<script lang="ts" setup>
import { navifoxHome } from '@navifox/constants';
import { FluentEmojiFox } from '@navifox/ui';
import { useDark, useMediaQuery, useToggle } from '@vueuse/core';
import {
    DrawerContent,
    DrawerDescription,
    DrawerHandle,
    DrawerOverlay,
    DrawerPortal,
    DrawerRoot,
    DrawerTitle,
    NavigationMenuLink,
    NavigationMenuItem,
    NavigationMenuList,
    NavigationMenuRoot,
    NavigationMenuViewport,
} from 'reka-ui';
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import IconMenu from '~icons/lineicons/menu';
import IconDarkMode from '~icons/material-symbols/dark-mode';
import IconLightMode from '~icons/material-symbols/light-mode';

const props = defineProps<{ cover?: boolean }>();

const isDark = useDark();
const route = useRoute();
const router = useRouter();
const scrolled = ref(false);
/** 桌面端 NavigationMenu 的当前展开分组（当前没有分组，恒为空串）。 */
const navMenuValue = ref('');
/** 移动端底部抽屉是否展开。 */
const drawerOpen = ref(false);
const toggleDark = useToggle(isDark);

/** 是否处于移动端断点（与汉堡按钮的 md 断点一致）。 */
const isMobile = useMediaQuery('(max-width: 767px)');

/** 根节点引用，用于量取导航栏自身的底边位置。 */
const navRoot = ref<HTMLElement>();

/**
 * `scrolled` 表示导航栏底边已经触到页面内容区顶边。
 *
 * 首页首屏是壁纸，只有内容区真正顶上来时才该换成玻璃胶囊：壁纸是固定背景，
 * 导航栏整段悬浮在它上面时都属于同一块暗表面，只滚一点点就切换会很突兀。
 * 所以判据不是滚了多少像素，而是两条边是否相遇；导航高度取实测值，
 * 避免把 70px 这类数字写死。
 *
 * 内容区取首个 `.Starry`（首页正文那块）：它前面的首屏 hero 用的是 `sticky top-0`，
 * 按「第一个非 fixed 子元素」去找会命中 hero，接触点会退化成 70px，等于没改。
 */
function onScroll() {
    const nav = navRoot.value;
    const content = document.querySelector('.Starry');
    if (!nav || !content) return;
    // 内容区顶边的文档坐标。直接拿 getBoundingClientRect().top 会随滚动一起变小，
    // 把它当阈值就等于「滚到一半就算接触」，必须先换算回文档坐标。
    const contentTop = content.getBoundingClientRect().top + window.scrollY;
    scrolled.value = window.scrollY + nav.getBoundingClientRect().height >= contentTop;
}

/** 导航当前是否处于「暗表面」（照片遮罩／夜色玻璃），需要白色系文字。 */
const onDarkSurface = computed(() => (props.cover ? !scrolled.value || isDark.value : isDark.value));

/** 导航条各入口的基础样式（胶囊按钮）。 */
const baseItemClass =
    'cursor-pointer rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap transition-all duration-200';

/** 非导航入口（主题切换、移动端汉堡）在暗/亮表面的通用文字与悬停态。 */
const surfaceClass = computed(() =>
    onDarkSurface.value
        ? 'hover:bg-starlight-500/15 hover:text-starlight-300 text-white/85'
        : 'hover:bg-starlight-500/10 hover:text-starlight-600 dark:hover:text-starlight-300 text-stone-600 dark:text-slate-300',
);

/** 导航条目样式（含当前页激活态）；`active` 表示该项即当前所在页面。 */
function navItemClass(active: boolean) {
    if (onDarkSurface.value) {
        return active
            ? 'bg-starlight-500/15 text-starlight-300'
            : 'text-white/85 hover:bg-starlight-500/15 hover:text-starlight-300';
    }
    return active
        ? 'bg-starlight-500/15 text-starlight-600 dark:text-starlight-300'
        : 'text-stone-600 hover:bg-starlight-500/10 hover:text-starlight-600 dark:text-slate-300 dark:hover:text-starlight-300';
}

/**
 * 移动端抽屉里的导航条目样式（整行可点，便于手指点按）。
 *
 * 胶囊本身可能是透明或夜色玻璃，抽屉则是独立卡片，所以直接用全站那套 starlight 金：
 * 激活态加一层低透明度品牌色底，与桌面导航的高亮保持同一套语言。
 */
function drawerItemClass(path: string) {
    const base = 'flex items-center rounded-xl px-4 py-3 text-base transition-colors duration-200';
    return route.path === path
        ? `${base} bg-starlight-500/15 text-starlight-600 font-semibold dark:text-starlight-300`
        : `${base} text-stone-600 hover:bg-starlight-500/10 dark:text-slate-300`;
}

/**
 * 胶囊的横向内衬。只有出现背景时才需要：没有底色的阶段留着它，
 * 只会把「路狐领航」从内容左缘又推出去 16px，而那一圈本来就没有可垫的东西。
 * 纵向内边距不参与切换，否则高度会跳变，滚动时观感很差。
 */
const pillPaddingX = computed(() => (props.cover && !scrolled.value ? 'px-0' : 'px-4 sm:px-5'));

const pillClass = computed(() => {
    if (props.cover) {
        // 首屏壁纸阶段：只有一层透明边框，不加底色、也不加背景模糊——
        // 模糊属于背景处理，留着同样会平白多出一层合成，视觉上却毫无作用。
        if (!scrolled.value) return 'border-transparent bg-transparent';
        // 浅色模式滚动后：晨光玻璃；深色模式滚动后：夜色玻璃
        return isDark.value
            ? 'backdrop-blur-xl border-white/15 bg-night-900/75 shadow-xl shadow-night-950/40'
            : 'backdrop-blur-xl border-blossom-300/25 bg-paper-50/85 shadow-xl shadow-starlight-600/10';
    }
    return 'backdrop-blur-xl border-starlight-500/25 bg-paper-50/85 shadow-lg shadow-night-950/10 dark:border-white/10 dark:bg-night-900/80 dark:shadow-night-950/40';
});

/**
 * reka-ui 把 viewport 的落点算成「相对于 NavigationMenuRoot 的内容盒」：横向以内容盒居中，
 * 纵向对齐触发器内容盒的顶边（触发器有内边距，所以展开面板要贴到胶囊内沿还需再往上偏移 8px）。
 * 但 viewport 是绝对定位元素，实际以最近定位祖先（胶囊本体的 relative）为基准；
 * 由于根节点的内容盒正好水平居中，横向只需补 -50%，纵向再用 `--nav-viewport-inset-y`
 * 把容器自身的上下留白（py-2 + border）折算掉即可。
 */
const viewportStyle = computed(() => ({
    transform:
        'translate(-50%, calc(var(--reka-navigation-menu-viewport-top, 0px) - var(--nav-viewport-inset-y, 0px) - 8px))',
}));

/** 显示在导航栏的路由项（由 router meta 的 isShowOnNavbar 控制，标题取 meta.title）。 */
const navItems = computed(() =>
    router.options.routes
        .filter((record) => Boolean(record.meta?.isShowOnNavbar))
        .map((record) => ({
            path: record.path,
            title: (record.meta?.title as string | undefined) ?? record.path,
        })),
);

onMounted(() => {
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
});

onBeforeUnmount(() => window.removeEventListener('scroll', onScroll));
</script>

<template>
    <!-- 左右留白交给 .NavbarContainer（与 .MaxContainer 同一套口径），这里只管上下 -->
    <nav ref="navRoot" class="fixed inset-x-0 top-0 z-40 pt-3 sm:pt-4">
        <div class="NavbarContainer">
            <div
                :class="[pillClass, pillPaddingX]"
                class="flex items-center justify-between gap-3 rounded-full border py-2 transition-all duration-300"
            >
                <RouterLink
                    to="/"
                    :title="navifoxHome.text"
                    class="group flex flex-nowrap items-center gap-2 select-none"
                >
                    <span
                        class="leading-none transition-transform duration-300 select-none group-hover:scale-110 group-hover:-rotate-6"
                    >
                        <FluentEmojiFox class="size-6" />
                    </span>
                    <span
                        class="text-lg font-bold tracking-tight whitespace-nowrap text-black dark:text-white"
                        :class="onDarkSurface ? 'text-white' : 'text-black'"
                        v-html="navifoxHome.text"
                    />
                </RouterLink>

                <!-- 桌面端导航：条目由路由 meta（isShowOnNavbar）生成。
                     reka-ui 的 NavigationMenu 负责列表语义（ul/li、aria-current）与方向键漫游；
                     条目目前都是整页跳转的链接，因此直接用 NavigationMenuLink，不设分组面板。 -->
                <NavigationMenuRoot v-model="navMenuValue" class="hidden md:block">
                    <NavigationMenuList class="flex items-center gap-1">
                        <NavigationMenuItem v-for="item in navItems" :key="item.path">
                            <NavigationMenuLink as-child :active="route.path === item.path">
                                <RouterLink
                                    :to="item.path"
                                    :class="[baseItemClass, navItemClass(route.path === item.path)]"
                                >
                                    {{ item.title }}
                                </RouterLink>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                    </NavigationMenuList>

                    <!-- 共享面板：分组化之后，reka-ui 会把各分组的 NavigationMenuContent
                         Teleport 到这里。当前条目都是整页跳转的链接、没有分组，所以它始终是空壳。
                         关闭态由 Presence 自己加 hidden 属性隐藏，不要再叠 display 工具类，
                         否则 viewport 量不到尺寸，reka-ui 就无法计算面板宽高与落点。
                         另外：面板卡片自带的出入场动画会把 transform 一并动画掉，
                         所以卡片不能直接放到 viewport 上，定位 transform 必须留在这一层。
                         `[--nav-viewport-inset-y]` 是纵向坐标折算量，需与胶囊 py-2 + border 一致。 -->
                    <NavigationMenuViewport
                        :style="viewportStyle"
                        align="start"
                        class="absolute top-0 left-0 z-50 box-content w-max border-none bg-transparent p-0 [--nav-viewport-inset-y:0.5625rem]"
                    />
                </NavigationMenuRoot>

                <div class="flex items-center gap-2">
                    <button
                        :class="[
                            surfaceClass,
                            'hidden size-9 cursor-pointer items-center justify-center rounded-full transition-colors duration-200 md:flex',
                        ]"
                        :title="isDark ? '切换到浅色模式' : '切换到深色模式'"
                        @click="toggleDark(!isDark)"
                    >
                        <IconDarkMode v-if="isDark" class="size-5" />
                        <IconLightMode v-else class="size-5" />
                    </button>

                    <!-- 移动端导航：底部抽屉。条目同样由路由 meta 生成 -->
                    <DrawerRoot v-if="isMobile" v-model:open="drawerOpen" swipe-direction="down">
                        <DrawerPortal>
                            <DrawerOverlay
                                class="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm data-[state=closed]:animate-[drawer-mask-out_0.2s_ease-in] data-[state=open]:animate-[drawer-mask-in_0.2s_ease-out]"
                            />
                            <DrawerContent
                                class="border-starlight-500/20 bg-paper-50/95 dark:bg-night-900/95 fixed inset-x-0 bottom-0 z-[70] flex max-h-[75dvh] flex-col rounded-t-3xl border-t pb-[env(safe-area-inset-bottom)] text-stone-800 outline-hidden backdrop-blur-xl data-[state=closed]:animate-[drawer-down-out_0.24s_ease-in] data-[state=open]:animate-[drawer-up-in_0.3s_cubic-bezier(0.32,0.72,0,1)] dark:border-white/10 dark:text-slate-200"
                            >
                                <DrawerTitle class="sr-only">站点导航</DrawerTitle>
                                <DrawerDescription class="sr-only">
                                    选择要前往的页面，向下拖动抽屉可关闭。
                                </DrawerDescription>

                                <!-- 拖拽把手：向下拖或点击遮罩都能关闭；拖拽区只放这一小块，
                                     下面的条目是可点的 a 标签，本来就被 swipe 的忽略选择器排除。 -->
                                <DrawerHandle
                                    class="flex h-10 shrink-0 cursor-grab touch-none items-center justify-center active:cursor-grabbing"
                                >
                                    <span class="h-1.5 w-12 rounded-full bg-black/15 dark:bg-white/25" />
                                </DrawerHandle>

                                <nav
                                    aria-label="站点导航"
                                    class="flex min-h-0 [scrollbar-width:none] flex-col gap-1 overflow-y-auto px-3 pb-2 [&::-webkit-scrollbar]:hidden"
                                >
                                    <RouterLink
                                        v-for="item in navItems"
                                        :key="item.path"
                                        :to="item.path"
                                        :class="drawerItemClass(item.path)"
                                        :aria-current="route.path === item.path ? 'page' : undefined"
                                        @click="drawerOpen = false"
                                    >
                                        {{ item.title }}
                                    </RouterLink>
                                </nav>
                            </DrawerContent>
                        </DrawerPortal>
                    </DrawerRoot>

                    <button
                        :class="[
                            surfaceClass,
                            'flex size-10 cursor-pointer items-center justify-center rounded-full transition-colors duration-200 md:hidden',
                        ]"
                        aria-label="打开导航菜单"
                        type="button"
                        @click="drawerOpen = true"
                    >
                        <IconMenu class="size-6" />
                    </button>
                </div>
            </div>
        </div>
    </nav>
</template>
