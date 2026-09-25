import type { BookmarkGroup, Website } from '@navifox/types';
import { markit } from '@navifox/utils';

const groupPythonChore: Website[] = [
    {
        text: 'uv',
        link: 'https://docs.astral.sh/uv/',
        icon: 'https://docs.astral.sh/uv/assets/favicon.ico',
        note: '一个包与项目管理器，Rust 写的炒鸡块',
    },
    {
        text: 'Django Packages',
        link: 'https://djangopackages.org/',
        icon: 'https://djangopackages.org/static/img/favicon.png',
        note: '查找可复用 Django 代码的目录',
    },
];
const groupPython: Website[] = [
    {
        text: '标准库',
        link: 'https://docs.python.org/zh-cn/3/library/index.html',
        logo: 'logos:python',
        tags: ['目录'],
    },
    {
        text: '语言参考',
        link: 'https://docs.python.org/zh-cn/3/reference/index.html',
        logo: 'logos:python',
        tags: ['目录'],
    },
    {
        text: '更新历史',
        link: 'https://docs.python.org/zh-cn/3/whatsnew/index.html',
        logo: 'logos:python',
        tags: ['目录'],
    },
    {
        text: '术语对照表',
        link: 'https://docs.python.org/zh-cn/3/glossary.html',
        logo: 'logos:python',
    },
    {
        text: '`+ - * /` 优先级',
        link: 'https://docs.python.org/zh-cn/3/reference/expressions.html#operator-precedence',
        logo: 'logos:python',
    },
    {
        text: '__特殊方法\\_\\_',
        link: 'https://docs.python.org/zh-cn/3/reference/datamodel.html#special-method-names',
        logo: 'logos:python',
    },
    {
        text: 'ABCs 抽象基类',
        link: 'https://docs.python.org/zh-cn/3/library/collections.abc.html#collections-abstract-base-classes',
        logo: 'logos:python',
    },
    {
        text: 'Exception 层次结构',
        link: 'https://docs.python.org/zh-cn/3/library/exceptions.html#exception-hierarchy',
        logo: 'logos:python',
        note: '内置异常',
    },
    {
        text: 'f-string',
        link: 'https://docs.python.org/zh-cn/3/reference/lexical_analysis.html#f-strings',
        logo: 'logos:python',
        note: '格式化字符串字面量',
    },
    {
        text: '格式规格迷你语言',
        link: 'https://docs.python.org/zh-cn/3/library/string.html#formatspec',
        logo: 'logos:python',
    },
    {
        text: '正则库 `re` 的函数',
        link: 'https://docs.python.org/zh-cn/3/library/re.html#functions',
        logo: 'logos:python',
    },
    {
        text: 'LogRecord 属性',
        link: 'https://docs.python.org/zh-cn/3/library/logging.html#logrecord-attributes',
        logo: 'logos:python',
    },
    {
        text: '十进制定点和浮点算术常见问题',
        link: 'https://docs.python.org/zh-cn/3/library/decimal.html#decimal-faq',
        logo: 'logos:python',
    },
    {
        text: 'Status of Python versions',
        link: 'https://devguide.python.org/versions/',
        logo: 'logos:python',
        note: '版本状态',
    },
    {
        text: 'Development cycle',
        link: 'https://devguide.python.org/developer-workflow/development-cycle/index.html',
        logo: 'logos:python',
        note: '发布节奏',
    },
];
const groupPythonLibs: Website[] = [
    {
        text: 'typing_extensions',
        link: 'https://typing-extensions.readthedocs.io/en/latest/#',
        icon: 'https://typing-extensions.readthedocs.io/favicon.ico',
        note: '标准库 typing 的跨版本兼容性代替',
    },
    {
        text: 'Requests',
        link: 'https://requests.readthedocs.io/en/latest/',
        icon: 'https://requests.readthedocs.io/favicon.ico',
        note: '优雅而易用的 HTTP 库',
    },
    {
        text: 'NumPy',
        link: 'https://numpy.org/doc/stable/reference/index.html',
        logo: 'logos:numpy',
        note: '行科学计算的基础核心库',
    },
    {
        text: 'Pandas',
        link: 'https://pandas.pydata.org/docs/reference/index.html',
        logo: 'logos:pandas-icon',
        note: '数据结构和数据分析工具',
    },
    {
        text: 'Celery',
        link: 'https://docs.celeryq.dev/en/stable/index.html',
        icon: 'https://docs.celeryq.dev/en/stable/_static/favicon.ico',
        note: '分布式消息队列',
    },
    {
        text: 'Pillow',
        link: 'https://pillow.readthedocs.io/en/stable/reference/index.html',
        icon: 'https://pillow.readthedocs.io/en/stable/_static/favicon.ico',
        note: '图像与图像文件处理工具',
    },
    {
        text: 'Click',
        link: 'https://click.palletsprojects.com/en/stable/api/',
        icon: 'https://click.palletsprojects.com/en/stable/_static/click-icon.svg',
        note: '少量代码创建命令行工具（CLI）',
    },
    {
        text: 'Selenium',
        link: 'https://www.selenium.dev/zh-cn/documentation/',
        logo: 'logos:selenium',
        note: '浏览器自动化工具',
    },
    {
        text: 'Playwright',
        link: 'https://playwright.dev/python/docs/intro',
        logo: 'logos:playwright',
        note: '新兴浏览器自动化工具',
    },
    {
        text: 'Prefab',
        link: 'https://prefab.prefect.io/docs/',
        note: '前端 UI 生成框架',
    },
    {
        text: 'django-environ',
        link: 'https://django-environ.readthedocs.io/en/latest/',
        icon: 'https://django-environ.readthedocs.io/favicon.ico',
        note: '让 Django 支持更多环境加载方式',
    },
    {
        text: 'Django OAuth Toolkit',
        link: 'https://django-oauth-toolkit.readthedocs.io/en/latest/',
        icon: 'https://django-oauth-toolkit.readthedocs.io/favicon.ico',
        note: '在 Django 中提供 OAuth 服务',
    },
];
const groupDjango: Website[] = [
    {
        text: 'Python 兼容性',
        link: 'https://docs.djangoproject.com/zh-hans/5.2/faq/install/#what-python-version-can-i-use-with-django',
        logo: 'logos:django-icon',
    },
    {
        text: '废弃时间表',
        link: 'https://docs.djangoproject.com/zh-hans/5.2/internals/deprecation/',
        logo: 'logos:django-icon',
    },
    {
        text: '发行流程',
        link: 'https://docs.djangoproject.com/zh-hans/5.2/internals/release-process/',
        logo: 'logos:django-icon',
        note: '版本号命名、发布节奏',
    },
    {
        text: 'PostgreSQL',
        link: 'https://docs.djangoproject.com/zh-hans/5.2/ref/contrib/postgres/',
        logo: 'logos:django-icon',
        note: '子模块',
        tags: ['目录'],
    },
    {
        text: '异常',
        link: 'https://docs.djangoproject.com/zh-hans/5.2/ref/exceptions/',
        logo: 'logos:django-icon',
    },
];
const groupDjangoConfigs: Website[] = [
    {
        text: 'Settings 参考',
        link: 'https://docs.djangoproject.com/zh-hans/5.2/ref/settings/',
        logo: 'logos:django-icon',
    },
    {
        text: '`REST_FRAMEWORK`',
        link: 'https://www.django-rest-framework.org/api-guide/settings/',
        icon: 'https://www.django-rest-framework.org/img/favicon.ico',
        note: 'REST Framework',
    },
    {
        text: '`OAUTH2_PROVIDER`',
        link: 'https://django-oauth-toolkit.readthedocs.io/en/latest/settings.html',
        note: 'Django OAuth Toolkit',
    },
    {
        text: '日志默认配置',
        link: 'https://docs.djangoproject.com/zh-hans/5.2/ref/logging/#default-logging-definition',
        logo: 'logos:django-icon',
    },
    {
        text: '`AppConfig` 配置',
        link: 'https://docs.djangoproject.com/zh-hans/5.2/ref/applications/#application-configuration',
        logo: 'logos:django-icon',
    },
];
const groupDjangoModel: Website[] = [
    {
        text: '模型',
        link: 'https://docs.djangoproject.com/zh-hans/5.2/ref/models/',
        logo: 'logos:django-icon',
        note: 'API 索引页',
        tags: ['目录'],
    },
    {
        text: '字段类型',
        link: 'https://docs.djangoproject.com/zh-hans/5.2/ref/models/fields/',
        logo: 'logos:django-icon',
    },
    {
        text: 'Serializer fields',
        link: 'https://www.django-rest-framework.org/api-guide/fields/',
        icon: 'https://www.django-rest-framework.org/img/favicon.ico',
        note: '序列化器字段',
    },
    {
        text: 'PostgreSQL 特有模型字段',
        link: 'https://docs.djangoproject.com/zh-hans/5.2/ref/contrib/postgres/fields/',
        logo: 'logos:django-icon',
    },
    {
        text: '自定义模型字段',
        link: 'https://docs.djangoproject.com/zh-hans/5.2/howto/custom-model-fields/',
        logo: 'logos:django-icon',
    },
    {
        text: '`Meta` 选项',
        link: 'https://docs.djangoproject.com/zh-hans/5.2/ref/models/options/',
        logo: 'logos:django-icon',
    },
    {
        text: '自定义 `Manager`',
        link: 'https://docs.djangoproject.com/zh-hans/5.2/topics/db/managers/#custom-managers',
        logo: 'logos:django-icon',
    },
    {
        text: '定制 User',
        link: 'https://docs.djangoproject.com/zh-hans/5.2/topics/auth/customizing/#substituting-a-custom-user-model',
        logo: 'logos:django-icon',
    },
    {
        text: '约束参考',
        link: 'https://docs.djangoproject.com/zh-hans/5.2/ref/models/constraints/',
        logo: 'logos:django-icon',
    },
    {
        text: 'Nested serialization',
        link: 'https://www.django-rest-framework.org/api-guide/relations/#nested-relationships',
        icon: 'https://www.django-rest-framework.org/img/favicon.ico',
    },
    {
        text: 'QuerySet 参考',
        link: 'https://docs.djangoproject.com/zh-hans/5.2/ref/models/querysets/',
        logo: 'logos:django-icon',
    },
    {
        text: '查询表达式',
        link: 'https://docs.djangoproject.com/zh-hans/5.2/ref/models/expressions/',
        logo: 'logos:django-icon',
    },
    {
        text: '数据库函数',
        link: 'https://docs.djangoproject.com/zh-hans/5.2/ref/models/database-functions/',
        logo: 'logos:django-icon',
    },
    {
        text: '执行查询',
        link: 'https://docs.djangoproject.com/zh-hans/5.2/topics/db/queries/',
        logo: 'logos:django-icon',
    },
    {
        text: '执行原生 SQL 查询',
        link: 'https://docs.djangoproject.com/zh-hans/5.2/topics/db/sql/',
        logo: 'logos:django-icon',
    },
    {
        text: '事务',
        link: 'https://docs.djangoproject.com/zh-hans/5.2/topics/db/transactions/',
        logo: 'logos:django-icon',
    },
    {
        text: '底层缓存 API',
        link: 'https://docs.djangoproject.com/zh-hans/5.2/topics/cache/#the-low-level-cache-api',
        logo: 'logos:django-icon',
    },
];
const groupDjangoView: Website[] = [
    {
        text: '请求类 `HttpRequest`',
        link: 'https://docs.djangoproject.com/zh-hans/5.2/ref/request-response/',
        logo: 'logos:django-icon',
    },
    {
        text: '响应类 `HttpResponse`',
        link: 'https://docs.djangoproject.com/zh-hans/5.2/ref/request-response/#httpresponse-objects',
        logo: 'logos:django-icon',
    },
    {
        text: '_class_ `Request`',
        link: 'https://www.django-rest-framework.org/api-guide/requests/',
        icon: 'https://www.django-rest-framework.org/img/favicon.ico',
        note: '请求对象',
    },
    {
        text: '_class_ `Responses`',
        link: 'https://www.django-rest-framework.org/api-guide/responses/',
        icon: 'https://www.django-rest-framework.org/img/favicon.ico',
        note: '响应对象',
    },
];
const groupKotlin: Website[] = [
    {
        text: 'stdlib',
        link: 'https://kotlinlang.org/api/core/kotlin-stdlib/',
        logo: 'logos:kotlin-icon',
        note: '标准库目录',
        tags: ['目录'],
    },
    {
        text: 'idioms',
        link: 'https://kotlinlang.org/docs/idioms.html',
        logo: 'logos:kotlin-icon',
        note: '语法糖摘要',
        tags: ['目录'],
    },
    {
        text: 'JavaSE 8',
        link: 'https://docs.oracle.com/javase/8/docs/api/',
        logo: 'logos:java',
        note: 'API 手册',
        tags: ['目录'],
    },
    {
        text: 'Symbols precedence',
        link: 'https://kotlinlang.org/grammar/#expressions',
        logo: 'logos:kotlin-icon',
        note: '运算符优先级',
    },
    {
        text: 'Operator overloading',
        link: 'https://kotlinlang.org/docs/operator-overloading.html',
        logo: 'logos:kotlin-icon',
        note: '运算符重载',
    },
    {
        text: 'Scope functions',
        link: 'https://kotlinlang.org/docs/scope-functions.html',
        logo: 'logos:kotlin-icon',
        note: '范围函数',
    },
    {
        text: 'KDoc',
        link: 'https://kotlinlang.org/docs/kotlin-doc.html',
        logo: 'logos:kotlin-icon',
        note: '代码内注释文档',
    },
    {
        text: 'K2 compiler migration',
        link: 'https://kotlinlang.org/docs/k2-compiler-migration-guide.html',
        logo: 'logos:kotlin-icon',
        note: 'K2 编译器迁移指南',
    },
    {
        text: 'Text Components',
        link: 'https://docs.oracle.com/javase/tutorial/uiswing/components/text.html',
        logo: 'logos:java',
        note: '几种文本组件的区别',
    },
];
const groupFrontend: Website[] = [
    {
        text: 'HTML 元素参考',
        link: 'https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements',
        logo: 'simple-icons:mdnwebdocs',
        note: '<div/> 之类',
    },
    {
        text: 'HTML 实体',
        link: 'https://developer.mozilla.org/zh-CN/docs/Glossary/Entity',
        logo: 'simple-icons:mdnwebdocs',
        note: '&nbsp; 之类',
    },
    {
        text: 'DOM 接口类型',
        link: 'https://developer.mozilla.org/zh-CN/docs/Web/API/HTML_DOM_API#html_dom_api_%E6%8E%A5%E5%8F%A3',
        logo: 'simple-icons:mdnwebdocs',
        note: 'HTMLDivElement 之类',
    },
    {
        text: 'HTML 术语表',
        link: 'https://developer.mozilla.org/zh-CN/docs/Glossary',
        logo: 'simple-icons:mdnwebdocs',
        note: 'Glossary',
    },
    {
        text: 'CSS 属性',
        link: 'https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Properties',
        logo: 'logos:css',
        note: '- MDN',
    },
    {
        text: 'CSS 伪元素',
        link: 'https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Selectors/Pseudo-elements',
        logo: 'logos:css',
        note: '- MDN',
    },
    {
        text: 'CSS 伪类',
        link: 'https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Selectors/Pseudo-classes',
        logo: 'logos:css',
        note: '- MDN',
    },
    {
        text: 'CSS 值函数',
        link: 'https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Values/Functions',
        logo: 'logos:css',
        note: '- MDN',
    },
    {
        text: 'JavaScript 内置对象',
        link: 'https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects',
        logo: 'logos:javascript',
        note: '- MDN',
    },
    {
        text: 'JavaScript 表达式和运算符',
        link: 'https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators',
        logo: 'logos:javascript',
        note: '- MDN',
    },
    {
        text: 'JavaScript 正则表达式标志',
        link: 'https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Regular_expressions#%E6%AD%A3%E5%88%99%E8%A1%A8%E8%BE%BE%E5%BC%8F%E6%A0%87%E5%BF%97',
        logo: 'logos:javascript',
        note: '- MDN',
    },
    {
        text: 'TypeScript Cheat Sheets',
        link: 'https://www.typescriptlang.org/cheatsheets/',
        logo: 'logos:typescript-icon',
    },
    {
        text: 'Node.js API',
        link: 'https://nodejs.org/docs/latest/api/',
        logo: 'logos:nodejs-icon-alt',
    },
    {
        text: 'Node.js 版本状态',
        link: 'https://nodejs.org/zh-cn/about/previous-releases',
        logo: 'logos:nodejs-icon-alt',
    },
    {
        text: 'CLI Commands',
        link: 'https://docs.npmjs.com/cli/v11/commands/npm',
        logo: 'devicon:npm',
    },
    {
        text: '`package.json`',
        link: 'https://docs.npmjs.com/cli/v11/configuring-npm/package-json',
        logo: 'devicon:npm',
    },
    {
        text: '`pnpm-workspace.yaml`',
        link: 'https://pnpm.io/zh/settings',
        logo: 'devicon:pnpm',
    },
];
const groupFrontendLibs: Website[] = [
    {
        text: 'Hover, focus... states',
        link: 'https://tailwindcss.com/docs/hover-focus-and-other-states#quick-reference',
        logo: 'logos:tailwindcss-icon',
        note: 'Tailwind 条件缩写',
    },
    {
        text: 'background-image',
        link: 'https://tailwindcss.com/docs/background-image',
        logo: 'logos:tailwindcss-icon',
        note: 'Tailwind 背景图片',
    },
    {
        text: 'Theme variable',
        link: 'https://tailwindcss.com/docs/theme#theme-variable-namespaces',
        logo: 'logos:tailwindcss-icon',
        note: '主题变量命名空间',
    },
    {
        text: 'GSAP Demo Hub',
        link: 'https://demos.gsap.com/explore/',
        note: 'GSAP 官方示例库',
    },
    {
        text: 'Lodash Docs',
        link: 'https://lodash.com/docs',
        logo: 'logos:lodash',
    },
    {
        text: 'es-toolkit 参考',
        link: 'https://es-toolkit.dev/zh_hans/reference/array/at.html',
    },
];
const groupVue: Website[] = [
    {
        text: 'Vue.js API 参考',
        link: 'https://cn.vuejs.org/api/',
        logo: 'logos:vue',
    },
    {
        text: 'VueUse functions',
        link: 'https://vueuse.org/functions.html',
        logo: 'logos:vueuse',
        note: 'Vue 组合式工具集',
    },
    {
        text: 'Element Plus 组件',
        link: 'https://element-plus.org/zh-CN/component/overview.html',
        icon: 'https://element-plus.org/images/element-plus-logo-small.svg',
        note: '面向 Vue 3',
    },
    {
        text: 'Element 组件',
        link: 'https://element.eleme.cn/#/zh-CN/component/installation',
        logo: 'logos:element',
        note: '面向 Vue 2',
    },
    {
        text: 'Ant Design Vue 组件',
        link: 'https://antdv.com/components/overview-cn',
    },
    {
        text: 'Naive UI 组件',
        link: 'https://www.naiveui.com/zh-CN/dark/components/button',
        logo: 'logos:naiveui',
    },
    {
        text: 'Reka UI 组件',
        link: 'https://reka-ui.com/docs/components/navigation-menu',
        icon: 'https://reka-ui.com/logo.svg',
        note: '散装无样式组件库',
    },
    {
        text: 'shadcn/vue 组件',
        link: 'https://www.shadcn-vue.com/docs/components',
        note: '散装组件库',
    },
];
const groupReact: Website[] = [
    {
        text: 'Ant Design 组件',
        link: 'https://ant.design/components/overview-cn',
        logo: 'devicon:antdesign',
    },
    {
        text: 'shadcn/ui',
        link: 'https://ui.shadcn.com/',
        note: '散装组件库',
    },
];
const groupStorage: Website[] = [
    {
        text: 'Data Types',
        link: 'https://www.postgresql.org/docs/current/datatype.html',
        logo: 'logos:postgresql',
        note: '数据类型',
    },
    {
        text: 'Data Types',
        link: 'https://dev.mysql.com/doc/refman/5.7/en/data-types.html',
        logo: 'logos:mysql',
        note: 'MySQL 5.7 数据类型',
    },
    {
        text: 'SQL Commands',
        link: 'https://www.postgresql.org/docs/current/sql-commands.html',
        logo: 'logos:postgresql',
        note: '语句一览',
    },
    {
        text: 'Commands',
        link: 'https://redis.io/docs/latest/commands/',
        logo: 'logos:redis',
        note: 'Redis 命令列表',
    },
    {
        text: 'Functions & Operators',
        link: 'https://www.postgresql.org/docs/current/functions.html',
        logo: 'logos:postgresql',
        note: '函数与操作符',
    },
    {
        text: 'Versioning Policy',
        link: 'https://www.postgresql.org/support/versioning/',
        logo: 'logos:postgresql',
        note: '更新策略',
    },
];
const groupIntelliJ: Website[] = [
    {
        text: 'SDK',
        link: 'https://plugins.jetbrains.com/docs/intellij/welcome.html',
        logo: 'vscode-icons:file-type-jetbrains',
        note: '插件、语言、主题',
        tags: ['目录'],
    },
    {
        text: '`plugin.xml`',
        link: 'https://plugins.jetbrains.com/docs/intellij/plugin-configuration-file.html',
        logo: 'vscode-icons:file-type-jetbrains',
        note: '插件配置文件',
    },
    {
        text: '`build.plugin.kts`',
        link: 'https://plugins.jetbrains.com/docs/intellij/tools-intellij-platform-gradle-plugin.html',
        logo: 'vscode-icons:file-type-jetbrains',
        note: '插件 Gradle 构建配置 2.x 版本',
    },
    {
        text: '`build.gradle.kts`',
        link: 'https://plugins.jetbrains.com/docs/intellij/tools-gradle-intellij-plugin.html#usage',
        logo: 'vscode-icons:file-type-jetbrains',
        note: '插件 Gradle 构建配置 1.x 版本',
    },
    {
        text: 'Bundled Plugins IDs',
        link: 'https://plugins.jetbrains.com/docs/intellij/plugin-dependencies.html#ids-of-bundled-plugins',
        logo: 'vscode-icons:file-type-jetbrains',
        note: '各捆绑插件的ID',
    },
    {
        text: 'product versions in use',
        link: 'https://plugins.jetbrains.com/docs/marketplace/product-versions-in-use-statistics.html',
        logo: 'vscode-icons:file-type-jetbrains',
        note: '产品版本使用率统计',
    },
    {
        text: 'UI Inspector',
        link: 'https://plugins.jetbrains.com/docs/intellij/internal-ui-inspector.html',
        logo: 'vscode-icons:file-type-jetbrains',
        note: 'UI 检查器的用法',
    },
    {
        text: 'Plugin Signing',
        link: 'https://plugins.jetbrains.com/docs/intellij/plugin-signing.html',
        logo: 'vscode-icons:file-type-jetbrains',
        note: '插件签名教程',
    },
    {
        text: 'Semantic versioning',
        link: 'https://plugins.jetbrains.com/docs/marketplace/semver.html',
        logo: 'vscode-icons:file-type-jetbrains',
        note: '语义版本控制',
    },
];
const groupMarkdown: Website[] = [
    {
        text: '基本撰写和格式语法',
        link: 'https://docs.github.com/zh/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax',
        logo: 'simple-icons:github',
    },
    {
        text: 'Markdown 备忘清单',
        link: 'https://quickref.cn/docs/markdown.html',
        icon: 'https://quickref.cn/icons/favicon.svg',
        mime: 'image/svg+xml',
    },
    {
        text: 'Markdown cheatsheet',
        link: 'https://cheatsheets.zip/markdown',
        icon: 'https://cheatsheets.zip/images/favicon.png?v=1',
        mime: 'image/png',
    },
    {
        text: 'Mermaid',
        link: 'https://mermaid.js.org/intro/',
    },
    {
        text: '待办任务列表',
        link: 'https://docs.github.com/zh/get-started/writing-on-github/working-with-advanced-formatting/about-task-lists',
        logo: 'simple-icons:github',
    },
    {
        text: '表格',
        link: 'https://docs.github.com/zh/get-started/writing-on-github/working-with-advanced-formatting/organizing-information-with-tables',
        logo: 'simple-icons:github',
    },
    {
        text: '警报',
        link: 'https://docs.github.com/zh/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax#alerts',
        logo: 'simple-icons:github',
        note: '提示类组件',
    },
    {
        text: '折叠',
        link: 'https://docs.github.com/zh/get-started/writing-on-github/working-with-advanced-formatting/organizing-information-with-collapsed-sections',
        logo: 'simple-icons:github',
    },
    {
        text: '代码块→语法着色',
        link: 'https://docs.github.com/zh/get-started/writing-on-github/working-with-advanced-formatting/creating-and-highlighting-code-blocks',
        logo: 'simple-icons:github',
    },
    {
        text: '创建 Mermaid 关系图',
        link: 'https://docs.github.com/zh/get-started/writing-on-github/working-with-advanced-formatting/creating-diagrams',
        logo: 'simple-icons:github',
    },
    {
        text: '自动链接引用和 URL',
        link: 'https://docs.github.com/zh/get-started/writing-on-github/working-with-advanced-formatting/autolinked-references-and-urls',
        logo: 'simple-icons:github',
        note: '仅限 GitHub',
    },
    {
        text: '编写数学表达式',
        link: 'https://docs.github.com/zh/get-started/writing-on-github/working-with-advanced-formatting/writing-mathematical-expressions',
        logo: 'simple-icons:github',
        note: '参考 LaTeX 语法',
    },
    {
        text: 'GitHub Flavored Markdown Spec',
        link: 'https://github.github.com/gfm/',
        logo: 'simple-icons:github',
    },
];
const groupMarkdownVitePress: Website[] = [
    {
        text: '自定义容器',
        link: 'https://vitepress.dev/zh/guide/markdown#custom-containers',
        icon: 'https://vitepress.dev/vitepress-logo-mini.svg',
        mime: 'image/svg+xml',
        note: 'VitePress 专属',
    },
    {
        text: '代码块→语法着色',
        link: 'https://vitepress.dev/zh/guide/markdown#syntax-highlighting-in-code-blocks',
        icon: 'https://vitepress.dev/vitepress-logo-mini.svg',
        mime: 'image/svg+xml',
        note: 'VitePress 专属',
    },
    {
        text: '代码块→行高亮',
        link: 'https://vitepress.dev/zh/guide/markdown#line-highlighting-in-code-blocks',
        icon: 'https://vitepress.dev/vitepress-logo-mini.svg',
        mime: 'image/svg+xml',
        note: 'VitePress 专属',
    },
    {
        text: '代码块→聚焦',
        link: 'https://vitepress.dev/zh/guide/markdown#line-highlighting-in-code-blocks',
        icon: 'https://vitepress.dev/vitepress-logo-mini.svg',
        mime: 'image/svg+xml',
        note: 'VitePress 专属',
    },
    {
        text: '代码块→颜色差异',
        link: 'https://vitepress.dev/zh/guide/markdown#line-highlighting-in-code-blocks',
        icon: 'https://vitepress.dev/vitepress-logo-mini.svg',
        mime: 'image/svg+xml',
        note: 'VitePress diff',
    },
    {
        text: '代码块→行号',
        link: 'https://vitepress.dev/zh/guide/markdown#line-numbers',
        icon: 'https://vitepress.dev/vitepress-logo-mini.svg',
        mime: 'image/svg+xml',
        note: 'VitePress 专属',
    },
    {
        text: 'Shiki Languages',
        link: 'https://shiki.style/languages',
        icon: 'https://shiki.style/logo.svg',
    },
    {
        text: '配置数学表达式',
        link: 'https://vitepress.dev/zh/guide/markdown#math-equations',
        icon: 'https://vitepress.dev/vitepress-logo-mini.svg',
        mime: 'image/svg+xml',
        note: '参考 LaTeX 语法',
    },
];
const groupMarkupLanguages: Website[] = [
    {
        text: 'JSON `$schema`',
        link: 'https://json-schema.org/specification',
        logo: 'logos:json-schema-icon',
        note: '描述 JSON 的 JSON',
    },
    {
        text: 'TOML 文档',
        link: 'https://toml.io/cn/',
        logo: 'logos:toml',
    },
    {
        text: 'LaTeX 备忘清单',
        link: 'https://quickref.cn/docs/latex.html',
        icon: 'https://quickref.cn/icons/favicon.svg',
        mime: 'image/svg+xml',
    },
    {
        text: 'LaTeX cheatsheet',
        link: 'https://cheatsheets.zip/latex',
        icon: 'https://cheatsheets.zip/images/favicon.png?v=1',
        mime: 'image/png',
    },
    {
        text: 'reStructuredText Primer',
        link: 'https://www.sphinx-doc.org/en/master/usage/restructuredtext/basics.html',
        logo: 'simple-icons:sphinx',
    },
    {
        text: 'reStructuredText markup',
        link: 'https://devguide.python.org/documentation/markup/',
        logo: 'logos:python',
    },
    {
        text: 'AsciiDoc Language Documentation',
        link: 'https://docs.asciidoctor.org/asciidoc/latest/',
        logo: 'logos:asciidoctor',
    },
];
const groupSearchEngine: Website[] = [
    {
        text: 'Search Operators',
        link: 'https://duckduckgo.com/duckduckgo-help-pages/results/syntax',
        logo: 'logos:duckduckgo',
        note: 'DuckDuckGo',
    },
    {
        text: '优化搜索范围',
        link: 'https://support.google.com/websearch?p=adv_operators&hl=zh-CN',
        logo: 'logos:google-icon',
        note: 'Google',
    },
    {
        text: 'Google Advanced Search Operators',
        link: 'https://docs.google.com/document/d/1ydVaJJeL1EYbWtlfj9TPfBTE5IBADkQfZrQaBZxqXGs/edit',
        logo: 'logos:google-icon',
    },
    {
        text: '高级搜索选项',
        link: 'https://support.microsoft.com/zh-cn/topic/%E9%AB%98%E7%BA%A7%E6%90%9C%E7%B4%A2%E9%80%89%E9%A1%B9-b92e25f1-0085-4271-bdf9-14aaea720930',
        logo: 'logos:bing',
        note: '必应',
    },
    {
        text: 'Bing Advanced search options',
        link: 'https://support.microsoft.com/en-us/topic/advanced-search-options-b92e25f1-0085-4271-bdf9-14aaea720930',
        logo: 'logos:bing',
    },
    {
        text: '代码搜索语法',
        link: 'https://docs.github.com/zh/search-github/github-code-search/understanding-github-code-search-syntax',
        logo: 'simple-icons:github',
        note: 'GitHub',
    },
    {
        text: 'Searching Syntax',
        link: 'https://www.voidtools.com/support/everything/searching/',
        note: 'Everything',
    },
];
const groupMinecraft: Website[] = [
    {
        text: 'Java版本记录',
        link: 'https://zh.minecraft.wiki/w/Java%E7%89%88%E7%89%88%E6%9C%AC%E8%AE%B0%E5%BD%95',
    },
    {
        text: '版本更新简表',
        link: 'https://zh.moegirl.org.cn/%E6%88%91%E7%9A%84%E4%B8%96%E7%95%8C(%E6%B8%B8%E6%88%8F)/%E7%89%88%E6%9C%AC%E6%9B%B4%E6%96%B0%E6%97%A5%E5%BF%97',
    },
    {
        text: '物品列表',
        link: 'https://zh.minecraft.wiki/w/%E7%89%A9%E5%93%81#%E7%89%A9%E5%93%81%E5%88%97%E8%A1%A8',
    },
    {
        text: '方块列表',
        link: 'https://zh.minecraft.wiki/w/%E6%96%B9%E5%9D%97#%E6%96%B9%E5%9D%97%E5%88%97%E8%A1%A8',
    },
    {
        text: '生物列表',
        link: 'https://zh.minecraft.wiki/w/%E7%94%9F%E7%89%A9#%E7%94%9F%E7%89%A9%E5%88%97%E8%A1%A8',
        icon: 'https://zh.minecraft.wiki/images/Favicon.ico',
    },
    {
        text: '命令列表，及其概述',
        link: 'https://zh.minecraft.wiki/w/%E5%91%BD%E4%BB%A4#%E5%91%BD%E4%BB%A4%E5%88%97%E8%A1%A8%E5%8F%8A%E5%85%B6%E6%A6%82%E8%BF%B0',
    },
    {
        text: '附魔 - 魔咒列表',
        link: 'https://zh.minecraft.wiki/w/%E9%AD%94%E5%92%92#%E6%89%80%E6%9C%89%E9%AD%94%E5%92%92',
    },
    {
        text: '附魔 - 手持物品魔咒',
        link: 'https://zh.minecraft.wiki/w/%E9%AD%94%E5%92%92#%E6%89%8B%E6%8C%81%E7%89%A9%E5%93%81%E9%AD%94%E5%92%92',
    },
    {
        text: '附魔 - 盔甲位物品魔咒',
        link: 'https://zh.minecraft.wiki/w/%E9%99%84%E9%AD%94#%E7%9B%94%E7%94%B2%E4%BD%8D%E7%89%A9%E5%93%81%E9%AD%94%E5%92%92',
    },
    {
        text: '工具物品耐久',
        link: 'https://zh.minecraft.wiki/w/%E5%B7%A5%E5%85%B7#%E7%89%A9%E5%93%81%E8%80%90%E4%B9%85',
    },
    {
        text: '生物族群及特征',
        link: 'https://zh.minecraft.wiki/w/%E7%94%9F%E7%89%A9#%E7%94%9F%E7%89%A9%E6%97%8F%E7%BE%A4',
    },
    {
        text: '药水酿造',
        link: 'https://zh.minecraft.wiki/w/%E8%8D%AF%E6%B0%B4%E9%85%BF%E9%80%A0',
    },
    {
        text: '数据包',
        link: 'https://zh.minecraft.wiki/w/%E6%95%B0%E6%8D%AE%E5%8C%85',
    },
    {
        text: '食物 - 营养价值',
        link: 'https://zh.minecraft.wiki/w/%E9%A3%9F%E7%89%A9#%E8%90%A5%E5%85%BB%E4%BB%B7%E5%80%BC',
    },
    {
        text: '村民职业与交易选项及站点方块',
        link: 'https://zh.minecraft.wiki/w/%E4%BA%A4%E6%98%93#%E6%9D%91%E6%B0%91%E8%81%8C%E4%B8%9A%E4%B8%8E%E4%BA%A4%E6%98%93%E9%80%89%E9%A1%B9',
    },
    {
        text: '高度 - 历史变更',
        link: 'https://zh.minecraft.wiki/w/%E9%AB%98%E5%BA%A6#%E5%8E%86%E5%8F%B2',
    },
];
const groupChores: Website[] = [
    {
        text: '语义化版本号',
        link: 'https://semver.org/lang/zh-CN/',
        icon: 'https://semver.org/assets/500x500(light).jpg',
        note: 'SemVer 控制规范',
    },
    {
        text: '约定式提交',
        link: 'https://www.conventionalcommits.org/zh-hans/v1.0.0/',
        icon: 'https://www.conventionalcommits.org/favicon.ico',
        note: '约定俗成的 git 提交消息规范',
    },
    {
        text: '如何维护更新日志 `CHANGELOG.md`',
        link: 'https://keepachangelog.com/zh-CN/1.1.0/',
        icon: 'https://keepachangelog.com/assets/images/favicon.ico',
    },
    {
        text: '编写有效的 `CLAUDE.md`',
        link: 'https://code.claude.com/docs/zh-CN/best-practices#write-an-effective-claude-md',
        logo: 'logos:claude-icon',
    },
    {
        text: 'HTTP 状态响应码',
        link: 'https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Reference/Status',
        logo: 'simple-icons:mdnwebdocs',
    },
    {
        text: '常见 MIME 列表',
        link: 'https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Guides/MIME_types/Common_types',
        logo: 'simple-icons:mdnwebdocs',
    },
    {
        text: 'Prettier Configuration',
        link: 'https://prettier.io/docs/options',
        logo: 'logos:prettier',
    },
    {
        text: 'EditorConfig',
        link: 'https://spec.editorconfig.org/',
        logo: 'logos:editorconfig',
    },
];

