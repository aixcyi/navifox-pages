import type { BookmarkGroup, Hyperlink } from '@navifox/types';
import { markit } from '@navifox/utils';

const groupPython: BookmarkGroup = {
    title: { text: 'Python', link: '#python' },
    items: [
        {
            name: '标准库',
            link: 'https://docs.python.org/zh-cn/3/library/index.html',
            logo: 'logos:python',
            tags: [ 'catalog' ],
        }, {
            name: '语言参考',
            link: 'https://docs.python.org/zh-cn/3/reference/index.html',
            logo: 'logos:python',
            tags: [ 'catalog' ],
        }, {
            name: '更新历史',
            link: 'https://docs.python.org/zh-cn/3/whatsnew/index.html',
            logo: 'logos:python',
            tags: [ 'catalog' ],
        }, {
            name: '术语对照表',
            link: 'https://docs.python.org/zh-cn/3/glossary.html',
            logo: 'logos:python',
        }, {
            name: '`+ - * /` 优先级',
            link: 'https://docs.python.org/zh-cn/3/reference/expressions.html#operator-precedence',
            logo: 'logos:python',
        }, {
            name: '__特殊方法\\_\\_',
            link: 'https://docs.python.org/zh-cn/3/reference/datamodel.html#special-method-names',
            logo: 'logos:python',
        }, {
            name: 'ABCs 抽象基类',
            link: 'https://docs.python.org/zh-cn/3/library/collections.abc.html#collections-abstract-base-classes',
            logo: 'logos:python',
        }, {
            name: 'f-string',
            link: 'https://docs.python.org/zh-cn/3/reference/lexical_analysis.html#f-strings',
            logo: 'logos:python',
        }, {
            name: 'Exception 层次结构',
            link: 'https://docs.python.org/zh-cn/3/library/exceptions.html#exception-hierarchy',
            logo: 'logos:python',
            note: '内置异常',
        }, {
            name: '格式规格迷你语言',
            link: 'https://docs.python.org/zh-cn/3/library/string.html#formatspec',
            logo: 'logos:python',
        }, {
            name: '正则库 `re` 的函数',
            link: 'https://docs.python.org/zh-cn/3/library/re.html#functions',
            logo: 'logos:python',
        }, {
            name: 'LogRecord 属性',
            link: 'https://docs.python.org/zh-cn/3/library/logging.html#logrecord-attributes',
            logo: 'logos:python',
        }, {
            name: '十进制定点和浮点算术常见问题',
            link: 'https://docs.python.org/zh-cn/3/library/decimal.html#decimal-faq',
            logo: 'logos:python',
        }, {
            name: 'Status of Python versions',
            link: 'https://devguide.python.org/versions/',
            logo: 'logos:python',
            note: '版本状态',
        }, {
            name: 'Development cycle',
            link: 'https://devguide.python.org/developer-workflow/development-cycle/index.html',
            logo: 'logos:python',
            note: '发布节奏',
        }
    ]
}
const groupDjango: BookmarkGroup = {
    title: { text: 'Django', link: '#django-configs' },
    items: [
        {
            name: 'Python 兼容性',
            link: 'https://docs.djangoproject.com/zh-hans/5.2/faq/install/#what-python-version-can-i-use-with-django',
            logo: 'logos:django-icon',
        }, {
            name: '废弃时间表',
            link: 'https://docs.djangoproject.com/zh-hans/5.2/internals/deprecation/',
            logo: 'logos:django-icon',
        }, {
            name: '发行流程',
            link: 'https://docs.djangoproject.com/zh-hans/5.2/internals/release-process/',
            logo: 'logos:django-icon',
            note: '版本号命名、发布节奏',
        }, {
            name: 'PostgreSQL',
            link: 'https://docs.djangoproject.com/zh-hans/5.2/ref/contrib/postgres/',
            logo: 'logos:django-icon',
            note: '子模块',
            tags: [ 'catalog' ],
        }, {
            name: '异常',
            link: 'https://docs.djangoproject.com/zh-hans/5.2/ref/exceptions/',
            logo: 'logos:django-icon',
        }
    ]
}
const groupDjangoConfigs: BookmarkGroup = {
    title: { text: 'Django 配置专题', link: '#django-configs' },
    items: [
        {
            name: 'Settings 参考',
            link: 'https://docs.djangoproject.com/zh-hans/5.2/ref/settings/',
            logo: 'logos:django-icon',
        }, {
            name: '`REST_FRAMEWORK`',
            link: 'https://www.django-rest-framework.org/api-guide/settings/',
            icon: 'https://www.django-rest-framework.org/img/favicon.ico',
            note: 'REST Framework',
        }, {
            name: '`OAUTH2_PROVIDER`',
            link: 'https://django-oauth-toolkit.readthedocs.io/en/latest/settings.html',
            note: 'Django OAuth Toolkit',
        }, {
            name: '日志默认配置',
            link: 'https://docs.djangoproject.com/zh-hans/5.2/ref/logging/#default-logging-definition',
            logo: 'logos:django-icon',
        }, {
            name: '`AppConfig` 配置',
            link: 'https://docs.djangoproject.com/zh-hans/5.2/ref/applications/#application-configuration',
            logo: 'logos:django-icon',
        }
    ]
}
const groupDjangoModel: BookmarkGroup = {
    title: { text: 'Django 模型层', link: '#django-model' },
    items: [
        {
            name: '模型',
            link: 'https://docs.djangoproject.com/zh-hans/5.2/ref/models/',
            logo: 'logos:django-icon',
            note: 'API 索引页',
            tags: [ 'catalog' ],
        }, {
            name: '字段类型',
            link: 'https://docs.djangoproject.com/zh-hans/5.2/ref/models/fields/',
            logo: 'logos:django-icon',
        }, {
            name: 'Serializer fields',
            link: 'https://www.django-rest-framework.org/api-guide/fields/',
            icon: 'https://www.django-rest-framework.org/img/favicon.ico',
            note: '序列化器字段',
        }, {
            name: 'PostgreSQL 特有模型字段',
            link: 'https://docs.djangoproject.com/zh-hans/5.2/ref/contrib/postgres/fields/',
            logo: 'logos:django-icon',
        }, {
            name: '自定义模型字段',
            link: 'https://docs.djangoproject.com/zh-hans/5.2/howto/custom-model-fields/',
            logo: 'logos:django-icon',
        }, {
            name: '`Meta` 选项',
            link: 'https://docs.djangoproject.com/zh-hans/5.2/ref/models/options/',
            logo: 'logos:django-icon',
        }, {
            name: '自定义 `Manager`',
            link: 'https://docs.djangoproject.com/zh-hans/5.2/topics/db/managers/#custom-managers',
            logo: 'logos:django-icon',
        }, {
            name: '定制 User',
            link: 'https://docs.djangoproject.com/zh-hans/5.2/topics/auth/customizing/#substituting-a-custom-user-model',
            logo: 'logos:django-icon',
        }, {
            name: '约束参考',
            link: 'https://docs.djangoproject.com/zh-hans/5.2/ref/models/constraints/',
            logo: 'logos:django-icon',
        }, {
            name: 'Nested serialization',
            link: 'https://www.django-rest-framework.org/api-guide/relations/#nested-relationships',
            icon: 'https://www.django-rest-framework.org/img/favicon.ico',
        }, {
            name: 'QuerySet 参考',
            link: 'https://docs.djangoproject.com/zh-hans/5.2/ref/models/querysets/',
            logo: 'logos:django-icon',
        }, {
            name: '查询表达式',
            link: 'https://docs.djangoproject.com/zh-hans/5.2/ref/models/expressions/',
            logo: 'logos:django-icon',
        }, {
            name: '数据库函数',
            link: 'https://docs.djangoproject.com/zh-hans/5.2/ref/models/database-functions/',
            logo: 'logos:django-icon',
        }, {
            name: '执行查询',
            link: 'https://docs.djangoproject.com/zh-hans/5.2/topics/db/queries/',
            logo: 'logos:django-icon',
        }, {
            name: '执行原生 SQL 查询',
            link: 'https://docs.djangoproject.com/zh-hans/5.2/topics/db/sql/',
            logo: 'logos:django-icon',
        }, {
            name: '事务',
            link: 'https://docs.djangoproject.com/zh-hans/5.2/topics/db/transactions/',
            logo: 'logos:django-icon',
        }, {
            name: '底层缓存 API',
            link: 'https://docs.djangoproject.com/zh-hans/5.2/topics/cache/#the-low-level-cache-api',
            logo: 'logos:django-icon',
        }
    ]
}
const groupDjangoView: BookmarkGroup = {
    title: { text: 'Django 视图层', link: '#django-view' },
    items: [
        {
            name: '请求类 `HttpRequest`',
            link: 'https://docs.djangoproject.com/zh-hans/5.2/ref/request-response/',
            logo: 'logos:django-icon',
        }, {
            name: '响应类 `HttpResponse`',
            link: 'https://docs.djangoproject.com/zh-hans/5.2/ref/request-response/#httpresponse-objects',
            logo: 'logos:django-icon',
        }, {
            name: '_class_ `Request`',
            link: 'https://www.django-rest-framework.org/api-guide/requests/',
            icon: 'https://www.django-rest-framework.org/img/favicon.ico',
            note: '请求对象',
        }, {
            name: '_class_ `Responses`',
            link: 'https://www.django-rest-framework.org/api-guide/responses/',
            icon: 'https://www.django-rest-framework.org/img/favicon.ico',
            note: '响应对象',
        }
    ]
}
const groupKotlin: BookmarkGroup = {
    title: { text: 'Kotlin', link: '#kotlin' },
    items: [
        {
            name: 'stdlib',
            link: 'https://kotlinlang.org/api/core/kotlin-stdlib/',
            logo: 'logos:kotlin-icon',
            note: '标准库目录',
            tags: [ 'catalog' ],
        }, {
            name: 'idioms',
            link: 'https://kotlinlang.org/docs/idioms.html',
            logo: 'logos:kotlin-icon',
            note: '语法糖摘要',
            tags: [ 'catalog' ],
        }, {
            name: 'JavaSE 8',
            link: 'https://docs.oracle.com/javase/8/docs/api/',
            logo: 'devicon:java',
            note: 'API 手册',
            tags: [ 'catalog' ],
        }, {
            name: 'Symbols precedence',
            link: 'https://kotlinlang.org/grammar/#expressions',
            logo: 'logos:kotlin-icon',
            note: '运算符优先级',
        }, {
            name: 'Operator overloading',
            link: 'https://kotlinlang.org/docs/operator-overloading.html',
            logo: 'logos:kotlin-icon',
            note: '运算符重载',
        }, {
            name: 'Scope functions',
            link: 'https://kotlinlang.org/docs/scope-functions.html',
            logo: 'logos:kotlin-icon',
            note: '范围函数',
        }, {
            name: 'KDoc',
            link: 'https://kotlinlang.org/docs/kotlin-doc.html',
            logo: 'logos:kotlin-icon',
            note: '代码内注释文档',
        }, {
            name: 'K2 compiler migration',
            link: 'https://kotlinlang.org/docs/k2-compiler-migration-guide.html',
            logo: 'logos:kotlin-icon',
            note: 'K2 编译器迁移指南',
        }, {
            name: 'Text Components',
            link: 'https://docs.oracle.com/javase/tutorial/uiswing/components/text.html',
            logo: 'devicon:java',
            note: '几种文本组件的区别',
        }
    ]
}
const groupFrontend: BookmarkGroup = {
    title: { text: '前端', link: '#frontend' },
    items: [
        {
            name: 'HTML 元素参考',
            link: 'https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements',
            logo: 'simple-icons:mdnwebdocs',
            note: '<div/> 之类的东西',
        }, {
            name: 'HTML 实体',
            link: 'https://developer.mozilla.org/zh-CN/docs/Glossary/Entity',
            logo: 'simple-icons:mdnwebdocs',
            note: '&nbsp; 之类的东西',
        }, {
            name: 'DOM 接口类型',
            link: 'https://developer.mozilla.org/zh-CN/docs/Web/API/HTML_DOM_API#html_dom_api_%E6%8E%A5%E5%8F%A3',
            logo: 'simple-icons:mdnwebdocs',
            note: 'HTMLDivElement 之类的东西',
        }, {
            name: 'HTML 术语表',
            link: 'https://developer.mozilla.org/zh-CN/docs/Glossary',
            logo: 'simple-icons:mdnwebdocs',
            note: 'Glossary',
        }, {
            name: 'CSS 属性',
            link: 'https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Properties',
            logo: 'devicon:css',
            note: 'MDN - CSS',
        }, {
            name: 'CSS 值函数',
            link: 'https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Values/Functions',
            logo: 'devicon:css',
            note: 'MDN - CSS',
        }, {
            name: '内置对象',
            link: 'https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects',
            logo: 'logos:javascript',
            note: 'MDN - JavaScript',
        }, {
            name: '表达式和运算符',
            link: 'https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators',
            logo: 'logos:javascript',
            note: 'MDN - JavaScript',
        }, {
            name: 'Node.js API',
            link: 'https://nodejs.org/docs/latest/api/',
            logo: 'logos:nodejs-icon-alt',
        }, {
            name: 'Node.js 版本状态',
            link: 'https://nodejs.org/zh-cn/about/previous-releases',
            logo: 'logos:nodejs-icon-alt',
        }, {
            name: 'TypeScript Cheat Sheets',
            link: 'https://www.typescriptlang.org/cheatsheets/',
            logo: 'logos:typescript-icon',
        }, {
            name: 'GSAP Demo Hub',
            link: 'https://demos.gsap.com/explore/',
            note: 'GSAP 官方示例库',
        }, {
            name: 'Hover, focus... states',
            link: 'https://tailwindcss.com/docs/hover-focus-and-other-states',
            logo: 'logos:tailwindcss-icon',
            note: 'Tailwind 定语缩写',
        }, {
            name: 'background-image',
            link: 'https://tailwindcss.com/docs/background-image',
            logo: 'logos:tailwindcss-icon',
            note: 'Tailwind 背景图片',
        }, {
            name: 'Customizing theme',
            link: 'https://tailwindcss.com/docs/theme#customizing-your-theme',
            logo: 'logos:tailwindcss-icon',
            note: '定制自己的主题',
        }
    ]
}
const groupVue: BookmarkGroup = {
    title: { text: 'Vue 3', link: '#vue' },
    items: [
        {
            name: 'Vue.js API 参考',
            link: 'https://cn.vuejs.org/api/',
            logo: 'logos:vue',
        }, {
            name: 'VueUse functions',
            link: 'https://vueuse.org/functions.html',
            logo: 'logos:vueuse',
            note: 'Vue 组合式工具集',
        }, {
            name: 'Element Plus 组件',
            link: 'https://element-plus.org/zh-CN/component/overview.html',
            icon: 'https://element-plus.org/images/element-plus-logo-small.svg',
            note: '面向 Vue 3',
        }, {
            name: 'Element 组件',
            link: 'https://element.eleme.cn/#/zh-CN/component/installation',
            logo: 'logos:element',
            note: '面向 Vue 2',
        }, {
            name: 'Ant Design Vue 组件',
            link: 'https://antdv.com/components/overview-cn',
        }, {
            name: 'Naive UI 组件',
            link: 'https://www.naiveui.com/zh-CN/dark/components/button',
            logo: 'logos:naiveui',
        }, {
            name: 'Reka UI 组件',
            link: 'https://reka-ui.com/docs/components/navigation-menu',
            icon: 'https://reka-ui.com/logo.svg',
            note: '散装无样式组件库',
        }, {
            name: 'shadcn/vue 组件',
            link: 'https://www.shadcn-vue.com/docs/components',
            note: '散装组件库',
        }
    ]
}
const groupReact: BookmarkGroup = {
    title: { text: 'React', link: '#react' },
    items: [
        {
            name: 'Ant Design 组件',
            link: 'https://ant.design/components/overview-cn',
            logo: 'devicon:antdesign',
        }, {
            name: 'shadcn/ui',
            link: 'https://ui.shadcn.com/',
            note: '散装组件库',
        }
    ]
}
const groupNoSQL: BookmarkGroup = {
    title: { text: '(No)SQL', link: '#sql' },
    items: [
        {
            name: 'Data Types',
            link: 'https://www.postgresql.org/docs/current/datatype.html',
            logo: 'logos:postgresql',
            note: '数据类型',
        }, {
            name: 'Data Types',
            link: 'https://dev.mysql.com/doc/refman/5.7/en/data-types.html',
            logo: 'logos:mysql',
            note: 'MySQL 5.7 数据类型',
        }, {
            name: 'SQL Commands',
            link: 'https://www.postgresql.org/docs/current/sql-commands.html',
            logo: 'logos:postgresql',
            note: '语句一览',
        }, {
            name: 'Commands',
            link: 'https://redis.io/docs/latest/commands/',
            logo: 'logos:redis',
            note: 'Redis 命令列表',
        }, {
            name: 'Functions & Operators',
            link: 'https://www.postgresql.org/docs/current/functions.html',
            logo: 'logos:postgresql',
            note: '函数与操作符',
        }, {
            name: 'Versioning Policy',
            link: 'https://www.postgresql.org/support/versioning/',
            logo: 'logos:postgresql',
            note: '更新策略',
        }
    ]
}
const groupIntelliJ: BookmarkGroup = {
    title: { text: 'IntelliJ', link: 'intellij' },
    items: [
        {
            name: 'SDK',
            link: 'https://plugins.jetbrains.com/docs/intellij/welcome.html',
            logo: 'vscode-icons:file-type-jetbrains',
            note: '插件、语言、主题',
            tags: [ 'catalog' ],
        }, {
            name: '`plugin.xml`',
            link: 'https://plugins.jetbrains.com/docs/intellij/plugin-configuration-file.html',
            logo: 'vscode-icons:file-type-jetbrains',
        }, {
            name: '`build.plugin.kts`',
            link: 'https://plugins.jetbrains.com/docs/intellij/tools-intellij-platform-gradle-plugin.html',
            logo: 'vscode-icons:file-type-jetbrains',
            note: '2.x 版本',
        }, {
            name: '`build.gradle.kts`',
            link: 'https://plugins.jetbrains.com/docs/intellij/tools-gradle-intellij-plugin.html#usage',
            logo: 'vscode-icons:file-type-jetbrains',
            note: '1.x 版本',
        }, {
            name: 'Bundled Plugins IDs',
            link: 'https://plugins.jetbrains.com/docs/intellij/plugin-dependencies.html#ids-of-bundled-plugins',
            logo: 'vscode-icons:file-type-jetbrains',
            note: '各捆绑插件的ID',
        }, {
            name: 'product versions in use',
            link: 'https://plugins.jetbrains.com/docs/marketplace/product-versions-in-use-statistics.html',
            logo: 'vscode-icons:file-type-jetbrains',
            note: '产品版本使用率统计',
        }, {
            name: 'UI Inspector',
            link: 'https://plugins.jetbrains.com/docs/intellij/internal-ui-inspector.html',
            logo: 'vscode-icons:file-type-jetbrains',
            note: 'UI 检查器的用法',
        }, {
            name: 'Plugin Signing',
            link: 'https://plugins.jetbrains.com/docs/intellij/plugin-signing.html',
            logo: 'vscode-icons:file-type-jetbrains',
            note: '插件签名教程',
        }, {
            name: 'Semantic versioning',
            link: 'https://plugins.jetbrains.com/docs/marketplace/semver.html',
            logo: 'vscode-icons:file-type-jetbrains',
            note: '语义版本控制',
        }
    ]
}
const groupMinecraft: BookmarkGroup = {
    title: { text: 'Minecraft', link: '#minecraft' },
    items: [
        {
            name: 'Java版本记录',
            link: 'https://zh.minecraft.wiki/w/Java%E7%89%88%E7%89%88%E6%9C%AC%E8%AE%B0%E5%BD%95',
        }, {
            name: '版本更新简表',
            link: 'https://zh.moegirl.org.cn/%E6%88%91%E7%9A%84%E4%B8%96%E7%95%8C(%E6%B8%B8%E6%88%8F)/%E7%89%88%E6%9C%AC%E6%9B%B4%E6%96%B0%E6%97%A5%E5%BF%97',
        }, {
            name: '物品列表',
            link: 'https://zh.minecraft.wiki/w/%E7%89%A9%E5%93%81#%E7%89%A9%E5%93%81%E5%88%97%E8%A1%A8',
        }, {
            name: '方块列表',
            link: 'https://zh.minecraft.wiki/w/%E6%96%B9%E5%9D%97#%E6%96%B9%E5%9D%97%E5%88%97%E8%A1%A8',
        }, {
            name: '生物列表',
            link: 'https://zh.minecraft.wiki/w/%E7%94%9F%E7%89%A9#%E7%94%9F%E7%89%A9%E5%88%97%E8%A1%A8',
            icon: 'https://zh.minecraft.wiki/images/Favicon.ico',
        }, {
            name: '命令列表，及其概述',
            link: 'https://zh.minecraft.wiki/w/%E5%91%BD%E4%BB%A4#%E5%91%BD%E4%BB%A4%E5%88%97%E8%A1%A8%E5%8F%8A%E5%85%B6%E6%A6%82%E8%BF%B0',
        }, {
            name: '附魔 - 魔咒列表',
            link: 'https://zh.minecraft.wiki/w/%E9%AD%94%E5%92%92#%E6%89%80%E6%9C%89%E9%AD%94%E5%92%92',
        }, {
            name: '附魔 - 手持物品魔咒',
            link: 'https://zh.minecraft.wiki/w/%E9%AD%94%E5%92%92#%E6%89%8B%E6%8C%81%E7%89%A9%E5%93%81%E9%AD%94%E5%92%92',
        }, {
            name: '附魔 - 盔甲位物品魔咒',
            link: 'https://zh.minecraft.wiki/w/%E9%99%84%E9%AD%94#%E7%9B%94%E7%94%B2%E4%BD%8D%E7%89%A9%E5%93%81%E9%AD%94%E5%92%92',
        }, {
            name: '工具物品耐久',
            link: 'https://zh.minecraft.wiki/w/%E5%B7%A5%E5%85%B7#%E7%89%A9%E5%93%81%E8%80%90%E4%B9%85',
        }, {
            name: '生物族群及特征',
            link: 'https://zh.minecraft.wiki/w/%E7%94%9F%E7%89%A9#%E7%94%9F%E7%89%A9%E6%97%8F%E7%BE%A4',
        }, {
            name: '药水酿造',
            link: 'https://zh.minecraft.wiki/w/%E8%8D%AF%E6%B0%B4%E9%85%BF%E9%80%A0',
        }, {
            name: '数据包',
            link: 'https://zh.minecraft.wiki/w/%E6%95%B0%E6%8D%AE%E5%8C%85',
        }, {
            name: '食物 - 营养价值',
            link: 'https://zh.minecraft.wiki/w/%E9%A3%9F%E7%89%A9#%E8%90%A5%E5%85%BB%E4%BB%B7%E5%80%BC',
        }, {
            name: '村民职业与交易选项及站点方块',
            link: 'https://zh.minecraft.wiki/w/%E4%BA%A4%E6%98%93#%E6%9D%91%E6%B0%91%E8%81%8C%E4%B8%9A%E4%B8%8E%E4%BA%A4%E6%98%93%E9%80%89%E9%A1%B9',
        }, {
            name: '高度 - 历史变更',
            link: 'https://zh.minecraft.wiki/w/%E9%AB%98%E5%BA%A6#%E5%8E%86%E5%8F%B2',
        }
    ]
}
const groupChores: BookmarkGroup = {
    title: { text: '杂项', link: '#chores' },
    items: [
        {
            name: 'HTTP 状态响应码',
            link: 'https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Reference/Status',
            logo: 'simple-icons:mdnwebdocs',
        }, {
            name: '常见 MIME 列表',
            link: 'https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Guides/MIME_types/Common_types',
            logo: 'simple-icons:mdnwebdocs',
        }, {
            name: '正则表达式',
            link: 'https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Regular_Expressions',
            logo: 'simple-icons:mdnwebdocs',
        }, {
            name: 'JSON Schema',
            link: 'https://json-schema.org/specification',
            logo: 'logos:json-schema-icon',
        }, {
            name: 'Shiki Languages',
            link: 'https://shiki.style/languages',
            icon: 'https://shiki.style/logo.svg',
        }, {
            name: 'mermaid',
            link: 'https://mermaid.js.org/intro/',
        }, {
            name: 'Prettier Configuration',
            link: 'https://prettier.io/docs/options',
            icon: 'https://prettier.io/icon.png',
        }, {
            name: 'EditorConfig',
            link: 'https://spec.editorconfig.org/',
        }
    ]
}
export const bookmarks = [
    groupPython,
    groupDjango,
    groupDjangoConfigs,
    groupDjangoModel,
    groupDjangoView,
    groupKotlin,
    groupIntelliJ,
    groupNoSQL,
    groupFrontend,
    groupVue,
    groupReact,
    groupMinecraft,
    groupChores,
]
export const anchors: Hyperlink[] = [
    { text: 'Python', link: groupPython.title.link, logo: 'catppuccin:python' },
    { text: 'Kotlin', link: groupKotlin.title.link, logo: 'catppuccin:kotlin' },
    { text: '前端', link: groupFrontend.title.link, logo: 'catppuccin:javascript' },
    { text: '更多', link: groupMinecraft.title.link, logo: 'fluent-emoji-flat:fox' },
]

for (const group of bookmarks) {
    group.title.elementId = group.title.link.substring(1)

    for (const bookmark of group.items) {
        if (bookmark.name)
            bookmark.name = markit(bookmark.name)
        if (!bookmark.logo && !bookmark.icon)
            bookmark.icon = `${new URL(bookmark.link).origin}/favicon.ico`
    }
}
