<script lang="ts" setup>
import { ref } from 'vue';

const props = defineProps<{ wide: 'thinner' | 'normal' | 'fattier', use?: string, class?: string }>()
const classes = ref(props['class'])
switch (props.wide) {
    case 'thinner':
        classes.value += ' px-[25%] max-xl:px-[15%] max-sm:px-[8%]'
        break
    case "normal":
        classes.value += ' px-[20%] max-xl:px-[15%] max-sm:px-[8%]'
        break
    case "fattier":
        classes.value += ' px-[15%] max-sm:px-[8%]'
}
</script>


<template>
<component :is="use ?? 'div'" :class="classes">
    <slot></slot>
</component>
</template>
