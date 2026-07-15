import { VitePressConfigurator, type PageHooks } from './utils/vitepress';
import { trimSuffix } from './utils/string';

// https://vitepress.dev/reference/site-config
const configurator = new VitePressConfigurator(
    {
        outDir: './dist.press',
        cacheDir: './cache',
        title: '蓝溪拾遗',
        description: '罗小黑世界观下的设定集与友链。',
        head: [['link', { rel: 'icon', href: '/favicon.ico', type: 'image/ico' }]],
        locales: {
            root: {
                lang: 'zh-CN',
                label: '简体中文',
                title: 'Zeraora',
                titleTemplate: ':title × Zeraora',
                description: 'Zeraora 文档',
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
                    nav: [
                        /* 在下方以代码形式定义导航栏 */
                    ],
                    sidebar: {
                        /* 在下方以代码形式定义侧边栏 */
                    },
                    socialLinks: [
                        { icon: 'qq', link: 'https://qm.qq.com/q/7WO1tJmTss', ariaLabel: '罗狐会馆群聊' },
                        { icon: 'github', link: 'https://github.com/vuejs/vitepress', ariaLabel: 'GitHub 仓库' },
                    ],
                },
            },
        },
        lastUpdated: true,
        markdown: {
            container: {
                tipLabel: '提示',
                warningLabel: '注意',
                dangerLabel: '当心',
                infoLabel: '信息',
                detailsLabel: '详细信息',
            },
        },
        vite: {
            server: {
                allowedHosts: ['.navifox.net'],
            },
        },
    },
    {
        compareFolder: (a, b) => a.url.localeCompare(b.url),
        compareFile: (a, b) => trimSuffix(a.url, '.html').localeCompare(trimSuffix(b.url, '.html')),
        compareItem: () => 1,
    },
);

const hooksOrdered: PageHooks = {
    compareFile: (a, b) => a.frontmatter.title.localeCompare(b.frontmatter.title),
};

configurator
    .goto('root')
    .autoSidebar('/guild/', './guild/', { hooks: hooksOrdered, deep: true })
    .autoSidebar('/spirit/', './spirit/', { hooks: hooksOrdered, deep: true })
    .pushNavLink({ text: '妖灵集', link: '/spirit', activeMatch: '/spirit/' })
    .pushNavLink({ text: '会馆名录', link: '/guild/cangnan', activeMatch: '/guild/' })
    .pushNavLink({ text: '术语表', link: '/glossary' })
    .pushNavMenu({
        text: '更多',
        items: [
            { text: '发行说明', link: '/releases' },
            { text: '如何参与贡献？', link: '/contributing' },
            { text: '路狐领航', link: 'https://www.navifox.net/' },
        ],
    });

export default configurator.define();
