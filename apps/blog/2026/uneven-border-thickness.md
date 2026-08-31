---
title: 边框粗细不均的由来与处理方式
createAt: 2026-08-14 10:30
category: 开发
tags:
  - CSS
  - 亚像素
  - DPI
excerpt: 同一份边框样式，为何有的条目上下细、左右粗，换一台机器又恢复正常？本文从分数倍缩放的亚像素舍入说起，聊聊发丝线的由来与处理方式。
---

# 边框粗细不均的由来与处理方式

## 起因

　　很久之前其实也遇到过这个问题，最近在翻新博客，给博客目录做悬停渐变边框的时候又遇到了这个现象：同样是 1px 的边框，一部分条目的上下两边明显比左右两边细，另一部分却四边均匀；因为手头没有副屏，frp穿透给朋友预览，问题又消失了。

　　刚好最近 DeepSeek Harness 发布了，`npx @deepseek-ai/dsh web` 跑起来问了一下，原来是分数倍缩放下的亚像素舍入问题，有比较主流的解法。

## 原理

　　CSS 里的 `1px` 是逻辑像素，最终要映射到显示器上的物理像素。当系统缩放为 100% 时，1 个逻辑像素恰好等于 1 个物理像素；而当缩放为 125% 或 150% 时（Windows 下很常见），1 个逻辑像素等于 1.25 或 1.5 个物理像素——出现了小数。

　　浏览器把边框栅格化到物理像素网格时，四条边要**各自独立取整**。取整的结果取决于这条边与像素网格的相位关系：同样 1.25 个物理像素的宽度，落在整数网格点上时可能被舍成 1 个物理像素，偏移半个相位时又可能被进成 2 个。

　　而每个条目在页面中的垂直位置不同，相位自然不同。以前也试过拖拽浏览器时，边框会在粗细之间变换。

## 旧版写法

　　如果只是普通边框，浏览器对 `border` 区域的绘制有成熟的像素对齐处理，不均程度通常还能接受。但当时为了实现悬停淡入，我用 `mask-composite` 在伪元素上抠了一个 1px 的圆环（见下方）。

　　圆环的粗细由 mask 边缘决定，而 mask 边缘同样要经过一次独立的栅格化与取整——多了一层近似，误差自然被放大，这正是“部分条目上下边明显变细”的直接原因。

```css
.post-item::before {
    inset: -1px;
    padding: 1px;
    background: linear-gradient(300deg, var(--vp-c-brand-1) 30%, #41d1ff);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    mask-composite: exclude;
}
```

## 新版写法

　　画渐变边框的通用做法是“透明边框 + 双层背景”：内层背景负责填充，外层渐变负责描边，两者用 `padding-box` 与 `border-box` 分开裁剪。

　　边框环改由 border-box 的背景绘制，交给引擎对边框区域做标准像素对齐，取代了 mask 合成，渲染一致性明显改善。配合 `opacity` 过渡依然能实现悬停淡入；若希望消失时多停留一会儿，让淡出比淡入慢 100ms 即可——上面的写法进入悬停用 250ms，离开时回到基础状态的 350ms。

```css
.post-item {
    position: relative;
    isolation: isolate;
    border: 1px solid transparent;
    border-radius: 5px;
}

.post-item::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: -1;
    border: 1px solid transparent;
    border-radius: inherit;
    background:
        linear-gradient(var(--vp-c-bg), var(--vp-c-bg)) padding-box,
        linear-gradient(300deg, var(--vp-c-brand-1) 30%, #41d1ff) border-box;
    opacity: 0;
    transition: opacity 0.35s ease;
}

.post-item:hover::before {
    opacity: 1;
    transition-duration: 0.25s;
}
```

## 发散

　　`border-image` 会把渐变按切片逐边绘制，每条边各自独立拉伸，某些场景下比整体描边更均匀。但代价是**不再遵循 border-radius**，圆角场景不可用。如果仍要死磕，1px 发丝线在分数倍缩放下不可能做到像素级均匀，常见的取舍是：

- 设计系统干脆使用更粗的边框（如 1.5px、2px），相对误差减半，观感更稳；
- 对均匀性敏感的元素避免使用发丝线，改用阴影或背景色块表达层级；
- 接受亚像素误差——不少知名网站同样存在这种差异。
