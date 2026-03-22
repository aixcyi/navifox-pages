<script lang="ts" setup>
import { Icon } from '@iconify/vue';
import {
    copyrightInterval as interval,
    copyrights,
    friends,
    navifox,
    sitemap,
    socials,
    thanks,
    tighnari,
} from '@navifox/constants';
import { useBrowserLocation, useDark, useToggle } from '@vueuse/core';

const isDark = useDark()
const location = useBrowserLocation()
const toggleDark = useToggle(isDark)
const linkMap = [
    {
        title: '站内导航', subtitle: 'Sitemap', data: sitemap,
        styles: {
            link: [ 'hover:border-indigo-300', 'dark:hover:border-indigo-500' ],
            icon: [ 'text-indigo-600' ],
            title: [ 'group-hover:text-indigo-600', 'dark:group-hover:text-indigo-400 ' ],
        }
    }, {
        title: '引用鸣谢', subtitle: 'Thanks', data: thanks,
        styles: {
            link: [ 'hover:border-blue-300', 'dark:hover:border-blue-500' ],
            icon: [ 'text-blue-500' ],
            title: [ 'group-hover:text-blue-500' ],
        }
    }, {
        title: '友链', subtitle: 'Friends', data: friends,
        styles: {
            link: [ 'hover:border-purple-300', 'dark:hover:border-purple-500' ],
            icon: [ 'text-purple-600' ],
            title: [ 'group-hover:text-purple-600', 'dark:group-hover:text-purple-400' ],
        }
    },
]

function isOutOfMySite(hyperlink: string) {
    return new URL(hyperlink).hostname !== location.value.hostname
}
</script>


<template>
<footer class="text-slate-700 dark:text-slate-300 bg-slate-200 dark:bg-slate-800">
    <div class="MaxContainer py-10!">
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 xl:gap-8">

            <div v-for="{title, subtitle, data, styles} in linkMap">
                <h3 class="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4 flex items-center">
                    {{ title }}<span class="text-slate-500 ml-2">{{ subtitle }}</span>
                </h3>
                <div class="flex flex-col flex-nowrap gap-3">
                    <a v-for="item in data"
                       v-show="isOutOfMySite(item.link)"
                       :class="styles.link"
                       :href="item.link"
                       :target="item.link.startsWith('https://') ? '_blank' : '_self'"
                       class="group flex items-center p-3 bg-white dark:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600 transition-all duration-200 hover:shadow-md">
                        <div :class="styles.icon"
                             class="w-8 h-8 flex items-center justify-center flex-shrink-0 mr-3">
                            <Icon v-if="item.logo" :icon="item.logo" height="24" />
                            <img v-else-if="item.icon" :src="item.icon" alt="ico"
                                 class="size-6 select-none rounded-md" />
                            <div v-else class="size-6" />
                        </div>
                        <div class="min-w-0 flex-1">
                            <h4 :class="styles.title"
                                class="font-medium text-sm text-slate-900 dark:text-slate-100 truncate transition-colors duration-200">
                                {{ item.name }}
                                <span v-if="item.note" class="text-slate-400">{{ item.note }}</span>
                            </h4>
                            <p v-if="item.description"
                               class="text-xs text-slate-500 dark:text-slate-400"
                               v-html="item.description" />
                        </div>
                    </a>
                </div>
            </div>

            <div class="relative order-last xl:order-first space-y-0.5 text-sm text-slate-600 dark:text-slate-400">
                <div class="mb-2">
                    <a :href="navifox.link"
                       class="flex font-medium items-center justify-center md:justify-start text-slate-800 dark:text-slate-300"
                       target="_blank">
                        <div class="justify-center text-emerald-600 dark:text-emerald-400 mr-3 text-4xl">
                            <div class="self-center">
                                <Icon height="36" icon="fluent-emoji:fox" />
                            </div>
                        </div>
                        <span class="hidden md:flex text-xl md:text-2xl lg:text-3xl font-bold tracking-tight">
                            <span
                                class="bg-gradient-to-r from-slate-800 to-orange-600 bg-clip-text text-transparent dark:from-slate-200 dark:to-orange-300">
                                navi</span>
                            <span class="text-orange-400 font-black">fox</span>
                            <span class="text-gray-400 font-black">.net</span>
                        </span>
                    </a>
                </div>
                <p class="mb-8 flex flex-wrap"
                   v-html="navifox.description" />
                <div class="mb-3 inline-flex flex-wrap gap-4 text-slate-600 dark:text-slate-400">
                    <template v-for="social in socials">
                        <a v-if="social.logo"
                           :href="social.link"
                           class="hover:text-orange-500 dark:hover:text-orange-300 transition-colors duration-200"
                           target="_blank">
                            <Icon :icon="social.logo" height="24" />
                        </a>
                    </template>
                </div>
                <p v-for="copyright in copyrights"
                   class="flex flex-wrap">
                    <a :href="copyright.link"
                       class="hover:text-orange-500 dark:hover:text-orange-300 transition-colors duration-200"
                       target="_blank">{{ copyright.text }}</a>
                </p>
                <p v-show="tighnari.name"
                   class="flex flex-wrap">
                    <span>© {{ interval.start }}-{{ interval.stop }} {{ tighnari.name }} 版权所有</span>
                </p>
                <p v-show="tighnari.uid"
                   class="flex flex-wrap">
                    <span>© {{ interval.start }}-{{ interval.stop }} {{ tighnari.uid }}. All Rights Reserved.</span>
                </p>
                <p class="flex flex-wrap">
                    <span>
                        使用了
                        <a class="hover:text-orange-500 dark:hover:text-orange-300 hover:underline hover:decoration-wavy"
                           href="https://github.com/Fechin/"
                           target="_blank">Fechin</a>
                        开源仓库
                        <a class="hover:text-orange-500 dark:hover:text-orange-300 transition-colors duration-200"
                           href="https://github.com/Fechin/reference"
                           target="_blank">reference</a>
                        中的主题。
                    </span>
                </p>
                <p class="flex flex-wrap">
                    <span>
                        使用了
                        <a class="hover:text-orange-500 dark:hover:text-orange-300 transition-colors duration-200"
                           href="https://iconify.design/"
                           target="_blank">Iconify</a>
                        的能力。
                    </span>
                </p>
                <p class="flex flex-wrap">
                    <span>
                        使用了
                        <a class="hover:text-orange-500 dark:hover:text-orange-300 transition-colors duration-200"
                           href="https://www.jetbrains.com/lp/mono/"
                           target="_blank"><code>JetBrains Mono</code></a>
                        字体渲染。
                    </span>
                </p>
                <slot name="additions"></slot>
                <div class="h-9 mt-2" />
                <div class="absolute bottom-0 xl:left-0 right-0">
                    <button
                        class="cursor-pointer inline-flex items-center justify-center flex-shrink-0 h-9 w-9 rounded-3xl backdrop-blur-sm transition-colors duration-200 group bg-white outline outline-slate-200 dark:bg-slate-800 dark:outline-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
                        @click="toggleDark(!isDark)">
                        <i class="transition-all duration-200 text-slate-600 dark:text-slate-300">
                            <Icon :icon="isDark ? 'material-symbols:dark-mode' : 'material-symbols:light-mode'"
                                  height="1.25rem" />
                        </i>
                    </button>
                </div>
            </div>

        </div>
    </div>
</footer>
</template>
