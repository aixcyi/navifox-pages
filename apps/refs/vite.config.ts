import tailwindcss from '@tailwindcss/vite';
import vue from '@vitejs/plugin-vue';
import * as path from 'node:path';
import { defineConfig } from 'vite';
import { viteZip } from 'vite-plugin-zip-file';

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        tailwindcss(),
        vue(),
        viteZip({
            folderPath: path.resolve(__dirname, 'dist'),
            outPath: path.resolve(__dirname),
            zipName: 'dist.zip',
            withoutMainFolder: true,
        }),
    ],
    resolve: {
        alias: {
            '#': path.resolve(__dirname, './src'),
        },
    },
    server: {
        allowedHosts: [
            '.navifox.net',
        ],
    },
})
