<script lang="ts" setup>
import { friends, navifox, navifoxBlog } from '@navifox/constants';
import type { Friend } from '@navifox/types';
import { avatarShapeClass } from '@navifox/ui';
import { website } from '@navifox/utils';
import { format } from '@navifox/utils/dnt';
import {
    AvatarFallback,
    AvatarImage,
    AvatarRoot,
    HoverCardContent,
    HoverCardPortal,
    HoverCardRoot,
    HoverCardTrigger,
} from 'reka-ui';
import IconArrowOutward from '~icons/material-symbols/arrow-outward';
import IconComment from '~icons/material-symbols/edit-note-outline';

import CopyField from '#/components/CopyField.vue';
import Navbar from '#/components/Navbar.vue';
import PawOff from '#/components/PawOff.vue';
import SectionHeader from '#/components/SectionHeader.vue';
import Stardust from '#/components/Stardust.vue';

/** 各类型友邻的悬停强调色：伙伴金、动态淡粉、像素淡紫。 */
const friendAccents: Record<Friend['type'], { card: string; arrow: string }> = {
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
    { title: '名称', value: navifox.author ?? '' },
    { title: '简介', value: navifox.descriptionPure ?? '', isPureCode: true },
    { title: '签名', value: navifox.status || '' },
    { title: '头像', value: navifox.avatar512 || '', isPureCode: true },
    { title: '头像', value: navifox.avatar256 || '', isPureCode: true },
    { title: '头像', value: navifox.avatar || '', isPureCode: true },
    { title: '主页', value: navifox.text },
    { title: '主页', value: navifox.link, isPureCode: true },
    { title: '博客', value: navifoxBlog.text },
    { title: '博客', value: navifoxBlog.link, isPureCode: true },
];

function friendHost(friend: Friend): string {
    try {
        return new URL(friend.link).host;
    } catch {
        return friend.link;
    }
}

