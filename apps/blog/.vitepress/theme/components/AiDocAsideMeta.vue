<script setup lang="ts">
import { ref } from 'vue';
import { useData, onContentUpdated } from 'vitepress';
import { parse, differenceInDays } from 'date-fns';

const $frontmatter = useData().frontmatter;
const revisionAge = ref<number>(0); // days

onContentUpdated(() => {
    const matter = $frontmatter.value;
    const current = Date.now();
    const created = matter.createAt ? parse(matter.createAt, 'yyyy-MM-dd HH:mm', new Date()) : undefined;
    const updated = matter.updateAt ? parse(matter.updateAt, 'yyyy-MM-dd HH:mm', new Date()) : undefined;
    if (updated) {
        revisionAge.value = differenceInDays(current, updated);
    } else if (created) {
        revisionAge.value = differenceInDays(current, created);
    }
});
</script>

<template>
    <div class="AiDocAsideMeta" v-if="$frontmatter.createAt">
        <div class="content">
            <div class="meta-title">信息</div>
            <dl class="meta-list">
                <template v-if="$frontmatter.createAt">
                    <dt class="meta-label">创作时间</dt>
                    <dd class="meta-value">{{ $frontmatter.createAt }}</dd>
                </template>

                <template v-if="$frontmatter.createAt && $frontmatter.updateAt">
                    <dt class="meta-label">修订时间</dt>
                    <dd class="meta-value">{{ $frontmatter.updateAt }}</dd>
                </template>

                <template v-if="$frontmatter.createAt || $frontmatter.updateAt">
                    <dt class="meta-label">已逝年华</dt>
                    <dd class="meta-value">{{ revisionAge }} 天</dd>
                </template>

                <template v-if="$frontmatter.tags?.length">
                    <dt class="meta-label">关联标签</dt>
                    <dd class="meta-value vp-doc tags">
                        <span v-if="$frontmatter.domain">{{ $frontmatter.domain }}</span>
                        <span v-if="$frontmatter.category">{{ $frontmatter.category }}</span>
                        <span v-for="tag in $frontmatter.tags">{{ tag }}</span>
                    </dd>
                </template>
            </dl>
        </div>
        <div class="content">
            <div class="meta-title">简介</div>
            <dl class="meta-value vp-doc"><div v-html="$frontmatter.excerpt" /></dl>
        </div>
    </div>
</template>

<style scoped>
.content {
    position: relative;
    border-left: 1px solid var(--vp-c-divider);
    margin-bottom: 16px;
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
    font-size: 12px;
    font-weight: 500;
    line-height: 20px;
    transition: color 0.25s;
    color: var(--vp-c-text-2);
}

.tags span:hover {
    color: var(--vp-c-brand-1);
}

.tags span::before {
    content: '# ';
    transition: color 0.25s;
    color: var(--vp-c-text-3);
}

.tags span:hover::before {
    color: var(--vp-c-brand-3);
}
</style>
