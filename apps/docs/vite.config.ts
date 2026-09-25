import * as path from 'node:path';

import { navifoxDocs } from '@navifox/constants/website';
import { ogPlugin } from '@navifox/utils/vite';
import tailwindcss from '@tailwindcss/vite';
import vue from '@vitejs/plugin-vue';
import Icons from 'unplugin-icons/vite';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        tailwindcss(),
        vue(),
        Icons({ compiler: 'vue3', scale: 1 }),
        ogPlugin({
            title: navifoxDocs.text,
            description: navifoxDocs.descriptionPure ?? '',
            url: navifoxDocs.link,
            siteName: navifoxDocs.text,
        }),
    ],
    resolve: {
        alias: {
            '#': path.resolve(__dirname, './src'),
        },
    },
    server: {
        allowedHosts: ['.navifox.net'],
    },
});
