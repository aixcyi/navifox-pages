<script lang="ts" setup>
import Content from '#/layouts/Content.vue';
import { Icon } from '@iconify/vue';
import { AiButton } from '@navifox/ui';
import { head, last } from 'es-toolkit';
import { computed, isRef, type Ref, ref } from 'vue';

const pySources = [
    { indexUrl: `https://mirrors.ustc.edu.cn/pypi/simple`, name: '中科大' },
    { indexUrl: 'https://mirrors.tuna.tsinghua.edu.cn/pypi/web/simple', name: '清华' },
    { indexUrl: 'https://pypi.tuna.tsinghua.edu.cn/simple', name: '清华 TUNA' },
    { indexUrl: `https://mirrors.pku.edu.cn/pypi/web/simple`, name: '北大' },
    { indexUrl: `https://mirrors.cernet.edu.cn/pypi/web/simple`, name: 'CERNET' },
    { indexUrl: 'https://mirrors.sustech.edu.cn/pypi/web/simple', name: '南科大' },
    { indexUrl: 'https://mirrors.cloud.aliyuncs.com/pypi/simple', name: '阿里云' },
    { indexUrl: 'https://mirrors.huaweicloud.com/repository/pypi/simple', name: '华为云' },
    { indexUrl: 'https://mirrors.163.com/pypi/simple', name: '网易' },
    { indexUrl: 'https://pypi.douban.com/simple', name: '豆瓣' },
]
const pyManagers = {
    pip: 'logos:pypi',
    uv: 'vscode-icons:file-type-uv',
    pipx: 'simple-icons:pipx',
}
const pyCliZIndex = ref(0)
const pySourceHost = computed(() => new URL(pySource.value).hostname)
const pySource = ref(head(pySources)!.indexUrl)
const pyPackage = ref('django')
const pyManager = ref<'pip' | 'uv' | 'pipx'>('pip')

const nodeSources = [
    { registry: 'https://npmreg.proxy.ustclug.org/', name: '中科大' },
    { registry: 'https://registry.npmmirror.com/', name: '淘宝' },
    { registry: 'https://npm.aliyun.com/', name: '阿里云' },
    { registry: 'https://mirrors.cloud.tencent.com/npm/', name: '腾讯云' },
    { registry: 'https://mirrors.huaweicloud.com/repository/npm/', name: '华为云' },
    { registry: 'https://mirrors.163.com/npm/', name: '网易' },
    { registry: 'https://registry.npmjs.org/', name: 'npm' },
]
const nodeManagers = {
    npm: 'logos:npm-icon',
    pnpm: 'devicon:pnpm',
    yarn: 'logos:yarn',
}
const nodeCliZIndex = ref(0)
const nodeSource = ref(head(nodeSources)!.registry)
const nodePackage = ref('vue')
const nodeManager = ref<'npm' | 'pnpm' | 'yarn'>('npm')

