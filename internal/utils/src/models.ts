import type { Website } from '@navifox/types';

/**
 * 从 {@link Website} 结构中提取 _任意个_
 * {@link https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/meta `<meta />`}
 * 。
 *
 * @see https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/meta/name 标准元数据名称
 */
export function* useWebsiteMetas(site: Website) {
    if (site.description)
        yield { name: 'description', content: site.description }
    if (site.author)
        yield { name: 'author', content: site.author }
    if (site.tags)
        yield { name: 'keywords', content: site.tags.join(',') }
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
