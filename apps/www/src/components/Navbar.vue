<script lang="ts" setup>
import { Icon } from '@iconify/vue';
import { useRouter } from 'vue-router';

import { isShowingNavDropdownMenu } from '#/storage.ts';

defineProps<{ cover?: boolean }>();

const router = useRouter();
</script>

<template>
    <div v-if="cover" class="w-full">
        <div class="MaxContainer **:transition-colors **:duration-200 selection:bg-[#B5A2FD60]">
            <div class="flex justify-end md:hidden">
                <button
                    class="cursor-pointer p-5 hover:text-purple-400 dark:hover:text-[#B5A2FD]"
                    @click="isShowingNavDropdownMenu = true"
                >
                    <Icon height="28" icon="lineicons:menu" />
                </button>
            </div>
            <div class="hidden flex-nowrap justify-end gap-4 md:flex">
                <a
                    v-for="{ meta, path } in router.options.routes.filter((r) => r.meta?.showOnNavbar)"
                    :href="path"
                    class="px-6 py-5 hover:bg-[#B5A2FDA0] hover:text-orange-200 dark:hover:bg-[#B5A2FD50] dark:hover:text-orange-300"
                >
                    {{ meta?.title ?? '首页' }}
                </a>
            </div>
        </div>
    </div>
    <div v-else class="w-full bg-white text-slate-800 dark:bg-slate-800 dark:text-white">
        <div class="MaxContainer **:transition-colors **:duration-200 selection:bg-[#B5A2FD60]">
            <div class="flex justify-end md:hidden">
                <button
                    class="cursor-pointer p-5 hover:text-purple-400 dark:hover:text-[#B5A2FD]"
                    @click="isShowingNavDropdownMenu = true"
                >
                    <Icon height="28" icon="lineicons:menu" />
                </button>
            </div>
            <div class="hidden flex-nowrap justify-end gap-4 md:flex">
                <a
                    v-for="{ meta, path } in router.options.routes.filter((r) => r.meta?.showOnNavbar)"
                    :href="path"
                    class="px-6 py-5 hover:bg-cyan-200 hover:text-cyan-600 dark:hover:bg-[#B5A2FD50] dark:hover:text-orange-300"
                >
                    {{ meta?.title ?? '首页' }}
                </a>
            </div>
        </div>
    </div>
</template>
