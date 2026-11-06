import { expect, test } from '@playwright/test';

const WIDTHS = [320, 375, 390, 430, 768, 820, 1024, 1280, 1440, 1920];
const FULL_NAV_WIDTH = 1200;

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => sessionStorage.setItem('introSeen', '1'));
});

async function focusedElementIsInside(page, selector) {
  return page.evaluate((target) => document.activeElement?.closest(target) !== null, selector);
}

test.describe('navigation', () => {
  for (const width of WIDTHS) {
    test(`stays on one line and fits the screen at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 800 });
      await page.goto('/');

      const result = await page.evaluate(() => {
        const bar = document.querySelector('.site-header__bar').getBoundingClientRect();
        const items = [...document.querySelectorAll('.site-header__bar a, .site-header__bar button')].filter(
          (element) => element.getClientRects().length > 0,
        );
        return {
          pageOverflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
          outside: items
            .filter((element) => {
              const box = element.getBoundingClientRect();
              return box.left < bar.left - 1 || box.right > bar.right + 1;
            })
            .map((element) => element.textContent.trim()),
          wrapped: items.filter((element) => element.getClientRects().length > 1).map((element) => element.textContent.trim()),
          tallest: Math.max(...items.map((element) => element.getBoundingClientRect().height)),
        };
      });

      expect(result.pageOverflow).toBeLessThanOrEqual(0);
      expect(result.outside).toEqual([]);
      expect(result.wrapped).toEqual([]);
      expect(result.tallest).toBeLessThanOrEqual(48);
    });
  }

  test('shows the current page', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/behandlungstechniken/3');
    await expect(page.locator('.site-nav__link[aria-current="page"]')).toHaveText('Behandlungstechniken');
  });

  test('offers every link on a wide screen without a menu button', async ({ page }) => {
    await page.setViewportSize({ width: FULL_NAV_WIDTH, height: 800 });
    await page.goto('/');
    await expect(page.locator('.site-nav__link:visible')).toHaveCount(5);
    await expect(page.locator('.menu-toggle')).toBeHidden();
  });

  test('keeps three links beside the menu button on a landscape tablet', async ({ page }) => {
    await page.setViewportSize({ width: 1024, height: 768 });
    await page.goto('/');
    await expect(page.locator('.site-nav__link:visible')).toHaveCount(3);
    await expect(page.locator('.menu-toggle')).toBeVisible();
  });
});

test.describe('mobile menu', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 800 });
    await page.goto('/');
  });

  test('opens as a dialog, moves focus inside and locks the page', async ({ page }) => {
    const toggle = page.locator('.menu-toggle').first();
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await toggle.click();

    const dialog = page.locator('dialog[open]');
    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole('link', { name: 'Kontakt' })).toBeVisible();
    await expect(dialog.getByRole('link', { name: 'Termin vereinbaren' })).toHaveAttribute('href', /medidoc/);
    expect(await focusedElementIsInside(page, 'dialog')).toBe(true);
    expect(await page.evaluate(() => getComputedStyle(document.documentElement).overflow)).toBe('hidden');
  });

  test('closes on Escape and returns focus to the button', async ({ page }) => {
    const toggle = page.locator('.menu-toggle').first();
    await toggle.focus();
    await page.keyboard.press('Enter');
    await expect(page.locator('dialog[open]')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.locator('dialog')).toHaveCount(0);
    await expect(toggle).toBeFocused();
    expect(await page.evaluate(() => getComputedStyle(document.documentElement).overflow)).not.toBe('hidden');
  });

  test('closes with its own button', async ({ page }) => {
    await page.locator('.menu-toggle').first().click();
    await page.getByRole('button', { name: 'Menü schliessen' }).click();
    await expect(page.locator('dialog')).toHaveCount(0);
  });

  test('navigates, closes and moves focus to the new page', async ({ page }) => {
    await page.locator('.menu-toggle').first().click();
    await page.locator('dialog').getByRole('link', { name: 'Über uns' }).click();
    await expect(page).toHaveURL(/\/uberuns$/);
    await expect(page.locator('dialog')).toHaveCount(0);
    await expect(page.locator('main')).toBeFocused();
  });

  test('closes itself when the window grows to the full navigation', async ({ page }) => {
    await page.locator('.menu-toggle').first().click();
    await expect(page.locator('dialog[open]')).toBeVisible();
    await page.setViewportSize({ width: 1400, height: 800 });
    await expect(page.locator('dialog')).toHaveCount(0);
  });

  test('stays usable across an orientation change', async ({ page }) => {
    await page.locator('.menu-toggle').first().click();
    await page.setViewportSize({ width: 800, height: 390 });
    const dialog = page.locator('dialog[open]');
    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole('link', { name: 'News' })).toBeVisible();
    const box = await dialog.boundingBox();
    expect(box.width).toBe(800);
    await page.setViewportSize({ width: 390, height: 800 });
    await expect(dialog.getByRole('link', { name: 'News' })).toBeVisible();
  });
});

test.describe('hero', () => {
  test('opens a team profile from each person', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Dominik Geissberger, Profil öffnen' }).click();
    const dialog = page.locator('dialog[open]');
    await expect(dialog.getByRole('heading', { name: 'Dominik Geissberger' })).toBeVisible();
    await expect(page).toHaveURL(/\?team=2$/);
    await page.keyboard.press('Escape');
    await expect(page.locator('dialog')).toHaveCount(0);
    await expect(page).toHaveURL(/\/$/);
  });

  test('names both people without needing a hover', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('.hero__chip')).toHaveCount(2);
    await expect(page.locator('.hero__chip').first()).toBeVisible();
    await expect(page.locator('.hero__chip').last()).toBeVisible();
  });

  test('emphasises the person under the pointer and keeps focus from scrolling the art', async ({ page, isMobile }) => {
    test.skip(isMobile, 'Hover emphasis only applies to a precise pointer');
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');
    await page.locator('.hero__person--marit').hover();
    await expect(page.locator('.hero__overlay--marit')).toHaveCSS('opacity', '1');
    await expect(page.locator('.hero__overlay--dominik')).toHaveCSS('opacity', '0');
    await page.locator('.hero__person--dominik').hover();
    await expect(page.locator('.hero__overlay--dominik')).toHaveCSS('opacity', '1');
    await expect(page.locator('.hero__overlay--marit')).toHaveCSS('opacity', '0');

    await page.locator('.hero__person--dominik').focus();
    expect(await page.locator('.hero').evaluate((element) => element.scrollLeft)).toBe(0);
  });

  test('leaves the headline readable with reduced motion', async ({ browser }) => {
    const context = await browser.newContext({ reducedMotion: 'reduce' });
    const page = await context.newPage();
    await page.goto('/');
    await expect(page.locator('.hero__title')).toHaveCSS('opacity', '1');
    await context.close();
  });

  test('holds its entrance until the intro lifts', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('/');
    await expect(page.locator('html')).toHaveClass(/intro-pending/);
    // Nothing plays behind the intro; the entrance starts fresh once it lifts.
    expect(await page.locator('.hero__word > span').first().evaluate((element) => element.getAnimations().length)).toBe(0);
    await page.keyboard.press('Escape');
    await expect(page.locator('html')).not.toHaveClass(/intro-pending/);
    await expect(page.locator('.hero__title')).toHaveCSS('opacity', '1');
    await context.close();
  });

  test('enters without fading, so colours and contrast are true on every frame', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('/');
    await page.keyboard.press('Escape');
    await expect(page.locator('html')).toHaveClass(/intro-lifted/);
    const entrances = await page.evaluate(() =>
      document
        .getAnimations()
        .filter((animation) => animation instanceof CSSAnimation && !animation.effect.target.closest('.page_intro'))
        .map((animation) => ({
          name: animation.animationName,
          fades: animation.effect.getKeyframes().some((frame) => 'opacity' in frame),
        })),
    );
    expect(entrances.map((entrance) => entrance.name)).toEqual(expect.arrayContaining(['header-in', 'hero-rise']));
    expect(entrances.filter((entrance) => entrance.fades)).toEqual([]);
    await context.close();
  });

  test('shows the header straight away when there is no intro', async ({ page }) => {
    await page.goto('/kontakt');
    await expect(page.locator('.site-header__bar')).toBeVisible();
    expect(await page.locator('.site-header__bar').evaluate((element) => element.getAnimations().length)).toBe(0);
  });
});

test.describe('treatments', () => {
  test('lists every treatment as a link', async ({ page }) => {
    await page.goto('/behandlungstechniken');
    await expect(page.locator('.services-grid .service-card')).toHaveCount(14);
    await page.locator('.services-grid .service-card').nth(2).click();
    await expect(page).toHaveURL(/behandlungstechniken\/3$/);
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Postoperative');
    await expect(page).toHaveTitle(/Postoperative Rehabilitation/);
    await expect(page.locator('.service__header')).toContainText('3 von 14');
  });

  test('keeps treatment text with its emphasis', async ({ page }) => {
    await page.goto('/behandlungstechniken/12');
    await expect(page.locator('.service__prose strong').first()).toContainText('Mobilisation mit Bewegung');
  });

  test('answers an unknown treatment with a real not found page', async ({ page }) => {
    const response = await page.goto('/behandlungstechniken/999');
    expect(response.status()).toBe(404);
    await expect(page).toHaveTitle(/nicht gefunden/);
  });

  test('moves the carousel with its buttons and stops at the start', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');
    const carousel = page.locator('.home-services .carousel');
    const track = carousel.locator('.carousel__track');
    await track.scrollIntoViewIfNeeded();
    await expect(carousel.getByRole('button', { name: 'Zurück' })).toBeDisabled();
    await carousel.getByRole('button', { name: 'Weiter' }).click();
    await expect.poll(() => track.evaluate((element) => element.scrollLeft)).toBeGreaterThan(100);
    await expect(carousel.getByRole('button', { name: 'Zurück' })).toBeEnabled();
  });
});

test.describe('news', () => {
  const ARTICLE = '/news/7-frischer-look-neue-energie';

  test('opens an article over the grid at its own address', async ({ page }) => {
    await page.goto('/news');
    await page.locator('.news-card').first().click();
    await expect(page).toHaveURL(new RegExp(`${ARTICLE}$`));
    const dialog = page.locator('dialog[open]');
    await expect(dialog).toBeVisible();
    await expect(dialog.locator('.article__body')).not.toBeEmpty();
    await expect(dialog.locator('.article__meta')).toContainText('2025');
    const titleId = await dialog.getAttribute('aria-labelledby');
    await expect(page.locator(`[id="${titleId}"]`)).toHaveText('Frischer Look, neue Energie!');
    await expect(page).toHaveTitle(/Frischer Look/);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `https://www.physio-bewegungswerk.ch${ARTICLE}`);
    await expect(page.locator('.news-grid')).toBeAttached();
    expect(await focusedElementIsInside(page, 'dialog')).toBe(true);
  });

  test('closes on Escape and hands focus back to the card', async ({ page }) => {
    await page.goto('/news');
    const card = page.locator('.news-card').first();
    await card.focus();
    await page.keyboard.press('Enter');
    await expect(page.locator('dialog[open]')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.locator('dialog')).toHaveCount(0);
    await expect(page).toHaveURL(/\/news$/);
    await expect(card).toBeFocused();
  });

  test('closes with the back button without losing the reader\'s place', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 600 });
    await page.goto('/news');
    await page.evaluate(() => document.fonts.ready);
    const card = page.locator('.news-card').last();
    await card.scrollIntoViewIfNeeded();
    await card.click();
    await expect(page.locator('dialog[open]')).toBeVisible();
    // Measured once the article is open, because the click itself may scroll the card into view.
    const readerPosition = await page.evaluate(() => window.scrollY);
    await page.goBack();
    await expect(page.locator('dialog')).toHaveCount(0);
    await expect(page).toHaveURL(/\/news$/);
    await expect.poll(() => page.evaluate((position) => Math.abs(window.scrollY - position), readerPosition)).toBeLessThan(40);
  });

  test('shows the full article page when its address is opened directly', async ({ page }) => {
    const response = await page.goto(ARTICLE);
    expect(response.status()).toBe(200);
    await expect(page.locator('dialog')).toHaveCount(0);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Frischer Look, neue Energie!');
    await expect(page.locator('.article-page__body')).not.toBeEmpty();
    await expect(page.getByRole('navigation', { name: 'Sie sind hier' })).toContainText('News');
  });

  test('sends links from before article pages to the article', async ({ page }) => {
    await page.goto('/news?artikel=1');
    await expect(page).toHaveURL(/\/news\/1-jetzt-neu-gemeinsam-in-bewegung$/);
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Gemeinsam in Bewegung');
  });

  test('corrects an article address whose title has changed', async ({ page }) => {
    await page.goto('/news/7-ein-alter-titel');
    await expect(page).toHaveURL(new RegExp(`${ARTICLE}$`));
  });

  test('answers an unknown article with a real not found page', async ({ page }) => {
    const response = await page.goto('/news/99999-gibt-es-nicht');
    expect(response.status()).toBe(404);
    await expect(page).toHaveTitle(/nicht gefunden/);
  });

  test('ignores an old link to an article that no longer exists', async ({ page }) => {
    await page.goto('/news?artikel=99999');
    await expect(page.locator('dialog')).toHaveCount(0);
    await expect(page).toHaveURL(/\/news$/);
  });

  test('closes when the backdrop is clicked', async ({ page, isMobile }) => {
    test.skip(isMobile, 'The phone sheet leaves no backdrop to click');
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/news');
    await page.locator('.news-card').first().click();
    await expect(page.locator('dialog[open]')).toBeVisible();
    await expect(page.locator('dialog[open]')).not.toHaveClass(/is-entering/);
    await page.mouse.click(40, 450);
    await expect(page.locator('dialog')).toHaveCount(0);
    await expect(page).toHaveURL(/\/news$/);
  });

  test('turns inline photos into an optimised gallery', async ({ page }) => {
    await page.goto(ARTICLE);
    const photos = page.locator('.article__gallery img');
    await expect(photos.first()).toBeAttached();
    await expect(photos.first()).toHaveAttribute('src', /f_auto,q_auto/);
    await expect(photos.first()).toHaveAttribute('alt', '');
  });

  test('home page cards lead to the article page', async ({ page }) => {
    await page.goto('/');
    await page.locator('.news-card').first().click();
    await expect(page).toHaveURL(new RegExp(`${ARTICLE}$`));
    await expect(page.locator('dialog')).toHaveCount(0);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Frischer Look, neue Energie!');
  });
});

