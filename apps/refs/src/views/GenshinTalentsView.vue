<script lang="ts" setup>
import { characters } from '#/constants/characters.ts';
import Content from '#/layouts/Content.vue';
import { Icon } from '@iconify/vue';
import type { AbilityScope, GenshinCharacter } from '@navifox/types';
import { useToggles } from '@navifox/utils';
import { ref } from 'vue';

const columnHighlighted = ref<string>('')
const [ hasRarity, toggleRarity, noRarity ] = useToggles<number>()
const [ hasRegion, toggleRegion, noRegion ] = useToggles<string | null>()
const [ hasWeapon, toggleWeapon, noWeapon ] = useToggles<string>()
const [ hasElement, toggleElement, noElement ] = useToggles<string | null>()
const [ hasAbility, toggleAbility, noAbility ] = useToggles<AbilityScope>()
const isRowShowable = (c: GenshinCharacter) => (
    true
    && (noRarity() || hasRarity(c.rarity))
    && (noRegion() || hasRegion(c.region))
    && (noWeapon() || hasWeapon(c.weapon))
    && (noElement() || hasElement(c.element))
    && (noAbility() || c.abilities.filter(a => hasAbility(a.scope)).length)
)
const endpoint = 'https://genshin.jmp.blue'  // https://github.com/genshindev/api
const regions = [
    { key: '蒙德', text: '蒙德' },
    { key: '璃月', text: '璃月' },
    { key: '稻妻', text: '稻妻' },
    { key: '须弥', text: '须弥' },
    { key: '枫丹', text: '枫丹' },
    { key: '纳塔', text: '纳塔' },
    { key: '挪德卡莱', text: '挪德卡莱' },
    { key: '至冬', text: '至冬' },
    { key: null, text: '未知' },
]
const weapons = [
    { key: '单手剑', text: '剑' },
    { key: '双手剑', text: '大剑' },
    { key: '弓', text: '弓' },
    { key: '法器', text: '法器' },
    { key: '长柄武器', text: '长枪' },
]
const elements = [
    { id: 'pyro', key: '火', text: '火', tableRowColor: 'hover:bg-orange-300 dark:hover:bg-orange-900', },
    { id: 'hydro', key: '水', text: '水', tableRowColor: 'hover:bg-blue-300 dark:hover:bg-blue-900', },
    { id: 'anemo', key: '风', text: '风', tableRowColor: 'hover:bg-teal-100 dark:hover:bg-teal-500', },
    { id: 'electro', key: '雷', text: '雷', tableRowColor: 'hover:bg-purple-200 dark:hover:bg-purple-900', },
    { id: 'dendro', key: '草', text: '草', tableRowColor: 'hover:bg-emerald-400 dark:hover:bg-emerald-900', },
    { id: 'cryo', key: '冰', text: '冰', tableRowColor: 'hover:bg-cyan-200 dark:hover:bg-cyan-700', },
    { id: 'geo', key: '岩', text: '岩', tableRowColor: 'hover:bg-yellow-200 dark:hover:bg-yellow-700', },
    { id: null, key: null, text: '不定', tableRowColor: 'hover:bg-slate-100 dark:hover:bg-slate-900', },
]
const columns: { scope: AbilityScope, text: string }[] = [
    { scope: 'locator', text: '地图标记' },
    { scope: 'dispatch', text: '探索派遣' },
    { scope: 'stamina', text: '体力减免' },
    { scope: 'moving', text: '移速加成' },
    { scope: 'teamup', text: '队伍加成' },
    { scope: 'crafting', text: '烹饪 合成 锻造' },
    { scope: 'interaction', text: '环境交互' },
    { scope: 'others', text: '（未分类）' },
]

function getTableRowColor(e: GenshinCharacter['element']) {
    return elements[elements.findIndex(({ key }) => key === e)]!.tableRowColor
}
</script>


