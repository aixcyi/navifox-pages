<script setup lang="ts">
import { computed, ref } from 'vue';
import type { Post } from './catalog.data';
import { data } from './catalog.data';

const { posts, domains, categories, tags: allTags } = data;

// 筛选状态
const selectedDomain = ref<string | null>(null);
const selectedCategory = ref<string | null>(null);
const selectedTags = ref<string[]>([]);
const searchQuery = ref('');

function selectDomain(domain: string | null) {
    selectedDomain.value = selectedDomain.value === domain ? null : domain;
}

function selectCategory(cat: string | null) {
    selectedCategory.value = selectedCategory.value === cat ? null : cat;
}

function toggleTag(tag: string) {
    const idx = selectedTags.value.indexOf(tag);
    if (idx >= 0) {
        selectedTags.value.splice(idx, 1);
    } else {
        selectedTags.value.push(tag);
    }
}

// 筛选后的文章列表
const filteredPosts = computed<Post[]>(() => {
    let result: Post[] = posts;

    if (selectedDomain.value) {
        result = result.filter((p) => p.domain === selectedDomain.value);
    }

    if (selectedCategory.value) {
        result = result.filter((p) => p.category === selectedCategory.value);
    }

    if (selectedTags.value.length > 0) {
        result = result.filter((p) => selectedTags.value.every((t) => p.tags.includes(t)));
    }

    if (searchQuery.value.trim()) {
        const q = searchQuery.value.trim().toLowerCase();
        result = result.filter(
            (p) =>
                p.title.toLowerCase().includes(q) ||
                (p.excerpt && p.excerpt.toLowerCase().includes(q)) ||
                p.tags.some((t) => t.toLowerCase().includes(q)),
        );
    }

    return result;
});

// 统计当前筛选结果中各领域/分类/标签的数量
const domainCounts = computed(() => {
    let base: Post[] = posts;
    if (selectedCategory.value) base = base.filter((p) => p.category === selectedCategory.value);
    if (selectedTags.value.length > 0) base = base.filter((p) => selectedTags.value.every((t) => p.tags.includes(t)));
    const count = new Map<string, number>();
    for (const p of base) {
        count.set(p.domain, (count.get(p.domain) || 0) + 1);
    }
    return count;
});

const categoryCounts = computed(() => {
    let base: Post[] = posts;
    if (selectedDomain.value) base = base.filter((p) => p.domain === selectedDomain.value);
    if (selectedTags.value.length > 0) base = base.filter((p) => selectedTags.value.every((t) => p.tags.includes(t)));
    const count = new Map<string, number>();
    for (const p of base) {
        count.set(p.category, (count.get(p.category) || 0) + 1);
    }
    return count;
});

const tagCounts = computed(() => {
    let base: Post[] = posts;
    if (selectedDomain.value) base = base.filter((p) => p.domain === selectedDomain.value);
    if (selectedCategory.value) base = base.filter((p) => p.category === selectedCategory.value);
    const count = new Map<string, number>();
    for (const p of base) {
        for (const t of p.tags) {
            count.set(t, (count.get(t) || 0) + 1);
        }
    }
    return count;
});
</script>

<template>
    <div class="catalog">
        <div class="filter-grid">
            <!-- 领域 -->
            <div class="filter-label">领域</div>
            <div class="filter-buttons">
                <button :class="['select-button', { active: !selectedDomain }]" @click="selectDomain(null)">
                    全部<span class="count">{{ posts.length }}</span>
                </button>
                <button
                    v-for="d in domains"
                    :key="d"
                    :class="['select-button', { active: selectedDomain === d }]"
                    @click="selectDomain(d)"
                >
                    {{ d }}<span class="count">{{ domainCounts.get(d) ?? 0 }}</span>
                </button>
            </div>

            <!-- 分类 -->
            <div class="filter-label">分类</div>
            <div class="filter-buttons">
                <button :class="['select-button', { active: !selectedCategory }]" @click="selectCategory(null)">
                    全部<span class="count">{{ posts.length }}</span>
                </button>
                <button
                    v-for="c in categories"
                    :key="c"
                    :class="['select-button', { active: selectedCategory === c }]"
                    @click="selectCategory(c)"
                >
                    {{ c }}<span class="count">{{ categoryCounts.get(c) ?? 0 }}</span>
                </button>
            </div>

            <!-- 标签 -->
            <div class="filter-label">标签</div>
            <div class="filter-buttons">
                <button
                    v-for="tag in allTags"
                    :key="tag"
                    :class="['select-button', { active: selectedTags.includes(tag) }]"
                    @click="toggleTag(tag)"
                >
                    {{ tag }}<span class="count">{{ tagCounts.get(tag) ?? 0 }}</span>
                </button>
            </div>
        </div>

        <div class="divider"></div>

        <!-- 搜索 -->
        <div class="search-box">
            <svg
                class="search-icon"
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
            >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
            </svg>
            <input
                v-model="searchQuery"
                type="text"
                role="searchbox"
                placeholder="搜索文章标题、摘要或标签……"
                class="search-input"
            />
        </div>

        <div class="divider"></div>

        <!-- 文章列表 -->
        <div class="results">
            <div v-if="filteredPosts.length === 0" class="empty">没有找到匹配的文章</div>
            <template v-else>
                <div v-for="post in filteredPosts" :key="post.url" class="post-item">
                    <a :href="post.url" class="post-link">{{ post.title }}</a>
                    <span class="post-meta">
                        <span class="post-domain">{{ post.domain }}</span>
                        <span class="post-category">{{ post.category }}</span>
                        <span class="post-date">{{ post.createAt.slice(0, 10) }}</span>
                    </span>
                    <span v-if="post.excerpt" class="post-separator">-</span>
                    <span v-if="post.excerpt" class="post-excerpt">{{ post.excerpt }}</span>
                </div>
            </template>
        </div>
    </div>
