<script lang="ts" setup>
import { signature, tighnari } from '@navifox/constants';
import { logger } from '@navifox/utils';

import Background from '#/assets/background.jpg';
import Navbar from '#/components/Navbar.vue';
import NavDropdownMenu from '#/components/NavDropdownMenu.vue';

logger.draw(signature, '#459199');
</script>

<template>
    <img :src="Background" alt="背景图片" class="fixed z-0 size-full object-cover select-none" />
    <div class="fixed z-10 size-full bg-black/33 dark:bg-black/67" />
    <!-- 星夜氛围渐变 -->
    <div
        class="from-night-950/55 fixed inset-0 z-10 bg-gradient-to-t via-transparent to-transparent dark:from-black/40 dark:via-transparent"
    />
    <Navbar cover />
    <NavDropdownMenu class="fixed inset-x-0 top-0 z-50" />
    <div class="MaxContainer selection:bg-starlight-400/40 z-20 flex h-screen flex-col **:z-20">
        <div class="mb-8 flex h-full flex-col justify-end md:mb-20">
            <div
                class="border-starlight-100/40 bg-starlight-400/25 text-starlight-100 dark:border-starlight-300/30 dark:bg-starlight-400/10 dark:text-starlight-300 mb-4 w-fit rounded-lg border px-3 py-1 text-xl backdrop-blur-sm md:text-2xl"
            >
                <code>@{{ tighnari.uid }}</code>
            </div>
            <div class="text-4xl font-medium md:max-w-[75%] md:text-6xl">
                <span class="text-white">{{ tighnari.name }}</span>
                <span v-for="tag in tighnari.tags" class="text-gray-300/75 dark:text-gray-400/75">／{{ tag }}</span>
            </div>
            <div
                class="font-sign text-starlight-200 dark:text-starlight-300 mt-4 text-4xl md:text-5xl"
                v-html="tighnari.descriptionRich"
            />
        </div>
    </div>
</template>
