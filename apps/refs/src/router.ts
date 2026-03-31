import HomeView from '#/views/HomeView.vue';
import NotFoundView from '#/views/NotFoundView.vue';
import { navifoxRefs } from '@navifox/constants';
import { useWebsiteLinks, useWebsiteMetas } from '@navifox/utils';
import { useHead } from '@unhead/vue';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'Homepage',
            component: HomeView,
        }, {
            path: '/timestamp',
            name: 'TimestampSheet',
            meta: {
                title: '时间戳对照表',
                description: '对照、查询不同进位制（字符集）下的计数空间，以及不同单位的时间存储上限。',
                keywords: [ '时间戳', '进制', '进位制', '表格', '字符集', '字符串', '对照表' ],
                logo: 'svg-spinners:clock',
            },
            component: () => import('#/views/TimestampView.vue'),
        }, {
            path: '/mirror',
            name: 'MirrorSheet',
            meta: {
                title: '镜像源',
                description: '展示常见包管理器（pip、npm 等等）的镜像源设置，用于快速设置与解决问题；镜像源按收录时间排序。',
                keywords: [ 'pip', 'npm', 'pnpm', '镜像源' ],
            },
            component: () => import('#/views/MirrorView.vue'),
        }, {
            path: '/tailwind',
            name: 'TailwindColorSheet',
            meta: {
                title: 'Tailwind 颜色一览',
                description: 'Tailwind CSS v4 颜色相关类名与变量名一览',
                keywords: [ 'Tailwind', 'TailwindCSS', 'CSS', '颜色' ],
                logo: 'logos:tailwindcss-icon',
            },
            component: () => import('#/views/TailwindColorView.vue'),
        }, {
            path: '/uuid',
            name: 'UUIDAnalysisSheet',
            meta: {
                title: 'UUID 结构',
                description: '通用唯一标识符 UUID（Universally Unique IDentifier）结构解析。',
                keywords: [ 'UUID', 'id', 'RFC9562', 'RFC4122' ],
            },
            component: () => import('#/views/UUIDAnalysisView.vue'),
        }, {
            path: '/genshin/talent',
            name: 'GenshinTalentSheet',
            meta: {
                title: '角色实用天赋表',
                description: '原神角色（截止 6.4 月之五版本）部分实用天赋一览表（按游戏内图鉴顺序排序）。',
                keywords: [ '原神', '角色', '天赋', '空月之歌', '月之五', '6.4' ],
            },
            component: () => import('#/views/GenshinTalentsView.vue'),
        }, {
            path: '/:pathMatch(.*)*',
            name: 'NotFound',
            meta: {
                title: '页面不存在',
            },
            component: NotFoundView,
        }
    ]
})
router.beforeEach(to => {
    useHead({
        title: to.meta.title ?? navifoxRefs.name,
        meta: [ ...useWebsiteMetas(navifoxRefs, { description: to.meta.description, keywords: to.meta.keywords }) ],
        link: [ ...useWebsiteLinks(navifoxRefs) ],
        titleTemplate: to.meta.title ? `%s × ${navifoxRefs.name}` : null,
    })
})

export default router;
