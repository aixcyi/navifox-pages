/**
 * 链接（基类）。
 */
export interface Hyperlink {
    /** 展示文字。 */
    text?: string;

    /**
     * 链接地址。
     *
     * - 可以是以 `https://`、`http://` 等开头的绝对地址，也可以是以 `/` 开头的相对路径。
     */
    link?: string;

    /** 图标编号（尤指各类图标库用于标识定位的字符串）。 */
    logo?: string;

    /** 图标链接（`https://` 或 `/` 开头的 URI 地址）。 */
    icon?: string;

    /**
     * 图标链接的
     * [MIME]{@link https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Guides/MIME_types}
     * 类型（专指 {@link icon} 字段）。
     */
    mime?: string;

    /**
     * 锚点标识符。
     *
     * - 不以 `#` 开头。
     * - 一般用于 HTML 元素 `id` 属性。
     *
     * @see https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Global_attributes/id MDN - 全局属性 `id`
     */
    anchor?: string;
}

/**
 * 徽章。
 *
 * {@link Hyperlink} 变种，必须指定 {@link logo} 字段。
 */
export interface Badge extends Hyperlink {
    text?: string;

    /**
     * 点击徽章后跳转的链接。
     *
     * - 可以是以 `https://`、`http://` 等开头的绝对地址，也可以是以 `/` 开头的相对路径。
     */
    link?: string;

    logo: string;
    icon?: undefined;
    mime?: undefined;

    anchor?: string;
}

/**
 * 文字链接。
 *
 * {@link Hyperlink} 变种，必须指定 {@link text} 和 {@link link} 字段。
 */
export interface TextLink extends Hyperlink {
    text: string;
    link: string;
    logo?: string;
    icon?: string;
    mime?: string;
    anchor?: string;
}

/**
 * 站点。
 *
 * 面向站点信息设计的 {@link TextLink} 变种。
 */
export interface Website extends TextLink {
    /** 站点名称。 */
    text: string;

    /**
     * 站点链接。
     *
     * - 可以是以 `https://`、`http://` 等开头的绝对地址，也可以是以 `/` 开头的相对路径。
     */
    link: string;

    /**
     * 站内链接。
     *
     * - 仅限以 `/` 开头的相对路径。
     * - 仅当同时需要存储站内外链接时使用。
     */
    path?: string;

    logo?: string;
    icon?: string;
    mime?: string;
    anchor?: string;

    /**
     * 标语。
     *
     * - 简洁有力、代表品牌理念的宣传口号.
     * - 一般不以句号结尾。
     * - 一般是一两句话，且不会换行。
     */
    slogan?: string;

    /**
     * 站点描述。
     *
     * 此字段一般是面向 OG 协议或其它只能够接受纯文本的场景，因此字段值不应包含
     * Markdown 或 HTML 等额外的、不可见的标记语言，并且也不建议有换行符。
     */
    description?: string;

    /**
     * 站点描述。
     *
     * - 多数情况下是 HTML 格式，如果字面值是 Markdown 或包含其它标记语言，比较建议在最后统一编译为 HTML。
     * - 实际渲染的内容一般与 {@link description} 字段一致，不过也可以有换行符来书写更多内容。
     */
    descriptionRich?: string;

    /** 项目文档。 */
    documentationUrl?: string;

    /** 源代码仓库。 */
    repositoryUrl?: string;

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

export type FriendType = 'partner' | 'feed' | 'pixel';

/**
 * 友链。
 *
 * - 面向友链业务设计的 {@link Website} 变种。
 * - 一般情况下友链都会有“站点名称” {@link text} 字段；如果确实没有，用“站点拥有者” {@link author} 字段的值填充，而后者保持为 `undefined` 。
 */
export interface Friend extends Website {
    text: string;
    link: string;
    path?: undefined;
    logo?: string;
    icon?: string;
    mime?: string;
    anchor?: string;
    slogan?: string;
    description?: string;
    descriptionRich?: string;
    documentationUrl?: string;
    repositoryUrl?: string;
    settingsUrl?: string;
    loginUrl?: string;
    adminUrl?: string;
    author?: string;
    tags?: string[];
    note?: string;

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

    /** 友链类型。 */
    type: FriendType;

    /** 是否隐藏或不可用。 */
    disabled?: boolean;

    /** 职位、头衔…… */
    titles?: string[];

    /** 个性签名。 */
    status?: string;

    /**
     * 社交账号。
     *
     * 键为平台名、值为该平台上的地址或 id。
     */
    social?: { [brand: string]: string };

    /**
     * 相遇时间。
     *
     * - 构造时注意 `Date` 的月份从 `0` 开始。
     */
    meet?: Date;

    /**
     * 头像的附加渲染样式。
     *
     * - 统一采用 Tailwind CSS v4 类名。
     * - 需要多个类名时直接写在同一字符串里（如 `'rounded-full ring-2 ring-white'`）。
     */
    avatarStyles?: string;
}

/**
 * 项目信息。
 *
 * 面向项目展示设计的 {@link Website} 变种，必须指定 {@link description} 字段。
 */
export interface Project extends Website {
    /** 项目名称。 */
    text: string;

    /**
     * 项目地址。
     *
     * - 优先填官方网站，其次是发行页面（如 npm、PyPI、VSCode Marketplace 等），接着是在线托管的文档，最后才是源代码仓库。
     * - 即使与其它字段重复，也必须填两份，因为这个字段就是用于提供一个直接的、确定的、可点击的链接。
     */
    link: string;

    path?: string;
    logo?: string;
    icon?: string;
    mime?: string;
    anchor?: string;
    slogan?: string;

    /**
     * 项目简介。
     *
     * 纯文本，不应包含 Markdown 或 HTML 等等，渲染时也不考虑支持多行文本。
     */
    description: string;

    /**
     * 项目简介。
     *
     * - 多数情况下是 HTML 格式，如果字面值是 Markdown 或包含其它标记语言，比较建议在最后统一编译为 HTML。
     * - 实际渲染的内容一般与 {@link description} 字段一致，不过也可以有换行符来书写更多内容。
     */
    descriptionRich?: string;

    documentationUrl?: string;
    repositoryUrl?: string;
    settingsUrl?: string;
    loginUrl?: string;
    adminUrl?: string;
    author?: string;
    tags?: string[];
    note?: string;

    /**
     * 发行类型。
     *
     * - 比如说一个 npm 包、一个 Python 包、一个 VSCode 插件等等。
     * - 必须是一个图标名称（尤指各类图标库用于标识定位的字符串）而不能是一条链接。
     */
    releaseType?: string;

    /** 社交链接。 */
    socials?: Badge[];

    /** 技术栈。 */
    stack?: Badge[];
}

/**
 * 书签组所属的生态分类。
 */
export type BookmarkCategory = 'python' | 'node' | 'java' | 'more';

/**
 * 书签组。
 */
export interface BookmarkGroup {
    /** 标题（带链接）。 */
    title?: TextLink;

    /** 所属生态分类。 */
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
