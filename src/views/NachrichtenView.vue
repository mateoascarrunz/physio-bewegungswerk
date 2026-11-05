<script setup>
import { computed, onBeforeUnmount, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import NewsArticleModal from '@/components/nachrichten/NewsArticleModal.vue';
import NewsArticlePage from '@/components/nachrichten/NewsArticlePage.vue';
import NewsCard from '@/components/nachrichten/NewsCard.vue';
import { isOverlayEntry, setOverlayOpen } from '@/services/articleOverlay';
import { findArticleBySlug, latestNews, newsCardSpans } from '@/services/news';

const props = defineProps({
  /** Slug of the article in the address, if any. */
  article: { type: String, default: null },
});

const route = useRoute();
const router = useRouter();

const spans = newsCardSpans(latestNews.length);
const current = computed(() => (props.article ? findArticleBySlug(props.article) : null));
// Re-read on every navigation: whether this entry sits over the grid lives in history.
const isOverlay = computed(() => {
  void route.fullPath;
  return Boolean(current.value) && isOverlayEntry();
});

watch(isOverlay, (value) => setOverlayOpen(value), { immediate: true });
onBeforeUnmount(() => setOverlayOpen(false));

function closeOverlay() {
  if (window.history.state?.back === '/news') router.back();
  else router.push('/news');
}
</script>

<template>
  <NewsArticlePage v-if="current && !isOverlay" :article="current" />
  <div v-else class="page shell">
    <header class="news-intro">
      <p class="t-label">Aktuelles aus der Praxis</p>
      <h1 v-reveal:title class="t-h1">News</h1>
    </header>

    <div v-if="latestNews.length" class="news-grid attention">
      <NewsCard
        v-for="(entry, index) in latestNews"
        :key="entry.id"
        v-reveal="index * 50"
        :article="entry"
        :span="spans[index]"
        heading-tag="h2"
        overlay
      />
    </div>
    <p v-else class="t-lead">Weitere News: Coming soon.</p>

    <NewsArticleModal :article="isOverlay ? current : null" @close="closeOverlay" />
  </div>
</template>

<style scoped>
.news-intro {
  display: grid;
  gap: var(--space-3);
  padding-block: clamp(1rem, 3vw, 2.5rem) clamp(1.25rem, 3vw, 2.5rem);
}
</style>
