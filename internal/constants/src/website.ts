/**
 * 本文件包含了可**静态编译**的网站元数据，包括：
 *
 * - 站点信息（{@link Website}）
 * - 个人信息（{@link Friend}）
 * - ASCII 签名画（用在控制台输出）
 * - 当年年份
 */

/// <reference types="vite/client" />

import type { Friend, Hyperlink, Website } from '@navifox/types';

function* detect(): Generator<Hyperlink> {
    const env = import.meta.env;
    if (!env) return;
    if (env.VITE_ICP_NO) yield { text: env.VITE_ICP_NO, link: env.VITE_ICP_REF };
    if (env.VITE_MPS_NO) yield { text: env.VITE_MPS_NO, link: env.VITE_MPS_REF };
    if (env.VITE_MOE_NO) yield { text: env.VITE_MOE_NO, link: env.VITE_MOE_REF };
}

export const sinceYear = 2016;
export const untilYear = Math.max(2026, new Date().getFullYear());
export const copyrights = [...detect()];
export const signature: string = `
      •  ┓       •
     ╋┓┏┓┣┓┏┓┏┓┏┓┓
━━━━━┗┗┗┫┛┗┛┗┗┻┛ ┗━━━━━━
        ┛
\n`;
export const tighnari: Friend = {
    name: '路狐羽',
    uid: 'aixcyi',
    tags: ['毛茸茸爱好者', '开发工程师', '罗狐会馆馆长'],
    titles: ['Django 高级后端开发', 'Vue3 开发'],
    avatar: 'https://www.navifox.net/avatar.jpg',
    avatar256: 'https://www.navifox.net/avatar256.jpg',
    avatar512: 'https://www.navifox.net/avatar512.jpg',
    description: 'Seeds of stories, brought by the wind and cultivated by time.',
    descriptionRich: 'Seeds of stories,<br/>brought by the wind and cultivated by time.',
    location: '广东 广州',
    groupQQ: '540457640',
    wxid: 'navifox',
    age: untilYear - 2000,
};
export const navifoxHome: Website = {
    name: '路狐领航',
    link: 'https://www.navifox.net',
    icon: 'https://www.navifox.net/favicon.ico',
    description: '愿在生活的密林里遇见一只路狐，与你相伴，为你领航。',
    descriptionRich: '<span>愿在生活的密林里遇见一只路狐，</span><span>与你相伴，为你领航。</span>',
    author: tighnari.name,
    tags: [tighnari.name, '阿羽', 'aixcyi', 'ayu', '路狐领航', '罗狐会馆', '妖灵会馆'],
};
export const navifoxRefs: Website = {
    name: '星笺',
    link: 'https://refs.navifox.net',
    icon: navifoxHome.icon,
    description: '狐狸们用小爪子敲出的一页纸快速参考。',
    descriptionRich: '狐狸们用小爪子敲出的<b>一页纸快速参考</b>。',
    author: tighnari.name,
    tags: ['快速参考', '参考', '星笺', '导航', '路狐领航'],
    note: '快速参考',
};
export const navifoxBlog: Website = {
    name: '羽音',
    link: 'https://blog.navifox.net',
    icon: navifoxHome.icon,
    description: '静谧星夜下不绝如缕的羽音。',
    descriptionRich: '<span>静谧星夜下</span><span>不绝如缕的羽音。</span>',
    author: tighnari.name,
    note: '博客',
};
export const navifoxDocs: Website = {
    name: '文档月饼盒',
    link: 'https://docs.navifox.net',
    icon: navifoxHome.icon,
    description: '收纳展示散落在各个项目仓库的文档。',
    author: tighnari.name,
};
export const navifoxHei: Website = {
    name: '蓝溪拾遗',
    link: 'https://hei.navifox.net',
    icon: navifoxHome.icon,
    description: '收录罗小黑世界中的原著设定与以此架构的有趣脑洞。',
    author: tighnari.name,
    tags: ['罗小黑', '妖精', '妖灵', '设定', 'OC'],
    note: '设定集',
};
export const foxeryGuild: Website = {
    name: '罗狐会馆',
    link: 'https://qm.qq.com/q/7WO1tJmTss',
    description: '妖灵会馆之一，广罗天下狐妖，提供技术讨论与休憩之地。',
    author: tighnari.name,
};
export const travelling: Website = {
    name: '开往',
    link: 'https://www.travellings.cn/go.html',
    conf: 'https://www.travellings.cn/preference.html',
};
export const moeTravel: Website = {
    name: '异次元之旅',
    link: 'https://travel.moe/go.html?travel=on',
    conf: 'https://travel.moe/',
};
export const sitemap = [
    navifoxHome,
    navifoxBlog,
    navifoxDocs,
    navifoxRefs,
    navifoxHei,
    //
];
export const socials: Website[] = [
    { ...foxeryGuild, logo: 'streamline-logos:qq-logo-solid' },
    // { name: '推特<br/>X／Twitter', logo: 'simple-icons:x', link: 'https://x.com/aixcyi/' },
    { name: 'GitHub', logo: 'simple-icons:github', link: 'https://github.com/aixcyi/' },
    { name: 'PyPI', logo: 'file-icons:pypi', link: 'https://pypi.org/user/aixcyi/' },
    {
        name: 'JetBrains 插件市场',
        logo: 'simple-icons:jetbrains',
        link: 'https://plugins.jetbrains.com/author/aixcyi/',
    },
    // { name: 'Gitee', logo: 'simple-icons:gitee', link: 'https://gitee.com/aixcyi/' },
];
export const credits: Website[] = [
    { name: 'oO大黄Oo', link: 'https://www.pixiv.net/users/9892346', logo: 'fa6-brands:pixiv' },
    { name: '錯誤', link: 'https://www.pixiv.net/users/1297556', logo: 'fa6-brands:pixiv' },
    { name: 'アナ', link: 'https://www.pixiv.net/users/24036634', logo: 'fa6-brands:pixiv' },
    { name: 'shields.io', link: 'https://shields.io/', icon: 'https://shields.io/img/favicon.ico', note: '徽章生成' },
];
