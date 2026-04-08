<script lang="ts" setup>
import Background from '#/assets/background.jpg';
import { Icon } from '@iconify/vue';
import { signature, tighnari } from '@navifox/constants';
import { logger } from '@navifox/utils';
import { onClickOutside } from '@vueuse/core';
import { ref, useTemplateRef } from 'vue';
import { useRouter } from 'vue-router';

const isShowingDropdown = ref(false)
const dropdown = useTemplateRef('dropdown')
const router = useRouter()

logger.draw(signature, '#459199')

onClickOutside(dropdown, () => isShowingDropdown.value = false)
</script>


<template>
<img :src="Background" alt="背景图片" class="absolute size-full select-none object-cover z-0" />
<div class="absolute size-full bg-black/67 z-10" />

<div class="absolute right-0 z-30 w-full">
    <div class="MaxContainer">
        <div class="md:hidden flex justify-end">
            <button
                class="p-5 cursor-pointer hover:text-cyan-600 dark:hover:text-[#B5A2FD] transition-colors duration-200"
                @click="isShowingDropdown = true"
            >
                <Icon height="28" icon="lineicons:menu" />
            </button>
        </div>
        <div class="md:flex hidden flex-nowrap justify-end gap-4">
            <a
                v-for="{meta, path} in router.options.routes.filter(r => r.meta?.showOnNavbar)"
                :href="path"
                class="px-6 py-5 text-gray-300 hover:text-yellow-100 hover:bg-[#B5A2FD]/33 transition-colors duration-200"
            >
                {{ meta?.title ?? '首页' }}
            </a>
        </div>
    </div>
</div>

<div ref="dropdown" class="fixed right-0 z-40 md:hidden w-full">
    <Transition>
        <div
            v-if="isShowingDropdown"
            class="text-slate-900 dark:text-slate-200 bg-slate-200 dark:bg-slate-800 rounded-t-lg"
        >
            <div class="MaxContainer flex flex-col items-end">
                <button
                    class="p-5 cursor-pointer hover:text-cyan-600 dark:hover:text-[#B5A2FD] transition-colors duration-200"
                    @click="isShowingDropdown = false"
                >
                    <Icon height="28" icon="lineicons:close" />
                </button>
                <div class="w-full flex flex-col gap-[1px]">
                    <template v-for="({meta, path}, index) in router.options.routes.filter(r => r.meta?.showOnNavbar)">
                        <div v-if="index > 0" class="border-t border-t-slate-300 dark:border-t-slate-700" />
                        <a :href="path"
                           class="p-5 text-nowrap hover:text-cyan-600 dark:hover:text-[#B5A2FD] transition-colors duration-200"
                           target="_blank">{{ meta?.title ?? '首页' }}</a>
                    </template>
                </div>
            </div>
        </div>
    </Transition>
</div>

<div class="MaxContainer h-screen flex flex-col selection:bg-[#B5A2FD]/33 z-20 **:z-20">
    <div class="h-full mb-8 md:mb-20 flex flex-col justify-end">
        <div class="text-xl md:text-2xl mb-4 text-[#B5A2FD]"><code>@{{ tighnari.uid }}</code></div>
        <div class="font-medium text-4xl md:text-6xl md:max-w-[75%]">
            <span class="text-white">{{ tighnari.name }}</span>
            <span v-for="tag in tighnari.tags" class="text-gray-400">／{{ tag }}</span>
        </div>
        <div class="text-4xl md:text-5xl mt-4 text-gray-400 font-sign" v-html="tighnari.description" />
    </div>
</div>
</template>


<!--suppress CssUnusedSymbol-->
<style scoped>
.v-enter-active {
    transition: all 0.3s ease-out;
}

.v-leave-active {
    transition: all 0.3s ease-out;
}

.v-enter-from,
.v-leave-to {
    transform: translateY(-20px);
    opacity: 0;
}
</style>
