<script setup>
import BaseButton from '../base/BaseButton.vue';
import NewsCard from '../nachrichten/NewsCard.vue';
import { latestNews, newsCardSpans } from '@/services/news';

const MAX_ARTICLES = 3;

const articles = latestNews.slice(0, MAX_ARTICLES);
const spans = newsCardSpans(articles.length);
</script>

<template>
  <section v-if="articles.length" aria-labelledby="home-news-title">
    <div class="section-head">
      <h2 id="home-news-title" v-reveal:title class="t-h2">News</h2>
      <BaseButton variant="text" arrow to="/news">Alle News</BaseButton>
    </div>
    <div class="news-grid attention">
      <NewsCard
        v-for="(article, index) in articles"
        :key="article.id"
        v-reveal="index * 60"
        :article="article"
        :span="spans[index]"
      />
    </div>
  </section>
</template>
