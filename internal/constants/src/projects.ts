import type { Website } from '@navifox/types';

export const projectZeraora: Website = {
    text: 'Zeraora',
    link: 'https://pypi.org/project/Zeraora',
    path: '/zeraora/',
    descriptionPure:
        '一个 Python 工具包，包含一堆杂七杂八的工具，大部分都是从日常业务代码里提取抽象的，有些是为了保障兼容性，希望能帮你少写几行代码。',
    documentationUrl: 'https://docs.navifox.net/zeraora/',
    repositoryUrl: 'https://github.com/aixcyi/Zeraora',
};
export const projectDunderAll: Website = {
    text: 'Python Dunder All',
    link: 'https://plugins.jetbrains.com/plugin/24821-hootool--python-dunder-all',
    descriptionRich:
        '一个 PyCharm 插件，提供 `__all__` 的生成与格式化能力，包括列表顺序的调整、引号风格的切换、换行方式的转换等。',
    documentationUrl: '',
    repositoryUrl: 'https://github.com/aixcyi/intellij-dunder-all',
};
export const projectShebang: Website = {
    text: 'Shebang',
    link: 'https://plugins.jetbrains.com/plugin/24907-hootool--shebang',
    descriptionPure: '一个 IntelliJ IDE 插件，提供 shebang 的插入与管理。',
    documentationUrl: '',
    repositoryUrl: 'https://github.com/aixcyi/intellij-shebang',
};

export const projects = [
    projectZeraora,
    projectDunderAll,
    projectShebang,
    //
];
