import * as path from 'node:path';

import { navifoxRefs } from '@navifox/constants/website';
import { ogPlugin } from '@navifox/utils/vite';
import tailwindcss from '@tailwindcss/postcss';
import vue from '@vitejs/plugin-vue';
import Icons from 'unplugin-icons/vite';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        Icons({ compiler: 'vue3', scale: 1 }),
        ogPlugin({
            title: navifoxRefs.text,
            description: navifoxRefs.descriptionPure ?? '',
            url: navifoxRefs.link,
            siteName: navifoxRefs.text,
        }),
    ],
    css: {
        postcss: {
            plugins: [tailwindcss()],
        },
    },
    resolve: {
        alias: {
            '#': path.resolve(__dirname, './src'),
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
