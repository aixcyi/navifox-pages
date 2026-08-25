<script lang="ts" setup>
import { Icon } from '@iconify/vue/offline';
import { anchors, bookmarks, navifoxRefs } from '@navifox/constants';
import { AiFooter } from '@navifox/ui';
import { takeRight } from 'es-toolkit';

import LinkIcon from '#/assets/AkarIconsLinkOut.svg';
import NavBar from '#/components/NavBar.vue';
import NavDropdown from '#/components/NavDropdown.vue';
import SignatureLine from '#/components/SignatureLine.vue';
</script>

<template>
    <header class="Home relative z-10 w-full overflow-visible">
        <div
            class="pointer-events-none absolute inset-0 bg-linear-to-br from-indigo-500 via-purple-600 to-indigo-800"
        />
        <div class="HeaderBackground pointer-events-none absolute inset-0 opacity-10" />
        <div
            class="absolute top-20 left-1/4 h-32 w-32 animate-pulse rounded-full bg-linear-to-r from-pink-400/20 to-purple-400/20 blur-xl"
        />
        <div
            class="absolute right-1/4 bottom-20 h-40 w-40 animate-pulse rounded-full bg-linear-to-r from-blue-400/20 to-cyan-400/20 blur-xl"
        />
        <div
            class="absolute top-24 right-12 animate-bounce font-mono text-sm text-white/60 opacity-20"
            style="animation-delay: 1s; animation-duration: 3s"
            v-html="'&lt;/&gt;'"
        />
        <div
            class="absolute bottom-32 left-16 animate-bounce font-mono text-lg text-white/60 opacity-20"
            style="animation-delay: 2s; animation-duration: 3s"
            v-html="{}"
        />
        <div class="pointer-events-none absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-black/10" />
        <NavBar class="MaxContainer z-20" cover />
        <div class="relative z-30 flex w-full flex-col pt-8 pb-10 text-center">
            <div class="MaxContainer relative z-30 lg:w-4/5 xl:w-3/4">
                <h1 class="text-4xl leading-tight font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
                    <span class="relative whitespace-nowrap">
                        <SignatureLine class="absolute top-2/3 left-0 h-[0.58em] w-full fill-pink-300/60" />
                        <span
                            class="relative bg-linear-to-r from-white via-pink-100 to-purple-100 bg-clip-text text-transparent"
                            v-html="'路狐领航之'"
                        />
                    </span>
                    <span class="mt-2 block">{{ navifoxRefs.name }}</span>
                </h1>
                <h2
                    class="mx-auto mt-8 mb-12 text-center text-lg leading-relaxed font-light tracking-wide text-slate-300 md:text-xl lg:w-3/4 lg:text-2xl xl:w-2/3"
                >
                    <span class="*:[b]:font-semibold *:[b]:text-pink-300" v-html="navifoxRefs.descriptionRich" />
                    <span>这一页收录了部分常用的书签，并按以下几个大类分布，更多参考见右上角。</span>
                </h2>
                <div class="mx-auto mb-16 flex max-w-4xl flex-row flex-wrap items-center justify-center gap-4">
                    <a
                        v-for="anchor in anchors.slice(0, -1)"
                        :href="anchor.link"
                        :target="anchor.link.startsWith('https://') ? '_blank' : '_self'"
                        class="group inline-flex h-10 items-center justify-center rounded-3xl bg-white/10 px-6 text-white outline outline-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-white/20 hover:shadow-lg"
                    >
                        <div v-if="anchor.logo" class="mr-2 flex shrink-0 items-center justify-center">
                            <Icon :icon="anchor.logo" height="24" />
                        </div>
                        <span class="leading-none font-semibold">{{ anchor.text }}</span>
                    </a>
                    <a
                        v-for="anchor in takeRight(anchors, 1)"
                        :href="anchor.link"
                        :target="anchor.link.startsWith('https://') ? '_blank' : '_self'"
                        class="group inline-flex h-10 items-center justify-center rounded-3xl bg-linear-to-r from-orange-500/20 to-yellow-500/20 px-6 text-white outline outline-orange-300/30 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:from-orange-500/30 hover:to-yellow-500/30 hover:shadow-lg"
                    >
                        <div v-if="anchor.logo" class="mr-2 flex shrink-0 items-center justify-center">
                            <Icon :icon="anchor.logo" height="24" />
                        </div>
                        <span class="leading-none font-semibold">{{ anchor.text }}</span>
                    </a>
                </div>
            </div>
        </div>
    </header>

    <NavDropdown />

    <section class="Home MaxContainer">
        <div class="mx-auto mt-10 flex w-full flex-col justify-center lg:w-4/5">
            <template v-for="group in bookmarks">
                <div v-if="group.title?.elementId" :id="group.title.elementId" />
                <a
                    v-if="group.title"
                    :href="group.title.link"
                    :target="group.title.link.startsWith('https://') ? '_blank' : '_self'"
                    class="mt-6 mb-2 font-medium text-slate-800 sm:text-xl dark:text-slate-300"
                >
                    <h2 class="hover:*:opacity-100">
                        <span>{{ group.title.text }}</span>
                        <span
                            class="ml-2 text-slate-400 opacity-0 transition-opacity duration-150 select-none dark:text-slate-500"
                            v-html="'#'"
                        />
                    </h2>
                </a>
                <div v-if="group.title" class="mb-6 h-1 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-900">
                    <div class="h-full w-24 bg-linear-to-r from-indigo-500 to-purple-600 dark:bg-slate-800"></div>
                </div>
                <div class="mb-8 grid w-full grid-cols-2 gap-1 text-slate-800 md:grid-cols-4 md:gap-2">
                    <a
                        v-for="item in group.items"
                        :href="item.link"
                        class="inline-flex items-center gap-1.5 rounded-lg border border-transparent px-4 py-3 transition-all duration-200 hover:border-purple-600 hover:bg-purple-600/10 hover:**:[.Note]:border-purple-500 hover:**:[.Note]:text-purple-500"
                        target="_blank"
                    >
                        <div class="mr-2 min-w-7 text-gray-400 dark:text-gray-600">
                            <Icon
                                v-if="item.logo"
                                :icon="item.logo"
                                class="size-7 max-w-7 text-gray-600 dark:text-gray-400"
                            />
                            <img
                                v-else-if="item.icon"
                                :src="item.icon"
                                alt="ico"
                                class="w-7"
                                loading="lazy"
                                decoding="async"
                                @error="
                                    (e) => {
                                        (e.target as HTMLImageElement).src = LinkIcon;
                                    }
                                "
                            />
                            <img v-else :src="LinkIcon" alt="ico" class="size-7" loading="lazy" decoding="async" />
                        </div>
                        <div class="text-sm">
                            <div class="inline-flex flex-wrap items-center text-black dark:text-white">
                                <span v-html="item.name" />
                                <span
                                    v-if="(item.tags || []).includes('catalog')"
                                    class="Note ml-1.5 inline rounded-xs border border-blue-400 px-0.5 text-xs text-blue-400 transition-colors duration-200 dark:border-amber-200 dark:text-amber-200"
                                    v-html="'目录'"
                                />
                                <!--<Icon-->
                                <!--    v-if="(item.tags || []).includes('catalog')"-->
                                <!--    class="Note ml-1 inline text-blue-400 transition-colors duration-200 dark:text-amber-200"-->
                                <!--    height="16"-->
                                <!--    icon="carbon:catalog"-->
                                <!--/>-->
                            </div>
                            <div class="Note text-gray-400 transition-colors duration-200 dark:text-gray-600">
                                {{ item.note }}
                            </div>
                        </div>
                    </a>
                </div>
            </template>
        </div>
    </section>

    <AiFooter class="md:mt-14" />
</template>

<style scoped>
.HeaderBackground {
    background-size:
        60px 60px,
        90px 90px;
    background-position:
        0 0,
        30px 45px;
    background-image:
        radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.2) 1px, transparent 1px),
        radial-gradient(circle at 80% 50%, rgba(255, 255, 255, 0.2) 1px, transparent 1px);
}
</style>