const thePackage = (p: string | Ref<string>) => isRef(p) ? (p.value ? p.value : 'zeraora') : (p ? p : 'zeraora')
const cli = computed(() => ({
    pip: {
        show: (
            'pip config get global.index-url\n' +
            'pip config get global.trusted-host'
        ),
        clean: (
            'pip config unset global.index-url\n' +
            'pip config unset global.trusted-host'
        ),
        config: (
            `pip config set global.index-url ${pySource.value}\n` +
            `pip config set global.trusted-host ${pySourceHost.value}`
        ),
        install: [
            // @formatter:off
            `pip install ${thePackage(pyPackage)} -i ${pySource.value} --trusted-host ${pySourceHost.value}`,
            `pip install ${thePackage(pyPackage)} -i ${pySource.value} --trusted-host ${pySourceHost.value}`,
                        `${thePackage(pyPackage)} -i ${pySource.value} --trusted-host ${pySourceHost.value}`,
                                                 `-i ${pySource.value} --trusted-host ${pySourceHost.value}`,
                                                       pySource.value,
            // @formatter:on
        ]
    },
    uv: {
        show: (
            'uv pip config get global.index-url\n' +
            'uv pip config get global.trusted-host'
        ),
        clean: (
            'uv pip config unset global.index-url\n' +
            'uv pip config unset global.trusted-host'
        ),
        config: (
            `uv pip config set global.index-url ${pySource.value}\n` +
            `uv pip config set global.trusted-host ${pySourceHost.value}`
        ),
        install: [
            // @formatter:off
            `uv pip install ${thePackage(pyPackage)} --index ${pySource.value} --trusted-host ${pySourceHost.value}`,
            `uv pip install ${thePackage(pyPackage)} --index ${pySource.value} --trusted-host ${pySourceHost.value}`,
                           `${thePackage(pyPackage)} --index ${pySource.value} --trusted-host ${pySourceHost.value}`,
                                                    `--index ${pySource.value} --trusted-host ${pySourceHost.value}`,
                                                               pySource.value,
            // @formatter:on
        ]
    },
    pipx: {
        show: (
            'pip config get global.index-url\n' +
            'pip config get global.trusted-host'
        ),
        clean: (
            'pip config unset global.index-url\n' +
            'pip config unset global.trusted-host'
        ),
        config: (
            `pip config set global.index-url ${pySource.value}\n` +
            `pip config set global.trusted-host ${pySourceHost.value}`
        ),
        install: [
            // @formatter:off
            `pipx install ${thePackage(pyPackage)} -i ${pySource.value} --pip-args="--trusted-host=${pySourceHost.value}"`,
            `pipx install ${thePackage(pyPackage)} -i ${pySource.value} --pip-args="--trusted-host=${pySourceHost.value}"`,
                         `${thePackage(pyPackage)} -i ${pySource.value} --pip-args="--trusted-host=${pySourceHost.value}"`,
                                                  `-i ${pySource.value} --pip-args="--trusted-host=${pySourceHost.value}"`,
                                                        pySource.value,
            // @formatter:on
        ]
    },
    npm: {
        show: 'npm config get --global registry',
        clean: 'npm config delete --global registry',
        config: `npm config set --global registry=${nodeSource.value}`,
        install: [
            // @formatter:off
            `npm install ${thePackage(nodePackage)} --registry ${nodeSource.value}`,
            `npm install ${thePackage(nodePackage)} --registry ${nodeSource.value}`,
                        `${thePackage(nodePackage)} --registry ${nodeSource.value}`,
                                                   `--registry ${nodeSource.value}`,
                                                                 nodeSource.value,
            // @formatter:on
        ]
    },
    pnpm: {
        show: 'pnpm config get --global registry',
        clean: 'pnpm config delete --global registry',
        config: `pnpm config set --global registry ${nodeSource.value}`,
        install: [
            // @formatter:off
            `pnpm add ${thePackage(nodePackage)} --registry ${nodeSource.value}`,
            `pnpm add ${thePackage(nodePackage)} --registry ${nodeSource.value}`,
                     `${thePackage(nodePackage)} --registry ${nodeSource.value}`,
                                                `--registry ${nodeSource.value}`,
                                                              nodeSource.value,
            // @formatter:on
        ]
    },
    yarn: {
        show: 'yarn config get --global registry',
        clean: 'yarn config unset --global registry',
        config: `yarn config set --global registry ${nodeSource.value}`,
        install: [
            // @formatter:off
            `yarn add ${thePackage(nodePackage)} --registry ${nodeSource.value}`,
            `yarn add ${thePackage(nodePackage)} --registry ${nodeSource.value}`,
                     `${thePackage(nodePackage)} --registry ${nodeSource.value}`,
                                                `--registry ${nodeSource.value}`,
                                                              nodeSource.value,
            // @formatter:on
        ]
    },
}))
</script>


