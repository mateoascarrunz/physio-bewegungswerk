import snapshot from '@/content/cms-snapshot.json';

export const { banners, fetchedAt, jobs, news, partners, teams } = snapshot;

const FULL_WIDTH_DELIVERY = 'w_1400';
const CARD_WIDTH_DELIVERY = 'w_700';
const RESPONSIVE_WIDTHS = [480, 700, 1000, 1400];

export function cardImageUrl(url) {
  return url.replace(FULL_WIDTH_DELIVERY, CARD_WIDTH_DELIVERY);
}

/** Cloudinary delivers each width on demand, which suits a responsive srcset. */
export function cmsSrcset(url) {
  if (!url?.includes(FULL_WIDTH_DELIVERY)) return undefined;
  return RESPONSIVE_WIDTHS.map((width) => `${url.replace(FULL_WIDTH_DELIVERY, `w_${width}`)} ${width}w`).join(', ');
}
