import { remove } from 'es-toolkit/array';
import genshindb from 'genshin-db';
import { promises as fs } from 'node:fs';
import { join, normalize } from 'node:path';


const shorts = {
    '安柏': {
        moving: {short: '元素爆发后', constellation: 'c6'},
        stamina: {short: '滑翔', talent: 'passive3'},
    },
    '北斗': {
        stamina: {short: '游泳', talent: 'passive3'},
    },
    '坎蒂丝': {
        stamina: {short: '攀爬', talent: 'passive3'},
    },
    '夏沃蕾': {
        stamina: {short: '冲刺', talent: 'passive3'},
    },
    '柯莱': {
        stamina: {short: '滑翔', talent: 'passive3'},
    },
    '菲米尼': {
        stamina: {short: '水中', talent: 'passive3'},
    },
    '凯亚': {
        stamina: {short: '冲刺', talent: 'passive3'},
    },
    '枫原万叶': {
        stamina: {short: '冲刺', talent: 'passive3'},
    },
    '珊瑚宫心海': {
        stamina: {short: '游泳', talent: 'passive3'},
    },
    '那维莱特': {
        moving: {short: '水下冲刺', talent: 'passive3'},
    },
    '雷泽': {
        stamina: {short: '冲刺', talent: 'passive3'},
        others: {short: '奔狼岭→吸引狼群'},
    },
    '鹿野院平藏': {
        stamina: {short: '冲刺', talent: 'passive3'},
    },
    '温迪': {
        stamina: {short: '滑翔', talent: 'passive3'},
    },
    '魈': {
        stamina: {short: '攀爬', talent: 'passive3'},
    },
    '克洛琳德': {
        locator: {short: '区域特产', talent: 'passive3'},
    },
    '五郎': {
        locator: {short: '区域特产', talent: 'passive3'},
    },
    '卡齐娜': {
        locator: {short: '区域特产', talent: 'passive4'},
    },
    '基尼奇': {
        moving: {short: '纳塔采集', talent: 'passive4'},
        locator: {short: '区域特产', talent: 'passive4'},
    },
    '可莉': {
        locator: {short: '区域特产', talent: 'passive3'},
    },
    '琳妮特': {
        locator: {short: '复苏水团', talent: 'passive3'},
    },
    '林尼': {
        locator: {short: '区域特产', talent: 'passive3'},
    },
    '米卡': {
        locator: {short: '区域特产', talent: 'passive3'},
    },
    '玛拉妮': {
        locator: {short: '区域特产', talent: 'passive4'},
    },
    '凝光': {
        locator: {short: '锻造矿石', talent: 'passive3'},
    },
    '七七': {
        locator: {short: '区域特产', talent: 'passive3'},
    },
    '赛索斯': {
        locator: {short: '区域特产', talent: 'passive3'},
    },
    '提纳里': {
        locator: {short: '区域特产', talent: 'passive3'},
    },
    '烟绯': {
        locator: {short: '区域特产', talent: 'passive3'},
    },
    '班尼特': {
        dispatch: {short: '更少时间', talent: 'passive3'},
    },
    '重云': {
        dispatch: {short: '更少时间', talent: 'passive3'},
    },
    '赛诺': {
        dispatch: {short: '更多回报', talent: 'passive3'},
    },
    '珐露珊': {
        dispatch: {short: '更多回报', talent: 'passive3'},
    },
    '菲谢尔': {
        dispatch: {short: '更少时间', talent: 'passive3'},
    },
    '刻晴': {
        dispatch: {short: '更少时间', talent: 'passive3'},
    },
    '久岐忍': {
        dispatch: {short: '更多回报', talent: 'passive3'},
    },
    '娜维娅': {
        dispatch: {short: '更多回报', talent: 'passive3'},
    },
    '九条裟罗': {
        dispatch: {short: '更少时间', talent: 'passive3'},
    },
    '申鹤': {
        dispatch: {short: '更多回报', talent: 'passive3'},
    },
    '夜兰': {
        dispatch: {short: '更多回报', talent: 'passive3'},
    },
    '迪希雅': {
        moving: {short: '日间', talent: 'passive3'},
    },
    '罗莎莉亚': {
        moving: {short: '夜间', talent: 'passive3'},
    },
    '嘉明': {
        moving: {short: '日间', talent: 'passive3'},
    },
    '千织': {
        moving: {short: '锦衣', talent: 'passive3'},
    },
    '闲云': {
        moving: {short: '滑翔时', talent: 'passive3'},
    },
    '欧洛伦': {
        moving: {short: '滑翔时', talent: 'passive4'},
    },
    '优菈': {
        crafting: {short: '天赋倍产', talent: 'passive3'},
    },
    '莱依拉': {
        crafting: {short: '天赋倍产', talent: 'passive3'},
    },
    '行秋': {
        crafting: {short: '天赋返还', talent: 'passive3'},
    },
    '八重神子': {
        crafting: {short: '天赋另还', talent: 'passive3'},
    },
    '砂糖': {
        crafting: {short: '素材倍产', talent: 'passive3'},
    },
    '多莉': {
        crafting: {short: '素材倍产', talent: 'passive3'},
    },
    '莫娜': {
        crafting: {short: '素材返还', talent: 'passive3'},
    },
    '艾尔海森': {
        crafting: {short: '素材倍产', talent: 'passive3'},
    },
    '阿贝多': {
        crafting: {short: '素材倍产', talent: 'passive3'},
    },
    '神里绫华': {
        crafting: {short: '素材倍产', talent: 'passive3'},
    },
    '莱欧斯利': {
        crafting: {short: '素材倍产', talent: 'passive3'},
    },
    '丽莎': {
        crafting: {short: '药剂返还', talent: 'passive3'},
    },
    '琴': {
        moving: {short: '获得元素', constellation: 'c2'},
        crafting: {short: '烹饪倍产', talent: 'passive3'},
    },
    '芭芭拉': {
        crafting: {short: '烹饪倍产', talent: 'passive3'},
    },
    '迪奥娜': {
        moving: {short: '护盾内', talent: 'passive1'},
        crafting: {short: '烹饪倍产', talent: 'passive3'},
    },
    '云堇': {
        crafting: {short: '烹饪倍产', talent: 'passive3'},
    },
    '妮露': {
        crafting: {short: '烹饪倍产', talent: 'passive3'},
    },
    '香菱': {
        crafting: {short: '烹饪倍产', talent: 'passive3'},
    },
    '诺艾尔': {
        crafting: {short: '烹饪倍产', talent: 'passive3'},
    },
    '辛焱': {
        crafting: {short: '烹饪倍产', talent: 'passive3'},
    },
    '宵宫': {
        crafting: {short: '摆设返还', talent: 'passive3'},
    },
    '卡维': {
        crafting: {short: '摆设返还', talent: 'passive3'},
    },
    '迪卢克': {
        crafting: {short: '锻造返还', talent: 'passive3'},
    },
    '钟离': {
        crafting: {short: '锻造返还', talent: 'passive3'},
    },
    '甘雨': {
        crafting: {short: '锻造返还', talent: 'passive3'},
    },
    '埃洛伊': {
        others: {short: '禽肉,瘦肉,冷鲜肉', talent: 'passive3'},
    },
    '绮良良': {
        others: {short: '禽肉,瘦肉,冷鲜肉', talent: 'passive3'},
    },
    '早柚': {
        others: {short: '生物→野生→其它', talent: 'passive3'},
    },
    '瑶瑶': {
        others: {short: '生物→野生→其它', talent: 'passive3'},
    },
    '雷电将军': {
        others: {short: '剑,长枪→突破更便宜', talent: 'passive3'},
    },
    '流浪者': {
        others: {short: '弓,法器→突破更便宜', talent: 'passive3'},
    },
    '法尔伽': {
        others: {short: '奔狼岭→吸引狼群'},
    },
    '菈乌玛': {
        others: {short: '挪德卡莱→吸引小动物'},
    },
}


