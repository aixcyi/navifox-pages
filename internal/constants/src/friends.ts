import type { Friend } from '@navifox/types';

/**
 * {@link Friend} 扩展友链信息。
 */
export type FriendLink = Friend & {
    /** 友链类型。 */
    type: 'partner' | 'feed' | 'pixel';

    /** 是否隐藏或不可用。 */
    disabled?: boolean;
};

const meet = (year: number, month: number, day: number): Date => new Date(year, month - 1, day);

export const friends: FriendLink[] = [
    {
        name: '若米',
        link: 'https://rabbitmind.net/',
        icon: 'https://rabbitmind.net/favicon.ico',
        title: 'Ramid',
        avatar: 'https://rabbitmind.net/favicon.ico',
        description: '这里的更新速度取决于咖啡浓度☕',
        note: 'Ramid',
        type: 'partner',
    },
    {
        name: '纸鹿',
        link: 'https://blog.zhilu.site/',
        icon: 'https://www.zhilu.site/api/avatar.png',
        title: '摸鱼处',
        avatar: 'https://www.zhilu.site/api/avatar.png',
        description: '纸鹿至麓不知路，支炉制露不止漉。',
        note: '摸鱼处',
        meet: meet(2025, 7, 14),
        styles: { avatar: ['rounded-2xl'] },
        type: 'feed',
    },
    {
        name: 'Pinpe',
        link: 'https://pinpe.top/',
        icon: 'https://pinpe.top/favicon/logo.jpg',
        title: '的云端',
        avatar: 'https://pinpe.top/head.jpg',
        description: '宁为鲜花而死，不为面包而活。',
        note: '的云端',
        meet: meet(2025, 7, 14),
        styles: { avatar: ['rounded-full'] },
        type: 'pixel',
    },
    {
        name: '胖小白',
        link: 'https://www.fatxiaobai.top',
        icon: 'https://www.fatxiaobai.top/favicon.ico',
        title: '空间站',
        avatar: 'https://www.fatxiaobai.top/proxy-api/public/file/avatar/avatar.jpg',
        description: '爱健身，爱科技，爱生活！',
        note: '空间站',
        meet: meet(2026, 6, 9),
        styles: { avatar: ['rounded-full'] },
        type: 'pixel',
    },
    {
        name: '幽悠ouo',
        link: 'https://youhuge.site/',
        icon: 'https://youhuge.site/usr/themes/handsome/assets/img/avatar.png',
        title: '幽狐阁',
        avatar: 'https://youhuge.site/usr/themes/handsome/assets/img/avatar.png',
        description: '只有分离后才能懂的事，却没有了感慨的时间。',
        note: '幽狐阁',
        meet: meet(2026, 9, 10),
        styles: { avatar: ['rounded-full'] },
        type: 'pixel',
    },
    {
        name: '林の窝',
        link: 'https://www.crazying-dev.top/',
        avatar: 'https://img.crazying-dev.top/crazying-dev.top/me.png',
        meet: meet(2026, 9, 10),
        styles: { avatar: ['rounded-full'] },
        type: 'pixel',
    },
    {
        name: 'UnknownMp',
        link: 'https://www.unknownmp.top/',
        title: '的主站',
        avatar: 'https://www.unknownmp.top/images/self/avatar.jpg',
        description: 'qwq',
        note: '的主站',
        meet: meet(2026, 9, 10),
        styles: { avatar: ['rounded-2xl'] },
        type: 'pixel',
    },
];
