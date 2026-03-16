export interface OmissibleDescription {
    short: string
    verbose: string
}

export interface GenshinCharacter {
    name: string

    /** 星级（五星／四星）。 */
    rarity: number

    /** 所属地区。 */
    region: '蒙德' | '璃月' | '稻妻' | '须弥' | '枫丹' | '纳塔' | '挪德卡莱' | '至冬' | null

    /** 武器类型。 */
    weapon: '单手剑' | '双手剑' | '弓' | '法器' | '长柄武器'

    /** 元素。 */
    element: '火' | '水' | '风' | '雷' | '草' | '冰' | '岩' | null

    /**
     * 天赋与技能。
     */
    talents: {
        hunting?: OmissibleDescription,
        stamina?: OmissibleDescription,
        locator?: OmissibleDescription,
        dispatch?: OmissibleDescription,
        moving?: OmissibleDescription,
    }
}
