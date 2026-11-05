import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { assertCollectionHasEntries, findInvalidEntries, flatten } from '../src/services/cmsMapper.js';

const CMS_URL = process.env.CMS_URL ?? 'https://data.physio-bewegungswerk.ch';
const SNAPSHOT_PATH = new URL('../src/content/cms-snapshot.json', import.meta.url);
const REQUEST_TIMEOUT_MS = 90000;
const IS_PRODUCTION_BUILD = process.env.VERCEL_ENV === 'production';

const COLLECTIONS = {
  banners: 'banners',
  jobs: 'jobs',
  news: 'news-items?populate=*',
  partners: 'partners?populate=*',
  teams: 'teams?populate=*',
};

async function fetchCollection(collection, path) {
  const separator = path.includes('?') ? '&' : '?';
  const response = await fetch(`${CMS_URL}/api/${path}${separator}pagination[pageSize]=100`, {
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
  });
  if (!response.ok) throw new Error(`${collection}: HTTP ${response.status}`);

  const { data } = await response.json();
  if (!Array.isArray(data)) throw new Error(`${collection}: unexpected response`);

  const entries = flatten(data);
  const invalid = findInvalidEntries(collection, entries);
  if (invalid.length > 0) throw new Error(`${collection}: ${invalid.length} invalid entries`);
  assertCollectionHasEntries(collection, entries);
  return entries;
}

// A stored snapshot can be older than the live site, so it could restore unpublished content.
// Failing a production build keeps the last successful deployment live instead.
function handleUnavailableContent(reason) {
  if (IS_PRODUCTION_BUILD) {
    console.error(`Production build stopped, CMS content unavailable: ${reason}`);
    process.exit(1);
  }
  if (!existsSync(SNAPSHOT_PATH)) {
    console.error(`CMS content unavailable and no snapshot exists: ${reason}`);
    process.exit(1);
  }
  const { fetchedAt } = JSON.parse(readFileSync(SNAPSHOT_PATH, 'utf8'));
  console.warn(`CMS content unavailable (${reason}); keeping snapshot from ${fetchedAt}`);
}

try {
  const entries = await Promise.all(
    Object.entries(COLLECTIONS).map(async ([collection, path]) => [
      collection,
      await fetchCollection(collection, path),
    ]),
  );
  const snapshot = { fetchedAt: new Date().toISOString(), ...Object.fromEntries(entries) };
  writeFileSync(SNAPSHOT_PATH, `${JSON.stringify(snapshot, null, 2)}\n`);
  console.log(`CMS snapshot updated: ${entries.map(([name, list]) => `${name} ${list.length}`).join(', ')}`);
} catch (error) {
  handleUnavailableContent(error.message);
}
