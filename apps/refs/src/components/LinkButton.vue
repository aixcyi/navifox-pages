<script lang="ts" setup>
import { Icon } from '@iconify/vue';

defineProps<{ text: string, icon?: string, mark?: string, coffee?: boolean }>()
</script>


<template>
<a :class="coffee
 ? 'bg-gradient-to-r from-orange-500/10 to-yellow-500/10 outline-orange-300/30 hover:from-orange-500/20 hover:to-yellow-500/20'
 : 'bg-white outline-slate-200 dark:bg-slate-800 dark:outline-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'"
   class="group inline-flex items-center justify-center h-9 px-4 backdrop-blur-sm outline rounded-3xl transition-all duration-200 hover:scale-105 text-slate-700 dark:text-slate-300">
    <div v-if="icon" class="w-4 h-4 flex-shrink-0 flex items-center justify-center mr-2">
        <Icon :icon height="1em" />
    </div>
    <span class="text-sm font-medium leading-none">{{ text }}</span>
    <div v-if="mark"
         class="ml-3 px-2 py-1 bg-white/20 rounded-3xl text-xs font-mono leading-none">{{ mark }}<br />
    </div>
</a>
</template>
