<script setup lang="ts">
import { computed, ref } from 'vue';
import { VPLink } from 'vitepress/theme';

defineProps<{ catalog: 'spirit' | 'guild'; title: string }>();

const link = ref('');
const name = ref('');

const notEmpty = computed(() => name.value.length > 0);
const rules = computed(() => {
    const n = name.value;
    return {
        length: notEmpty.value ? n.length >= 4 : null,
        charset: notEmpty.value ? /^[A-Za-z0-9_-]+$/.test(n) : null,
        startWithAlpha: notEmpty.value ? /^[a-z]/i.test(n) : null,
    };
});
</script>

<template>
    <VPLink class="IDTestLinkCard" :href="link" target="_blank" :no-icon="true" :tag="name ? 'a' : 'div'">
        <article class="box">
            <div class="name" v-text="title" />
            <div class="desc"><slot></slot></div>
        </article>
    </VPLink>
    <input class="field" autofocus type="text" v-model="name" @input="link = `/${catalog}/${name}`" />
    <ul class="rules">
        <li :class="{ pass: rules.length === true, fail: rules.length === false }">四个字或以上。</li>
        <li :class="{ pass: rules.startWithAlpha === true, fail: rules.startWithAlpha === false }">以英文字母开头。</li>
        <li :class="{ pass: rules.charset === true, fail: rules.charset === false }">
            由英文字母、数字、减号、下划线组成。
        </li>
    </ul>
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
    margin-top: 8px;
    margin-bottom: 8px;
    border-bottom: 2px solid var(--vp-c-brand-soft);
    transition: border-bottom-color 0.5s;
}

.field:focus {
    width: 100%;
    border-bottom: 2px solid var(--vp-c-brand-1);
}

.rules {
    margin: 0;
    padding-left: 1.5rem;
    list-style: lower-greek;
}

.rules li {
    transition: color 0.25s;
}

.rules li.pass {
    color: var(--vp-c-tip-1);
}

.rules li.fail {
    color: var(--vp-c-danger-1);
}
</style>
