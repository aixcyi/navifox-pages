import { navifoxRefs } from '@navifox/constants/website';
import tailwindcss from '@tailwindcss/vite';
import vue from '@vitejs/plugin-vue';
import * as path from 'node:path';
import { defineConfig } from 'vite';
import { ogPlugin } from '@navifox/utils/vite';

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
