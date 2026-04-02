<script lang="ts" setup>
import Content from '#/layouts/Content.vue';
import { AiButton } from '@navifox/ui';
import { chunks, UUID } from '@navifox/utils';
import { onClickOutside } from '@vueuse/core';
import { range } from 'es-toolkit';
import { nextTick, onMounted, ref, shallowRef, useTemplateRef } from 'vue';

const editor = useTemplateRef('editor')
const isEditing = ref(false)
const plaintext = ref('00112233-4455-6677-8899-aabbccddeeff')
const uuid = shallowRef<UUID | null>(null)
const bitsoup = shallowRef<{ bit: string, classes: string[] }[][]>([])

interface UUIDInfo<T> {
    variant?: T
    version?: T
    timestamp?: T
    timeUTC?: T
    timeLocal?: T
    sequence?: T
    node?: T
    local?: T
}

function update() {
    if (!uuid.value) return
    const info: UUIDInfo<number[]> = {}
    switch (uuid.value.variant) {
        case UUID.NCS:
            info.variant = range(64, 64 + 1)
            break
        case UUID.RFC_4122:
            info.variant = range(64, 64 + 2)
            break
        case UUID.MICROSOFT:
        case UUID.FUTURE:
            info.variant = range(64, 64 + 3)
    }
    if (uuid.value.version !== undefined) {
        info.version = range(48, 48 + 4)
        switch (uuid.value.version) {
            case 1:
            case 6:
                info.timestamp = [ ...range(0, 48), ...range(52, 64) ]
                info.sequence = range(66, 80)
                info.node = range(80, 128)
                break
            case 2:
                info.timestamp = [ ...range(32, 48), ...range(52, 64) ]
                info.sequence = range(66, 80)
                info.node = range(80, 128)
                info.local = range(0, 32)
                break
            case 7:
                info.timestamp = range(0, 48)
        }
    }
    const bits = [ ...uuid.value.bits ].map((bit, index) => {
        const classes = []
        if (bit === '0') classes.push('opacity-20')
        if (info.variant?.includes(index)) classes.push('bg-purple-700/50', 'dark:bg-purple-400/50')
        if (info.version?.includes(index)) classes.push('bg-cyan-500/50', 'dark:bg-cyan-400/50')
        if (info.timestamp?.includes(index)) classes.push('bg-lime-500/50', 'dark:bg-lime-400/50')
        if (info.sequence?.includes(index)) classes.push('bg-orange-500/50', 'dark:bg-orange-400/50')
        if (info.node?.includes(index)) classes.push('bg-pink-500/50', 'dark:bg-pink-400/50')
        if (info.local?.includes(index)) classes.push('bg-olive-500/50', 'dark:bg-olive-400/50')
        return { bit, classes }
    })
    bitsoup.value = chunks(bits, [ 32, 16, 16, 16, 48 ])
}

onMounted(() => {
    uuid.value = UUID.parse(plaintext.value)
    plaintext.value = uuid.value?.string ?? plaintext.value
    update()
})
onClickOutside(editor, () => {
    if (isEditing.value) {
        uuid.value = UUID.parse(plaintext.value)
        plaintext.value = uuid.value?.string ?? plaintext.value
        update()
    }
    isEditing.value = false
})
</script>


