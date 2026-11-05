<script setup>
import BaseButton from '../base/BaseButton.vue';
import BaseCarousel from '../base/BaseCarousel.vue';
import ServiceCard from '../dienstleistungen-services/ServiceCard.vue';
import { services } from '@/content/services';

const homeServices = services.filter((service) => service.onHome !== false);
</script>

<template>
  <section class="home-services" aria-labelledby="home-services-title">
    <BaseCarousel label="Behandlungstechniken">
      <template #header>
        <div class="section-head__text">
          <h2 id="home-services-title" class="t-h2">Behandlungs&shy;techniken</h2>
          <BaseButton variant="text" arrow to="/behandlungstechniken">Alle Behandlungstechniken</BaseButton>
        </div>
      </template>
      <li v-for="service in homeServices" :key="service.id" class="home-services__slide">
        <ServiceCard :service="service" :title="service.homeTitle" sizes="(max-width: 40rem) 78vw, 26vw" />
      </li>
    </BaseCarousel>
  </section>
</template>

<style scoped>
.home-services :deep(.section-head__text) {
  justify-items: start;
  gap: var(--space-1);
}

.home-services__slide {
  aspect-ratio: 4 / 5;
}
</style>
