/**
 * 妖精与人类（统称妖灵）的设定信息。
 */
export type SpiritInfo = {
    /** 妖灵名称（中文名） */
    name: string;

    /** 标签。 */
    tags: string[];

    /** 头像URL。 */
    avatar: string;

    /** 详情页内联地址。 */
    link: string;

    /**
     * 原著中设定的妖灵。
     *
     * Canon 这个单词是欧美圈子用词，与 Fanon 相对，近年来似乎愈发少用。
     */
    canon?: boolean;

    /** 已故妖灵。 */
    faded?: boolean;
};

export const spiritsOC: SpiritInfo[] = [
    // 在此处添加更多妖灵...
    {
        name: '邔符',
        tags: ['粤东管理', '一级执行者'],
        avatar: 'https://img.crazying-dev.top/other/1784726746504.png',
        link: '/spirit/wensley',
    },
    {
        name: '念月',
        tags: ['苍南会馆跨境追缉组组长', '一级执行者', '无限大徒弟'],
        avatar: 'https://img.remit.ee/api/file/BQACAgUAAyEGAASHRsPbAAEXoZFqX5rk6ukttXGdfE1STDfx2PLj_QAC7CAAAtJdAAFXR_rGsPnqvNs9BA.jpg',
        link: '/spirit/nuray',
    },
    {
        name: '济慈',
        tags: ['苍南会馆下属前攻组组长', '一级执行者'],
        avatar: 'https://img.crazying-dev.top/Friend/Keats.jpg',
        link: '/spirit/keats',
    },
    {
        name: '攸往',
        tags: ['苍南会馆常驻妖精', '总馆落云组组长', '一级执行者'],
        avatar: 'https://img.remit.ee/api/file/BQACAgUAAyEGAASHRsPbAAEXoPZqX40D39Dp8doOjuF4dfJMRn1erQACHyAAAnULAVcjuD6NuxWnhD0E.jpg',
        link: '/spirit/ziyouwang',
    },
    {
        name: '路狐羽',
        tags: ['罗狐会馆馆长', '二级执行者'],
        avatar: 'https://www.navifox.net/avatar256.jpg',
        link: '/spirit/navifox',
    },
    {
        name: '林',
        tags: ['临川会馆馆长'],
        avatar: 'https://crazying-dev.top/favicon.ico',
        link: `/spirit/lin`,
    },
    {
        name: '兰知',
        tags: ['临川会馆画师'],
        avatar: 'https://img.crazying-dev.top/Friend/LanZhi.jpg',
        link: '/spirit/lanzhi',
    },
    {
        name: '念一',
        tags: ['(只是一个游历于世界各地的旅行者)'],
        avatar: 'https://img.crazying-dev.top/Friend/killing.jpg',
        link: '/spirit/killing',
    },
    {
        name: '拾七',
        tags: ['吉祥物'],
        avatar: 'https://img.crazying-dev.top/Friend/seventeen.png',
        link: '/spirit/seventeen',
    },
];

export const spiritsAV = [
    { name: '雨笛', english: 'yudi', tags: ['总馆长', '苍南会馆馆长', '妖灵会馆长老'], faded: false, drafting: true },
    { name: '西木子', english: 'ximuzi', tags: ['妖灵会馆长老'], faded: false },
    { name: '池年', english: 'chi-nian', tags: ['妖灵会馆长老'], faded: false, drafting: true },
    { name: '灵遥', english: 'lingyao', tags: ['妖灵会馆长老'], faded: false, drafting: true },
    { name: '静一', english: 'jingyi', tags: ['妖灵会馆长老'], faded: false, drafting: true },
    { name: '无限', english: 'wuxian', tags: ['一级执行者'], faded: false },
    { name: '卡里', english: 'kali', tags: ['灵溪会馆馆长'], faded: false, drafting: true },
    { name: '秃贝', english: 'tubei', tags: ['灵溪会馆常驻妖精'], faded: false, drafting: true },
    { name: '大松', english: 'dasong', tags: ['流石会馆馆长'], faded: true, drafting: true },
    { name: '明月', english: 'mingyue', tags: ['流石会馆常驻妖精'], faded: true, drafting: true },
    { name: '清泉', english: 'qingquan', tags: ['流石会馆常驻妖精'], faded: true, drafting: true },
    { name: '潘靖', english: 'panjing', tags: ['龙游会馆馆长'], faded: false, drafting: true },
    { name: '鸠老', english: 'jiulao', tags: ['一级执行者'], faded: false, drafting: true },
    { name: '若水', english: 'ruoshui', tags: ['执行者'], faded: false, drafting: true },
    { name: '郑信毅', english: 'zhengxinyi', tags: ['洞桥会馆馆长'], faded: false, drafting: true },
].map(({ name, english, tags, faded, drafting }) => {
    return {
        name,
        tags,
        avatar: `/assets/spirit/${english}.jpg`,
        link: drafting ? '' : `/spirit/${english}`,
        faded,
        canon: true, // 官方设定角色。与 Fanon 相对。
    } as SpiritInfo;
});

export const spirits = [...spiritsAV, ...spiritsOC].sort((a, b) => a.name.localeCompare(b.name));

export const spiritsByName = Object.fromEntries(spirits.map((s) => [s.name, s]));
