import type { Spirit } from '#/types';

export const spirits = [
    { name: '雨笛', english: 'yudi', tags: ['总馆长', '苍南会馆馆长', '妖灵会馆长老'] },
    { name: '西木子', english: 'ximuzi', tags: ['妖灵会馆长老'] },
    { name: '池年', english: 'chi-nian', tags: ['妖灵会馆长老'] },
    { name: '灵遥', english: 'lingyao', tags: ['妖灵会馆长老'] },
    { name: '静一', english: 'jingyi', tags: ['妖灵会馆长老'] },
    { name: '无限', english: 'wuxian', tags: ['一级执行者'] },
    { name: '卡里', english: 'kali', tags: ['灵溪会馆馆长'] },
    { name: '秃贝', english: 'tubei', tags: ['灵溪会馆常驻妖精'] },
    { name: '大松', english: 'dasong', tags: ['流石会馆馆长'] },
    { name: '明月', english: 'mingyue', tags: ['流石会馆常驻妖精'] },
    { name: '清泉', english: 'qingquan', tags: ['流石会馆常驻妖精'] },
    { name: '潘靖', english: 'panjing', tags: ['龙游会馆馆长'] },
    { name: '鸠老', english: 'jiulao', tags: ['一级执行者'] },
    { name: '若水', english: 'ruoshui', tags: ['执行者'] },
    { name: '郑信毅', english: 'zhengxinyi', tags: ['洞桥会馆馆长'] },
    // 在此处添加更多妖灵...
    {
        name: '路狐羽',
        tags: ['罗狐会馆馆长', '二级执行者'],
        english: 'navifox',
        avatar: 'https://www.navifox.net/avatar256.jpg',
    },
].map(({ name, english, tags, avatar }) => {
    return {
        name,
        tags,
        avatar: avatar ?? `/assets/spirit/${english}.jpg`,
        link: `/spirit/${english}`,
    } as Spirit;
});

export const spiritsByName = Object.fromEntries(spirits.map((s) => [s.name, s]));
