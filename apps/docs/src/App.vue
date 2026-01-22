<script lang="ts" setup>
import FlairButton from '#/components/FlairButton.vue'
import RawCard from '#/components/RawCard.vue'
import RepoCard from '#/components/RepoCard.vue'
import { projects } from '#/data'
import { Icon } from '@iconify/vue'
</script>


<template>
    <section class="w-screen min-h-screen flex justify-center items-center">
        <RawCard class="gap-8">
            <h1 class="text-5xl text-white"><b>雪泥文档</b></h1>
            <span class="text-lg text-amber-100 tracking-[.333em]">· 雪泥鸿爪文档收容站点 ·</span>
            <div class="text-lg font-mono relative">
                <FlairButton flair-style="--button-stroke: var(--gradient-milktea);"
                             href="#panel"
                             use="a">
                    ShowMe Docs<br />
                </FlairButton>
            </div>
        </RawCard>
    </section>

    <section class="w-screen min-h-screen flex justify-center items-center flex-col">
        <div id="panel" />
        <RepoCard v-for="project in projects"
                  :description="project.desc"
                  :doc="project.docs"
                  :title="project.name"
                  class="gap-6 text-amber-100 LinkCard">
            <template #iconbar>
                <template v-for="item in project.socials">
                    <a v-if="item.icon"
                       :href="item.link"
                       class="hover:text-amber-300">
                        <Icon :icon="item.icon" height="24" />
                    </a>
                </template>
            </template>
        </RepoCard>
    </section>
</template>


<style scoped>
.LinkCard {
    border: 1px solid transparent;

    &:hover {
        border-top: 1px solid var(--color-orange-400);
        border-bottom: 1px solid var(--color-orange-400);
    }
}
</style>
