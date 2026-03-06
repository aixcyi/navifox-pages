import type { BookmarkGroup } from '@navifox/types';
import { markit } from '@navifox/utils';

const groupPython: BookmarkGroup = {
    title: { text: 'Python', link: '#python' },
    items: [
        {
            name: '标准库',
            link: 'https://docs.python.org/zh-cn/3/library/index.html',
        }, {
            name: '术语对照表',
            link: 'https://docs.python.org/zh-cn/3/glossary.html',
        }, {
            name: '语言参考',
            link: 'https://docs.python.org/zh-cn/3/reference/index.html',
        }, {
            name: '版本更新历史',
            link: 'https://docs.python.org/zh-cn/3/whatsnew/index.html',
        }, {
            name: '`+ - * /` 优先级',
            link: 'https://docs.python.org/zh-cn/3/reference/expressions.html#operator-precedence',
        }, {
            name: '__特殊方法\\_\\_',
            link: 'https://docs.python.org/zh-cn/3/reference/datamodel.html#special-method-names',
        }, {
            name: 'ABCs 抽象基类',
            link: 'https://docs.python.org/zh-cn/3/library/collections.abc.html#collections-abstract-base-classes',
        }, {
            name: 'f-string',
            link: 'https://docs.python.org/zh-cn/3/reference/lexical_analysis.html#f-strings',
        }, {
            name: '内置 Exception 结构',
            link: 'https://docs.python.org/zh-cn/3/library/exceptions.html#exception-hierarchy',
        }, {
            name: '格式规格迷你语言',
            link: 'https://docs.python.org/zh-cn/3/library/string.html#formatspec',
        }, {
            name: '正则库 `re` 的函数',
            link: 'https://docs.python.org/zh-cn/3/library/re.html#functions',
        }, {
            name: 'LogRecord 属性',
            link: 'https://docs.python.org/zh-cn/3/library/logging.html#logrecord-attributes',
        }, {
            name: '十进制定点和浮点算术\n常见问题',
            link: 'https://docs.python.org/zh-cn/3/library/decimal.html#decimal-faq',
        }, {
            name: 'Status of Python versions',
            link: 'https://devguide.python.org/versions/',
            icon: 'https://devguide.python.org/_static/favicon.png',
        }, {
            name: 'Development cycle',
            link: 'https://devguide.python.org/developer-workflow/development-cycle/index.html',
            icon: 'https://devguide.python.org/_static/favicon.png',
        }
    ]
}
const groupPythonEcosystem: BookmarkGroup = {
    title: { text: 'Python 生态', link: '#python-ecosystem' },
    items: [
        {
            name: 'typing-extensions',
            link: 'https://typing-extensions.readthedocs.io/en/stable/',
            note: '运行时类型提示',
        }, {
            name: 'Requests',
            link: 'https://requests.readthedocs.io/en/stable/',
            note: '优雅简单的 HTTP 库',
        }, {
            name: 'NumPy',
            link: 'https://numpy.org/doc/stable/reference/index.html',
            icon: 'https://numpy.org/doc/stable/_static/favicon.ico',
            note: '科学计算基础工具包',
        }, {
            name: 'Pandas',
            link: 'https://pandas.pydata.org/docs/reference/index.html',
            icon: 'https://pandas.pydata.org/docs/_static/favicon.ico',
            note: '数据结构与数据分析工具',
        }, {
            name: 'Pillow',
            link: 'https://pillow.readthedocs.io/en/stable/reference/index.html',
            icon: 'https://pillow.readthedocs.io/en/stable/_static/favicon.ico',
            note: '图像处理库'
        }, {
            name: 'librosa',
            link: 'https://librosa.org/doc/latest/index.html',
            icon: 'https://librosa.org/doc/latest/_static/librosa_logo_text.svg',
            note: '音频处理库',
        }, {
            name: 'Click',
            link: 'https://click.palletsprojects.com/en/stable/',
            icon: 'https://click.palletsprojects.com/en/stable/_static/click-icon.svg',
            note: '创建 CLI 命令行界面程序',
        }, {
            name: 'Rich',
            link: 'https://rich.readthedocs.io/en/stable/',
            note: '有色富文本、表格、语法高亮 CLI 打印',
        }, {
            name: 'Celery',
            link: 'https://docs.celeryq.dev/en/stable/index.html',
            icon: 'https://docs.celeryq.dev/en/stable/_static/favicon.ico',
            note: '分布式任务队列',
        }, {
            name: 'psycopg 3',
            link: 'https://www.psycopg.org/psycopg3/docs/',
            icon: 'https://www.psycopg.org/psycopg3/docs/_static/psycopg.svg',
            note: 'PostgreSQL 适配器',
        }, {
            name: 'Selenium',
            link: 'https://www.selenium.dev/zh-cn/documentation/',
            icon: 'https://www.selenium.dev/favicons/favicon-32x32.png',
            note: '浏览器自动化',
        }, {
            name: 'Flask',
            link: 'https://flask.palletsprojects.com/zh-cn/stable/',
            icon: 'https://flask.palletsprojects.com/zh-cn/stable/_static/shortcut-icon.png',
            note: 'Web 应用 WSGI 框架',
        }, {
            name: 'Fast API',
            link: 'https://fastapi.tiangolo.com/zh/',
            icon: 'https://fastapi.tiangolo.com/zh/img/favicon.png',
            note: 'Web 应用框架',
        }, {
            name: 'Litestar',
            link: 'https://docs.litestar.dev/main/reference/index.html',
            icon: 'https://docs.litestar.dev/main/_static/favicon.svg',
            note: 'Web 应用 ASGI 框架',
        }, {
            name: 'Sphinx',
            link: 'https://www.sphinx-doc.org/zh-cn/master/',
            icon: 'https://www.sphinx-doc.org/zh-cn/master/_static/favicon.svg',
            note: '轻松创建智能且美观的文档',
        }, {
            name: 'Manim Community',
            link: 'https://docs.manim.community/en/stable/',
            icon: 'https://docs.manim.community/en/stable/_static/favicon.ico',
            note: '以编程方式生成动画',
        }
    ]
}
const groupDjangoEcosystem: BookmarkGroup = {
    title: { text: 'Django 生态', link: '#django-eco' },
    items: [
        {
            name: 'Django 文档',
            link: 'https://docs.djangoproject.com/zh-hans/5.2/',
        }, {
            name: 'Django Packages',
            link: 'https://djangopackages.org/',
        }, {
            name: 'Django REST Framework',
            link: 'https://www.django-rest-framework.org/',
            icon: 'https://www.django-rest-framework.org/img/favicon.ico',
        }, {
            name: 'Django OAuth Toolkit',
            link: 'https://django-oauth-toolkit.readthedocs.io/en/latest/',
        }, {
            name: 'django-environ',
            link: 'https://django-environ.readthedocs.io/en/latest/',
        }, {
            name: 'Django-CAS-ng',
            link: 'https://djangocas.dev/docs/latest/cas-protocol-overview.html',
        }
    ]
}
const groupDjangoSettings: BookmarkGroup = {
    title: { text: 'Django 配置', link: '#django-configs' },
    items: [
        {
            name: 'Settings 参考',
            link: 'https://docs.djangoproject.com/zh-hans/5.2/ref/settings/',
        }, {
            name: 'Settings references',
            link: 'https://www.django-rest-framework.org/api-guide/settings/',
            icon: 'https://www.django-rest-framework.org/img/favicon.ico',
        }, {
            name: 'OAuth Toolkit Settings',
            link: 'https://django-oauth-toolkit.readthedocs.io/en/latest/settings.html',
        }, {
            name: '日志默认配置',
            link: 'https://docs.djangoproject.com/zh-hans/5.2/ref/logging/#default-logging-definition',
        }, {
            name: 'AppConfig 配置',
            link: 'https://docs.djangoproject.com/zh-hans/5.2/ref/applications/#application-configuration',
        }
    ]
}
const groupDjangoModel: BookmarkGroup = {
    title: { text: 'Django 模型层', link: '#django-model' },
    items: [
        {
            name: '模型',
            link: 'https://docs.djangoproject.com/zh-hans/5.2/ref/models/',
            note: 'API 索引页',
        }, {
            name: 'Serializer fields',
            link: 'https://www.django-rest-framework.org/api-guide/fields/',
            icon: 'https://www.django-rest-framework.org/img/favicon.ico',
        }, {
            name: '自定义模型字段',
            link: 'https://docs.djangoproject.com/zh-hans/5.2/howto/custom-model-fields/',
        }, {
            name: 'PostgreSQL 特有模型字段',
            link: 'https://docs.djangoproject.com/zh-hans/5.2/ref/contrib/postgres/fields/',
        }, {
            name: '定制 User',
            link: 'https://docs.djangoproject.com/zh-hans/5.2/topics/auth/customizing/#substituting-a-custom-user-model',
        }, {
            name: '自定义 Manager',
            link: 'https://docs.djangoproject.com/zh-hans/5.2/topics/db/managers/#custom-managers',
        }, {
            name: '约束参考',
            link: 'https://docs.djangoproject.com/zh-hans/5.2/ref/models/constraints/',
        }, {
            name: 'Nested serialization',
            link: 'https://www.django-rest-framework.org/api-guide/relations/#nested-relationships',
            icon: 'https://www.django-rest-framework.org/img/favicon.ico',
        }, {
            name: '事务',
            link: 'https://docs.djangoproject.com/zh-hans/5.2/topics/db/transactions/',
        }, {
            name: '执行查询',
            link: 'https://docs.djangoproject.com/zh-hans/5.2/topics/db/queries/',
        }, {
            name: '执行原生 SQL 查询',
            link: 'https://docs.djangoproject.com/zh-hans/5.2/topics/db/sql/',
        }
    ]
}
// TODO: 等待补充 Django 视图层、杂项等相关链接。
const groupKotlin: BookmarkGroup = {
    title: { text: 'Kotlin', link: '#kotlin' },
    items: [
        {
            name: 'Kotlin',
            link: 'https://kotlinlang.org/docs/home.html',
            icon: 'https://kotlinlang.org/assets/images/favicon.ico?v2',
        }, {
            name: 'JavaSE 8 API',
            link: 'https://docs.oracle.com/javase/8/docs/api/',
        }, {
            name: 'stdlib',
            link: 'https://kotlinlang.org/api/core/kotlin-stdlib/',
            icon: 'https://kotlinlang.org/assets/images/favicon.ico?v2',
            note: '标准库目录',
        }, {
            name: 'idioms',
            link: 'https://kotlinlang.org/docs/idioms.html',
            icon: 'https://kotlinlang.org/assets/images/favicon.ico?v2',
            note: '语法糖摘要',
        }, {
            name: 'Symbols precedence',
            link: 'https://kotlinlang.org/grammar/#expressions',
            icon: 'https://kotlinlang.org/assets/images/favicon.ico?v2',
            note: '运算符优先级',
        }, {
            name: 'Operator overloading',
            link: 'https://kotlinlang.org/docs/operator-overloading.html',
            icon: 'https://kotlinlang.org/assets/images/favicon.ico?v2',
            note: '运算符重载',
        }, {
            name: 'Scope functions',
            link: 'https://kotlinlang.org/docs/scope-functions.html',
            icon: 'https://kotlinlang.org/assets/images/favicon.ico?v2',
            note: '范围函数',
        }, {
            name: 'KDoc',
            link: 'https://kotlinlang.org/docs/kotlin-doc.html',
            icon: 'https://kotlinlang.org/assets/images/favicon.ico?v2',
            note: '代码内注释文档',
        }, {
            name: 'K2 compiler migration',
            link: 'https://kotlinlang.org/docs/k2-compiler-migration-guide.html',
            icon: 'https://kotlinlang.org/assets/images/favicon.ico?v2',
            note: 'K2 编译器迁移指南',
        }, {
            name: 'Kotlin 文档 中文版',
            link: 'https://book.kotlincn.net/text/home.html',
        }, {
            name: 'Maven Repository',
            link: 'https://mvnrepository.com/',
            icon: 'https://mvnrepository.com/assets/images/e8a73ff26e5b1e3f20868111d80c5544-favicon.ico',
        }, {
            name: 'Text Components',
            link: 'https://docs.oracle.com/javase/tutorial/uiswing/components/text.html',
            note: '几种文本组件的区别',
        }, {
            name: 'dom4j',
            link: 'https://dom4j.github.io/',
            note: 'Java XML 框架',
        }
    ]
}
const groupFrontend: BookmarkGroup = {
    title: { text: '前端', link: '#frontend' },
    items: [
        {
            name: 'HTML 元素参考',
            link: 'https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements',
            note: '<div/> 之类的东西',
        }, {
            name: 'HTML 实体',
            link: 'https://developer.mozilla.org/zh-CN/docs/Glossary/Entity',
            note: '&nbsp; 之类的东西',
        }, {
            name: 'HTML DOM 接口类型',
            link: 'https://developer.mozilla.org/zh-CN/docs/Web/API/HTML_DOM_API#html_dom_api_%E6%8E%A5%E5%8F%A3',
            note: 'HTMLDivElement 之类',
        }, {
            name: 'HTML 术语表',
            link: 'https://developer.mozilla.org/zh-CN/docs/Glossary',
            note: 'Glossary',
        }, {
            name: 'CSS 属性',
            link: 'https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Properties',
        }, {
            name: 'CSS 值函数',
            link: 'https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Values/Functions',
        }, {
            name: 'JavaScript 内置对象',
            link: 'https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects',
        }, {
            name: 'JavaScript 表达式和运算符',
            link: 'https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators',
        }, {
            name: 'TypeScript Cheat Sheets',
            link: 'https://www.typescriptlang.org/cheatsheets/',
        }, {
            name: 'Node.js API',
            link: 'https://nodejs.org/docs/latest/api/',
        }, {
            name: 'Node.js 版本状态',
            link: 'https://nodejs.org/zh-cn/about/previous-releases',
        }, {
            name: 'Vite 指引',
            link: 'https://cn.vite.dev/guide/',
            icon: 'https://cn.vite.dev/logo-without-border.svg',
            note: '前端构建工具',
        }, {
            name: 'Tailwind CSS',
            link: 'https://tailwindcss.com/docs/hover-focus-and-other-states',
            note: '纯样式库',
        }, {
            name: 'Customizing your theme',
            link: 'https://tailwindcss.com/docs/theme#customizing-your-theme',
        }, {
            name: 'GSAP',
            link: 'https://gsap.com/docs/v3/Eases/',
            note: '纯动效库',
        }, {
            name: 'GSAP Demo Hub',
            link: 'https://demos.gsap.com/explore/',
            note: 'GSAP 官方示例库',
        }, {
            name: 'Lodash',
            link: 'https://lodash.com/docs',
            note: '业务工具库',
        }
    ]
}
const groupVue: BookmarkGroup = {
    title: { text: 'Vue 3', link: '#vue' },
    items: [
        {
            name: 'Vue.js API 参考',
            link: 'https://cn.vuejs.org/api/',
            icon: 'https://cn.vuejs.org/logo.svg',
            note: 'JavaScript Web 框架',
        }, {
            name: 'Vue Router',
            link: 'https://router.vuejs.org/zh/',
            icon: 'https://router.vuejs.org/logo.svg',
            note: 'Vue.js 官方路由',
        }, {
            name: 'VueUse functions',
            link: 'https://vueuse.org/functions.html',
            note: 'Vue 组合式工具集',
        }, {
            name: 'Vben Admin',
            link: 'https://doc.vben.pro/',
            icon: 'https://unpkg.com/@vbenjs/static-source@0.1.7/source/logo-v1.webp',
            note: '企业级管理系统框架',
        }, {
            name: 'Element Plus 组件',
            link: 'https://element-plus.org/zh-CN/component/overview.html',
            icon: 'https://element-plus.org/images/element-plus-logo-small.svg',
            note: '面向 Vue 3',
        }, {
            name: 'Element 组件',
            link: 'https://element.eleme.cn/#/zh-CN/component/installation',
            note: '面向 Vue 2',
        }, {
            name: 'Ant Design Vue 组件',
            link: 'https://antdv.com/components/overview-cn',
        }, {
            name: 'Naive UI 组件',
            link: 'https://www.naiveui.com/zh-CN/dark/components/button',
            icon: 'https://www.naiveui.com/assets/naivelogo-BdDVTUmz.svg',
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
const groupVitePress: BookmarkGroup = {
    title: { text: 'VitePress', link: '#vitepress' },
    items: [
        {
            name: 'VitePress',
            link: 'https://vitepress.dev/zh/',
            icon: 'https://vitepress.dev/vitepress-logo-mini.svg',
            note: '静态站点生成器',
        }, {
            name: '伊奥\'s VitePress',
            link: 'https://vitepress.yiov.top/',
            icon: 'https://vitepress.yiov.top/logo.png',
            note: '快速上手中文教程',
        }, {
            name: 'Catppuccin Theme',
            link: 'https://vitepress.catppuccin.com/',
            icon: 'https://github.com/catppuccin/catppuccin/blob/main/assets/logos/exports/1544x1544_circle.png?raw=true',
            note: '多套颜色主题',
        }, {
            name: 'Carbon',
            link: 'https://carbon.breno.tech/',
            icon: 'https://carbon.breno.tech/logo.svg',
            note: '一个精简主题',
        }, {
            name: 'Mild Theme',
            link: 'https://theme.hacxy.cn/',
            note: '适用博客的默认主题+',
        }
    ]
}
const groupReact: BookmarkGroup = {
    title: { text: 'React', link: '#react' },
    items: [
        {
            name: 'Ant Design 组件',
            link: 'https://ant.design/components/overview-cn',
            icon: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
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
            name: 'PostgreSQL',
            link: 'https://www.postgresql.org/docs/current/index.html',
            note: '关系型数据库',
        }, {
            name: 'Data Types',
            link: 'https://www.postgresql.org/docs/current/datatype.html',
            note: '数据类型',
        }, {
            name: 'Data Types',
            link: 'https://dev.mysql.com/doc/refman/5.7/en/data-types.html',
            icon: 'https://labs.mysql.com/common/themes/sakila/favicon.ico',
            note: 'MySQL 5.7 数据类型',
        }, {
            name: 'Functions & Operators',
            link: 'https://www.postgresql.org/docs/current/functions.html',
            note: '函数与操作符',
        }, {
            name: 'SQL Commands',
            link: 'https://www.postgresql.org/docs/current/sql-commands.html',
            note: 'PostgreSQL 语句一览',
        }, {
            name: 'Commands',
            link: 'https://redis.io/docs/latest/commands/',
            note: 'Redis 命令列表',
        }, {
            name: 'Versioning Policy',
            link: 'https://www.postgresql.org/support/versioning/',
            note: 'PostgreSQL 更新策略',
        }
    ]
}
const groupIntelliJ: BookmarkGroup = {
    title: { text: 'IntelliJ', link: 'intellij' },
    items: [
        {
            name: 'Marketplace',
            link: 'https://plugins.jetbrains.com/',
            icon: 'https://resources.jetbrains.com/storage/ui/favicons/favicon.ico',
            note: '插件与主题市场',
        }, {
            name: '`plugin.xml`',
            link: 'https://plugins.jetbrains.com/docs/intellij/plugin-configuration-file.html',
            icon: 'https://www.jetbrains.com/favicon-32x32.png',
        }, {
            name: '`build.plugin.kts`',
            link: 'https://plugins.jetbrains.com/docs/intellij/tools-intellij-platform-gradle-plugin.html',
            icon: 'https://www.jetbrains.com/favicon-32x32.png',
            note: '2.x 版本',
        }, {
            name: '`build.gradle.kts`',
            link: 'https://plugins.jetbrains.com/docs/intellij/tools-gradle-intellij-plugin.html#usage',
            icon: 'https://www.jetbrains.com/favicon-32x32.png',
            note: '1.x 版本',
        }, {
            name: 'IntelliJ Platform SDK',
            link: 'https://plugins.jetbrains.com/docs/intellij/welcome.html',
            icon: 'https://www.jetbrains.com/favicon-32x32.png',
            note: '插件、语言、主题',
        }, {
            name: 'Bundled Plugins IDs',
            link: 'https://plugins.jetbrains.com/docs/intellij/plugin-dependencies.html#ids-of-bundled-plugins',
            icon: 'https://www.jetbrains.com/favicon-32x32.png',
            note: '各捆绑插件的ID',
        }, {
            name: 'product versions in use',
            link: 'https://plugins.jetbrains.com/docs/marketplace/product-versions-in-use-statistics.html',
            icon: 'https://www.jetbrains.com/favicon-32x32.png',
            note: '产品版本使用率统计',
        }, {
            name: 'UI Inspector',
            link: 'https://plugins.jetbrains.com/docs/intellij/internal-ui-inspector.html',
            icon: 'https://www.jetbrains.com/favicon-32x32.png',
            note: 'UI 检查器的用法',
        }, {
            name: 'Plugin Signing',
            link: 'https://plugins.jetbrains.com/docs/intellij/plugin-signing.html',
            icon: 'https://www.jetbrains.com/favicon-32x32.png',
            note: '插件签名教程',
        }, {
            name: 'Semantic versioning',
            link: 'https://plugins.jetbrains.com/docs/marketplace/semver.html',
            icon: 'https://www.jetbrains.com/favicon-32x32.png',
            note: '语义版本控制',
        }
    ]
}
const groupProtocol: BookmarkGroup = {
    title: { text: '协议 · 语法', link: '#protocol' },
    items: [
        {
            name: 'HTTP',
            link: 'https://developer.mozilla.org/zh-CN/docs/Web/HTTP',
            note: '超文本传输协议',
        }, {
            name: '常见 MIME 列表',
            link: 'https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Guides/MIME_types/Common_types',
        }, {
            name: 'OAuth 2.0',
            link: 'https://oauth.net/2/',
        }, {
            name: 'PNG 3',
            link: 'https://www.w3.org/TR/png-3/',
        }, {
            name: '正则表达式',
            link: 'https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Regular_Expressions',
        }, {
            name: 'JSON Schema',
            link: 'https://json-schema.org/specification',
        }, {
            name: 'YAML',
            link: 'https://yaml.org/',
            icon: 'https://yaml.org/assets/logo.png',
        }, {
            name: 'TOML',
            link: 'https://toml.io/en/',
            icon: 'https://toml.io/favicon.png',
        }, {
            name: 'Shiki Languages',
            link: 'https://shiki.style/languages',
            icon: 'https://shiki.style/logo.svg',
        }, {
            name: 'mermaid',
            link: 'https://mermaid.js.org/intro/',
        }
    ]
}
const groupMinecraft: BookmarkGroup = {
    title: { text: 'Minecraft', link: '#minecraft' },
    items: [
        {
            name: 'Minecraft 维基',
            link: 'https://zh.minecraft.wiki/w/Minecraft_Wiki',
            icon: 'https://zh.minecraft.wiki/images/Favicon.ico',
        }, {
            name: 'MC百科',
            link: 'https://www.mcmod.cn/',
            icon: 'https://www.mcmod.cn/images/favicon.ico',
        }, {
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
const groupMinecraftMods: BookmarkGroup = {
    title: { text: 'Minecraft 模组', link: 'mods' },
    items: [
        {
            name: '暮色森林',
            link: 'https://www.mcmod.cn/class/61.html',
            note: 'The Twilight Forest',
        }, {
            name: '群峦传说：次世代',
            link: 'https://www.mcmod.cn/class/2104.html',
            note: 'TerraFirmaCraft: The Next Generation',
        }
    ]
}
const groupChores: BookmarkGroup = {
    title: { text: '杂项', link: '#chores' },
    items: [
        {
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
    groupPythonEcosystem,
    groupDjangoEcosystem,
    groupDjangoSettings,
    groupDjangoModel,
    groupKotlin,
    groupFrontend,
    groupVue,
    groupVitePress,
    groupReact,
    groupNoSQL,
    groupIntelliJ,
    groupProtocol,
    groupMinecraft,
    groupMinecraftMods,
    groupChores,
]
for (const group of bookmarks) {
    for (const bookmark of group.items) {
        if (bookmark.name)
            bookmark.name = markit(bookmark.name)
        if (!bookmark.icon)
            bookmark.icon = `${new URL(bookmark.link).origin}/favicon.ico`
    }
}
