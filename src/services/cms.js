const CMS_URL = import.meta.env.VITE_CMS_URL ?? 'https://strapi-physio-app.onrender.com';
const REQUEST_TIMEOUT_MS = 10000;

const requests = new Map();

async function requestCollection(path) {
  const response = await fetch(`${CMS_URL}/api/${path}`, {
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
  });
  if (!response.ok) {
    throw new Error(`CMS responded with ${response.status}`);
  }
  const { data } = await response.json();
  return data;
}

// Failed requests resolve to an empty list so sections hide instead of breaking the page,
// and are dropped from the cache so the next navigation retries.
function fetchCollection(path) {
  if (!requests.has(path)) {
    const request = requestCollection(path).catch(() => {
      requests.delete(path);
      return [];
    });
    requests.set(path, request);
  }
  return requests.get(path);
}

export const fetchBanners = () => fetchCollection('banners');
export const fetchJobs = () => fetchCollection('jobs');
export const fetchNews = () => fetchCollection('news-items?populate=*');
export const fetchPartners = () => fetchCollection('partners?populate=*');
export const fetchTeams = () => fetchCollection('teams?populate=*');
