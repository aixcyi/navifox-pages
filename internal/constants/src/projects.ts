import type { ProjectInfo } from '@navifox/types';

export const projects: ProjectInfo[] = [
    {
        name: 'Zeraora',
        description: '一个 Python 工具包，包含一堆杂七杂八的工具，大部分都是从日常业务代码里提取抽象的，有些是为了保障兼容性，希望能帮你少写几行代码。',
        documentation: '/zeraora/',
        typeIco: 'devicon-plain:python',
        socials: [
            { icon: 'simple-icons:github', link: 'https://github.com/aixcyi/Zeraora' },
            { icon: 'devicon-plain:pypi', link: 'https://pypi.org/project/Zeraora' },
        ]
    }, {
        name: 'Python Dunder All',
        description: '一个 PyCharm 插件，提供 <code>__all__</code> 的生成与格式化能力，包括列表顺序的调整、引号风格的切换、换行方式的转换等。',
        documentation: '',
        typeIco: 'devicon-plain:pycharm',
        socials: [
            { icon: 'simple-icons:github', link: 'https://github.com/aixcyi/intellij-dunder-all' },
            {
                icon: 'simple-icons:jetbrains',
                link: 'https://plugins.jetbrains.com/plugin/24821-hootool--python-dunder-all'
            },
        ]
    }, {
        name: 'Shebang',
        description: '一个 IntelliJ IDE 插件，提供 shebang 的插入与管理。',
        documentation: '',
        typeIco: 'devicon-plain:intellij',
        socials: [
            { icon: 'simple-icons:github', link: 'https://github.com/aixcyi/intellij-shebang' },
            { icon: 'simple-icons:jetbrains', link: 'https://plugins.jetbrains.com/plugin/24907-hootool--shebang' },
        ]
    }
]
