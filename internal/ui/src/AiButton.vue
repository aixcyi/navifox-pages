<script lang="ts" setup>
import { useClipboard } from '@vueuse/core';
import IconCheck from '~icons/material-symbols/check';

const { copy, copied } = useClipboard();
const props = defineProps<{
    text: string;
    mark?: string;
    coffee?: boolean;
    inner?: boolean;
    copytext?: string;
    use?: string;
}>();
let classes: string;
switch (true) {
    case props.inner && props.coffee:
        classes =
            'bg-gradient-to-r from-orange-500/20 to-yellow-500/20 outline-orange-300/40 hover:from-orange-500/30 hover:to-yellow-500/30';
        break;
    case !props.inner && props.coffee:
        classes =
            'bg-gradient-to-r from-orange-500/10 to-yellow-500/10 outline-orange-300/30 hover:from-orange-500/20 hover:to-yellow-500/20';
        break;
    case props.inner && !props.coffee:
        classes =
            'bg-slate-100 outline-slate-200 dark:bg-slate-700 dark:outline-slate-600 hover:bg-slate-200 dark:hover:bg-slate-600';
        break;
    default:
        classes =
            'bg-white outline-slate-200 dark:bg-slate-800 dark:outline-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700';
}
</script>

<template>
    <component
        :is="use ?? (copytext ? 'button' : 'a')"
        :class="classes"
        class="group inline-flex h-9 cursor-pointer items-center justify-center rounded-3xl px-4 text-slate-700 outline backdrop-blur-sm transition-all duration-200 hover:scale-105 dark:text-slate-300"
        @click="copytext ? copy(copytext) : null"
    >
        <span class="text-sm leading-none font-medium">{{ text }}</span>
        <div v-if="copytext && copied" class="ml-2 flex h-4 w-4 flex-shrink-0 items-center justify-center">
            <IconCheck class="size-4" />
        </div>
        <div v-if="mark" class="ml-3 rounded-3xl bg-white/20 px-2 py-1 font-mono text-xs leading-none">
            {{ mark }}<br />
        </div>
    </component>
</template>
