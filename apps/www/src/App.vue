<script lang="ts" setup>
import Background from '#/assets/background.jpg'
import Content from '#/components/Content.vue'
import { signature, socials, tighnari, websites } from '#/data'
import Footer from '#/Footer.vue'
import { logger } from '#/utils/logging.ts'
import { Icon } from '@iconify/vue'
import { useResizeObserver } from '@vueuse/core'
import { ref, useTemplateRef } from 'vue'

logger.draw(signature, '#459199')

const btnTextSocial = ref('')
const cardWidth = ref(0)
const bio = useTemplateRef('bio')

useResizeObserver(bio, (entries) => {
    cardWidth.value = entries[0]!.contentRect.width
})
</script>


<template>
    <img :src="Background"
         alt="背景图片"
         class="absolute select-none object-cover size-full -z-1" />

    <Content class="h-screen text-(--fox-cyan-2) flex items-center justify-end"
             wide="thinner">
        <div class="flex w-fit flex-col">

            <!-- 卡片1 -->

            <div ref="bio" class="card">
                <div class="border-b border-b-cyan-800">
                    <div class="inline-flex flex-wrap items-baseline gap-3">
                        <span class="text-4xl font-semibold">{{ tighnari.name }}</span>
                        <code class="text-xl">@{{ tighnari.uid }}</code>
                    </div>
                </div>
                <div class="inline-flex flex-col gap-y-4 align-top">
                    <h3 class="font-semibold text-lg/6">{{ tighnari.tags?.join('／') }}</h3>
                    <h3 class="text-lg/6" v-html="tighnari.description" />
                </div>
            </div>

            <!-- 卡片2 -->

            <div v-if="websites.length" class="card">
                <div :style="{ maxWidth: `${cardWidth}px` }"
                     class="flex flex-row flex-wrap items-center gap-4 align-top">
                    <template v-for="(site, index) in websites">
                        <div v-if="index !== 0"
                             class="h-6 border-r border-(--fox-cyan-2)" />
                        <a :href="site.link"
                           class="flex select-none items-center no-underline tighnari button"
                           draggable="false"
                           target="_self"
                        >
                            <Icon :icon="site.icon!" height="32" />
                            <span class="ml-1 text-sm">{{ site.text }}</span>
                        </a>
                    </template>
                </div>
            </div>

            <!-- 卡片3 -->

            <div v-if="socials.length" class="card">
                <div :style="{ maxWidth: `${cardWidth}px` }"
                     class="flex flex-wrap items-center gap-x-4 gap-y-5 align-top">
                    <template v-for="site in socials">
                        <div v-if="!site.text"
                             class="h-5 border-r border-(--fox-cyan-2)" />
                        <a v-else
                           :href="site.link"
                           class="flex select-none items-center no-underline tighnari button"
                           draggable="false"
                           target="_self"
                           @mouseleave="btnTextSocial = ''"
                           @mouseover="btnTextSocial = site.text ?? ''"
                        >
                            <Icon :icon="site.icon!" height="32" />
                        </a>
                    </template>
                    <span class="flex-1 text-right text-sm leading-4"
                          v-html="btnTextSocial" />
                </div>
            </div>

            <!-- 卡片尾部 -->

        </div>
    </Content>

    <Content class="w-screen text-sm py-10 bg-black border-t border-(--fox-cyan-1)"
             use="footer"
             wide="fattier">
        <Footer />
    </Content>
</template>


<style lang="css" scoped>
.card {
    display: flex;
    flex-direction: column;
    border: 1px solid transparent;
    border-radius: .5rem;
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
    &, & * {
        transition: all .25s;
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
