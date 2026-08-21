import { resolve } from 'path';

import { navifoxHome } from '@navifox/constants/website';
import { ogPlugin } from '@navifox/utils/vite';
import tailwindcss from '@tailwindcss/vite';
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';

const timestamp = Math.trunc(new Date().getTime() / 1000);

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        tailwindcss(),
        vue(),
        ogPlugin({
            title: navifoxHome.name,
            description: navifoxHome.description ?? '',
            url: navifoxHome.link,
            siteName: navifoxHome.name,
        }),
    ],
    define: {
        __APP_VERSION__: `"v${process.env.npm_package_version}+${timestamp}"`,
    },
    resolve: {
        alias: {
            '#': resolve(__dirname, './src'),
        },
    },
    server: {
        allowedHosts: ['.navifox.net'],
    },
});
