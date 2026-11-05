<script setup>
import { computed } from 'vue';

const props = defineProps({
  bannerMessage: { type: Array, default: () => [] },
});

const messages = computed(() => props.bannerMessage.filter((banner) => banner.Visible));
</script>

<template>
  <div v-if="messages.length" class="site-banner" role="region" aria-label="Mitteilungen">
    <p v-for="banner in messages" :key="banner.id">{{ banner.BannerTitle }}</p>
  </div>
</template>

<style scoped>
.site-banner {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--space-1) var(--space-6);
  padding: var(--space-2) var(--gutter);
  background: var(--blue-950);
  color: var(--white);
  font-size: var(--text-small);
  font-weight: var(--weight-medium);
  line-height: 1.4;
  text-align: center;
}
</style>