</template>

<style scoped>
/* ========== 整体布局 ========== */
.catalog {
    margin-top: 2rem;
}

/* ========== 筛选网格 ========== */
.filter-grid {
    display: grid;
    grid-template-columns: 64px 1fr;
    gap: 0.5rem 0;
    align-items: start;
}

.filter-label {
    font-size: 0.875rem;
    opacity: 0.7;
    padding-top: 0.375rem;
    user-select: none;
}

.filter-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 0.375rem;
    margin-bottom: 0.5rem;
}

/* ========== 筛选按钮 ========== */
.select-button {
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    padding: 0.2rem 0.625rem;
    font-size: 0.8rem;
    line-height: 1.5;
    border: 1px solid var(--vp-c-divider);
    border-radius: 3px;
    background: transparent;
    color: var(--vp-c-text-1);
    cursor: pointer;
    transition: all 0.2s ease;
    white-space: nowrap;
    user-select: none;
    outline: none;
}

.select-button:hover {
    border-color: var(--vp-c-brand-1);
    color: var(--vp-c-brand-1);
    background: var(--vp-c-brand-soft);
}

.select-button.active {
    border-color: var(--vp-c-brand-1);
    background: var(--vp-c-brand-soft);
    color: var(--vp-c-brand-1);
}

.select-button.active .count {
    opacity: 0.7;
}

.select-button .count {
    font-size: 0.7rem;
    opacity: 0.5;
}

/* ========== 分割线 ========== */
.divider {
    height: 1px;
    background: var(--vp-c-divider);
    margin: 0.75rem 0;
}

/* ========== 搜索框 ========== */
.search-box {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.375rem 0.5rem;
}

.search-icon {
    opacity: 0.4;
    flex-shrink: 0;
    color: var(--vp-c-text-1);
}

.search-input {
    flex: 1;
    border: none;
    outline: none;
    background: transparent;
    color: var(--vp-c-text-1);
    font-size: 0.875rem;
    line-height: 1.5;
    padding: 0.125rem 0;
}

.search-input::placeholder {
    color: var(--vp-c-text-3);
}

/* ========== 文章列表 ========== */
.results {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    padding-top: 1.25rem;
}

.empty {
    text-align: center;
    color: var(--vp-c-text-3);
    padding: 2rem 0;
    font-size: 0.875rem;
}

.post-item {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    gap: 0.25rem 0.375rem;
    font-size: 0.875rem;
    line-height: 1.6;
}

.post-link {
    font-weight: 600;
    color: var(--vp-c-brand-1);
    text-decoration: none;
    white-space: nowrap;
}

.post-link:hover {
    text-decoration: underline;
}

.post-meta {
    display: inline-flex;
    align-items: center;
    gap: 0.375rem;
    font-size: 0.75rem;
    opacity: 0.5;
    white-space: nowrap;
}

.post-domain {
    border: 1px solid var(--vp-c-brand-1);
    border-radius: 9999px;
    padding: 0 0.375rem;
    font-size: 0.7rem;
    color: var(--vp-c-brand-1);
}

.post-category {
    border: 1px solid var(--vp-c-divider);
    border-radius: 9999px;
    padding: 0 0.375rem;
    font-size: 0.7rem;
}

.post-separator {
    opacity: 0.4;
    flex-shrink: 0;
}

.post-excerpt {
    opacity: 0.7;
    flex: 1;
    min-width: 0;
}
</style>
