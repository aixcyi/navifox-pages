<script lang="ts" setup>
import { navifox } from '@navifox/constants';
import { FluentEmojiFox, Markdown } from '@navifox/ui';
import { beforeLabel, format } from '@navifox/utils/dnt';
import { AvatarFallback, AvatarImage, AvatarRoot } from 'reka-ui';
import { computed } from 'vue';

import type { Moment } from '#/data/moments';

interface Props {
    /** 要展示的碎碎念。 */
    moment: Moment;
}

const props = defineProps<Props>();

/** 精确时间，作为悬停时的提示。 */
const absoluteTime = computed(() => format(props.moment.postAt, 'yyyy/M/d H:mm'));

/** 相对时间标签（今天／昨天／N 天前）。 */
const relativeTime = computed(() => beforeLabel(props.moment.postAt));
</script>

<template>
    <article
        class="GlassCard hover:shadow-starlight-600/10 group relative overflow-hidden p-6 transition-shadow duration-300 hover:shadow-lg"
    >
        <header class="flex items-center gap-3">
            <AvatarRoot class="size-11 shrink-0 overflow-hidden rounded-full">
                <AvatarImage
                    :src="navifox.avatar ?? ''"
                    :alt="navifox.author"
                    class="size-full object-cover"
                    loading="lazy"
                    decoding="async"
                />
                <AvatarFallback class="flex size-full items-center justify-center">
                    <FluentEmojiFox class="size-7.5" />
                </AvatarFallback>
            </AvatarRoot>
            <div class="min-w-0 flex-1">
                <h2 class="text-night-900 truncate text-sm font-bold dark:text-white">{{ navifox.author }}</h2>
                <p class="text-xs text-stone-400 dark:text-slate-500">
                    <time :datetime="moment.postAt.toISOString()">{{ relativeTime }}</time>
                    <span v-if="moment.location"> · {{ moment.location }}</span>
                </p>
            </div>
        </header>

        <div class="Content mt-4 text-sm leading-relaxed text-stone-600 dark:text-slate-300">
            <Markdown :text="moment.content" />
        </div>

        <div v-if="moment.images?.length" class="mt-4 grid gap-2">
            <img
                v-for="image in moment.images"
                :key="image.src"
                :src="image.src"
                :alt="image.alt"
                class="max-w-full rounded-2xl select-none"
                loading="lazy"
                decoding="async"
                draggable="false"
            />
        </div>

        <ul v-if="moment.tags?.length" class="mt-4 flex flex-wrap gap-2">
            <li
                v-for="tag in moment.tags"
                :key="tag"
                class="border-starlight-500/25 text-starlight-600 dark:text-starlight-300 rounded-full border px-2.5 py-0.5 text-xs"
            >
                # {{ tag }}
            </li>
        </ul>

        <span
            aria-hidden="true"
            class="text-night-900/10 pointer-events-none absolute right-2 -bottom-4 text-6xl leading-none font-bold whitespace-nowrap opacity-0 transition-opacity duration-300 select-none group-hover:opacity-100 dark:text-white/10"
            v-html="absoluteTime"
        />
    </article>
</template>
