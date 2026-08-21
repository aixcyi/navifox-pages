<script lang="ts" setup>
import { AiFooter } from '@navifox/ui';
import { useTemplateRef } from 'vue';
import { useRoute } from 'vue-router';

import NavBar from '#/components/NavBar.vue';
import NavDropdown from '#/components/NavDropdown.vue';

const route = useRoute();
const navbar = useTemplateRef('navbar');
</script>

<template>
    <header ref="navbar" class="relative z-10">
        <NavBar class="MaxContainer z-20" />
    </header>
    <NavDropdown />
    <div :style="{ minHeight: `calc(100vh - ${navbar?.getBoundingClientRect().height}px)` }" class="mx-auto md:py-5">
        <div class="mx-auto my-8 flex w-full flex-col items-center text-center">
            <div class="MaxContainer w-full">
                <slot name="headers">
                    <div v-if="route.meta.title" class="mb-4 text-5xl">
                        <span class="font-light text-slate-700 dark:text-slate-300">{{ route.meta.title }}</span>
                    </div>
                    <div v-if="route.meta.description" class="intro mx-auto leading-relaxed text-slate-600 lg:w-3/5">
                        <p>{{ route.meta.description }}</p>
                    </div>
                    <div v-if="$slots.buttons" class="mt-6 mb-8 flex flex-wrap items-center justify-center gap-3">
                        <slot name="buttons"></slot>
                    </div>
                </slot>
            </div>
        </div>
        <slot></slot>
    </div>
    <AiFooter class="md:mt-14" />
</template>
