import { newDate } from '@navifox/utils/dnt';

import BannerGI from '#/assets/genshin.jpg';
import BannerHei from '#/assets/hei.jpg';
import BannerHoney from '#/assets/honey.jpg';
import BannerZZZ from '#/assets/zzz.webp';

/** 一条碎碎念里的一张配图。 */
export interface MomentImage {
    /** 图片地址。 */
    src: string;

    /** 图片说明。 */
    alt: string;

    /**
     * 压在图片右下角的覆盖文字，用于标注截图里的关键信息（集数、时间码、UID 之类）。
     * 原样显示，不参与 Markdown 编译，`1:02:03` 这类带冒号的内容不会被当成算式。
     */
    text?: string;
}

/** 一条碎碎念里内嵌的视频。 */
export interface MomentVideo {
    /**
     * 播放器地址，允许写成 `//` 开头的协议相对地址。
     *
     * B 站内嵌播放器的参数在「复制通用代码」之外还要补两项：
     * - `autoplay=0` 必须显式写上，否则部分版本的播放器会自行起播。
     * - `high_quality=1` 配合 `danmaku=0` 才是「默认最高清晰度且不弹幕糊脸」，
     *   漏掉时播放器会退回 360P。
     */
    src: string;

    /** 视频标题，同时用作 `<iframe>` 的无障碍名称。 */
    title: string;
}

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
    images?: MomentImage[];

    /** 内嵌视频。 */
    videos?: MomentVideo[];
}

export const moments: Moment[] = [
    {
        id: '269.1',
        postAt: newDate(2026, 9, 27, 0, 20),
        content: '既见君兮予所欢，愿随风兮鸣银鸾。\n月轮起兮送秋燕，沐风雨兮路漫漫。',
        tags: ['游戏'],
        videos: [
            {
                src: '//player.bilibili.com/player.html?isOutside=true&aid=117355585737986&bvid=BV1cQap6UEr2&cid=42317909895&p=1&autoplay=0&danmaku=0&high_quality=1',
                title: '《原神》剧情PV-「燕归来」 · 哔哩哔哩',
            },
        ],
    },
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
        content: '与44万+道友一起共同见证韩立结婴（和B站服务器崩了）。有幸出现在本集片尾名单，虽然后面重置去掉了。',
        tags: ['凡人修仙传'],
        images: [{ src: BannerHoney, alt: '《凡人修仙传》的某一帧', text: 'p156' }],
    },
    {
        id: '257.0',
        postAt: newDate(2025, 7, 19, 19, 15),
        content:
            '《罗小黑战记2》7.18首映，第二天就跑去线下观影了，不得不说很多设定都挺有意思的，整场基本都在心流状态，不过就是不知道得等多久才能上线流媒体了。',
        tags: ['罗小黑'],
        images: [{ src: BannerHei, alt: '《罗小黑战记2》的某一帧', text: '0:11:42' }],
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
        id: '247.0',
        postAt: newDate(2024, 7, 4),
        content: '莱卡恩，我的狼叔，嘿嘿嘿嘿……',
        tags: ['游戏'],
        images: [
            {
                src: BannerZZZ,
                alt: '绝区零，Zenless Zone Zero',
                text: 'UID 10141611',
            },
        ],
    },
    {
        id: '241.0',
        postAt: newDate(2024, 1, 26, 20, 44),
        content: '年会抽奖中了一个罗技 MX Master 3s 鼠标，跟同事换了一块 Keychron K10 Pro 机械键盘。',
        location: '广州',
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
        id: '20a.0',
        postAt: newDate(2020, 10, 22, 0, 0),
        content: '你自异世前来，成为提瓦特大陆的「旅行者」。为了找寻到失散的妹妹，旅途由此展开……',
        tags: ['游戏'],
        images: [
            {
                src: BannerGI,
                alt: '原神，Genshin Impact',
                text: 'UID 138527563',
            },
        ],
    },
    {
        id: '219.0',
        postAt: newDate(2019, 10, 23, 22, 25),
        content: '第一次去外地参加竞赛，止不住的好奇。此时已经能熟练借助虚拟机安装 Ubuntu 并畅游于此。',
        tags: ['比赛'],
    },
    {
        id: '189.0',
        postAt: newDate(2018, 9, 22, 21, 35),
        content: '与舍友一同解构 [Obulis](https://store.steampowered.com/app/11330) 存档结构并伪造数据来解锁隐藏关卡。',
        location: '中山',
        tags: ['游戏'],
    },
    {
        id: '188.0',
        postAt: newDate(2018, 8, 26, 11, 7),
        content: '成为“哔哩哔哩无限矿业公司”的一位用户。',
        location: '中山',
    },
    {
        id: '163.0',
        postAt: newDate(2016, 3, 14),
        content: '创建了一个QQ群与Q米论坛的坛友一起讨论洛克王国及交流二创。',
    },
    {
        id: '11c.0',
        postAt: newDate(2011, 12, 3),
        content: '在邻居朋友的安利下入坑了洛克王国，在“御三家”中选定了喵喵。',
        tags: ['游戏'],
    },
    {
        id: '11b.0',
        postAt: newDate(2011, 11, 30),
        content: '组装了一台仅有 80GB 机械硬盘的 Windows XP，在懵懂中注册了QQ，接触到“非主流”的余晖。',
    },
].sort((a, b) => b.postAt.getTime() - a.postAt.getTime());
