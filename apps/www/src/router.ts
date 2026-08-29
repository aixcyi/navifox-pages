import { navifoxHome } from '@navifox/constants';
import { website } from '@navifox/utils';
import { useHead } from '@unhead/vue';
import { createRouter, createWebHistory } from 'vue-router';

import NotFound from '#/NotFound.vue';
import HomeView from '#/views/HomeView.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'Homepage',
            meta: {
                showOnNavbar: true,
            },
            component: HomeView,
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'NotFound',
            meta: {
                title: '页面不存在',
            },
            component: NotFound,
        },
    ],
});

router.beforeEach((to) => {
    useHead({
        title: (to.meta.title as string | undefined) ?? navifoxHome.name,
        meta: [
            ...website.metas(navifoxHome, {
                description: to.meta.description as string | undefined,
                keywords: to.meta.keywords as string[] | undefined,
            }),
            ...website.og(navifoxHome, {
                title: to.meta.title as string | undefined,
                description: to.meta.description as string | undefined,
                url: navifoxHome.link + to.fullPath,
            }),
        ],
        link: [...website.links(navifoxHome)],
        titleTemplate: to.meta.title ? `%s × ${navifoxHome.name}` : null,
    });
});

export default router;
