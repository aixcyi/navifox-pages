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
    const dataset = [
        { name: '旅行者 (风元素)', rarity: 5, region: null, weapon: '单手剑', element: '风', abilities: [] },
        { name: '旅行者 (岩元素)', rarity: 5, region: null, weapon: '单手剑', element: '岩', abilities: [] },
        { name: '旅行者 (雷元素)', rarity: 5, region: null, weapon: '单手剑', element: '雷', abilities: [] },
        { name: '旅行者 (草元素)', rarity: 5, region: null, weapon: '单手剑', element: '草', abilities: [] },
        { name: '旅行者 (水元素)', rarity: 5, region: null, weapon: '单手剑', element: '水', abilities: [] },
        { name: '旅行者 (火元素)', rarity: 5, region: null, weapon: '单手剑', element: '火', abilities: [] },
        // { name: '旅行者 (冰元素)', rarity: 5, region: null, weapon: '单手剑', element: '冰', abilities: [] },
    ].concat(characters.map(({ name, abilities }) => {
        const info = genshindb.characters(name)  // 角色基本信息
        const talents = genshindb.talents(name)  // 天赋
        const constellations = genshindb.constellations(name)  // 命之座
        if (!info) {
            throw Error(
                `Character "${name}" was not in genshin-db!` +
                `Check your node.js package version please.`
            )
        }
        return {
            name,
            rarity: info.rarity,
            region: info.region ? info.region : null,
            weapon: info.weaponText,
            element: info.elementText
                ? info.elementText !== '无' ? info.elementText : null
                : null,
            abilities: abilities.map(({ scope, short, talent, constellation }) => ({
                scope,
                short,
                field: talent
                    ? talentsText[talent]
                    : constellation
                        ? constellationsText[constellation]
                        : '',
                original: talent
                    ? talents[talent].description
                    : constellation
                        ? constellations[constellation].description
                        : '【人工标注】\n游戏内无对应描述，或数据库未提供。',
            }))
        }
    }))

    // FIXME: 临时补上 genshin-db@5.2.9 “兹白”缺失的 region 字段。
    const char = dataset.find(c => c.name === '兹白')
    if (char) {
        char.region = '璃月'
    }

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
        `File will be override:\n\t${targetPath}`
    )
    try {
        await initial()
        await migrate(targetPath)
        console.log('OK.')
    } catch (error) {
        console.error(`Unexpected error during extracting:\n\t${error.message}`)
        process.exit(1)
    }
})()
