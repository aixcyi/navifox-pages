/**
 * 能力领域。
 *
 * - `locator`，地图标记。
 * - `dispatch`，探索派遣。
 * - `stamina`，体力减免。
 * - `moving`，移速加成。
 * - `crafting`，烹饪与合成。
 * - `interaction`，环境交互。
 * - `others`，其它。
 */
export type AbilityScope = 'locator' | 'dispatch' | 'stamina' | 'moving' | 'crafting' | 'interaction' | 'others'

/**
 * 能力（包含能力归属领域、简述和原始描述）。
 */
export interface Ability {
    /** 能力归属的领域。 */
    scope: AbilityScope
    /** 能力所在位置。 */
    field: string
    /** 简述。 */
    short: string
    /** 原始描述。 */
    original: string
}

/**
 * 原神角色信息（仅必须的部分）。
 */
export interface GenshinCharacter {
    name: string

    /** 星级（五星／四星）。 */
    rarity: 4 | 5

    /** 所属地区。 */
    region: '蒙德' | '璃月' | '稻妻' | '须弥' | '枫丹' | '纳塔' | '挪德卡莱' | '至冬' | null

    /** 武器类型。 */
    weapon: '单手剑' | '双手剑' | '弓' | '法器' | '长柄武器'

    /** 元素。 */
    element: '火' | '水' | '风' | '雷' | '草' | '冰' | '岩' | null

    /** 能力。 */
    abilities: Ability[]
}
