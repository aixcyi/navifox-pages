<script lang="ts" setup>
import { Icon as OnlineIcon } from '@iconify/vue';
import { Icon as OfflineIcon, type IconifyIconProps, type IconProps } from '@iconify/vue/offline';
import type { Badge } from '@navifox/types';
import { computed, reactive } from 'vue';

/**
 * 徽章数据与图标名二选一，其余参数与 `Icon` 一致。
 *
 * `width` / `height` 刻意排除，理由见 {@link flag} 上方的说明；后三个是 `IconProps` 里有、
 * `IconifyIconProps` 里没有的，所以显式补上（类型直接从 {@link IconProps} 上取，
 * 免得依赖它没导出的内部类型）。
 */
interface Props extends Omit<IconifyIconProps, 'icon' | 'width' | 'height'> {
    /** 待渲染的徽章数据，读取其中的 `logo`；与 {@link Props.icon} 二选一。 */
    badge?: Badge;

    /** 图标名，用于没有对应徽章的场景；与 {@link Props.badge} 二选一，两个都给时以徽章为准。 */
    icon?: IconProps['icon'];

    /** 无障碍属性（是否对辅助技术隐藏）。 */
    ariaHidden?: IconProps['ariaHidden'];

    /** 自定义图标内容。 */
    customise?: IconProps['customise'];

    /** 首屏渲染时就尝试加载图标。 */
    ssr?: IconProps['ssr'];

    /** 改用不查离线注册表的在线图标；图标名不在注册表里时才需要。 */
    online?: boolean;
}

const props = defineProps<Props>();

/**
 * 对外是一个 `Icon` 的门面，参数必须逐个显式转交——`width` / `height` 除外，理由见下。
 *
 * - `width` / `height` 不声明成 props，直接作为普通属性透传给 `Icon`。Iconify 靠「只给了高度」
 *   来判断该按图稿比例算宽度，而 Vue 会把未传的 props 补成 `undefined` 一并送进来，那会被当成
 *   「显式给了这个值」从而丢掉比例（`null` 又会被当成没给）；走透传则只有真正写了的那个属性会落下去。
 * - 其余参数显式声明并显式绑定。声明了就不再走属性透传，不绑定等于静默丢弃——`inline`、`mode`
 *   这类参数就是这样丢过一次。
 * - 布尔参数收敛成 `true | undefined`：Iconify 只认 `true`，`undefined` 会被跳过、让它保持默认值，
 *   而 Vue 会把 `<Icon inline />` 这种裸写编译成空字符串，不收敛就会被当成「给了个假值」。
 *   收敛成 `null` 效果相同，但过不了类型检查（`Icon` 这几个 props 声明的是 `boolean | undefined`）。
 */
const flag = (value: boolean | undefined): true | undefined => (value === true ? true : undefined);

/**
 * 在线／离线两个分支除了组件本身，参数完全一样，所以合成一份再展开，
 * 免得以后加参数时只补了一边。
 *
 * 用 {@link reactive} 而不是 `computed`：后者包出的是 ref，展开成 props 后会多出一个 `value`。
 * `icon` 不放在这里——它可能为空，需要在模板里收窄后再单独绑定，`v-bind` 拿不到 `v-if` 的收窄。
 */
const iconProps = reactive({
    'aria-hidden': flag(props.ariaHidden),
    color: props.color,
    customise: props.customise,
    flip: props.flip,
    'h-flip': flag(props.hFlip),
    'horizontal-flip': flag(props.horizontalFlip),
    inline: flag(props.inline),
    mode: props.mode,
    rotate: props.rotate,
    ssr: props.ssr,
    'v-flip': flag(props.vFlip),
    'vertical-flip': flag(props.verticalFlip),
});

/** 实际渲染的图标名：徽章优先。 */
const logo = computed(() => props.badge?.logo ?? props.icon);
</script>

<template>
    <OnlineIcon v-if="logo && props.online" v-bind="iconProps" :icon="logo" />
    <OfflineIcon v-else-if="logo" v-bind="iconProps" :icon="logo" />
</template>
