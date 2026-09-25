<script lang="ts" setup>
/**
 * 项目展示区块：整屏一节，角落里是发行类型的水印图标，中间自上而下是序号、名称、社交徽章与简介。
 *
 * 水印与社交徽章都由调用方经插槽传入——它们是编译期图标组件，不再由数据里的图标名决定；
 * 传进来的水印会按外层盒子缩放（`[&>svg]:size-full`），所以调用方不必自己定尺寸。
 */
import type { Website } from '@navifox/types';
import { website } from '@navifox/utils';
import IconArrowOutward from '~icons/material-symbols/arrow-outward';

defineProps<{
    /** 要展示的项目。 */
    project: Website;

    /** 项目序号（从 0 起）：既决定深浅交替的底色，也渲染成 `Project · NN`。 */
    index: number;
}>();
</script>

<template>
    <section
        :class="[
            index % 2 ? 'bg-paper-100 dark:bg-night-900' : 'dark:bg-night-850 bg-white',
            'js-panel relative flex h-screen w-full items-center justify-center overflow-hidden',
        ]"
    >
        <div
            v-if="$slots.releaseType"
            aria-hidden="true"
            class="text-night-900 pointer-events-none absolute bottom-6 left-6 opacity-[0.12] select-none md:bottom-14 md:left-14 dark:text-white [&>svg]:size-full"
            style="--size: calc(min(100vh, 100vw) / 3); width: var(--size); height: var(--size)"
        >
            <slot name="releaseType" />
        </div>
        <div class="relative z-10 flex w-full max-w-3xl flex-col items-center gap-7 px-6 py-24 text-center">
            <p
                class="text-starlight-600/80 dark:text-starlight-300/80 font-mono text-xs tracking-[0.28em] uppercase"
                v-html="`Project · ${String(index + 1).padStart(2, '0')}`"
            />
            <h2 class="text-night-900 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl dark:text-white">
                {{ project.text }}
            </h2>
            <div class="dark:text-starlight-300/80 flex items-center gap-6 text-stone-500">
                <slot name="socials" />
            </div>
            <p
                v-if="website.description(project)"
                class="max-w-xl text-base leading-relaxed sm:text-lg"
                v-html="website.description(project)"
            />
            <template v-if="project.documentationUrl">
                <a
                    :href="project.documentationUrl"
                    class="from-starlight-500 to-aurora-500 shadow-starlight-600/30 inline-flex items-center gap-2 rounded-full bg-gradient-to-r px-7 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:brightness-110 dark:text-black"
                    target="_blank"
                >
                    <span v-html="'浏览文档'" />
                    <IconArrowOutward class="size-4" />
                </a>
            </template>
        </div>
    </section>
</template>
