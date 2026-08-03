import type { Website } from '@navifox/types';

/**
 * 围绕 {@link Website} 结构的操作命名空间。
 */
export const website = {
    /**
     * 从 {@link Website} 结构中提取 _任意个_
     * {@link https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/meta `<meta />`}
     * 。
     *
     * @see https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/meta/name 标准元数据名称
     */
    *metas(
        site: Website,
        overrides?: {
            description?: string;
            author?: string;
            keywords?: string[];
        },
    ) {
        if (site.description || overrides?.description)
            yield { name: 'description', content: (overrides?.description ?? site.description)! };
        if (site.author || overrides?.author) yield { name: 'author', content: (overrides?.author ?? site.author)! };
        if (site.tags || overrides?.keywords)
            yield { name: 'keywords', content: (overrides?.keywords ?? site.tags)!.join(',') };
    },

    /**
     * 从 {@link Website} 结构中提取 _任意个_
     * {@link https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/link `<link />`}
     * 。
     */
    *links(site: Website) {
        if (site.icon && site.mime) yield { rel: 'icon', href: site.icon, type: site.mime };
        else if (site.icon) yield { rel: 'icon', href: site.icon };
    },

    /**
     * 从 {@link Website} 结构中提取 _任意个_
     * {@link https://ogp.me/ Open Graph Protocol}
     * `<meta property="og:*" />`。
     *
     * @see https://ogp.me/#metadata 基本元数据
     */
    *og(
        site: Website,
        overrides?: {
            title?: string;
            description?: string;
            url?: string;
            image?: string;
            type?: string;
        },
    ) {
        yield { property: 'og:type', content: overrides?.type ?? 'website' };
        yield { property: 'og:title', content: overrides?.title ?? site.name };
        const description = overrides?.description ?? site.description;
        if (description) yield { property: 'og:description', content: description };
        yield { property: 'og:url', content: overrides?.url ?? site.link };
        if (overrides?.image) yield { property: 'og:image', content: overrides.image };
        yield { property: 'og:site_name', content: site.name };
    },
} as const;