function friendMeetLabel(friend: Friend): string | undefined {
    return friend.meet ? format(friend.meet, 'yyyy/M/d') : undefined;
}
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
                    <HoverCardRoot v-for="friend in friends" :key="friend.text" :open-delay="200" :close-delay="100">
                        <HoverCardTrigger as-child>
                            <a
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
                                            avatarShapeClass(friend.avatarShape),
                                        ]"
                                    >
                                        <AvatarImage
                                            :src="friend.avatar ?? ''"
                                            :alt="friend.author"
                                            class="size-full object-cover"
                                            decoding="async"
                                        />
                                        <AvatarFallback class="flex size-full items-center justify-center">
                                            <PawOff class="text-6xl" aria-hidden="true" />
                                        </AvatarFallback>
                                    </AvatarRoot>

                                    <div class="min-w-0 flex-1">
                                        <div class="flex items-center gap-1">
                                            <h2
                                                v-if="friend.author"
                                                class="text-night-900 flex min-w-0 flex-1 items-center gap-1 text-lg font-bold tracking-tight dark:text-white"
                                            >
                                                <!-- 站点名与拥有者各自独立截断：省略号由被截断者自己的文本框绘制，
                                                     若两者同处一个截断框内，省略号会统一取拥有者那一档颜色。 -->
                                                <span class="max-w-full shrink-0 truncate">{{ friend.author }}</span>
                                                <span
                                                    class="text-starlight-400 min-w-0 truncate dark:text-slate-500"
                                                    v-html="friend.deck || friend.text"
                                                />
                                            </h2>
                                            <h2
                                                v-else
                                                v-html="friend.text"
                                                class="text-night-900 min-w-0 flex-1 truncate text-lg font-bold tracking-tight dark:text-white"
                                            />
                                        </div>
                                        <ul
                                            v-if="friend.tags?.length"
                                            class="mt-1 flex flex-wrap gap-x-2 text-sm text-stone-400 dark:text-slate-500"
                                        >
                                            <li v-for="tag in friend.tags" :key="tag">
                                                <span class="mr-0.5">#</span>{{ tag }}
                                            </li>
                                        </ul>
                                    </div>
                                    <IconArrowOutward
                                        :class="[
                                            'size-4.5 shrink-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100',
                                            friendAccents[friend.type].arrow,
                                        ]"
                                    />
                                </div>
                            </a>
                        </HoverCardTrigger>

                        <!-- 悬停卡必须走 Portal：卡片自己有 overflow-hidden，
                             内容留在原地会被裁掉；Portal 之后由 Popper 以 fixed 定位到 body 下。
                             出入场动画落在内容元素自身（keyframes 见 style.css）：
                             定位用的 transform 在外面那层 wrapper 上，不能连它一起动。
                             reka-ui 的 Presence 会等动画跑完再卸载，淡出因此不会被截断。 -->
                        <HoverCardPortal>
                            <HoverCardContent
                                side="top"
                                :side-offset="10"
                                class="border-starlight-500/25 bg-paper-50/95 dark:bg-night-900/95 shadow-night-950/10 dark:shadow-night-950/40 relative z-50 w-80 max-w-[calc(100vw-2rem)] overflow-hidden rounded-2xl border p-4 shadow-xl backdrop-blur-xl data-[state=closed]:animate-[hover-card-out_0.14s_ease-in] data-[state=open]:animate-[hover-card-in_0.16s_ease-out] dark:border-white/10"
                            >
                                <!-- 上半：小尺寸头像＋正副标题，右下角交代链接指向的主机名。 -->
                                <div class="flex items-center gap-3">
                                    <AvatarRoot
                                        :class="[
                                            'flex size-10 shrink-0 items-center justify-center overflow-hidden text-stone-400',
                                            avatarShapeClass(friend.avatarShape),
                                        ]"
                                    >
                                        <AvatarImage
                                            :src="friend.avatar ?? ''"
                                            :alt="friend.author"
                                            class="size-full object-cover"
                                            decoding="async"
                                        />
                                        <AvatarFallback class="flex size-full items-center justify-center">
                                            <PawOff class="text-4xl" aria-hidden="true" />
                                        </AvatarFallback>
                                    </AvatarRoot>
                                    <div class="min-w-0">
                                        <p
                                            class="text-night-900 truncate text-base font-bold tracking-tight dark:text-white"
                                        >
                                            {{ friend.author ?? friend.text }}
                                            <span
                                                v-if="friend.deck"
                                                class="text-starlight-400 font-normal dark:text-slate-500"
                                                v-html="friend.deck"
                                            />
                                        </p>
                                        <p
                                            v-if="friendHost(friend)"
                                            class="truncate font-mono text-sm text-stone-400 dark:text-slate-500"
                                            v-html="friendHost(friend)"
                                        />
                                    </div>
                                </div>

                                <!-- 下半：简介与评论各占一行，都按整段排——不截断，长句自己折行。 -->
                                <div
                                    v-if="website.description(friend, friend.status) || friend.note"
                                    class="mt-3 flex flex-col gap-2"
                                >
                                    <p
                                        v-if="website.description(friend, friend.status)"
                                        class="text-sm leading-relaxed break-words text-stone-600 dark:text-slate-300"
                                        v-html="website.description(friend, friend.status)"
                                    />
                                    <p
                                        v-if="friend.note"
                                        class="flex items-start gap-1.5 text-sm leading-relaxed text-stone-500 dark:text-slate-400"
                                    >
                                        <IconComment class="size-5.5 shrink-0" aria-hidden="true" />
                                        <span class="min-w-0 break-words" v-html="friend.note" />
                                    </p>
                                </div>

                                <span
                                    v-if="friendMeetLabel(friend)"
                                    aria-hidden="true"
                                    class="text-night-900/10 pointer-events-none absolute right-2 -bottom-3 text-5xl leading-none font-bold whitespace-nowrap select-none dark:text-white/10"
                                    v-html="friendMeetLabel(friend)"
                                />
                            </HoverCardContent>
                        </HoverCardPortal>
                    </HoverCardRoot>
                </div>
            </section>

            <section aria-label="狐狐的友链信息" class="mx-auto mb-32 max-w-md">
                <SectionHeader centered eyebrow="Navifox · Meta-Information" title="狐狐的友链信息" />
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
