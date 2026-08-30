/**
 * 首页星空区的区块锚点（导航菜单与页面区块共享）。
 */
export interface SectionAnchor {
    /** 区块元素 id；`top` 表示页面顶部（首页）。 */
    id: string;

    /** 菜单显示标题。 */
    title: string;

    /** 区块眉题（标题上方的小标题），如 “About · 关于”。 */
    eyebrow?: string;

    /** 区块介绍（标题下方的说明文字）。 */
    description?: string;
}

/** 页面顶部（不在区块锚点列表中，仅用于导航“首页”）。 */
export const sectionTop: SectionAnchor = {
    id: 'top',
    title: '首页',
};

/** 有狐说：名片 + 项目经历。 */
export const sectionIntro: SectionAnchor = {
    id: 'intro',
    title: '有狐说',
    eyebrow: 'Intro · Experience',
};

/** 技能树：技能评估等级 + 技能面板。 */
export const sectionSkills: SectionAnchor = {
    id: 'skills',
    title: '技能树',
    eyebrow: 'Programmer Levels · Skills Bar',
};

/** 时与风：当前时间线。 */
export const sectionChronology: SectionAnchor = {
    id: 'chronology',
    title: '时与风',
    eyebrow: 'Chronicle · Timeline',
    description: '风带来了故事的种子，时间使之发芽。',
};

export const sectionAnchors: SectionAnchor[] = [sectionTop, sectionIntro, sectionSkills, sectionChronology];
