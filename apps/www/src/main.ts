import App from '#/App.vue';
import '@navifox/styles';
import router from '#/router';
import { createHead } from '@unhead/vue/client';
import { createApp } from 'vue';
import '#/styles/global.css';

const app = createApp(App)
const head = createHead()

app.use(router)
app.use(head)
app.mount('#app')
