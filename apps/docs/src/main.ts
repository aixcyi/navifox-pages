import { createHead } from '@unhead/vue/client';
import { createApp } from 'vue';

import '#/style.css';
import App from '#/App.vue';

import '@navifox/styles';

const app = createApp(App);
app.use(createHead());
app.mount('#app');
