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
        name: '纸鹿本鹿',
        link: 'https://blog.zhilu.site/',
        title: '摸鱼处',
        avatar: 'https://www.zhilu.site/api/avatar.png',
        status: '纸鹿至麓不知路，支炉制露不止漉',
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
];
