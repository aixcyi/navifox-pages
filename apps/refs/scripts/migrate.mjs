import genshindb from 'genshin-db';
import { promises as fs } from 'node:fs';
import { join, normalize } from 'node:path';


const talentSet = {
    '安柏': {
        stamina: {id: 'passive3', short: '滑翔'},
    },
    '北斗': {
        stamina: {id: 'passive3', short: '游泳'},
    },
    '坎蒂丝': {
        stamina: {id: 'passive3', short: '攀爬'},
    },
    '夏沃蕾': {
        stamina: {id: 'passive3', short: '冲刺'},
    },
    '柯莱': {
        stamina: {id: 'passive3', short: '滑翔'},
    },
    '菲米尼': {
        stamina: {id: 'passive3', short: '水中'},
    },
    '凯亚': {
        stamina: {id: 'passive3', short: '冲刺'},
    },
    '枫原万叶': {
        stamina: {id: 'passive3', short: '冲刺'},
    },
    '珊瑚宫心海': {
        stamina: {id: 'passive3', short: '游泳'},
    },
    '那维莱特': {
        stamina: {id: 'passive3', short: '水下冲刺'},
    },
    '雷泽': {
        stamina: {id: 'passive3', short: '冲刺'},
    },
    '鹿野院平藏': {
        stamina: {id: 'passive3', short: '冲刺'},
    },
    '温迪': {
        stamina: {id: 'passive3', short: '滑翔'},
    },
    '魈': {
        stamina: {id: 'passive3', short: '攀爬'},
    },
    '克洛琳德': {
        locator: {id: 'passive3', short: '区域特产'},
    },
    '五郎': {
        locator: {id: 'passive3', short: '区域特产'},
    },
    '卡齐娜': {
        locator: {id: 'passive4', short: '区域特产'},
    },
    '基尼奇': {
        locator: {id: 'passive4', short: '区域特产'},
    },
    '可莉': {
        locator: {id: 'passive3', short: '区域特产'},
    },
    '琳妮特': {
        locator: {id: 'passive3', short: '复苏水团'},
    },
    '林尼': {
        locator: {id: 'passive3', short: '区域特产'},
    },
    '米卡': {
        locator: {id: 'passive3', short: '区域特产'},
    },
    '玛拉妮': {
        locator: {id: 'passive4', short: '区域特产'},
    },
    '凝光': {
        locator: {id: 'passive3', short: '锻造矿石'},
    },
    '七七': {
        locator: {id: 'passive3', short: '区域特产'},
    },
    '赛索斯': {
        locator: {id: 'passive3', short: '区域特产'},
    },
    '提纳里': {
        locator: {id: 'passive3', short: '区域特产'},
    },
    '烟绯': {
        locator: {id: 'passive3', short: '区域特产'},
    },
    '班尼特': {
        dispatch: {id: 'passive3', short: '更少时间'},
    },
    '重云': {
        dispatch: {id: 'passive3', short: '更少时间'},
    },
    '赛诺': {
        dispatch: {id: 'passive3', short: '更多回报'},
    },
    '珐露珊': {
        dispatch: {id: 'passive3', short: '更多回报'},
    },
    '菲谢尔': {
        dispatch: {id: 'passive3', short: '更少时间'},
    },
    '刻晴': {
        dispatch: {id: 'passive3', short: '更少时间'},
    },
    '久岐忍': {
        dispatch: {id: 'passive3', short: '更多回报'},
    },
    '娜维娅': {
        dispatch: {id: 'passive3', short: '更多回报'},
    },
    '九条裟罗': {
        dispatch: {id: 'passive3', short: '更少时间'},
    },
    '申鹤': {
        dispatch: {id: 'passive3', short: '更多回报'},
    },
    '夜兰': {
        dispatch: {id: 'passive3', short: '更多回报'},
    },
    '迪希雅': {
        moving: {id: 'passive3', short: '日间'},
    },
    '罗莎莉亚': {
        moving: {id: 'passive3', short: '夜间'},
    },
    '埃洛伊': {
        hunting: {id: 'passive3', short: '禽肉,瘦肉,冷鲜肉'},
    },
    '绮良良': {
        hunting: {id: 'passive3', short: '禽肉,瘦肉,冷鲜肉'},
    },
    '早柚': {
        hunting: {id: 'passive3', short: '生物->野生->其它'},
    },
    '瑶瑶': {
        hunting: {id: 'passive3', short: '生物->野生->其它'},
    },
}


async function migrateGenshinCharacters(to) {
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
            talents: {},
        }
        // 天赋与技能
        if (character['name'] in talentSet) {
            const rawTalents = talentSet[character['name']]
            const dbTalents = genshindb.talents(character['name'])
            for (const [scope, detail] of Object.entries(rawTalents)) {
                data.talents[scope] = {
                    short: detail['short'],
                    verbose: dbTalents[detail['id']]['description'],
                }
            }
        }
        dataset.push(data)
    }

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
