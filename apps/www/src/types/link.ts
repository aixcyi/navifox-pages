/**
 * 链接信息。
 */
export interface Hyperlink {

    /** 链接地址。 */
    link: string

    /** 图标链接。 */
    icon?: string

    /** 展示文字。 */
    text?: string

    /** 其它附加信息。 */
    [key: string]: any
}

/**
 * 站点信息。
 */
export interface Website {

    /** 站点名称。 */
    name: string

    /** 站点首页链接。 */
    link: string

    /** 站点图标地址。 */
    icon?: string

    /** 站点描述。
     *
     * 列宽不足时每一行单独换行。 */
    desc?: string

    /** 其它附加信息。 */
    [key: string]: any
}
