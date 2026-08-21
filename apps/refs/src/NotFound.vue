<script lang="ts" setup>
import { AiFooter } from '@navifox/ui';
import { useTemplateRef } from 'vue';

import NotFoundAnimation from '#/assets/notfound.gif';
import NavBar from '#/components/NavBar.vue';
import NavDropdown from '#/components/NavDropdown.vue';

const navbar = useTemplateRef('navbar');
</script>

<template>
    <header ref="navbar" class="relative z-10">
        <NavBar class="MaxContainer z-20" />
    </header>
    <NavDropdown />
    <div :style="{ minHeight: `calc(100vh - ${navbar?.getBoundingClientRect().height}px)` }" class="flex">
        <div class="m-auto flex h-full flex-col items-center justify-center text-slate-600 dark:text-slate-400">
            <img :src="NotFoundAnimation" alt="Animation" class="max-w-64" style="width: calc(100vw - 4rem)" />
            <h2 class="mt-8 text-2xl">页面不存在</h2>
            <h3 class="mt-1 text-lg">Page Not Found</h3>
        </div>
    </div>
    <AiFooter />
</template>
