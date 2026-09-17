<script lang="ts" setup>
import { Icon } from '@iconify/vue/offline';
import { friends, navifox, type FriendLink, navifoxBlog } from '@navifox/constants';
import { format } from '@navifox/utils/dnt';
import { AvatarFallback, AvatarImage, AvatarRoot } from 'reka-ui';

import CopyField from '#/components/CopyField.vue';
import Navbar from '#/components/Navbar.vue';
import PawOff from '#/components/PawOff.vue';
import SectionHeader from '#/components/SectionHeader.vue';
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
    { title: '名称', value: navifox.name },
    { title: '简介', value: navifox.description || '', isPureCode: true },
    { title: '签名', value: navifox.status || '' },
    { title: '头像', value: navifox.avatar512 || '', isPureCode: true },
    { title: '头像', value: navifox.avatar256 || '', isPureCode: true },
    { title: '头像', value: navifox.avatar || '', isPureCode: true },
    { title: '主页', value: navifox.title || '' },
    { title: '主页', value: navifox.link || '', isPureCode: true },
    { title: '博客', value: navifoxBlog.name },
    { title: '博客', value: navifoxBlog.link, isPureCode: true },
];
</script>

<template>
    <div class="bg-paper-50 dark:bg-night-950 relative min-h-dvh">
        <Navbar />
        <div class="MaxContainer relative text-stone-600 dark:text-slate-300">
            <SectionHeader class="mt-48" centered eyebrow="Navifox · Links" level="h1" title="旧雨庐">
                站不在深，有朋则名；斯是陋室，因友而馨<br />
            </SectionHeader>

            <section aria-label="网上友邻" class="mx-auto mt-12 mb-36 max-w-6xl">
                <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    <a
                        v-for="friend in friends"
                        :key="friend.name"
                        :href="friend.link"
                        :class="[
                            'GlassCard group relative flex flex-col overflow-hidden p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl',
                            friendAccents[friend.type].card,
                        ]"
                        target="_blank"
                    >
                        <div class="flex items-center gap-4">
                            <AvatarRoot
                                :class="[
                                    'flex size-16 shrink-0 items-center justify-center overflow-hidden text-stone-400',
                                    ...(friend.styles?.avatar ?? []),
                                ]"
                            >
                                <AvatarImage
                                    :src="friend.avatar ?? ''"
                                    :alt="friend.name"
                                    class="size-full object-cover"
                                    decoding="async"
                                />
                                <AvatarFallback class="flex size-full items-center justify-center">
                                    <PawOff class="text-6xl" aria-hidden="true" />
                                </AvatarFallback>
                            </AvatarRoot>
                            <h2
                                v-if="friend.title"
                                class="text-night-900 flex min-w-0 flex-1 items-center gap-1 text-lg font-bold tracking-tight dark:text-white"
                            >
                                <!-- 名称与站点名各自独立截断：省略号由被截断者自己的文本框绘制，
                                     若两者同处一个截断框内，省略号会统一取名称那一档颜色。 -->
                                <span class="max-w-full shrink-0 truncate">{{ friend.name }}</span>
                                <span
                                    class="text-starlight-300 min-w-0 truncate dark:text-slate-600"
                                    v-html="friend.title"
                                />
                            </h2>
                            <h2
                                v-else
                                v-html="friend.name"
                                class="text-night-900 min-w-0 flex-1 truncate text-lg font-bold tracking-tight dark:text-white"
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
                            v-if="friend.status || friend.description || friend.descriptionRich"
                            class="mt-4 text-sm leading-relaxed text-stone-500 dark:text-slate-300"
                            v-html="friend.status || friend.description || friend.descriptionRich"
                        />
                        <span
                            v-if="friend.meet"
                            class="pointer-events-none absolute right-2 -bottom-4 text-6xl leading-none font-bold whitespace-nowrap text-stone-900/10 opacity-0 transition-opacity duration-300 select-none group-hover:opacity-100 dark:text-white/10"
                            aria-hidden="true"
                            v-html="format(friend.meet, 'yyyy/M/d')"
                        />
                    </a>
                </div>
            </section>

            <section aria-label="我的友链信息" class="mx-auto mb-32 max-w-md">
                <SectionHeader centered eyebrow="Navifox · Meta-Information" title="我的友链信息" />
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
