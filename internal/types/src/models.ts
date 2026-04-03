/**
 * 徽章。
 */
export interface Badge {

    /** 图标名称（尤指图标库的 `id`）。 */
    logo: string

    /** 渲染文本／回退文字／提示信息。 */
    text?: string

    /** 跳转链接。 */
    link?: string
}

/**
 * 网站图标。
 */
export interface Favicon {

    /** 图标链接（`https://` 或 `/` 开头的 URI 地址）。 */
    icon?: string

    /** 图标名称（尤指图标库的 `id`）。 */
    logo?: string
}

/**
 * 超链接。
 */
export interface Hyperlink extends Favicon {

    /** 展示文字。`null` 表示用作隔断。 */
    text: string | null

    /** 链接地址。 */
    link: string

    icon?: string

    logo?: string

    /**
     * HTML 元素 `id`。
     *
     * @see https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Global_attributes/id 全局属性 `id`
     */
    elementId?: string
}

/**
 * 站点。
 */
export interface Website extends Favicon {

    /** 站点名称。 */
    name: string

    /** 首页链接。 */
    link: string

    icon?: string

    /**
     * 图标的
     * [MIME]{@link https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Guides/MIME_types}
     * 类型。
     */
    mime?: string

    logo?: string

    /** 站点描述。 */
    description?: string

    /** 站点作者。 */
    author?: string

    /** 站点关键词。 */
    tags?: string[]

    /** 展示方的备注。 */
    note?: string

    /** 其它附加信息。 */
    [key: string]: any
}

/**
 * 项目信息。
 */
export interface Project {

    /** 项目名称。 */
    name: string

    /**
     * 项目简介。
     *
     * 渲染时不考虑支持多行文本。
     */
    description: string

    /**
     * 源代码仓库。
     *
     * 如果还需要图标，那么应当在“社交链接”中提供，这个字段是专门在 **不显示图标** 的情况下用的。
     */
    repository?: string

    /** 项目文档。 */
    documentation?: string

    /**
     * 发行类型。
     *
     * - 比如说一个 npm 包、一个 Python 包、一个 VSCode 插件等等。
     * - 必须是一个图标名称（尤指图标库的 `id`）而不能是一条链接。
     */
    releaseType?: string

    /** 社交链接。 */
    socials?: Badge[]

    /** 技术栈。 */
    stack?: Badge[]
}

/**
 * 书签组。
 */
export interface BookmarkGroup {

    /** 标题（带链接）。 */
    title?: Hyperlink

    /** 组内书签。 */
    items: Website[]
}
