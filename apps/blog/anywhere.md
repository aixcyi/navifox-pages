---
title: 任意门
aside: false
sidebar: false
lastUpdated: false
prev: false
next: false
---

<script setup lang="ts">
import { onMounted } from 'vue';
import { data } from './catalog.data';

onMounted(() => {
    const posts = data.posts;
    const post = posts[Math.floor(Math.random() * posts.length)];
    if (post) {
        // 用 replace 替换当前历史条目，避免后退回到本页再次触发随机跳转
        window.location.replace(post.url);
    }
});
</script>

# 任意门

　　正在为你开启一扇任意门，通往随机的一篇博客……
