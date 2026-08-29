<script lang="ts" setup>
import { Icon } from '@iconify/vue';
import { navifoxHome } from '@navifox/constants';
import { useDark, useToggle } from '@vueuse/core';
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { sectionAnchors } from '#/anchors.ts';
import { isShowingNavDropdownMenu } from '#/storage.ts';

const props = defineProps<{ cover?: boolean }>();

const isDark = useDark();
const route = useRoute();
const router = useRouter();
const scrolled = ref(false);
const toggleDark = useToggle(isDark);

/** 导航当前是否处于「暗表面」（照片遮罩／夜色玻璃），需要白色系文字。 */
const onDarkSurface = computed(() => (props.cover ? !scrolled.value || isDark.value : isDark.value));

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

/** 滚动到首页区块锚点；不在首页时先跳转首页再滚动。 */
async function goSection(id: string) {
    if (route.path !== '/') {
        await router.push('/');
        await nextTick();
    }
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

/** 回到页面顶部（不在首页时先跳转首页）。 */
async function goTop() {
    if (route.path !== '/') {
        await router.push('/');
        await nextTick();
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

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
                    :title="navifoxHome.name"
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
                            >路狐</span
                        >
                        <span
                            :class="onDarkSurface ? 'text-starlight-300' : 'text-starlight-600 dark:text-starlight-400'"
                            >领航</span
                        >
                    </span>
                </RouterLink>

                <div class="hidden items-center gap-1 md:flex">
                    <button
                        :class="
                            onDarkSurface
                                ? 'hover:bg-starlight-500/15 hover:text-starlight-300 text-white/85'
                                : 'hover:bg-starlight-500/10 hover:text-starlight-600 dark:hover:text-starlight-300 text-stone-600 dark:text-slate-300'
                        "
                        class="cursor-pointer rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap transition-all duration-200"
                        type="button"
                        @click="goTop"
                    >
                        首页
                    </button>
                    <button
                        v-for="anchor in sectionAnchors"
                        :key="anchor.id"
                        :class="
                            onDarkSurface
                                ? 'hover:bg-starlight-500/15 hover:text-starlight-300 text-white/85'
                                : 'hover:bg-starlight-500/10 hover:text-starlight-600 dark:hover:text-starlight-300 text-stone-600 dark:text-slate-300'
                        "
                        class="cursor-pointer rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap transition-all duration-200"
                        type="button"
                        @click="goSection(anchor.id)"
                    >
                        {{ anchor.title }}
                    </button>
                </div>

                <div class="flex items-center gap-2">
                    <button
                        :class="
                            onDarkSurface
                                ? 'hover:bg-starlight-500/15 hover:text-starlight-300 text-white/85'
                                : 'hover:bg-starlight-500/10 hover:text-starlight-600 dark:hover:text-starlight-300 text-stone-600 dark:text-slate-300'
                        "
                        class="hidden size-9 cursor-pointer items-center justify-center rounded-full transition-colors duration-200 md:flex"
                        :title="isDark ? '切换到浅色模式' : '切换到深色模式'"
                        @click="toggleDark(!isDark)"
                    >
                        <Icon
                            :icon="isDark ? 'material-symbols:dark-mode' : 'material-symbols:light-mode'"
                            height="20"
                        />
                    </button>
                    <button
                        :class="
                            onDarkSurface
                                ? 'hover:bg-starlight-500/15 hover:text-starlight-300 text-white/85'
                                : 'hover:bg-starlight-500/10 hover:text-starlight-600 dark:hover:text-starlight-300 text-stone-600 dark:text-slate-300'
                        "
                        class="flex size-10 cursor-pointer items-center justify-center rounded-full transition-colors duration-200 md:hidden"
                        aria-label="打开导航菜单"
                        @click="isShowingNavDropdownMenu = true"
                    >
                        <Icon height="24" icon="lineicons:menu" />
                    </button>
                </div>
            </div>
        </div>
    </nav>
</template>
