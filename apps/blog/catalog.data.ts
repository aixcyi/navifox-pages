import { countBy } from 'es-toolkit';
import { createContentLoader } from 'vitepress';

export interface Post {
    url: string;
    title: string;
    tags: string[];
    domain: string;
    category: string;
    excerpt: string;
    createAt: string;
    updateAt: string | null;
}

export interface CatalogData {
    posts: Post[];
    domains: string[];
    categories: string[];
    tags: string[];
}

declare const data: CatalogData;
export { data };

export default createContentLoader('2*/*.md', {
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
                category: page.frontmatter.category || '(未归类)',
                tags: page.frontmatter.tags || [],
                excerpt: page.frontmatter.excerpt || '',
                createAt: page.frontmatter.createAt,
                updateAt: page.frontmatter.updateAt ?? null,
            }));

        const categories = [...new Set(posts.map((p) => p.category))].sort();
        const domains = [...new Set(posts.map((p) => p.domain))].sort();
        const tags = Object
            .entries(countBy(posts.flatMap((p) => p.tags), (t) => t))
            .sort((a, b) => b[1] - a[1])
            .map(([tag]) => tag);

        return { posts, domains, categories, tags };
    },
});
