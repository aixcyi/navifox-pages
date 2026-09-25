<script lang="ts" setup>
import { markit } from '@navifox/utils';
import { Comment, computed, Fragment, h, Text, type VNode, type VNodeArrayChildren } from 'vue';

function processVNodes(vNodes: VNodeArrayChildren): VNodeArrayChildren {
    return vNodes.map((node) => {
        if (typeof node === 'string' || typeof node === 'number') {
            return h('span', { innerHTML: markit(String(node)) });
        }
        if (!node || typeof node !== 'object') {
            return node;
        }

        const vNode = node as VNode;

        if (vNode.type === Text) {
            return h('span', { innerHTML: markit(String(vNode.children ?? '')) });
        }
        if (vNode.type === Comment) {
            return node;
        }
        if (vNode.type === Fragment) {
            if (Array.isArray(vNode.children)) {
                return h(Fragment, null, processVNodes(vNode.children as VNodeArrayChildren));
            }
            return vNode;
        }
        if (typeof vNode.type === 'string' && Array.isArray(vNode.children)) {
            return h(vNode.type, vNode.props, processVNodes(vNode.children as VNodeArrayChildren));
        } else {
            return vNode;
        }
    });
}

const props = defineProps<{ paragraph?: boolean; text?: string }>();
const slots = defineSlots<{ default(): any }>();
const rendered = computed(() => {
    const tag = props.paragraph ? 'p' : 'span';

    if (props.text) {
        return h(tag, { innerHTML: markit(props.text) });
    }

    const vNodes = slots.default?.();
    const children = vNodes ? (Array.isArray(vNodes) ? vNodes : [vNodes]) : [];
    return h(tag, processVNodes(children as VNodeArrayChildren));
});
</script>

<template>
    <component :is="rendered" />
</template>
