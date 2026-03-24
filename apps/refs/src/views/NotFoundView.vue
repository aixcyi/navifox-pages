<script lang="ts" setup>
import NotFoundAnimation from '#/asserts/notfound.gif';
import Content from '#/layouts/Content.vue';
</script>


<template>
<Content>
    <template #body>
        <div class="h-full my-auto flex flex-col justify-center items-center text-slate-600 dark:text-slate-400">
            <img :src="NotFoundAnimation" alt="Animation" class="max-w-64" style="width: calc(100vw - 4rem)" />
            <h2 class="text-2xl mt-8">页面不存在</h2>
            <h3 class="text-lg mt-1">Page Not Found</h3>
        </div>
    </template>
</Content>
</template>


<style scoped>
</style>
