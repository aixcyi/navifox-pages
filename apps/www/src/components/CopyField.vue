<script lang="ts" setup>
import { Icon } from '@iconify/vue/offline';
import { useClipboard } from '@vueuse/core';
import { ref } from 'vue';

const props = defineProps<{ title: string; value: string; isMono?: boolean }>();
const input = ref<HTMLInputElement | null>(null);
const { copied, copy, isSupported } = useClipboard({ copiedDuring: 1500 });

/** 点击行的空白区域（标签／内容）时聚焦输入框，从而进入“激活”态。 */
function focusInput() {
    input.value?.focus();
}

/** 聚焦只读输入框时全选其内容。 */
function onInputFocus(event: FocusEvent) {
    const target = event.currentTarget;
    if (target instanceof HTMLInputElement) target.select();
}

async function onCopy() {
    if (!isSupported.value) return;
    try {
        await copy(props.value);
    } catch {
        // 复制失败时不切换“已复制”
    }
}
</script>

<template>
    <div
        class="group border-starlight-500/25 focus-within:border-starlight-500/70 dark:focus-within:border-starlight-300/70 flex cursor-text items-stretch overflow-hidden rounded border bg-white/70 text-[0.8rem] leading-[2.5] backdrop-blur-sm transition-colors duration-200 dark:border-white/15 dark:bg-white/5"
        @click="focusInput"
    >
        <span
            class="border-starlight-500/25 bg-starlight-500/5 group-focus-within:border-starlight-500/70 group-focus-within:bg-starlight-500/10 group-focus-within:text-starlight-600 dark:group-focus-within:border-starlight-300/70 dark:group-focus-within:bg-starlight-500/15 dark:group-focus-within:text-starlight-300 flex shrink-0 items-center border-r px-4 text-stone-500 transition-colors duration-200 select-none dark:border-white/15 dark:bg-white/5 dark:text-slate-400"
            v-html="title"
        />
        <input
            ref="input"
            readonly
            :value="value"
            :class="[
                'min-w-0 flex-1 bg-transparent px-4 text-stone-700 outline-none dark:text-slate-200',
                isMono ? 'font-mono' : '',
            ]"
            @focus="onInputFocus"
        />
        <button
            v-if="value"
            type="button"
            :aria-label="copied ? '已复制' : '复制'"
            class="hover:text-starlight-600 dark:hover:text-starlight-300 flex shrink-0 cursor-pointer items-center px-2.5 text-stone-400 transition-colors duration-200 dark:text-slate-400"
            @click="onCopy"
        >
            <Icon :icon="copied ? 'material-symbols:check' : 'material-symbols:content-copy'" height="16" />
        </button>
    </div>
</template>
