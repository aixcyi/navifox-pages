<script setup lang="ts">
import { spiritsByName } from '#/spirits';

import SpiritCard from './SpiritCard.vue';

const props = defineProps<{ names: string | string[]; copyOnly?: boolean }>();
const names = typeof props.names === 'string' ? props.names.split(/[\s,]/) : props.names;
const spirits = names.map((name) => spiritsByName[name]).filter((s) => !!s);
</script>

<template>
    <div class="SpiritBanner">
        <SpiritCard v-for="spirit in spirits" :key="spirit.name" v-bind="spirit" :copyOnly="copyOnly" />
    </div>
</template>

<style scoped>
.SpiritBanner {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 16px;
    margin: 16px 0;
}
</style>
