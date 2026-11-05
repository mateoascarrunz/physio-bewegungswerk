<script setup>
import { responsiveImage } from '@/content/media';
import { teams } from '@/services/cms';

const image = responsiveImage('places/team-gym');

const facts = [
  { value: 'Mai 2023', label: 'Gründung der eigenen Praxis' },
  { value: '10 Jahre', label: 'Zusammenarbeit' },
  { value: String(teams.length), label: 'Therapeutinnen und Therapeuten' },
];
</script>

<template>
  <section id="uber_company" class="company bento" aria-labelledby="company-title">
    <div v-reveal class="company__media">
      <img
        v-bind="image"
        sizes="(max-width: 60rem) 96vw, 50vw"
        alt="Dominik Geissberger und Marit Hesse an einem Trainingsgerät in ihrer Praxis"
        width="1600"
        height="1083"
        loading="lazy"
        decoding="async"
      />
    </div>
    <div v-reveal="60" class="company__text">
      <p class="t-label">Über Physio Bewegungswerk</p>
      <h2 id="company-title" class="t-h2">
        Vom Traum zur Realität: Unsere eigene Praxis - Eine Reise von 10 Jahren Zusammenarbeit.
      </h2>
      <p class="t-body">
        Aus einem gemeinsamen Traum wurde Wirklichkeit - Im Mai 2023 haben wir unsere eigene Praxis gegründet nachdem wir
        fast 10 Jahre Seite an Seite gearbeitet haben. Das gegenseitige Verständnis, die gemeinsame Herangehensweise in
        unseren Behandlungen und das gegenseitige volle Vertrauen waren für uns beste Voraussetzungen, uns in ein neues
        Abenteuer zu stürzen und das Projekt eigene Praxis umzusetzen.
      </p>
      <dl class="company__facts">
        <div v-for="fact in facts" :key="fact.label">
          <dt>{{ fact.label }}</dt>
          <dd>{{ fact.value }}</dd>
        </div>
      </dl>
    </div>
  </section>
</template>

<style scoped>
.company {
  row-gap: var(--space-5);
}

.company__media {
  grid-column: span 12;
  overflow: hidden;
  aspect-ratio: 3 / 2;
  border-radius: var(--radius-lg);
  background: var(--surface);
}

.company__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.company__text {
  grid-column: span 12;
  display: grid;
  align-content: center;
  gap: var(--space-4);
}

.company__facts {
  display: grid;
  gap: var(--space-3);
  margin-block-start: var(--space-3);
  padding-block-start: var(--space-4);
  border-block-start: 1px solid var(--line);
}

.company__facts div {
  display: flex;
  flex-direction: column-reverse;
  justify-content: flex-end;
  gap: 0.125rem;
}


.company__facts dd {
  color: var(--color-brand);
  font-size: var(--text-h3);
  font-weight: var(--weight-bold);
  letter-spacing: -0.016em;
  line-height: 1.2;
}

.company__facts dt {
  color: var(--color-text-soft);
  font-size: var(--text-small);
  line-height: 1.35;
}

@media (min-width: 30rem) {
  .company__facts {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: var(--space-4);
  }
}

@media (min-width: 60rem) {
  .company__media {
    grid-column: span 6;
    aspect-ratio: auto;
    min-height: 100%;
  }

  .company__text {
    grid-column: 7 / span 6;
    padding-block: var(--space-5);
    padding-inline-start: clamp(0rem, 3vw, 3.5rem);
  }
}
</style>
