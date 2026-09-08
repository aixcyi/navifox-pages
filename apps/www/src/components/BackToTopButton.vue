<script lang="ts" setup>
import { Icon } from '@iconify/vue';
import { onBeforeUnmount, onMounted, ref } from 'vue';

const isTallPage = ref(false);
const isVisible = ref(false);

/**
 * 仅当页面总高度超过两倍视口高度（存在可大幅滚动的内容）时，
 * 才执行“滚动越过一屏后显示”的逻辑；矮页面（书签/友链等）不显示回顶按钮。
 */
function updateVisibility() {
    isTallPage.value = document.documentElement.scrollHeight > window.innerHeight * 2;
    isVisible.value = isTallPage.value && window.scrollY > window.innerHeight;
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

onMounted(() => {
    updateVisibility();
    window.addEventListener('scroll', updateVisibility, { passive: true });
    window.addEventListener('resize', updateVisibility);
});

onBeforeUnmount(() => {
    window.removeEventListener('scroll', updateVisibility);
    window.removeEventListener('resize', updateVisibility);
});
</script>

<template>
    <Transition
        enter-active-class="transition-opacity duration-300 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity duration-200 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
    >
        <button
            v-if="isVisible"
            class="bg-starlight-600 hover:bg-starlight-500 text-paper-50 dark:bg-starlight-500 dark:hover:bg-starlight-400 dark:text-night-900 shadow-starlight-600/30 fixed right-5 bottom-6 z-40 flex size-11 cursor-pointer items-center justify-center rounded-full shadow-lg transition-colors duration-200"
            aria-label="回到顶部"
            title="回到顶部"
            type="button"
            @click="scrollToTop"
        >
            <Icon height="22" icon="material-symbols:keyboard-arrow-up-rounded" />
        </button>
    </Transition>
</template>
