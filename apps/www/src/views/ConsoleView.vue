<script lang="ts" setup>
import { Label, PinInputInput, PinInputRoot, TabsContent, TabsList, TabsRoot, TabsTrigger } from 'reka-ui';
import { computed, reactive, ref, watch } from 'vue';

import Navbar from '#/components/Navbar.vue';
import SectionHeader from '#/components/SectionHeader.vue';
import Stardust from '#/components/Stardust.vue';

/** 动态口令的位数。 */
const PIN_LENGTH = 6;

interface ConsoleField {
    /** 输入框 id，同时用作标题的 `for` 目标。 */
    id: string;

    /** 对应 form 上的键。 */
    key: 'account' | 'password';

    /** 字段标题：未聚焦时躺在框里充当 placeholder，聚焦后上浮到上边框。 */
    label: string;

    /** 输入类型。 */
    type: 'text' | 'password';

    /** 浏览器自动填充提示。 */
    autocomplete: string;
}

/**
 * 账号栏在两种登录方式里各出现一次，`id` 必须不同。
 * 未激活的 `TabsContent` 会被卸载，同一时刻其实只有一份在文档里，
 * 但依赖这个行为太脆——万一以后加 `forceMount` 就会变成重复 id。
 */
const accountField: ConsoleField = {
    id: 'console-account',
    key: 'account',
    label: '账号',
    type: 'text',
    autocomplete: 'username',
};

/** 栏位容器：`group` 让子元素按 `:focus-within` 联动，同时充当标题的定位上下文。 */
const fieldRowClass = 'group relative';

/**
 * 标题上浮的触发条件，由下面两条类名里成对出现的变体表达：
 * `group-focus-within:` 管「输入框被聚焦」，`group-has-[input:not(:placeholder-shown)]` 管「已经有内容」。
 *
 * 必须带上「有内容」这一半——只看焦点的话，填完账号去点密码框时，
 * 账号的标题会掉回框里压在自己刚输入的文字上。为此输入框挂了一个空白 `placeholder`，
 * 好让 `:placeholder-shown` 能反过来当作「是否为空」的判据。
 *
 * 两段变体必须原样写进字符串，不能抽成常量再拼接：Tailwind 扫的是源码文本，拼接出来的名字它看不见。
 * 也不要用 `[.group:has(input:focus,input:not(...))_&]` 这类手写选择器变体——
 * 带逗号的变体会被 Tailwind 转义成匹配不上的类名，规则生成了却永远不生效。
 */

/**
 * 框体：2px 圆角单线，只有描边配色变：静置是淡金，悬停与聚焦共用同一档强调色。
 *
 * 悬停与聚焦**刻意用同一个颜色**，不是偷懒：Tailwind 把 `group-hover:` 输出在
 * `group-focus-within:` 之后，两者特异性又相同，所以只要两个状态给不同颜色，
 * 「鼠标停在已聚焦的框上」时永远是悬停那档赢——点进输入框（鼠标必然在框上）反而看到更弱的强调色。
 * 要分开就必须再叠一层 `:not(:focus-within)`，代价大、收益小。
 *
 * 深色下原来用的 `white/15` 太暗，几乎看不出边框，一并提亮并统一到同一色相，
 * 免得「标题与边框同色」在深色下变成「标题也发灰」。
 */
const frameClass =
    'border-starlight-500/25 m-0 min-w-0 rounded-xl border-2 p-0 transition-colors duration-200 group-hover:border-starlight-500/60 group-focus-within:border-starlight-500/60 dark:border-starlight-400/25 dark:group-hover:border-starlight-300/60 dark:group-focus-within:border-starlight-300/60';

/**
 * 上边框的缺口。它自身不可见，宽度由 0.01px 随标题一起撑开，让标题平滑地嵌进边框里。
 * 高度刻意压到 2px（恰好铺满上边框）：默认高度会把输入框往下顶一个字高，
 * 那样标题就没法既贴着输入框居中、又在上浮后落在边框中线上了。
 */
