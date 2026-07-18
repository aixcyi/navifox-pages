import { VitePressConfigurator, type PageHook } from './utils/vitepress';
import { trimSuffix } from './utils/string';

// https://vitepress.dev/reference/site-config
const configurator = new VitePressConfigurator({
    outDir: './dist.press',
    cacheDir: './cache',
    srcExclude:
        process.env.NODE_ENV === 'production'
            ? ['**/dist.*/**', '**/*.draft.*'] // 不打包草稿文件
            : ['**/dist.*/**'],
    head: [['link', { rel: 'icon', href: '/favicon.ico', type: 'image/ico' }]],
    locales: {
        root: {
            lang: 'zh-CN',
            label: '简体中文',
            title: '蓝溪拾遗',
            titleTemplate: ':title · 蓝溪拾遗', // •
            description: '罗小黑世界观下的设定集与通联友链。',
            themeConfig: {
                // https://vitepress.dev/reference/default-theme-config
                langMenuLabel: '切换语言',
                sidebarMenuLabel: '目录',
                darkModeSwitchLabel: '颜色主题',
                darkModeSwitchTitle: '切换到深色主题',
                lightModeSwitchTitle: '切换到浅色主题',
                returnToTopLabel: '回到顶部',
                outline: { label: '大纲' },
                docFooter: { prev: '上一篇', next: '下一篇' },
                lastUpdated: {
                    text: '最后提交时间',
                    formatOptions: { dateStyle: 'full', timeStyle: 'medium' },
                },
                notFound: {
                    title: '星夜湖畔的书简缺了一页',
                    quote: '或许已不存在，或许从不存在',
                    linkLabel: '返回首页',
                    linkText: '回到梦开始的地方',
                },
                nav: [
                    /* 在下方以代码形式定义导航栏 */
                ],
                sidebar: {
                    /* 在下方以代码形式定义侧边栏 */
                },
                socialLinks: [
                    /* 在下方以代码形式定义社交链接 */
                ],
            },
        },
    },
    lastUpdated: true,
    markdown: {
        container: {
            infoLabel: '信息',
            noteLabel: '备注',
            tipLabel: '提示',
            warningLabel: '注意',
            dangerLabel: '慎重',
            detailsLabel: '详情',
            importantLabel: '重点',
            cautionLabel: '当心',
        },
    },
    vite: {
        resolve: {
            alias: {
                '#': __dirname,
            },
        },
        server: {
            allowedHosts: ['.navifox.net'],
        },
    },
});

const pageHookDefault: PageHook = {
    compareFolder: (a, b) => a.url.localeCompare(b.url),
    compareFile: (a, b) => trimSuffix(a.url, '.html').localeCompare(trimSuffix(b.url, '.html')),
    compareItem: () => 1,
};
const pageHookOrdered: PageHook = {
    compareFile: (a, b) => a.frontmatter.title.localeCompare(b.frontmatter.title),
};

configurator
    .hookPageOrdering(pageHookDefault)
    .goto('root')
    .pushSocial({ ariaLabel: '罗狐会馆群聊', icon: 'qq', link: 'https://qm.qq.com/q/7WO1tJmTss' })
    .pushSocial({ ariaLabel: 'GitHub 仓库', icon: 'github', link: 'https://github.com/vuejs/vitepress' })
    .autoSidebar('/guild/', './guild/', { pageHook: pageHookOrdered, deep: true })
    .autoSidebar('/spirit/', './spirit/', { pageHook: pageHookOrdered, deep: true })
    .pushNavLink({ text: '妖灵集', link: '/spirit', activeMatch: '/spirit/' })
    .pushNavLink({ text: '妖灵会馆一览', link: '/guild/cangnan', activeMatch: '/guild/' })
    .pushNavLink({ text: '术语简表', link: '/glossary', activeMatch: '/glossary/' })
    .pushNavMenu({
        text: '关于',
        items: [
            { text: '此网站', link: '/about' },
            { text: '妖灵通联指南', link: '/about#spirit' },
            { text: '会馆联谊', link: '/about#guild' },
            { items: [{ text: '路狐领航', link: 'https://www.navifox.net/' }] },
        ],
    });

export default configurator.define();
