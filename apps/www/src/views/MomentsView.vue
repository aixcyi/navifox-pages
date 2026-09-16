<script lang="ts" setup>
import { computed } from 'vue';

import MomentCard from '#/components/MomentCard.vue';
import Navbar from '#/components/Navbar.vue';
import SectionHeader from '#/components/SectionHeader.vue';
import Stardust from '#/components/Stardust.vue';
import { moments } from '#/data/moments';

/** 按时间倒序展示，数据文件里的书写顺序不影响版面。 */
const sortedMoments = computed(() => [...moments].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()));
</script>

<template>
    <div class="bg-paper-50 dark:bg-night-950 relative min-h-dvh">
        <Navbar />
        <div class="MaxContainer relative text-stone-600 dark:text-slate-300">
            <SectionHeader class="mt-48" centered eyebrow="Navifox · Moments" level="h1" title="凭栏处">
                应似飞鸿踏雪尘，泥上偶然留爪痕<br />
            </SectionHeader>

            <section aria-label="碎碎念" class="mx-auto mt-12 mb-36 flex max-w-2xl flex-col gap-6">
                <MomentCard v-for="moment in sortedMoments" :key="moment.id" :moment="moment" />
            </section>
        </div>
        <Stardust />
    </div>
</template>
