<script setup lang="ts">
import AiSpiritCard from './AiSpiritCard.vue';

const props = defineProps<{ names: string | string[] }>();
const names = typeof props.names === 'string' ? props.names.split(/[\s,]/) : props.names;
</script>

<template>
    <div class="AiSpirits">
        <AiSpiritCard v-for="name in names" :name />
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
