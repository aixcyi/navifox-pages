<script setup lang="ts">
import { computed } from 'vue';
import { useData } from 'vitepress';
import { parse, differenceInDays } from 'date-fns';

const $frontmatter = useData().frontmatter;

const ageLabel = computed(() => {
    const matter = $frontmatter.value;
    const created = matter.createAt ? parse(matter.createAt, 'yyyy-MM-dd HH:mm', new Date()) : undefined;
    const updated = matter.updateAt ? parse(matter.updateAt, 'yyyy-MM-dd HH:mm', new Date()) : undefined;
    const base = updated ?? created;
    if (!base) return '';
    const now = new Date();
    const days = differenceInDays(now, base);
    if (days <= 0) return '今天';
    if (days === 1) return '昨天';
    if (days === 2) return '前天';
    if (
        base.getFullYear() !== now.getFullYear() &&
        base.getMonth() === now.getMonth() &&
        base.getDate() === now.getDate()
    ) {
        return '当年今日';
    }
    return `${days} 天前`;
});
</script>

<template>
    <div class="AiDocAsideMeta" v-if="$frontmatter.createAt">
        <div class="content" v-if="$frontmatter.excerpt">
            <div class="meta-title">简介</div>
            <div class="meta-excerpt vp-doc" v-html="$frontmatter.excerpt" />
        </div>
        <div class="content">
            <div class="meta-title">信息</div>
            <div class="meta-list">
                <div v-if="$frontmatter.createAt" class="meta-line">{{ $frontmatter.createAt }} 创作</div>
                <div v-if="$frontmatter.updateAt" class="meta-line">{{ $frontmatter.updateAt }} 修订</div>
                <div class="meta-line meta-tags">
                    <span class="meta-age">{{ ageLabel }}</span>
                    <span v-if="$frontmatter.domain" class="tag">{{ $frontmatter.domain }}</span>
                    <span v-if="$frontmatter.genre" class="tag">{{ $frontmatter.genre }}</span>
                    <span v-for="tag in $frontmatter.tags" :key="tag" class="tag">{{ tag }}</span>
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
    transition: color 0.25s;
}

.tag:hover {
    color: var(--vp-c-brand-1);
}

.tag:hover::before {
    color: var(--vp-c-brand-3);
}
</style>
