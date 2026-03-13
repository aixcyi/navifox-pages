<script lang="ts" setup>
import LinkIcon from '#/asserts/AkarIconsLinkOut.svg';
import AiFooter from '#/components/AiFooter.vue';
import NavBar from '#/components/NavBar.vue';
import NavDropdown from '#/components/NavDropdown.vue';
import SignatureLine from '#/components/SignatureLine.vue';
import { Icon } from '@iconify/vue';
import { anchors, bookmarks, navifoxRefs } from '@navifox/constants';
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
<header class="Home relative z-10 w-full overflow-visible">
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
    <NavBar class="MaxContainer z-20" cover />
    <div class="w-full flex flex-col text-center pt-8 pb-10 relative z-30">
        <div class="MaxContainer lg:w-4/5 xl:w-3/4 relative z-30">
            <h1 class="text-4xl md:text-5xl lg:text-6xl text-white leading-tight font-bold tracking-tight">
                <span class="relative whitespace-nowrap">
                    <SignatureLine class="absolute top-2/3 left-0 h-[0.58em] w-full fill-pink-300/60" />
                    <span
                        class="relative bg-gradient-to-r from-white via-pink-100 to-purple-100 bg-clip-text text-transparent">
                        路狐领航之</span>
                </span>
                <span class="block mt-2">{{ navifoxRefs.name }}</span>
            </h1>
            <h2 class="lg:w-3/4 xl:w-2/3 text-center mx-auto text-lg md:text-xl lg:text-2xl text-slate-300 leading-relaxed font-light tracking-wide mt-8 mb-12 *:[b]:text-pink-300 *:[b]:font-semibold"
                v-html="navifoxRefs.description" />
            <div class="flex flex-col lg:flex-row items-center justify-center gap-4 mb-16 max-w-4xl mx-auto">
                <a v-for="(anchor, i) in anchors"
                   :class="i + 1 === anchors.length
                   ? ['bg-gradient-to-r','from-orange-500/20','to-yellow-500/20','outline-orange-300/30','hover:from-orange-500/30','hover:to-yellow-500/30']
                   : ['bg-white/10','outline-white/20','hover:bg-white/20']"
                   :href="anchor.link"
                   :target="anchor.link.startsWith('https://') ? '_blank' : '_self'"
                   class="group inline-flex items-center justify-center px-6 h-10 backdrop-blur-sm outline rounded-3xl transition-all duration-300 hover:scale-105 hover:shadow-lg text-white">
                    <div v-if="anchor.logo"
                         class="flex-shrink-0 flex items-center justify-center mr-2">
                        <Icon :icon="anchor.logo" height="24" />
                    </div>
                    <span class="font-semibold leading-none">{{ anchor.text }}</span>
                </a>
            </div>
        </div>
    </div>
</header>

<NavDropdown />

<section class="Home MaxContainer">
    <div class="w-full lg:w-4/5 flex flex-col mx-auto justify-center mt-10">
        <template v-for="group in bookmarks">
            <div v-if="group.title.elementId" :id="group.title.elementId" />
            <a :href="group.title.link"
               :target="group.title.link.startsWith('https://') ? '_blank' : '_self'"
               class="sm:text-xl font-medium mt-6 mb-2 text-slate-800 dark:text-slate-300">
                <h2 class="hover:*:opacity-100">
                    <span>{{ group.title.text }}</span>
                    <span
                        class="ml-2 text-slate-400 dark:text-slate-500 select-none opacity-0 transition-opacity duration-150">#</span>
                </h2>
            </a>
            <div class="h-1 bg-slate-200 dark:bg-slate-900 rounded-full overflow-hidden mb-6">
                <div class="w-24 h-full bg-gradient-to-r from-indigo-500 to-purple-600 dark:bg-slate-800"></div>
            </div>
            <div class="w-full grid grid-cols-2 md:grid-cols-4 gap-1 md:gap-2 mb-6 text-slate-800">
                <a v-for="item in group.items"
                   :href="item.link"
                   class="inline-flex items-center px-4 py-3 gap-1.5 border border-transparent hover:border-purple-600 hover:bg-purple-600/10 rounded-lg transition-all duration-200 hover:**:[.Note]:text-purple-500 hover:**:[.Note]:border-purple-500"
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
                        <div class="inline-flex flex-wrap items-center text-black dark:text-white">
                            <span v-html="item.name" />
                            <span v-if="(item.tags || []).includes('catalog')"
                                  class="ml-1.5 px-0.5 inline text-xs border rounded-xs text-blue-400 border-blue-400 dark:text-amber-200 dark:border-amber-200 transition-colors duration-200 Note">
                                目录</span>
                            <!--                            <Icon v-if="(item.tags || []).includes('catalog')"-->
                            <!--                                  class="ml-1 inline text-blue-400 dark:text-amber-200 transition-colors duration-200 Note"-->
                            <!--                                  height="16"-->
                            <!--                                  icon="carbon:catalog" />-->
                        </div>
                        <div class="text-gray-400 dark:text-gray-600 transition-colors duration-200 Note">
                            {{ item.note }}
                        </div>
                    </div>
                </a>
            </div>
        </template>
    </div>
</section>

<AiFooter />
</template>


<style scoped>
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
</style>
