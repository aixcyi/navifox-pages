<script lang="ts" setup>
import { Markdown } from '@navifox/ui';
import { format } from '@navifox/utils/dnt';
import { computed } from 'vue';

interface Props {
    /** 主色调。决定了圆点的颜色。 */
    color: string;

    /** 渐变色调。线条会从主色渐变过渡到该颜色。 */
    gradientColor?: string;

    /** 模糊日期。 */
    date?: string;

    /** 具体日期。 */
    moment?: Date;

    /** 位置信息。 */
    location?: string;

    /** 是不是最后一个元素？用于展示渐隐拖尾。 */
    last?: boolean;

    /** 整个 body 都作为 Markdown 编译？ */
    markdown?: boolean;
}

const props = defineProps<Props>();

/** 具体日期的展示文本，只有时分不为零时才附上时间。 */
const momentText = computed(() => {
    if (props.moment == null) return '';
    const withTime = props.moment.getHours() !== 0 || props.moment.getMinutes() !== 0;
    return format(props.moment, withTime ? 'yyyy 年 M 月 d 日 HH:mm' : 'yyyy 年 M 月 d 日');
});
</script>

<template>
    <li class="relative" :class="last ? 'pb-12' : 'pb-6'">
        <div
            :style="{
                backgroundImage: `linear-gradient(to bottom, ${color}, ${gradientColor ?? (last ? 'transparent' : color)})`,
            }"
            class="absolute top-2.5 left-2.5 h-full w-0.75"
        />
        <div class="absolute">
            <div :style="{ backgroundColor: color }" class="absolute top-1.5 left-1.5 z-1 size-2.75 rounded-[50%]" />
            <div :style="{ backgroundColor: color }" class="absolute size-5.5 rounded-[50%] opacity-50" />
        </div>
        <div class="relative pl-8">
            <Markdown v-if="markdown">
                <slot></slot>
            </Markdown>
            <div v-else>
                <slot></slot>
            </div>
            <div v-if="date || moment || location" class="mt-1 text-sm text-slate-300 dark:text-slate-600">
                <span v-if="date" v-html="date" />
                <span v-else-if="moment">{{ momentText }}</span>
                <span v-if="location">，{{ location }}</span>
            </div>
        </div>
    </li>
</template>
