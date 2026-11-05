const SITE_URL = 'https://www.physio-bewegungswerk.ch';
const DEFAULT_DESCRIPTION = document.querySelector('meta[name="description"]')?.content ?? '';

function setHeadTag(selector, createAttributes, attribute, value) {
  let tag = document.head.querySelector(selector);
  if (!tag) {
    tag = document.createElement(selector.startsWith('link') ? 'link' : 'meta');
    Object.entries(createAttributes).forEach(([name, content]) => tag.setAttribute(name, content));
    document.head.append(tag);
  }
  tag.setAttribute(attribute, value);
}

export function applyPageMeta(to) {
  const { title, description = DEFAULT_DESCRIPTION, noindex = false } = to.meta;
  const url = SITE_URL + (to.path === '/' ? '/' : to.path.replace(/\/$/, ''));

  if (title) document.title = title;
  setHeadTag('meta[name="description"]', { name: 'description' }, 'content', description);
  setHeadTag('link[rel="canonical"]', { rel: 'canonical' }, 'href', url);
  setHeadTag('meta[property="og:title"]', { property: 'og:title' }, 'content', title ?? document.title);
  setHeadTag('meta[property="og:description"]', { property: 'og:description' }, 'content', description);
  setHeadTag('meta[property="og:url"]', { property: 'og:url' }, 'content', url);
  setHeadTag('meta[name="robots"]', { name: 'robots' }, 'content', noindex ? 'noindex' : 'index, follow');
}
