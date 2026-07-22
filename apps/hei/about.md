---
title: 关于
aside: false
---

<script setup lang="ts">
import SpiritForm from '#/theme/components/SpiritForm.vue';
import IDTestLinkCard from '#/theme/components/IDTestLinkCard.vue';
</script>

# 关于

《蓝溪拾遗》辑录了联谊的会馆与通联的妖灵、维系着妖灵们的友情链接，是罗小黑世界架构下的设定集与友链簿，由[罗狐会馆](/guild/foxery)编撰发行。

网站功能点主要集中在两个方面：一是汇集原著中的设定，备忘备查；二是以原创妖灵设定的方式展示友情链接。

> [!TIP] 声明  
> 本网站与现实作品及创作团队并无任何关联，仅为官方作品设定与二次创作设定的信息汇编，并以友情链接的方式呈现。

欢迎各位妖精与人类前来通联，也欢迎馆长参与联谊。

## 妖灵通联申请 {#spirit}

将你喜爱的原创妖灵设定收录到《蓝溪拾遗》中（参见[演示页](/spirit/navifox)），并一直存续下去，直至永远。

填写以下表单并复制**生成结果**，随后前往[罗狐会馆](/guild/foxery)联系馆长或常驻妖灵。目前暂时只支持一个设定，如果有多个设定，或者区分OC与本体，请选择一个最能代表自己或最喜爱的设定。提交前需要至少满足以下其中两点：

- 有位于一级域名的个人主页或博客，并添加了友链。
- 有基于罗小黑世界架构的详细原创设定。
- 由馆长添加。

<SpiritForm />

## 会馆联谊 {#guild}

将原创的“妖灵会馆”收录到《蓝溪拾遗》中并附上传送门（参见[演示页](/guild/foxery)），并一直存续下去，直至永远。

### 步骤

1. 按照[会馆详情页模板](#会馆详情页模板)填写会馆设定。
2. 整理馆长与常驻妖灵的信息，按照[指引卡片信息](#指引卡片信息)和[妖灵详情页模板](#妖灵详情页模板)填写。
3. 前往[罗狐会馆](/guild/foxery)联系馆长或常驻妖灵们提交，也欢迎参考[提交指南](/contribute)直接修改源码。

### 注意事项

- 如果有多个会馆名称分布在不同渠道，需要选择一个最喜爱、最广为认可的一个，并在全渠道同步。
- 提交前馆长需要至少满足以下其中两点：
  - 有位于一级域名的个人主页或博客，并添加了友链。
  - 有基于罗小黑世界架构的详细原创设定。
  - 有超过20位活跃成员。

### 会馆详情页模板

```markdown
---
title: 会馆名称
aside: false
---

# 会馆名称

> 简介、理念、目标、使命、寄语等。

## 妖灵

<SpiritBanner names="馆长名称 妖灵名称1 妖灵名称2 妖灵名称3 ……" />

## 传送门

<div style="display: flex; flex-direction: column; justify-content: center; align-items: center">
    <a href="会馆入群链接" target="_blank">
        <img
            alt="GuildQRCode"
            src="会馆群聊二维码URL"
            style="width: 240px; margin-top: 64px; padding: 24px; background-color: var(--vp-c-bg); border-radius: 32px"
        />
    </a>
    <code>群号码</code>
</div>
```

### 会馆命名与重名

不会收录与现有作品中会馆名称相同或近似（例如“风铃”二字和鲜少有人提及的与洞桥会馆相邻的“风灵会馆”）的原创会馆设定。原则上不应该干涉各会馆的命名，不过若是未来作品中真的出现了早前联谊的会馆，更加倾向于馆长重新命名。

<IDTestLinkCard catalog="guild" title="会馆ID测试卡">
    在下面输入ID，可以是英文名或拼音全拼，然后点击这张卡片，看看您的会馆ID是否已被使用。 
</IDTestLinkCard>

## 友链信息

> 您可以选择一个更符合格调或氛围的目标作为友链放置，此处不作推荐。

### 蓝溪拾遗（网站）

| 字段 | 字段值                                     |
|----|-----------------------------------------|
| 名称 | `蓝溪拾遗`                                  |
| 简介 | `罗小黑世界架构下的设定集与友链簿`                      |
| 链接 | `https://hei.navifox.net`               |
| 图标 | `https://www.navifox.net/favicon.ico`   |
| 头像 | `https://www.navifox.net/avatar256.jpg` |

### 路狐领航（网站）

| 字段 | 字段值                                     |
|----|-----------------------------------------|
| 名称 | `路狐领航`                                  |
| 简介 | `愿在生活的密林里遇见一只路狐，与你相伴，为你领航。`             |
| 链接 | `https://www.navifox.net`               |
| 图标 | `https://www.navifox.net/favicon.ico`   |
| 头像 | `https://www.navifox.net/avatar256.jpg` |



<style scoped>
*:not(blockquote) > p:not(.custom-block-title) {
    text-indent: 2rem;
}

ul,
ol {
    padding-left: 2rem;
}
</style>
