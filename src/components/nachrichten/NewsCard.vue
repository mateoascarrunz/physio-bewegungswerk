<script setup>
import { computed } from 'vue';
import BaseIcon from '../base/BaseIcon.vue';
import { cardImageUrl, cmsSrcset } from '@/services/cms';
import { formatNewsDate } from '@/services/news';

const props = defineProps({
  article: { type: Object, required: true },
  /** Column span on the 12-column grid, from newsCardSpans(). */
  span: { type: Number, default: 4 },
  headingTag: { type: String, default: 'h3' },
});

// Pairs of ratios keep neighbouring images level across a 7/5 row.
const IMAGE_RATIOS = { 12: '21 / 9', 7: '8 / 5', 5: '8 / 7', 4: '4 / 3' };

const imageRatio = computed(() => IMAGE_RATIOS[props.span] ?? '4 / 3');
const imageSizes = computed(() => `(max-width: 48rem) 92vw, ${Math.round((props.span / 12) * 100)}vw`);
</script>

<template>
  <RouterLink
    class="news-card zoom-trigger"
    :class="{ 'news-card--wide': span === 12 }"
    :style="{ '--span': span, '--image-ratio': imageRatio }"
    :to="{ path: '/news', query: { artikel: article.id } }"
  >
    <span class="news-card__media zoom-media">
      <img
        :src="cardImageUrl(article.img.url)"
        :srcset="cmsSrcset(article.img.url)"
        :sizes="imageSizes"
        :alt="article.img.alternativeText || ''"
        :width="article.img.width"
        :height="article.img.height"
        loading="lazy"
        decoding="async"
      />
    </span>
    <div class="news-card__body">
      <time class="t-label news-card__date" :datetime="article.date">{{ formatNewsDate(article.date) }}</time>
      <component :is="headingTag" class="t-h3 news-card__title">{{ article.title }}</component>
      <p v-if="article.subtitle" class="t-small news-card__summary">{{ article.subtitle }}</p>
      <span class="news-card__more">
        Weiterlesen
        <BaseIcon class="news-card__arrow" name="arrow-right" :size="18" />
      </span>
    </div>
  </RouterLink>
</template>

<style>
.news-grid {
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: var(--gap);
}

.news-card {
  grid-column: span 12;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-radius: var(--radius-lg);
  background: var(--surface);
  color: inherit;
  text-decoration: none;
  -webkit-tap-highlight-color: transparent;
  transition: background-color var(--duration-base) var(--ease-out);
}

.news-card__media {
  display: block;
  aspect-ratio: 16 / 10;
  background: var(--line);
}

.news-card__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.news-card__body {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--space-2);
  padding: clamp(1.125rem, 2vw, 1.75rem);
}

.news-card__date {
  color: var(--color-text-faint);
}

.news-card__title {
  overflow-wrap: break-word;
}

.news-card__summary {
  text-wrap: pretty;
}

.news-card__more {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  margin-block-start: auto;
  padding-block-start: var(--space-3);
  color: var(--color-brand);
  font-size: var(--text-small);
  font-weight: var(--weight-semibold);
}

.news-card__arrow {
  transition: transform var(--duration-base) var(--ease-out);
}

.news-card:active {
  background: var(--blue-100);
}

@media (hover: hover) and (pointer: fine) {
  .news-card:hover {
    background: var(--blue-100);
  }

  .news-card:hover .news-card__arrow {
    transform: translateX(3px);
  }
}

@media (min-width: 48rem) {
  .news-card {
    grid-column: span 6;
  }

  .news-card:last-child:nth-child(odd) {
    grid-column: span 12;
  }

  .news-card--wide {
    grid-column: span 12;
    flex-direction: row;
  }

  .news-card--wide .news-card__media {
    flex: 0 0 58%;
    aspect-ratio: auto;
    min-height: 22rem;
  }

  .news-card--wide .news-card__body {
    justify-content: center;
  }

  .news-card--wide .news-card__more {
    margin-block-start: var(--space-3);
  }
}

@media (min-width: 60rem) {
  .news-card,
  .news-card:last-child:nth-child(odd) {
    grid-column: span var(--span);
  }

  .news-card__media {
    aspect-ratio: var(--image-ratio);
  }
}
</style>
