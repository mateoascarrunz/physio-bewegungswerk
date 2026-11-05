<script setup>
import BaseButton from '../base/BaseButton.vue';
import { responsiveImage } from '@/content/media';
import { jobs } from '@/services/cms';

const image = responsiveImage('places/team-desk');

function scrollToJobs() {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.getElementById('stellen')?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
}
</script>

<template>
  <section class="about-intro bento" aria-labelledby="about-title">
    <div v-reveal:assemble class="about-intro__lead">
      <p class="t-label">Über uns</p>
      <h1 id="about-title" class="t-h1">Unser Behandlungs&shy;ansatz</h1>
      <p class="t-lead">
        In unserer Praxis betrachten wir jeden Patienten als einzigartiges Individuum. Unser Therapieansatz ist flexibel.
        Wir entwickeln individuelle Behandlungspläne, die auf die spezifischen Bedürfnisse und Ziele jedes Patienten
        zugeschnitten sind. Wir arbeiten eng mit unseren Patienten zusammen, um gemeinsam Strategien zu
        gestalten/entwerfen, die darauf abzielen, die gewünschten Ergebnisse zu erreichen.
      </p>
      <div class="about-intro__actions">
        <BaseButton v-if="jobs.length" @click="scrollToJobs">Offene Stellen</BaseButton>
        <BaseButton variant="secondary" to="/faq">FAQ</BaseButton>
      </div>
    </div>

    <div class="about-intro__media drift">
      <img
        v-bind="image"
        sizes="(max-width: 60rem) 96vw, 58vw"
        alt="Dominik Geissberger und Marit Hesse im Gespräch an einem Tisch in der Praxis"
        width="1600"
        height="1067"
        fetchpriority="high"
        decoding="async"
      />
    </div>

    <div v-reveal="120" class="about-intro__point card">
      <h2 class="t-h3">Ganzheitlich</h2>
      <p class="t-body">
        Unser Ansatz ist ganzheitlich, was bedeutet, dass wir nicht nur Symptome behandeln, sondern auch die zugrunde
        liegenden Ursachen und den Gesamtzusammenhang berücksichtigen. Das Hauptziel ist es, langfristige Verbesserungen
        im Wohlbefinden unserer Patienten zu erreichen.
      </p>
    </div>
    <div v-reveal="200" class="about-intro__point card card--blue">
      <h2 class="t-h3">Individuell</h2>
      <p class="t-body">
        Uns ist es besonders wichtig, jeden unserer Patienten mit Respekt und in ihrer Einzigartigkeit zu behandeln. Wir
        engagieren uns dafür, individuell angepasste Lösungen für ihre spezifischen Bedürfnisse bereitzustellen.
      </p>
    </div>
  </section>
</template>

<style scoped>
.about-intro__lead {
  grid-column: span 12;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--space-4);
  padding-block: clamp(1rem, 3vw, 2.5rem) var(--space-3);
}

.about-intro__lead h1 {
  hyphens: manual;
}

.about-intro__actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  margin-block-start: var(--space-2);
}

.about-intro__media {
  grid-column: span 12;
  overflow: hidden;
  aspect-ratio: 3 / 2;
  border-radius: var(--radius-xl);
  background: var(--surface);
}

.about-intro__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 42% 40%;
}

.about-intro__point {
  grid-column: span 12;
  display: grid;
  align-content: start;
  gap: var(--space-3);
}

.about-intro__point.card--blue .t-body {
  color: var(--blue-950);
}

@media (min-width: 40rem) {
  .about-intro__point {
    grid-column: span 6;
  }
}

/* Desktop: text in five columns, a larger photo in seven, so the page opens on people. */
@media (min-width: 60rem) {
  .about-intro__lead {
    grid-column: span 5;
    justify-content: center;
    padding-block: var(--space-5);
    padding-inline-end: clamp(0rem, 2vw, 2rem);
  }

  .about-intro__media {
    grid-column: span 7;
    aspect-ratio: auto;
    min-height: clamp(26rem, 38vw, 40rem);
  }
}
</style>