const notchClass =
    'invisible m-0 ml-2.5 block h-0.5 max-w-[0.01px] overflow-hidden p-0 text-xs whitespace-nowrap transition-[max-width] duration-200 group-focus-within:max-w-full group-has-[input:not(:placeholder-shown)]:max-w-full';

/**
 * 动态口令栏的缺口：始终撑满。
 * 六格输入没有「框内 placeholder」这种形态，标题没有需要让位的时刻，直接常驻在边框上即可。
 * 缺口里的文字同样不可见——缺口高度只有 2px，文字要另用一个绝对定位的元素画上去，
 * 否则会被 `overflow-hidden` 裁掉。
 */
const pinNotchClass = 'invisible m-0 ml-2.5 block h-0.5 max-w-full overflow-hidden p-0 text-xs whitespace-nowrap';

/** 动态口令栏常驻在上边框的标题，水平位置与其它栏位缺口内的文字对齐。 */
const pinLabelClass =
    'pointer-events-none absolute top-0 left-4.5 -translate-y-1/2 text-xs text-stone-500 transition-colors duration-200 group-hover:text-starlight-600 dark:text-slate-400 dark:group-hover:text-starlight-300 group-focus-within:text-starlight-600 dark:group-focus-within:text-starlight-300';

/** 缺口里的内边距：撑出缺口宽度，也让嵌进来的标题左右各有留白。 */
const notchPadClass = 'px-1.5';

/**
 * 输入框本体：无边框、无背景。`placeholder` 是一个不换行空格，
 * 只为让 `:placeholder-shown` 可用，肉眼看不见。
 */
const inputClass = 'text-night-900 w-full border-0 bg-transparent px-4 py-2.5 text-sm outline-none dark:text-slate-100';

/**
 * 标题：未聚焦且为空时躺在框内左侧，位置与输入框文字完全重合，看起来就是个 placeholder；
 * 聚焦或已有内容后上浮到上边框中线并缩小，正好落进缺口里。
 * `left-4.5`（18px）同时对齐输入框文字（2px 边框 + 16px 内边距）与缺口内文字（10px 外边距 + 6px 内边距）。
 * 颜色跟着框体走：悬停与聚焦一起转成星辉金，与边框同色相；深色下用亮调星辉金，保证亮度够。
 */
const labelClass =
    'pointer-events-none absolute top-1/2 left-4.5 -translate-y-1/2 text-sm text-stone-500 transition-all duration-200 group-hover:text-starlight-600 dark:text-slate-400 dark:group-hover:text-starlight-300 group-focus-within:top-0 group-focus-within:text-xs group-focus-within:text-starlight-600 dark:group-focus-within:text-starlight-300 group-has-[input:not(:placeholder-shown)]:top-0 group-has-[input:not(:placeholder-shown)]:text-xs';

/** 动态口令的六格输入：框体内部平铺，格子本身用底色区分，不再叠一层边框。 */
const pinRootClass = 'flex items-center justify-between gap-2 px-4 py-3';

const pinInputClass =
    'text-night-900 bg-starlight-500/10 focus:bg-starlight-500/20 h-11 w-9 rounded-lg border-0 text-center text-sm outline-none transition-colors duration-200 dark:bg-white/10 dark:text-slate-100 dark:focus:bg-white/20';

/** 登录方式切换：胶囊按钮，激活态用星辉金。 */
const tabListClass =
    'border-starlight-500/20 flex gap-1 rounded-full border bg-white/50 p-1 dark:border-white/10 dark:bg-white/5';

const tabTriggerClass =
    'text-night-900 flex-1 cursor-pointer rounded-full px-4 py-1.5 text-xs font-medium text-stone-500 transition-colors duration-200 hover:text-starlight-600 data-[state=active]:bg-starlight-500/15 data-[state=active]:text-starlight-600 dark:text-slate-400 dark:hover:text-starlight-300 dark:data-[state=active]:text-starlight-300';

