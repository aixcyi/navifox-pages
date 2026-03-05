<script lang="ts" setup>
import { isShowingNavDropdown } from '#/storage.ts';
import { Icon } from '@iconify/vue';
import { navifoxRefs } from '@navifox/constants';
import { onMounted, ref } from 'vue';

const isDarkMode = ref(false)

function toggleDarkMode() {
    document.documentElement.classList.toggle('dark')
    isDarkMode.value = document.documentElement.classList.contains('dark')
}

onMounted(() => {
    isDarkMode.value = document.documentElement.classList.contains('dark')
})
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
            <span class="hidden md:flex domain text-xl md:text-2xl lg:text-3xl font-bold tracking-tight">
                <span class="text-cyan-300 font-black">refs.</span>
                <span class="bg-gradient-to-r from-cyan-100 to-white bg-clip-text text-transparent">navifox</span>
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
                class="cursor-pointer inline-flex items-center justify-center flex-shrink-0 h-9 w-9 rounded-3xl ml-2 lg:ml-3 backdrop-blur-sm transition-colors duration-200 group bg-white/10 outline outline-white/20 text-white hover:bg-white/20 hover:outline-white/30"
                @click="toggleDarkMode">
                <i v-if="isDarkMode" class="transition-all duration-200 text-white">
                    <Icon height="1.25rem" icon="material-symbols:dark-mode" />
                </i>
                <i v-else class="transition-all duration-200 text-white">
                    <Icon height="1.25rem" icon="material-symbols:light-mode" />
                </i>
            </button>

            <div id="nav-dropdown" class="relative ml-2 lg:ml-3">
                <button id="nav-trigger"
                        aria-expanded="false"
                        aria-haspopup="true"
                        class="cursor-pointer inline-flex h-9 items-center rounded-3xl backdrop-blur-sm ml-0 px-3 py-2 transition-colors duration-200 group bg-white/10 outline outline-white/20 text-white hover:bg-white/20 hover:outline-white/30"
                        type="button"
                        @click="isShowingNavDropdown = !isShowingNavDropdown">
                    <div class="mx-1 text-white">
                        <Icon height="1.25rem" icon="carbon:catalog-publish" />
                    </div>
                    <span class="mx-1 hidden md:inline text-sm font-medium text-white">更多参考</span>
                    <div class="hidden md:inline">
                        <Icon height="1.25rem" icon="mingcute:down-small-line" />
                    </div>
                </button>
                <div id="nav-dropdown-portal"></div>
            </div>

        </div>
    </div>
</div>
</template>
