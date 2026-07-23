<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import SpiritCard from '#/theme/components/SpiritCard.vue';

interface AbilityRow {
    faction: string;
    sub: string;
    desc: string;
}

const name = ref('');
const english = ref('');
const tagsInput = ref('');
const avatar = ref('');
const intro = ref('');
const contact = ref('');
const abilities = reactive<AbilityRow[]>([{ faction: '', sub: '', desc: '' }]);

function addAbility() {
    abilities.push({ faction: '', sub: '', desc: '' });
}

function removeAbility(index: number) {
    if (abilities.length > 1) abilities.splice(index, 1);
}

const hasAbilities = computed(() => abilities.some((r) => r.faction || r.sub || r.desc));
const englishNotEmpty = computed(() => english.value.length > 0);
const rules = computed(() => {
    const n = english.value;
    return {
        length: englishNotEmpty.value ? n.length >= 4 : null,
        startWithAlpha: englishNotEmpty.value ? /^[a-z]/.test(n) : null,
        charset: englishNotEmpty.value ? /^[a-z0-9_-]+$/.test(n) : null,
    };
});

const tags = computed(() =>
    tagsInput.value
        .split(/[ ,，]/)
        .map((t) => t.trim())
        .filter(Boolean),
);

const outputTypeScript = computed(() => {
    const indent = '    ';
    const lines = ['{'];
    lines.push(`${indent}name: '${name.value || '妖灵名称'}',`);
    lines.push(`${indent}tags: [${tags.value.map((t) => `'${t}'`).join(', ') || "'标签1', '标签2'"}],`);
    lines.push(`${indent}avatar: '${avatar.value || '头像URL'}',`);
    lines.push(`${indent}link: '/spirit/${english.value || '妖灵ID'}',`);
    lines.push('}');
    return lines.join('\n');
});
const outputMarkdown = computed(() => {
    const lines = [
        '---',
        `title: ${name.value || '妖灵名称'}`,
        'aside: false',
        '---',
        '',
        `# ${name.value || '妖灵名称'}`,
        '',
        `<SpiritBanner names="${name.value || '妖灵名称'}" />`,
        '',
    ];
    if (intro.value) {
        for (const l of intro.value.split('\n')) {
            lines.push(`　　${l}`, '');
        }
    }
    if (hasAbilities.value) {
        lines.push('## 能力', '');
        lines.push('| 派系  |     命名     | 注释     |');
        lines.push('|:-----:|:----------:|------------|');
        for (const r of abilities) {
            if (r.faction || r.sub || r.desc) {
                lines.push(`| ${r.faction || '御灵系'} | ${r.sub || '木'} | ${r.desc || '……'} |`);
            }
        }
        lines.push('');
    }
    if (contact.value) {
        lines.push('## 坐标', '');
        lines.push(`${contact.value}`, '');
    }
    return lines.join('\n');
});
</script>

