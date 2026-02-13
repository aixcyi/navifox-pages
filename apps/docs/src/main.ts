import { createHead } from '@unhead/vue/client';
import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import '@navifox/styles';

createApp(App)
    .use(createHead())
    .mount('#app')
