/*
 * Renders every indexable page into its own HTML file, so crawlers and the
 * first paint get real content, then writes the 404 page, a shell for pages
 * that only exist in the browser, and the sitemap. Runs after both builds.
 */
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const root = process.cwd();
const dist = path.join(root, 'dist');
const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');
const manifest = JSON.parse(fs.readFileSync(path.join(dist, '.vite', 'ssr-manifest.json'), 'utf8'));
const { render, prerenderRoutes, SITE_URL } = await import(pathToFileURL(path.join(root, 'dist-ssr', 'entry-server.js')).href);

const HEAD_MARKER = '<!--app-head-->';
const APP_MARKER = '<div id="app"></div>';
if (!template.includes(HEAD_MARKER) || !template.includes(APP_MARKER)) {
  throw new Error('index.html lost its pre-render markers');
}

// The route's own styles and scripts are requested straight away, so the page never shows unstyled.
function routeAssets(modules) {
  const files = new Set();
  for (const id of modules) {
    for (const file of manifest[id] ?? []) if (!template.includes(file)) files.add(file);
  }
  return [...files]
    .map((file) => {
      if (file.endsWith('.css')) return `<link rel="stylesheet" href="${file}">`;
      if (file.endsWith('.js')) return `<link rel="modulepreload" crossorigin href="${file}">`;
      return '';
    })
    .filter(Boolean)
    .join('\n    ');
}

function page({ head, html, modules }) {
  return template
    .replace(HEAD_MARKER, `${head}\n    ${routeAssets(modules)}`)
    .replace(APP_MARKER, `<div id="app">${html}</div>`);
}

function fileFor(url) {
  return url === '/' ? path.join(dist, 'index.html') : path.join(dist, url.slice(1), 'index.html');
}

function escapeXml(value) {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;');
}

fs.writeFileSync(path.join(dist, 'shell.html'), template.replace(HEAD_MARKER, ''));

const sitemap = [];
for (const url of prerenderRoutes()) {
  const rendered = await render(url);
  if (rendered.status !== 200) throw new Error(`${url} rendered as ${rendered.status}`);
  const file = fileFor(url);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, page(rendered));
  if (rendered.indexable) sitemap.push({ loc: SITE_URL + (url === '/' ? '/' : url), lastmod: rendered.lastmod });
}

const notFound = await render('/seite-nicht-gefunden');
fs.writeFileSync(path.join(dist, '404.html'), page(notFound));

const urls = sitemap
  .map(({ loc, lastmod }) => `  <url><loc>${escapeXml(loc)}</loc>${lastmod ? `<lastmod>${lastmod}</lastmod>` : ''}</url>`)
  .join('\n');
fs.writeFileSync(
  path.join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
);

// The manifest only served this step; it has no place on the public site.
fs.rmSync(path.join(dist, '.vite'), { recursive: true, force: true });

console.log(`Pre-rendered ${sitemap.length} pages, the 404 page and the sitemap.`);
