import App from '#/App.vue';
import '@navifox/styles';
import router from '#/router';
import { createApp } from 'vue';
import '#/style.css';

createApp(App).use(router).mount('#app')
