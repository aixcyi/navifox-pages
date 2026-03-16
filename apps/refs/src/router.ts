import HomeView from '#/views/HomeView.vue';
import { navifoxRefs } from '@navifox/constants';
import { createRouter, createWebHistory } from 'vue-router';

declare module 'vue-router' {
    interface RouteMeta {
        title: string
        description?: string
    }
}

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'Homepage',
            component: HomeView,
        },
        {
            path: '/timestamp',
            name: 'TimestampSheet',
            meta: {
                title: '时间戳对照表',
                description: '对照、查询不同进位制（字符集）下的计数空间，以及不同单位的时间存储上限。',
            },
            component: () => import('#/views/TimestampView.vue'),
        },
        {
            path: '/genshin/talent',
            name: 'GenshinTalent',
            meta: {
                title: '角色实用天赋表',
                description: '原神角色（截止 6.4 月之三版本）部分实用天赋一览表。',
            },
            component: () => import('#/views/GenshinTalentsView.vue'),
        }
    ]
})
router.beforeEach((to, _, next) => {
    document.title =
        to.meta?.title
            ? `${to.meta.title} - ${navifoxRefs.name}`
            : navifoxRefs.name
    next()
})

export default router;
