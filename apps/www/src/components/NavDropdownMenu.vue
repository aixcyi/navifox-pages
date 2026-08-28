<script lang="ts" setup>
import { Icon } from '@iconify/vue';
import { navifoxHome } from '@navifox/constants';
import { onClickOutside } from '@vueuse/core';
import { computed, useTemplateRef } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { isShowingNavDropdownMenu } from '#/storage.ts';

const dropdown = useTemplateRef('dropdown');
const route = useRoute();
const router = useRouter();

const links = computed(() =>
    router.options.routes
        .filter((r) => r.meta?.showOnNavbar)
        .map(({ meta, path }) => ({
            title: (meta?.title as string | undefined) ?? '首页',
            path,
            isActive: path === route.path,
        })),
);

onClickOutside(dropdown, () => (isShowingNavDropdownMenu.value = false));
</script>

<template>
    <div ref="dropdown" class="w-full md:hidden">
        <Transition>
            <div
                v-if="isShowingNavDropdownMenu"
                class="border-starlight-500/20 bg-paper-50/90 dark:bg-night-900/90 border-b text-stone-800 shadow-lg backdrop-blur-md dark:border-white/10 dark:text-slate-200"
            >
                <div
                    class="MaxContainer selection:bg-starlight-400/40 flex flex-col **:transition-colors **:duration-200"
                >
                    <div class="flex items-center justify-between">
                        <span class="flex items-center gap-2 text-lg font-bold whitespace-nowrap">
                            <Icon class="text-2xl" icon="fluent-emoji:fox" />
                            <span>{{ navifoxHome.name }}</span>
                        </span>
                        <button
                            class="hover:text-starlight-600 dark:hover:text-starlight-300 cursor-pointer p-3"
                            aria-label="关闭导航菜单"
                            @click="isShowingNavDropdownMenu = false"
                        >
                            <Icon height="24" icon="lineicons:close" />
                        </button>
                    </div>
                    <div class="flex w-full flex-col gap-px pb-4">
                        <template v-for="({ title, path, isActive }, index) in links">
                            <div v-if="index > 0" class="border-t-starlight-500/20 border-t dark:border-t-white/10" />
                            <RouterLink
                                :to="path"
                                :class="[
                                    'p-4 text-nowrap',
                                    isActive
                                        ? 'text-starlight-600 dark:text-starlight-300 font-semibold'
                                        : 'hover:text-starlight-600 dark:hover:text-starlight-300',
                                ]"
                                v-html="title"
                                @click="isShowingNavDropdownMenu = false"
                            />
                        </template>
                    </div>
                </div>
            </div>
        </Transition>
    </div>
</template>

<!-- suppress CssUnusedSymbol -->
<style scoped>
.v-enter-active {
    transition: all 0.3s ease-out;
}

.v-leave-active {
    transition: all 0.3s ease-out;
}

.v-enter-from,
.v-leave-to {
    transform: translateY(-20px);
    opacity: 0;
}
</style>