export const bookmarks: BookmarkGroup[] = [
    {
        category: 'more',
        items: groupChores,
    },
    {
        category: 'python',
        items: groupPythonChore,
    },
    {
        category: 'python',
        title: { text: 'Python', link: '#python' },
        items: groupPython,
    },
    {
        category: 'python',
        title: { text: 'Python 包', link: '#python-libs' },
        items: groupPythonLibs,
    },
    {
        category: 'python',
        title: { text: 'Django ORM', link: '#django-orm' },
        items: groupDjangoModel,
    },
    {
        category: 'python',
        title: { text: 'Django 配置', link: '#django-configs' },
        items: groupDjangoConfigs,
    },
    {
        category: 'python',
        title: { text: 'Django 视图层', link: '#django-view' },
        items: groupDjangoView,
    },
    {
        category: 'python',
        title: { text: 'Django', link: '#django' },
        items: groupDjango,
    },
    {
        category: 'node',
        title: { text: '前端', link: '#frontend' },
        items: groupFrontend,
    },
    {
        category: 'node',
        title: { text: '前端样式', link: '#frontend-style' },
        items: groupFrontendLibs,
    },
    {
        category: 'node',
        title: { text: 'Vue 3', link: '#vue' },
        items: groupVue,
    },
    {
        category: 'node',
        title: { text: 'React', link: '#react' },
        items: groupReact,
    },
    {
        category: 'java',
        title: { text: 'Kotlin', link: '#kotlin' },
        items: groupKotlin,
    },
    {
        category: 'java',
        title: { text: 'IntelliJ', link: 'intellij' },
        items: groupIntelliJ,
    },
    {
        category: 'more',
        title: { text: '存储层', link: '#storage' },
        items: groupStorage,
    },
    {
        category: 'more',
        title: { text: 'Markdown', link: '#markdown' },
        items: groupMarkdown,
    },
    {
        category: 'more',
        items: groupMarkdownVitePress,
    },
    {
        category: 'more',
        title: { text: '标记语言', link: '#markup' },
        items: groupMarkupLanguages,
    },
    {
        category: 'more',
        title: { text: '搜索引擎', link: '#search-engine' },
        items: groupSearchEngine,
    },
    {
        category: 'more',
        title: { text: 'Minecraft', link: '#minecraft' },
        items: groupMinecraft,
    },
];
for (const group of bookmarks) {
    if (group.title) group.title.anchor = group.title.link.substring(1);

    for (const bookmark of group.items) {
        if (bookmark.text) bookmark.text = markit(bookmark.text);
        if (!bookmark.logo && !bookmark.icon) bookmark.icon = `${new URL(bookmark.link).origin}/favicon.ico`;
    }
}
