<script lang="ts" setup>
import { Icon } from '@iconify/vue/offline';
import { bookmarkTabs, bookmarks, navifoxRefs } from '@navifox/constants';
import type { BookmarkCategory, Hyperlink, Website } from '@navifox/types';
import { AiFooter } from '@navifox/ui';
import { computed, ref } from 'vue';

import LinkIcon from '#/assets/AkarIconsLinkOut.svg';
import NavBar from '#/components/NavBar.vue';
import NavDropdown from '#/components/NavDropdown.vue';
import SignatureLine from '#/components/SignatureLine.vue';

const activeTab = ref<BookmarkCategory>(bookmarkTabs[0]!.key);

/**
 * 未命名分组并入前一个分组，作为其后续区块（隔开一定间距）；
 * 首个分组若未命名（如 groupChores）则保持独立布局。
 * 仅收集当前激活 Tab（生态分类）下的分组。
 */
const bookmarkGroups = computed(() => {
    const groups: { title?: Hyperlink; sections: { items: Website[] }[] }[] = [];
    for (const group of bookmarks) {
        if (group.category !== activeTab.value) continue;
        if (group.title || groups.length === 0) {
            groups.push({ title: group.title, sections: [{ items: group.items }] });
        } else {
            groups[groups.length - 1]!.sections.push({ items: group.items });
        }
    }
    return groups;
});
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
                    <span>这一页收录了部分常用的书签，并按以下几个大类展示，更多参考见右上角。</span>
                </h2>
                <div
                    role="tablist"
                    aria-label="书签分类"
                    class="mx-auto mb-16 flex max-w-4xl flex-row flex-wrap items-center justify-center gap-4"
                >
                    <button
                        v-for="tab in bookmarkTabs"
                        :key="tab.key"
                        type="button"
                        role="tab"
                        :aria-selected="activeTab === tab.key"
                        :class="[
                            'group inline-flex h-10 cursor-pointer items-center justify-center rounded-3xl px-6 text-white outline backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-white/20 hover:shadow-lg',
                            activeTab === tab.key
                                ? 'bg-white/25 shadow-lg outline-white/50'
                                : 'bg-white/10 outline-white/20',
                        ]"
                        @click="activeTab = tab.key"
                    >
                        <div class="mr-2 flex shrink-0 items-center justify-center">
                            <Icon :icon="tab.logo" height="24" />
                        </div>
                        <span class="leading-none font-semibold">{{ tab.label }}</span>
                    </button>
                </div>
            </div>
        </div>
    </header>

    <NavDropdown />

    <section class="Home MaxContainer" role="tabpanel">
        <div class="mx-auto mt-10 w-full columns-1 gap-x-8 md:columns-2 lg:columns-3 xl:columns-4">
            <div v-for="group in bookmarkGroups" class="mb-10 break-inside-avoid">
                <template v-if="group.title">
                    <div v-if="group.title?.elementId" :id="group.title.elementId" />
                    <a
                        :href="group.title.link"
                        :target="group.title.link.startsWith('https://') ? '_blank' : '_self'"
                        class="mb-2 font-medium text-slate-800 sm:text-xl dark:text-slate-300"
                    >
                        <h2 class="relative hover:*:opacity-100">
                            <span
                                class="absolute -left-5 text-slate-400 opacity-0 transition-opacity duration-150 select-none dark:text-slate-500"
                                v-html="'#'"
                            />
                            <span>{{ group.title.text }}</span>
                        </h2>
                    </a>
                    <div class="mb-6 h-1 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                        <div class="h-full w-24 bg-linear-to-r from-indigo-500 to-purple-600 dark:bg-slate-800"></div>
                    </div>
                </template>
                <template v-for="(section, sectionIndex) in group.sections">
                    <div v-if="sectionIndex > 0" class="mt-8" aria-hidden="true" />
                    <div class="flex w-full flex-col gap-1 text-slate-800">
                        <a
                            v-for="item in section.items"
                            :href="item.link"
                            class="inline-flex items-center gap-1.5 rounded-lg border border-transparent px-2 py-1.5 transition-all duration-200 hover:border-purple-600 hover:bg-purple-600/10 hover:**:[.Note]:border-purple-500 hover:**:[.Note]:text-purple-500"
                            target="_blank"
                        >
                            <div class="min-w-4 text-gray-400 dark:text-gray-600">
                                <Icon
                                    v-if="item.logo"
                                    :icon="item.logo"
                                    class="size-4 max-w-4 text-gray-600 dark:text-gray-400"
                                />
                                <img
                                    v-else-if="item.icon"
                                    :src="item.icon"
                                    alt="ico"
                                    class="w-4"
                                    loading="lazy"
                                    decoding="async"
                                    @error="
                                        (e) => {
                                            (e.target as HTMLImageElement).src = LinkIcon;
                                        }
                                    "
                                />
                                <img v-else :src="LinkIcon" alt="ico" class="size-4" loading="lazy" decoding="async" />
                            </div>
                            <div class="flex flex-row flex-wrap items-center gap-x-1.5 text-sm">
                                <div class="inline-flex flex-wrap items-center text-black dark:text-gray-300">
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
                                <div class="Note text-gray-400 transition-colors duration-200 dark:text-gray-500">
                                    {{ item.note }}
                                </div>
                            </div>
                        </a>
                    </div>
                </template>
            </div>
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
