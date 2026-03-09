import Content from '#/layouts/Content.vue';
import HomeView from '#/views/HomeView.vue';
import TimestampView from '#/views/TimestampView.vue';
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
            },
            component: Content,
            children: [ { path: '', component: TimestampView } ],
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
