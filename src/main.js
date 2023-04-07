import { createApp } from 'vue';
import App from './App.vue';
import router from '@/router/index.js';
import PrimeVue from 'primevue/config';
import store from '@/store';
import components from '@/components/UI';

import 'primevue/resources/themes/lara-light-indigo/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';

const app = createApp(App);

components.forEach(c => {
  app.component(c.name, c);
});

app.use(PrimeVue);
app.use(router);
app.use(store)

app.mount('#app');
