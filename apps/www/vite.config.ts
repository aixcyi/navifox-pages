import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import * as path from 'node:path'
import { resolve } from 'path'
import { defineConfig } from 'vite'
import { viteZip } from 'vite-plugin-zip-file'


const timestamp = Math.trunc(new Date().getTime() / 1000)

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
    define: {
        '__APP_VERSION__': `"v${process.env.npm_package_version}+${timestamp}"`,
    },
    resolve: {
        alias: {
            '#': resolve(__dirname, './src'),
        }
    },
})
