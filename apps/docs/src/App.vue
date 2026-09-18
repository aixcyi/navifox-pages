<script lang="ts" setup>
import { navifoxDocs } from '@navifox/constants';
import { AiFooter } from '@navifox/ui';
import { website } from '@navifox/utils';
import { useHead } from '@unhead/vue';

import ThemeToggle from '#/components/ThemeToggle.vue';
import Toolbar from '#/components/Toolbar.vue';
import DocumentationsView from '#/views/DocumentationsView.vue';

useHead({
    title: navifoxDocs.text,
    meta: [...website.metas(navifoxDocs), ...website.og(navifoxDocs)],
    link: [...website.links(navifoxDocs)],
});
</script>

<template>
    <Toolbar>
        <ThemeToggle />
    </Toolbar>
    <DocumentationsView />
    <AiFooter />
</template>
