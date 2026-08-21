<script lang="ts" setup>
import { Icon } from '@iconify/vue';
import { onClickOutside } from '@vueuse/core';
import { useTemplateRef } from 'vue';
import { useRouter } from 'vue-router';

import { isShowingNavDropdownMenu } from '#/storage.ts';

const dropdown = useTemplateRef('dropdown');
const router = useRouter();

onClickOutside(dropdown, () => (isShowingNavDropdownMenu.value = false));
</script>

<template>
    <div ref="dropdown" class="w-full md:hidden">
        <Transition>
            <div
                v-if="isShowingNavDropdownMenu"
                class="rounded-t-lg bg-slate-200 text-slate-900 dark:bg-slate-800 dark:text-slate-200"
            >
                <div
                    class="MaxContainer flex flex-col items-end **:transition-colors **:duration-200 selection:bg-[#B5A2FD60]"
                >
                    <button
                        class="cursor-pointer p-5 hover:text-purple-400 dark:hover:text-[#B5A2FD]"
                        @click="isShowingNavDropdownMenu = false"
                    >
                        <Icon height="28" icon="lineicons:close" />
                    </button>
                    <div class="flex w-full flex-col gap-px">
                        <template
                            v-for="({ meta, path }, index) in router.options.routes.filter((r) => r.meta?.showOnNavbar)"
                        >
                            <div v-if="index > 0" class="border-t border-t-slate-300 dark:border-t-slate-700" />
                            <a
                                :href="path"
                                class="p-5 text-nowrap hover:text-purple-400 dark:hover:text-[#B5A2FD]"
                                target="_blank"
                                v-html="meta?.title ?? '首页'"
                            />
                        </template>
                    </div>
                </div>
            </div>
        </Transition>
    </div>
</template>

<!--suppress CssUnusedSymbol-->
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
