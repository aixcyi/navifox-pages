import HomeView from '#/views/HomeView.vue';
import TimestampView from '#/views/TimestampView.vue';
import { navifoxRefs } from '@navifox/constants';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            component: HomeView,
            path: '/',
            name: 'HomeView',
        },
        {
            component: TimestampView,
            path: '/timestamp',
            name: 'TimestampView',
            meta: {
                title: '时间戳对照表',
            }
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
