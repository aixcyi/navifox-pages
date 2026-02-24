<script lang="ts" setup>
import { cn } from '#/lib/utils.ts';
import { useWindowScroll } from '@vueuse/core';
import { Primitive, type PrimitiveProps } from 'reka-ui';
import { type HTMLAttributes, nextTick, onMounted, ref } from 'vue';
import type { ButtonVariants } from './index.ts';
import { buttonVariants } from './index.ts';

interface Props extends PrimitiveProps {
    variant?: ButtonVariants["variant"]
    size?: ButtonVariants["size"]
    class?: HTMLAttributes["class"]

    /**
     * - 直到 {@link HTMLElement} 的顶边之下才显示按钮；
     * - 窗口滚动到某个进度 {@link Number} 之后才显示按钮；
     * - 不提供则始终显示按钮。
     */
    see?: HTMLElement | number | null

    /**
     * - 点击滚动到 {@link HTMLElement} 的顶边；
     * - 点击滚动到窗口滚动条 {@link Number} 的位置；
     * - 点击滚动到窗口顶部。
     */
    to?: HTMLElement | number | null
}

function scrollToTop() {
    if (isScrolling.value)
        return
    isScrolling.value = true
    y.value = (
        props.to == null
            ? 0
            : props.to instanceof HTMLElement
                ? props.to.getBoundingClientRect().y + y.value
                : props.to
    )
    isScrolling.value = false
}

function onScroll() {
    if (isScrolling.value)
        return
    if (props.see == null) {
        isVisible.value = true
        return
    }
    isVisible.value = y.value > (
        props.see instanceof HTMLElement
            ? props.see.getBoundingClientRect().y + y.value
            : props.see
    )
}

const props = withDefaults(defineProps<Props>(), {
    as: "button",
})
const isScrolling = ref(false)
const isVisible = ref(false)
const { y } = useWindowScroll({ behavior: 'smooth', onScroll })

onMounted(async () => {
    await nextTick(onScroll)
})
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
    <Primitive
        v-if="isVisible"
        :as="as"
        :as-child="asChild"
        :class="cn(buttonVariants({ variant, size }), props.class)"
        data-slot="button"
        @click="scrollToTop"
    >
        <slot />
    </Primitive>
</Transition>
</template>
