<script lang="ts" setup>
import { Icon } from '@iconify/vue/offline';
import { Duration } from '@navifox/utils';
import { ref } from 'vue';

const props = defineProps<{
    title: string;
    lowerLmt: bigint;
    upperLmt: bigint;
    duration: (stamp: bigint) => Duration;
    dateFmt: string;
    dateLmt: (delta: Duration) => string;
}>();

type Data = { stamp: bigint; powers: Map<bigint, bigint>; delta: string; datetime: string };

const columnHighlighted = ref<bigint>(0n);
const bases = [2n, 8n, 10n, 16n, 24n, 26n, 32n, 36n, 62n, 64n, 85n];
const table = new Map<bigint, Data>();
let power = 0n;
for (const base of bases) {
    let stamp = base ** power;
    let duration = props.duration(stamp);
    while (stamp <= props.upperLmt) {
        if (stamp < props.lowerLmt) {
            continue;
        }
        if (table.has(stamp)) {
            table.get(stamp)!.powers.set(base, power);
        } else {
            table.set(stamp, {
                stamp: stamp,
                powers: new Map([[base, power]]),
                delta: props.dateLmt(duration),
                datetime: duration.toUTCDateString(props.dateFmt, '-'),
            });
        }
        stamp = base ** ++power;
        duration = props.duration(stamp);
    }
    power = 0n;
}
const data = [...table.values()].sort((a, b) => (a.stamp < b.stamp ? 1 : a.stamp == b.stamp ? 0 : -1));
</script>

<template>
    <div class="relative overflow-hidden rounded-lg bg-white dark:bg-slate-800">
        <h3
            class="absolute top-0 left-0 z-10 rounded-br-lg bg-linear-to-r from-indigo-500 to-purple-600 px-3 py-1 text-xs/4 tracking-wider text-white opacity-90"
            v-html="title"
        />
        <table class="block overflow-x-auto text-slate-900 dark:text-slate-200">
            <thead class="**:[th]:px-4 **:[th]:py-2">
                <tr>
                    <th class="text-right">存储上限</th>
                    <th :class="columnHighlighted === 0n ? 'bg-slate-200 dark:bg-slate-700' : ''" class="text-right">
                        时间上限
                    </th>
                    <th
                        v-for="base in bases"
                        :class="columnHighlighted === base ? 'bg-slate-200 dark:bg-slate-700' : ''"
                        class="text-center"
                    >
                        <button
                            class="cursor-pointer"
                            type="button"
                            @click="columnHighlighted = columnHighlighted === base ? 0n : base"
                        >
                            <Icon
                                class="text-slate-300 hover:text-purple-500 dark:text-slate-600"
                                height="24"
                                icon="bx:current-location"
                            />
                        </button>
                    </th>
                </tr>
            </thead>
            <tbody class="**:[td]:px-4 **:[td]:py-2">
                <tr
                    v-for="row in data"
                    class="transition-colors duration-200 hover:bg-purple-200 dark:hover:bg-purple-900"
                >
                    <td class="text-right" nowrap="nowrap" v-html="row.delta" />
                    <td
                        :class="columnHighlighted === 0n ? 'bg-slate-200 dark:bg-slate-700' : ''"
                        class="text-right"
                        nowrap="nowrap"
                    >
                        <code>{{ row.datetime }}</code>
                    </td>
                    <td
                        v-for="base in bases"
                        :class="columnHighlighted === base ? 'bg-slate-200 dark:bg-slate-700' : ''"
                        class="text-center"
                    >
                        <span v-if="row.powers.get(base) !== undefined">
                            {{ base }}<sup>{{ row.powers.get(base) }}</sup>
                        </span>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
