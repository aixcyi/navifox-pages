<script lang="ts" setup>
import {
    copyrights,
    friends,
    navifox,
    navifoxBlog,
    navifoxDocs,
    navifoxHei,
    navifoxHome,
    navifoxRefs,
    sinceYear,
    untilYear,
} from '@navifox/constants';
import type { Website } from '@navifox/types';
import { website } from '@navifox/utils';
import { useDark, useToggle } from '@vueuse/core';
import { AvatarFallback, AvatarImage, AvatarRoot } from 'reka-ui';
import type { Component } from 'vue';
import IconPixiv from '~icons/fa6-brands/pixiv';
import IconDarkMode from '~icons/material-symbols/dark-mode';
import IconLightMode from '~icons/material-symbols/light-mode';

import AiFavicon from './AiFavicon.vue';
import AiSocials from './AiSocials.vue';
import FluentEmojiFox from './icons/Fox.vue';
import { avatarShapeClass } from './lib/avatar';

const isDark = useDark();
const toggleDark = useToggle(isDark);

/** 页脚「站内导航」一栏（数组顺序即展示顺序）；图标沿用各站的站点图标地址。 */
const sitemap: Website[] = [navifoxHome, navifoxBlog, navifoxDocs, navifoxRefs, navifoxHei];

/** 「引用鸣谢」一栏的条目：图标优先用编译期组件 `mark`，否则退回站点图标地址 `icon`。 */
type Credit = Omit<Website, 'logo'> & { mark?: Component };

/** 页脚「引用鸣谢」一栏（数组顺序即展示顺序）。 */
const credits: Credit[] = [
    { text: 'oO大黄Oo', link: 'https://www.pixiv.net/users/9892346', mark: IconPixiv },
    { text: '錯誤', link: 'https://www.pixiv.net/users/1297556', mark: IconPixiv },
    { text: 'アナ', link: 'https://www.pixiv.net/users/24036634', mark: IconPixiv },
    { text: 'shields.io', link: 'https://shields.io/', icon: 'https://shields.io/img/favicon.ico', note: '徽章生成' },
];

/** 页脚里友邻只占一列，取前若干位与「站内导航」「引用鸣谢」两列保持相近高度。 */
const footerFriends = friends.slice(0, Math.max(sitemap.length, credits.length));
</script>

