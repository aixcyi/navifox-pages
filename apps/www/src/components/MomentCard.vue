<script lang="ts" setup>
import { navifox } from '@navifox/constants';
import { FluentEmojiFox, Markdown } from '@navifox/ui';
import { beforeLabel, format } from '@navifox/utils/dnt';
import { AvatarFallback, AvatarImage, AvatarRoot } from 'reka-ui';
import { computed } from 'vue';

import type { Moment } from '#/data/moments';

const props = defineProps<{ moment: Moment }>();
const relativeTime = computed(() => beforeLabel(props.moment.postAt));
const absoluteTime = computed(() =>
    // 1. “秒数”没什么意义，纵观所有时刻也很少有精确时候，所以不显示；
    // 2. 只判断“小时”和“分钟”为零，这样当遇到“真的00:00”的时候就可以基于第一点来正确显示。
    props.moment.postAt.getHours() === 0 && props.moment.postAt.getMinutes() === 0
        ? format(props.moment.postAt, 'yyyy/M/d')
        : format(props.moment.postAt, 'yyyy/M/d H:mm'),
);

/**
 * B 站「复制通用代码」给出的地址以 `//` 开头（协议相对地址），直接用作 `src` 时
 * 浏览器会按当前页面协议补全；这里显式补成 `https:` 以免站点将来走 `file:` 或 `http:` 时踩坑。
 * 其它形式的地址原样返回。
 */
function embedSrc(src: string): string {
    return src.startsWith('//') ? `https:${src}` : src;
}
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
                <h2 class="text-night-900 truncate font-bold dark:text-white">{{ navifox.author }}</h2>
                <p class="text-sm text-stone-400 dark:text-slate-500">
                    <time :datetime="moment.postAt.toISOString()">{{ relativeTime }}</time>
                    <span v-if="moment.location"> · {{ moment.location }}</span>
                </p>
            </div>
        </header>

        <div class="Content mt-4 text-sm leading-relaxed text-stone-600 dark:text-slate-300">
            <Markdown :text="moment.content" />
        </div>

        <div v-if="moment.videos?.length" class="mt-4 grid gap-2">
            <div
                v-for="video in moment.videos"
                :key="video.src"
                class="EmbedFrame relative aspect-video w-full overflow-hidden rounded-2xl"
            >
                <iframe
                    :src="embedSrc(video.src)"
                    :title="video.title"
                    class="absolute inset-0 size-full border-0"
                    scrolling="no"
                    frameborder="0"
                    framespacing="0"
                    allowfullscreen
                    allow="fullscreen; picture-in-picture"
                    referrerpolicy="no-referrer-when-downgrade"
                    loading="lazy"
                />
            </div>
        </div>

        <div v-if="moment.images?.length" class="mt-4 grid gap-2">
            <!-- 覆盖文字与图片同处一个 relative 容器，文字才能压在图片的右下角。 -->
            <div v-for="image in moment.images" :key="image.src" class="relative">
                <pre
                    v-if="image.text"
                    class="absolute right-4 bottom-3 z-1 text-nowrap text-neutral-200 [text-shadow:0_1px_3px_rgb(0_0_0/0.55)]"
                    >{{ image.text }}</pre
                >
                <!-- 浅色模式保持原样，深色模式默认压暗、悬停恢复全亮。
                     用的是卡片（`article` 上的 `group`）而非图片自身的 hover：
                     指针落在卡片任意位置都算「选中了这条动态」，整卡的配图一起亮起来；
                     亮度压过头会把画面本身涂掉，所以沿用首页时间线 `dark:opacity-50` 一档。 -->
                <img
                    :src="image.src"
                    :alt="image.alt"
                    class="block max-w-full rounded-2xl transition-opacity duration-500 select-none group-hover:opacity-100 dark:opacity-50"
                    loading="lazy"
                    decoding="async"
                    draggable="false"
                />
            </div>
        </div>

        <ul v-if="moment.tags?.length" class="mt-4 flex flex-wrap gap-2">
            <li
                v-for="tag in moment.tags"
                :key="tag"
                class="border-starlight-500/25 text-starlight-600 dark:text-starlight-300 text-sm"
            >
                <span class="mr-0.5">#</span>
                <span>{{ tag }}</span>
            </li>
        </ul>

        <span
            aria-hidden="true"
            class="text-night-900/10 pointer-events-none absolute right-2 -bottom-4 text-6xl leading-none font-bold whitespace-nowrap opacity-0 transition-opacity duration-300 select-none group-hover:opacity-100 dark:text-white/10"
            v-html="absoluteTime"
        />
    </article>
</template>
