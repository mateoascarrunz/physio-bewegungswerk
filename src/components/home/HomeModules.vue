<script setup>
import BaseButton from '../base/BaseButton.vue';
import BaseIcon from '../base/BaseIcon.vue';
import { responsiveImage } from '@/content/media';
import { PRACTICE } from '@/content/practice';

const locationImage = responsiveImage('places/exterior');
</script>

<template>
  <section class="modules bento" aria-label="Weitere Angebote">
    <article v-reveal class="modules__private card">
      <p class="t-label">Ohne ärztliche Verordnung</p>
      <h2 class="t-h2">Private Physiotherapie</h2>
      <p class="t-body">
        Gezielte Behandlungen, abgestimmt auf Ihren Alltag, Ihren Körper und Ihr Energielevel.
      </p>
      <dl class="modules__prices">
        <div>
          <dt>25 Minuten</dt>
          <dd>CHF 75.–</dd>
        </div>
        <div>
          <dt>50 Minuten</dt>
          <dd>CHF 145.–</dd>
        </div>
      </dl>
      <BaseButton class="modules__action" variant="text" arrow to="/private">Mehr erfahren</BaseButton>
    </article>

    <article v-reveal:mask="80" class="modules__location drift">
      <img
        v-bind="locationImage"
        sizes="(max-width: 60rem) 96vw, 58vw"
        alt="Die Praxis von aussen, mit dem Logo von Physio Bewegungswerk auf den Fenstern"
        width="1600"
        height="999"
        loading="lazy"
        decoding="async"
      />
      <div class="modules__location-panel">
        <div>
          <p class="t-label">Unser Standort</p>
          <p class="modules__address">{{ PRACTICE.address }}</p>
          <p class="t-small modules__parking">
            <BaseIcon name="parking" :size="18" />
            Parkplätze vor der Praxis vorhanden
          </p>
        </div>
        <BaseButton variant="secondary" size="sm" arrow :href="PRACTICE.mapsUrl">Route planen</BaseButton>
      </div>
    </article>
  </section>
</template>

<style scoped>
.modules__private {
  grid-column: span 12;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--space-4);
}

.modules__prices {
  display: grid;
  width: 100%;
  margin-block: var(--space-2);
}

.modules__prices div {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: var(--space-4);
  padding-block: var(--space-3);
  border-block-start: 1px solid var(--line-strong);
}

.modules__prices div:last-child {
  border-block-end: 1px solid var(--line-strong);
}

.modules__prices dt {
  color: var(--color-text-soft);
  font-size: 0.9375rem;
}

.modules__prices dd {
  color: var(--blue-950);
  font-size: var(--text-h3);
  font-weight: var(--weight-bold);
  letter-spacing: -0.014em;
  white-space: nowrap;
}

.modules__action {
  margin-block-start: auto;
}

.modules__location {
  position: relative;
  grid-column: span 12;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-radius: var(--radius-lg);
  background: var(--surface);
}

.modules__location img {
  flex: 1;
  width: 100%;
  min-height: 15rem;
  object-fit: cover;
}

.modules__location-panel {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: var(--space-4);
  padding: clamp(1.125rem, 2vw, 1.75rem);
}

.modules__address {
  margin-block-start: var(--space-2);
  color: var(--blue-950);
  font-size: var(--text-h3);
  font-weight: var(--weight-semibold);
  letter-spacing: -0.014em;
  line-height: var(--leading-snug);
}

.modules__parking {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  margin-block-start: var(--space-1);
}

.modules__parking svg {
  color: var(--color-brand);
}

@media (min-width: 60rem) {
  .modules__private {
    grid-column: span 5;
  }

  .modules__location {
    grid-column: span 7;
  }
}
</style>
