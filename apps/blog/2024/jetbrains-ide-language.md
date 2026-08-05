---
title: 设置 JetBrains IDE 的语言
createAt: 2024-12-30 00:55
expires: 1096
tags:
    - 开发
    - i18n
    - IntelliJ IDE
    - 配置
excerpt:
    帮助新手修改包括 PyCharm、IDEA、WebStorm、GoLand、PhpStorm 等集成开发环境（IDE）的语言。
---

<style scoped>
.VPDoc p:not(.custom-block-title) {
    text-indent: 2em;
}
</style>

## 2024.2+ 版本

从这一版本开始内置了语言插件，不必再另外下载安装，只需点击左上角菜单 → _File_ → _Settings_ 打开设置面板（见下方示意图），然后找到 _Appearance & Behavior_ → _System Settings_ → _Language and Region_ 更改 **Language** 的选项并重启即可。

![](/media/jetbrains-ide-language-settings.png)

当然，如果还未打开任何项目，可以在欢迎页找到 Customize 标签页的 Language and Region 部分（见下方示意图）来更改 **Language** 的选项并重启。

![](/media/jetbrains-ide-language-welcome.png)

## 2020.1.1+ 版本

从这一版本开始可以通过插件市场安装语言插件，搜索 `中文` `Chinese` `language pack` 或者直接搜索插件分类标签 `/tag:"Language Pack"` 都可以找到。

![](/media/jetbrains-ide-language-plugins.png)

## 更旧的版本

旧版本没有官方组织的语言支持，需要寻找对应版本的 `resources_cn.jar` 或 `resources_zh_CN.jar` 放入到安装目录的 `lib` 目录下。

> [!WARNING] 注意
> 1. 由于年代过于久远、版本过于分散，此处无法提供相应资源下载。
> 2. 尽量从[官方网站](https://www.jetbrains.com/)下载、安装时保持默认选项，以便确保桌面上有应用图标。
> 3. 以下步骤仅针对 Windows 系统。

1. 首先关闭软件。
2. 右键点击桌面图标，选择菜单“打开文件所在位置”；如果只有“打开文件位置”，那么要在打开的窗口中选择选中的图标，再次右键“打开文件所在位置”。
3. 现在应该处在 `C:\Program Files\JetBrains\PyCharm\bin` 或  
   `C:\Program Files (x86)\JetBrains\PyCharm\bin` 文件夹里。
4. 接着返回上一级文件夹，找到 `lib` 目录，点击进入。
5. 将对应版本的 `resources_cn.jar` 或 `resources_zh_CN.jar` 放入到这个目录中，然后重新打开软件。
6. 如果软件无法打开，可以检查软件版本与 Java 版本是否匹配；如果仍然无法解决，建议找大佬看看。
