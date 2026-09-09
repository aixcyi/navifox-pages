import { navifoxHome } from '@navifox/constants';
import { website } from '@navifox/utils';
import { useHead } from '@unhead/vue';
import { nextTick } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

import NotFound from '#/NotFound.vue';
import DocumentationsView from '#/views/DocumentationsView.vue';
import FavoritesView from '#/views/FavoritesView.vue';
import HomeView from '#/views/HomeView.vue';
import LinksView from '#/views/LinksView.vue';

const router = createRouter({
    history: createWebHistory(),
    /** 带 fragment（如 /#intro）平滑直达区块；普通页面切换回到顶部；前进后退恢复原滚动位置；
        同路径的重复导航（如已在首页点「首页」）不滚动。
        滚动前等待 RouterView 完成 DOM 更新，避免从长页深处切换时被旧滚动位置 clamp 在页面底部。 */
    scrollBehavior: async (to, from, savedPosition) => {
        if (savedPosition) return savedPosition;
        // 等待 RouterView 渲染并完成两帧布局后再滚动，
        // 避免从长页深处切换时被旧滚动位置 clamp 在页面底部
        await nextTick();
        await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
        if (to.hash) {
            // 自行 scrollIntoView：尊重区块的 scroll-mt 偏移（vue-router 的 el 滚动不读 scroll-margin）
            document.querySelector(to.hash)?.scrollIntoView({ behavior: 'smooth' });
            return;
        }
        if (to.path === from.path) return undefined;
        // 对象式调用并显式指定 behavior，覆盖全局 CSS 的 scroll-behavior: smooth
        window.scrollTo({ top: 0, behavior: 'instant' });
        return undefined;
    },
    routes: [
        {
            path: '/',
            name: 'Homepage',
            meta: {
                title: '首页',
                isShowOnNavbar: true,
            },
            component: HomeView,
        },
        {
            path: '/docs',
            name: 'Documentations',
            meta: {
                title: '月饼盒',
                isShowOnNavbar: true,
            },
            component: DocumentationsView,
        },
        {
            path: '/favs',
            name: 'Favorites',
            meta: {
                title: '星笺',
                isShowOnNavbar: true,
            },
            component: FavoritesView,
        },
        {
            path: '/links',
            name: 'Links',
            meta: {
                title: '友人帐',
                isShowOnNavbar: true,
            },
            component: LinksView,
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
        titleTemplate: to.meta.title ? `%s · ${navifoxHome.name}` : null,
    });
});

export default router;
