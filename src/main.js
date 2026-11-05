import { createApp } from 'vue';
import './assets/styles/base.css';
import App from './App.vue';
import router from './router';
import { reveal } from './directives/reveal';
import { fetchedAt } from './services/cms';

document.documentElement.dataset.contentFetchedAt = fetchedAt;

createApp(App).use(router).directive('reveal', reveal).mount('#app');
