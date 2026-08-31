<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { useFocus } from '@vueuse/core';
import { useRoute } from 'vitepress';
import { computed, ref, watch } from 'vue';

import type { Post } from './catalog.data';
import { data } from './catalog.data';

const selectedCategory = ref<string | null>(null);
const selectedTags = ref<string[]>([]);
const draftFilter = ref<string | null>(null);
const searchQuery = ref('');
const searchInput = ref<HTMLInputElement | null>(null); // 搜索框是否聚焦：用于联动上下分隔线变色
const { focused: searchFocused } = useFocus(searchInput);
const { posts: pages, categories, tags: allTags, icons } = data;

const route = useRoute();
const applyQueryFilter = () => {
    const query = new URLSearchParams(route.query);
    const category = query.getAll('category').find((v) => categories.includes(v));
    const tags = query.getAll('tag').filter((v) => allTags.includes(v));
    if (category === undefined && tags.length === 0) {
        selectedCategory.value = null;
        selectedTags.value = [];
        searchQuery.value = '';
        return;
    }
    selectedCategory.value = category ?? null;
    selectedTags.value = tags;
    searchQuery.value = '';
};
const byCategory = (list: Post[], value: string | null) => (value ? list.filter((p) => p.category === value) : list);
const byDraft = (list: Post[], mode: string | null) =>
    mode === null ? list : list.filter((p) => (mode === '仅草稿') === p.isDraft);

const byTags = (list: Post[], values: string[]) =>
    values.length > 0 ? list.filter((p) => values.some((t) => p.tags.includes(t))) : list;

const countBy = (list: Post[], field: (p: Post) => string): Map<string, number> => {
    const count = new Map<string, number>();
    for (const p of list) {
        const key = field(p);
        count.set(key, (count.get(key) || 0) + 1);
    }
    return count;
};
const countAll = (list: Post[], field: (p: Post) => Iterable<string>): Map<string, number> => {
    const count = new Map<string, number>();
    for (const p of list) {
        for (const key of field(p)) {
            count.set(key, (count.get(key) || 0) + 1);
        }
    }
    return count;
};
const posts = computed<Post[]>(() => byDraft(pages, draftFilter.value));
const filteredPages = computed<Post[]>(() => {
    let result = byTags(byCategory(posts.value, selectedCategory.value), selectedTags.value);
    const q = searchQuery.value.trim().toLowerCase();
    if (q) {
        result = result.filter(
            (p) =>
                p.title.toLowerCase().includes(q) ||
                (p.excerpt && p.excerpt.toLowerCase().includes(q)) ||
                p.tags.some((t) => t.toLowerCase().includes(q)),
        );
    }
    return result;
});
const categoryCounts = computed(() => countBy(byTags(posts.value, selectedTags.value), (p) => p.category));
const tagCounts = computed(() => countAll(byCategory(posts.value, selectedCategory.value), (p) => p.tags));
const draftCounts = computed(() =>
    countBy(byCategory(byTags(pages, selectedTags.value), selectedCategory.value), (p) =>
        p.isDraft ? '仅草稿' : '非草稿',
    ),
);
const categoryIconOf = (name: string): string | undefined => icons.find((i) => i.name === name)?.icon;

// 过滤按钮状态 → URL 同步：让 URL 查询参数始终与当前筛选一致（可刷新、可分享、可后退恢复）。
// 与 applyQueryFilter（URL → 状态）互为反向；点击按钮不触发 route.query 更新，不会形成循环。
// 用 replaceState 避免筛选点击产生历史噪音；保留 history.state，防止 VitePress 的
// popstate 处理（e.state === null 时直接 return）在后退/前进时失效。
const syncUrl = () => {
    const params = new URLSearchParams();
    if (selectedCategory.value) params.set('category', selectedCategory.value);
    for (const tag of selectedTags.value) params.append('tag', tag);
    const search = params.toString();
    const target = search ? `${location.pathname}?${search}` : location.pathname;
    if (location.pathname + location.search !== target) {
        history.replaceState(history.state ?? {}, '', target);
    }
};

function selectCategory(category: string | null) {
    selectedCategory.value = selectedCategory.value === category ? null : category;
    syncUrl();
}

function toggleTag(tag: string) {
    const idx = selectedTags.value.indexOf(tag);
    if (idx >= 0) {
        selectedTags.value.splice(idx, 1);
    } else {
        selectedTags.value.push(tag);
    }
    syncUrl();
}

watch(() => route.query, applyQueryFilter, { immediate: true });

interface FilterRow {
    key: 'category' | 'tag' | 'draft';
    label: string;
    items: string[];
    counts: Map<string, number>;
    isActive: (item: string) => boolean;
    toggle: (item: string) => void;
    iconOf: (item: string) => string | undefined;
}

