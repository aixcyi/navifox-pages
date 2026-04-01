import { remove } from 'es-toolkit';
import genshindb from 'genshin-db';
import { promises as fs } from 'node:fs';
import { join, normalize } from 'node:path';
import { default as characterAbilityMap } from './abilities.mjs';
import { default as characterNameArray } from './namespace.mjs';


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
 * 预检数据正确性。
 */
async function precheck() {
    const nameset = new Set(genshindb.characters('names', { matchCategories: true }))
    for (const name of Object.keys(characterAbilityMap))
        if (!nameset.has(name)) {
            throw Error(
                `Character "${name}" does not exist !!!`
            )
        }
}

/**
 * 提取数据库中预先指定的部分数据。
 */
async function migrate(to) {
    // 命名时这里的变量名与写入文件中的必须一致！！！
    const characters = []
    const queryChars = genshindb.characters('names', { matchCategories: true, verboseCategories: true })
    for (const char of queryChars) {
        // 角色基本信息
        const name = char['name']
        const data = {
            name,
            rarity: char['rarity'],
            region: char['region'] ? char['region'] : null,
            weapon: char['weaponText'],
            element: char['elementText']
                ? char['elementText'] !== '无' ? char['elementText'] : null
                : null,
            gameIndex: characterNameArray.indexOf(name),
            abilities: [],
        }
        if (data.gameIndex < 0 && name !== '空' && name !== '荧')
            throw Error(
                `Character "${name}" is not in namespace !!!`
            )
        // 天赋（talent）、命之座（constellation）
        if (name in characterAbilityMap) {
            const queryTalents = genshindb.talents(name)
            const queryConstellations = genshindb.constellations(name)
            for (const { scope, short, talent, constellation } of characterAbilityMap[name]) {
                const field =
                    talent ? talentsText[talent]
                        : constellation ? constellationsText[constellation]
                            : ''
                const original = (
                    talent ? queryTalents[talent]['description']
                        : constellation ? queryConstellations[constellation]['description']
                            : '【人工标注】\n游戏内无对应描述，或数据库未提供。'
                )
                data.abilities.push({ scope, field, short, original })
            }
        }
        characters.push(data)
    }

    // ----------------------------------------------------------------

    // 不同元素的主角（天赋）各不相同，但不同性别的描述一致，所以合并性别、拆分元素，不过目前主角都没什么实用天赋；
    // 不同性别的奇偶（天赋）描述一致，但不想新增技术债，因此不作特殊处理。
    // 这里将 `name` 字段改成与天赋数据库中的一致。
    remove(characters, c => c.name === '空' || c.name === '荧')
    characters.push(
        // @formatter:off
        { name: '旅行者 (风元素)', rarity: 5, region: null, weapon: '单手剑', element: '风', gameIndex: -7, abilities: [] },
        { name: '旅行者 (岩元素)', rarity: 5, region: null, weapon: '单手剑', element: '岩', gameIndex: -6, abilities: [] },
        { name: '旅行者 (雷元素)', rarity: 5, region: null, weapon: '单手剑', element: '雷', gameIndex: -5, abilities: [] },
        { name: '旅行者 (草元素)', rarity: 5, region: null, weapon: '单手剑', element: '草', gameIndex: -4, abilities: [] },
        { name: '旅行者 (水元素)', rarity: 5, region: null, weapon: '单手剑', element: '水', gameIndex: -3, abilities: [] },
        { name: '旅行者 (火元素)', rarity: 5, region: null, weapon: '单手剑', element: '火', gameIndex: -2, abilities: [] },
        // { name: '旅行者 (冰元素)', rarity: 5, region: null, weapon: '单手剑', element: '冰', gameIndex: -1, abilities: [] },
        // @formatter:on
    )

    // FIXME: 临时补上 genshin-db@5.2.9 “兹白”缺失的 region 字段。
    const char = characters.find(c => c.name === '兹白')
    if (char) {
        char.region = '璃月'
    }

    characters.sort((a, b) => b.gameIndex - a.gameIndex)

    // ----------------------------------------------------------------

    const data = (
        "import type { GenshinCharacter } from '@navifox/types';\n" +
        '// 此文件由脚本生成。\n' +
        `export const characters: GenshinCharacter[] = ${JSON.stringify(characters, null, 4)}`
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
        await precheck()
        await migrate(targetPath)
        console.log('OK.')
    } catch (error) {
        console.error(`Unexpected error during extracting:\n\t${error.message}`)
        process.exit(1)
    }
})()
