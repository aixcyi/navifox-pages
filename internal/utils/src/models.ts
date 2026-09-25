import type { Website } from '@navifox/types';

import { markit } from './markdown';

/**
 * 围绕 {@link Website} 结构的操作命名空间。
 */
export const website = {
    /**
     * 计算 {@link Website} 的站点描述。
     *
     * 优先级依次为 {@link Website.descriptionHtml}、编译为 HTML 的
     * {@link Website.descriptionRich}、{@link Website.descriptionPure}，
     * 三者皆缺省时为 `undefined`。
     *
     * - 返回值的形态不固定：只有 {@link Website.descriptionPure} 时是不含标记语言的纯文本，
     *   其余情况是可供 `v-html` 渲染的 HTML。
     * - 只接受纯文本的场景（如 `@navifox/utils/vite` 的 `ogPlugin`）应当直接取
     *   {@link Website.descriptionPure} 而不是本计算属性。
     */
    description(site: Website | undefined): string | undefined {
        if (!site) return undefined;
        if (site.descriptionHtml) return site.descriptionHtml;
        if (site.descriptionRich) return markit(site.descriptionRich);
        return site.descriptionPure;
    },

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
        const description = overrides?.description ?? site.descriptionPure ?? website.description(site);
        if (description) yield { name: 'description', content: description };
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
        yield { property: 'og:title', content: overrides?.title ?? site.text };
        const description = overrides?.description ?? site.descriptionPure ?? website.description(site);
        if (description) yield { property: 'og:description', content: description };
        yield { property: 'og:url', content: overrides?.url ?? site.link };
        if (overrides?.image) yield { property: 'og:image', content: overrides.image };
        yield { property: 'og:site_name', content: site.text };
    },
} as const;
