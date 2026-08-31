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
    icons: { name: string; icon: string }[];
}

declare const data: CatalogData;
export { data };

const pattern = process.env.NODE_ENV === 'production' ? ['2*/*.md', '!2*/*.draft.md'] : '2*/*.md';
const icons = [
    { name: '开发', icon: 'tabler:code' },
    { name: '技术', icon: 'tabler:mouse' },
    { name: '安全', icon: 'tabler:bug' },
    { name: '生活', icon: 'tabler:leaf' },
    { name: '杂谈', icon: 'tabler:message' },
    { name: '未分类', icon: 'tabler:circle-dashed' },
];

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
                category: page.frontmatter.category || '(未归类)',
                tags: page.frontmatter.tags || [],
                excerpt: page.frontmatter.excerpt ? mdit.renderInline(page.frontmatter.excerpt) : '',
                createAt: page.frontmatter.createAt,
                updateAt: page.frontmatter.updateAt ?? null,
                isDraft: page.url.includes('.draft.'),
            }));

        const categories = icons.map((icon) => icon.name);
        const tags = [...new Set(posts.flatMap((p) => p.tags))].sort((a, b) =>
            pinyin(a).join('').localeCompare(pinyin(b).join('')),
        );

        return { posts, categories, tags, icons };
    },
});
