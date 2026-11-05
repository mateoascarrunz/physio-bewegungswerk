<script setup>
import { PRACTICE } from '@/content/practice';
</script>

<template>
  <div class="page shell">
    <div class="legal">
      <h1 class="t-h1">Impressum</h1>
      <dl class="legal__facts">
        <div>
          <dt>Unternehmen</dt>
          <dd>
            {{ PRACTICE.company }}<br />
            {{ PRACTICE.street }}<br />
            {{ PRACTICE.city }}<br />
            Schweiz
          </dd>
        </div>
        <div>
          <dt>E-Mail</dt>
          <dd><a :href="PRACTICE.email.href">{{ PRACTICE.email.label }}</a></dd>
        </div>
        <div>
          <dt>Telefon</dt>
          <dd><a :href="PRACTICE.phone.href">{{ PRACTICE.phone.label }}</a></dd>
        </div>
        <div>
          <dt>Internet</dt>
          <dd><a href="https://www.physio-bewegungswerk.ch">www.physio-bewegungswerk.ch</a></dd>
        </div>
        <div>
          <dt>Vertretungsberechtigte Personen</dt>
          <dd>Geschäftsführer: D. Geissberger, M. Hesse</dd>
        </div>
        <div>
          <dt>UID</dt>
          <dd>CHE-463.407.674</dd>
        </div>
      </dl>
    </div>
  </div>
</template>

<style scoped>
.legal {
  display: grid;
  gap: var(--space-5);
  max-width: var(--container-reading);
  margin-inline: auto;
  padding-block-start: clamp(1rem, 3vw, 2.5rem);
}

.legal__facts {
  display: grid;
  border-block-start: 1px solid var(--line);
}

.legal__facts div {
  display: grid;
  gap: var(--space-1) var(--space-5);
  padding-block: var(--space-4);
  border-block-end: 1px solid var(--line);
}

.legal__facts dt {
  color: var(--color-text-faint);
  font-size: var(--text-small);
  font-weight: var(--weight-medium);
}

.legal__facts dd {
  color: var(--blue-950);
  font-weight: var(--weight-medium);
  overflow-wrap: anywhere;
}

.legal__facts a {
  color: var(--color-brand);
}

@media (min-width: 40rem) {
  .legal__facts div {
    grid-template-columns: minmax(0, 2fr) minmax(0, 3fr);
  }
}
</style>
