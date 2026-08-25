<script lang="ts" setup>
import { Icon } from '@iconify/vue/offline';
import { navifoxRefs } from '@navifox/constants';
import { useDark, useToggle } from '@vueuse/core';

import { isShowingNavDropdown } from '#/storage.ts';

defineProps<{ cover?: boolean }>();

const isDark = useDark();
const toggleDark = useToggle(isDark);
</script>

<template>
    <div class="relative">
        <div class="flex flex-row items-center justify-between py-4 md:justify-start">
            <a
                :href="navifoxRefs.link"
                class="flex items-center justify-center font-medium text-slate-800 md:justify-start dark:text-slate-300"
            >
                <div class="mr-3 justify-center text-4xl text-white">
                    <div class="self-center">
                        <Icon height="32" icon="fluent-emoji:fox" />
                    </div>
                </div>
                <span
                    v-if="cover"
                    class="domain hidden text-xl font-bold tracking-tight md:flex md:text-2xl lg:text-3xl"
                >
                    <span class="bg-linear-to-r from-white to-orange-200 bg-clip-text text-transparent">navi</span>
                    <span class="font-black text-orange-400">fox</span>
                    <span class="font-black text-gray-400">.net</span>
                    <span class="ml-3 border-l border-l-slate-300 pl-3 text-slate-300">{{ navifoxRefs.name }}</span>
                </span>
                <span v-else class="domain hidden text-xl font-bold tracking-tight md:flex md:text-2xl lg:text-3xl">
                    <span
                        class="bg-linear-to-r from-slate-800 to-orange-600 bg-clip-text text-transparent dark:from-slate-200 dark:to-orange-300"
                        v-html="'navi'"
                    />
                    <span class="font-black text-orange-400">fox</span>
                    <span class="font-black text-gray-400">.net</span>
                    <span
                        class="ml-3 border-l border-l-slate-300 pl-3 text-purple-700/50 dark:border-l-slate-700 dark:text-purple-300/80"
                        v-html="navifoxRefs.name"
                    />
                </span>
            </a>
            <div class="flex flex-wrap items-center justify-center text-base md:ml-auto">
                <button
                    v-if="cover"
                    class="group ml-2 inline-flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-3xl bg-white/10 text-white outline outline-white/20 backdrop-blur-sm transition-colors duration-200 hover:bg-white/20 hover:outline-white/30 lg:ml-3"
                    @click="toggleDark(!isDark)"
                >
                    <i class="text-white transition-all duration-200">
                        <Icon
                            :icon="isDark ? 'material-symbols:dark-mode' : 'material-symbols:light-mode'"
                            height="1.25rem"
                        />
                    </i>
                </button>
                <button
                    v-else
                    class="group ml-2 inline-flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-3xl bg-white text-slate-700 outline outline-slate-200 backdrop-blur-sm transition-colors duration-200 hover:bg-slate-50 lg:ml-3 dark:bg-slate-800 dark:text-slate-300 dark:outline-slate-700 dark:hover:bg-slate-700"
                    @click="toggleDark(!isDark)"
                >
                    <i class="text-slate-600 transition-all duration-200 dark:text-slate-300">
                        <Icon
                            :icon="isDark ? 'material-symbols:dark-mode' : 'material-symbols:light-mode'"
                            height="1.25rem"
                        />
                    </i>
                </button>

                <div id="nav-dropdown" class="relative ml-2 lg:ml-3">
                    <button
                        v-if="cover"
                        id="nav-trigger"
                        aria-expanded="false"
                        aria-haspopup="true"
                        class="group ml-0 inline-flex h-9 cursor-pointer items-center rounded-3xl bg-white/10 px-3 py-2 text-white outline outline-white/20 backdrop-blur-sm transition-colors duration-200 hover:bg-white/20 hover:outline-white/30"
                        type="button"
                        @click.stop="isShowingNavDropdown = !isShowingNavDropdown"
                    >
                        <div class="text-white">
                            <Icon height="1.25rem" icon="carbon:catalog-publish" />
                        </div>
                        <span class="ml-2 hidden text-sm font-medium text-white md:inline">更多参考</span>
                        <div class="ml-1 hidden md:inline">
                            <Icon height="1.25rem" icon="mingcute:down-small-line" />
                        </div>
                    </button>
                    <button
                        v-else
                        id="nav-trigger"
                        aria-expanded="false"
                        aria-haspopup="true"
                        class="group ml-0 inline-flex h-9 cursor-pointer items-center rounded-3xl bg-white px-3 py-2 text-slate-700 outline outline-slate-200 backdrop-blur-sm transition-colors duration-200 hover:bg-slate-50 dark:bg-slate-800 dark:text-slate-300 dark:outline-slate-700 dark:hover:bg-slate-700"
                        type="button"
                        @click.stop="isShowingNavDropdown = !isShowingNavDropdown"
                    >
                        <div class="text-slate-700 dark:text-slate-300">
                            <Icon height="1.25rem" icon="carbon:catalog-publish" />
                        </div>
                        <span
                            class="ml-2 hidden text-sm font-medium text-slate-700 md:inline dark:text-slate-300"
                            v-html="'更多参考'"
                        />
                        <div class="ml-1 hidden text-slate-700 md:inline dark:text-slate-300">
                            <Icon height="1.25rem" icon="mingcute:down-small-line" />
                        </div>
                    </button>
                    <div id="nav-dropdown-portal"></div>
                </div>
            </div>
        </div>
    </div>
</template>
