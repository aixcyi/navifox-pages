<script lang="ts" setup>
import LinkIcon from '#/asserts/AkarIconsLinkOut.svg';
import NavBar from '#/components/NavBar.vue';
import NavDropdown from '#/components/NavDropdown.vue';
import SignatureLine from '#/components/SignatureLine.vue';
import { bookmarks } from '#/constants';
import { Icon } from '@iconify/vue';
import { onMounted } from 'vue';

onMounted(() => {
    const elements = document.querySelectorAll('.bookmark-item')
    elements.forEach((el, index) => {
        setTimeout(() => {
            el.classList.add('animate-in')
        }, index * 50)
    })
})
</script>


<template>
<header class="home relative z-10 w-full overflow-visible">
    <div class="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-600 to-indigo-800 pointer-events-none" />
    <div class="absolute inset-0 opacity-10 pointer-events-none HeaderBackground" />
    <div
        class="absolute top-20 left-1/4 w-32 h-32 bg-gradient-to-r from-pink-400/20 to-purple-400/20 rounded-full blur-xl animate-pulse" />
    <div
        class="absolute bottom-20 right-1/4 w-40 h-40 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full blur-xl animate-pulse" />
    <div class="absolute top-24 right-12 opacity-20 font-mono text-white/60 text-sm animate-bounce"
         style="animation-delay:1s;animation-duration:3s">&lt;/&gt;
    </div>
    <div class="absolute bottom-32 left-16 opacity-20 font-mono text-white/60 text-lg animate-bounce"
         style="animation-delay:2s;animation-duration:3s">{ }
    </div>
    <div class="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10 pointer-events-none" />
    <NavBar class="MaxContainer z-20" />
    <div class="w-full flex flex-col text-center pt-8 pb-10 relative z-30">
        <div class="MaxContainer lg:w-4/5 xl:w-3/4 relative z-30">
            <h1 class="text-4xl md:text-5xl lg:text-6xl text-white leading-tight font-bold tracking-tight">
                <span class="relative whitespace-nowrap">
                    <SignatureLine class="absolute top-2/3 left-0 h-[0.58em] w-full fill-pink-300/60" />
                    <span
                        class="relative bg-gradient-to-r from-white via-pink-100 to-purple-100 bg-clip-text text-transparent">面向开发者的</span>
                </span>
                <span class="block mt-2">快速参考</span>
            </h1>
            <h2 class="lg:w-3/4 xl:w-2/3 text-center mx-auto text-lg md:text-xl lg:text-2xl text-slate-300 leading-relaxed font-light tracking-wide mt-8 mb-12">
                <!-- xxx <span class="font-semibold text-pink-300">xxx</span>.-->
            </h2>
            <div class="flex flex-col lg:flex-row items-center justify-center gap-4 mb-16 max-w-4xl mx-auto">
                <a class="group inline-flex items-center justify-center px-6 h-10 backdrop-blur-sm outline rounded-3xl transition-all duration-300 hover:scale-105 hover:shadow-lg bg-white/10 outline-white/20 text-white hover:bg-white/20"
                   href="/timestamp">
                    <span class="font-semibold leading-none">时间戳对照表</span>
                </a>
                <a class="group inline-flex items-center justify-center px-6 h-10 backdrop-blur-sm outline rounded-3xl transition-all duration-300 hover:scale-105 hover:shadow-lg bg-white/10 outline-white/20 text-white hover:bg-white/20"
                   href="/grammar">
                    <div class="flex-shrink-0 flex items-center justify-center mr-2">
                        <Icon height="24" icon="material-icon-theme:python" />
                    </div>
                    <span class="font-semibold leading-none">语法更新摘要</span>
                </a>
                <a class="group inline-flex items-center justify-center px-6 h-10 backdrop-blur-sm outline rounded-3xl transition-all duration-300 hover:scale-105 hover:shadow-lg bg-white/10 outline-white/20 text-white hover:bg-white/20"
                   href="/mirrors">
                    <span class="font-semibold leading-none">镜像源</span>
                </a>
                <a class="group inline-flex items-center justify-center px-6 h-10 backdrop-blur-sm outline rounded-3xl transition-all duration-300 hover:scale-105 hover:shadow-lg bg-white/10 outline-white/20 text-white hover:bg-white/20"
                   href="/uuid">
                    <span class="font-semibold leading-none">UUID 结构</span>
                </a>
                <a class="group inline-flex items-center justify-center px-6 h-10 backdrop-blur-sm outline rounded-3xl transition-all duration-300 hover:scale-105 hover:shadow-lg bg-gradient-to-r from-orange-500/20 to-yellow-500/20 outline-orange-300/30 text-white hover:from-orange-500/30 hover:to-yellow-500/30"
                   href="https://navifox.net/">
                    <div class="flex-shrink-0 flex items-center justify-center mr-2">
                        <Icon height="24" icon="fluent-emoji-flat:fox" />
                    </div>
                    <span class="font-semibold leading-none">路狐领航</span>
                </a>
            </div>
        </div>
    </div>
