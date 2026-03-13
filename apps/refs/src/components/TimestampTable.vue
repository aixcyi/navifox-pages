<script lang="ts" setup>
import { Duration } from '@navifox/utils'

const props = defineProps<{
    title: string,
    lowerLmt: bigint,
    upperLmt: bigint,
    duration: (stamp: bigint) => Duration,
    dateFmt: string,
    dateLmt: (delta: Duration) => string,
}>()

type Data = { stamp: bigint, powers: Map<bigint, bigint>, delta: string, datetime: string }

const bases = [ 2n, 8n, 10n, 16n, 24n, 26n, 32n, 36n, 62n, 64n, 85n ]
const table = new Map<bigint, Data>()
let power = 0n
for (const base of bases) {
    let stamp = base ** power
    let duration = props.duration(stamp)
    while (stamp <= props.upperLmt) {
        if (stamp < props.lowerLmt) {
            continue
        }
        if (table.has(stamp)) {
            table.get(stamp)!.powers.set(base, power)
        } else {
            table.set(stamp, {
                stamp: stamp,
                powers: new Map([ [ base, power ] ]),
                delta: props.dateLmt(duration),
                datetime: duration.toUTCDateString(props.dateFmt, '-'),
            })
        }
        stamp = base ** ++power
        duration = props.duration(stamp)
    }
    power = 0n
}
const data = [ ...table.values() ].sort(
    (a, b) => a.stamp < b.stamp ? 1 : a.stamp == b.stamp ? 0 : -1
)
</script>


<template>
<div class="relative bg-white dark:bg-slate-800 rounded-lg overflow-hidden">
    <h3 class="absolute opacity-90 right-0 top-0 z-10 rounded-bl-lg px-3 py-1 text-white text-xs/4 tracking-wider bg-gradient-to-r from-indigo-500 to-purple-600">
        {{ title }}</h3>
    <table class="block overflow-x-auto text-slate-900 dark:text-slate-200">
        <thead class="**:[th]:px-4 **:[th]:py-2">
        <tr>
            <th class="text-right">存储上限</th>
            <th class="text-right bg-slate-200 dark:bg-slate-700">时间上限</th>
            <th v-for="() in bases" class="text-center"></th>
        </tr>
        </thead>
        <tbody class="**:[td]:px-4 **:[td]:py-2">
        <tr v-for="row in data"
            class="hover:bg-purple-200 dark:hover:bg-purple-900 transition-colors duration-200">
            <td class="text-right" nowrap="nowrap" v-html="row.delta" />
            <td class="text-right bg-slate-200 dark:bg-slate-700"
                nowrap="nowrap"><code>{{ row.datetime }}</code></td>
            <td v-for="base in bases" class="text-center">
            <span v-if="row.powers.get(base) !== undefined">
                {{ base }}<sup>{{ row.powers.get(base) }}</sup>
            </span>
            </td>
        </tr>
        </tbody>
    </table>
</div>
</template>
