---
title: 罗狐会馆
aside: false
---

<script setup lang="ts">
import { navifoxGuild, tighnari } from '@navifox/constants';

const spirits = [
    { name: '路狐羽', titles: ['罗狐会馆馆长', '二级执行者'], link: '/spirit/navifox', avatar: 'https://www.navifox.net/avatar256.jpg' },
]
</script>

# 罗狐会馆

> 广罗世间狐妖，提供技术讨论与休憩之地。

## 妖灵

<AiSpiritsView :spirits />

## 传送门

<div style="display: flex; flex-direction: column; justify-content: center; align-items: center">
    <a :href="navifoxGuild.link" target="_blank">
        <img
            alt="FoxeryGuildQRCode"
            src="/assets/guild/foxery-qrcode.png"
            style="width: 240px; margin-top: 64px; padding: 24px; background-color: var(--vp-c-bg); border-radius: 32px"
        />
    </a>
    <code>{{ tighnari.groupQQ }}</code>
</div>
