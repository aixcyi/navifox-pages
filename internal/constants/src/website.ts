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

/**
 * 站点主人（`navifox`）的专属字段。
 *
 * - 这些字段只属于本站，不属于任何 {@link Friend}，因此不能污染类型定义；
 * - 用显式类型而非 `Record<string, unknown>` 收口，写错字段名时才能在编译期暴露。
 */
export interface NavifoxProfile {
    /** 全球唯一用户 id。 */
    uid: string;
    age: number;
    wxid: string;
    groupQQ: string;
    location: string;
}

export const navifox: Friend & NavifoxProfile = {
    text: '路狐领航',
    link: 'https://www.navifox.net',
    icon: 'https://www.navifox.net/favicon.ico',
    slogan: '风带来了故事的种子，时间使之发芽',
    descriptionPure: 'Seeds of stories, brought by the wind and cultivated by time.',
    descriptionHtml: 'Seeds of stories,<br/>brought by the wind and cultivated by time.',
    author: '路狐羽',
    tags: ['毛茸茸爱好者', '开发工程师', 'Pythonista', '能工智人'],
    avatar: 'https://www.navifox.net/avatar.jpg',
    avatar256: 'https://www.navifox.net/avatar256.jpg',
    avatar512: 'https://www.navifox.net/avatar512.jpg',
    type: 'partner',
    titles: ['Django 高级后端开发', 'Vue3 开发'],
    status: '有时明月无人夜，独向昭潭制恶龙。',
    uid: 'aixcyi',
    age: untilYear - 2000,
    wxid: 'Navifox',
    groupQQ: '540457640',
    location: '广东 广州',
};

export const navifoxHome: Website = {
    text: navifox.text,
    link: navifox.link,
    icon: navifox.icon,
    slogan: '愿在生活的密林里遇见一只路狐，与你相伴，为你领航',
    descriptionPure: '愿在生活的密林里遇见一只路狐，与你相伴，为你领航。',
    descriptionHtml: '<span>愿在生活的密林里遇见一只路狐，</span><span>与你相伴，为你领航。</span>',
    author: navifox.author,
    tags: [navifox.author!, '阿羽', 'aixcyi', 'ayu', navifox.text, '罗狐会馆', '妖灵会馆'],
};
export const navifoxRefs: Website = {
    text: '星笺',
    link: 'https://refs.navifox.net',
    icon: navifox.icon,
    slogan: '狐狸们用小爪子敲出的一页纸快速参考',
    descriptionPure: '狐狸们用小爪子敲出的一页纸快速参考。',
    descriptionHtml: '狐狸们用小爪子敲出的<b>一页纸快速参考</b>。',
    author: navifox.author,
    tags: ['快速参考', '参考', '星笺', '导航', navifox.text],
    note: '快速参考',
};
export const navifoxBlog: Website = {
    text: '羽音',
    link: 'https://blog.navifox.net',
    icon: navifox.icon,
    slogan: '静谧星夜下不绝如缕的羽音',
    descriptionPure: '静谧星夜下不绝如缕的羽音。',
    descriptionHtml: '<span>静谧星夜下</span><span>不绝如缕的羽音。</span>',
    author: navifox.author,
    note: '博客',
};
export const navifoxDocs: Website = {
    text: '文档月饼盒',
    link: 'https://docs.navifox.net',
    icon: navifox.icon,
    slogan: '收纳展示散落在各个项目仓库的文档',
    descriptionPure: '收纳展示散落在各个项目仓库的文档。',
    author: navifox.author,
};
export const navifoxHei: Website = {
    text: '蓝溪拾遗',
    link: 'https://hei.navifox.net',
    icon: navifox.icon,
    slogan: '收录罗小黑世界中的原著设定与以此架构的有趣脑洞',
    descriptionPure: '收录罗小黑世界中的原著设定与以此架构的有趣脑洞。',
    author: navifox.author,
    tags: ['罗小黑', '妖精', '妖灵', '设定', 'OC'],
    note: '设定集',
};
export const foxeryGuild: Website = {
    text: '罗狐会馆',
    link: 'https://qm.qq.com/q/7WO1tJmTss',
    descriptionPure: '妖灵会馆之一，广罗天下狐妖，提供技术讨论与休憩之地。',
    author: navifox.author,
};
export const egoGitHub: Website = {
    text: 'GitHub',
    link: 'https://github.com/aixcyi/',
};
export const egoGitee: Website = {
    text: 'Gitee',
    link: 'https://gitee.com/aixcyi/',
};
export const egoTwitter: Website = {
    text: '推特<br/>X／Twitter',
    link: 'https://x.com/aixcyi/',
};
export const egoPyPI: Website = {
    text: 'PyPI',
    link: 'https://pypi.org/user/aixcyi/',
};
export const egoJetBrains: Website = {
    text: 'JetBrains 插件市场',
    link: 'https://plugins.jetbrains.com/author/aixcyi/',
};
export const travelling: Website = {
    text: '开往',
    link: 'https://www.travellings.cn/go.html',
    settingsUrl: 'https://www.travellings.cn/preference.html',
};
export const moeTravel: Website = {
    text: '异次元之旅',
    link: 'https://travel.moe/go.html?travel=on',
    settingsUrl: 'https://travel.moe/',
};