<template>
    <footer
        class="border-starlight-500/20 bg-paper-100 dark:bg-night-900 border-t text-stone-700 dark:border-white/10 dark:text-slate-300"
    >
        <div class="MaxContainer py-10!">
            <div class="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4 xl:gap-8">
                <!-- 站内导航 -->
                <div>
                    <h3 class="mb-4 flex items-center text-lg font-semibold text-stone-900 dark:text-slate-100">
                        站内导航<span class="ml-2 text-stone-500 dark:text-slate-500">Sitemap</span>
                    </h3>
                    <div class="flex flex-col flex-nowrap gap-3">
                        <a
                            v-for="item in sitemap"
                            :href="item.link"
                            :target="(item.link ?? '').startsWith('https://') ? '_blank' : '_self'"
                            class="group border-starlight-500/15 hover:border-blossom-300/60 dark:hover:border-blossom-300/40 flex items-center rounded-xl border bg-white px-4 py-3 transition-all duration-200 hover:shadow-md dark:border-white/12 dark:bg-sky-300/10"
                        >
                            <div class="text-blossom-300 mr-2.5 flex h-8 w-8 flex-shrink-0 items-center justify-center">
                                <AiFavicon :item="item" :size="32" />
                            </div>
                            <div class="min-w-0 flex-1">
                                <h4
                                    v-if="item.note"
                                    class="group-hover:text-blossom-400 dark:group-hover:text-blossom-300 truncate text-sm font-medium text-stone-900 transition-colors duration-200 dark:text-slate-100"
                                >
                                    {{ item.text }}
                                    <span class="text-stone-400 dark:text-slate-500" v-html="item.note" />
                                </h4>
                                <h4
                                    v-else
                                    class="group-hover:text-blossom-400 dark:group-hover:text-blossom-300 truncate text-sm font-medium text-stone-900 transition-colors duration-200 dark:text-slate-100"
                                    v-html="item.text"
                                />
                                <p
                                    v-if="website.description(item)"
                                    class="text-xs text-stone-500 dark:text-slate-400"
                                    v-html="website.description(item)"
                                />
                            </div>
                        </a>
                    </div>
                </div>

                <!-- 引用鸣谢 -->
                <div>
                    <h3 class="mb-4 flex items-center text-lg font-semibold text-stone-900 dark:text-slate-100">
                        引用鸣谢<span class="ml-2 text-stone-500 dark:text-slate-500">Credits</span>
                    </h3>
                    <div class="flex flex-col flex-nowrap gap-3">
                        <a
                            v-for="item in credits"
                            :href="item.link"
                            :target="(item.link ?? '').startsWith('https://') ? '_blank' : '_self'"
                            class="group border-starlight-500/15 flex items-center rounded-xl border bg-white px-4 py-3 transition-all duration-200 hover:border-sky-400/60 hover:shadow-md dark:border-white/12 dark:bg-sky-300/10 dark:hover:border-sky-400/50"
                        >
                            <div
                                class="mr-2.5 flex h-8 w-8 flex-shrink-0 items-center justify-center text-sky-500 dark:text-sky-400"
                            >
                                <component
                                    :is="item.mark"
                                    v-if="item.mark"
                                    :style="{ height: '32px', width: 'auto' }"
                                />
                                <AiFavicon v-else :item="item" :size="32" />
                            </div>
                            <div class="min-w-0 flex-1">
                                <h4
                                    v-if="item.note"
                                    class="truncate text-sm font-medium text-stone-900 transition-colors duration-200 group-hover:text-sky-500 dark:text-slate-100 dark:group-hover:text-sky-400"
                                >
                                    {{ item.text }}
                                    <span class="text-stone-400 dark:text-slate-500" v-html="item.note" />
                                </h4>
                                <h4
                                    v-else
                                    class="truncate text-sm font-medium text-stone-900 transition-colors duration-200 group-hover:text-sky-500 dark:text-slate-100 dark:group-hover:text-sky-400"
                                    v-html="item.text"
                                />
                                <p
                                    v-if="website.description(item)"
                                    class="text-xs text-stone-500 dark:text-slate-400"
                                    v-html="website.description(item)"
                                />
                            </div>
                        </a>
                    </div>
                </div>

                <!-- 友情链接（字段逻辑与 apps/www 的友链页一致，多出的一层是头像） -->
                <div>
                    <h3 class="mb-4 flex items-center text-lg font-semibold text-stone-900 dark:text-slate-100">
                        友情链接<span class="ml-2 text-stone-500 dark:text-slate-500">Friends</span>
                    </h3>
                    <div class="flex flex-col flex-nowrap gap-3">
                        <a
                            v-for="friend in footerFriends"
                            :key="friend.text"
                            :href="friend.link"
                            :target="(friend.link ?? '').startsWith('https://') ? '_blank' : '_self'"
                            class="group border-starlight-500/15 flex items-center rounded-xl border bg-white px-4 py-3 transition-all duration-200 hover:border-violet-400/60 hover:shadow-md dark:border-white/12 dark:bg-sky-300/10 dark:hover:border-violet-400/50"
                        >
                            <AvatarRoot
                                :class="[
                                    'mr-2.5 flex h-8 w-8 flex-shrink-0 items-center justify-center overflow-hidden text-stone-400',
                                    avatarShapeClass(friend.avatarShape),
                                ]"
                            >
                                <AvatarImage
                                    :src="friend.avatar ?? friend.avatar256 ?? ''"
                                    :alt="friend.author"
                                    class="size-full object-cover"
                                    decoding="async"
                                />
                                <AvatarFallback class="flex size-full items-center justify-center">
                                    <FluentEmojiFox class="size-full" />
                                </AvatarFallback>
                            </AvatarRoot>
                            <div class="min-w-0 flex-1">
                                <h4
                                    v-if="friend.author"
                                    class="flex min-w-0 items-center gap-1 text-sm font-medium text-stone-900 transition-colors duration-200 group-hover:text-violet-500 dark:text-slate-100 dark:group-hover:text-violet-300"
                                >
                                    <!-- 站点拥有者与站点名各自独立截断，省略号才不会统一取后者的颜色。 -->
                                    <span class="shrink-0 truncate">{{ friend.author }}</span>
                                    <span
                                        class="min-w-0 truncate text-stone-400 dark:text-slate-500"
                                        v-html="friend.note || friend.text"
                                    />
                                </h4>
                                <h4
                                    v-else
                                    class="truncate text-sm font-medium text-stone-900 transition-colors duration-200 group-hover:text-violet-500 dark:text-slate-100 dark:group-hover:text-violet-300"
                                    v-html="friend.text"
                                />
                                <p
                                    v-if="friend.status || website.description(friend)"
                                    class="text-xs text-stone-500 dark:text-slate-400"
                                    v-html="friend.status || website.description(friend)"
                                />
                            </div>
                        </a>
                    </div>
                </div>

                <div
                    class="order-last flex h-full flex-col gap-0.5 text-sm text-stone-600 xl:order-first dark:text-slate-400"
                >
                    <div class="mb-3 inline-flex flex-wrap items-center gap-4 text-stone-600 dark:text-slate-400">
                        <AiSocials
                            :size="24"
                            link-class="hover:text-starlight-500 dark:hover:text-starlight-300 transition-colors duration-200"
                        />
                        <button
                            class="group outline-starlight-500/30 inline-flex h-9 w-9 flex-shrink-0 cursor-pointer items-center justify-center rounded-3xl bg-white text-stone-700 outline backdrop-blur-sm transition-colors duration-200 hover:bg-stone-50 dark:bg-white/10 dark:text-slate-300 dark:outline-white/10 dark:hover:bg-white/15"
                            @click="toggleDark(!isDark)"
                        >
                            <i class="text-stone-600 transition-all duration-200 dark:text-slate-300">
                                <component :is="isDark ? IconDarkMode : IconLightMode" class="size-5" />
                            </i>
                        </button>
                    </div>
                    <p v-for="copyright in copyrights" class="flex flex-wrap">
                        <a
                            :href="copyright.link"
                            class="hover:text-starlight-500 dark:hover:text-starlight-300 transition-colors duration-200"
                            target="_blank"
                            v-html="copyright.text"
                        />
                    </p>
                    <p v-show="navifox.author">
                        © {{ sinceYear }}-{{ untilYear }}
                        <a
                            :href="navifoxHome.link"
                            class="hover:text-starlight-500 dark:hover:text-starlight-300 hover:underline hover:decoration-wavy"
                            target="_blank"
                            v-html="navifox.author"
                        />
                        版权所有。<br />
                    </p>
                    <p v-show="navifox.uid">
                        © {{ sinceYear }}-{{ untilYear }}
                        <a
                            :href="navifoxHome.link"
                            class="hover:text-starlight-500 dark:hover:text-starlight-300 hover:underline hover:decoration-wavy"
                            target="_blank"
                            v-html="navifox.uid"
                        />
                        <span>.</span>
                        All Rights Reserved.<br />
                    </p>
                    <p>
                        曾借鉴
                        <a
                            class="hover:text-starlight-500 dark:hover:text-starlight-300 transition-colors duration-200"
                            href="https://github.com/Fechin/reference"
                            target="_blank"
                            v-html="'reference'"
                        />
                        的主题。<br />
                    </p>
                    <p>
                        使用了
                        <a
                            class="hover:text-starlight-500 dark:hover:text-starlight-300 transition-colors duration-200"
                            href="https://iconify.design/"
                            target="_blank"
                            v-html="'Iconify'"
                        />
                        的能力。<br />
                    </p>
                    <p>
                        使用了
                        <a
                            class="hover:text-starlight-500 dark:hover:text-starlight-300 transition-colors duration-200"
                            href="https://fonts.google.com/specimen/Whisper"
                            target="_blank"
                            v-html="'Whisper'"
                        />
                        字体渲染签名。<br />
                    </p>
                    <p>
                        使用了
                        <a
                            class="hover:text-starlight-500 dark:hover:text-starlight-300 transition-colors duration-200"
                            href="https://www.jetbrains.com/lp/mono/"
                            target="_blank"
                            v-html="'JetBrains Mono'"
                        />
                        字体渲染代码。<br />
                    </p>
                    <slot name="additions"></slot>
                    <div class="mt-auto pt-6">
                        <a
                            :href="navifoxHome.link"
                            class="flex items-center justify-center font-medium text-stone-800 md:justify-start dark:text-slate-300"
                            target="_blank"
                        >
                            <div class="mr-2 justify-center">
                                <div class="self-center">
                                    <FluentEmojiFox class="size-10" />
                                </div>
                            </div>
                            <span class="hidden text-xl font-bold tracking-tight md:flex md:text-2xl lg:text-3xl">
                                <span
                                    class="to-starlight-500 dark:to-starlight-300 bg-gradient-to-r from-stone-800 bg-clip-text text-transparent dark:from-slate-100"
                                    v-html="'navi'"
                                />
                                <span class="text-starlight-500 dark:text-starlight-300 font-black">fox</span>
                                <span class="font-black text-stone-400 dark:text-slate-500">.net</span>
                            </span>
                        </a>
                    </div>
                    <p class="mt-2 flex flex-wrap pb-4" v-html="website.description(navifoxHome)" />
                </div>
            </div>
        </div>
    </footer>
</template>
