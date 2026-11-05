<script setup>
import { defineAsyncComponent, ref, useId, watch } from 'vue';
import BaseModal from '../base/BaseModal.vue';
import BaseIcon from '../base/BaseIcon.vue';
import { cmsSrcset } from '@/services/cms';
import { formatNewsDate } from '@/services/news';

const BaseRichText = defineAsyncComponent(() => import('../base/BaseRichText.vue'));

const props = defineProps({
  /** The CMS article to show. Clearing it closes the dialog. */
  article: { type: Object, default: null },
});

defineEmits(['close']);

const titleId = useId();
// Keeps the article on screen while the dialog plays its exit.
const shown = ref(null);

watch(
  () => props.article,
  (article) => {
    if (article) shown.value = article;
  },
  { immediate: true },
);
</script>

<template>
  <BaseModal :open="Boolean(article)" :labelledby="titleId" size="md" @close="$emit('close')">
    <article v-if="shown" class="article">
      <div class="article__media">
        <img
          :src="shown.img.url"
          :srcset="cmsSrcset(shown.img.url)"
          sizes="(max-width: 46rem) 100vw, 46rem"
          :alt="shown.img.alternativeText || ''"
          :width="shown.img.width"
          :height="shown.img.height"
        />
      </div>
      <div class="article__content">
        <header class="article__header">
          <h2 :id="titleId" class="t-h2">{{ shown.title }}</h2>
          <p v-if="shown.subtitle" class="t-lead">{{ shown.subtitle }}</p>
          <ul class="article__meta">
            <li>
              <BaseIcon name="calendar" :size="16" />
              <time :datetime="shown.date">{{ formatNewsDate(shown.date) }}</time>
            </li>
            <li v-if="shown.author">
              <BaseIcon name="user" :size="16" />
              {{ shown.author }}
            </li>
          </ul>
        </header>
        <BaseRichText class="article__body prose" :markdown-text="shown.text" />
      </div>
    </article>
  </BaseModal>
</template>

<style>
.article__media {
  aspect-ratio: 16 / 9;
  background: var(--surface);
}

.article__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.article__content {
  display: grid;
  gap: var(--space-5);
  padding: clamp(1.25rem, 4vw, 3rem);
  padding-block-end: clamp(2rem, 5vw, 3.5rem);
}

.article__header {
  display: grid;
  gap: var(--space-3);
  padding-block-end: var(--space-5);
  border-block-end: 1px solid var(--line);
}

.article__meta {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-1) var(--space-5);
  color: var(--color-text-faint);
  font-size: var(--text-small);
}

.article__meta li {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
}

.article__meta svg {
  color: var(--color-brand);
}

.article__body {
  max-width: 38rem;
  min-height: 6rem;
  font-size: 1.0625rem;
}

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