<template>
<Content>
    <div
        class="MaxContainer flex flex-col space-y-16 text-black dark:text-white **:[p]:border-b **:[p]:border-b-slate-200 dark:**:[p]:border-b-slate-700"
    >
        <div class="p-6 md:p-12 space-y-2 bg-white dark:bg-slate-800 rounded-lg">
            <div class="mb-6 max-md:mt-6 text-2xl flex flex-nowrap items-center justify-center overflow-x-hidden">
                <template v-for="(icon, manager, index) in pyManagers">
                    <div
                        v-if="index > 0"
                        class="ml-4 pr-4 h-full border-l border-l-slate-300 dark:border-l-slate-600"
                    >
                        {{ '\x00' }}
                    </div>
                    <button
                        :class="pyManager === manager ? 'opacity-100' : 'opacity-20'"
                        class="flex flex-nowrap gap-2 cursor-pointer"
                        type="button"
                        @click="pyManager = manager"
                    >
                        <Icon :icon class="min-w-8" height="32" />
                        <span v-show="pyManager === manager">{{ manager }}</span>
                    </button>
                </template>
            </div>
            <div class="mb-12 flex flex-wrap items-center justify-center gap-3">
                <AiButton
                    v-for="{indexUrl, name} in pySources"
                    :text="name"
                    inner
                    @click="pySource = indexUrl" />
            </div>
            <h3 class="mb-3 text-xl flex gap-2">
                <span class="cursor-default text-nowrap">直接安装</span>
                <input
                    v-model="pyPackage"
                    class="w-full rounded-xs outline-2 outline-transparent focus:outline-[#366E9D] dark:focus:outline-amber-300 selection:bg-amber-300 selection:text-[#366E9D] dark:selection:bg-[#366E9D] dark:selection:text-amber-200"
                    placeholder="zeraora" />
            </h3>
            <p v-if="pyManager === 'pip'">
                <code :class="pyCliZIndex===1 ? 'text-pink-500 dark:text-pink-400' : ''">
                    <span>pip install</span>
                    <code :class="pyCliZIndex===2 ? 'text-pink-500 dark:text-pink-400' : ''">
                        <span>&nbsp;{{ thePackage(pyPackage) }}</span>
                        <code :class="pyCliZIndex===3 ? 'text-pink-500 dark:text-pink-400' : ''">
                            <span>&nbsp;-i</span>
                            <code :class="pyCliZIndex===4 ? 'text-pink-500 dark:text-pink-400' : ''">
                                <span>&nbsp;{{ pySource }}</span>
                            </code>
                            <span>&nbsp;--trusted-host {{ pySourceHost }}</span>
                        </code>
                    </code>
                </code>
            </p>
            <p v-if="pyManager === 'uv'">
                <code :class="pyCliZIndex===1 ? 'text-pink-500 dark:text-pink-400' : ''">
                    <span>uv pip install</span>
                    <code :class="pyCliZIndex===2 ? 'text-pink-500 dark:text-pink-400' : ''">
                        <span>&nbsp;{{ thePackage(pyPackage) }}</span>
                        <code :class="pyCliZIndex===3 ? 'text-pink-500 dark:text-pink-400' : ''">
                            <span>&nbsp;-i</span>
                            <code :class="pyCliZIndex===4 ? 'text-pink-500 dark:text-pink-400' : ''">
                                <span>&nbsp;{{ pySource }}</span>
                            </code>
                            <span>&nbsp;--trusted-host {{ pySourceHost }}</span>
                        </code>
                    </code>
                </code>
            </p>
            <p v-if="pyManager === 'pipx'">
                <code :class="pyCliZIndex===1 ? 'text-pink-500 dark:text-pink-400' : ''">
                    <span>pipx install</span>
                    <code :class="pyCliZIndex===2 ? 'text-pink-500 dark:text-pink-400' : ''">
                        <span>&nbsp;{{ thePackage(pyPackage) }}</span>
                        <code :class="pyCliZIndex===3 ? 'text-pink-500 dark:text-pink-400' : ''">
                            <span>&nbsp;-i</span>
                            <code :class="pyCliZIndex===4 ? 'text-pink-500 dark:text-pink-400' : ''">
                                <span>&nbsp;{{ pySource }}</span>
                            </code>
                            <span>&nbsp;--pip-args="--trusted-host={{ pySourceHost }}"</span>
                        </code>
                    </code>
                </code>
            </p>
            <div class="mb-8 flex flex-wrap justify-end gap-3">
                <AiButton
                    :copytext="cli[pyManager].install[4]"
                    inner
                    text="复制链接"
                    @mouseleave="pyCliZIndex = 0"
                    @mouseover="pyCliZIndex = 4" />
                <AiButton
                    :copytext="cli[pyManager].install[3]"
                    inner
                    text="复制可选参数"
                    @mouseleave="pyCliZIndex = 0"
                    @mouseover="pyCliZIndex = 3" />
                <AiButton
                    :copytext="cli[pyManager].install[2]"
                    inner
                    text="复制所有参数"
                    @mouseleave="pyCliZIndex = 0"
                    @mouseover="pyCliZIndex = 2" />
                <AiButton
                    :copytext="cli[pyManager].install[1]"
                    coffee
                    inner
                    text="复制所有"
                    @mouseleave="pyCliZIndex = 0"
                    @mouseover="pyCliZIndex = 1" />
            </div>
            <h3 class="mb-3 text-xl">
                <span class="cursor-default">全局设置</span>
            </h3>
            <p v-for="line in cli[pyManager].config.split('\n')"><code>{{ line }}</code></p>
            <div class="mb-8 flex flex-wrap justify-end gap-3">
                <AiButton :copytext="cli[pyManager].config" coffee inner text="复制所有" />
            </div>
            <h3 class="mb-3 text-xl">
                <span class="cursor-default">查看全局设置</span>
            </h3>
            <p v-for="line in cli[pyManager].show.split('\n')"><code>{{ line }}</code></p>
            <div class="mb-8 flex flex-wrap justify-end gap-3">
                <AiButton :copytext="cli[pyManager].show" coffee inner text="复制所有" />
            </div>
            <h3 class="mb-3 text-xl">
                <span class="cursor-default">清除全局设置</span>
            </h3>
            <p v-for="line in cli[pyManager].clean.split('\n')"><code>{{ line }}</code></p>
            <div class="flex flex-wrap justify-end gap-3">
                <AiButton :copytext="cli[pyManager].clean" coffee inner text="复制所有" />
            </div>
        </div>

        <!-- ---------------------------------------------------------------- -->

        <div class="p-6 md:p-12 space-y-2 bg-white dark:bg-slate-800 rounded-lg">
            <div class="mb-6 max-md:mt-6 text-2xl flex flex-nowrap items-center justify-center overflow-x-hidden">
                <template v-for="(icon, manager, index) in nodeManagers">
                    <div
                        v-if="index > 0"
                        class="ml-4 pr-4 h-full border-l border-l-slate-300 dark:border-l-slate-600"
                    >
                        {{ '\x00' }}
                    </div>
                    <button
                        :class="nodeManager === manager ? 'opacity-100' : 'opacity-20'"
                        class="flex flex-nowrap gap-2 cursor-pointer"
                        type="button"
                        @click="nodeManager = manager"
                    >
                        <Icon :icon class="min-w-8" height="32" />
                        <span v-show="nodeManager === manager">{{ manager }}</span>
                    </button>
                </template>
            </div>
            <div class="mb-12 flex flex-wrap items-center justify-center gap-3">
                <AiButton
                    v-for="{registry, name} in nodeSources"
                    :text="name"
                    inner
                    @click="nodeSource = registry" />
            </div>
            <h3 class="mb-3 text-xl flex items-center gap-2">
                <span class="cursor-default text-nowrap">直接安装</span>
                <input
                    v-model="nodePackage"
                    class="w-full  rounded-xs outline-2 outline-transparent focus:outline-black dark:focus:outline-yellow-300 selection:bg-yellow-300 selection:text-black"
                    placeholder="zeraora" />
            </h3>
            <p v-show="nodeManager === 'npm'">
                <code :class="nodeCliZIndex===1 ? 'text-pink-500 dark:text-pink-400' : ''">
                    <span>npm install</span>
                    <code :class="nodeCliZIndex===2 ? 'text-pink-500 dark:text-pink-400' : ''">
                        <span>&nbsp;{{ thePackage(nodePackage) }}</span>
                        <code :class="nodeCliZIndex===3 ? 'text-pink-500 dark:text-pink-400' : ''">
                            <span class="pl-2">--registry</span>
                            <code :class="nodeCliZIndex===4 ? 'text-pink-500 dark:text-pink-400' : ''">
                                <span class="pl-2">{{ nodeSource }}</span>
                            </code>
                        </code>
                    </code>
                </code>
            </p>
            <p v-show="nodeManager === 'pnpm'">
                <code :class="nodeCliZIndex===1 ? 'text-pink-500 dark:text-pink-400' : ''">
                    <span>pnpm add</span>
                    <code :class="nodeCliZIndex===2 ? 'text-pink-500 dark:text-pink-400' : ''">
                        <span>&nbsp;{{ thePackage(nodePackage) }}</span>
                        <code :class="nodeCliZIndex===3 ? 'text-pink-500 dark:text-pink-400' : ''">
                            <span class="pl-2">--registry</span>
                            <code :class="nodeCliZIndex===4 ? 'text-pink-500 dark:text-pink-400' : ''">
                                <span class="pl-2">{{ nodeSource }}</span>
                            </code>
                        </code>
                    </code>
                </code>
            </p>
            <p v-show="nodeManager === 'yarn'">
                <code :class="nodeCliZIndex===1 ? 'text-pink-500 dark:text-pink-400' : ''">
                    <span>yarn add</span>
                    <code :class="nodeCliZIndex===2 ? 'text-pink-500 dark:text-pink-400' : ''">
                        <span>&nbsp;{{ thePackage(nodePackage) }}</span>
                        <code :class="nodeCliZIndex===3 ? 'text-pink-500 dark:text-pink-400' : ''">
                            <span class="pl-2">--registry</span>
                            <code :class="nodeCliZIndex===4 ? 'text-pink-500 dark:text-pink-400' : ''">
                                <span class="pl-2">{{ nodeSource }}</span>
                            </code>
                        </code>
                    </code>
                </code>
            </p>
            <div class="mb-8 flex flex-wrap justify-end gap-3">
                <AiButton
                    :copytext="cli[nodeManager].install[4]"
                    inner
                    text="复制链接"
                    @mouseleave="nodeCliZIndex = 0"
                    @mouseover="nodeCliZIndex = 4" />
                <AiButton
                    :copytext="cli[nodeManager].install[3]"
                    inner
                    text="复制可选参数"
                    @mouseleave="nodeCliZIndex = 0"
                    @mouseover="nodeCliZIndex = 3" />
                <AiButton
                    :copytext="cli[nodeManager].install[2]"
                    inner
                    text="复制所有参数"
                    @mouseleave="nodeCliZIndex = 0"
                    @mouseover="nodeCliZIndex = 2" />
                <AiButton
                    :copytext="cli[nodeManager].install[1]"
                    coffee
                    inner
                    text="复制所有"
                    @mouseleave="nodeCliZIndex = 0"
                    @mouseover="nodeCliZIndex = 1" />
            </div>
            <h3 class="mb-3 text-xl">
                <span class="cursor-default">
                    {{ nodeSource === last(nodeSources)!.registry ? '重置全局设置' : '全局设置' }}</span>
            </h3>
            <p><code>{{ cli[nodeManager].config }}</code></p>
            <div class="mb-8 flex flex-wrap justify-end gap-3">
                <AiButton :copytext="cli[nodeManager].config" coffee inner text="复制所有" />
            </div>
            <h3 class="mb-3 text-xl">
                <span class="cursor-default">查看全局设置</span>
            </h3>
            <p><code>{{ cli[nodeManager].show }}</code></p>
            <div class="mb-8 flex flex-wrap justify-end gap-3">
                <AiButton :copytext="cli[nodeManager].show" coffee inner text="复制所有" />
            </div>
            <h3 class="mb-3 text-xl">
                <span class="cursor-default">清除全局设置</span>
            </h3>
            <p><code>{{ cli[nodeManager].clean }}</code></p>
            <div class="flex flex-wrap justify-end gap-3">
                <AiButton :copytext="cli[nodeManager].clean" coffee inner text="复制所有" />
            </div>
        </div>

    </div>
</Content>
</template>
