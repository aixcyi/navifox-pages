<script lang="ts" setup>
import { isShowingNavDropdown } from '#/storage.ts';
import { Icon } from '@iconify/vue';
import type { Hyperlink } from '@navifox/types';
import { onClickOutside, useWindowScroll, useWindowSize } from '@vueuse/core';
import { nextTick, onMounted, useTemplateRef, watch } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()
const navDropdown = useTemplateRef('nav-dropdown')
const { width } = useWindowSize({ type: 'visual' })
const { y } = useWindowScroll()
const sheets: Hyperlink[] = [
    ...router.options.routes.filter(
        r => typeof r.name === 'string' && r.name.endsWith('Sheet')
    ).map(r => ({
        text: r.meta?.title ?? '(未命名参考)',
        link: r.path,
        logo: r.meta?.logo,
    })),
    { text: null, link: '' },
    { text: 'CheatSheets.zip', link: 'https://cheatsheets.zip/', icon: 'https://cheatsheets.zip/images/favicon.png' },
]

function resize() {
    isShowingNavDropdown.value = false
    const dropdown = navDropdown.value
    const portal = document.getElementById('nav-dropdown-portal')
    if (!dropdown) return
    if (!portal) return
    const portalRect = portal.getBoundingClientRect()
    dropdown.style['right'] = `${width.value - portalRect.right}px`
    dropdown.style['top'] = `${portalRect.bottom + 8}px`
}

onClickOutside(navDropdown, () => isShowingNavDropdown.value = false, { ignore: [ '#nav-trigger' ] })
onMounted(() => nextTick(resize))
watch(width, resize)
watch(y, resize)
</script>


<template>
<div ref="nav-dropdown"
     :class="isShowingNavDropdown?['opacity-100','visible','scale-100','pointer-events-auto']:['opacity-0','invisible','scale-95','pointer-events-none']"
     class="fixed z-[9999] w-56 rounded-3xl bg-white dark:bg-slate-800 shadow-xl outline outline-slate-200 dark:outline-slate-700 transform transition-all duration-200"
     style="right: -999px; top: -999px;"
     tabindex="-1">
    <div class="py-2">
        <template v-for="sheet in sheets">
            <a v-if="sheet.text"
               :href="sheet.link"
               :target="sheet.link.startsWith('https://') ? '_blank' : '_self'"
               class="nav-item flex items-center px-4 py-3 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100/50 dark:hover:bg-slate-700/50 transition-colors rounded-xl mx-2 my-1"
               rel="nofollow"
               role="button">
                <div class="flex-shrink-0 w-5 h-5 mr-3">
                    <Icon v-if="sheet.logo" :icon="sheet.logo" class="size-[1.25rem]" />
                    <img v-else-if="sheet.icon" :src="sheet.icon" alt="ico" class="size-[1.25rem] select-none">
                    <div v-else class="size-[1.25rem]" />
                </div>
                <span class="font-medium">{{ sheet.text }}</span>
            </a>
            <div v-else class="border-t border-slate-200 dark:border-slate-600 my-2 mx-2"></div>
        </template>
    </div>
</div>
</template>
