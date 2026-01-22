<script lang="ts" setup>
import RawCard from '#/components/RawCard.vue'

defineProps<{ title: string, doc?: string, logo?: string, description?: string }>()
</script>


<template>
    <template v-if="doc">
        <RawCard :href="doc" use="a">
            <span class="text-2xl">{{ title }}</span>
            <div class="inline-flex flex-row items-center gap-4">
                <slot name="iconbar"></slot>
            </div>
            <slot>
                <span class="max-w-sm indent-8 text-amber-300" v-html="description" />
            </slot>
        </RawCard>
    </template>
    <template v-else>
        <RawCard use="div">
            <span class="text-2xl">{{ title }}</span>
            <div class="inline-flex flex-row items-center gap-4">
                <slot name="iconbar"></slot>
            </div>
            <slot>
                <span class="max-w-sm indent-8 text-amber-300" v-html="description" />
            </slot>
        </RawCard>
    </template>
</template>
