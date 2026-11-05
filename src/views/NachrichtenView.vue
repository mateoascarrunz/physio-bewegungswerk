<script setup>
import { computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import NewsCard from '@/components/nachrichten/NewsCard.vue';
import NewsArticleModal from '@/components/nachrichten/NewsArticleModal.vue';
import { useQueryModal } from '@/composables/useQueryModal';
import { findArticle, latestNews, newsCardSpans } from '@/services/news';

const route = useRoute();
const { value: articleId, close } = useQueryModal('artikel');

const spans = newsCardSpans(latestNews.length);
const article = computed(() => (articleId.value ? findArticle(articleId.value) : null));

watch(
  [articleId, article],
  ([id, found]) => {
    // An old link may point at an article that has since been unpublished.
    if (id && !found) close();
    document.title = found ? `${found.title} - Physio Bewegungswerk` : route.meta.title;
  },
  { immediate: true },
);
</script>

<template>
  <div class="page shell">
    <header class="news-intro">
      <p class="t-label">Aktuelles aus der Praxis</p>
      <h1 class="t-h1">News</h1>
    </header>

    <div v-if="latestNews.length" class="news-grid">
      <NewsCard
        v-for="(entry, index) in latestNews"
        :key="entry.id"
        v-reveal="index * 50"
        :article="entry"
        :span="spans[index]"
        heading-tag="h2"
      />
    </div>
    <p v-else class="t-lead">Weitere News: Coming soon.</p>

    <NewsArticleModal :article="article" @close="close" />
  </div>
</template>

<style scoped>
.news-intro {
  display: grid;
  gap: var(--space-3);
  padding-block: clamp(1rem, 3vw, 2.5rem) clamp(1.25rem, 3vw, 2.5rem);
}
</style>
