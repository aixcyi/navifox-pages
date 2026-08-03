<script lang="ts" setup>
import { Icon } from '@iconify/vue';
import {
    copyrightInterval as interval,
    copyrights,
    credits,
    friends,
    navifoxHome,
    sitemap,
    socials,
    tighnari,
} from '@navifox/constants';
import { useDark, useToggle } from '@vueuse/core';

const isDark = useDark();
const toggleDark = useToggle(isDark);
const linkMap = [
    {
        title: '站内导航',
        subtitle: 'Sitemap',
        data: sitemap,
        styles: {
            link: ['hover:border-indigo-300', 'dark:hover:border-indigo-500'],
            icon: ['text-indigo-600'],
            title: ['group-hover:text-indigo-600', 'dark:group-hover:text-indigo-400 '],
        },
    },
    {
        title: '引用鸣谢',
        subtitle: 'Credits',
        data: credits,
        styles: {
            link: ['hover:border-blue-300', 'dark:hover:border-blue-500'],
            icon: ['text-blue-500'],
            title: ['group-hover:text-blue-500'],
        },
    },
    {
        title: '友情链接',
        subtitle: 'Friends',
        data: friends,
        styles: {
            link: ['hover:border-purple-300', 'dark:hover:border-purple-500'],
            icon: ['text-purple-600'],
            title: ['group-hover:text-purple-600', 'dark:group-hover:text-purple-400'],
        },
    },
];
</script>

