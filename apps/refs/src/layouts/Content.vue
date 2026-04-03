<script lang="ts" setup>
import NavBar from '#/components/NavBar.vue';
import NavDropdown from '#/components/NavDropdown.vue';
import { AiFooter } from '@navifox/ui';
import { useTemplateRef } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()
const navbar = useTemplateRef('navbar')
</script>


<template>
<header ref="navbar" class="relative z-10">
    <NavBar class="MaxContainer z-20" />
</header>
<NavDropdown />
<div :style="{minHeight: `calc(100vh - ${navbar?.getBoundingClientRect().height}px)`}" class="mx-auto md:py-5">
    <div class="flex flex-col w-full mx-auto items-center text-center my-8">
        <div class="MaxContainer w-full">
            <slot name="headers">
                <div v-if="route.meta.title" class="text-5xl mb-4">
                    <span class="text-slate-700 dark:text-slate-300 font-light">{{ route.meta.title }}</span>
                </div>
                <div v-if="route.meta.description" class="lg:w-3/5 mx-auto intro leading-relaxed text-slate-600">
                    <p>{{ route.meta.description }}</p>
                </div>
                <div v-if="$slots.buttons" class="flex flex-wrap items-center justify-center gap-3 mt-6 mb-8">
                    <slot name="buttons"></slot>
                </div>
            </slot>
        </div>
    </div>
    <slot></slot>
</div>
<AiFooter class="md:mt-14" />
</template>
