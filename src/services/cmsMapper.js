const MEDIA_FIELDS = ['url', 'name', 'alternativeText', 'width', 'height'];

function isMedia(value) {
  return typeof value.url === 'string' && typeof value.mime === 'string';
}

function pickMedia(media) {
  return Object.fromEntries(MEDIA_FIELDS.map((field) => [field, media[field] ?? null]));
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
