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
            title: navifoxHome.text,
            description: navifoxHome.descriptionPure ?? '',
            url: navifoxHome.link,
            siteName: navifoxHome.text,
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
        warmup: {
            // 预热图标注册表与 Tailwind CSS，避免重启后首次访问时现场编译等待。
            clientFiles: ['./src/iconify.ts', './src/style.css'],
        },
    },
});
