import { expect, test } from '@playwright/test';

const SITE = 'https://www.physio-bewegungswerk.ch';
const PAGES = [
  ['/', 'Bleib'],
  ['/behandlungstechniken', 'Therapieangebot'],
  ['/behandlungstechniken/3', 'Postoperative'],
  ['/uberuns', 'Behandlungs'],
  ['/news', 'News'],
  ['/news/7-frischer-look-neue-energie', 'Frischer Look'],
  ['/private', 'Private Physiotherapie'],
  ['/faq', 'FAQ'],
  ['/kontakt', 'Kontakt'],
  ['/impressum', 'Impressum'],
  ['/datenschutz', 'Datenschutz'],
];

test.describe('pre-rendered pages', () => {
  test.skip(({ isMobile }) => isMobile, 'The served HTML is the same for every device');

  for (const [path, heading] of PAGES) {
    test(`${path} arrives with its content, title, description and canonical`, async ({ request }) => {
      const response = await request.get(path);
      expect(response.status()).toBe(200);
      const html = await response.text();
      const h1 = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)?.[1].replace(/<[^>]+>/g, '');
      expect(h1).toContain(heading);
      expect(html.match(/<title>/g)).toHaveLength(1);
      expect(html.match(/<link rel="canonical"/g)).toHaveLength(1);
      expect(html).toContain(`<link rel="canonical" href="${SITE}${path === '/' ? '/' : path}">`);
      expect(html).toMatch(/<meta name="description" content="[^"]{50,}">/);
      expect(html).toContain('<meta name="robots" content="index, follow">');
      expect(html).toContain('<html lang="de">');
    });
  }

  test('every page has its own title and description', async ({ request }) => {
    const titles = new Set();
    const descriptions = new Set();
    for (const [path] of PAGES) {
      const html = await (await request.get(path)).text();
      titles.add(html.match(/<title>([^<]*)<\/title>/)[1]);
      descriptions.add(html.match(/<meta name="description" content="([^"]*)">/)[1]);
    }
    expect(titles.size).toBe(PAGES.length);
    expect(descriptions.size).toBe(PAGES.length);
  });

  test('structured data parses and describes the practice and its articles', async ({ request }) => {
    const graphs = {};
    for (const path of ['/', '/behandlungstechniken', '/uberuns', '/news/7-frischer-look-neue-energie', '/behandlungstechniken/3']) {
      const html = await (await request.get(path)).text();
      const json = html.match(/<script type="application\/ld\+json" data-page-schema>([\s\S]*?)<\/script>/)[1];
      graphs[path] = JSON.parse(json)['@graph'];
    }
    const practice = graphs['/'].find((node) => node['@type'] === 'Physiotherapy');
    expect(practice.address).toMatchObject({ streetAddress: 'Bergstrasse 3', postalCode: '8625', addressLocality: 'Gossau' });
    expect(practice.telephone).toBe('+41 44 543 63 68');
    expect(graphs['/behandlungstechniken'][0].hasOfferCatalog.itemListElement).toHaveLength(14);
    expect(graphs['/uberuns'][0].employee.map((person) => person.name)).toContain('Marit Hesse');
    const article = graphs['/news/7-frischer-look-neue-energie'].find((node) => node['@type'] === 'Article');
    expect(article).toMatchObject({ headline: 'Frischer Look, neue Energie!', datePublished: '2025-07-28' });
    expect(graphs['/behandlungstechniken/3'][0]['@type']).toBe('BreadcrumbList');
  });

  test('the sitemap lists every page, treatment and article, and nothing else', async ({ request }) => {
    const xml = await (await request.get('/sitemap.xml')).text();
    const locations = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
    expect(locations).toContain(`${SITE}/news/7-frischer-look-neue-energie`);
    expect(locations).toContain(`${SITE}/behandlungstechniken/14`);
    expect(locations.filter((location) => location.includes('/behandlungstechniken/'))).toHaveLength(14);
    expect(locations.some((location) => /admin|nicht-gefunden/.test(location))).toBe(false);
    expect(new Set(locations).size).toBe(locations.length);
  });

  test('robots.txt points at the sitemap and keeps the admin out', async ({ request }) => {
    const robots = await (await request.get('/robots.txt')).text();
    expect(robots).toContain('Sitemap: https://www.physio-bewegungswerk.ch/sitemap.xml');
    expect(robots).toContain('Disallow: /admin');
  });

  test('the not found page is excluded from search', async ({ request }) => {
    const response = await request.get('/gibt-es-nicht');
    expect(response.status()).toBe(404);
    expect(await response.text()).toContain('<meta name="robots" content="noindex">');
  });
});

test('pages take over their pre-rendered markup without rebuilding it', async ({ page }) => {
  const problems = [];
  page.on('console', (message) => {
    if (/hydration/i.test(message.text())) problems.push(message.text());
  });
  await page.addInitScript(() => sessionStorage.setItem('introSeen', '1'));
  for (const [path] of PAGES) {
    await page.goto(path);
    await page.waitForLoadState('networkidle');
  }
  expect(problems).toEqual([]);
});
