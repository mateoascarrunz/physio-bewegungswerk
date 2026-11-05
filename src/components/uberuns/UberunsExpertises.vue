<script setup>
import BaseIcon from '../base/BaseIcon.vue';
</script>

<template>
  <section class="values" aria-labelledby="values-title">
    <div class="section-head">
      <h2 id="values-title" class="t-h2">Unsere Werte</h2>
    </div>
    <ul class="values__grid">
      <li v-reveal class="values__card values__card--wide card card--blue">
        <span class="values__icon"><BaseIcon name="heart" :size="24" /></span>
        <h3 class="t-h3">Wertschätzung</h3>
        <p>
          Wir pflegen eine <strong>wertschätzende</strong> und unterstützende Umgebung, in der wir auf die individuellen
          Ziele unserer Patienten eingehen.
        </p>
      </li>
      <li v-reveal="60" class="values__card card">
        <span class="values__icon"><BaseIcon name="spark" :size="24" /></span>
        <h3 class="t-h3">Kreativität</h3>
        <p>
          Durch die fortlaufende Weiterbildung unserer Therapeuten und ihre <strong>kreative</strong> Herangehensweise an
          die Behandlung gewährleisten wir eine professionelle Physiotherapie gemäss den aktuellen Standards.
        </p>
      </li>
      <li v-reveal="120" class="values__card card">
        <span class="values__icon"><BaseIcon name="shield" :size="24" /></span>
        <h3 class="t-h3">Vertrauen und Respekt</h3>
        <p>
          Unsere Patienten und deren <strong>Vertrauen</strong> stehen für uns immer im Mittelpunkt der Therapie. Für eine
          erfolgreiche Therapie ist eine <strong>respektvolle</strong> Beziehung und eine offene Kommunikation zwischen
          Patienten und Therapeuten elementar.
        </p>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.values__grid {
  display: grid;
  gap: var(--gap);
}

.values__card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--space-3);
  color: var(--color-text-soft);
  text-wrap: pretty;
}

.values__card strong {
  color: var(--blue-950);
}

.values__card--wide {
  color: var(--blue-950);
}

.values__icon {
  display: grid;
  place-items: center;
  width: 3rem;
  height: 3rem;
  margin-block-end: var(--space-3);
  border-radius: 50%;
  background: var(--white);
  color: var(--color-brand);
}

@media (min-width: 48rem) {
  .values__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .values__card--wide {
    grid-column: 1 / -1;
  }
}

@media (min-width: 60rem) {
  .values__grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .values__card--wide {
    grid-column: auto;
  }
}
</style>
