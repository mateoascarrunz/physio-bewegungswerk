<script setup>
import BaseButton from '../base/BaseButton.vue';
import { BOOKING_URL, PRACTICE } from '@/content/practice';
import watermarkUrl from '@/assets/images/physio_icon_white.svg';
</script>

<template>
  <section v-reveal class="cta card card--brand" aria-labelledby="cta-title">
    <img class="cta__watermark" :src="watermarkUrl" alt="" width="58" height="60" loading="lazy" />
    <div class="cta__content">
      <h2 id="cta-title" class="t-h1 cta__title">Vereinbaren Sie gerne online einen Termin mit uns</h2>
      <div class="cta__actions">
        <BaseButton variant="inverse" arrow :href="BOOKING_URL">Termin vereinbaren</BaseButton>
        <a class="cta__phone" :href="PRACTICE.phone.href">oder anrufen: {{ PRACTICE.phone.label }}</a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cta {
  position: relative;
  overflow: hidden;
  border-radius: var(--radius-xl);
  padding-block: clamp(2.25rem, 5vw, 4.5rem);
}

.cta__content {
  position: relative;
  display: grid;
  justify-items: start;
  gap: clamp(1.5rem, 3vw, 2.5rem);
  max-width: 48rem;
}

.cta__title {
  color: var(--white);
}

.cta__actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-3) var(--space-5);
}

.cta__phone {
  display: inline-flex;
  align-items: center;
  min-height: 2.75rem;
  border-radius: var(--radius-sm);
  color: var(--white);
  font-size: 0.9375rem;
  font-weight: var(--weight-medium);
  text-decoration: underline;
  text-decoration-color: rgb(255 255 255 / 0.5);
  transition: text-decoration-color var(--duration-fast) var(--ease-out);
}

@media (hover: hover) and (pointer: fine) {
  .cta__phone:hover {
    text-decoration-color: var(--white);
  }
}

.cta__watermark {
  position: absolute;
  right: clamp(-4rem, -2vw, -1rem);
  bottom: clamp(-5rem, -3vw, -1.5rem);
  width: clamp(12rem, 32vw, 26rem);
  height: auto;
  opacity: 0.16;
  pointer-events: none;
}
</style>
