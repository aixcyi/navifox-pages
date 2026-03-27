<script lang="ts" setup>
import Content from '#/layouts/Content.vue';
import { UUID } from '@navifox/utils';
import { onClickOutside } from '@vueuse/core';
import { nextTick, ref, shallowRef, useTemplateRef } from 'vue';

const isEditing = ref(false)
const plaintext = ref('00112233-4455-6677-8899-aabbccddeeff')
const uuid = shallowRef(UUID.parse(plaintext.value))
const editor = useTemplateRef('editor')

onClickOutside(editor, () => {
    if (isEditing.value) {
        uuid.value = UUID.parse(plaintext.value)
        plaintext.value = uuid.value?.string ?? plaintext.value
    }
    isEditing.value = false
})
</script>


<template>
<Content>
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
                <span v-show="uuid?.variant === undefined" class="text-red-500">（填写的UUID无法识别）</span>
                <code v-show="uuid?.variant !== undefined && uuid.variant !== UUID.RFC_4122">
                    <span>{{ uuid!.fields[0] }}-</span>
                    <span>{{ uuid!.fields[1] }}-</span>
                    <span>{{ uuid!.fields[2] }}-</span>
                    <span class="text-purple-700 dark:text-purple-400">{{ uuid!.fields[3]!.substring(0, 2) }}</span>
                    <span>{{ uuid!.fields[3]!.substring(2) }}-</span>
                    <span>{{ uuid!.fields[4] }}</span>
                </code>
                <code v-show="uuid?.variant !== undefined && uuid.variant === UUID.RFC_4122">
                    <span>{{ uuid!.fields[0] }}-</span>
                    <span>{{ uuid!.fields[1] }}-</span>
                    <span class="text-cyan-500 dark:text-cyan-400">{{ uuid!.fields[2]![0] }}</span>
                    <span>{{ uuid!.fields[2]!.substring(1) }}-</span>
                    <span class="text-purple-700 dark:text-purple-400">{{ uuid!.fields[3]!.substring(0, 2) }}</span>
                    <span>{{ uuid!.fields[3]!.substring(2) }}-</span>
                    <span>{{ uuid!.fields[4] }}</span>
                </code>
            </div>
        </div>
        <div v-if="uuid" class="text-center mx-auto flex flex-col gap-y-4">
            <div v-for="bits in [
                uuid.bits.substring(0, 32),
                uuid.bits.substring(32, 48),
                uuid.bits.substring(48, 64),
                uuid.bits.substring(64, 80),
                uuid.bits.substring(80),
            ]"
                 class="grid grid-cols-20">
                <template v-for="(bit, index) in bits">
                    <code :class="bit==='0' ? 'opacity-20' : ''" class="mx-1">{{ bit }}</code>
                    <code v-if="(index+1)%4===0"></code>
                </template>
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
                    <td><code>0,1,2,3,4,5,6,7</code></td>
                    <td>Apollo NCS UUID</td>
                </tr>
                <tr :class="uuid?.variant === UUID.RFC_4122 ? 'bg-slate-200 dark:bg-slate-700' : ''">
                    <td><code>10<span class="opacity-20">** ****</span></code></td>
                    <td><code>8,9,A,B</code></td>
                    <td>
                        <a class="text-purple-600 hover:text-purple-400 dark:text-purple-300 dark:hover:text-purple-500"
                           href="https://www.rfc-editor.org/rfc/rfc9562.html"
                           target="_blank">
                            RFC 9562</a>
                        UUID
                    </td>
                </tr>
                <tr :class="uuid?.variant === UUID.MICROSOFT ? 'bg-slate-200 dark:bg-slate-700' : ''">
                    <td><code>110<span class="opacity-20">* ****</span></code></td>
                    <td><code>C,D</code></td>
                    <td>微软 COM／DCOM UUID</td>
                </tr>
                <tr :class="uuid?.variant === UUID.FUTURE ? 'bg-slate-200 dark:bg-slate-700' : ''">
                    <td><code>111<span class="opacity-20">* ****</span></code></td>
                    <td><code>E,F</code></td>
                    <td><i>未定义，为未来保留</i></td>
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
                    <th>要素</th>
                    <th>说明</th>
                </tr>
                </thead>
                <tbody class="**:[td]:px-6 **:[td]:py-1.5">
                <tr :class="uuid?.version === 1 ? 'bg-slate-200 dark:bg-slate-700' : ''">
                    <td style="text-align:center;"><code>0001</code></td>
                    <td style="text-align:center;"><code>1</code></td>
                    <td>公历时间戳，时钟序号，节点地址</td>
                    <td>UUIDv1。</td>
                </tr>
                <tr :class="uuid?.version === 6 ? 'bg-slate-200 dark:bg-slate-700' : ''">
                    <td style="text-align:center;"><code>0110</code></td>
                    <td style="text-align:center;"><code>6</code></td>
                    <td>公历时间戳，时钟序号，节点地址</td>
                    <td>UUIDv6。与 v1 相比调整了时间戳的顺序。</td>
                </tr>
                <tr :class="uuid?.version === 2 ? 'bg-slate-200 dark:bg-slate-700' : ''">
                    <td style="text-align:center;"><code>0010</code></td>
                    <td style="text-align:center;"><code>2</code></td>
                    <td>公历时间戳，时钟序号，节点地址，本地信息</td>
                    <td>UUIDv2。DCE 安全 UUID。</td>
                </tr>
                <tr :class="uuid?.version === 3 ? 'bg-slate-200 dark:bg-slate-700' : ''">
                    <td style="text-align:center;"><code>0011</code></td>
                    <td style="text-align:center;"><code>3</code></td>
                    <td>命名空间杂凑值</td>
                    <td>UUIDv3。命名空间下唯一名称的 MD5 杂凑值。</td>
                </tr>
                <tr :class="uuid?.version === 5 ? 'bg-slate-200 dark:bg-slate-700' : ''">
                    <td style="text-align:center;"><code>0101</code></td>
                    <td style="text-align:center;"><code>5</code></td>
                    <td>命名空间杂凑值</td>
                    <td>UUIDv5。命名空间下唯一名称的 SHA-1 杂凑值。</td>
                </tr>
                <tr :class="uuid?.version === 4 ? 'bg-slate-200 dark:bg-slate-700' : ''">
                    <td style="text-align:center;"><code>0100</code></td>
                    <td style="text-align:center;"><code>4</code></td>
                    <td>随机数</td>
                    <td>UUIDv4。</td>
                </tr>
                <tr :class="uuid?.version === 7 ? 'bg-slate-200 dark:bg-slate-700' : ''">
                    <td style="text-align:center;"><code>0111</code></td>
                    <td style="text-align:center;"><code>7</code></td>
                    <td>随机数，Unix 时间戳</td>
                    <td>UUIDv7。</td>
                </tr>
                <tr :class="uuid?.version === 8 ? 'bg-slate-200 dark:bg-slate-700' : ''">
                    <td style="text-align:center;"><code>1000</code></td>
                    <td style="text-align:center;"><code>8</code></td>
                    <td>(自定义)</td>
                    <td>UUIDv8。自定义结构的 UUID。</td>
                </tr>
                <tr :class="uuid?.version === 0 ? 'bg-slate-200 dark:bg-slate-700' : ''">
                    <td style="text-align:center;"><code>0000</code></td>
                    <td style="text-align:center;"><code>0</code></td>
                    <td>-</td>
                    <td>未使用。</td>
                </tr>
                <tr :class="uuid?.version && uuid.version > 8 ? 'bg-slate-200 dark:bg-slate-700' : ''">
                    <td style="text-align:center;">其它</td>
                    <td style="text-align:center;"></td>
                    <td></td>
                    <td>未定义，为未来保留。</td>
                </tr>
                </tbody>
                <tfoot class="text-slate-500 dark:text-slate-400">
                <tr>
                    <td class="px-8 pt-3 pb-4" colspan="4">
                        <ul class="list-inside list-[lower-greek]">
                            <li>UUIDv8 意思是 RFC 9562 定义的第八版 UUID 结构。</li>
                            <li>UUIDv8 除了 <code>variant</code> 和 <code>version</code>
                                两个字段需要固定值，剩余部分的结构和取值由使用者定义。
                            </li>
                            <li>“杂凑值”就是指的“哈希值”。</li>
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
