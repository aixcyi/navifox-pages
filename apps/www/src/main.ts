import { createHead } from '@unhead/vue/client';
import '@navifox/styles';
import { createApp } from 'vue';

import App from '#/App.vue';
import Background from '#/assets/background.jpg';
import router from '#/router';

import '#/style.css';

/**
 * 首页壁纸提前解码，避免首次进入首页时出现「文字已渲染、壁纸整层未绘制」的黑帧。
 * 只预热不阻塞挂载：失败也不影响页面。
 */
const wallpaper = new Image();
wallpaper.fetchPriority = 'high';
wallpaper.src = Background;
void wallpaper.decode?.().catch(() => {});

const app = createApp(App);
const head = createHead();

app.use(router);
app.use(head);
app.mount('#app');
