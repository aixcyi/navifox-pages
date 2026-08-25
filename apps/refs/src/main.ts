import { createHead } from '@unhead/vue/client';
import '@navifox/styles';
import { createApp } from 'vue';

import App from '#/App.vue';
import router from '#/router';
import '#/iconify';
import '#/style.css';

const app = createApp(App);
const head = createHead();

app.use(router);
app.use(head);
app.mount('#app');
