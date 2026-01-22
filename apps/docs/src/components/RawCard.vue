<script lang="ts" setup>
defineProps<{ use?: string }>()
</script>


<template>
    <component :is="use ?? 'div'" class="p-6 m-6 inline-flex flex-col items-center">
        <slot></slot>
    </component>
</template>
