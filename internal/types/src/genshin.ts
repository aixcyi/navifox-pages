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
     * 能力。
     */
    abilities: {
        /** 地图标记。 */
        locator?: OmissibleDescription,
        /** 探索派遣。 */
        dispatch?: OmissibleDescription,
        /** 体力减免。 */
        stamina?: OmissibleDescription,
        /** 移速加成。 */
        moving?: OmissibleDescription,
        /** 烹饪与合成。 */
        crafting?: OmissibleDescription,
        /** 其它。 */
        others?: OmissibleDescription,
    }
}
