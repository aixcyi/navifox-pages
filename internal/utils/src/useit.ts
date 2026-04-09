import type { Website } from '@navifox/types';
import { reactive } from 'vue';

/**
 * 创建多个带工具函数的开关。
 *
 * - 开关取决于内部是否包含指定的值，所以可以用任意值（哪怕是 `null` 和 `undefined`）来触发开关。
 */
export function useToggles<T>(...initialValues: T[]): [ (v: T) => boolean, (v: T) => void, () => boolean ] {
    // @ts-ignore
    const states: Set<T> = reactive(new Set<T>(initialValues))

    const has = (value: T) => states.has(value)

    const toggle = (value: T) => {
        states.has(value) ? states.delete(value) : states.add(value)
    }

    const empty = () => states.size === 0

    return [
        has,
        toggle,
        empty,
    ]
}

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
