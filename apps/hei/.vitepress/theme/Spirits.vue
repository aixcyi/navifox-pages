<script setup lang="ts">
import { VPTeamPage, VPTeamPageTitle } from 'vitepress/theme';
import SpiritCard from '#/theme/components/SpiritCard.vue';
import { spirits } from '#/spirits';
</script>

<template>
    <VPTeamPage>
        <VPTeamPageTitle>
            <template #title>妖灵集 · 拾遗录</template>
            <template #lead>某年某月，某妖聚灵某地；命运交汇，我们相聚于此</template>
        </VPTeamPageTitle>
        <div class="box">
            <SpiritCard v-bind="spirit" v-for="spirit in spirits" />
        </div>
    </VPTeamPage>
</template>

<style scoped>
.box {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 16px;
    margin: 16px 0;
    padding: 16px;
    justify-content: center;
}
</style>
