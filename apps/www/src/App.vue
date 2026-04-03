<script lang="ts" setup>
import Background from '#/assets/background.jpg';
import { Icon } from '@iconify/vue';
import { navifox, signature, sitemap, socials, tighnari } from '@navifox/constants';
import { AiFooter } from '@navifox/ui';
import { logger, useWebsiteLinks, useWebsiteMetas } from '@navifox/utils';
import { useHead } from '@unhead/vue';
import { useResizeObserver } from '@vueuse/core';
import { ref, useTemplateRef } from 'vue';

const showSitemap = ref(false)
const showSocials = ref(true)
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
<img :src="Background" alt="背景图片" class="absolute size-full select-none object-cover z-0" />
<div class="absolute size-full bg-black/25  dark:bg-black/50 z-10" />
<div class="MaxContainer md:px-[20%]! h-screen flex items-center justify-end selection:bg-[#B5A2FD]/33 z-20 **:z-20">
    <div class="max-md:-mx-4 flex w-fit flex-col text-[#FDE2A2]"
         style="text-shadow: 1px 1px 3px #000c,0 0 8px #0009;">

        <div ref="bio"
             class="p-4 border border-transparent rounded-xl flex flex-col gap-y-3 transition-all duration-300 cursor-default Card">
            <div class="flex flex-wrap items-baseline gap-3">
                <span class="text-4xl font-semibold text-orange-300">{{ tighnari.name }}</span>
                <code class="text-xl text-[#B5A2FD]">@{{ tighnari.uid }}</code>
            </div>
            <div class="mb-1 border-b border-b-blue-200/25 md:border-b-blue-200/50 -mx-4" />
            <div v-if="tighnari.tags" class="font-semibold text-sm flex flex-wrap gap-2">
                <span v-for="tag in tighnari.tags"
                      class="border border-transparent dark:border-[#FDE2A280] bg-[#FDE2A280] dark:bg-[#FDE2A240] rounded-lg px-2 py-1">
                    {{ tag }}
                </span>
            </div>
            <h3 class="text-lg/6 text-[#FDA2BD]" v-html="tighnari.description" />
        </div>

        <div v-if="sitemap.length && showSitemap"
             class="p-4 border border-transparent rounded-xl flex flex-col transition-all duration-300 Card">
            <div :style="{ maxWidth: `${cardWidth}px` }"
                 class="flex flex-row flex-wrap items-center gap-4 align-top">
                <template v-for="(site, index) in sitemap">
                    <div v-if="index !== 0"
                         class="h-6 border-r border-[#FDE2A2]" />
                    <a :href="site.link"
                       :title="site.name"
                       class="flex select-none items-center no-underline *:transition-all *:duration-300 group"
                       draggable="false"
                       target="_self"
                    >
                        <template v-if="site.logo">
                            <Icon :icon="site.logo"
                                  class="group-hover:transform-[scale(1.2)] group-hover:text-[#FDA2BD]"
                                  height="32" />
                            <span class="ml-1 text-sm group-hover:text-[#FDA2BD] group-hover:ml-2 group-hover:-mr-1">
                                {{ site.name }}</span>
                        </template>
                        <template v-else>
                            <span class="ml-1 text-sm group-hover:text-[#FDA2BD]">
                                {{ site.name }}</span>
                        </template>
                    </a>
                </template>
            </div>
        </div>

        <div v-if="socials.length && showSocials"
             class="p-4 border border-transparent rounded-xl flex flex-col transition-all duration-300 Card">
            <div :style="{ maxWidth: `${cardWidth}px` }"
                 class="flex flex-wrap items-center gap-x-4 gap-y-5 align-top">
                <template v-for="site in socials">
                    <div v-if="!site.name || !site.logo"
                         class="h-5 border-r border-[#FDE2A2]" />
                    <a v-else
                       :href="site.link"
                       :title="site.name"
                       class="flex select-none items-center no-underline *:transition-all *:duration-300"
                       draggable="false"
                       target="_self"
                       @mouseleave="btnTextSocial = ''"
                       @mouseover="btnTextSocial = site.name"
                    >
                        <Icon :icon="site.logo"
                              class="hover:text-[#FDA2BD] hover:transform-[scale(1.2)]"
                              height="32" />
                    </a>
                </template>
                <span class="flex-1 text-right text-sm leading-4"
                      v-html="btnTextSocial" />
            </div>
        </div>

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
@media (width >= 768px) {
    .Card {
        /* 避免窄屏状态下与负 margin 冲突 */
        padding: 1rem 2rem;
    }

    .Card:hover {
        box-shadow: 0 0 12px 0 #00000047;
        padding-block: 2rem;
        backdrop-filter: blur(12px);
        background-color: rgb(0 0 0 / 12%);
    }
}
</style>