<template>
    <footer class="bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
        <div class="MaxContainer py-10!">
            <div class="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4 xl:gap-8">
                <div v-for="{ title, subtitle, data, styles } in linkMap">
                    <h3 class="mb-4 flex items-center text-lg font-semibold text-slate-900 dark:text-slate-100">
                        {{ title }}<span class="ml-2 text-slate-500">{{ subtitle }}</span>
                    </h3>
                    <div class="flex flex-col flex-nowrap gap-3">
                        <a
                            v-for="item in data"
                            :class="styles.link"
                            :href="item.link"
                            :target="item.link.startsWith('https://') ? '_blank' : '_self'"
                            class="group flex items-center rounded-lg border border-slate-200 bg-white p-3 transition-all duration-200 hover:shadow-md dark:border-slate-600 dark:bg-slate-700"
                        >
                            <div
                                :class="styles.icon"
                                class="mr-3 flex h-8 w-8 flex-shrink-0 items-center justify-center"
                            >
                                <Icon v-if="item.logo" :icon="item.logo" height="24" />
                                <img
                                    v-else-if="item.icon"
                                    :src="item.icon"
                                    alt="ico"
                                    class="size-6 rounded-md select-none"
                                />
                                <div v-else class="size-6" />
                            </div>
                            <div class="min-w-0 flex-1">
                                <h4
                                    :class="styles.title"
                                    class="truncate text-sm font-medium text-slate-900 transition-colors duration-200 dark:text-slate-100"
                                >
                                    {{ item.name }}
                                    <span v-if="item.note" class="text-slate-400">{{ item.note }}</span>
                                </h4>
                                <p
                                    v-if="item.description"
                                    class="text-xs text-slate-500 dark:text-slate-400"
                                    v-html="item.description"
                                />
                            </div>
                        </a>
                    </div>
                </div>

                <div
                    class="order-last flex h-full flex-col gap-0.5 text-sm text-slate-600 xl:order-first dark:text-slate-400"
                >
                    <div class="mb-3 inline-flex flex-wrap items-center gap-4 text-slate-600 dark:text-slate-400">
                        <template v-for="social in socials">
                            <a
                                v-if="social.logo"
                                :href="social.link"
                                class="transition-colors duration-200 hover:text-orange-500 dark:hover:text-orange-300"
                                target="_blank"
                            >
                                <Icon :icon="social.logo" height="24" />
                            </a>
                        </template>
                        <button
                            class="group inline-flex h-9 w-9 flex-shrink-0 cursor-pointer items-center justify-center rounded-3xl bg-white text-slate-700 outline outline-slate-200 backdrop-blur-sm transition-colors duration-200 hover:bg-slate-50 dark:bg-slate-800 dark:text-slate-300 dark:outline-slate-700 dark:hover:bg-slate-700"
                            @click="toggleDark(!isDark)"
                        >
                            <i class="text-slate-600 transition-all duration-200 dark:text-slate-300">
                                <Icon
                                    :icon="isDark ? 'material-symbols:dark-mode' : 'material-symbols:light-mode'"
                                    height="1.25rem"
                                />
                            </i>
                        </button>
                    </div>
                    <p v-for="copyright in copyrights" class="flex flex-wrap">
                        <a
                            :href="copyright.link"
                            class="transition-colors duration-200 hover:text-orange-500 dark:hover:text-orange-300"
                            target="_blank"
                        >
                            {{ copyright.text }}
                        </a>
                    </p>
                    <p v-show="tighnari.name">
                        © {{ interval.start }}-{{ interval.stop }}
                        <a
                            :href="navifoxHome.link"
                            class="hover:text-orange-500 hover:underline hover:decoration-wavy dark:hover:text-orange-300"
                            target="_blank"
                        >
                            {{ tighnari.name }}
                        </a>
                        版权所有。<br />
                    </p>
                    <p v-show="tighnari.uid">
                        © {{ interval.start }}-{{ interval.stop }}
                        <a
                            :href="navifoxHome.link"
                            class="hover:text-orange-500 hover:underline hover:decoration-wavy dark:hover:text-orange-300"
                            target="_blank"
                        >
                            {{ tighnari.uid }}
                        </a>
                        <span>.</span>
                        All Rights Reserved.<br />
                    </p>
                    <p>
                        使用了
                        <a
                            class="transition-colors duration-200 hover:text-orange-500 dark:hover:text-orange-300"
                            href="https://github.com/Fechin/reference"
                            target="_blank"
                        >
                            reference
                        </a>
                        同款主题。<br />
                    </p>
                    <p>
                        使用了
                        <a
                            class="transition-colors duration-200 hover:text-orange-500 dark:hover:text-orange-300"
                            href="https://iconify.design/"
                            target="_blank"
                        >
                            Iconify
                        </a>
                        的能力。<br />
                    </p>
                    <p>
                        使用了
                        <a
                            class="transition-colors duration-200 hover:text-orange-500 dark:hover:text-orange-300"
                            href="https://fonts.google.com/specimen/Whisper"
                            target="_blank"
                        >
                            Whisper
                        </a>
                        字体渲染签名。<br />
                    </p>
                    <p>
                        使用了
                        <a
                            class="transition-colors duration-200 hover:text-orange-500 dark:hover:text-orange-300"
                            href="https://www.jetbrains.com/lp/mono/"
                            target="_blank"
                        >
                            JetBrains Mono
                        </a>
                        字体渲染代码。<br />
                    </p>
                    <slot name="additions"></slot>
                    <div class="mt-auto pt-6">
                        <a
                            :href="navifoxHome.link"
                            class="flex items-center justify-center font-medium text-slate-800 md:justify-start dark:text-slate-300"
                            target="_blank"
                        >
                            <div class="mr-3 justify-center text-4xl text-emerald-600 dark:text-emerald-400">
                                <div class="self-center">
                                    <Icon height="36" icon="fluent-emoji:fox" />
                                </div>
                            </div>
                            <span class="hidden text-xl font-bold tracking-tight md:flex md:text-2xl lg:text-3xl">
                                <span
                                    class="bg-gradient-to-r from-slate-800 to-orange-600 bg-clip-text text-transparent dark:from-slate-200 dark:to-orange-300"
                                    v-html="'navi'"
                                />
                                <span class="font-black text-orange-400">fox</span>
                                <span class="font-black text-gray-400">.net</span>
                            </span>
                        </a>
                    </div>
                    <p class="mt-2 flex flex-wrap pb-4" v-html="navifoxHome.descriptionRich" />
                </div>
            </div>
        </div>
    </footer>
</template>
