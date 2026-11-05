import { describe, expect, it } from 'vitest';
import { findInvalidEntries, flatten } from '../../src/services/cmsMapper.js';

const media = {
  id: 7,
  name: 'team.jpg',
  url: 'https://res.cloudinary.com/demo/image/upload/v1/team.jpg',
  mime: 'image/jpeg',
  width: 800,
  height: 600,
  formats: { thumbnail: {} },
};
const optimisedUrl = 'https://res.cloudinary.com/demo/image/upload/f_auto,q_auto,c_limit,w_1400/v1/team.jpg';

describe('flatten', () => {
  it('flattens Strapi 4 entries and relations', () => {
    const entry = { id: 1, attributes: { name: 'A', coverPhoto: { data: { id: 7, attributes: media } } } };
    expect(flatten(entry)).toMatchObject({ id: 1, name: 'A', coverPhoto: { url: optimisedUrl, width: 800 } });
  });

  it('leaves Strapi 5 entries flat and produces the same media shape', () => {
    const entry = { id: 1, documentId: 'abc', name: 'A', coverPhoto: media };
    expect(flatten(entry)).toMatchObject({ documentId: 'abc', name: 'A', coverPhoto: { url: optimisedUrl } });
  });

  it('drops unused media fields', () => {
    expect(flatten(media)).not.toHaveProperty('formats');
  });

  it('flattens multiple media and empty relations', () => {
    const entry = { attributes: { Partner_logo: { data: [{ id: 7, attributes: media }] }, img: { data: null } } };
    const result = flatten(entry);
    expect(result.Partner_logo[0].url).toBe(optimisedUrl);
    expect(result.img).toBeNull();
  });

  it('keeps non-Cloudinary URLs untouched', () => {
    const local = { ...media, url: '/uploads/team.jpg' };
    expect(flatten(local).url).toBe('/uploads/team.jpg');
  });
});

describe('findInvalidEntries', () => {
  it('reports entries missing required fields', () => {
    expect(findInvalidEntries('jobs', [{ name: 'Physio' }, { name: null }])).toHaveLength(1);
  });

  it('accepts valid entries', () => {
    expect(findInvalidEntries('banners', [{ BannerTitle: 'Geschlossen' }])).toHaveLength(0);
  });
});
