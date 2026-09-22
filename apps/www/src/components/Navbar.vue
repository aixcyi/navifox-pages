<script lang="ts" setup>
import { Icon } from '@iconify/vue/offline';
import { navifoxHome } from '@navifox/constants';
import { useDark, useToggle } from '@vueuse/core';
import {
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuRoot,
    DropdownMenuTrigger,
} from 'reka-ui';
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const props = defineProps<{ cover?: boolean }>();

const isDark = useDark();
const route = useRoute();
const router = useRouter();
const scrolled = ref(false);
const toggleDark = useToggle(isDark);

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

/** 移动端菜单条目基础样式。 */
const menuItemClass =
    'cursor-pointer rounded-lg px-3 py-2.5 text-left text-sm whitespace-nowrap outline-hidden transition-colors duration-200 data-[highlighted]:bg-starlight-500/10';

/** 移动端页面条目的激活态文字（当前页加粗高亮）。 */
function navMenuItemClass(path: string) {
    return route.path === path ? 'text-starlight-600 dark:text-starlight-300 font-semibold' : '';
}

/** 下拉菜单卡片通用样式（含出入场动画，keyframes 见全局 style.css）。 */
const menuCardClass =
    'border-starlight-500/20 bg-paper-50/95 text-stone-800 shadow-xl shadow-night-950/10 backdrop-blur-md z-50 min-w-52 rounded-2xl border p-2 dark:border-white/10 dark:bg-night-900/95 dark:text-slate-200 dark:shadow-night-950/40 data-[state=open]:animate-[nav-menu-in_0.18s_ease-out] data-[state=closed]:animate-[nav-menu-out_0.14s_ease-in]';

const pillClass = computed(() => {
    if (props.cover) {
        if (!scrolled.value) return 'border-transparent bg-transparent';
        // 浅色模式滚动后：晨光玻璃；深色模式滚动后：夜色玻璃
        return isDark.value
            ? 'border-white/15 bg-night-900/75 shadow-xl shadow-night-950/40'
            : 'border-blossom-300/25 bg-paper-50/85 shadow-xl shadow-starlight-600/10';
    }
    return 'border-starlight-500/25 bg-paper-50/85 shadow-lg shadow-night-950/10 dark:border-white/10 dark:bg-night-900/80 dark:shadow-night-950/40';
});

/** 显示在导航栏的路由项（由 router meta 的 isShowOnNavbar 控制，标题取 meta.title）。 */
const navItems = computed(() =>
    router.options.routes
        .filter((record) => Boolean(record.meta?.isShowOnNavbar))
        .map((record) => ({
            path: record.path,
            title: (record.meta?.title as string | undefined) ?? record.path,
        })),
);

function onScroll() {
    scrolled.value = window.scrollY > 12;
}

onMounted(() => {
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
});

onBeforeUnmount(() => window.removeEventListener('scroll', onScroll));
</script>

<template>
    <nav class="fixed inset-x-0 top-0 z-40 px-3 pt-3 sm:px-4 sm:pt-4">
        <div class="mx-auto max-w-5xl">
            <div
                :class="pillClass"
                class="flex items-center justify-between gap-3 rounded-full border px-4 py-2 backdrop-blur-xl transition-all duration-300 sm:px-5"
            >
                <RouterLink
                    to="/"
                    :title="navifoxHome.text"
                    class="group flex flex-nowrap items-center gap-2 select-none"
                >
                    <span
                        class="text-2xl leading-none transition-transform duration-300 select-none group-hover:scale-110 group-hover:-rotate-6"
                    >
                        <Icon icon="fluent-emoji:fox" />
                    </span>
                    <span class="text-lg font-bold tracking-tight whitespace-nowrap">
                        <span
                            :class="
                                onDarkSurface
                                    ? 'to-starlight-300 bg-gradient-to-r from-white'
                                    : 'to-starlight-600 dark:to-starlight-300 bg-gradient-to-r from-stone-800 dark:from-white'
                            "
                            class="bg-clip-text text-transparent"
                            v-html="'路狐'"
                        />
                        <span
                            :class="onDarkSurface ? 'text-starlight-300' : 'text-starlight-600 dark:text-starlight-400'"
                            v-html="'领航'"
                        />
                    </span>
                </RouterLink>

                <!-- 桌面端导航：由路由 meta 生成（isShowOnNavbar），无下拉 -->
                <div class="hidden items-center gap-1 md:flex">
                    <RouterLink
                        v-for="item in navItems"
                        :key="item.path"
                        :to="item.path"
                        :class="[baseItemClass, navItemClass(route.path === item.path)]"
                    >
                        {{ item.title }}
                    </RouterLink>
                </div>

                <div class="flex items-center gap-2">
                    <button
                        :class="[
                            surfaceClass,
                            'hidden size-9 cursor-pointer items-center justify-center rounded-full transition-colors duration-200 md:flex',
                        ]"
                        :title="isDark ? '切换到浅色模式' : '切换到深色模式'"
                        @click="toggleDark(!isDark)"
                    >
                        <Icon
                            :icon="isDark ? 'material-symbols:dark-mode' : 'material-symbols:light-mode'"
                            height="20"
                        />
                    </button>

                    <!-- 移动端导航菜单：条目同样由路由 meta 生成 -->
                    <DropdownMenuRoot>
                        <DropdownMenuTrigger as-child>
                            <button
                                :class="[
                                    surfaceClass,
                                    'flex size-10 cursor-pointer items-center justify-center rounded-full transition-colors duration-200 md:hidden',
                                ]"
                                aria-label="打开导航菜单"
                                type="button"
                            >
                                <Icon height="24" icon="lineicons:menu" />
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuPortal>
                            <DropdownMenuContent side="bottom" align="end" :side-offset="10" :class="menuCardClass">
                                <DropdownMenuLabel
                                    class="flex items-center gap-2 px-3 py-2 text-sm font-bold whitespace-nowrap select-none"
                                >
                                    <Icon class="text-xl" icon="fluent-emoji:fox" />
                                    <span>{{ navifoxHome.text }}</span>
                                </DropdownMenuLabel>
                                <div class="border-t-starlight-500/20 mt-1 border-t dark:border-t-white/10" />

                                <DropdownMenuItem
                                    v-for="item in navItems"
                                    :key="item.path"
                                    as-child
                                    :class="menuItemClass"
                                >
                                    <RouterLink :to="item.path" :class="navMenuItemClass(item.path)">
                                        {{ item.title }}
                                    </RouterLink>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenuPortal>
                    </DropdownMenuRoot>
                </div>
            </div>
        </div>
    </nav>
</template>
