import { expect, test } from '@playwright/test';

const PAGES = [
  ['/', 'Physio Bewegungswerk in Gossau'],
  ['/uberuns', 'Über uns'],
  ['/news', 'News'],
  ['/kontakt', 'Kontakt'],
  ['/behandlungstechniken', 'Therapieangebot'],
  ['/private', 'Privat'],
  ['/faq', 'FAQ'],
  ['/impressum', 'Impressum'],
  ['/datenschutz', 'Datenschutz'],
];

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => sessionStorage.setItem('introSeen', '1'));
});

for (const [path, title] of PAGES) {
  test(`${path} renders without errors or CMS requests`, async ({ page }) => {
    const errors = [];
    const cmsRequests = [];
    page.on('pageerror', (error) => errors.push(error.message));
    page.on('request', (request) => {
      if (/onrender\.com|data\.physio-bewegungswerk\.ch\/api/.test(request.url())) cmsRequests.push(request.url());
    });

    await page.goto(path);
    await expect(page).toHaveTitle(new RegExp(title));
    await expect(page.locator('main')).not.toBeEmpty();
    await page.waitForLoadState('load');

    const brokenImages = await page.evaluate(() =>
      [...document.images].filter((image) => image.complete && !image.naturalWidth).map((image) => image.src),
    );
    expect(errors).toEqual([]);
    expect(cmsRequests).toEqual([]);
    expect(brokenImages).toEqual([]);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  });
}

test('page reports when its content was fetched', async ({ page }) => {
  await page.goto('/');
  const fetchedAt = await page.locator('html').getAttribute('data-content-fetched-at');
  expect(Number.isNaN(Date.parse(fetchedAt))).toBe(false);
});

test('news article opens with its content', async ({ page }) => {
  await page.goto('/news');
  await page.locator('.news-card').first().click();
  await expect(page.locator('.article__body')).not.toBeEmpty();
});

test('team section lists the CMS team', async ({ page }) => {
  await page.goto('/uberuns');
  await expect(page.getByText('Marit Hesse').first()).toBeAttached();
});

test('unknown routes show the not found page and are not indexed', async ({ page }) => {
  await page.goto('/does-not-exist');
  await expect(page).toHaveTitle(/nicht gefunden/);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex');
});

test('intro plays once and can be skipped', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('/');
  const intro = page.locator('.page_intro');
  await expect(intro).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(intro).toHaveCount(0);
  await page.reload();
  await expect(intro).toHaveCount(0);
  await context.close();
});

test('intro stays away for reduced motion', async ({ browser }) => {
  const context = await browser.newContext({ reducedMotion: 'reduce' });
  const page = await context.newPage();
  await page.goto('/');
  await expect(page.locator('.page_intro')).toHaveCount(0);
  await context.close();
});

test('intro clears itself when the player cannot load', async ({ browser }) => {
  const context = await browser.newContext();
  await context.route(/lottie_light|logo-intro/, (route) => route.abort());
  const page = await context.newPage();
  await page.goto('/');
  await expect(page.locator('.page_intro')).toHaveCount(0, { timeout: 6000 });
  await context.close();
});

test('site keeps working when the CMS is unreachable', async ({ page }) => {
  await page.route(/onrender\.com|data\.physio-bewegungswerk\.ch/, (route) => route.abort());
  await page.goto('/uberuns');
  await expect(page.getByText('Marit Hesse').first()).toBeAttached();
});
