<script lang="ts" setup>
import FlairButton from '#/components/FlairButton.vue';
import { Icon } from '@iconify/vue';
import { copyrightInterval, mooncakeDocs, navifoxGuild, projects } from '@navifox/constants';
import { useFavicon, useTitle } from '@vueuse/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { range } from 'lodash-es';
import { onMounted, onUnmounted } from 'vue';
import { Vue3NextQrcode } from 'vue3-next-qrcode';

useTitle().value = mooncakeDocs.name
useFavicon().value = mooncakeDocs.icon

gsap.registerPlugin(ScrollTrigger)

onMounted(() => {
    setTimeout(initializePanels, 100)
    setTimeout(initializeArrows, 100)
})
onUnmounted(() => {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill())
})

function initializePanels() {
    const panels: HTMLDivElement[] = gsap.utils.toArray("#panel")
    if (panels.length == 0) return
    panels.forEach(panel => {
        ScrollTrigger.create({
            trigger: panel,
            start: "top top",
            pin: true,
            pinSpacing: false
        })
    })
    const snapUnit = 1 / (panels.length - 1)
    const trigger = ScrollTrigger.create({
        snap(value) {
            let snappedValue = gsap.utils.snap(snapUnit, value)
            if (0 < snappedValue || snappedValue < 1) {
                return snappedValue
            }
            return value
        }
    })
    trigger.scroll(0)
}

function initializeArrows() {
    gsap.to("#arrow", {
        keyframes: {
            y: [ 0, -8, 8, 0 ],
            opacity: [ 1, .2, 1, 1 ],
            ease: "none",
            easeEach: "power3.out"
        },
        ease: "elastic",
        duration: 2,
        stagger: .25,
        repeat: -1,
    });
}
</script>


<template>
<section id="panel"
         class="w-full h-screen flex justify-center items-center"
         style="background-color: var(--background)">
    <div class="p-12 inline-flex flex-col items-center gap-8 text-nowrap">
        <h1 class="text-5xl text-white"><b>{{ mooncakeDocs.name }}</b></h1>
        <span class="text-lg text-amber-100 tracking-[.1em]">· {{ mooncakeDocs.description }} ·</span>
    </div>
    <div class="absolute bottom-16 left-1/2" style="transform: translateX(-50%)">
        <Icon v-for="() in range(3)"
              id="arrow"
              class="text-amber-100"
              height="24"
              icon="bytesize:chevron-bottom" />
    </div>
</section>

<!-- var(--button-hoverColor) 也用 <FlairButton/> -->
<section v-for="(project, index) in projects"
         id="panel"
         :style="{'--button-hoverColor': index % 2 ? 'var(--color-cyan-950)' : 'var(--color-gray-800)'}"
         class="w-full h-screen flex justify-center items-center flex-col"
         style="background-color: var(--button-hoverColor)">
    <div class="p-12 inline-flex flex-col items-center gap-6 text-amber-100 z-10">
        <span class="text-3xl text-nowrap">{{ project.name }}</span>
        <div class="inline-flex flex-row flex-nowrap items-center gap-4">
            <template v-for="item in project.socials">
                <a v-if="item.icon"
                   :href="item.link"
                   class="hover:text-amber-300">
                    <Icon :icon="item.icon" height="32" />
                </a>
            </template>
        </div>
        <span class="max-w-sm indent-8 text-gray-300"
              v-html="project.description" />
        <div v-if="project.documentation"
             class="text-base font-mono relative">
            <FlairButton :href="project.documentation"
                         flair-style="--button-stroke: var(--gradient-milktea);"
                         use="a">
                &nbsp;浏览文档&nbsp;<br />
            </FlairButton>
        </div>
    </div>
    <Icon v-if="project.typeIco"
          :class="index % 2 ? 'text-gray-600' : 'text-gray-700'"
          :icon="project.typeIco"
          class="absolute md:left-16 md:bottom-16 left-8 bottom-8"
          height="unset"
          style="--size: calc(min(100vh, 100vw) / 3 + 1px); height: var(--size); width: var(--size)"
          width="unset" />
</section>

<section id="panel"
         class="w-full h-screen flex justify-center items-center"
         style="background-color: var(--background)">
    <div class="p-1.5 MooncakeRect"
         style="background-color: var(--color-gray-400)">
        <div class="p-12 inline-flex items-center flex-wrap gap-4 justify-center max-sm:flex-col MooncakeRect"
             style="background-color: var(--background)">
            <div class="inline-flex flex-col text-nowrap gap-1 max-sm:text-center">
                <span class="text-md text-gray-400">产地：{{ navifoxGuild.name }}</span>
                <span class="text-md text-gray-400">生产日期：{{ copyrightInterval.start }}年</span>
                <span class="text-md text-gray-400">保质期：{{ copyrightInterval.start + 1000 }}年</span>
                <span class="text-md text-gray-400">包装规格：{{ projects.length }} 个/盒</span>
            </div>
            <Vue3NextQrcode
                :size="128"
                :text="navifoxGuild.link"
                :whiteMargin="false"
                colorDark="#99a1af"
                colorLight="transparent" />
        </div>
    </div>
</section>
</template>


<style scoped>
.MooncakeRect {
    mask: radial-gradient(
        circle at calc(100% + 10px) calc(100% + 10px),
        transparent 0,
        transparent 24px,
        #2179f5 25px
    ),
    radial-gradient(
        circle at -10px -10px,
        transparent 0,
        transparent 24px,
        #2179f5 25px
    ),
    radial-gradient(
        circle at calc(100% + 10px) -10px,
        transparent 0,
        transparent 24px,
        #2179f5 25px
    ),
    radial-gradient(
        circle at -10px calc(100% + 10px),
        transparent 0,
        transparent 24px,
        #2179f5 25px
    );
    mask-repeat: no-repeat;
    mask-position: right bottom, left top, right top, left bottom;
    mask-size: 70% 70%;
}
</style>
