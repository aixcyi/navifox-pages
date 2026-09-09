import type { Website } from '@navifox/types';

export type FriendsWebsite = Website & { type: 'partner' | 'feed' | 'pixel' };

export const friends: FriendsWebsite[] = [
    {
        name: 'Rabbit Mind',
        link: 'https://rabbitmind.net/',
        icon: 'https://rabbitmind.net/favicon.ico',
        type: 'partner',
        description: '这里的更新速度取决于咖啡浓度☕',
    },
    {
        name: '纸鹿摸鱼处',
        link: 'https://blog.zhilu.site/',
        icon: 'https://www.zhilu.site/icon.png',
        type: 'feed',
        description: '纸鹿至麓不知路，支炉制露不止漉',
    },
    {
        name: 'Pinpe 的云端',
        link: 'https://pinpe.top/',
        icon: 'https://pinpe.top/favicon/logo.jpg',
        type: 'pixel',
        description: '宁为鲜花而死，不为面包而活。',
    },
];
