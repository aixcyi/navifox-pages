import type { Component } from 'vue';
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

    /**
     * 包含
     * [MIME]{@link https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Guides/MIME_types}
     * 类型的站点图标。
     */
    icon?: { href: string, type: string }

    /** 站点图标。 */
    logo?: IconRepresentation

    /**
     * 站点描述。
     *
     * 列宽不足时每一行单独换行。 */
    desc?: string

    /** 站点关键词。 */
    tags?: string[]

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

/**
 * 项目经历。
 */
export interface Experience {

    /** 岗位／担任／职能。 */
    title: string

    /** 开始时间。 */
    start: { year: number, month: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 }

    /** 结束时间。 */
    stop?: { year: number, month: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 }

    /** 所在组织／团队／公司。 */
    team?: string

    /** 负责项目。 */
    project?: ProjectInfo

    /** 技能点。 */
    skills?: Badge[]

    /**
     * 自定义代码块
     *
     * 用于呈现经历细节。因为没办法细致约定字段，只能以组件的形式存储。
     * 组件建议存放在 `./src/components/experiences/`
     */
    detail?: Component
}
