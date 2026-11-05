const modules = import.meta.glob('../assets/images/{services,places}/*.webp', {
  eager: true,
  query: '?url',
  import: 'default',
});

const library = {};
for (const [path, url] of Object.entries(modules)) {
  const [, key, width] = path.match(/images\/([\w-]+\/[\w-]+)-(\d+)\.webp$/);
  (library[key] ??= []).push({ url, width: Number(width) });
}

/**
 * Attributes for a responsive local image: `v-bind="responsiveImage('places/exterior')"`.
 * The middle variant is the src fallback for the rare browser without srcset.
 */
export function responsiveImage(key) {
  const variants = [...library[key]].sort((a, b) => a.width - b.width);
  return {
    src: variants[Math.floor((variants.length - 1) / 2)].url,
    srcset: variants.map(({ url, width }) => `${url} ${width}w`).join(', '),
  };
}
