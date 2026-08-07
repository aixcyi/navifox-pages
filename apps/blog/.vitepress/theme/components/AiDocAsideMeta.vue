<script setup lang="ts">
import { computed } from 'vue';
import { useData } from 'vitepress';
import { tighnari, navifoxHome } from '@navifox/constants/website';

const { frontmatter } = useData();

function parseDate(key: string): string | null {
    const raw = frontmatter.value[key];
    if (!raw) return null;
    const date = new Date(raw);
    if (Number.isNaN(date.getTime())) return null;
    return date.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        weekday: 'long',
    });
}

function parseAuthor(key: string): { name: string; link?: string } {
    const raw = frontmatter.value[key];
    if (!raw) return { name: tighnari.name, link: navifoxHome.link };
    const match = raw.match(/^(.+?)\s*<(.+@.+)>$/);
    if (match) {
        return { name: match[1]!.trim(), link: `mailto:${match[2]!.trim()}` };
    }
    if (raw.includes('@')) {
        return { name: raw.trim(), link: `mailto:${raw.trim()}` };
    }
    return { name: raw.trim() };
}

const createAt = computed(() => parseDate('createAt'));
const updateAt = computed(() => parseDate('updateAt'));
const author = computed(() => parseAuthor('author')); // FUTURE: author 还是 authors？还是都兼容？
const tags = computed(() => frontmatter.value.tags ?? []);
</script>

<template>
    <div class="AiDocAsideMeta">
        <div class="content">
            <div class="meta-title">信息</div>
            <dl class="meta-list">
                <template v-if="createAt">
                    <dt class="meta-label">创作时间</dt>
                    <dd class="meta-value">{{ createAt }}</dd>
                </template>

                <template v-if="createAt && updateAt">
                    <dt class="meta-label">修订时间</dt>
                    <dd class="meta-value">{{ updateAt }}</dd>
                </template>

                <template v-if="author.name">
                    <dt class="meta-label">文章作者</dt>
                    <dd class="meta-value vp-doc">
                        <a :href="author.link" target="_blank" rel="noopener noreferrer">{{ author.name }}</a>
                    </dd>
                </template>

                <template v-if="tags">
                    <dt class="meta-label">文章标签</dt>
                    <dd class="meta-value vp-doc tags">
                        <span v-for="tag in tags">{{ tag }}</span>
                    </dd>
                </template>
            </dl>
        </div>
    </div>
</template>

<style scoped>
.AiDocAsideMeta {
    margin-bottom: 16px;
}

.content {
    position: relative;
    border-left: 1px solid var(--vp-c-divider);
    padding-left: 16px;
    font-size: 13px;
    font-weight: 500;
}

.meta-title {
    line-height: 32px;
    font-size: 14px;
    font-weight: 600;
}

.meta-list {
    margin: 0;
}

.meta-label {
    margin-top: 4px;
    font-size: 11px;
    font-weight: 500;
    color: var(--vp-c-text-3);
    line-height: 20px;
}

.meta-label + .meta-label {
    margin-top: 8px;
}

.meta-value {
    margin: 0 0 8px 0;
    font-size: 12px;
    font-weight: 500;
    color: var(--vp-c-text-2);
    line-height: 20px;
}

.tags {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
}

.tags span {
    display: inline-block;
    padding: 2px 8px;
    font-size: 11px;
    font-weight: 500;
    line-height: 18px;
    color: var(--vp-c-text-3);
    background-color: transparent;
    border: 1px solid var(--vp-c-divider);
    border-radius: 3px;
    transition:
        color 0.25s,
        border-color 0.25s;
}

.tags span:hover {
    color: var(--vp-c-brand-1);
    border-color: var(--vp-c-brand-2);
}
</style>
