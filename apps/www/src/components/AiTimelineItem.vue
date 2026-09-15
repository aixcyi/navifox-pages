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

    /** 年份锚点。指定即在轨道左侧显示为可点击的跳转链接（`#<值>`），不指定则留空。 */
    anchor?: string;

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
    <li :id="anchor" class="relative scroll-mt-28 lg:pl-20" :class="last ? 'pb-12' : 'pb-6'">
        <!-- 年份锚点：右边缘钉在轨道左侧 64px 处，字号变大时向左生长，不会挤进圆点。
             h-[22px] 与圆点直径（size-5.5）同高并用 items-center 居中，故字号怎么调都与圆点垂直对齐。
             它是 .Starry 正文里的链接，会被全局 `.Starry a`（金色+下划线）染上；个别条目又用
             `**:[a]:cursor-no-drop` 屏蔽了内部链接的鼠标形状，所以这几处都用 ! 标记覆盖回来。 -->
        <a
            v-if="anchor"
            :href="`#${anchor}`"
            class="font-sign text-starlight-500! hover:text-starlight-600! dark:text-starlight-300! dark:hover:text-starlight-200! absolute right-[calc(100%-64px)] hidden h-[22px] cursor-pointer! items-center text-5xl leading-none whitespace-nowrap no-underline! transition-colors select-none lg:flex"
            v-html="anchor"
        />
        <div
            :style="{
                backgroundImage: `linear-gradient(to bottom, ${color}, ${gradientColor ?? (last ? 'transparent' : color)})`,
            }"
            class="absolute top-2.5 left-2.5 h-full w-0.75 lg:left-[84px]"
        />
        <div class="absolute lg:left-[74px]">
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