<template>
<Content>
    <template #buttons>
        <AiButton text="UUID v1" @click="uuid = UUID.v1(); plaintext = uuid.string; update()" />
        <AiButton text="UUID v2" @click="uuid = UUID.v2(); plaintext = uuid.string; update()" />
        <AiButton text="UUID v4" @click="uuid = UUID.v4(); plaintext = uuid.string; update()" />
        <AiButton text="UUID v6" @click="uuid = UUID.v6(); plaintext = uuid.string; update()" />
        <AiButton text="UUID v7" @click="uuid = UUID.v7(); plaintext = uuid.string; update()" />
        <AiButton :copytext="uuid?.hex" coffee text="复制纯 Hex" />
    </template>
    <div class="MaxContainer flex flex-col text-black dark:text-white">
        <div class="md:text-2xl text-center text-nowrap overflow-x-auto selection:bg-pink-300 selection:text-black">
            <input v-show="isEditing"
                   id="editor"
                   ref="editor"
                   v-model="plaintext"
                   class="w-full p-4 text-center font-mono border outline-0 rounded-lg bg-slate-200 dark:bg-slate-700 border-slate-300 dark:border-slate-500 hover:border-pink-500 dark:hover:border-pink-300"
                   placeholder="填写一个 UUID"
                   type="text"
                   @focus.self="event => (event.currentTarget as HTMLInputElement).select()"
            />
            <div v-show="!isEditing"
                 class="w-full p-4 border rounded-lg border-transparent"
                 @dblclick="isEditing = true; nextTick(() => editor?.focus())">
                <span v-if="uuid?.variant === undefined" class="text-red-500">（填写的UUID无法识别）</span>
                <code v-else-if="uuid.variant !== UUID.RFC_4122">
                    <span>{{ uuid.fields[0] }}-</span>
                    <span>{{ uuid.fields[1] }}-</span>
                    <span>{{ uuid.fields[2] }}-</span>
                    <span class="text-purple-700 dark:text-purple-400">{{ uuid.fields[3]!.substring(0, 1) }}</span>
                    <span>{{ uuid.fields[3]!.substring(1) }}-</span>
                    <span>{{ uuid.fields[4] }}</span>
                </code>
                <code v-else-if="uuid.version === undefined || ![1,2,6,7].includes(uuid.version)">
                    <span>{{ uuid.fields[0] }}-</span>
                    <span>{{ uuid.fields[1] }}-</span>
                    <span class="text-cyan-500 dark:text-cyan-400">{{ uuid.fields[2]![0] }}</span>
                    <span>{{ uuid.fields[2]!.substring(1) }}-</span>
                    <span class="text-purple-700 dark:text-purple-400">{{ uuid.fields[3]!.substring(0, 1) }}</span>
                    <span>{{ uuid.fields[3]!.substring(1) }}-</span>
                    <span>{{ uuid.fields[4] }}</span>
                </code>
                <code v-else-if="uuid.version === 7">
                    <span class="text-lime-500 dark:text-lime-400">{{ uuid.fields[0] }}</span>
                    <span>-</span>
                    <span class="text-lime-500 dark:text-lime-400">{{ uuid.fields[1] }}</span>
                    <span>-</span>
                    <span class="text-cyan-500 dark:text-cyan-400">{{ uuid.fields[2]![0] }}</span>
                    <span>{{ uuid.fields[2]!.substring(1) }}-</span>
                    <span class="text-purple-700 dark:text-purple-400">{{ uuid.fields[3]!.substring(0, 1) }}</span>
                    <span>{{ uuid.fields[3]!.substring(1) }}-</span>
                    <span>{{ uuid.fields[4] }}</span>
                </code>
                <code v-else-if="uuid.version === 1 || uuid.version === 6">
                    <span class="text-lime-500 dark:text-lime-400">{{ uuid.fields[0] }}</span>
                    <span>-</span>
                    <span class="text-lime-500 dark:text-lime-400">{{ uuid.fields[1] }}</span>
                    <span>-</span>
                    <span class="text-cyan-500 dark:text-cyan-400">{{ uuid.fields[2]![0] }}</span>
                    <span class="text-lime-500 dark:text-lime-400">{{ uuid.fields[2]!.substring(1) }}</span>
                    <span>-</span>
                    <span class="text-purple-700 dark:text-purple-400">{{ uuid.fields[3]!.substring(0, 1) }}</span>
                    <span class="text-orange-500 dark:text-orange-400">{{ uuid.fields[3]!.substring(1) }}</span>
                    <span>-</span>
                    <span class="text-pink-500 dark:text-pink-400">{{ uuid.fields[4] }}</span>
                </code>
                <code v-else-if="uuid.version === 2">
                    <span class="text-olive-500 dark:text-olive-400">{{ uuid.fields[0] }}</span>
                    <span>-</span>
                    <span class="text-lime-500 dark:text-lime-400">{{ uuid.fields[1] }}</span>
                    <span>-</span>
                    <span class="text-cyan-500 dark:text-cyan-400">{{ uuid.fields[2]![0] }}</span>
                    <span class="text-lime-500 dark:text-lime-400">{{ uuid.fields[2]!.substring(1) }}</span>
                    <span>-</span>
                    <span class="text-purple-700 dark:text-purple-400">{{ uuid.fields[3]!.substring(0, 1) }}</span>
                    <span class="text-orange-500 dark:text-orange-400">{{ uuid.fields[3]!.substring(1) }}</span>
                    <span>-</span>
                    <span class="text-pink-500 dark:text-pink-400">{{ uuid.fields[4] }}</span>
                </code>
            </div>
        </div>
        <div v-if="uuid" class="mt-4 overflow-x-auto">
            <div class="mx-auto w-fit flex flex-nowrap p-6 bg-white dark:bg-slate-800 rounded-lg">
                <div class="flex flex-col gap-y-4 min-w-96 text-center">
                    <div v-for="part in bitsoup" class="grid grid-cols-19">
                        <template v-for="({bit, classes}, index) in part">
                            <code :class="classes" class="px-1">{{ bit }}</code>
                            <code v-if="index % 4 === 3 && index % 16 !== 15"></code>
                        </template>
                    </div>
                </div>
                <div
                    class="ml-4 pl-4 text-nowrap border-l border-l-slate-200 dark:border-l-slate-700 space-y-3 empty:hidden">
                    <p v-if="uuid.timeUTC">
                        时刻<br />
                        <code class="bg-lime-500/50 dark:bg-lime-400/50">{{ uuid.timestampSeconds }}</code><br />
                        <code>{{ uuid.timeUTC }}</code><br />
                        <code>{{ uuid.timeLocal }}</code><br />
                    </p>
                    <p v-if="uuid.sequence">
                        时钟序号<br />
                        <code class="bg-orange-500/50 dark:bg-orange-400/50">{{ uuid.sequence }}</code>
                    </p>
                    <p v-if="uuid.node">
                        节点地址<br />
                        <code class="bg-pink-500/50 dark:bg-pink-400/50">{{ uuid.node }}</code>
                    </p>
                    <p v-if="uuid.local">
                        本地信息<br />
                        <code class="bg-olive-500/50 dark:bg-olive-400/50">{{ uuid.local }}</code>
                    </p>
                </div>
            </div>
        </div>
        <div class="mt-10 mb-4 flex *:mx-auto">
            <span><code class="text-purple-700 dark:text-purple-400">variant</code> 字段值</span>
        </div>
        <div class="overflow-x-auto">
            <table class="mx-auto text-nowrap bg-white dark:bg-slate-800 rounded-lg">
                <thead class="**:[th]:px-8 **:[th]:py-4">
                <tr>
                    <th>比特位</th>
                    <th>值</th>
                    <th>种类</th>
                </tr>
                </thead>
                <tbody class="**:[td]:px-8 **:[td]:py-1.5">
                <tr :class="uuid?.variant === UUID.NCS ? 'bg-slate-200 dark:bg-slate-700' : ''">
                    <td><code>0<span class="opacity-20">*** ****</span></code></td>
                    <td>
                        <template v-for="(c, i) in '01234567'">
                            <code>{{ c }}</code><span v-if="i < 7">、</span>
                        </template>
                    </td>
                    <td>Apollo NCS UUID</td>
                </tr>
                <tr :class="uuid?.variant === UUID.RFC_4122 ? 'bg-slate-200 dark:bg-slate-700' : ''">
                    <td><code>10<span class="opacity-20">** ****</span></code></td>
                    <td>
                        <template v-for="(c, i) in '89ab'">
                            <code>{{ c }}</code><span v-if="i < 3">、</span>
                        </template>
                    </td>
                    <td>
                        <a class="text-purple-700 dark:text-purple-400 hover:text-purple-400 dark:hover:text-purple-200"
                           href="https://www.rfc-editor.org/rfc/rfc9562.html"
                           target="_blank">
                            RFC 9562</a>
                        UUID<br />
                    </td>
                </tr>
                <tr :class="uuid?.variant === UUID.MICROSOFT ? 'bg-slate-200 dark:bg-slate-700' : ''">
                    <td><code>110<span class="opacity-20">* ****</span></code></td>
                    <td><code>c</code>、<code>d</code></td>
                    <td>微软 COM／DCOM UUID</td>
                </tr>
                <tr :class="uuid?.variant === UUID.FUTURE ? 'bg-slate-200 dark:bg-slate-700' : ''">
                    <td><code>111<span class="opacity-20">* ****</span></code></td>
                    <td><code>e</code>、<code>f</code></td>
                    <td><span class="text-slate-500 dark:text-slate-400">未定义，为未来保留</span></td>
                </tr>
                </tbody>
                <tfoot class="text-slate-500 dark:text-slate-400">
                <tr>
                    <td class="px-8 pt-3 pb-4" colspan="3">
                        <ul class="list-inside list-[lower-greek]">
                            <li>表格中的 <code>*</code> 表示不关心比特位的具体值。</li>
                            <li>字段 <b>不一定</b> 会占用全部 <code>8</code> 个比特位。</li>
                        </ul>
                    </td>
                </tr>
                </tfoot>
            </table>
        </div>
        <div class="mt-10 mb-4 flex *:mx-auto">
            <span>RFC 9562 <code class="text-cyan-500 dark:text-cyan-400">version</code> 字段值</span>
        </div>
        <div class="overflow-x-auto">
            <table class="mx-auto text-nowrap bg-white dark:bg-slate-800 rounded-lg">
                <thead class="**:[th]:px-6 **:[th]:py-4">
                <tr>
                    <th>比特位</th>
                    <th>值</th>
                    <th>要素／说明</th>
                </tr>
                </thead>
                <tbody class="**:[td]:px-6 **:[td]:py-1.5">
                <tr :class="uuid?.version === 1 ? 'bg-slate-200 dark:bg-slate-700' : ''">
                    <td style="text-align:center;"><code>0001</code></td>
                    <td style="text-align:center;"><code>1</code></td>
                    <td>
                        公历时间戳，时钟序号，节点地址<br />
                        <span class="text-slate-500 dark:text-slate-400">
                            UUIDv1。“公历时间戳”单位为 100 纳秒，Epoch 是
                            <code>1582-10-15 00:00:00.000 GMT+0</code>。
                        </span>
                    </td>
                </tr>
                <tr :class="uuid?.version === 6 ? 'bg-slate-200 dark:bg-slate-700' : ''">
                    <td style="text-align:center;"><code>0110</code></td>
                    <td style="text-align:center;"><code>6</code></td>
                    <td>
                        公历时间戳，时钟序号，节点地址<br />
                        <span class="text-slate-500 dark:text-slate-400">
                            UUIDv6。与 v1 相比调整了时间戳的比特位顺序，以提高数据库等索引和排序的性能。
                        </span>
                    </td>
                </tr>
                <tr :class="uuid?.version === 2 ? 'bg-slate-200 dark:bg-slate-700' : ''">
                    <td style="text-align:center;"><code>0010</code></td>
                    <td style="text-align:center;"><code>2</code></td>
                    <td>
                        公历时间戳，时钟序号，节点地址，本地信息<br />
                        <span class="text-slate-500 dark:text-slate-400">
                            UUIDv2。占用了 v1 时间戳部分比特位存放本地信息，若仅靠时钟变动，每 7 分钟又 9.4967295 秒才能生成一个新的 UUID。
                        </span>
                    </td>
                </tr>
                <tr :class="uuid?.version === 3 ? 'bg-slate-200 dark:bg-slate-700' : ''">
                    <td style="text-align:center;"><code>0011</code></td>
                    <td style="text-align:center;"><code>3</code></td>
                    <td>
                        命名空间下唯一名称的杂凑值<br />
                        <span class="text-slate-500 dark:text-slate-400">
                            UUIDv3。基于某个 UUID 计算出的一个字符串的 MD5 哈希值。
                        </span>
                    </td>
                </tr>
                <tr :class="uuid?.version === 5 ? 'bg-slate-200 dark:bg-slate-700' : ''">
                    <td style="text-align:center;"><code>0101</code></td>
                    <td style="text-align:center;"><code>5</code></td>
                    <td>
                        命名空间下唯一名称的杂凑值<br />
                        <span class="text-slate-500 dark:text-slate-400">
                            UUIDv5。基于某个 UUID 计算出的一个字符串的 SHA-1 哈希值。
                        </span>
                    </td>
                </tr>
                <tr :class="uuid?.version === 4 ? 'bg-slate-200 dark:bg-slate-700' : ''">
                    <td style="text-align:center;"><code>0100</code></td>
                    <td style="text-align:center;"><code>4</code></td>
                    <td>
                        随机数<br />
                        <span class="text-slate-500 dark:text-slate-400">
                            UUIDv4。除了
                            <code class="text-purple-700 dark:text-purple-400">variant</code>
                            和
                            <code class="text-cyan-500 dark:text-cyan-400">version</code>
                            两个字段需要固定值，其余比特位都是随机数。
                        </span>
                    </td>
                </tr>
                <tr :class="uuid?.version === 7 ? 'bg-slate-200 dark:bg-slate-700' : ''">
                    <td style="text-align:center;"><code>0111</code></td>
                    <td style="text-align:center;"><code>7</code></td>
                    <td>
                        随机数，Unix 时间戳<br />
                        <span class="text-slate-500 dark:text-slate-400">
                            UUIDv7。“Unix 时间戳”单位为 1 毫秒，Epoch 是
                            <code>1970-01-01 00:00:00.000 GMT+0</code>。
                        </span>
                    </td>
                </tr>
                <tr :class="uuid?.version === 8 ? 'bg-slate-200 dark:bg-slate-700' : ''">
                    <td style="text-align:center;"><code>1000</code></td>
                    <td style="text-align:center;"><code>8</code></td>
                    <td>
                        (自定义)<br />
                        <span class="text-slate-500 dark:text-slate-400">
                            UUIDv8。除了
                            <code class="text-purple-700 dark:text-purple-400">variant</code>
                            和
                            <code class="text-cyan-500 dark:text-cyan-400">version</code>
                            两个字段需要固定值，剩余部分的结构和取值由使用者定义。
                        </span>
                    </td>
                </tr>
                <tr :class="uuid?.version === 0 ? 'bg-slate-200 dark:bg-slate-700' : ''">
                    <td style="text-align:center;"><code>0000</code></td>
                    <td style="text-align:center;"><code>0</code></td>
                    <td class="text-slate-500 dark:text-slate-400">未使用。</td>
                </tr>
                <tr :class="uuid?.version && uuid.version > 8 ? 'bg-slate-200 dark:bg-slate-700' : ''">
                    <td style="text-align:center;">其它</td>
                    <td style="text-align:center;"></td>
                    <td class="text-slate-500 dark:text-slate-400">未定义，为未来保留。</td>
                </tr>
                </tbody>
                <tfoot class="text-slate-500 dark:text-slate-400">
                <tr>
                    <td class="px-8 pt-3 pb-4" colspan="4">
                        <ul class="list-inside list-[lower-greek]">
                            <li>UUIDv8 意思是 RFC 9562 定义的第八版 UUID 结构。</li>
                            <li>RFC 9562 及其前身 RFC 4122 均未定义 UUIDv2 的结构。</li>
                        </ul>
                    </td>
                </tr>
                </tfoot>
            </table>
        </div>
    </div>
</Content>
</template>


<style scoped>
</style>
