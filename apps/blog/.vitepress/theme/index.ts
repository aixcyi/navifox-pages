// https://vitepress.dev/guide/custom-theme
import { h } from 'vue';
import type { Theme } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import '@catppuccin/vitepress/theme/macchiato/maroon.css';
import 'virtual:group-icons.css';
import '#/theme/style.css';
import AiDocAsideMeta from '#/theme/components/AiDocAsideMeta.vue';

export default {
    extends: DefaultTheme,
    Layout: () => {
        return h(DefaultTheme.Layout, null, {
            // https://vitepress.dev/zh/guide/extending-default-theme#layout-slots
            'aside-outline-before': () => h(AiDocAsideMeta),
        });
    },
    enhanceApp() {
        // ...
    },
} satisfies Theme;
