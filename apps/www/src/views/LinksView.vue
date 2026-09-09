<script lang="ts" setup>
import { Icon } from '@iconify/vue';
import { feeds, pixels } from '@navifox/constants';
import type { Anchor, Website } from '@navifox/types';
import { onMounted } from 'vue';

import LinkIcon from '#/assets/AkarIconsLinkOut.svg';
import AnchorHeading from '#/components/AnchorHeading.vue';
import Navbar from '#/components/Navbar.vue';
import Stardust from '#/components/Stardust.vue';

/** 友链页可渲染区块：滚动目标须为元素 id（URL fragment），且附带网站列表。 */
type LinkpageAnchor = Anchor & { id: string; websites: Website[] };

const anchors: Anchor[] = [
    {
        id: 'feeds',
        title: '航路节点',
        eyebrow: 'Navifox · Feeds',
        websites: feeds,
    },
    {
        id: 'pixels',
        eyebrow: 'Network · Friends',
        title: '网上友邻',
        websites: pixels,
    },
];

/** 友链页区块（本页数据均满足约束，过滤仅用于类型收窄）。 */
const sections = anchors.filter(
    (anchor): anchor is LinkpageAnchor => typeof anchor.id === 'string' && Boolean(anchor.websites),
);

/** 带 URL fragment（如 /friends#friends）直达时的兜底滚动。 */
onMounted(() => {
    if (location.hash) document.querySelector(location.hash)?.scrollIntoView({ behavior: 'smooth' });
});
</script>

<template>
    <div class="bg-paper-50 dark:bg-night-950 relative min-h-dvh">
        <Navbar />
        <div class="MaxContainer relative text-stone-600 dark:text-slate-300">
            <template v-for="(sec, index) in sections" :key="sec.id">
                <section :id="sec.id" :class="['max-w-2xl scroll-mt-28', index === 0 ? 'mt-48' : 'mt-24']">
                    <p
                        class="text-starlight-600 dark:text-starlight-300 font-mono text-[0.72rem] tracking-[0.28em] uppercase"
                    >
                        {{ sec.eyebrow }}
                    </p>
                    <h1 class="text-night-900 mt-3 text-3xl font-bold tracking-tight sm:text-4xl dark:text-white">
                        <AnchorHeading :id="sec.id" :text="sec.title" />
                    </h1>
                    <p class="mt-3 leading-relaxed text-stone-500 dark:text-slate-300">{{ sec.description }}</p>
                </section>

                <div
                    :class="[
                        'grid gap-6 sm:grid-cols-2 lg:grid-cols-3',
                        index === sections.length - 1 ? 'mt-12 mb-32' : 'mt-12',
                    ]"
                >
                    <a
                        v-for="friend in sec.websites"
                        :key="friend.name"
                        :href="friend.link"
                        class="border-starlight-500/20 group hover:border-starlight-500/50 hover:shadow-starlight-600/10 relative rounded-3xl border bg-white/70 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-white/5"
                        target="_blank"
                    >
                        <div class="flex items-center gap-4">
                            <img
                                :src="friend.icon"
                                :alt="friend.name"
                                class="size-12 shrink-0 rounded-2xl object-cover"
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
                            >
                                {{ friend.name }}
                            </h2>
                            <Icon
                                class="text-starlight-500 dark:text-starlight-300 shrink-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                                height="18"
                                icon="material-symbols:arrow-outward"
                            />
                        </div>
                        <p
                            v-if="friend.description"
                            class="mt-4 text-sm leading-relaxed text-stone-500 dark:text-slate-300"
                        >
                            {{ friend.description }}
                        </p>
                    </a>
                </div>
            </template>
        </div>
        <Stardust />
    </div>
</template>
