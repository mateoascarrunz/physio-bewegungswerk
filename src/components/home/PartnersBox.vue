<script setup>
import { partners } from '@/services/cms';
</script>

<template>
  <section v-if="partners.length" class="partners" aria-labelledby="partners-title">
    <h2 id="partners-title" class="t-label">Partners</h2>
    <ul class="partners__list">
      <li v-for="partner in partners" :key="partner.id">
        <img
          :src="partner.Partner_logo[0].url"
          :alt="partner.Partner_logo[0].alternativeText || partner.Partner_logo[0].name"
          loading="lazy"
          decoding="async"
        />
      </li>
    </ul>
  </section>
</template>

<style scoped>
.partners {
  display: grid;
  gap: var(--space-5);
}

.partners__list {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-5) clamp(2rem, 5vw, 4.5rem);
}

.partners__list img {
  width: auto;
  max-width: 11rem;
  height: 3.25rem;
  object-fit: contain;
}
</style>
