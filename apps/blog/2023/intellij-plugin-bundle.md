---
title: IntelliJ 插件中使用 Bundle
createAt: 2023-09-06 23:32
expires: 365
tags:
    - 开发
    - IntelliJ IDE
    - 插件
    - i18n
excerpt:
    Bundle 是 Java 自带的提供本地化翻译的功能，因为出现时间比 IntelliJ
    早得多得多，所以如果需要让插件语言跟随用户安装的语言包插件来切换，就要进行一定的适配。
---

<style scoped>
.VPDoc p:not(.custom-block-title) {
    text-indent: 2em;
}
</style>

<LinkCard href="https://blog.jetbrains.com/zh-hans/idea/2021/07/language-packs-public-release/"
          text="基于 IntelliJ 的 IDE，完全中文化版本现已就绪！" />

在插件市场中搜索 `/tag:"Language Pack"` 可以快速罗列所有语言包。然而，自语言包正式发布开始后，截至帖子发布时，三年多以来仅有中、日、韩三个语言包。

正因语言包不能涵盖大部分（甚至“部分”都谈不上）非英语语言，所以笔者认为 IntelliJ 插件多语言适配应当是以语言包为先、本地语言为次、最后以英语保底，而不应只以语言包为准，这是不现实的。

而 Bundle 本身就具备根据本地语言进行协变的能力，可以解决“以本地语言为次、以英语保底”的需求，而想要做到“以语言包为先”，只需要在
`ResourceBundle.getBundle("{YourBundle}")` 时将第二个参数设置为 `DynamicBundle.getLocale()` 即可，它可以正确检索到IDE当前的文字语言。

但也正因为 Bundle 的这个特性，导致很难在诸如 **中文环境下的英文IDE** 中以及插件中英双语兼备的情况下，将插件切换为英文。因为当我们尝试使用
`en` 的 Bundle 时，它会自动协变到 `zh-cn` 的 Bundle 继而显示中文。

以下是截取自笔者部分开源代码的完整示例：

```java :line-numbers
package net.navifox.plugin.tinysnake;

import com.intellij.DynamicBundle;
import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.PropertyKey;

import java.util.ResourceBundle;

/**
 * 提供本地化能力的工具类。
 *
 * @author <a href="https://github.com/aixcyi">路狐羽</a>
 */
public class Translation {

    public final static ResourceBundle BUNDLE =
            ResourceBundle.getBundle(
                    "messages.TinySnakeBundle",
                    DynamicBundle.getLocale()
            );

    /**
     * 快捷获取本地化翻译的工具函数。
     *
     * @param key properties文件中的键。
     * @return properties文件中键对应的值。
     */
    public static @NotNull String $message(
            @NotNull
            @PropertyKey(resourceBundle = "messages.TinySnakeBundle")
            String key
    ) {
        return BUNDLE.getString(key);
    }
}
```

其中 `messages.TinySnakeBundle` 指向文件 `src/main/resources/messages/TinySnakeBundle.properties`，假设其中存在键值对 `action.OptimizeDunderAllAction.text=优化 __all__ (&O)`，则用法如下：

```java :line-numbers
package net.navifox.plugin.tinysnake.testing;

import static net.navifox.plugin.tinysnake.Translation.$message;

public class MainTest {
    public static void main(String[] args) {
        System.out.println($message("action.OptimizeDunderAllAction.text"));
    }
}
```

将会输出

```text
优化 __all__ (&O)
```

> [!IMPORTANT] 注意
> 所有 properties 文件里面都应该有相同的键名。

> [!NOTE] 备注
> [中文语言包](https://plugins.jetbrains.com/plugin/13710-chinese-simplified-language-pack----)等插件最早支持 [2020.3](https://plugins.jetbrains.com/plugin/13710-chinese-simplified-language-pack----/versions/stable/121167) 版本。
