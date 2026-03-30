<script lang="ts" setup>
const props = defineProps<{ timestamp?: string, colors?: string[] }>()
if (props.colors && props.colors.length < 2) {
    props.colors.push(...props.colors)
}
</script>


<template>
<li class="relative pb-6">
    <div :style="{ backgroundImage: colors ? `linear-gradient(to bottom, ${colors?.join(', ')})` : 'initial' }"
         class="absolute h-full bg-neutral-600 left-[10px] top-[10px] w-[3px]" />
    <div class="absolute">
        <div :style="{ backgroundColor: colors?.[0] || '#777777' }"
             class="absolute size-[11px] rounded-[50%] z-1 left-[6px] top-[6px]" />
        <div :style="{ backgroundColor: colors?.[0] || '#777777' }"
             class="absolute opacity-50 size-[22px] rounded-[50%]" />
    </div>
    <div class="relative pl-8">
        <div>
            <slot></slot>
        </div>
        <div v-if="timestamp" class="mt-1 text-sm text-slate-600">{{ timestamp }}</div>
    </div>
</li>
</template>
