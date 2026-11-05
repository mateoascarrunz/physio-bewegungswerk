<script setup>
import { computed } from 'vue';
import MarkdownIt from 'markdown-it';

const props = defineProps({
  markdownText: { type: String, default: '' },
});

const GALLERY_IMAGE_WIDTH = 800;
const CLOUDINARY_UPLOAD = '/image/upload/';

// Raw HTML stays disabled, so CMS text can only produce what markdown allows.
const markdown = new MarkdownIt({ html: false, linkify: true });
const { escapeHtml } = markdown.utils;

function optimisedUrl(url) {
  if (!url.includes('res.cloudinary.com') || !url.includes(`${CLOUDINARY_UPLOAD}v`)) return url;
  return url.replace(CLOUDINARY_UPLOAD, `${CLOUDINARY_UPLOAD}f_auto,q_auto,c_limit,w_${GALLERY_IMAGE_WIDTH}/`);
}

function imageTag(token) {
  const src = token.attrGet('src') ?? '';
  // Editors often leave the file name as the description, which helps nobody.
  const description = /\.(webp|jpe?g|png|gif|avif)$/i.test(token.content) ? '' : token.content;
  return `<img src="${escapeHtml(optimisedUrl(src))}" alt="${escapeHtml(description)}" loading="lazy" decoding="async">`;
}

// Photos written into a paragraph are lifted out into a tidy gallery beneath it.
markdown.core.ruler.push('article_gallery', (state) => {
  const result = [];
  for (let index = 0; index < state.tokens.length; index += 1) {
    const token = state.tokens[index];
    if (token.type !== 'inline' || !token.children?.some((child) => child.type === 'image')) {
      result.push(token);
      continue;
    }

    const images = token.children.filter((child) => child.type === 'image');
    const others = token.children.filter((child) => child.type !== 'image');
    while (others.length && !others.at(-1).content.trim()) others.pop();
    token.children = others;

    index += 1; // The paragraph's closing token is dealt with here too.
    if (others.length) result.push(token, state.tokens[index]);
    else result.pop(); // Nothing but photos, so the empty paragraph goes.

    const gallery = new state.Token('html_block', '', 0);
    gallery.content = `<div class="article__gallery">${images.map(imageTag).join('')}</div>`;
    result.push(gallery);
  }
  state.tokens = result;
});

const defaultLinkOpen =
  markdown.renderer.rules.link_open ?? ((tokens, index, options, env, self) => self.renderToken(tokens, index, options));

markdown.renderer.rules.link_open = (tokens, index, options, env, self) => {
  const token = tokens[index];
  if (/^https?:/.test(token.attrGet('href') ?? '')) {
    token.attrSet('target', '_blank');
    token.attrSet('rel', 'noopener noreferrer');
  }
  return defaultLinkOpen(tokens, index, options, env, self);
};

const html = computed(() => markdown.render(props.markdownText));
</script>

<template>
  <!-- eslint-disable-next-line vue/no-v-html -->
  <div v-html="html"></div>
</template>

<style>
/* Photos lifted out of a paragraph sit in a two-column gallery. */
.article__gallery {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--space-2);
  margin-block-start: var(--space-5);
}

.article__gallery img {
  width: 100%;
  height: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  border-radius: var(--radius-sm);
  background: var(--surface);
}

.article__gallery img:only-child {
  grid-column: span 2;
  aspect-ratio: 16 / 9;
}
</style>
