<script lang="ts" setup>
import { navifoxRefs } from '@navifox/constants';
import { FluentEmojiFox } from '@navifox/ui';
import { useDark, useToggle } from '@vueuse/core';
import IconCatalogPublish from '~icons/carbon/catalog-publish';
import IconDarkMode from '~icons/material-symbols/dark-mode';
import IconLightMode from '~icons/material-symbols/light-mode';
import IconDownSmallLine from '~icons/mingcute/down-small-line';

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
                <div class="mr-3 justify-center">
                    <div class="self-center">
                        <FluentEmojiFox class="size-8" />
                    </div>
                </div>
                <span
                    v-if="cover"
                    class="domain hidden text-xl font-bold tracking-tight md:flex md:text-2xl lg:text-3xl"
                >
                    <span class="bg-linear-to-r from-white to-orange-200 bg-clip-text text-transparent">navi</span>
                    <span class="font-black text-orange-400">fox</span>
                    <span class="font-black text-slate-400">.net</span>
                    <span class="ml-3 border-l border-l-slate-300 pl-3 text-slate-300">{{ navifoxRefs.text }}</span>
                </span>
                <span v-else class="domain hidden text-xl font-bold tracking-tight md:flex md:text-2xl lg:text-3xl">
                    <span
                        class="bg-linear-to-r from-slate-800 to-orange-600 bg-clip-text text-transparent dark:from-slate-200 dark:to-orange-300"
                        v-html="'navi'"
                    />
                    <span class="font-black text-orange-400">fox</span>
                    <span class="font-black text-slate-400">.net</span>
                    <span
                        class="ml-3 border-l border-l-slate-300 pl-3 text-purple-700/50 dark:border-l-slate-700 dark:text-purple-300/80"
                        v-html="navifoxRefs.text"
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
                        <IconDarkMode v-if="isDark" class="size-5" />
                        <IconLightMode v-else class="size-5" />
                    </i>
                </button>
                <button
                    v-else
                    class="group ml-2 inline-flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-3xl bg-white text-slate-700 outline outline-slate-200 backdrop-blur-sm transition-colors duration-200 hover:bg-slate-50 lg:ml-3 dark:bg-slate-800 dark:text-slate-300 dark:outline-slate-700 dark:hover:bg-slate-700"
                    @click="toggleDark(!isDark)"
                >
                    <i class="text-slate-600 transition-all duration-200 dark:text-slate-300">
                        <IconDarkMode v-if="isDark" class="size-5" />
                        <IconLightMode v-else class="size-5" />
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
                            <IconCatalogPublish class="size-5" />
                        </div>
                        <span class="ml-2 hidden text-sm font-medium text-white md:inline">更多参考</span>
                        <div class="ml-1 hidden md:inline">
                            <IconDownSmallLine class="size-5" />
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
                            <IconCatalogPublish class="size-5" />
                        </div>
                        <span
                            class="ml-2 hidden text-sm font-medium text-slate-700 md:inline dark:text-slate-300"
                            v-html="'更多参考'"
                        />
                        <div class="ml-1 hidden text-slate-700 md:inline dark:text-slate-300">
                            <IconDownSmallLine class="size-5" />
                        </div>
                    </button>
                    <div id="nav-dropdown-portal"></div>
                </div>
            </div>
        </div>
    </div>
</template>
