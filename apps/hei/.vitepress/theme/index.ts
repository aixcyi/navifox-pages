import type { Theme } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import { h } from 'vue';
import '@navifox/styles/fonts';
import '@catppuccin/vitepress/theme/macchiato/peach.css';
import '#/theme/style.css';
import SpiritBanner from '#/theme/components/SpiritBanner.vue';
import SpiritCard from '#/theme/components/SpiritCard.vue';

// https://vitepress.dev/guide/custom-theme
export default {
    extends: DefaultTheme,
    Layout: () => {
        return h(DefaultTheme.Layout, null, {
            // https://vitepress.dev/guide/extending-default-theme#layout-slots
        });
    },
    enhanceApp({ app }) {
        app.component('SpiritCard', SpiritCard);
        app.component('SpiritBanner', SpiritBanner);
    },
} satisfies Theme;
