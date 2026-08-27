<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';

const BYTE_COUNT = 4;
const INITIAL_VALUE = 1;
const INTERVAL_MS = 1000;

type Endianness = 'little' | 'big';

interface ByteCell {
    hex: string;
    decimal: number;
    changed: boolean;
}

interface EndianPanel {
    key: Endianness;
    title: string;
    subtitle: string;
    caption: string;
    cells: ByteCell[];
    bytes: number[];
    hex: string;
}

/**
 * 将数值拆成 4 个字节，按小端内存顺序返回：[最低位字节, …, 最高位字节]。
 */
function getBytes(value: number): number[] {
    const n = value >>> 0;
    return Array.from({ length: BYTE_COUNT }, (_, index) => (n >>> (index * 8)) & 0xff);
}

const currentNumber = ref<number>(INITIAL_VALUE);
const playing = ref<boolean>(true);
const previousBytes = ref<number[]>(getBytes(INITIAL_VALUE));
let timer: ReturnType<typeof setInterval> | null = null;

const toHex = (value: number, digits: number): string => value.toString(16).padStart(digits, '0').toUpperCase();

/**
 * 以 4 位一组（中文万进制习惯）格式化十进制数，如 4294967295 → 42,9496,7295。
 * toLocaleString('zh-CN') 固定按 3 位分组，Intl 没有 4 位分组的选项，故用正则实现。
 */
const formatDecimal = (value: number): string => value.toString().replace(/\B(?=(\d{4})+(?!\d))/g, ',');

const currentHex = computed<string>(() => toHex(currentNumber.value, BYTE_COUNT * 2));

const buildCells = (bytes: number[], changedAt: (address: number) => boolean): ByteCell[] =>
    bytes.map((byte, address) => ({
        hex: toHex(byte, 2),
        decimal: byte,
        changed: changedAt(address),
    }));

const panels = computed<EndianPanel[]>(() => {
    const little = getBytes(currentNumber.value);
    const big = [...little].reverse();
    const prev = previousBytes.value;
    return [
        {
            key: 'little',
            title: '小端字节序',
            subtitle: 'Little Endian',
            caption: '低位字节存放在低地址',
            cells: buildCells(little, (address) => little[address] !== prev[address]),
            bytes: little,
            hex: little.map((byte) => toHex(byte, 2)).join(''),
        },
        {
            key: 'big',
            title: '大端字节序',
            subtitle: 'Big Endian',
            caption: '高位字节存放在低地址',
            cells: buildCells(big, (address) => little[BYTE_COUNT - 1 - address] !== prev[BYTE_COUNT - 1 - address]),
            bytes: big,
            hex: big.map((byte) => toHex(byte, 2)).join(''),
        },
    ];
});

const tick = (): void => {
    previousBytes.value = getBytes(currentNumber.value);
    // 每一步翻倍（等价于左移一位），便于观察进位从低位向高位传播；
    // >>> 0 处理溢出：翻倍越过 2^32 时回到 0，此时重置为初始值 1，保持演示持续循环。
    currentNumber.value = (currentNumber.value * 2) >>> 0 || INITIAL_VALUE;
};

const startTimer = (): void => {
    if (timer !== null) return;
    timer = setInterval(tick, INTERVAL_MS);
};

const stopTimer = (): void => {
    if (timer === null) return;
    clearInterval(timer);
    timer = null;
};

const togglePlay = (): void => {
    playing.value = !playing.value;
    if (playing.value) startTimer();
    else stopTimer();
};

const step = (): void => {
    if (!playing.value) tick();
};

const reset = (): void => {
    currentNumber.value = INITIAL_VALUE;
    previousBytes.value = getBytes(INITIAL_VALUE);
};

onMounted(startTimer);
onUnmounted(stopTimer);
</script>

<template>
    <div class="ByteOrderVisualizer">
        <div class="toolbar">
            <div class="value-group">
                <span class="value-label">当前数值</span>
                <span class="value-decimal">{{ formatDecimal(currentNumber) }}</span>
                <span class="value-hex">0x{{ currentHex }}</span>
            </div>
            <div class="controls">
                <button
                    type="button"
                    class="control"
                    :class="{ active: playing }"
                    :aria-pressed="playing"
                    @click="togglePlay"
                >
                    {{ playing ? '暂停' : '继续' }}
                </button>
                <button type="button" class="control" :disabled="playing" @click="step">单步</button>
                <button type="button" class="control" @click="reset">重置</button>
            </div>
        </div>

        <div class="panels">
            <section v-for="panel in panels" :key="panel.key" class="panel" :class="`panel-${panel.key}`">
                <header class="panel-header">
                    <span class="panel-title">{{ panel.title }}</span>
                    <span class="panel-subtitle">{{ panel.subtitle }}</span>
                </header>

                <div class="byte-row">
                    <div
                        v-for="(cell, address) in panel.cells"
                        :key="`${address}-${cell.hex}`"
                        class="byte-cell"
                        :class="{ changed: cell.changed }"
                    >
                        <div class="byte-address">0x{{ address.toString(16).toUpperCase() }}</div>
                        <div class="byte-value">{{ cell.hex }}</div>
                        <div class="byte-decimal">{{ cell.decimal }}</div>
                    </div>
                </div>

                <div class="panel-caption">{{ panel.caption }}</div>
                <div class="panel-foot">
                    <span class="foot-item">
                        <span class="foot-label">字节集</span>
                        <span class="foot-value">{ {{ panel.bytes.join(', ') }} }</span>
                    </span>
                    <span class="foot-item">
                        <span class="foot-label">HEX</span>
                        <span class="foot-value">{{ panel.hex }}</span>
                    </span>
                </div>
            </section>
        </div>
    </div>
