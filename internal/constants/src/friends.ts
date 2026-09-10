import type { Friend } from '@navifox/types';

/**
 * 友链信息（{@link Friend} 扩展）。
 */
export type FriendLink = Friend & {
    /** 友链类型。 */
    type: 'partner' | 'feed' | 'pixel';

    /** 相遇时间。`yyyy/mm/dd` 格式。 */
    meet?: string;

    /** 头像样式（圆角、底色等非通用部分）。Tailwind v4 类名。 */
    avatarStyle?: string[];
};

export const friends: FriendLink[] = [
    {
        name: '若米',
        link: 'https://rabbitmind.net/',
        title: 'Ramid',
        avatar: 'https://rabbitmind.net/favicon.ico',
        status: '这里的更新速度取决于咖啡浓度☕',
        type: 'partner',
    },
    {
        name: '纸鹿',
        link: 'https://blog.zhilu.site/',
        title: '摸鱼处',
        avatar: 'https://www.zhilu.site/api/avatar.png',
        status: '纸鹿至麓不知路，支炉制露不止漉。',
        meet: '2025/7/14',
        type: 'feed',
        avatarStyle: ['rounded-2xl'],
    },
    {
        name: 'Pinpe',
        link: 'https://pinpe.top/',
        title: '的云端',
        avatar: 'https://pinpe.top/head.jpg',
        status: '宁为鲜花而死，不为面包而活。',
        meet: '2025/7/14',
        type: 'pixel',
        avatarStyle: ['rounded-full'],
    },
    {
        name: '胖小白',
        link: 'https://www.fatxiaobai.top',
        title: '空间站',
        avatar: 'https://www.fatxiaobai.top/proxy-api/public/file/avatar/avatar.jpg',
        status: '爱健身，爱科技，爱生活！',
        type: 'pixel',
        meet: '2026/6/9',
        avatarStyle: ['rounded-full'],
    },
    {
        name: '幽悠ouo',
        link: 'https://youhuge.site/',
        title: '幽狐阁',
        avatar: 'https://youhuge.site/usr/themes/handsome/assets/img/avatar.png',
        status: '只有分离后才能懂的事，却没有了感慨的时间。',
        type: 'pixel',
        meet: '2026/9/10',
        avatarStyle: ['rounded-full'],
    },
    {
        name: '林の窝',
        link: 'https://www.crazying-dev.top/',
        avatar: 'https://img.crazying-dev.top/crazying-dev.top/me.png',
        type: 'pixel',
        meet: '2026/9/10',
        avatarStyle: ['rounded-full'],
    },
    {
        name: 'UnknownMp',
        link: 'https://www.unknownmp.top/',
        title: '的主站',
        avatar: 'https://www.unknownmp.top/images/self/avatar.jpg',
        status: 'qwq',
        type: 'pixel',
        meet: '2026/9/10',
        avatarStyle: ['rounded-2xl'],
    },
];
