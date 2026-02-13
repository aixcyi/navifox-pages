import type { LinkInfo } from '@navifox/types';
import { curriculumVitae, mooncakeDocs, navifox, navifoxGuild, seraphonogram, } from './websites';

// const nbsp = (txt: string) => txt.replace(' ', '&nbsp;')

export const socials: LinkInfo[] = [
    { text: navifoxGuild.name, icon: 'bi:tencent-qq', link: navifoxGuild.link },
    // { text: '推特<br/>X／Twitter', icon: 'simple-icons:x', link: 'https://x.com/aixcyi/' },
    { text: undefined, link: '' },
    { text: 'GitHub', icon: 'simple-icons:github', link: 'https://github.com/aixcyi/' },
    { text: 'PyPI', icon: 'file-icons:pypi', link: 'https://pypi.org/user/aixcyi/' },
    {
        text: 'JetBrains 插件市场',
        icon: 'simple-icons:jetbrains',
        link: 'https://plugins.jetbrains.com/author/aixcyi/',
    },
    // { text: 'Gitee', icon: 'simple-icons:gitee', link: 'https://gitee.com/aixcyi/' },
]

export const websites: LinkInfo[] = [
    // { text: seraphonogram.name, link: seraphonogram.link },
    // { text: '友情链接', link: '/links', icon: 'solar:link-square-line-duotone' },
    // { text: travelling.name, link: travelling.link, icon: 'pepicons-print:train' },
    // { text: moeTravel.name, link: moeTravel.link, icon: 'solar:planet-bold-duotone' },
]

export const sitemap: LinkInfo[] = [
    { text: navifox.name, link: navifox.link },
    { text: seraphonogram.name, link: seraphonogram.link },
    { text: curriculumVitae.name, link: curriculumVitae.link },
    { text: mooncakeDocs.name, link: mooncakeDocs.link },
]

export const links: LinkInfo[] = [
    { text: 'Rabbit Mind', link: 'https://rabbitmind.net/' },
    { text: '纸鹿摸鱼处', link: 'https://blog.zhilu.site/' },
    { text: 'Pinpe 的云端', link: 'https://pinpe.top/' },
]

export const thanks: LinkInfo[] = [
    { text: 'oO大黄Oo', link: 'https://www.pixiv.net/users/9892346' },
    { text: '錯誤', link: 'https://www.pixiv.net/users/1297556' },
    { text: 'アナ', link: 'https://www.pixiv.net/users/24036634' },
    { text: 'shields.io', link: 'https://shields.io/' },
    { text: 'Iconify Design', link: 'https://iconify.design/' },
    { text: 'JetBrains Mono', link: 'https://www.jetbrains.com/lp/mono/' },
]
