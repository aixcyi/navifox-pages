<script lang="ts" setup>
import { Icon } from '@iconify/vue/offline';
import { useDark, useToggle } from '@vueuse/core';

const isDark = useDark();
const toggleDark = useToggle(isDark);
</script>

<template>
    <button
        :title="isDark ? '切换到浅色模式' : '切换到深色模式'"
        class="hover:text-starlight-600 dark:hover:text-starlight-300 flex size-9 cursor-pointer items-center justify-center rounded-full text-stone-500 transition-colors duration-200 dark:text-slate-300"
        type="button"
        @click="toggleDark(!isDark)"
    >
        <Icon :icon="isDark ? 'material-symbols:dark-mode' : 'material-symbols:light-mode'" height="20" />
    </button>
</template>
