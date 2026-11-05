import { createMemoryHistory } from 'vue-router';
import { renderToString } from 'vue/server-renderer';
import { createApp } from './createApp';
import { renderHead, resolvePageMeta, SITE_URL } from './router/pageMeta';
import { services } from './content/services';
import { articlePath, latestNews } from './services/news';

export { SITE_URL };

const STATIC_PAGES = ['/', '/behandlungstechniken', '/uberuns', '/news', '/private', '/faq', '/kontakt', '/impressum', '/datenschutz'];

/** Every indexable address, generated from the same content the site shows. */
export function prerenderRoutes() {
  return [
    ...STATIC_PAGES,
    ...services.map((service) => `/behandlungstechniken/${service.id}`),
    ...latestNews.map(articlePath),
  ];
}

export async function render(url) {
  const { app, router } = createApp(createMemoryHistory(), { hydrate: true });
  await router.push(url);
  await router.isReady();

  const context = {};
  const html = await renderToString(app, context);
  const route = router.currentRoute.value;
  const meta = resolvePageMeta(route);

  return {
    html,
    head: renderHead(meta),
    modules: context.modules ?? new Set(),
    status: route.name === 'NotFound' ? 404 : 200,
    lastmod: meta.modified,
    indexable: meta.robots.startsWith('index'),
  };
}
