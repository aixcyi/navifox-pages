<script lang="ts" setup>
import { sheets } from '#/constants';
import { isShowingNavDropdown } from '#/storage.ts';
import { Icon } from '@iconify/vue';
import { useWindowScroll, useWindowSize } from '@vueuse/core';
import { nextTick, onMounted, useTemplateRef, watch } from 'vue';

const navDropdown = useTemplateRef('nav-dropdown')
const { width } = useWindowSize()
const { y } = useWindowScroll()

function resize() {
    const dropdown = navDropdown.value
    const portal = document.getElementById('nav-dropdown-portal')
    if (!dropdown) return
    if (!portal) return
    const portalRect = portal.getBoundingClientRect()
    dropdown.style['right'] = `${width.value - portalRect.right}px`
    dropdown.style['top'] = `${y.value + portalRect.y + 8}px`
}

onMounted(() => nextTick(resize))
watch(width, () => {
    isShowingNavDropdown.value = false
})
watch(isShowingNavDropdown, (after) => {
    if (after) {
        // TODO: 此处不能聚焦，导致不能触发失焦时隐藏菜单的代码。
        navDropdown.value?.focus()
    }
})
</script>


<template>
<div ref="nav-dropdown"
     :class="isShowingNavDropdown?['opacity-100','visible','scale-100','pointer-events-auto']:['opacity-0','invisible','scale-95','pointer-events-none']"
     class="fixed z-[9999] w-56 rounded-3xl bg-white dark:bg-slate-800 shadow-xl outline outline-slate-200 dark:outline-slate-700 transform transition-all duration-200"
     style="right: -999px; top: -999px;"
     @blur="isShowingNavDropdown = false; console.log('喵')">
    <div class="py-2">
        <template v-for="sheet in sheets">
            <a v-if="sheet.text"
               :href="sheet.link"
               class="nav-item flex items-center px-4 py-3 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100/50 dark:hover:bg-slate-700/50 transition-colors rounded-xl mx-2 my-1"
               rel="nofollow"
               role="button">
                <div class="flex-shrink-0 w-5 h-5 mr-3">
                    <Icon v-if="sheet.logo" :icon="sheet.logo" class="size-[1.25rem]" />
                    <img v-else-if="sheet.icon" :src="sheet.icon" class="size-[1.25rem]">
                    <div v-else class="size-[1.25rem]" />
                </div>
                <span class="font-medium">{{ sheet.text }}</span>
            </a>
            <div v-else class="border-t border-slate-200 dark:border-slate-600 my-2 mx-2"></div>
        </template>
    </div>
</div>
</template>
