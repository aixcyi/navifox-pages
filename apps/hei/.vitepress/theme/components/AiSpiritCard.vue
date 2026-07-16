<script setup lang="ts">
import { VPLink } from 'vitepress/theme';
import { spirits, spiritsByName } from '../../spirits';

const props = defineProps<{ name: string }>();
const spirit = spiritsByName[props.name] || spirits.at(-1)!;
</script>

<template>
    <VPLink class="AiSpiritCard" :href="spirit.link" target="_self" :no-icon="true" :tag="spirit.link ? 'a' : 'div'">
        <article class="box">
            <img v-if="spirit.avatar" :src="spirit.avatar" :alt="name" class="avatar" />
            <div v-else class="avatar"></div>
            <div class="content">
                <div class="name" v-html="name" />
                <div class="titles" v-if="typeof spirit.titles === 'string'">
                    <div v-for="title in spirit.titles.split(' ')">{{ title }}</div>
                </div>
                <div class="titles" v-else>
                    <div v-for="title in spirit.titles">{{ title }}</div>
                </div>
            </div>
        </article>
    </VPLink>
</template>

<style scoped>
.AiSpiritCard {
    display: block;
    color: inherit;
    border: 1px solid var(--vp-c-bg-soft);
    border-radius: 12px;
    width: 360px;
    height: 100%;
    background-color: var(--vp-c-bg-soft);
    text-decoration: none;
    transition:
        border-color 0.25s,
        background-color 0.25s;
}

.AiSpiritCard.link:hover {
    color: inherit;
    border-color: var(--vp-c-brand-1);
}

.box {
    display: flex;
    flex-direction: row;
    gap: 16px;
    padding: 24px;
    height: 100%;
}

.content {
    height: fit-content;
    align-self: center;
}

.avatar {
    width: 80px;
    height: 80px;
    margin: 0;
    border-radius: 50%;
    background-color: rgba(0 0 0 / 20%);
    text-align: center;
    align-content: center;
}

.name {
    color: var(--vp-c-text-1);
    font-size: 16px;
    font-weight: 600;
    line-height: 24px;
}

.titles {
    color: var(--vp-c-text-2);
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    font-size: 14px;
    column-gap: 8px;
}
</style>