</template>

<style scoped>
/* 小端/大端两栏的强调色：亮色用 Catppuccin latte 的 sky / peach，深色用 macchiato 对应色 */
.ByteOrderVisualizer {
    --bo-accent-little: #04a5e5;
    --bo-accent-big: #fe640b;
    margin: 24px 0;
    font-family: var(--vp-font-family-base);
    user-select: none; /* 去除文本选中，更像动画演示 */
}

/* 数值/十六进制/内存地址等数据一律使用等宽字体 */
.value-decimal,
.value-hex,
.byte-address,
.byte-value,
.byte-decimal,
.foot-value {
    font-family: var(--vp-font-family-mono);
}

.dark .ByteOrderVisualizer {
    --bo-accent-little: #91d7e3;
    --bo-accent-big: #f5a97f;
}

.toolbar {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 8px 16px;
    padding: 10px 14px;
    margin-bottom: 16px;
    border: 1px solid var(--vp-c-divider);
    border-radius: 8px;
    background: var(--vp-c-bg-soft);
}

.value-group {
    display: flex;
    align-items: baseline;
    gap: 10px;
    min-width: 0;
}

.value-label {
    font-size: 0.85rem;
    color: var(--vp-c-text-2);
}

.value-decimal {
    font-size: 1.15rem;
    font-weight: 700;
    color: var(--vp-c-text-1);
}

.value-hex {
    font-size: 0.95rem;
    color: var(--vp-c-text-2);
}

.controls {
    display: flex;
    gap: 8px;
}

.control {
    padding: 4px 12px;
    font-size: 0.85rem;
    line-height: 1.6;
    font-family: inherit;
    border: 1px solid var(--vp-c-divider);
    border-radius: 6px;
    background: transparent;
    color: var(--vp-c-text-1);
    cursor: pointer;
    transition:
        border-color 0.2s ease,
        color 0.2s ease,
        background-color 0.2s ease,
        opacity 0.2s ease;
}

.control:hover:not(:disabled) {
    border-color: var(--vp-c-brand-1);
    color: var(--vp-c-brand-1);
}

.control.active {
    border-color: var(--vp-c-brand-1);
    background: var(--vp-c-brand-soft);
    color: var(--vp-c-brand-1);
}

.control:disabled {
    opacity: 0.45;
    cursor: not-allowed;
}

.control:focus-visible {
    outline: 2px solid var(--vp-c-brand-1);
    outline-offset: 2px;
}

.panels {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 16px;
}

.panel {
    min-width: 0;
    padding: 14px;
    border: 1px solid var(--vp-c-divider);
    border-radius: 8px;
    background: var(--vp-c-bg-soft);
}

.panel-header {
    display: flex;
    align-items: baseline;
    gap: 8px;
    margin-bottom: 14px;
}

.panel-little {
    --accent: var(--bo-accent-little);
}

.panel-big {
    --accent: var(--bo-accent-big);
}

.panel-title {
    font-size: 1rem;
    font-weight: 700;
    color: var(--accent);
}

.panel-subtitle {
    font-size: 0.8rem;
    color: var(--vp-c-text-3);
}

.byte-row {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 8px;
}

.byte-cell {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
    padding: 8px 4px;
    border: 1px solid var(--vp-c-divider);
    border-radius: 6px;
    background: var(--vp-c-bg-alt);
    transition: border-color 0.3s ease;
}

/* 相比上一秒发生变化的字节：以强调色闪烁并常驻浅色底 */
.byte-cell.changed {
    border-color: var(--accent);
    background: color-mix(in srgb, var(--accent) 12%, var(--vp-c-bg-alt));
    animation: byte-flash 0.7s ease;
}

@keyframes byte-flash {
    from {
        box-shadow: 0 0 0 4px color-mix(in srgb, var(--accent) 40%, transparent);
    }
    to {
        box-shadow: 0 0 0 0 color-mix(in srgb, var(--accent) 0%, transparent);
    }
}

.byte-address {
    font-size: 0.7rem;
    color: var(--vp-c-text-3);
}

.byte-value {
    font-size: 1.05rem;
    font-weight: 700;
    color: var(--vp-c-text-1);
}

.byte-decimal {
    font-size: 0.7rem;
    color: var(--vp-c-text-2);
}

.panel-caption {
    margin: 10px 0 8px;
    font-size: 0.8rem;
    color: var(--vp-c-text-2);
}

.panel-foot {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 4px 12px;
    padding-top: 8px;
    font-size: 0.78rem;
    color: var(--vp-c-text-2);
    border-top: 1px dashed var(--vp-c-divider);
}

.foot-item {
    display: inline-flex;
    align-items: baseline;
    gap: 4px;
}

.foot-label {
    font-weight: 600;
}
</style>
