<script lang="ts" setup>
import FlairButton from '#/components/FlairButton.vue';
import { Icon } from '@iconify/vue';
import { navifoxDocs, navifoxGuild, projects, sinceYear } from '@navifox/constants';
import { website } from '@navifox/utils';
import { useHead } from '@unhead/vue';
import { useQRCode } from '@vueuse/integrations/useQRCode';
import { range } from 'es-toolkit';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { onMounted, onUnmounted } from 'vue';

function initializePanels() {
    const panels: HTMLDivElement[] = gsap.utils.toArray('#panel');
    if (panels.length == 0) return;
    panels.forEach((panel) => {
        ScrollTrigger.create({
            trigger: panel,
            start: 'top top',
            pin: true,
            pinSpacing: false,
        });
    });
    const snapUnit = 1 / (panels.length - 1);
    const trigger = ScrollTrigger.create({
        snap(value) {
            let snappedValue = gsap.utils.snap(snapUnit, value);
            if (0 < snappedValue || snappedValue < 1) {
                return snappedValue;
            }
            return value;
        },
    });
    trigger.scroll(0);
}

function initializeArrows() {
    gsap.to('#arrow', {
        keyframes: {
            y: [0, -8, 8, 0],
            opacity: [1, 0.2, 1, 1],
            ease: 'none',
            easeEach: 'power3.out',
        },
        ease: 'elastic',
        duration: 2,
        stagger: 0.25,
        repeat: -1,
    });
}

const qrcode = useQRCode(navifoxGuild.link, { color: { light: '#FFFFFF00', dark: '#99a1afFF' } });
const boxStates = {
    产地: navifoxGuild.name,
    包装规格: `${projects.length} 个/盒`,
    生产日期: `${sinceYear} 年`,
    保质期: `${sinceYear + 1000} 年`,
};

gsap.registerPlugin(ScrollTrigger);

useHead({
    title: navifoxDocs.name,
    meta: [...website.metas(navifoxDocs), ...website.og(navifoxDocs)],
    link: [...website.links(navifoxDocs)],
});
onMounted(() => {
    setTimeout(initializePanels, 100);
    setTimeout(initializeArrows, 100);
});
onUnmounted(() => {
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
});
</script>

<template>
    <section
        id="panel"
        class="flex h-screen w-full items-center justify-center"
        style="background-color: var(--background)"
    >
        <div class="flex flex-col items-center gap-8 p-12 text-nowrap">
            <h1 class="text-5xl text-white">
                <b>{{ navifoxDocs.name }}</b>
            </h1>
            <span class="text-lg tracking-widest text-amber-100">· {{ navifoxDocs.description }} ·</span>
        </div>
        <div class="absolute bottom-16 left-1/2" style="transform: translateX(-50%)">
            <Icon v-for="() in range(3)" id="arrow" class="text-amber-100" height="24" icon="bytesize:chevron-bottom" />
        </div>
    </section>

    <!-- var(--button-hoverColor) 也用 <FlairButton/> -->
    <section
        v-for="(project, index) in projects"
        id="panel"
        :style="{ '--button-hoverColor': index % 2 ? 'var(--color-cyan-950)' : 'var(--color-gray-800)' }"
        class="flex h-screen w-full flex-col items-center justify-center"
        style="background-color: var(--button-hoverColor)"
    >
        <div class="z-10 flex flex-col items-center gap-6 p-12 text-amber-100">
            <span class="text-3xl text-nowrap">{{ project.name }}</span>
            <div class="flex flex-row flex-nowrap items-center gap-4">
                <template v-for="item in project.socials">
                    <a v-if="item.logo" :href="item.link" class="hover:text-amber-300">
                        <Icon :icon="item.logo" height="32" />
                    </a>
                </template>
            </div>
            <span class="max-w-sm indent-8 text-gray-300" v-html="project.description" />
            <div v-if="project.documentation" class="relative text-base">
                <FlairButton
                    :href="project.documentation"
                    flair-style="--button-stroke: var(--gradient-milktea);"
                    use="a"
                >
                    &nbsp;浏览文档&nbsp;<br />
                </FlairButton>
            </div>
        </div>
        <Icon
            v-if="project.releaseType"
            :class="index % 2 ? 'text-gray-600' : 'text-gray-700'"
            :icon="project.releaseType"
            class="absolute bottom-8 left-8 md:bottom-16 md:left-16"
            height="unset"
            style="--size: calc(min(100vh, 100vw) / 3 + 1px); height: var(--size); width: var(--size)"
            width="unset"
        />
    </section>

    <section
        id="panel"
        class="flex h-screen w-full items-center justify-center text-gray-400"
        style="background-color: var(--background)"
    >
        <div class="MooncakeRect p-1.5 select-none" style="background-color: var(--color-gray-400)">
            <div
                class="MooncakeRect flex flex-wrap items-center gap-6 p-12 max-sm:flex-col"
                style="background-color: var(--background)"
            >
                <table>
                    <tbody>
                        <tr v-for="(v, k) in boxStates">
                            <td class="w-20 text-justify" style="text-align-last: justify">{{ k }}</td>
                            <td class="border-l-16 border-transparent">{{ v }}</td>
                        </tr>
                    </tbody>
                </table>
                <img :src="qrcode" alt="QR Code" draggable="false" />
            </div>
        </div>
    </section>
</template>

<style scoped>
.MooncakeRect {
    mask:
        radial-gradient(circle at calc(100% + 10px) calc(100% + 10px), transparent 0, transparent 24px, #2179f5 25px),
        radial-gradient(circle at -10px -10px, transparent 0, transparent 24px, #2179f5 25px),
        radial-gradient(circle at calc(100% + 10px) -10px, transparent 0, transparent 24px, #2179f5 25px),
        radial-gradient(circle at -10px calc(100% + 10px), transparent 0, transparent 24px, #2179f5 25px);
    mask-repeat: no-repeat;
    mask-position:
        right bottom,
        left top,
        right top,
        left bottom;
    mask-size: 70% 70%;
}
</style>