/**
 * 次要动作按钮：镂空常亮。
 * 「镂空」是不填底色、只用描边；「常亮」是指它不受表单校验影响，
 * 不绑 `disabled`、也不做禁用态降透明度，任何时候都是同一个观感。
 */
const secondaryButtonClass =
    'border-starlight-500/60 text-starlight-600 hover:border-starlight-500 hover:bg-starlight-500/10 dark:border-starlight-300/60 dark:text-starlight-300 dark:hover:border-starlight-300 dark:hover:bg-starlight-300/10 cursor-pointer rounded-full border-2 px-5 text-sm font-semibold whitespace-nowrap transition-colors duration-200';

/** 两种登录方式。 */
const loginTabs = [
    { value: 'password', label: '账密登录' },
    { value: 'totp', label: 'TOTP 登录' },
] as const;

type LoginMethod = (typeof loginTabs)[number]['value'];

/** 当前登录方式。 */
const activeMethod = ref<LoginMethod>('password');

/** 每种登录方式在主按钮旁边配的次要动作。 */
const secondaryActions: Record<LoginMethod, { label: string; feedback: string }> = {
    password: { label: '注册', feedback: '注册入口尚未接入。' },
    totp: { label: '发送动态密码', feedback: '动态口令下发尚未接入。' },
};

/** 账密登录的栏位。 */
const passwordFields: ConsoleField[] = [
    accountField,
    { id: 'console-password', key: 'password', label: '密码', type: 'password', autocomplete: 'current-password' },
];

/** TOTP 登录的栏位：只要账号，口令另用六格输入。 */
const totpFields: ConsoleField[] = [{ ...accountField, id: 'console-totp-account' }];

/** 登录表单。 */
const form = reactive({ account: '', password: '', pin: [] as number[] });

/** 提交后的提示；认证接口接入前只用来告知尚未连通。 */
const feedback = ref('');

/**
 * 已填好的口令位数。
 * 数字模式下空槽位不是数字（`Number.isInteger` 为假），因此既能过滤掉空位，
 * 又不会把用户真的输入的 `0` 当成空位。
 */
const pinDigits = computed(() => form.pin.filter((digit) => Number.isInteger(digit)));

/** 当前登录方式所需的信息都齐了才允许提交。 */
const canSubmit = computed(() =>
    activeMethod.value === 'password'
        ? form.account.trim().length > 0 && form.password.length > 0
        : form.account.trim().length > 0 && pinDigits.value.length === PIN_LENGTH,
);

/** 换登录方式后旧提示就没意义了，清掉。 */
watch(activeMethod, () => {
    feedback.value = '';
});

function onSubmit(): void {
    // TODO: 接入认证接口后替换这一段的占位提示。
    feedback.value = '认证尚未接入，请稍后再试。';
}

function onSecondary(): void {
    // TODO: 接入注册／下发接口后替换这一段的占位提示。
    feedback.value = secondaryActions[activeMethod.value].feedback;
}
</script>

