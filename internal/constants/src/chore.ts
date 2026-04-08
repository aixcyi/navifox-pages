import type { Friend } from '@navifox/types';
import { markit } from '@navifox/utils';


export const signature: string = `
      •  ┓       •
     ╋┓┏┓┣┓┏┓┏┓┏┓┓
━━━━━┗┗┗┫┛┗┛┗┗┻┛ ┗━━━━━━
        ┛
\n`

export const thisYear = Math.max(2026, new Date().getFullYear())

export const tighnari: Friend = {
    name: '路狐羽',
    uid: 'aixcyi',
    tags: [ '毛茸茸爱好者', '开发工程师', '罗狐会馆馆长' ],
    titles: [ 'Django 高级后端开发', 'Vue3 开发' ],
    description: markit('Seeds of stories,\nbrought by the wind and cultivated by time.'),
    location: '广东 广州',
    wxid: 'navifox',
    age: thisYear - 2000,
}