test.describe('team', () => {
  test('shows structured details and working contact links', async ({ page }) => {
    await page.goto('/uberuns');
    await page.locator('.team-card').first().click();
    const dialog = page.locator('dialog[open]');
    await expect(dialog.getByRole('heading', { name: 'Marit Hesse' })).toBeVisible();
    await expect(dialog.locator('.team-modal__quote')).toBeVisible();
    await expect(dialog.getByRole('link', { name: /marit\.hesse/ })).toHaveAttribute('href', 'mailto:marit.hesse@physio-bewegungswerk.ch');
    await expect(dialog.getByRole('link', { name: '076 543 63 68' })).toHaveAttribute('href', 'tel:+41765436368');

    const summary = dialog.getByText('Aus- und Weiterbildungen');
    const list = dialog.locator('.team-modal__list').first();
    await expect(list).toBeHidden();
    await summary.click();
    await expect(list).toBeVisible();
    await expect(list.locator('li').first()).toContainText('Bobath');
  });

  test('leaves out what a person has not filled in', async ({ page }) => {
    await page.goto('/uberuns?team=7');
    const dialog = page.locator('dialog[open]');
    await expect(dialog.getByRole('heading', { name: 'Mogens Gies' })).toBeVisible();
    await expect(dialog.locator('.team-modal__quote')).toHaveCount(0);
    await expect(dialog.locator('.team-modal__contacts')).toHaveCount(0);
  });

  test('fits inside the screen at every width', async ({ page }) => {
    await page.goto('/uberuns?team=1');
    // Measure the settled dialog, not its entrance transform.
    await expect(page.locator('dialog[open]')).not.toHaveClass(/is-entering/);
    for (const [width, height] of [[320, 568], [390, 800], [768, 1024], [1024, 768], [1440, 900]]) {
      await page.setViewportSize({ width, height });
      expect(await page.locator('dialog[open]').evaluate((dialog) => dialog.getAnimations().length)).toBe(0);
      const box = await page.locator('dialog[open]').boundingBox();
      // Sub-pixel rounding at the edges is allowed, anything more is a real overflow.
      expect(box.x).toBeGreaterThanOrEqual(-1);
      expect(box.y).toBeGreaterThanOrEqual(-1);
      expect(box.x + box.width).toBeLessThanOrEqual(width + 1);
      expect(box.y + box.height).toBeLessThanOrEqual(height + 1);
    }
  });

  test('opens the gallery and pages through photos', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/uberuns');
    await page.getByRole('button', { name: 'Impressionen', exact: true }).click();
    const dialog = page.locator('dialog[open]');
    await expect(dialog.getByRole('heading', { name: 'Unser Standort' })).toBeVisible();
    await expect(dialog.locator('.gallery__slide img')).toHaveCount(6);
    await dialog.getByRole('button', { name: 'Weiter' }).click();
    await expect.poll(() => dialog.locator('.carousel__track').evaluate((element) => element.scrollLeft)).toBeGreaterThan(100);
  });
});

