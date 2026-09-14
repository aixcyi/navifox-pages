<script setup lang="ts">
import { beforeLabel, isValid, parse } from '@navifox/utils/dnt';
import { useData } from 'vitepress';
import { computed } from 'vue';

/**
 * 解析 `yyyy-MM-dd HH:mm` 形式的日期时间文本。
 *
 * - 这个格式即各站 frontmatter 中 `createAt`／`updateAt` 的书写格式。
 *
 * @param text 日期时间文本，缺省或解析不出日期时返回 `undefined`。
 * @param format 解析格式，默认 `yyyy-MM-dd HH:mm`。
 */
function parseDate(text?: string, format = 'yyyy-MM-dd HH:mm'): Date | undefined {
    if (!text) return undefined;
    const value = parse(text, format, new Date(0));
    return isValid(value) ? value : undefined;
}

const $frontmatter = useData().frontmatter;

const filterLink = (param: string, value: string) => `/posts?${param}=${encodeURIComponent(value)}`;

const ageLabel = computed(() => {
    const matter = $frontmatter.value;
    return beforeLabel(parseDate(matter.updateAt) ?? parseDate(matter.createAt));
});
</script>

<template>
    <div class="AiDocAsideMeta">
        <div class="content" v-if="$frontmatter.excerpt">
            <div class="meta-title">简介</div>
            <div class="meta-excerpt vp-doc" v-html="$frontmatter.excerpt" />
        </div>
        <div class="content" v-if="$frontmatter.excerpt">
            <div class="meta-title">信息</div>
            <div class="meta-list">
                <div v-if="$frontmatter.createAt" class="meta-line">{{ $frontmatter.createAt }} 创作</div>
                <div v-if="$frontmatter.updateAt" class="meta-line">{{ $frontmatter.updateAt }} 修订</div>
                <div class="meta-line meta-tags">
                    <span class="meta-age">{{ ageLabel }}</span>
                    <a v-if="$frontmatter.domain" class="tag" :href="filterLink('domain', $frontmatter.domain)">
                        {{ $frontmatter.domain }}
                    </a>
                    <a v-if="$frontmatter.genre" class="tag" :href="filterLink('genre', $frontmatter.genre)">
                        {{ $frontmatter.genre }}
                    </a>
                    <a v-for="tag in $frontmatter.tags" :key="tag" class="tag" :href="filterLink('tag', tag)">
                        {{ tag }}
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.content {
    position: relative;
    border-left: 1px solid var(--vp-c-divider);
    margin-bottom: 16px;
    padding-left: 16px;
    font-size: 14px;
    font-weight: 500;
}

.meta-title {
    line-height: 32px;
    font-size: 14px;
    font-weight: 600;
}

.meta-excerpt {
    margin: 0 0 8px;
    line-height: 24px;
    text-indent: 2em;
    color: var(--vp-c-text-2);
}

.meta-list {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.meta-line {
    line-height: 24px;
    color: var(--vp-c-text-2);
}

.meta-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
}

.meta-age::before,
.tag::before {
    content: '#';
    margin-right: 2px;
    transition: color 0.25s;
    color: var(--vp-c-text-3);
    opacity: 0.5;
}

.tag {
    display: inline-block;
    color: var(--vp-c-text-2);
    text-decoration: none;
    transition: color 0.25s;
}

.tag:hover {
    color: var(--vp-c-brand-1);
}

.tag:hover::before {
    color: var(--vp-c-brand-3);
}
</style>
