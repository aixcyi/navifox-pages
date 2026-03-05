export type Navigation = { text: string, link: string, icon?: string } | { text: null }

export const sheets: Navigation[] = [
    { text: '时间戳对照表', link: '/timestamp' },
    { text: '语法更新摘要', link: '/grammar', icon: 'material-icon-theme:python' },
    { text: '镜像源', link: '/mirrors' },
    { text: 'UUID 结构', link: '/uuid' },
    { text: null },
    { text: 'CheatSheets.zip', link: 'https://cheatsheets.zip/', icon: 'https://cheatsheets.zip/images/favicon.png' },
    { text: '路狐领航', link: 'https://www.navifox.net/', icon: 'fluent-emoji-flat:fox' },
]