<template>
    <div class="form">
        <h3>妖灵通联申请表</h3>
        <h4>名称</h4>
        <label>
            <input v-model="name" placeholder="例如：无限" />
            <span class="hint">妖精偏向于二字汉字，人类则偏向于真实姓名（的风格）。</span>
        </label>
        <h4>ID</h4>
        <label>
            <input v-model="english" placeholder="例如：wuxian" />
            <span class="hint">可以是英文名，也可以是拼音全拼。需要满足以下所有条件：</span>
        </label>
        <ul class="hint rules">
            <li :class="{ pass: rules.length === true, fail: rules.length === false }">四个字或以上。</li>
            <li :class="{ pass: rules.startWithAlpha === true, fail: rules.startWithAlpha === false }">
                以小写英文字母开头。
            </li>
            <li :class="{ pass: rules.charset === true, fail: rules.charset === false }">
                由小写英文字母、数字、减号、下划线组成。
            </li>
        </ul>
        <h4>标签</h4>
        <label>
            <input v-model="tagsInput" placeholder="例如：龙游会馆馆长, 二级执行者" />
            <span class="hint">用空格或逗号分隔，能力、派系、评级、职位都可以，没有限制。</span>
        </label>
        <h4>头像</h4>
        <label>
            <input v-model="avatar" placeholder="https://..." />
            <span class="hint">以URL形式提供，要求正方形、128*128 像素及以上的尺寸。</span>
        </label>
        <h4>简介</h4>
        <label>
            <textarea v-model="intro" placeholder="基于罗小黑世界架构的能力设定……" rows="3"></textarea>
        </label>
        <h4>能力</h4>
        <div class="ability-row" v-for="(row, i) in abilities" :key="i">
            <input v-model="row.faction" placeholder="派系" />
            <input v-model="row.sub" placeholder="命名" />
            <input v-model="row.desc" placeholder="简介、来源、影响、作用、微观……" class="wide" />
            <button class="btn-rm" @click="removeAbility(i)" :disabled="abilities.length === 1" title="移除此行">
                &minus;
            </button>
        </div>
        <button class="btn-add" @click="addAbility">+ 追加一行</button>
        <h4>坐标</h4>
        <label>
            <textarea
                v-model="contact"
                placeholder="选填。可以公开的联系方式（三思隐私泄露的可能）。"
                rows="2"
            ></textarea>
        </label>
        <h4>预览效果</h4>
        <SpiritCard :name :tags :avatar :link="english ? `/spirit/${english}` : ''" />
        <h4>复制结果（指引卡片）</h4>
        <pre><code>{{ outputTypeScript }}</code></pre>
        <h4>复制结果（详情页）</h4>
        <pre><code>{{ outputMarkdown }}</code></pre>
    </div>
</template>

<style scoped>
.form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1.5rem;
    margin-top: 1rem;
    margin-bottom: 1rem;
    border: 1px solid var(--vp-c-divider);
    border-radius: 12px;
}

h3 {
    margin: 0;
    font-size: 1.1rem;
    text-align: center;
}

label {
    display: flex;
    flex-direction: column;
    gap: 4px;
    font-size: 0.875rem;
    color: var(--vp-c-text-2);
}

input,
textarea {
    padding: 0.5rem 0.75rem;
    background: var(--vp-c-bg);
    color: var(--vp-c-text-1);
    font-size: 0.9rem;
}

input {
    border-bottom: 2px solid var(--vp-c-brand-soft);
    transition: border-bottom-color 0.5s;

    &:focus {
        border-bottom-color: var(--vp-c-brand-1);
        outline: none;
    }
}

textarea {
    border: 2px solid var(--vp-c-brand-soft);
    border-radius: 12px;
    transition: border-color 0.5s;

    &:focus {
        border-color: var(--vp-c-brand-1);
        outline: none;
    }
}

.hint {
    font-size: 0.75rem;
    padding: 0 0.75rem;
    color: var(--vp-c-text-3);
}

.rules {
    margin: -0.5rem 0 0 0;
    padding-left: 1.5rem;
}

.rules li {
    transition: color 0.25s;
}

.rules li.pass {
    color: var(--vp-c-tip-1);
}

.rules li.fail {
    color: var(--vp-c-danger-1);
}

.ability-row {
    display: flex;
    gap: 0.5rem;
    align-items: center;
}

.ability-row input:not(.wide) {
    width: 120px;
}

.ability-row .wide {
    flex: 2;
}

.btn-add,
.btn-rm {
    width: fit-content;
    border: 1px solid var(--vp-c-divider);
    border-radius: 8px;
    background: var(--vp-c-bg);
    color: var(--vp-c-text-1);
    cursor: pointer;
    font-size: 0.85rem;
    transition: border-color 0.25s;
}

.btn-add {
    padding: 0.35rem 1rem;
    margin-top: 0.25rem;
}

.btn-add:hover {
    border-color: var(--vp-c-brand-1);
    color: var(--vp-c-brand-1);
}

.btn-rm {
    width: 28px;
    height: 28px;
    padding: 0;
    flex: none;
    display: flex;
    align-items: center;
    justify-content: center;
}

.btn-rm:hover:not(:disabled) {
    border-color: var(--vp-c-danger-1);
    color: var(--vp-c-danger-1);
}

.btn-rm:disabled {
    opacity: 0.3;
    cursor: not-allowed;
}

pre {
    margin-top: 0.5rem;
    padding: 1rem;
    background: var(--vp-c-bg-soft);
    border-radius: 8px;
    overflow-x: auto;
}

code {
    font-size: 0.8rem;
}
</style>
