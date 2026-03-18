import type { Website } from '@navifox/types';

/**
 * 从 {@link Website} 结构中提取 _任意个_
 * {@link https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/meta `<meta />`}
 * 。
 *
 * @see https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/meta/name 标准元数据名称
 */
export function* useWebsiteMetas(
    site: Website,
    overrides?: {
        description?: string,
        author?: string,
        keywords?: string[],
    },
) {
    if (site.description || overrides?.description)
        yield { name: 'description', content: (overrides?.description ?? site.description)! }
    if (site.author || overrides?.author)
        yield { name: 'author', content: (overrides?.author ?? site.author)! }
    if (site.tags || overrides?.keywords)
        yield { name: 'keywords', content: (overrides?.keywords ?? site.tags)!.join(',') }
}

/**
 * 从 {@link Website} 结构中提取 _任意个_
 * {@link https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/link `<link />`}
 * 。
 */
export function* useWebsiteLinks(site: Website) {
    if (site.icon && site.mime)
        yield { rel: 'icon', href: site.icon, type: site.mime }
    if (site.icon)
        yield { rel: 'icon', href: site.icon }
}
