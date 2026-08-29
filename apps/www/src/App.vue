<script lang="ts" setup>
import { AiFooter } from '@navifox/ui';

const version = __APP_VERSION__;
</script>

<template>
    <RouterView />
    <AiFooter class="relative z-30">
        <template #additions>
            <p>
                构建为 <code>{{ version }}</code>
            </p>
        </template>
    </AiFooter>
</template>
