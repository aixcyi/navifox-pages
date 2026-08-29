<script lang="ts" setup>
import { Icon } from '@iconify/vue';
import { navifoxHome } from '@navifox/constants';
import { onClickOutside } from '@vueuse/core';
import { nextTick, useTemplateRef } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { sectionAnchors } from '#/anchors.ts';
import { isShowingNavDropdownMenu } from '#/storage.ts';

const dropdown = useTemplateRef('dropdown');
const route = useRoute();
const router = useRouter();

async function goSection(id: string) {
    if (route.path !== '/') {
        await router.push('/');
        await nextTick();
    }
    isShowingNavDropdownMenu.value = false;
    if (id === 'top') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

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
                        <template v-for="(anchor, index) in sectionAnchors" :key="anchor.id">
                            <div v-if="index > 0" class="border-t-starlight-500/20 border-t dark:border-t-white/10" />
                            <button
                                :class="
                                    index === 0
                                        ? 'text-starlight-600 dark:text-starlight-300 font-semibold'
                                        : 'hover:text-starlight-600 dark:hover:text-starlight-300'
                                "
                                class="cursor-pointer p-4 text-left text-nowrap"
                                type="button"
                                @click="goSection(anchor.id)"
                            >
                                {{ anchor.title }}
                            </button>
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
