import { createApp as createClientApp, createSSRApp } from 'vue';
import App from './App.vue';
import { reveal } from './directives/reveal';
import { createAppRouter } from './router';

/**
 * One factory for the browser and for pre-rendering. A pre-rendered page is
 * hydrated, which takes over its existing markup instead of rebuilding it.
 */
export function createApp(history, { hydrate = false } = {}) {
  const app = (hydrate ? createSSRApp : createClientApp)(App);
  const router = createAppRouter(history);
  app.use(router).directive('reveal', reveal);
  return { app, router };
}