<template>
    <div class="bg-paper-50 dark:bg-night-950 relative min-h-dvh">
        <Navbar />
        <div class="MaxContainer relative text-stone-600 dark:text-slate-300">
            <SectionHeader class="mt-48" centered eyebrow="Navifox · Console" level="h1" title="狐引">
                狐狸们呼朋引伴的路引凭证<br />
            </SectionHeader>

            <div class="mx-auto mt-12 mb-36 max-w-md">
                <!-- 卡片原有的小标题与说明已由主人移除，`aria-labelledby` 指向的节点随之不存在，
                     这里改成直接给一个组名，避免留下悬空的 ARIA 引用。 -->
                <section
                    class="border-starlight-500/20 rounded-3xl border bg-white/70 p-8 backdrop-blur-sm dark:border-white/10 dark:bg-white/5"
                >
                    <form class="flex flex-col gap-5" @submit.prevent="onSubmit">
                        <TabsRoot v-model="activeMethod" class="flex flex-col gap-5">
                            <TabsList :class="tabListClass">
                                <TabsTrigger
                                    v-for="tab in loginTabs"
                                    :key="tab.value"
                                    :class="tabTriggerClass"
                                    :value="tab.value"
                                >
                                    {{ tab.label }}
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent class="flex flex-col gap-5" value="password">
                                <div v-for="field in passwordFields" :key="field.id" :class="fieldRowClass">
                                    <fieldset :class="frameClass">
                                        <Label as="legend" aria-hidden="true" :class="notchClass">
                                            <span :class="notchPadClass">{{ field.label }}</span>
                                        </Label>
                                        <input
                                            :id="field.id"
                                            v-model="form[field.key]"
                                            :autocomplete="field.autocomplete"
                                            :class="inputClass"
                                            :type="field.type"
                                            placeholder="&nbsp;"
                                        />
                                    </fieldset>
                                    <Label :class="labelClass" :for="field.id">{{ field.label }}</Label>
                                </div>
                            </TabsContent>

                            <TabsContent class="flex flex-col gap-5" value="totp">
                                <div v-for="field in totpFields" :key="field.id" :class="fieldRowClass">
                                    <fieldset :class="frameClass">
                                        <Label as="legend" aria-hidden="true" :class="notchClass">
                                            <span :class="notchPadClass">{{ field.label }}</span>
                                        </Label>
                                        <input
                                            :id="field.id"
                                            v-model="form[field.key]"
                                            :autocomplete="field.autocomplete"
                                            :class="inputClass"
                                            :type="field.type"
                                            placeholder="&nbsp;"
                                        />
                                    </fieldset>
                                    <Label :class="labelClass" :for="field.id">{{ field.label }}</Label>
                                </div>

                                <div :class="fieldRowClass">
                                    <fieldset :class="frameClass">
                                        <Label as="legend" :class="pinNotchClass" id="console-pin-caption">
                                            <span :class="notchPadClass">动态密码</span>
                                        </Label>
                                        <PinInputRoot
                                            v-model="form.pin"
                                            aria-labelledby="console-pin-caption"
                                            :class="pinRootClass"
                                            :otp="true"
                                            role="group"
                                            type="number"
                                        >
                                            <PinInputInput
                                                v-for="index in PIN_LENGTH"
                                                :key="index"
                                                :class="pinInputClass"
                                                :index="index - 1"
                                            />
                                        </PinInputRoot>
                                    </fieldset>
                                    <span :class="pinLabelClass">动态密码</span>
                                </div>
                            </TabsContent>
                        </TabsRoot>

                        <p
                            v-if="feedback"
                            class="text-blossom-600 dark:text-blossom-400 text-xs"
                            role="status"
                            aria-live="polite"
                            v-html="feedback"
                        />
                        <!-- 用 transition-all 而不是 transition-colors：禁用态只改了 opacity，
                             而 transition-colors 的 transition-property 里并不包含 opacity，
                             那样启用／禁用会瞬间切换、没有任何过渡。 -->
                        <div class="flex items-stretch gap-3">
                            <button
                                type="submit"
                                :disabled="!canSubmit"
                                v-html="'登录'"
                                class="bg-starlight-600 hover:bg-starlight-500 dark:bg-starlight-500 dark:hover:bg-starlight-400 dark:text-night-900 flex-1 cursor-pointer rounded-full px-6 py-2.5 text-sm font-semibold text-white transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-40"
                            />
                            <button
                                v-html="secondaryActions[activeMethod].label"
                                :class="secondaryButtonClass"
                                type="button"
                                @click="onSecondary"
                            />
                        </div>
                    </form>
                </section>

                <p class="mt-4 text-center text-xs text-stone-400 dark:text-slate-500">
                    认证接口尚未接入，登录按钮目前只做前端演示。
                </p>
            </div>
        </div>
        <Stardust />
    </div>
</template>
