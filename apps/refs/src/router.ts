import HomeView from '#/views/HomeView.vue';
import { navifoxRefs } from '@navifox/constants';
import { createRouter, createWebHistory } from 'vue-router';

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