const filterRows = computed<FilterRow[]>(() => {
    const rows: FilterRow[] = [
        {
            key: 'category',
            label: '分类',
            items: categories,
            counts: categoryCounts.value,
            isActive: (item: string) => selectedCategory.value === item,
            toggle: (item: string) => selectCategory(item),
            iconOf: (item: string) => categoryIconOf(item),
        },
        {
            key: 'tag',
            label: '标签',
            items: allTags,
            counts: tagCounts.value,
            isActive: (item: string) => selectedTags.value.includes(item),
            toggle: (item: string) => toggleTag(item),
            iconOf: () => undefined,
        },
    ];
    if (import.meta.env.DEV) {
        rows.push({
            key: 'draft',
            label: '草稿',
            items: ['仅草稿', '非草稿'],
            counts: draftCounts.value,
            isActive: (item: string) => draftFilter.value === item,
            toggle: (item: string) => (draftFilter.value = draftFilter.value === item ? null : item),
            iconOf: () => undefined,
        });
    }
    return rows;
});
</script>

<template>
    <div class="catalog">
        <div class="filter-grid">
            <template v-for="row in filterRows" :key="row.key">
                <div class="filter-label">{{ row.label }}</div>
                <div :class="['filter-buttons', `filter-buttons-${row.key}`]">
                    <button
                        v-for="item in row.items"
                        :key="item"
                        :class="['filter-button', { active: row.isActive(item) }]"
                        :disabled="!row.isActive(item) && (row.counts.get(item) ?? 0) === 0"
                        @click="row.toggle(item)"
                    >
                        <Icon v-if="row.iconOf(item)" class="icon-lg" :icon="row.iconOf(item) ?? ''" />
                        {{ item }}
                        <span v-if="(row.counts.get(item) ?? 0) > 0" class="count">
                            {{ row.counts.get(item) ?? 0 }}
                        </span>
                    </button>
                </div>
            </template>
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
                ref="searchInput"
                v-model="searchQuery"
                type="text"
                role="searchbox"
                placeholder="搜索文章标题、摘要或标签……"
                class="search-input"
            />
        </div>

        <div :class="['divider', 'divider-after-search', { 'divider-focus': searchFocused }]"></div>

        <div class="results">
            <div v-if="filteredPages.length === 0" class="empty">没有找到匹配的文章</div>
            <template v-else>
                <a v-for="page in filteredPages" :key="page.url" :href="page.url" class="post-item">
                    <span class="post-category">
                        {{ page.category }}
                        <Icon class="icon-lg" :icon="categoryIconOf(page.category) ?? 'tabler:tag'" />
                    </span>
                    <span class="post-title">{{ page.title }}</span>
                    <span class="post-meta">
                        <span>
                            {{ page.updateAt ? page.updateAt.slice(0, 10) : page.createAt.slice(0, 10) }}
                        </span>
                        <span v-if="page.isDraft">草稿</span>
                    </span>
                    <span v-if="page.excerpt" class="post-excerpt" v-html="page.excerpt"></span>
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

.filter-buttons-category {
    --row-color: var(--vp-c-brand-1);
    --row-soft: var(--vp-c-brand-soft);
}

.filter-buttons-tag {
    --row-color: var(--filter-tag-color);
    --row-soft: var(--filter-tag-soft);
}

.filter-buttons-draft {
    --row-color: var(--vp-c-text-1);
    --row-soft: var(--vp-c-bg-soft);
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
    border-color: var(--row-color);
    color: var(--row-color);
    background: var(--row-soft);
}

.filter-button.active {
    border-color: var(--row-color);
    background: var(--row-soft);
    color: var(--row-color);
}

.filter-button:disabled {
    opacity: 0.4;
    cursor: not-allowed;
}

.filter-button:focus-visible {
    outline: 2px solid var(--vp-c-brand-1);
    outline-offset: 2px;
}

/* 分类行按钮：无边框、以 | 分隔的文本样式（图 分类 | 图 分类 | …） */
.filter-buttons-category .filter-button {
    border: none;
    border-radius: 0;
    background: none;
    padding: 0.2rem 0;
}

.filter-buttons-category .filter-button:hover:not(:disabled),
.filter-buttons-category .filter-button.active {
    background: none;
}

.filter-buttons-category .filter-button:not(:last-child)::after {
    content: '|';
    margin-left: 0.375rem;
    color: var(--vp-c-divider);
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

/* 搜索框聚焦时，分隔线淡入与渐变色一致（brand → #41d1ff） */
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

/* 覆盖 .vp-doc a:hover 的主题色，hover 时内部文字颜色保持不变 */
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
    transition: opacity 0.5s ease;
}

.post-item:hover::before {
    opacity: 1;
    transition-duration: 0.2s;
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

.post-category {
    display: inline-flex;
    align-items: center;
    gap: 3px;
    font-size: 0.875rem;
    opacity: 0.5;
    align-self: center;
    color: var(--post-category-color);
}

.icon-lg {
    font-size: 1.5em;
}

.post-excerpt {
    flex: 1 0 100%;
    opacity: 0.7;
}
</style>
