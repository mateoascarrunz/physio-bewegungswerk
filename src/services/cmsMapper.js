const CLOUDINARY_DELIVERY = 'f_auto,q_auto,c_limit,w_1400';
const MEDIA_FIELDS = ['url', 'name', 'alternativeText', 'width', 'height'];

function isMedia(value) {
  return typeof value.url === 'string' && typeof value.mime === 'string';
}

function optimiseCloudinaryUrl(url) {
  return url.replace('/image/upload/', `/image/upload/${CLOUDINARY_DELIVERY}/`);
}

function pickMedia(media) {
  const picked = Object.fromEntries(MEDIA_FIELDS.map((field) => [field, media[field] ?? null]));
  return { ...picked, url: optimiseCloudinaryUrl(media.url) };
}

// Strapi 4 nests entries under `attributes` and relations under `data`; Strapi 5 is already flat.
export function flatten(value) {
  if (Array.isArray(value)) return value.map(flatten);
  if (value === null || typeof value !== 'object') return value;
  if ('data' in value) return flatten(value.data);
  if ('attributes' in value) return flatten({ id: value.id, ...value.attributes });
  if (isMedia(value)) return pickMedia(value);
  return Object.fromEntries(Object.entries(value).map(([key, field]) => [key, flatten(field)]));
}

const REQUIRED_FIELDS = {
  banners: ['BannerTitle'],
  jobs: ['name'],
  news: ['title', 'date', 'text'],
  partners: ['Partner_logo'],
  teams: ['name', 'profilePicture', 'coverPhoto'],
};

export function findInvalidEntries(collection, entries) {
  return entries.filter((entry) =>
    REQUIRED_FIELDS[collection].some((field) => entry[field] === null || entry[field] === undefined),
  );
}

const COLLECTIONS_REQUIRING_ENTRIES = ['teams'];

export function assertCollectionHasEntries(collection, entries) {
  if (COLLECTIONS_REQUIRING_ENTRIES.includes(collection) && entries.length === 0) {
    throw new Error(`${collection}: no entries`);
  }
}
