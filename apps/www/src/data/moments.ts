import { newDate } from '@navifox/utils/dnt';

import BannerHei from '#/assets/hei.jpg';

/** 一条碎碎念。 */
export interface Moment {
    /** 唯一标识，用作列表 key 与锚点。 */
    id: string;

    /** 发布时间。 */
    createdAt: Date;

    /** 正文，支持行内 Markdown（`**加粗**`、`__下划线__`、`` `代码` ``、`[链接](url)`）。 */
    content: string;

    /** 发布地点。 */
    location?: string;

    /** 标签。 */
    tags?: string[];

    /** 配图。 */
    images?: { src: string; alt: string }[];
}

/** 示例数据：内容与字段都还待定，先随便写几条把版面撑起来。 */
export const moments: Moment[] = [
    {
        id: 'm-20260916',
        createdAt: newDate(2026, 9, 16, 9, 12),
        content:
            '终于给「凭栏处」填上了第一铲土。以前总觉得碎碎念该交给社交平台托管，现在倒是想通了——**自己的地盘还是自己说了算**。',
        location: '广东 广州',
        tags: ['建站', '碎碎念'],
    },
    {
        id: 'm-20260915',
        createdAt: newDate(2026, 9, 15, 23, 47),
        content:
            '凌晨前的最后一杯咖啡，和 `ruff format` 完的一千行 diff。谁懂啊，加班最爽的时刻不是收工，是看到 lint 全绿。',
        tags: ['开发'],
    },
    {
        id: 'm-20260913',
        createdAt: newDate(2026, 9, 13, 20, 5),
        content: '拆了三天路由里挂着的 TODO，把三个空页面填成了真的页面。`NotFound` 终于不用再假装自己是朋友圈了。',
        location: '广东 广州',
        tags: ['建站', 'Vue3'],
    },
    {
        id: 'm-20260906',
        createdAt: newDate(2026, 9, 6, 14, 22),
        content:
            '台风天的广州，窗外雨声大得像有人在敲 `while (true)`。这种天气最适合窝在屋里写代码，也最适合点一份外卖。',
        tags: ['生活'],
    },
    {
        id: 'm-20260830',
        createdAt: newDate(2026, 8, 30, 21, 36),
        content: '补票看了《罗小黑战记2》，妖灵会馆那一段还是看得眼睛发热。国漫能做到这个程度，值回票价。',
        images: [{ src: BannerHei, alt: '《罗小黑战记2》' }],
        tags: ['观影'],
    },
    {
        id: 'm-20260824',
        createdAt: newDate(2026, 8, 24, 18, 50),
        content: '楼下新开了一家螺蛳粉，加双份酸笋。吃完感觉自己整个人都被腌入味了。',
        location: '广东 广州',
        tags: ['吃'],
    },
    {
        id: 'm-20260812',
        createdAt: newDate(2026, 8, 12, 11, 3),
        content: '把 6.5 版本的角色实用天赋表整理完了，翻图鉴翻到眼睛发酸。写表格有时候比打深渊还累。',
        tags: ['原神'],
    },
];
