import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { defineConfig } from 'vite'


const timestamp = Math.trunc(new Date().getTime() / 1000)

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        tailwindcss(),
        vue(),
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
