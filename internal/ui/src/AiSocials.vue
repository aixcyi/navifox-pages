<script lang="ts" setup>
/**
 * 站点主人的社交入口。
 *
 * 清单一处维护：链接与文案取自 `@navifox/constants` 的站点常量，图标是构建期编译出来的组件，
 * 不再按名字查运行时注册表。QQ 与 PyPI 用本地内联的 SVG 组件，避免为 1 枚图标引入整个集合。
 *
 * 调用方只负责外层容器与锚点的观感，两者都用 `<div>` 包一层——本组件是**多根节点**的片段，
 * 直接往它身上写 `class` 会落到片段的警告上。
 *
 * 图标**只给高度**，宽度交给 `width: auto` 按图稿的固有比例推：这几枚的画布比例并不一致
 * （PyPI 是 454×512、QQ 是 24×24），写死宽度会把它们压成方盒。
 */
import { egoGitHub, egoJetBrains, egoPyPI, foxeryGuild } from '@navifox/constants';
import type { Component } from 'vue';
import IconGitHub from '~icons/simple-icons/github';
import IconJetBrains from '~icons/simple-icons/jetbrains';

import FileIconsPyPI from './icons/PyPI.vue';
import StreamlineQQ from './icons/QQ.vue';

withDefaults(
    defineProps<{
        /** 图标高度（像素）；宽度按各自比例自适应。 */
        size?: number;

        /** 追加到每个锚点上的类名，用于适配各处的悬停色与点击区。 */
        linkClass?: string;
    }>(),
    { size: 24, linkClass: '' },
);

const SOCIALS: { icon: Component; link: string; label: string }[] = [
    { icon: StreamlineQQ, link: foxeryGuild.link, label: foxeryGuild.text },
    { icon: IconGitHub, link: egoGitHub.link, label: egoGitHub.text },
    { icon: FileIconsPyPI, link: egoPyPI.link, label: egoPyPI.text },
    { icon: IconJetBrains, link: egoJetBrains.link, label: egoJetBrains.text },
];
</script>

<template>
    <a
        v-for="social in SOCIALS"
        :key="social.link"
        :href="social.link"
        :title="social.label"
        :class="linkClass"
        target="_blank"
    >
        <component :is="social.icon" :style="{ height: `${size}px`, width: 'auto' }" />
    </a>
</template>
