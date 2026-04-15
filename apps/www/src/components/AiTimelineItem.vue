<script lang="ts" setup>
import { Markdown } from '@navifox/ui';

defineProps<{ color: string, color2?: string, last?: boolean, date?: string, markdown?: boolean }>()
</script>


<template>
<li class="relative pb-6">
    <div
        :style="{ backgroundImage: `linear-gradient(to bottom, ${color}, ${color2 ?? (last ? 'transparent' : color)})` }"
        class="absolute h-full left-[10px] top-[10px] w-[3px]"
    />
    <div class="absolute">
        <div
            :style="{ backgroundColor: color }"
            class="absolute size-[11px] rounded-[50%] z-1 left-[6px] top-[6px]"
        />
        <div
            :style="{ backgroundColor: color }"
            class="absolute opacity-50 size-[22px] rounded-[50%]"
        />
    </div>
    <div class="relative pl-8">
        <Markdown v-if="markdown">
            <slot></slot>
        </Markdown>
        <div v-else>
            <slot></slot>
        </div>
        <div
            v-if="date"
            class="mt-1 text-sm text-slate-300 dark:text-slate-600"
            v-html="date"
        />
    </div>
</li>
</template>
