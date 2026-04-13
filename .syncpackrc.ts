import type { RcFile } from 'syncpack';

/**
 * SyncPack 配置。
 *
 * - 用于管理 Monorepo 依赖版本一致性。
 *
 * @see [`.syncpackrc`](https://syncpack.dev/config/syncpackrc/)
 */
const config: RcFile = {
    // https://syncpack.dev/config/sort-first/
    sortFirst: [
        'name',
        'version',
        'private',
        'type',
        'scripts',
        'dependencies',
        'devDependencies',
        'peerDependencies',
        'optionalDependencies',
    ],
    // https://syncpack.dev/version-groups/
    versionGroups: [
        {
            label: '`workspace:*` packages',
            pinVersion: 'workspace:*',
            dependencies: [ '@navifox/*' ],
        },
        {
            label: '`catalog:` packages',
            pinVersion: 'catalog:',
            dependencies: [
                '@iconify/vue',
                '@tailwindcss/vite',
                '@types/markdown-it',
                '@types/node',
                '@unhead/vue',
                '@vitejs/plugin-vue',
                '@vue/tsconfig',
                '@vueuse/core',
                'class-variance-authority',
                'clsx',
                'es-toolkit',
                'genshin-db',
                'gsap',
                'markdown-it',
                'reka-ui',
                'tailwindcss',
                'tailwind-merge',
                'tw-animate-css',
                'typescript',
                'uuid',
                'vite',
                'vite-plugin-zip-file',
                'vue',
                'vue-router',
                'vue-tsc',
            ],
        },
    ],
};

export default config;
