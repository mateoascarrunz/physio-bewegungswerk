import { news } from './cms';

const dateFormat = new Intl.DateTimeFormat('de-CH', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
});

/** CMS dates are plain calendar days, so they are read and shown in UTC. */
export function formatNewsDate(date) {
  const parsed = new Date(`${date}T00:00:00Z`);
  return Number.isNaN(parsed.getTime()) ? date : dateFormat.format(parsed);
}

export const latestNews = [...news].sort((a, b) => new Date(b.date) - new Date(a.date));

export function findArticle(id) {
  return latestNews.find((article) => String(article.id) === String(id)) ?? null;
}

const TRANSLITERATION = { ä: 'ae', ö: 'oe', ü: 'ue', ß: 'ss' };

/** Stable, readable address part: the CMS id first, so a changed title still resolves. */
export function articleSlug(article) {
  const words = article.title
    .toLowerCase()
    .replace(/[äöüß]/g, (letter) => TRANSLITERATION[letter])
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return `${article.id}-${words}`;
}

export function articlePath(article) {
  return `/news/${articleSlug(article)}`;
}

export function findArticleBySlug(slug) {
  const id = String(slug ?? '').match(/^\d+/)?.[0];
  return id ? findArticle(id) : null;
}

/**
 * Column spans for a run of cards on the 12-column grid: alternating wide and
 * even rows, adjusted at the end so a row is never left with a lone small card.
 */
export function newsCardSpans(count) {
  const spans = [];
  let remaining = count;
  let useWideRow = true;
  while (remaining > 0) {
    if (remaining === 1) {
      spans.push(12);
      remaining = 0;
    } else if (remaining === 3 || (!useWideRow && remaining !== 2 && remaining !== 4)) {
      spans.push(4, 4, 4);
      remaining -= 3;
      useWideRow = true;
    } else {
      spans.push(7, 5);
      remaining -= 2;
      useWideRow = false;
    }
  }
  return spans;
}
