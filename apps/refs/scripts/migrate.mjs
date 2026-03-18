import { remove } from 'es-toolkit/array';
import genshindb from 'genshin-db';
import { promises as fs } from 'node:fs';
import { join, normalize } from 'node:path';
import { default as characterAbilityMap } from './abilities.mjs';


const target = '../../src/constants/characters.ts'
const talentsText = {
    'passive1': '固有天赋',
    'passive2': '固有天赋',
    'passive3': '固有天赋',
    'passive4': '固有天赋',
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
        queryLanguages: [genshindb.Language.ChineseSimplified],
        resultLanguage: genshindb.Language.ChineseSimplified,
    })
}

/**
 * 预检数据正确性。
 */
async function precheck() {
    const nameset = new Set(genshindb.characters('names', {matchCategories: true}))
    for (const name of Object.keys(characterAbilityMap))
        if (!nameset.has(name)) {
            console.error(`Character "${name}" does not exist !!!`)
            process.exit(1)
            return
        }
}

/**
 * 提取数据库中预先指定的部分数据。
 */
async function migrate(to) {
    const dataset = []
    const characters = genshindb.characters('names', {matchCategories: true, verboseCategories: true})
    for (const character of characters) {
        // 角色基本信息
        const name = character['name']
        const data = {
            name,
            rarity: character['rarity'],
            region: character['region'] ? character['region'] : null,
            weapon: character['weaponText'],
            element: character['elementText']
                ? character['elementText'] !== '无' ? character['elementText'] : null
                : null,
            abilities: [],
        }
        // 天赋（talent）、命之座（constellation）
        if (name in characterAbilityMap) {
            const dbTalents = genshindb.talents(name)
            const dbConstellations = genshindb.constellations(name)
            for (const {scope, short, talent, constellation} of characterAbilityMap[name]) {
                const field =
                    talent ? talentsText[talent]
                        : constellation ? constellationsText[constellation]
                            : ''
                const original = (
                    talent ? dbTalents[talent]['description']
                        : constellation ? dbConstellations[constellation]['description']
                            : '（为手工标注，游戏内无对应描述）'
                )
                data.abilities.push({scope, field, short, original})
            }
        }
        dataset.push(data)
    }

    // 不同元素的主角（天赋）各不相同，但不同性别的描述一致，所以合并性别、拆分元素，不过目前主角都没什么实用天赋；
    // 不同性别的奇偶（天赋）描述一致，但不想新增技术债，因此不作特殊处理。
    // 这里将 `name` 字段改成与天赋数据库中的一致。
    remove(dataset, c => c.name === '空' || c.name === '荧')
    dataset.push(
        {name: '旅行者 (火元素)', rarity: 5, region: null, weapon: '单手剑', element: '火', abilities: []},
        {name: '旅行者 (水元素)', rarity: 5, region: null, weapon: '单手剑', element: '水', abilities: []},
        {name: '旅行者 (风元素)', rarity: 5, region: null, weapon: '单手剑', element: '风', abilities: []},
        {name: '旅行者 (雷元素)', rarity: 5, region: null, weapon: '单手剑', element: '雷', abilities: []},
        {name: '旅行者 (草元素)', rarity: 5, region: null, weapon: '单手剑', element: '草', abilities: []},
        // {name: '旅行者 (冰元素)', rarity: 5, region: null, weapon: '单手剑', element: '冰', abilities: []},
        {name: '旅行者 (岩元素)', rarity: 5, region: null, weapon: '单手剑', element: '岩', abilities: []},
    )

    // 按拼音排序
    dataset.sort((a, b) => a.name.localeCompare(b.name))

    const data = (
        "import type { GenshinCharacter } from '@navifox/types';\n" +
        '// 此文件由脚本生成。\n' +
        `export const characters: GenshinCharacter[] = ${JSON.stringify(dataset, null, 4)}`
    )
    await fs.writeFile(to, data)
}


(async function main() {
    // 明确被注入的目标
    const [_, egoPath] = process.argv
    const targetPath = normalize(join(egoPath, target))
    console.log(
        `File will be override:\n\t${targetPath}`
    )

    try {
        await initial()
        await precheck()
        await migrate(targetPath)
        console.log('Extractor process completed successfully.')
    } catch (error) {
        console.error(`Unexpected error during extracting: ${error.message}`)
        process.exit(1)
    }
})()
