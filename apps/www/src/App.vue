<script lang="ts" setup>
import AppFooter from '#/components/AppFooter.vue';

const version = __APP_VERSION__;
</script>

<template>
    <RouterView />
    <AppFooter class="relative z-30">
        <template #additions>
            <p>
                构建为 <code>{{ version }}</code>
            </p>
        </template>
    </AppFooter>
</template>
