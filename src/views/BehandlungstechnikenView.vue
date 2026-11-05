<script setup>
import BaseButton from '@/components/base/BaseButton.vue';
import ServiceCard from '@/components/dienstleistungen-services/ServiceCard.vue';
import ActionBox from '@/components/home/ActionBox.vue';
import { services } from '@/content/services';

// The rhythm of the 12-column grid: wide pairs alternate with even rows of
// three. It repeats, so a treatment added later still falls into the pattern.
const SPAN_PATTERN = [5, 7, 4, 4, 4, 7, 5, 4, 4, 4];

function spanFor(index) {
  return SPAN_PATTERN[index % SPAN_PATTERN.length];
}

function sizesFor(span) {
  return `(max-width: 40rem) 92vw, (max-width: 60rem) 46vw, ${Math.round((span / 12) * 100)}vw`;
}
</script>

<template>
  <div class="page shell">
    <header class="services-intro bento">
      <div class="services-intro__title">
        <p class="t-label">Behandlungstechniken</p>
        <h1 class="t-h1">Therapieangebot</h1>
      </div>
      <div class="services-intro__copy">
        <p class="t-lead services-intro__lead">
          Herzlich willkommen beim <strong>Physio Bewegungswerk.</strong> Wir freuen uns, Ihnen nicht nur therapeutische
          Dienstleistungen anzubieten, sondern Ihnen bei der Verbesserung Ihrer Lebensqualität zu helfen. Unser Team steht
          Ihnen zur Verfügung, um Sie auf Ihrem Weg zu begleiten und die bestmögliche Betreuung zu gewährleisten.
        </p>
        <div class="services-intro__columns">
          <p class="t-body">
            Unsere Ansätze und Techniken umfassen eine breite Palette bewährter Methoden, da jeder Mensch einzigartige
            Beschwerden, Bedürfnisse und Ziele hat. Wir passen unsere Herangehensweise an, um Ihre individuellen
            Anforderungen zu erfüllen und Ihre persönlichen Ziele zu erreichen.
          </p>
          <p class="t-body">
            Egal, ob Sie sich von einer Operation erholen, mit chronischen Schmerzen kämpfen oder Ihre Beweglichkeit und
            Lebensqualität verbessern möchten, wir sind hier, um gemeinsam geeignete Lösungen zu entwickeln.
          </p>
        </div>
      </div>
    </header>

    <section class="section" aria-labelledby="services-grid-title">
      <div class="section-head">
        <div class="section-head__text">
          <h2 id="services-grid-title" class="t-h2">Hier sind unsere Dienstleistungen</h2>
          <p class="t-body">Wählen Sie eine Dienstleistung, um mehr zu erfahren.</p>
        </div>
      </div>
      <ul class="services-grid">
        <li
          v-for="(service, index) in services"
          :key="service.id"
          v-reveal
          class="services-grid__item"
          :style="{ '--span': spanFor(index) }"
        >
          <ServiceCard :service="service" :index="index + 1" :sizes="sizesFor(spanFor(index))" />
        </li>
        <li v-reveal class="services-grid__item services-ask card card--blue" :style="{ '--span': 4 }">
          <h2 class="t-h3">Haben Sie Fragen?</h2>
          <div class="services-ask__actions">
            <BaseButton size="sm" to="/kontakt">Kontakt</BaseButton>
            <BaseButton variant="secondary" size="sm" to="/faq">FAQ</BaseButton>
          </div>
        </li>
      </ul>
    </section>

    <ActionBox class="section--tight" />
  </div>
</template>

<style scoped>
.services-intro {
  padding-block: clamp(1rem, 3vw, 2.5rem) 0;
  row-gap: var(--space-5);
}

.services-intro__title {
  grid-column: span 12;
  display: grid;
  gap: var(--space-3);
  align-content: start;
}

.services-intro__lead strong {
  color: var(--blue-950);
}

.services-intro__copy {
  grid-column: span 12;
  display: grid;
  gap: var(--space-5);
}

.services-intro__columns {
  display: grid;
  gap: var(--space-4);
}

.services-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: var(--gap);
}

.services-grid__item {
  min-height: 17rem;
}

.services-ask {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--space-5);
  min-height: 11rem;
}

.services-ask__actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

/* Tablets: two columns, with every fifth card opening up to the full width. */
@media (min-width: 40rem) {
  .services-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .services-grid__item {
    min-height: 19rem;
  }

  .services-grid__item:nth-child(5n + 1) {
    grid-column: span 2;
    min-height: 23rem;
  }

  .services-intro__columns {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: var(--space-5);
  }
}

@media (min-width: 60rem) {
  .services-intro__copy {
    grid-template-columns: repeat(12, minmax(0, 1fr));
    column-gap: var(--gap);
  }

  .services-intro__lead {
    grid-column: span 6;
    padding-inline-end: clamp(0rem, 2vw, 2.5rem);
  }

  .services-intro__columns {
    grid-column: 7 / span 6;
    grid-template-columns: minmax(0, 1fr);
    gap: var(--space-4);
  }

  .services-grid {
    grid-template-columns: repeat(12, minmax(0, 1fr));
  }

  .services-grid__item,
  .services-grid__item:nth-child(5n + 1) {
    grid-column: span var(--span);
    min-height: clamp(19rem, 25vw, 24rem);
  }

  .services-ask {
    min-height: auto;
  }
}
</style>
