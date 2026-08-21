import * as path from 'node:path';

import { navifoxRefs } from '@navifox/constants/website';
import { ogPlugin } from '@navifox/utils/vite';
import tailwindcss from '@tailwindcss/vite';
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        tailwindcss(),
        vue(),
        ogPlugin({
            title: navifoxRefs.name,
            description: navifoxRefs.description ?? '',
            url: navifoxRefs.link,
            siteName: navifoxRefs.name,
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
