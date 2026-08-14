<script setup lang="ts">
import { computed, ref } from 'vue';
import type { Post } from './catalog.data';
import { data } from './catalog.data';

const { posts, domains, categories, tags: allTags } = data;

const selectedDomain = ref<string | null>(null);
const selectedCategory = ref<string | null>(null);
const selectedTags = ref<string[]>([]);
const searchQuery = ref('');
const searchFocused = ref(false); // 搜索框是否聚焦：用于联动上下分隔线变色

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
            <div class="filter-label">领域</div>
            <div class="filter-buttons">
                <button
                    v-for="d in domains"
                    :key="d"
                    :class="['filter-button', { active: selectedDomain === d }]"
                    :disabled="selectedDomain !== d && (domainCounts.get(d) ?? 0) === 0"
                    @click="selectDomain(d)"
                >
                    {{ d }}<span class="count">{{ domainCounts.get(d) ?? 0 }}</span>
                </button>
            </div>

            <div class="filter-label">类型</div>
            <div class="filter-buttons">
                <button
                    v-for="c in categories"
                    :key="c"
                    :class="['filter-button', { active: selectedCategory === c }]"
                    :disabled="selectedCategory !== c && (categoryCounts.get(c) ?? 0) === 0"
                    @click="selectCategory(c)"
                >
                    {{ c }}<span class="count">{{ categoryCounts.get(c) ?? 0 }}</span>
                </button>
            </div>

            <div class="filter-label">标签</div>
            <div class="filter-buttons">
                <button
                    v-for="tag in allTags"
                    :key="tag"
                    :class="['filter-button', { active: selectedTags.includes(tag) }]"
                    :disabled="!selectedTags.includes(tag) && (tagCounts.get(tag) ?? 0) === 0"
                    @click="toggleTag(tag)"
                >
                    {{ tag }}<span class="count">{{ tagCounts.get(tag) ?? 0 }}</span>
                </button>
            </div>
        </div>

        <div :class="['divider', 'divider-before-search', { 'divider-focus': searchFocused }]"></div>

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
                @focus="searchFocused = true"
                @blur="searchFocused = false"
            />
        </div>

        <div :class="['divider', 'divider-after-search', { 'divider-focus': searchFocused }]"></div>

        <div class="results">
            <div v-if="filteredPosts.length === 0" class="empty">没有找到匹配的文章</div>
            <template v-else>
                <a v-for="post in filteredPosts" :key="post.url" :href="post.url" class="post-item">
                    <span class="post-title">{{ post.title }}</span>
                    <span class="post-meta">
                        <span class="post-domain">{{ post.domain }}</span>
                        <span class="post-category">{{ post.category }}</span>
                        <span class="post-date">{{ post.createAt.slice(0, 10) }}</span>
                    </span>
                    <span v-if="post.excerpt" class="post-excerpt" v-html="post.excerpt"></span>
                </a>
            </template>
        </div>
    </div>
</template>

<style scoped>
.catalog {
    margin-top: 2rem;
}

.filter-grid {
    display: grid;
    grid-template-columns: 64px 1fr;
    /* 行间距统一由 gap 控制（原 margin-bottom 已并入） */
    gap: 1rem 0;
    align-items: start;
}

.filter-label {
    font-size: 0.875rem;
    /* 行高与单个按钮的盒高一致（1.5×0.8rem 行高 + 2×0.2rem 内边距 + 2×1px 边框），使标签文字与按钮文字垂直对齐 */
    line-height: calc(1.6rem + 2px);
    opacity: 0.7;
    user-select: none;
}

.filter-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 0.375rem;
}

.filter-button {
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
    transition:
        color 0.2s ease,
        border-color 0.2s ease,
        background-color 0.2s ease,
        opacity 0.2s ease;
    white-space: nowrap;
    user-select: none;
}

.filter-button:hover:not(:disabled) {
    border-color: var(--vp-c-brand-1);
    color: var(--vp-c-brand-1);
    background: var(--vp-c-brand-soft);
}

