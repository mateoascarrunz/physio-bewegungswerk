<script setup>
import BaseButton from '@/components/base/BaseButton.vue';
import BaseIcon from '@/components/base/BaseIcon.vue';
import { BOOKING_URL } from '@/content/practice';

const EXPECTATIONS = [
  'Individuelle Befundaufnahme mit klaren, erreichbaren Zielen',
  'Manuelle Techniken zur Lösung von Muskel- und Faszienspannungen',
  'Aktive Übungsprogramme für Stabilität, Kraft und Mobilität',
  'Faszien-/Triggerpunkt-Behandlung & Gelenkmobilisation (je nach Bedarf)',
  'Atem- und Entspannungstechniken zur Regeneration und Stressreduktion',
  'Ein kurzes, alltagstaugliches Heimprogramm für nachhaltige Ergebnisse',
];

const AUDIENCES = [
  'Menschen, die sich etwas Gutes tun und präventiv an ihrer Gesundheit arbeiten wollen',
  'Schnellere Regeneration nach dem Training & Reduktion von Muskelkater',
  'Gezieltes Vorgehen bei Büro-/Alltagsverspannungen (Nacken, Rücken, Schulter)',
  'Frühes Gegensteuern bei wiederkehrenden Beschwerden',
  'Sanfter Wiedereinstieg nach Belastungspausen',
];

const PRICES = [
  { minutes: 25, price: 'CHF 75.–' },
  { minutes: 50, price: 'CHF 145.–' },
];
</script>

<template>
  <div class="page shell">
    <section class="private bento" aria-labelledby="private-title">
      <header class="private__intro">
        <p class="t-label">Ganz ohne ärztliche Verordnung</p>
        <h1 id="private-title" class="t-h1">Private Physiotherapie</h1>
        <p class="t-lead">
          Gönnen Sie sich gezielte physiotherapeutische Behandlungen – ganz ohne ärztliche Verordnung. In unseren privaten
          Sessions nehmen wir uns Zeit für eine gründliche Anamnese, eine präzise Befundaufnahme und eine Behandlung, die
          genau zu Ihrem Alltag, Ihrem Körper und Ihrem Energielevel passt.
        </p>
        <p class="t-body">
          Ziel ist es, Spannungen zu lösen, Beweglichkeit zurückzugewinnen, Schmerzen zu reduzieren und langfristig in Ihre
          Gesundheit zu investieren. Gemeinsam definieren wir Ihre Ziele und wählen evidenzbasierte Techniken, die zu Ihnen
          passen.
        </p>
      </header>

      <aside class="private__prices card card--brand" aria-labelledby="prices-title">
        <h2 id="prices-title" class="private__prices-title">Preise</h2>
        <dl class="private__price-list">
          <div v-for="entry in PRICES" :key="entry.minutes">
            <dt>{{ entry.minutes }} Minuten</dt>
            <dd>{{ entry.price }}</dd>
          </div>
        </dl>
        <BaseButton variant="inverse" block arrow :href="BOOKING_URL">Termin vereinbaren</BaseButton>
      </aside>

      <section class="private__list card" aria-labelledby="expect-title">
        <h2 id="expect-title" class="t-h3">Was Sie erwartet</h2>
        <ul>
          <li v-for="item in EXPECTATIONS" :key="item">
            <BaseIcon name="check" :size="18" />
            <span>{{ item }}</span>
          </li>
        </ul>
      </section>

      <section class="private__list card card--blue" aria-labelledby="ideal-title">
        <h2 id="ideal-title" class="t-h3">Ideal für</h2>
        <ul>
          <li v-for="item in AUDIENCES" :key="item">
            <BaseIcon name="check" :size="18" />
            <span>{{ item }}</span>
          </li>
        </ul>
      </section>

      <aside class="private__note card card--line" role="note" aria-label="Kostenübernahme">
        <p>
          <strong>Hinweis:</strong> Mit ärztlicher Verordnung werden die Kosten von der Grundversicherung sowie von IV und
          MV übernommen.
        </p>
        <BaseButton variant="secondary" size="sm" arrow to="/faq">Mehr im FAQ</BaseButton>
      </aside>
    </section>
  </div>
</template>

<style scoped>
.private > * {
  grid-column: span 12;
}

.private__intro {
  display: grid;
  align-content: center;
  gap: var(--space-4);
  padding-block: clamp(1rem, 3vw, 2.5rem) var(--space-3);
}

.private__prices {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  border-radius: var(--radius-xl);
}

.private__prices-title {
  color: var(--blue-200);
  font-size: var(--text-small);
  font-weight: var(--weight-semibold);
  letter-spacing: var(--tracking-label);
  text-transform: uppercase;
}

.private__price-list {
  display: grid;
  margin-block-end: auto;
}

.private__price-list div {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  gap: var(--space-1) var(--space-4);
  padding-block: var(--space-4);
  border-block-end: 1px solid rgb(255 255 255 / 0.28);
}

.private__price-list dt {
  font-size: 1rem;
}

.private__price-list dd {
  color: var(--white);
  font-size: var(--text-h2);
  font-weight: var(--weight-bold);
  letter-spacing: var(--tracking-heading);
  line-height: 1.1;
  white-space: nowrap;
}

.private__list {
  display: grid;
  align-content: start;
  gap: var(--space-4);
}

.private__list ul {
  display: grid;
  gap: var(--space-3);
}

.private__list li {
  display: flex;
  gap: var(--space-3);
  color: var(--ink);
  line-height: 1.5;
  text-wrap: pretty;
}

.private__list svg {
  margin-block-start: 0.1875rem;
  color: var(--color-brand);
}

.private__note {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  padding-block: clamp(1.125rem, 2vw, 1.75rem);
  color: var(--color-text-soft);
}

.private__note p {
  flex: 1 1 22rem;
  text-wrap: pretty;
}

.private__note strong {
  color: var(--blue-950);
}

@media (min-width: 48rem) {
  .private__list {
    grid-column: span 6;
  }
}

@media (min-width: 60rem) {
  .private__intro {
    grid-column: span 7;
    padding-block: var(--space-5);
    padding-inline-end: clamp(0rem, 3vw, 4rem);
  }

  .private__prices {
    grid-column: span 5;
  }
}
</style>
