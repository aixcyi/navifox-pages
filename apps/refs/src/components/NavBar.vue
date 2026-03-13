<script lang="ts" setup>
import { isShowingNavDropdown } from '#/storage.ts';
import { Icon } from '@iconify/vue';
import { navifoxRefs } from '@navifox/constants';
import { useDark, useToggle } from '@vueuse/core';

defineProps<{ cover?: boolean }>()

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>


<template>
<div class="relative">
    <div class="flex flex-row justify-between md:justify-start items-center py-4">

        <a :href="navifoxRefs.link"
           class="flex font-medium items-center justify-center md:justify-start text-slate-800 dark:text-slate-300">
            <div class="justify-center text-white mr-3 text-4xl">
                <div class="self-center">
                    <Icon height="32" icon="fluent-emoji:fox" />
                </div>
            </div>
            <span v-if="cover"
                  class="hidden md:flex domain text-xl md:text-2xl lg:text-3xl font-bold tracking-tight">
                <span class="bg-gradient-to-r from-white to-orange-200 bg-clip-text text-transparent">navi</span>
                <span class="text-orange-400 font-black">fox</span>
                <span class="text-gray-400 font-black">.net</span>
                <span class="border-l ml-3 pl-3 border-l-slate-300 text-slate-300">{{ navifoxRefs.name }}</span>
            </span>
            <span v-else
                  class="hidden md:flex domain text-xl md:text-2xl lg:text-3xl font-bold tracking-tight">
                <span
                    class="bg-gradient-to-r from-slate-800 to-orange-600 dark:from-slate-200 dark:to-orange-300 bg-clip-text text-transparent">navi</span>
                <span class="text-orange-400 font-black">fox</span>
                <span class="text-gray-400 font-black">.net</span>
                <span
                    class="border-l ml-3 pl-3 border-l-slate-300 dark:border-l-slate-700 text-purple-700/50 dark:text-purple-300/80">
                    {{ navifoxRefs.name }}</span>
            </span>
        </a>
        <div class="md:ml-auto flex flex-wrap items-center text-base justify-center">

            <!--TODO: 搜索框如何改造？ -->
            <!--<button id="mysearch-trigger"-->
            <!--        class="cursor-pointer inline-flex h-9 items-center backdrop-blur-sm rounded-3xl px-3 md:px-4 lg:px-6 py-2 transition-colors duration-200 group bg-white/10 outline outline-white/20 text-white hover:bg-white/20 hover:outline-white/30"-->
            <!--        type="button">-->
            <!--    <div class="md:text-xl md:mr-2">-->
            <!--        <Icon height="1.25rem" icon="topcoat:search" />-->
            <!--    </div>-->
            <!--    <span class="hidden md:inline font-medium">问问神奇网络</span>-->
            <!--    <span-->
            <!--        class="hidden md:inline md:ml-2 text-sm leading-5 py-0.5 px-1.5 border border-slate-300 rounded-md">-->
            <!--            <span class="font-sans">⌘</span>-->
            <!--            <span class="font-sans">K</span>-->
            <!--        </span>-->
            <!--</button>-->

            <button
                v-if="cover"
                class="cursor-pointer inline-flex items-center justify-center flex-shrink-0 h-9 w-9 rounded-3xl ml-2 lg:ml-3 backdrop-blur-sm transition-colors duration-200 group bg-white/10 outline outline-white/20 text-white hover:bg-white/20 hover:outline-white/30"
                @click="toggleDark(!isDark)">
                <i class="transition-all duration-200 text-white">
                    <Icon :icon="isDark ? 'material-symbols:dark-mode' : 'material-symbols:light-mode'"
                          height="1.25rem" />
                </i>
            </button>
            <button
                v-else
                class="cursor-pointer inline-flex items-center justify-center flex-shrink-0 h-9 w-9 rounded-3xl ml-2 lg:ml-3 backdrop-blur-sm transition-colors duration-200 group bg-white outline outline-slate-200 dark:bg-slate-800 dark:outline-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
                @click="toggleDark(!isDark)">
                <i class="transition-all duration-200 text-slate-600 dark:text-slate-300">
                    <Icon :icon="isDark ? 'material-symbols:dark-mode' : 'material-symbols:light-mode'"
                          height="1.25rem" />
                </i>
            </button>

            <div id="nav-dropdown" class="relative ml-2 lg:ml-3">
                <button v-if="cover"
                        id="nav-trigger"
                        aria-expanded="false"
                        aria-haspopup="true"
                        class="cursor-pointer inline-flex h-9 items-center rounded-3xl backdrop-blur-sm ml-0 px-3 py-2 transition-colors duration-200 group bg-white/10 outline outline-white/20 text-white hover:bg-white/20 hover:outline-white/30"
                        type="button"
                        @click="isShowingNavDropdown = !isShowingNavDropdown">
                    <div class="text-white">
                        <Icon height="1.25rem" icon="carbon:catalog-publish" />
                    </div>
                    <span class="ml-2 hidden md:inline text-sm font-medium text-white">更多参考</span>
                    <div class="ml-1 hidden md:inline">
                        <Icon height="1.25rem" icon="mingcute:down-small-line" />
                    </div>
                </button>
                <button v-else
                        id="nav-trigger"
                        aria-expanded="false"
                        aria-haspopup="true"
                        class="cursor-pointer inline-flex h-9 items-center rounded-3xl backdrop-blur-sm ml-0 px-3 py-2 transition-colors duration-200 group bg-white outline outline-slate-200 dark:bg-slate-800 dark:outline-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
                        type="button"
                        @click="isShowingNavDropdown = !isShowingNavDropdown">
                    <div class="text-slate-700 dark:text-slate-300">
                        <Icon height="1.25rem" icon="carbon:catalog-publish" />
                    </div>
                    <span
                        class="ml-2 hidden md:inline text-sm font-medium text-slate-700 dark:text-slate-300">更多参考</span>
                    <div class="ml-1 hidden md:inline text-slate-700 dark:text-slate-300">
                        <Icon height="1.25rem" icon="mingcute:down-small-line" />
                    </div>
                </button>
                <div id="nav-dropdown-portal"></div>
            </div>

        </div>
    </div>
</div>
</template>