<template>
<Content>
    <template #buttons>
        <div class="m-2 text-slate-900 dark:text-slate-200 flex flex-row">
            <button :class="hasRarity(4) ? 'bg-slate-400 dark:bg-slate-600' : 'bg-slate-200 dark:bg-slate-800'"
                    class="ml-[-1px] cursor-pointer border border-slate-400 dark:border-slate-600 hover:bg-slate-300 dark:hover:bg-slate-700"
                    type="button"
                    @click="toggleRarity(4)">
                <Icon class="m-1 text-purple-400" height="28" icon="uis:star" />
            </button>
            <button :class="hasRarity(5) ? 'bg-slate-400 dark:bg-slate-600' : 'bg-slate-200 dark:bg-slate-800'"
                    class="ml-[-1px] cursor-pointer border border-slate-400 dark:border-slate-600 hover:bg-slate-300 dark:hover:bg-slate-700"
                    type="button"
                    @click="toggleRarity(5)">
                <Icon class="m-1 text-yellow-400" height="28" icon="uis:star" />
            </button>
        </div>
        <div class="m-2 text-slate-900 dark:text-slate-200 flex flex-row flex-wrap justify-center">
            <template v-for="{key, text} in weapons">
                <button :class="hasWeapon(key) ? 'bg-slate-400 dark:bg-slate-600' : 'bg-slate-200 dark:bg-slate-800'"
                        class="ml-[-1px] cursor-pointer border border-slate-400 dark:border-slate-600 hover:bg-slate-300 dark:hover:bg-slate-700"
                        type="button"
                        @click="toggleWeapon(key)">
                    <div class="h-7 my-1 mx-3">{{ text }}</div>
                </button>
            </template>
        </div>
        <div class="m-2 text-slate-900 dark:text-slate-200 flex flex-row flex-wrap justify-center">
            <template v-for="{id, key, text} in elements">
                <button :class="hasElement(key) ? 'bg-slate-400 dark:bg-slate-600' : 'bg-slate-200 dark:bg-slate-800'"
                        class="ml-[-1px] cursor-pointer border border-slate-400 dark:border-slate-600 hover:bg-slate-300 dark:hover:bg-slate-700"
                        type="button"
                        @click="toggleElement(key)">
                    <img v-if="id"
                         :alt="text"
                         :src="`${endpoint}/elements/${id}/icon`"
                         :title="text"
                         class="h-7 m-1" />
                    <Icon v-else
                          class="m-1 text-slate-500"
                          height="28"
                          icon="hugeicons:triangle-dash" />
                </button>
            </template>
        </div>
        <div class="m-2 text-slate-900 dark:text-slate-200 flex flex-row flex-wrap justify-center">
            <template v-for="{key, text} in regions">
                <button :class="hasRegion(key) ? 'bg-slate-400 dark:bg-slate-600' : 'bg-slate-200 dark:bg-slate-800'"
                        class="ml-[-1px] cursor-pointer border border-slate-400 dark:border-slate-600 hover:bg-slate-300 dark:hover:bg-slate-700"
                        type="button"
                        @click="toggleRegion(key)">
                    <div class="h-7 my-1 mx-3">{{ text }}</div>
                </button>
            </template>
        </div>
    </template>

    <div class="MaxContainer flex flex-col">
        <div class="bg-white dark:bg-slate-800 rounded-lg overflow-x-auto">
            <table class="text-center text-nowrap text-slate-900 dark:text-slate-200">
                <thead class="**:[th]:px-4">
                <tr>
                    <th></th>
                    <th v-for="{scope, text} in columns"
                        :class="scope === columnHighlighted ? 'bg-slate-300 dark:bg-slate-600' : ''"
                        class="pt-4 pb-2 cursor-pointer transition-colors duration-200 hover:text-slate-400 dark:hover:text-slate-500"
                        @click="columnHighlighted = columnHighlighted === scope ? '' : scope"
                        v-html="text" />
                </tr>
                <tr>
                    <th></th>
                    <th v-for="{scope} in columns"
                        :class="scope === columnHighlighted ? 'bg-slate-300 dark:bg-slate-600' : ''"
                        class="pt-2 pb-4 cursor-pointer transition-colors duration-200 hover:text-slate-400 dark:hover:text-slate-500"
                        @click="toggleAbility(scope)"
                    >
                        <Icon v-show="hasAbility(scope)" class="mx-auto" height="24" icon="mdi:filter-check" />
                        <Icon v-show="!hasAbility(scope)" class="mx-auto" height="24" icon="mdi:filter" />
                    </th>
                </tr>
                </thead>
                <tbody class="**:[td]:px-4 **:[td]:py-2">
                <tr v-for="character in characters"
                    v-show="isRowShowable(character)"
                    :class="getTableRowColor(character.element)"
                    class="transition-colors duration-200">
                    <td>
                        <div class="flex justify-center items-center">
                            <div>{{ character.name }}</div>
                            <Icon :class="character.rarity === 5 ? 'text-yellow-400' : 'text-purple-400'"
                                  class="ml-1"
                                  height="16"
                                  icon="uis:star" />
                        </div>
                    </td>
                    <td v-for="{scope} in columns"
                        :class="scope === columnHighlighted ? 'bg-slate-300 dark:bg-slate-600' : ''"
                        class="transition-colors duration-200">
                        <template v-for="ability in character.abilities">
                            <p v-if="ability.scope === scope"
                               :title="ability.field ? `【${ability.field}】\n${ability.original}` : ability.original"
                               class="cursor-help hover:opacity-25 transition-opacity duration-200">
                                <span>{{ ability.short }}</span>
                            </p>
                        </template>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</Content>
</template>
