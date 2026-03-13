<script lang="ts" setup>
import LinkButton from "#/components/LinkButton.vue";
import TimestampTable from '#/components/TimestampTable.vue';
import Content from '#/layouts/Content.vue';
import { Duration } from '@navifox/utils';
import { ref } from 'vue';

const tabCursor = ref(0)
const zz = (n: number) => n > 9 ? '' : '0'
const zzz = (n: number) => n > 99 ? '' : n > 9 ? '0' : '00'
const configs = {
    millisecond: {
        title: '毫秒级时间戳',
        lowerLmt: 1n,
        upperLmt: 1n << 54n,
        duration: (stamp: bigint) => Duration.fromMilliseconds(stamp - 1n),
        dateFmt: "yyyy-MM-dd　HH:mm:ss. SSS",
        dateLmt: (d: Duration) => [
            `<code>${d.year} </code>年<code> </code>`,
            `<code>${d.day} </code>天　<code>${zz(d.hour)}</code>`,
            `<code>${d.hour}:${zz(d.minute)}</code>`,
            `<code>${d.minute}:${zz(d.second)}</code>`,
            `<code>${d.second}. ${zzz(d.millisecond)}</code>`,
            `<code>${d.millisecond}</code>`,
        ].slice(
            Math.min(4, d.getLeadingZeroQty()),
        ).join(
            ''
        ),
    },
    second: {
        title: '秒级时间戳',
        lowerLmt: 1n,
        upperLmt: 1n << 45n,
        duration: (stamp: bigint) => Duration.fromSeconds(stamp - 1n),
        dateFmt: "yyyy-MM-dd　HH:mm:ss",
        dateLmt: (d: Duration) => [
            `<code>${d.year} </code>年<code> </code>`,
            `<code>${d.day} </code>天<code>　${zz(d.hour)}</code>`,
            `<code>${d.hour}:${zz(d.minute)}</code>`,
            `<code>${d.minute}:${zz(d.second)}</code>`,
            `<code>${d.second}</code>`,
        ].slice(
            Math.min(3, d.getLeadingZeroQty()),
        ).join(
            ''
        ),
    },
    day: {
        title: '日戳',
        lowerLmt: 1n,
        upperLmt: 36n ** 5n,
        duration: (stamp: bigint) => Duration.fromDays(stamp - 1n),
        dateFmt: "yyyy-MM-dd",
        dateLmt: (d: Duration) => d.year > 0
            ? `<code>${d.year} </code>年<code> ${d.day} </code>天`
            : `<code>${d.day} </code>天`,
    },
}
</script>


<template>
<Content>
    <template #buttons>
        <LinkButton text="毫秒戳" @click="tabCursor=0" />
        <LinkButton text="秒戳" @click="tabCursor=1" />
        <LinkButton text="日戳" @click="tabCursor=2" />
    </template>
    <div class="MaxContainer max-w-dvw! flex flex-col overflow-x-scroll">
        <TransitionGroup>
            <TimestampTable v-show="tabCursor===0" key="millisecondStamp" v-bind="configs.millisecond" />
            <TimestampTable v-show="tabCursor===1" key="secondStamp" v-bind="configs.second" />
            <TimestampTable v-show="tabCursor===2" key="dayStamp" v-bind="configs.day" />
        </TransitionGroup>
    </div>
</Content>
</template>
