import { newDate } from '@navifox/utils/dnt';

import BannerHei from '#/assets/hei.jpg';
import BannerHoney from '#/assets/honey.jpg';

/** 一条碎碎念。 */
export interface Moment {
    /** 唯一标识，用作列表 key 与锚点。 */
    id: string;

    /** 发布时间。 */
    postAt: Date;

    /** 正文，支持行内 Markdown（`**加粗**`、`__下划线__`、`` `代码` ``、`[链接](url)`）。 */
    content: string;

    /** 发布地点。 */
    location?: string;

    /** 标签。 */
    tags?: string[];

    /** 配图。 */
    images?: { src: string; alt: string }[];
}

export const moments: Moment[] = [
    {
        id: '269.0',
        postAt: newDate(2026, 9, 10, 12, 0),
        content: 'DeepSeek flash 系列降价了，可为什么感觉还是花那么多呢？',
        tags: ['AI'],
        images: [
            {
                src: 'https://bjumymxtfpfswthiusfr.storage.supabase.co/storage/v1/object/public/ai-meme/meme/077.webp',
                alt: 'DeepSeek梗图',
            },
        ],
    },
    {
        id: '265.0',
        postAt: newDate(2026, 5, 22),
        content: '在好友的推荐下入手一台水冷笔记本。',
        tags: ['开箱'],
    },
    {
        id: '25a.0',
        postAt: newDate(2025, 10, 14),
        content: '购入正版 [Obulis](https://store.steampowered.com/app/11330)，了却遗憾。',
        tags: ['游戏'],
    },
    {
        id: '258.0',
        postAt: newDate(2025, 8, 16, 11, 0),
        content: '44万人陪我一起——非！常！震！撼！！！（有幸出现在本集片尾名单，虽然后面重置去掉了）',
        tags: ['凡人修仙传'],
        images: [{ src: BannerHoney, alt: '《凡人修仙传》的某一帧' }],
    },
    {
        id: '257.0',
        postAt: newDate(2025, 7, 19, 19, 15),
        content:
            '《罗小黑战记2》7.18首映，第二天就跑去线下观影了，不得不说很多设定都挺有意思的，整场基本都在心流状态，不过就是不知道得等多久才能上线流媒体了。',
        tags: ['罗小黑'],
        images: [{ src: BannerHei, alt: '《罗小黑战记2》的某一帧' }],
    },
    {
        id: '24a.0',
        postAt: newDate(2024, 10, 25, 15, 32),
        content:
            '入手了一套提纳里、一套赛诺的 cos 服（主要是馋狐狸耳朵），第一次穿到了公司，但其实没什么人关注，甚至不会多看一眼，大概这就是广州吧。',
        location: '广州',
        tags: ['游戏', 'cosplay'],
    },
    {
        id: '248.0',
        postAt: newDate(2024, 8, 6, 20, 6),
        content:
            '在好友的安利下第一次接触游戏手柄，不过下单时被商品页迷惑了，宣传是冰原狼2，买到手的是第一代，经常断连……',
        location: '广州',
        tags: ['游戏', '手柄'],
    },
    {
        id: '241.0',
        postAt: newDate(2024, 1, 26, 20, 44),
        content: '年会抽奖中了一个罗技 MX Master 3s 鼠标，跟同事换了一块 Keychron K10 Pro 机械键盘。',
        location: '中山',
        tags: ['公司', '机械键盘'],
    },
    {
        id: '235.0',
        postAt: newDate(2023, 5, 28, 16, 7),
        content: '被好友带去靶场，第一次接触弯弓射箭。',
        location: '中山',
        tags: ['聚会'],
    },
    {
        id: '227.0',
        postAt: newDate(2022, 7, 31, 18, 59),
        content: '被好友们带着玩了第一次剧本杀。',
        location: '中山',
        tags: ['聚会', '剧本杀'],
    },
    {
        id: '219.0',
        postAt: newDate(2021, 9, 14, 15, 2),
        content: '入手一台 Alienware m15 R6，i7-11800H，RTX 3050 Ti Laptop，没有多少兴奋，更多的是“刘姥姥进大观园”。',
        location: '中山',
        tags: ['拆箱'],
    },
    {
        id: '189.0',
        postAt: newDate(2018, 9, 22, 21, 35),
        content: '与舍友一同解构 [Obulis](https://store.steampowered.com/app/11330) 存档结构并伪造数据来解锁隐藏关卡。',
        location: '中山',
        tags: ['游戏'],
    },
].sort((a, b) => b.postAt.getTime() - a.postAt.getTime());
