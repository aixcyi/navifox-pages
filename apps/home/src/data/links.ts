import { documentation, moeTravel, navifox, travelling, weblog } from '#/data/websites.ts'
import type { Hyperlink } from '#/types'

// const nbsp = (txt: string) => txt.replace(' ', '&nbsp;')

export const socials: Hyperlink[] = [
    { text: '罗狐会馆', icon: 'bi:tencent-qq', link: 'https://qm.qq.com/q/gPK9D7nBOU' },
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

export const websites: Hyperlink[] = [
    // { text: weblog.name, link: weblog.link },
    // { text: '友情链接', link: '/links', icon: 'solar:link-square-line-duotone' },
    // { text: travelling.name, link: travelling.link, icon: 'pepicons-print:train' },
    // { text: moeTravel.name, link: moeTravel.link, icon: 'solar:planet-bold-duotone' },
]

export const sitemap: Hyperlink[] = [
    { text: navifox.name, link: navifox.link },
    { text: weblog.name, link: weblog.link },
    { text: documentation.name, link: documentation.link },
]

export const links: Hyperlink[] = [
    { text: 'Rabbit Mind', link: 'https://rabbitmind.net/' },
    { text: travelling.name, link: travelling.link },
    { text: moeTravel.name, link: moeTravel.link },
]

export const thanks: Hyperlink[] = [
    { text: 'oO大黄Oo', link: 'https://www.pixiv.net/users/9892346' },
    { text: '錯誤', link: 'https://www.pixiv.net/users/1297556' },
    { text: 'アナ', link: 'https://www.pixiv.net/users/24036634' },
    { text: 'shields.io', link: 'https://shields.io/' },
    { text: 'Iconify Design', link: 'https://iconify.design/' },
    { text: 'JetBrains Mono', link: 'https://www.jetbrains.com/lp/mono/' },
]
