<script lang="ts" setup>
import { AiFooter } from '@navifox/ui';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

import Background from '#/assets/background.jpg';
import BackToTopButton from '#/components/BackToTopButton.vue';

const version = __APP_VERSION__;

const route = useRoute();

/**
 * 首页壁纸与遮罩是否可见。
 *
 * 这三层固定在 App 中常驻、只切换透明度，而不是随 HomeView 一起销毁重建：
 * 每次重新挂载都意味着一次新的合成层纹理上传，实测切回首页时会出现「文字已渲染、壁纸整层未绘制」
 * 的黑帧（详见 zoo.0911b.www-gpu/REPORT.md）。其余页面的根元素本身有实色底，不受影响。
 */
const isHome = computed(() => route.name === 'Homepage');
</script>

<template>
    <div
        class="pointer-events-none fixed inset-0 z-0 select-none"
        :class="isHome ? 'opacity-100' : 'opacity-0'"
        aria-hidden="true"
    >
        <img
            :src="Background"
            alt="背景图片"
            :fetchpriority="isHome ? 'high' : 'low'"
            decoding="sync"
            class="size-full object-cover"
        />
        <div class="absolute inset-0 bg-black/33 dark:bg-black/67" />
        <!-- 星夜氛围渐变（浅色模式交给遮罩，深色模式额外压暗） -->
        <div
            class="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-transparent dark:from-black/40"
        />
    </div>
    <RouterView />
    <AiFooter class="relative z-30">
        <template #additions>
            <p>
                构建为 <code>{{ version }}</code>
            </p>
        </template>
    </AiFooter>
    <BackToTopButton />
</template>
