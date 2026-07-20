# 蓝溪拾遗

罗小黑世界架构下的设定集与友链簿。

## 快速开始

在根目录下运行 `pnpm run dev:hei` 即可在 `0.0.0.0:5173` 看到项目首页。

## 妖灵信息

每位妖灵都有一张指引卡片，数据存储在[`./apps/hei/.vitepress/spirits.ts`](https://github.com/aixcyi/navifox-pages/blob/master/apps/hei/.vitepress/spirits.ts)中，在 http://127.0.0.1:5173/spirpt/ 中可以看到所有卡片。

- 代码中的`spiritsOC`存放由同好们设定的妖灵，定义时严格遵守`SpiritInfo`类型。
- 代码中的`spiritsAV`存放从现实作品中收录的妖灵，通过`Array.map()`映射为`SpiritInfo`类型。

