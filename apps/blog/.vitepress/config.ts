import { pinyin } from '@napi-rs/pinyin';
import { navifoxHome, sinceYear, untilYear, tighnari, foxeryGuild } from '@navifox/constants/website';
import { VitePressConfigurator, type PageHook } from '@navifox/vitepress';
import MarkdownIt from 'markdown-it';
import { groupIconMdPlugin, groupIconVitePlugin } from 'vitepress-plugin-group-icons';

import { markdownContainers } from './markdown-containers';

const mdit = MarkdownIt();

// https://vitepress.dev/reference/site-config
const configurator = new VitePressConfigurator({
    outDir: './dist',
    cacheDir: './cache',
    srcExclude: process.env.NODE_ENV === 'production' ? ['**/*.draft.*'] : [],
    head: [
        ['link', { rel: 'icon', href: '/favicon.ico', type: 'image/ico' }],
        ['link', { rel: 'preconnect', href: 'https://cdn.jsdelivr.net', crossorigin: '' }],
    ],
    locales: {
        root: {
            lang: 'zh-CN',
            label: '简体中文',
            title: '羽音',
            titleTemplate: ':title · 羽音', // •
            description: '一只毛茸茸爱好者的博客。',
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
                footer: {
                    message: undefined,
                    copyright: `© ${sinceYear}-${untilYear} <a href="${navifoxHome.link}" target="_blank">${tighnari.name}</a> 版权所有. All Rights Reserved.`,
                },
                lastUpdated: {
                    text: '最后提交时间',
                    formatOptions: { dateStyle: 'full', timeStyle: 'medium' },
                },
                notFound: {
                    title: '星夜湖畔的书简缺了一页',
                    quote: '或许已不存在，或许从不存在',
                    linkLabel: '返回首页',
                    linkText: '回到博客首页',
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
        lineNumbers: true,
        math: true,
        theme: {
            light: 'catppuccin-latte',
            dark: 'dark-plus',
        },
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
        config(md) {
            md.use(groupIconMdPlugin);
            md.use(markdownContainers);
        },
    },
    vite: {
        plugins: [
            // @ts-ignore
            groupIconVitePlugin(),
        ],
        resolve: {
            alias: {
                '#': __dirname,
            },
        },
        server: {
            allowedHosts: ['.navifox.net'],
        },
    },
    transformPageData(p) {
        p.frontmatter.excerpt = p.frontmatter.excerpt ? mdit.renderInline(p.frontmatter.excerpt) : '';
        p.frontmatter.tags = ((p.frontmatter.tags ?? []) as string[]).sort((a, b) =>
            pinyin(a).join('').localeCompare(pinyin(b).join('')),
        );
    },
});

const pageHookDefault: PageHook = {
    compareFolder: (a, b) => b.url.localeCompare(a.url),
    compareFile: (a, b) =>
        +new Date(b.frontmatter.updateAt ?? b.frontmatter.createAt) -
        +new Date(a.frontmatter.updateAt ?? a.frontmatter.createAt),
    compareItem: () => 1,
};

configurator
    .hookPageOrdering(pageHookDefault)
    .goto('root')
    .pushSocial({ ariaLabel: 'QQ群聊', icon: 'qq', link: foxeryGuild.link })
    .pushSocial({ ariaLabel: 'GitHub 仓库', icon: 'github', link: 'https://github.com/aixcyi/navifox-pages' })
    .autoSidebar('/', './', { deep: 'only' })
    .autoNavLink({ link: '/posts' })
    .autoDirMenu('./', { text: '归档' })
    .autoNavLink({ link: '/anywhere' })
    .pushNavLink({ text: navifoxHome.name, link: navifoxHome.link });

export default configurator.define();
