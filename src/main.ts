import '@/styles/index.scss';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from '@/components/App.vue';
import components from '@/components';

const app = createApp(App);
components.forEach((component) =>
  app.component(component.name as string, component),
);

const pinia = createPinia();
app.use(pinia).mount('#app');
