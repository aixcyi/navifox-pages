import { pinyin } from '@napi-rs/pinyin';
import MarkdownIt from 'markdown-it';
import { createContentLoader } from 'vitepress';

const mdit = MarkdownIt();

export interface Post {
    url: string;
    title: string;
    tags: string[];
    category: string;
    excerpt: string;
    createAt: string;
    updateAt: string | null;
    isDraft: boolean;
}

export interface CatalogData {
    posts: Post[];
    categories: string[];
    tags: string[];
}

declare const data: CatalogData;
export { data };

const pattern = process.env.NODE_ENV === 'production' ? ['2*/*.md', '!2*/*.draft.md'] : '2*/*.md';

/**
 * 分类清单，同时决定筛选按钮的顺序。
 *
 * 图标绑定不在这里：本文件是 `createContentLoader` 的数据加载器，返回值会被序列化成客户端数据，
 * 组件塞不进来；名字到图标的映射写在 `Catalog.vue` 里。
 */
const categories = ['开发', '技术', '安全', '生活', '杂谈', '未归类'];

export default createContentLoader(pattern, {
    transform(rawData): CatalogData {
        const posts: Post[] = rawData
            .filter((page) => page.frontmatter.title && page.frontmatter.createAt)
            .sort(
                (a, b) =>
                    +new Date(b.frontmatter.updateAt ?? b.frontmatter.createAt) -
                    +new Date(a.frontmatter.updateAt ?? a.frontmatter.createAt),
            )
            .map((page) => ({
                url: page.url,
                title: page.frontmatter.title,
                category: page.frontmatter.category || '未归类',
                tags: page.frontmatter.tags || [],
                excerpt: page.frontmatter.excerpt ? mdit.renderInline(page.frontmatter.excerpt) : '',
                createAt: page.frontmatter.createAt,
                updateAt: page.frontmatter.updateAt ?? null,
                isDraft: page.url.includes('.draft.'),
            }));

        const tags = [...new Set(posts.flatMap((p) => p.tags))].sort((a, b) =>
            pinyin(a).join('').localeCompare(pinyin(b).join('')),
        );

        return { posts, categories, tags };
    },
});