test.describe('contact form', () => {
  // Every test here answers for EmailJS itself, so no real message can leave.
  async function interceptEmail(page, status) {
    const calls = [];
    await page.route('https://api.emailjs.com/**', async (route) => {
      calls.push(route.request().postDataJSON());
      await route.fulfill({
        status,
        contentType: 'text/plain',
        headers: { 'access-control-allow-origin': '*' },
        body: status === 200 ? 'OK' : 'Error',
      });
    });
    return calls;
  }

  test('flags missing fields and moves focus to the first one', async ({ page }) => {
    const calls = await interceptEmail(page, 200);
    await page.goto('/kontakt');
    await page.getByRole('button', { name: 'Senden' }).click();
    await expect(page.getByLabel('Vor- und Nachname *')).toBeFocused();
    await expect(page.getByLabel('Vor- und Nachname *')).toHaveAttribute('aria-invalid', 'true');
    await expect(page.getByLabel('E-Mail *')).toHaveAttribute('aria-invalid', 'true');
    await expect(page.locator('#contact-message-error')).toBeVisible();
    expect(calls).toHaveLength(0);
  });

  test('rejects a malformed address and clears the error once fixed', async ({ page }) => {
    await interceptEmail(page, 200);
    await page.goto('/kontakt');
    const email = page.getByLabel('E-Mail *');
    await email.fill('nicht-gueltig');
    await page.getByRole('button', { name: 'Senden' }).click();
    await expect(page.locator('#contact-email-error')).toContainText('nicht korrekt');
    await email.fill('test@example.com');
    await expect(page.locator('#contact-email-error')).toHaveCount(0);
  });

  test('accepts a phone number with spaces and a plus sign', async ({ page }) => {
    await page.goto('/kontakt');
    const phone = page.getByLabel('Telefonnummer');
    await expect(phone).toHaveAttribute('type', 'tel');
    await phone.fill('+41 44 543 63 68');
    await expect(phone).toHaveValue('+41 44 543 63 68');
  });

  test('confirms a sent message inline', async ({ page }) => {
    const calls = await interceptEmail(page, 200);
    await page.goto('/kontakt');
    await page.getByLabel('Vor- und Nachname *').fill('Automatischer Test');
    await page.getByLabel('E-Mail *').fill('test@example.com');
    await page.getByLabel('Nachricht *').fill('Nur ein Test, wird abgefangen.');
    await page.getByRole('button', { name: 'Senden' }).click();
    await expect(page.getByRole('status')).toContainText('Vielen Dank');
    expect(calls).toHaveLength(1);
    expect(calls[0].template_params).toMatchObject({ name: 'Automatischer Test', email: 'test@example.com' });
  });

  test('keeps the message and explains when sending fails', async ({ page }) => {
    await interceptEmail(page, 500);
    await page.goto('/kontakt');
    await page.getByLabel('Vor- und Nachname *').fill('Automatischer Test');
    await page.getByLabel('E-Mail *').fill('test@example.com');
    await page.getByLabel('Nachricht *').fill('Nur ein Test, wird abgefangen.');
    await page.getByRole('button', { name: 'Senden' }).click();
    await expect(page.getByRole('alert')).toContainText('nicht erfolgreich');
    await expect(page.getByLabel('Nachricht *')).toHaveValue('Nur ein Test, wird abgefangen.');
  });

  test('quietly discards what a bot fills in', async ({ page }) => {
    const calls = await interceptEmail(page, 200);
    await page.goto('/kontakt');
    await page.getByLabel('Vor- und Nachname *').fill('Bot');
    await page.getByLabel('E-Mail *').fill('bot@example.com');
    await page.getByLabel('Nachricht *').fill('Spam');
    await page.locator('#contact-website').fill('https://spam.example', { force: true });
    await page.getByRole('button', { name: 'Senden' }).click();
    await expect(page.getByRole('status')).toContainText('Vielen Dank');
    expect(calls).toHaveLength(0);
  });

  test('offers working phone, email and map links', async ({ page }) => {
    await page.goto('/kontakt');
    await expect(page.locator('.contact-row').filter({ hasText: 'Telefon' })).toHaveAttribute('href', 'tel:+41445436368');
    await expect(page.locator('.contact-row').filter({ hasText: 'Mobil' })).toHaveAttribute('href', 'tel:+41765436368');
    await expect(page.locator('.contact-row').filter({ hasText: 'E-Mail' })).toHaveAttribute('href', 'mailto:info@physio-bewegungswerk.ch');
    await expect(page.locator('.contact-row').filter({ hasText: 'Adresse' })).toHaveAttribute('href', /maps\.app\.goo\.gl/);
  });

  test('only contacts Google once the map is requested', async ({ page }) => {
    const googleRequests = [];
    await page.route(/google\.com/, (route) => {
      googleRequests.push(route.request().url());
      return route.abort();
    });
    await page.goto('/kontakt');
    await expect(page.locator('iframe')).toHaveCount(0);
    expect(googleRequests).toEqual([]);
    await page.getByRole('button', { name: 'Karte hier laden' }).click();
    await expect(page.locator('iframe')).toHaveCount(1);
  });
});