async function migrateGenshinCharacters(to) {
    const characterNames = genshindb.characters('names', {matchCategories: true})
    for (const characterName of Object.keys(shorts)) {
        if (characterNames.indexOf(characterName) === -1) {
            console.log(`Character "${characterName}" does not exist!!!`)
            return
        }
    }

    const dataset = []
    const characters = genshindb.characters('names', {matchCategories: true, verboseCategories: true})
    for (const character of characters) {
        // 角色基本信息
        const data = {
            name: character['name'],
            rarity: character['rarity'],
            region: character['region'] ? character['region'] : null,
            weapon: character['weaponText'],
            element: character['elementText']
                ? character['elementText'] !== '无' ? character['elementText'] : null
                : null,
            abilities: {},
        }
        // 天赋与技能
        if (character['name'] in shorts) {
            const short = shorts[character['name']]
            const dbTalents = genshindb.talents(character['name'])
            const dbConstellations = genshindb.constellations(character['name'])
            for (const [scope, detail] of Object.entries(short)) {
                data.abilities[scope] = {
                    short: detail['short'],
                    verbose:
                        detail['talent'] ? dbTalents[detail['talent']]['description']
                            : detail['constellation'] ? dbConstellations[detail['constellation']]['description']
                                : '(游戏内无明确描述)',
                }
            }
        }
        dataset.push(data)
    }

    // 不同元素的主角（天赋）各不相同，但不同性别的描述一致，所以合并性别、拆分元素，不过目前主角都没什么实用天赋；
    // 不同性别的奇偶（天赋）描述一致，但不想新增技术债，因此不作特殊处理。
    // 这里将 `name` 字段改成与天赋数据库中的一致。
    remove(dataset, c => c.name === '空' || c.name === '荧')
    dataset.push(
        {name: '旅行者 (火元素)', rarity: 5, region: null, weapon: '单手剑', element: '火', abilities: {}},
        {name: '旅行者 (水元素)', rarity: 5, region: null, weapon: '单手剑', element: '水', abilities: {}},
        {name: '旅行者 (风元素)', rarity: 5, region: null, weapon: '单手剑', element: '风', abilities: {}},
        {name: '旅行者 (雷元素)', rarity: 5, region: null, weapon: '单手剑', element: '雷', abilities: {}},
        {name: '旅行者 (草元素)', rarity: 5, region: null, weapon: '单手剑', element: '草', abilities: {}},
        // {name: '旅行者 (冰元素)', rarity: 5, region: null, weapon: '单手剑', element: '冰', abilities: {}},
        {name: '旅行者 (岩元素)', rarity: 5, region: null, weapon: '单手剑', element: '岩', abilities: {}},
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
    // 按照数据库要求进行初始化
    genshindb.setOptions({
        queryLanguages: [genshindb.Language.ChineseSimplified],
        resultLanguage: genshindb.Language.ChineseSimplified,
    })

    // 明确被注入的目标
    const [_, egoPath] = process.argv
    const targetPath = normalize(join(egoPath, '../../src/constants/characters.ts'))
    console.log(
        `File will be override:\n\t${targetPath}`
    )

    try {
        await migrateGenshinCharacters(targetPath)
        console.log('Extractor process completed successfully.')
    } catch (error) {
        console.error(`Unexpected error during extracting: ${error.message}`)
        process.exit(1)
    }
})()
