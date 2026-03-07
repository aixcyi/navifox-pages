<script lang="ts" setup>
import {
    copyrightInterval as interval,
    copyrights,
    links,
    navifox,
    sitemap,
    socials,
    thanks,
    tighnari,
} from '@navifox/constants';

const version = __APP_VERSION__
const linkMap = {
    '导航': sitemap,
    '链接': socials,
    '友链': links,
    '引用鸣谢': thanks,
}
</script>


<template>
<footer class="relative grid gap-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
    <div class="flex flex-col gap-1 sm:col-span-2 order-last xl:order-first">
        <div class="text-2xl pb-2">
            <b class="text-white">{{ navifox.name }}</b>
        </div>
        <div class="pb-4 flex flex-wrap" v-html="navifox.description" />
        <template v-for="copyright in copyrights">
            <a :href="copyright.link"
               class="flex no-underline"
               target="_blank">{{ copyright.text }}</a>
        </template>
        <div v-show="tighnari.name">
            <span>© {{ interval.start }}-{{ interval.stop }} {{ tighnari.name }} 版权所有</span>
        </div>
        <div v-show="tighnari.uid">
            <span>© {{ interval.start }}-{{ interval.stop }} {{ tighnari.uid }}. All Rights Reserved.</span>
        </div>
        <div>
            <span>构建版本号：<code>{{ version }}</code></span>
        </div>
    </div>
    <div v-for="(items, title) in linkMap" class="flex flex-col gap-1">
        <div class="text-base pb-1"><b>{{ title }}</b></div>
        <template v-for="item in items">
            <a v-if="item.text" :href="item.link"
               class="flex no-underline"
               target="_blank">{{ item.text }}</a>
        </template>
    </div>
</footer>
</template>


<style scoped>
a {
    transition: color .25s;
    color: var(--fox-cyan-1);

    &:hover {
        color: var(--fox-cyan-2);
    }
}
</style>
