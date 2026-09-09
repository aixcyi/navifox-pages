<script lang="ts" setup>
import { Icon } from '@iconify/vue/offline';
import { friends, tighnari, type FriendLink, navifoxBlog } from '@navifox/constants';

import LinkIcon from '#/assets/AkarIconsLinkOut.svg';
import CopyField from '#/components/CopyField.vue';
import Navbar from '#/components/Navbar.vue';
import Stardust from '#/components/Stardust.vue';

/** 各类型友邻的悬停强调色：伙伴金、动态淡粉、像素淡紫。 */
const friendAccents: Record<FriendLink['type'], { card: string; arrow: string }> = {
    partner: {
        card: 'hover:border-starlight-500/50 hover:shadow-starlight-600/10 hover:bg-starlight-500/5',
        arrow: 'text-starlight-500 dark:text-starlight-300',
    },
    feed: {
        card: 'hover:border-blossom-400/60 hover:shadow-blossom-500/10 hover:bg-blossom-400/5',
        arrow: 'text-blossom-500 dark:text-blossom-300',
    },
    pixel: {
        card: 'hover:border-aurora-400/60 hover:shadow-aurora-400/10 hover:bg-aurora-400/5 dark:hover:border-aurora-300/60 dark:hover:shadow-aurora-300/10 dark:hover:bg-aurora-300/5',
        arrow: 'text-aurora-500 dark:text-aurora-200',
    },
};

const copyableFields: { title: string; value: string; isPureCode?: boolean }[] = [
    { title: '名称', value: tighnari.name },
    { title: '头像', value: tighnari.avatar512 || '', isPureCode: true },
    { title: '主页', value: tighnari.title || '' },
    { title: '主页', value: tighnari.link || '', isPureCode: true },
    { title: '博客', value: navifoxBlog.name },
    { title: '博客', value: navifoxBlog.link, isPureCode: true },
    { title: '签名', value: tighnari.status || '' },
    { title: '简介', value: tighnari.description || '', isPureCode: true },
];
</script>

<template>
    <div class="bg-paper-50 dark:bg-night-950 relative min-h-dvh">
        <Navbar />
        <div class="MaxContainer relative text-stone-600 dark:text-slate-300">
            <header class="mx-auto mt-48 max-w-2xl text-center">
                <p
                    class="text-starlight-600 dark:text-starlight-300 font-mono text-[0.72rem] tracking-[0.28em] uppercase sm:text-sm"
                    v-html="'Navifox · Links'"
                />
                <h1
                    class="text-night-900 mt-3 text-3xl font-bold tracking-tight sm:text-4xl dark:text-white"
                    v-html="'网上友邻'"
                />
            </header>

            <section aria-label="网上友邻" class="mx-auto mt-12 mb-36 max-w-6xl">
                <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    <a
                        v-for="friend in friends"
                        :key="friend.name"
                        :href="friend.link"
                        :class="[
                            'border-starlight-500/20 group relative flex flex-col overflow-hidden rounded-3xl border bg-white/70 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-white/5',
                            friendAccents[friend.type].card,
                        ]"
                        target="_blank"
                    >
                        <div class="flex items-center gap-4">
                            <img
                                :src="friend.avatar"
                                :alt="friend.name"
                                :class="['size-12 shrink-0 object-cover', ...(friend.avatarStyle ?? [])]"
                                loading="lazy"
                                decoding="async"
                                @error="
                                    (e) => {
                                        (e.target as HTMLImageElement).src = LinkIcon;
                                    }
                                "
                            />
                            <h2
                                class="text-night-900 min-w-0 flex-1 truncate text-lg font-bold tracking-tight dark:text-white"
                                v-html="friend.name"
                            />
                            <Icon
                                :class="[
                                    'shrink-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100',
                                    friendAccents[friend.type].arrow,
                                ]"
                                height="18"
                                icon="material-symbols:arrow-outward"
                            />
                        </div>
                        <p
                            v-if="friend.status"
                            class="mt-4 text-sm leading-relaxed text-stone-500 dark:text-slate-300"
                            v-html="friend.status"
                        />
                        <span
                            v-if="friend.meet"
                            class="pointer-events-none absolute right-2 -bottom-4 text-6xl leading-none font-bold whitespace-nowrap text-stone-900/10 select-none dark:text-white/10"
                            aria-hidden="true"
                            v-html="friend.meet"
                        />
                    </a>
                </div>
            </section>

            <section aria-label="我的友链信息" class="mx-auto mb-32 max-w-md">
                <header class="text-center">
                    <p
                        class="text-starlight-600 dark:text-starlight-300 font-mono text-[0.72rem] tracking-[0.28em] uppercase"
                        v-html="'Navifox · Meta-Information'"
                    />
                    <h2
                        class="text-night-900 mt-3 text-3xl font-bold tracking-tight sm:text-4xl dark:text-white"
                        v-html="'我的友链信息'"
                    />
                </header>
                <div class="mt-10 flex flex-col gap-2">
                    <CopyField
                        v-for="row in copyableFields"
                        :key="row.title"
                        :title="row.title"
                        :value="row.value"
                        :isMono="row.isPureCode"
                    />
                </div>
            </section>
        </div>
        <Stardust />
    </div>
</template>