</header>

<NavDropdown />

<section class="home MaxContainer">
    <div class="w-full lg:w-4/5 flex flex-col mx-auto justify-center mt-10">
        <template v-for="group in bookmarks">
            <h2 class="sm:text-xl font-medium mt-6 mb-2 text-slate-800 dark:text-slate-300">
                <span>{{ group.title.text }}</span>
                <a v-if="group.title.link"
                   :href="group.title.link"
                   class="opacity-0 hover:opacity-100 transition-opacity duration-200">&nbsp;#</a>
            </h2>
            <div class="h-1 bg-slate-200 dark:bg-slate-800 ounded-full overflow-hidden mb-6">
                <div class="w-24 h-full bg-gradient-to-r from-indigo-500 to-purple-600 dark:bg-slate-800"></div>
            </div>
            <div class="w-full grid grid-cols-2 md:grid-cols-4 gap-1 md:gap-2 mb-6 text-slate-800">
                <a v-for="item in group.items"
                   :href="item.link"
                   class="inline-flex items-center Card"
                   target="_blank">
                    <div class="mr-2 min-w-7 text-gray-400 dark:text-gray-600">
                        <Icon v-if="item.logo"
                              :icon="item.logo"
                              class="size-7 max-w-7" />
                        <img v-else-if="item.icon"
                             :src="item.icon"
                             alt="ico"
                             class="w-7"
                             @error="e => { (e.target as HTMLImageElement).src = LinkIcon }" />
                        <img v-else
                             :src="LinkIcon"
                             alt="ico"
                             class="size-7" />
                    </div>
                    <div class="text-sm">
                        <p class="text-black dark:text-white" v-html="item.name" />
                        <p class="text-gray-400 dark:text-gray-600 Note">{{ item.note }}</p>
                    </div>
                </a>
            </div>
        </template>
    </div>
</section>

<footer class="text-slate-700 dark:text-slate-300 bg-slate-200 dark:bg-slate-800 md:mt-14">
    <div class="max-container flex flex-col sm:flex-row items-center">
        <p class="py-2 md:py-3 text-slate-500 text-sm text-center w-full">
            © 2026 navifox.net, All rights reserved.</p>
    </div>
</footer>
</template>


<style scoped>
header.home {
    position: relative !important;
    top: auto !important;
    left: auto !important;
    right: auto !important;
    z-index: 50;
    flex-shrink: 0;
}

section.home {
    flex: 1;
    display: flex;
    flex-direction: column;
    margin-top: 0;
    position: relative;
    z-index: 10;
}

.MaxContainer {
    max-width: 1320px;
    margin-left: auto;
    margin-right: auto;
    padding: 0.75rem 2rem;
}

header .MaxContainer {
    overflow: visible;
    position: relative;
}

header.home .MaxContainer {
    background: transparent;
}

.HeaderBackground {
    background-size: 60px 60px, 90px 90px;
    background-position: 0 0, 30px 45px;
    background-image: radial-gradient(
        circle at 20% 50%,
        rgba(255, 255, 255, .2) 1px,
        transparent 1px
    ),
    radial-gradient(
        circle at 80% 50%,
        rgba(255, 255, 255, .2) 1px,
        transparent 1px
    );
}

.Card {
    border: 1px solid transparent;
    border-radius: .5rem;
    padding: .75rem 1rem;
    gap: .33rem;
    transition: all .2s;

    .Note {
        transition: color .2s;
    }
}

.Card:hover {
    border-color: var(--color-purple-600);
    background-color: rgba(160 0 255 / 10%);

    .Note {
        color: mediumpurple;
    }
}
</style>