.filter-button.active {
    border-color: var(--vp-c-brand-1);
    background: var(--vp-c-brand-soft);
    color: var(--vp-c-brand-1);
}

.filter-button:disabled {
    opacity: 0.4;
    cursor: not-allowed;
}

.filter-button:focus-visible {
    outline: 2px solid var(--vp-c-brand-1);
    outline-offset: 2px;
}

.filter-button.active .count {
    opacity: 0.7;
}

.filter-button .count {
    font-size: 0.7rem;
    opacity: 0.5;
}

.divider {
    position: relative;
    height: 1px;
    background: var(--vp-c-divider);
    /* 搜索框两侧的内层边距维持原值 */
    margin: 0.75rem 0;
}

/* 搜索框整体上边距：翻倍 + 额外补偿一个 post-item 的 padding-top（0.625rem），
   使首个 post-item 未激活（无渐变边框线）时的上下视觉更平衡 */
.divider-before-search {
    margin-top: calc(1.5rem + 0.625rem);
}

/* 搜索框整体下边距：翻倍 */
.divider-after-search {
    margin-bottom: 1.5rem;
}

/* 搜索框聚焦时，分隔线淡入与站点品牌一致的渐变（brand → #41d1ff） */
.divider::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, var(--vp-c-brand-1) 30%, #41d1ff);
    opacity: 0;
    transition: opacity 0.25s ease;
}

.divider-focus::after {
    opacity: 1;
}

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
    background: transparent;
    color: var(--vp-c-text-1);
    font-size: 0.875rem;
    line-height: 1.5;
    padding: 0.125rem 0;
}

.search-input::placeholder {
    color: var(--vp-c-text-3);
}

.results {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
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
    padding: 0.625rem 0.75rem;
    font-size: 0.875rem;
    line-height: 1.6;
    position: relative;
    /* 建立独立层叠上下文，让 ::before 的 z-index: -1 只沉到本元素内容之下 */
    isolation: isolate;
    color: inherit;
    text-decoration: none;
    /* 抵消 .vp-doc a 的样式泄漏：字重与过渡 */
    font-weight: 400;
    transition: none;
    border: 1px solid transparent;
    border-radius: 5px;
}

/* 覆盖 .vp-doc a:hover 的品牌色，hover 时内部文字颜色保持不变 */
.post-item:hover {
    color: inherit;
}

/* 单线渐变边框：颜色与标题渐变相同（brand 30% → #41d1ff），方向相反（300deg），hover 时淡入。
   采用 padding-box/border-box 双层背景绘制边框环（业界通用的渐变边框画法），
   避免 mask 合成在分数倍 DPI 缩放下出现边缘粗细不均 */
.post-item::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: -1;
    border: 1px solid transparent;
    border-radius: inherit;
    background:
        linear-gradient(var(--vp-c-bg), var(--vp-c-bg)) padding-box,
        linear-gradient(300deg, var(--vp-c-brand-1) 30%, #41d1ff) border-box;
    opacity: 0;
    transition: opacity 0.35s ease;
}

.post-item:hover::before {
    opacity: 1;
    transition-duration: 0.25s;
}

.post-title {
    font-weight: 600;
    background: var(--vp-home-hero-name-background);
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
    white-space: nowrap;
}

.post-meta {
    display: inline-flex;
    align-items: center;
    gap: 0.375rem;
    font-size: 0.75rem;
    opacity: 0.5;
    white-space: nowrap;
}

.post-domain,
.post-category {
    border-radius: 3px;
    padding: 0 0.375rem;
    font-size: 0.7rem;
}

.post-domain {
    border: 1px solid var(--vp-c-brand-1);
    color: var(--vp-c-brand-1);
}

.post-category {
    border: 1px solid var(--vp-c-divider);
}

.post-excerpt {
    flex: 1 0 100%;
    opacity: 0.7;
}
</style>
