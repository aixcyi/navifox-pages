/**
 * 友情链接。
 */
export interface Friend {
    /** 昵称。 */
    name: string
    /** 链接。 */
    link?: string
    /** 头像图片地址。 */
    avatar?: string
    /** 常用用户名。 */
    uid?: string
    /** 站点名称。 */
    title?: string
    /** 站点描述／自我介绍／寄语／个性签名。 */
    description?: string
    /** 附加渲染样式。Tailwind CSS 类名。 */
    styles?: { avatar: string[] }
    /** 所在地址。 */
    location?: string
    /** 职位、头衔…… */
    titles?: string[]
    /** 社交链接。 */
    socials?: { [brand: string]: string }
    /** 是否隐藏或不可用。 */
    disabled?: boolean
    /** 年龄／网龄／圈龄。 */
    age?: number
    /** 附加标签。 */
    tags?: string[]

    /** 附加信息。 */
    [key: string]: any
}
