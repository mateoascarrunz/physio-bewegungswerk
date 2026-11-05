<script setup>
import BaseButton from '@/components/base/BaseButton.vue';
import Icon404 from '@/components/icon/Icon404.vue';
</script>

<template>
  <div class="page shell">
    <section class="not-found" aria-labelledby="not-found-title">
      <div class="not-found__text">
        <p class="t-label">Fehler 404</p>
        <h1 id="not-found-title" class="t-display not-found__title">Hoppla!</h1>
        <p class="t-lead">
          Sie haben sich verlaufen. Kein Problem, bleib beweglich. Kehren Sie zur Startseite zurück, um den Weg zur
          Gesundheit zu finden.
        </p>
        <BaseButton arrow to="/">Zur Startseite</BaseButton>
      </div>
      <Icon404 class="not-found__art" aria-hidden="true" />
    </section>
  </div>
</template>

<style scoped>
.not-found {
  display: grid;
  align-items: center;
  gap: var(--space-5);
  overflow: hidden;
  padding: var(--card-pad);
  border-radius: var(--radius-xl);
  background: var(--surface);
}

.not-found__text {
  display: grid;
  justify-items: start;
  gap: var(--space-4);
  max-width: 34rem;
}

.not-found__title {
  color: var(--color-brand);
}

.not-found__art {
  justify-self: center;
  width: min(100%, 28rem);
  height: auto;
}

@media (min-width: 60rem) {
  .not-found {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    min-height: 34rem;
  }
}
</style>
