/**
 * 妖灵信息。
 */
export type SpiritInfo = {
    name: string;
    tags: string[];
    avatar: string;
    link: string;
    faded?: boolean;
    builtin?: boolean;
};

export const spiritsOC: SpiritInfo[] = [
    // 在此处添加更多妖灵...
    {
        name: '路狐羽',
        tags: ['罗狐会馆馆长', '二级执行者'],
        avatar: 'https://www.navifox.net/avatar256.jpg',
        link: `/spirit/navifox`,
    },
    {
        name: '林',
        tags: ['临川会馆馆长'],
        avatar: "https://crazying-dev.top/favicon.ico",
        link: `/spirit/Lin`,
    },
    {
        name: '济慈',
        tags: ['苍南会馆下属前攻组组长', '一级执行者'],
        avatar: "https://img.crazying-dev.top/Friend/Keats.jpg",
        link: '/spirit/Keats',
    },
    {
        name: '兰知',
        tags: ['临川会馆画师'],
        avatar: 'https://img.crazying-dev.top/Friend/LanZhi.jpg',
        link: '/spirit/LANZHI',
    },
    {
        name: '念一',
        tags: ['(只是一个游历于世界各地的旅行者)'],
        avatar: 'https://img.crazying-dev.top/Friend/killing.jpg',
        link: '/spirit/Killing',
    },
    {
        name: '拾七',
        tags: ['吉祥物'],
        avatar: 'https://img.crazying-dev.top/Friend/seventeen.png',
        link: '/spirit/seventeen',
    }
];

export const spiritsAV = [
    { name: '雨笛', english: 'yudi', tags: ['总馆长', '苍南会馆馆长', '妖灵会馆长老'], faded: false },
    { name: '西木子', english: 'ximuzi', tags: ['妖灵会馆长老'], faded: false },
    { name: '池年', english: 'chi-nian', tags: ['妖灵会馆长老'], faded: false },
    { name: '灵遥', english: 'lingyao', tags: ['妖灵会馆长老'], faded: false },
    { name: '静一', english: 'jingyi', tags: ['妖灵会馆长老'], faded: false },
    { name: '无限', english: 'wuxian', tags: ['一级执行者'], faded: false },
    { name: '卡里', english: 'kali', tags: ['灵溪会馆馆长'], faded: false },
    { name: '秃贝', english: 'tubei', tags: ['灵溪会馆常驻妖精'], faded: false },
    { name: '大松', english: 'dasong', tags: ['流石会馆馆长'], faded: true },
    { name: '明月', english: 'mingyue', tags: ['流石会馆常驻妖精'], faded: true },
    { name: '清泉', english: 'qingquan', tags: ['流石会馆常驻妖精'], faded: true },
    { name: '潘靖', english: 'panjing', tags: ['龙游会馆馆长'], faded: false },
    { name: '鸠老', english: 'jiulao', tags: ['一级执行者'], faded: false },
    { name: '若水', english: 'ruoshui', tags: ['执行者'], faded: false },
    { name: '郑信毅', english: 'zhengxinyi', tags: ['洞桥会馆馆长'], faded: false },
].map((s) => {
    return {
        ...s,
        avatar: `/assets/spirit/${s.english}.jpg`,
        link: `/spirit/${s.english}`,
        builtin: true,
    } as SpiritInfo;
});

export const spirits = [...spiritsAV, ...spiritsOC];

export const spiritsByName = Object.fromEntries(spirits.map((s) => [s.name, s]));
