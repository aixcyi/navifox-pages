/**
 * 此脚本用于从可靠数据源迁移数据。
 *
 * - 借助此脚本，只需手动维护信息量更少的 `./data/genshin.mjs`
 *   即可得到信息量更大的 `./src/constants/characters.ts` 。
 * - 正常情况下，您不应该手动修改后者（即此脚本的运行产物）。
 * - 如果上游数据源不再可靠，那么应当立即弃用此脚本和
 *   `./data/genshin.mjs`，转为手动维护
 *   `./src/constants/characters.ts` 。
 */

import genshindb from 'genshin-db';
import { promises as fs } from 'node:fs';
import { join, normalize } from 'node:path';
import { characters } from '../data/genshin.mjs';


const target = '../../src/constants/characters.ts'
const talentsText = {
    'combat1': '普通攻击',
    'combat2': '元素战技',
    'combat3': '元素爆发',
    'passive1': '被动天赋',
    'passive2': '被动天赋',
    'passive3': '被动天赋',
    'passive4': '被动天赋',
}
const constellationsText = {
    'c1': '命之座 第1层',
    'c2': '命之座 第2层',
    'c3': '命之座 第3层',
    'c4': '命之座 第4层',
    'c5': '命之座 第5层',
    'c6': '命之座 第6层',
}


/**
 * 初始化数据库。
 */
async function initial() {
    genshindb.setOptions({
        queryLanguages: [ genshindb.Language.ChineseSimplified ],
        resultLanguage: genshindb.Language.ChineseSimplified,
    })
}


/**
 * 提取数据库的数据，填充到被主程序引用的位置。
 */
async function migrate(to) {
    // 这么写是为了保持字段顺序
    const dataset = characters.filter(c => !c.hidden).map(({ name, rarity, region, weapon, element, abilities }) => {
        const info = genshindb.characters(name)  // 角色基本信息
        const talents = genshindb.talents(name)  // 天赋
        const constellations = genshindb.constellations(name)  // 命之座
        if (!info) {
            console.warn(
                `[WARN] Character "${name}" was not in genshin-db! ` +
                `Check your node.js package version please.`
            )
        }
        return {
            name,
            rarity: info?.rarity ?? rarity,
            region: (info?.region ? info.region : region) ?? null,
            weapon: info?.weaponText ?? weapon,
            element: info?.elementText
                ? info.elementText !== '无' ? info.elementText : null
                : element,
            abilities: abilities.map(({ scope, short, talent, constellation }) => ({
                scope,
                field: talentsText[talent] ?? constellationsText[constellation] ?? '手工标注',
                short,
                original: (talents ?? {})[talent]?.description
                    ?? (constellations ?? {})[constellation]?.description
                    ?? '游戏内无对应描述，或数据库暂未更新。',
            }))
        }
    })
    const data = (
        "import type { GenshinCharacter } from '@navifox/types';\n" +
        '// 此文件由脚本生成。\n' +
        `export const characters: GenshinCharacter[] = ${JSON.stringify(dataset.reverse(), null, 4)}`
    )
    await fs.writeFile(to, data)
}


(async function main() {
    // 明确被注入的目标
    const [ _, egoPath ] = process.argv
    const targetPath = normalize(join(egoPath, target))
    console.log(
        `[INFO] File override: ${targetPath}`
    )
    try {
        await initial()
        await migrate(targetPath)
        console.log('[INFO] OK.')
    } catch (error) {
        console.error(`[ERROR] Unexpected error during extracting:\n\t${error.message}`)
        process.exit(1)
    }
})()
