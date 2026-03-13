<script lang="ts" setup>
import AiFooter from '#/components/AiFooter.vue';
import NavBar from '#/components/NavBar.vue';
import NavDropdown from '#/components/NavDropdown.vue';
import { useRoute } from 'vue-router';

const route = useRoute()
</script>


<template>
<header class="relative z-10">
    <NavBar class="MaxContainer z-20" />
</header>
<NavDropdown />
<div class="mx-auto flex flex-wrap md:py-5 flex-col md:flex-row items-center">
    <div class="flex flex-col w-full mx-auto items-center text-center my-8">
        <div class="MaxContainer w-full">
            <slot name="headers">
                <div class="text-5xl mb-4">
                    <span class="text-slate-700 dark:text-slate-300 font-light">{{ route.meta.title }}</span>
                </div>
                <div class="lg:w-3/5 mx-auto intro leading-relaxed text-slate-600">
                    <p>{{ route.meta.description }}</p>
                </div>
                <div class="flex flex-wrap items-center justify-center gap-3 mt-6 mb-8 *:cursor-pointer">
                    <slot name="buttons"></slot>
                </div>
            </slot>
        </div>
    </div>
    <slot></slot>
</div>
<AiFooter />
</template>
