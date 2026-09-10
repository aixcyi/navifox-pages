/**
 * 徽章。
 */
export interface Badge {
    /** 图标名称（尤指图标库的 `id`）。 */
    logo: string;

    /** 渲染文本／回退文字／提示信息。 */
    text?: string;

    /** 跳转链接。 */
    link?: string;
}

/**
 * 网站图标。
 */
export interface Favicon {
    /** 图标链接（`https://` 或 `/` 开头的 URI 地址）。 */
    icon?: string;

    /** 图标名称（尤指图标库的 `id`）。 */
    logo?: string;
}

/**
 * 超链接。
 */
export interface Hyperlink extends Favicon {
    /** 展示文字。`null` 表示用作隔断。 */
    text: string | null;

    /** 链接地址。 */
    link: string;

    icon?: string;

    logo?: string;

    /**
     * HTML 元素 `id`。
     *
     * @see https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Global_attributes/id 全局属性 `id`
     */
    elementId?: string;
}

/**
 * 站点信息。
 */
export interface Website extends Favicon {
    /** 站点名称。 */
    name: string;

    /** 首页链接。 */
    link: string;

    /**
     * 图标的
     * [MIME]{@link https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Guides/MIME_types}
     * 类型。
     */
    mime?: string;

    icon?: string;

    logo?: string;

    /**
     * 标语。
     *
     * 简洁有力、代表品牌理念的宣传口号，一般不以句号结尾。
     */
    slogan?: string;

    /**
     * 站点描述。
     *
     * 纯文本，不应包含 Markdown 或 HTML 等等。
     */
    description?: string;

    /** 站点描述（HTML格式）。*/
    descriptionRich?: string;

    /** 设置／偏好页。 */
    settingsUrl?: string;

    /** 登录页。 */
    loginUrl?: string;

    /** 管理后台。 */
    adminUrl?: string;

    /** 站点作者。 */
    author?: string;

    /** 站点关键词。 */
    tags?: string[];

    /** 展示方的备注。 */
    note?: string;
}

/**
 * 友链信息。
 */
export interface Friend extends Website {
    /**
     * 昵称。
     *
     * - 此字段不再是父类 {@link Website} 的“站点名称”，而是友人的昵称。
     */
    name: string;
    link: string;
    icon?: string;
    mime?: string;
    logo?: string;

    /**
     * 站点名称。
     *
     * - 用于承接父类 {@link Website} 的 `name` 字段。
     * - 友链允许没有站点名称。
     */
    title?: string;

    /**
     * 头像图片地址。
     *
     * - 建议用 64x64 的尺寸，在数据大小和图像尺寸之间是一个平衡点。
     */
    avatar?: string;

    /**
     * 头像图片地址。
     *
     * - 宽和高都必须是 256 像素或以上。
     * - 用于应对需要高分辨率但又需要尽量减少数据大小的场景。
     */
    avatar256?: string;

    /**
     * 头像图片地址。
     *
     * - 宽和高都必须是 512 像素或以上。
     * - 极致的高分辨率，不考虑数据大小。
     */
    avatar512?: string;

    /** 职位、头衔…… */
    titles?: string[];

    /** 个性签名。 */
    status?: string;

    slogan?: string;
    description?: string;
    descriptionRich?: string;
    settingsUrl?: string;
    loginUrl?: string;
    adminUrl?: string;
    author?: string;
    tags?: string[];
    note?: string;

    /** 社交链接。 */
    socials?: { [brand: string]: string };

    /**
     * 相遇时间。
     *
     * - 构造时注意 `Date` 的月份从 `0` 开始。
     */
    meet?: Date;

    /**
     * 附加渲染样式。
     *
     * - 统一采用 Tailwind CSS v4 类名。
     * - 数组的每个元素允许是单个类名，也允许是含空格的多个类名，调用方必须兼顾两种情况。
     */
    styles?: { avatar?: string[] };
}

/**
 * 项目信息。
 */
export interface Project {
    /** 项目名称。 */
    name: string;

    /**
     * 项目简介。
     *
     * 渲染时不考虑支持多行文本。
     */
    description: string;

    /**
     * 源代码仓库。
     *
     * 如果还需要图标，那么应当在“社交链接”中提供，这个字段是专门在 **不显示图标** 的情况下用的。
     */
    repository?: string;

    /** 项目文档。 */
    documentation?: string;

    /**
     * 发行类型。
     *
     * - 比如说一个 npm 包、一个 Python 包、一个 VSCode 插件等等。
     * - 必须是一个图标名称（尤指图标库的 `id`）而不能是一条链接。
     */
    releaseType?: string;

    /** 社交链接。 */
    socials?: Badge[];

    /** 技术栈。 */
    stack?: Badge[];
}

/**
 * 书签组所属的生态分类（refs 首页以 Tab 形式呈现）。
 */
export type BookmarkCategory = 'python' | 'node' | 'java' | 'more';

/**
 * 书签组。
 */
export interface BookmarkGroup {
    /** 标题（带链接）。 */
    title?: Hyperlink;

    /** 所属生态分类（refs 首页 Tab）。 */
    category?: BookmarkCategory;

    /** 组内书签。 */
    items: Website[];
}

/**
 * 滚动目标：
 * - `string`：页面元素 id，点击后滚动到该元素，URL fragment 形如 `/#intro`；
 * - `number`：距页面顶部的像素数（目前无对应场景，仅以字面量 `0` 表示顶部）。
 *
 * 两种形态都能描述“滚动到哪里”，功能等价，故共用同一字段 {@link Anchor.id}。
 */
export type AnchorTarget = string | number;

/**
 * 页内区块（首页、友链页）的锚点信息，供区块标题、URL fragment 直达等使用。
 */
export interface Anchor {
    /** 滚动目标（见 {@link AnchorTarget}）。 */
    id: AnchorTarget;

    /** 区块标题。 */
    title: string;

    /** 眉题（标题上方的英文小标题），如 `Intro · Experience`。 */
    eyebrow?: string;

    /** 区块介绍（标题下方的说明文字）。 */
    description?: string;

    /** 区块附带的网站列表（友链页卡片使用）。 */
    websites?: Website[];
}
