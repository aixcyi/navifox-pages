<script lang="ts" setup>
import { copyrightInterval as interval, copyrights, links, navifox, sitemap, socials, thanks, tighnari, } from '#/data'

const version = __APP_VERSION__
</script>


<template>
    <div class="relative grid gap-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        <div class="inline-flex flex-col gap-1 sm:col-span-2 order-last xl:order-first">
            <div class="text-2xl pb-2">
                <b class="text-white">{{ navifox.name }}</b>
            </div>
            <div class="pb-4 flex flex-wrap">
                <span v-for="line in navifox.desc?.split('\n')">{{ line }}</span>
            </div>
            <div v-for="copyright in copyrights">
                <a :href="copyright.link"
                   class="inline-flex no-underline tighnari dark"
                   target="_blank">{{ copyright.text }}</a>
            </div>
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
        <div class="inline-flex flex-col gap-1">
            <div class="text-base pb-1"><b>导航</b></div>
            <div v-for="item in sitemap">
                <a :href="item.link"
                   class="inline-flex no-underline tighnari dark"
                   target="_blank">{{ item.text }}</a>
            </div>
        </div>
        <div class="inline-flex flex-col gap-1">
            <div class="text-base pb-1"><b>链接</b></div>
            <template v-for="item in socials">
                <a v-if="item.text" :href="item.link"
                   class="inline-flex no-underline tighnari dark"
                   target="_blank">{{ item.text }}</a>
            </template>
        </div>
        <div class="inline-flex flex-col gap-1">
            <div class="text-base pb-1"><b>友链</b></div>
            <div v-for="item in links">
                <a :href="item.link"
                   class="inline-flex no-underline tighnari dark"
                   target="_blank">{{ item.text }}</a>
            </div>
        </div>
        <div class="inline-flex flex-col gap-1">
            <div class="text-base pb-1"><b>引用 & 鸣谢</b></div>
            <div v-for="item in thanks">
                <a :href="item.link"
                   class="inline-flex no-underline tighnari dark"
                   target="_blank">{{ item.text }}</a>
            </div>
        </div>
    </div>
</template>
