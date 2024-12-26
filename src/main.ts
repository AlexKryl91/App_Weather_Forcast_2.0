import '@/styles/index.scss';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from '@/components/App.vue';

import { syncComp, asyncComp } from '@/components';

const app = createApp(App);

syncComp.forEach((component) =>
  app.component(component.name as string, component),
);

asyncComp.forEach((item) => app.component(item.name as string, item.component));

const pinia = createPinia();
app.use(pinia).mount('#app');
