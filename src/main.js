import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './router';
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faGift } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// Add icons to the library
library.add(faGift);

const app = createApp(App);

// Use plugins
app.use(PrimeVue, {
  theme: {
    preset: Aura
  }
});
app.use(router);

// Register global components
app.component('font-awesome-icon', FontAwesomeIcon);

app.mount('#app');
