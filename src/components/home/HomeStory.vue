<script setup>
import BaseButton from '../base/BaseButton.vue';
import { responsiveImage } from '@/content/media';

const image = responsiveImage('places/team-gym');
</script>

<template>
  <section class="story bento" aria-labelledby="story-title">
    <div v-reveal class="story__text card card--blue">
      <h2 id="story-title" v-reveal:title="140" class="t-h2">Vom Traum zur Realität</h2>
      <p class="story__subtitle">Unsere eigene Praxis – eine Reise von 10 Jahren Zusammenarbeit</p>
      <p class="t-body">
        Im Mai 2023 haben wir unsere eigene Praxis gegründet, nachdem wir fast 10 Jahre Seite an Seite gearbeitet haben.
        Unsere langjährige berufliche Partnerschaft, unser gemeinsames Verständnis für Behandlungen und das gegenseitige
        Vertrauen waren starke Anreize für uns, das Projekt der eigenen Praxis zu verwirklichen.
      </p>
      <BaseButton class="story__action" variant="text" arrow to="/uberuns">Mehr über uns</BaseButton>
    </div>
    <div v-reveal:mask="80" class="story__media drift">
      <img
        v-bind="image"
        sizes="(max-width: 60rem) 96vw, 58vw"
        alt="Dominik Geissberger und Marit Hesse an einem Trainingsgerät in ihrer Praxis"
        width="1600"
        height="1083"
        loading="lazy"
        decoding="async"
      />
    </div>
  </section>
</template>

<style scoped>
.story__text {
  grid-column: span 12;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--space-4);
}

.story__subtitle {
  color: var(--blue-950);
  font-size: var(--text-lead);
  font-weight: var(--weight-semibold);
  line-height: 1.35;
  text-wrap: balance;
}

.story__text .t-body {
  color: var(--blue-950);
}

.story__action {
  margin-block-start: auto;
}

.story__media {
  grid-column: span 12;
  overflow: hidden;
  border-radius: var(--radius-lg);
  background: var(--surface);
  aspect-ratio: 3 / 2;
}

.story__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

@media (min-width: 60rem) {
  .story__text {
    grid-column: span 5;
  }

  .story__media {
    grid-column: span 7;
    aspect-ratio: auto;
    min-height: 100%;
  }
}
</style>
