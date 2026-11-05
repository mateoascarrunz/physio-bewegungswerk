import snapshot from '@/content/cms-snapshot.json';

export const { banners, jobs, news, partners, teams } = snapshot;

const FULL_WIDTH_DELIVERY = 'w_1400';
const CARD_WIDTH_DELIVERY = 'w_700';

export function cardImageUrl(url) {
  return url.replace(FULL_WIDTH_DELIVERY, CARD_WIDTH_DELIVERY);
}
