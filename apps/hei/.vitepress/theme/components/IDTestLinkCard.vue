<script setup lang="ts">
import { VPLink } from 'vitepress/theme';
import { ref } from 'vue';

defineProps<{ catalog: 'spirit' | 'guild'; title: string }>();

const link = ref('');
const name = ref('');
</script>

<template>
    <input class="field" autofocus type="text" v-model="name" @input="link = `/${catalog}/${name}`" />
    <VPLink class="IDTestLinkCard" :href="link" target="_blank" :no-icon="true" :tag="name ? 'a' : 'div'">
        <article class="box">
            <div class="name" v-text="title" />
            <div class="desc"><slot></slot></div>
        </article>
    </VPLink>
</template>

<style scoped>
.IDTestLinkCard {
    display: block;
    color: inherit;
    border: 1px solid var(--vp-c-bg-soft);
    border-radius: 12px;
    width: 100%;
    height: 100%;
    background-color: var(--vp-c-bg-soft);
    text-decoration: none;
    transition:
        border-color 0.25s,
        background-color 0.25s;
}

.IDTestLinkCard:hover {
    color: inherit;
    border-color: var(--vp-c-brand-1);
    background-color: var(--vp-c-gray-soft);
}

.box {
    display: flex;
    flex-direction: column;
    padding: 24px;
    height: 100%;
    align-self: center;
}

.name {
    color: var(--vp-c-text-1);
    font-size: 16px;
    font-weight: 600;
    line-height: 24px;
}

.desc {
    color: var(--vp-c-text-2);
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    font-size: 14px;
    column-gap: 8px;
}

.field {
    width: 100%;
    padding-left: 4px;
    padding-right: 4px;
    margin-bottom: 8px;
    border-bottom: 2px solid var(--vp-c-brand-soft);
    transition: border-bottom-color 0.5s;
}

.field:focus {
    width: 100%;
    border-bottom: 2px solid var(--vp-c-brand-1);
}
</style>
