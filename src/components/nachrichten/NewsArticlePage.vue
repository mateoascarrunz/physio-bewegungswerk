<script setup>
import { computed, defineAsyncComponent } from 'vue';
import BaseBreadcrumbs from '../base/BaseBreadcrumbs.vue';
import BaseButton from '../base/BaseButton.vue';
import BaseIcon from '../base/BaseIcon.vue';
import NewsCard from './NewsCard.vue';
import { cmsSrcset } from '@/services/cms';
import { formatNewsDate, latestNews, newsCardSpans } from '@/services/news';
import { sharedStyle } from '@/services/viewTransition';

const BaseRichText = defineAsyncComponent(() => import('../base/BaseRichText.vue'));

const MORE_ARTICLES = 3;

const props = defineProps({
  article: { type: Object, required: true },
});

const others = computed(() => latestNews.filter((entry) => entry.id !== props.article.id).slice(0, MORE_ARTICLES));
const spans = computed(() => newsCardSpans(others.value.length));
const trail = computed(() => [
  { to: '/', label: 'Home' },
  { to: '/news', label: 'News' },
  { label: props.article.title },
]);
</script>

<template>
  <div class="page shell">
    <article class="article-page" aria-labelledby="article-title">
      <BaseBreadcrumbs :items="trail" />
      <header class="article-page__header">
        <p class="t-label">
          <time :datetime="article.date">{{ formatNewsDate(article.date) }}</time>
        </p>
        <h1 id="article-title" v-reveal:title class="t-h1">{{ article.title }}</h1>
        <p v-if="article.subtitle" class="t-lead">{{ article.subtitle }}</p>
        <p v-if="article.author" class="article-page__author">
          <BaseIcon name="user" :size="18" />
          {{ article.author }}
        </p>
      </header>

      <div class="article-page__media" :style="sharedStyle('news', article.id, 'page', 'shared-media')">
        <img
          :src="article.img.url"
          :srcset="cmsSrcset(article.img.url)"
          sizes="(max-width: 60rem) 96vw, 70rem"
          :alt="article.img.alternativeText || ''"
          :width="article.img.width"
          :height="article.img.height"
          fetchpriority="high"
          decoding="async"
        />
      </div>

      <BaseRichText class="article-page__body prose" :markdown-text="article.text" />
    </article>

    <section v-if="others.length" class="section" aria-labelledby="more-news-title">
      <div class="section-head">
        <h2 id="more-news-title" v-reveal:title class="t-h2">Weitere News</h2>
        <BaseButton variant="text" arrow to="/news">Alle News</BaseButton>
      </div>
      <div class="news-grid attention">
        <NewsCard v-for="(entry, index) in others" :key="entry.id" v-reveal="index * 60" :article="entry" :span="spans[index]" />
      </div>
    </section>
  </div>
</template>

<style scoped>
.article-page {
  display: grid;
  gap: var(--space-5);
  max-width: 70rem;
  margin-inline: auto;
}

.article-page__header {
  display: grid;
  gap: var(--space-3);
  max-width: 48rem;
}

.article-page__header .t-label {
  color: var(--color-text-faint);
}

.article-page__author {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  color: var(--color-text-soft);
  font-size: var(--text-small);
}

.article-page__author svg {
  color: var(--color-brand);
}

.article-page__media {
  overflow: hidden;
  aspect-ratio: 16 / 9;
  border-radius: var(--radius-xl);
  background: var(--surface);
}

.article-page__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.article-page__body {
  max-width: 42rem;
  margin-inline: auto;
  font-size: 1.0625rem;
}
</style>
