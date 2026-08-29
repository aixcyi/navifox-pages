/**
 * 首页星空区的区块锚点（导航菜单与页面区块共享）。
 */
export interface SectionAnchor {
    /** 区块元素 id。 */
    id: string;

    /** 菜单显示标题。 */
    title: string;
}

export const sectionAnchors: SectionAnchor[] = [
    { id: 'fox-talk', title: '有狐说' },
    { id: 'skills-tree', title: '技能树' },
    { id: 'chronology', title: '时与风' },
];
