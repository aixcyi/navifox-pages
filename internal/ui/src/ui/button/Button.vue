<script lang="ts" setup>
import { Primitive, type PrimitiveProps } from 'reka-ui';
import { type HTMLAttributes } from 'vue';
import type { ButtonVariants } from '.';
import { buttonVariants } from '.';
import { cn } from '../../lib/utils';

interface Props extends PrimitiveProps {
    variant?: ButtonVariants["variant"]
    size?: ButtonVariants["size"]
    class?: HTMLAttributes["class"]
}

const props = withDefaults(defineProps<Props>(), {
    as: "button",
})
</script>


<template>
<Primitive
    :as="as"
    :as-child="asChild"
    :class="cn(buttonVariants({ variant, size }), props.class)"
    data-slot="button"
>
    <slot />
</Primitive>
</template>