test.describe('layout and motion', () => {
  const PAGES = ['/', '/behandlungstechniken', '/behandlungstechniken/6', '/news', '/uberuns', '/kontakt', '/private', '/faq', '/impressum', '/datenschutz', '/nope'];

  for (const path of PAGES) {
    test(`${path} never scrolls sideways from 320 to 1920px`, async ({ page }) => {
      await page.goto(path);
      for (const width of WIDTHS) {
        await page.setViewportSize({ width, height: 800 });
        await expect
          .poll(() => page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth))
          .toBeLessThanOrEqual(0);
      }
    });
  }

  test('news cards stay separated at every width', async ({ page }) => {
    await page.goto('/news');
    for (const width of WIDTHS) {
      await page.setViewportSize({ width, height: 800 });
      const boxes = await page.locator('.news-card').evaluateAll((cards) => cards.map((card) => card.getBoundingClientRect().toJSON()));
      for (let first = 0; first < boxes.length; first += 1) {
        for (let second = first + 1; second < boxes.length; second += 1) {
          const a = boxes[first];
          const b = boxes[second];
          const overlap = a.left < b.right && b.left < a.right && a.top < b.bottom && b.top < a.bottom;
          expect(overlap).toBe(false);
        }
      }
    }
  });

  test('page changes do not lock scrolling or hide content', async ({ page }) => {
    await page.goto('/');
    await page.locator('.site-footer').getByRole('link', { name: 'FAQ' }).click();
    await expect(page).toHaveURL(/\/faq$/);
    await expect(page.getByRole('heading', { level: 1, name: 'FAQ' })).toBeVisible();
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
    expect(await page.evaluate(() => getComputedStyle(document.documentElement).overflow)).not.toBe('hidden');
  });

  test('revealed content is visible with reduced motion, without scrolling to it', async ({ browser }) => {
    const context = await browser.newContext({ reducedMotion: 'reduce' });
    const page = await context.newPage();
    await page.goto('/uberuns');
    await expect(page.locator('.reveal')).toHaveCount(0);
    await context.close();
  });

  test('a skip link reaches the main content', async ({ page, isMobile }) => {
    test.skip(isMobile, 'Skip links are a keyboard feature');
    await page.goto('/');
    await page.keyboard.press('Tab');
    await expect(page.locator('.skip-link')).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(page.locator('main')).toBeFocused();
  });

  test('each page has one main heading', async ({ page }) => {
    for (const path of PAGES) {
      await page.goto(path);
      await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);
    }
  });
});
