import '@/styles/index.scss';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './components/App.vue';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia).mount('#app');
