<script lang="ts" setup>
import Background from '#/assets/background.jpg';
import AiFooter from '#/components/AiFooter.vue';
import { Icon } from '@iconify/vue';
import { navifox, signature, sitemap, socials, tighnari } from '@navifox/constants';
import { logger, useWebsiteLinks, useWebsiteMetas } from '@navifox/utils';
import { useHead } from '@unhead/vue';
import { useResizeObserver } from '@vueuse/core';
import { ref, useTemplateRef } from 'vue';

const version = __APP_VERSION__
const btnTextSocial = ref('')
const cardWidth = ref(0)
const bio = useTemplateRef('bio')

logger.draw(signature, '#459199')

useHead({
    title: navifox.name,
    meta: [ ...useWebsiteMetas(navifox) ],
    link: [ ...useWebsiteLinks(navifox) ],
})
useResizeObserver(bio, (entries) => {
    cardWidth.value = entries[0]!.contentRect.width
})
</script>


<template>
<img :src="Background"
     alt="背景图片"
     class="absolute select-none object-cover size-full -z-1" />

<div class="bg-black/25  dark:bg-black/50 h-screen flex items-center justify-end">
    <div class="px-8 md:px-[20%] flex w-fit flex-col text-[#FDE2A2]"
         style="text-shadow: 1px 1px 3px #000c,0 0 8px #0009;">

        <!-- 卡片1 -->

        <div ref="bio" class="card">
            <div class="border-b border-b-blue-200">
                <div class="flex flex-wrap items-baseline gap-3">
                    <span class="text-4xl font-semibold text-orange-300">{{ tighnari.name }}</span>
                    <code class="text-xl text-[#A2EBFD]">@{{ tighnari.uid }}</code>
                </div>
            </div>
            <div class="flex flex-col gap-y-4 align-top">
                <h3 class="font-semibold text-lg/6">{{ tighnari.tags?.join('／') }}</h3>
                <h3 class="text-lg/6 text-[#B5A2FD]" v-html="tighnari.description" />
            </div>
        </div>

        <!-- 卡片2 -->

        <div v-if="!sitemap.length" class="card">
            <div :style="{ maxWidth: `${cardWidth}px` }"
                 class="flex flex-row flex-wrap items-center gap-4 align-top">
                <template v-for="(site, index) in sitemap">
                    <div v-if="index !== 0"
                         class="h-6 border-r border-[#FDE2A2]" />
                    <a :href="site.link"
                       class="flex select-none items-center no-underline button"
                       draggable="false"
                       target="_self"
                    >
                        <Icon v-if="site.logo" :icon="site.logo" height="32" />
                        <div v-else class="size-8" />
                        <span class="ml-1 text-sm">{{ site.name }}</span>
                    </a>
                </template>
            </div>
        </div>

        <!-- 卡片3 -->

        <div v-if="socials.length" class="card">
            <div :style="{ maxWidth: `${cardWidth}px` }"
                 class="flex flex-wrap items-center gap-x-4 gap-y-5 align-top">
                <template v-for="site in socials">
                    <div v-if="!site.name || !site.logo"
                         class="h-5 border-r border-[#FDE2A2]" />
                    <a v-else
                       :href="site.link"
                       class="flex select-none items-center no-underline button"
                       draggable="false"
                       target="_self"
                       @mouseleave="btnTextSocial = ''"
                       @mouseover="btnTextSocial = site.name"
                    >
                        <Icon :icon="site.logo"
                              class="hover:text-[#FDA2BD]"
                              height="32" />
                    </a>
                </template>
                <span class="flex-1 text-right text-sm leading-4"
                      v-html="btnTextSocial" />
            </div>
        </div>

        <!-- 卡片尾部 -->

    </div>
</div>
<AiFooter>
    <template #additions>
        <p>
            <span>构建为 <code>{{ version }}</code></span>
        </p>
    </template>
</AiFooter>
</template>


<style scoped>
.card {
    display: flex;
    flex-direction: column;
    border: 1px solid transparent;
    border-radius: .75rem;
    padding-inline: 1.5rem;
    transition: all .3s;

    & > div {
        padding: 1.25rem .75rem;
        transition: all .3s;
    }
}

.card:hover {
    box-shadow: 0 0 12px 0 #00000047;
    padding-block: 1rem;
    backdrop-filter: blur(12px);
    background-color: rgb(0 0 0 / 12%);
}

.button {
    &,
    & * {
        transition: all .3s;
    }

    &:hover > svg {
        transform: scale(1.2);
    }

    &:hover > span {
        margin-left: .5rem;
        margin-right: -.25rem;
    }
}
</style>
