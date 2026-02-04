import type { Hyperlink, IconRepresentation } from './strings';

/**
 * 链接信息。
 */
export interface LinkInfo {

    /** 链接地址。 */
    link: Hyperlink

    /** 图标链接。 */
    icon?: IconRepresentation

    /** 展示文字。 */
    text?: string

    /** 其它附加信息。 */
    [key: string]: any
}

/**
 * 徽章。
 */
export interface Badge {

    /** 徽章图标。 */
    icon: IconRepresentation

    /** 跳转链接。 */
    link?: Hyperlink

    /** 渲染文本／回退文字／提示信息。 */
    text?: string
}

/**
 * 站点信息。
 */
export interface WebsiteInfo {

    /** 站点名称。 */
    name: string

    /** 站点首页链接。 */
    link: Hyperlink

    /** 站点图标。 */
    icon?: IconRepresentation

    /**
     * 站点描述。
     *
     * 列宽不足时每一行单独换行。 */
    desc?: string

    /** 其它附加信息。 */
    [key: string]: any
}

/**
 * 项目信息。
 */
export interface ProjectInfo {

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
     * 如果还需要图标，那么应当在“社交链接”中提供，这个字段是专门在不显示图标的情况下用的。
     */
    repository?: Hyperlink

    /** 项目文档。 */
    documentation?: Hyperlink

    /**
     * 类型图标。
     *
     * 这里的类型指的是成品的类型或其存在形式，比如说一个
     * npm 包、一个 Python 包，一个 VSCode 插件，等等。
     */
    typeIco?: IconRepresentation

    /** 社交链接。 */
    socials?: Badge[]
}
