<script lang="ts" setup>
import AiFooter from '#/components/AiFooter.vue';
import NavBar from '#/components/NavBar.vue';
import NavDropdown from '#/components/NavDropdown.vue';
</script>


<template>
<header class="relative z-10">
    <NavBar class="MaxContainer z-20" />
</header>
<NavDropdown />
<router-view />
<AiFooter />
</template>
