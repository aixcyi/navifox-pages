<script setup lang="ts">
import type { Spirit } from '../types';
import AiSpiritCard from './AiSpiritCard.vue';

defineProps<{ spirits: Spirit[] }>();
</script>

<template>
    <div class="AiSpirits">
        <AiSpiritCard v-bind="spirit" v-for="spirit in spirits" />
    </div>
</template>

<style scoped>
.AiSpirits {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 16px;
}
</style>
