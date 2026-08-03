<script lang="ts" setup>
import Background from '#/assets/background.jpg';
import Navbar from '#/components/Navbar.vue';
import NavDropdownMenu from '#/components/NavDropdownMenu.vue';
import { signature, tighnari } from '@navifox/constants';
import { logger } from '@navifox/utils';

logger.draw(signature, '#459199');
</script>

<template>
    <img :src="Background" alt="背景图片" class="absolute z-0 size-full object-cover select-none" />
    <div class="absolute z-10 size-full bg-black/33 dark:bg-black/67" />
    <Navbar class="absolute right-0 z-30" cover />
    <NavDropdownMenu class="fixed right-0 z-40" />
    <div class="MaxContainer z-20 flex h-screen flex-col **:z-20 selection:bg-[#B5A2FD60]">
        <div class="mb-8 flex h-full flex-col justify-end md:mb-20">
            <div
                class="mb-4 w-fit rounded-md py-1 text-xl not-dark:bg-[#B5A2FDA0] not-dark:px-2 md:text-2xl dark:text-[#B5A2FD]"
            >
                <code>@{{ tighnari.uid }}</code>
            </div>
            <div class="text-4xl font-medium md:max-w-[75%] md:text-6xl">
                <span class="text-white">{{ tighnari.name }}</span>
                <span v-for="tag in tighnari.tags" class="text-gray-300/75 dark:text-gray-400/75">／{{ tag }}</span>
            </div>
            <div
                class="font-sign mt-4 text-4xl text-white md:text-5xl dark:text-gray-300"
                v-html="tighnari.descriptionRich"
            />
        </div>
    </div>
</template>
