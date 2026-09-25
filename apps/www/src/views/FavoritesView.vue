<script lang="ts" setup>
import { bookmarks } from '@navifox/constants';
import type { BookmarkCategory, TextLink, Website } from '@navifox/types';
import { AiFavicon, FluentEmojiFlatFox } from '@navifox/ui';
import { computed, ref, type Component } from 'vue';
import IconKotlin from '~icons/catppuccin/kotlin';
import IconPackageJson from '~icons/catppuccin/package-json';
import IconPython from '~icons/catppuccin/python';

import LinkIcon from '#/assets/AkarIconsLinkOut.svg';
import Navbar from '#/components/Navbar.vue';
import SectionHeader from '#/components/SectionHeader.vue';
import Stardust from '#/components/Stardust.vue';

const tabs: { key: BookmarkCategory; label: string; icon: Component }[] = [
    { key: 'python', label: 'Python 生态', icon: IconPython },
    { key: 'node', label: 'Node.js 生态', icon: IconPackageJson },
    { key: 'java', label: 'Java 生态', icon: IconKotlin },
    { key: 'more', label: '杂项', icon: FluentEmojiFlatFox },
];

const activeTab = ref<BookmarkCategory>(tabs[0]!.key);

/**
 * 未命名分组并入前一个分组，作为其后续区块（隔开一定间距）；
 * 首个分组若未命名（如 groupChores）则保持独立布局。
 * 仅收集当前激活 Tab（生态分类）下的分组。
 */
const bookmarkGroups = computed(() => {
    const groups: { title?: TextLink; sections: { items: Website[] }[] }[] = [];
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
    <div class="bg-paper-50 dark:bg-night-950 relative min-h-dvh">
        <Navbar />
        <div class="MaxContainer relative text-stone-600 dark:text-slate-300">
            <SectionHeader class="mt-48" centered eyebrow="Navifox · Favorites" level="h1" title="它山亭">
                它山之石可以攻玉，它山之猫竟有引力<br />
            </SectionHeader>

            <div
                role="tablist"
                aria-label="书签分类"
                class="mx-auto mt-10 flex max-w-4xl flex-row flex-wrap items-center justify-center gap-4"
            >
                <button
                    v-for="tab in tabs"
                    :key="tab.key"
                    type="button"
                    role="tab"
                    :aria-selected="activeTab === tab.key"
                    :class="[
                        'group inline-flex h-10 cursor-pointer items-center justify-center rounded-3xl border px-6 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-lg',
                        activeTab === tab.key
                            ? 'border-starlight-500/50 bg-starlight-500/15 text-starlight-600 shadow-starlight-600/10 dark:text-starlight-300'
                            : 'border-starlight-500/20 hover:bg-starlight-500/10 bg-white/60 text-stone-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300',
                    ]"
                    @click="activeTab = tab.key"
                >
                    <component :is="tab.icon" class="mr-2 shrink-0" :style="{ height: '24px', width: 'auto' }" />
                    <span class="leading-none font-semibold">{{ tab.label }}</span>
                </button>
            </div>

            <section role="tabpanel" class="mx-auto my-24 max-w-7xl">
                <div class="columns-1 gap-x-8 md:columns-2 lg:columns-3 xl:columns-4">
                    <div v-for="group in bookmarkGroups" class="mb-10 break-inside-avoid">
                        <template v-if="group.title">
                            <div v-if="group.title.anchor" :id="group.title.anchor" class="scroll-mt-28" />
                            <a
                                :href="group.title.link"
                                :target="group.title.link.startsWith('https://') ? '_blank' : '_self'"
                                class="mb-2 font-medium text-stone-800 sm:text-xl dark:text-slate-200"
                            >
                                <h2 class="relative hover:*:opacity-100">
                                    <span
                                        class="text-starlight-400 dark:text-starlight-500 absolute -left-5 opacity-0 transition-opacity duration-150 select-none"
                                        v-html="'#'"
                                    />
                                    <span>{{ group.title.text }}</span>
                                </h2>
                            </a>
                            <div
                                class="from-starlight-400 dark:from-starlight-300 mt-1 mb-6 h-1 w-24 rounded-full bg-gradient-to-r to-transparent"
                            />
                        </template>
                        <template v-for="(section, sectionIndex) in group.sections">
                            <div v-if="sectionIndex > 0" class="mt-8" aria-hidden="true" />
                            <div class="flex w-full flex-col gap-1">
                                <a
                                    v-for="item in section.items"
                                    :key="item.link"
                                    :href="item.link"
                                    class="hover:border-starlight-600 dark:hover:border-starlight-400 group hover:bg-starlight-500/10 inline-flex items-center gap-1.5 rounded-lg border border-transparent px-2 py-1.5 transition-all duration-200"
                                    target="_blank"
                                >
                                    <div class="min-w-4 text-stone-800 dark:text-slate-300">
                                        <AiFavicon :item="item" :fallback="LinkIcon" />
                                    </div>
                                    <div class="flex flex-row flex-wrap items-center gap-x-1.5 text-sm">
                                        <div
                                            class="inline-flex flex-wrap items-center text-stone-800 dark:text-slate-300"
                                        >
                                            <span v-html="item.text" />
                                            <span
                                                v-for="tag in item.tags"
                                                class="group-hover:border-starlight-600 group-hover:text-starlight-600 dark:group-hover:border-starlight-400 dark:group-hover:text-starlight-400 ml-1.5 inline rounded-xs border border-stone-400 px-0.5 text-xs text-stone-400 transition-colors duration-200 dark:border-slate-500 dark:text-slate-500"
                                                v-html="tag"
                                            />
                                        </div>
                                        <div
                                            class="group-hover:text-starlight-600 dark:group-hover:text-starlight-400/80 text-stone-400 transition-colors duration-200 dark:text-slate-500"
                                            v-html="item.note"
                                        />
                                    </div>
                                </a>
                            </div>
                        </template>
                    </div>
                </div>
            </section>
        </div>
        <!-- 星光尘点缀：覆盖正文卡片 -->
        <Stardust />
    </div>
</template>
