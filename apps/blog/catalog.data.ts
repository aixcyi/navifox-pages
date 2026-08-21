import { pinyin } from '@napi-rs/pinyin';
import MarkdownIt from 'markdown-it';
import { createContentLoader } from 'vitepress';

const mdit = MarkdownIt();

export interface Post {
    url: string;
    title: string;
    tags: string[];
    domain: string;
    genre: string;
    excerpt: string;
    createAt: string;
    updateAt: string | null;
    isDraft: boolean;
}

export interface CatalogData {
    posts: Post[];
    domains: string[];
    genres: string[];
    tags: string[];
}

declare const data: CatalogData;
export { data };

const pattern = process.env.NODE_ENV === 'production' ? ['2*/*.md', '!2*/*.draft.md'] : '2*/*.md';

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
                domain: page.frontmatter.domain || '(未归类)',
                genre: page.frontmatter.genre || '(未归类)',
                tags: page.frontmatter.tags || [],
                excerpt: page.frontmatter.excerpt ? mdit.renderInline(page.frontmatter.excerpt) : '',
                createAt: page.frontmatter.createAt,
                updateAt: page.frontmatter.updateAt ?? null,
                isDraft: page.url.includes('.draft.'),
            }));

        const genres = [...new Set(posts.map((p) => p.genre))].sort((a, b) => a.localeCompare(b));
        const domains = [...new Set(posts.map((p) => p.domain))].sort((a, b) => a.localeCompare(b));
        const tags = [...new Set(posts.flatMap((p) => p.tags))].sort((a, b) =>
            pinyin(a).join('').localeCompare(pinyin(b).join('')),
        );

        return { posts, domains, genres, tags };
    },
});
