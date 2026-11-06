import { createWebHistory } from 'vue-router';
import './assets/styles/base.css';
import { createApp } from './createApp';
import { setHydrating } from './directives/reveal';
import { fetchedAt } from './services/cms';
import { installPointerIntent } from './services/pointerIntent';

document.documentElement.dataset.contentFetchedAt = fetchedAt;
installPointerIntent();

// Pre-rendered pages arrive with their content and are taken over in place;
// a page without it, such as the admin redirect, is rendered from scratch.
const container = document.getElementById('app');
const hydrate = container.hasChildNodes();
const { app, router } = createApp(createWebHistory(import.meta.env.BASE_URL), { hydrate });

router.isReady().then(() => {
  setHydrating(hydrate);
  app.mount(container);
  setHydrating(false);
});
