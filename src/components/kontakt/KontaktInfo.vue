<script setup>
import BaseIcon from '../base/BaseIcon.vue';
import { PRACTICE } from '@/content/practice';

const CONTACTS = [
  { icon: 'phone', label: 'Telefon', value: PRACTICE.phone.label, href: PRACTICE.phone.href },
  { icon: 'mobile', label: 'Mobil', value: PRACTICE.mobile.label, href: PRACTICE.mobile.href },
  { icon: 'mail', label: 'E-Mail', value: PRACTICE.email.label, href: PRACTICE.email.href },
  { icon: 'map-pin', label: 'Adresse', value: PRACTICE.address, href: PRACTICE.mapsUrl, external: true },
  { icon: 'linkedin', label: 'LinkedIn', value: 'Physio Bewegungswerk', href: PRACTICE.linkedInUrl, external: true },
];
</script>

<template>
  <section class="contact-info" aria-labelledby="contact-title">
    <header class="contact-info__header">
      <p class="t-label">Wir sind für Sie da</p>
      <h1 id="contact-title" class="t-h1">Kontakt</h1>
      <p class="t-lead">
        Bei offenen Fragen sind wir gerne per E-Mail oder telefonisch von Montag bis Freitag von 09:00 bis 17:00 Uhr
        erreichbar.
      </p>
    </header>

    <ul class="contact-info__list">
      <li v-for="contact in CONTACTS" :key="contact.label">
        <a
          class="contact-row"
          :href="contact.href"
          :target="contact.external ? '_blank' : undefined"
          :rel="contact.external ? 'noopener noreferrer' : undefined"
        >
          <span class="contact-row__icon"><BaseIcon :name="contact.icon" :size="20" /></span>
          <span class="contact-row__text">
            <span class="contact-row__label">{{ contact.label }}</span>
            <span class="contact-row__value">{{ contact.value }}</span>
          </span>
          <BaseIcon class="contact-row__arrow" :name="contact.external ? 'arrow-up-right' : 'arrow-right'" :size="20" />
        </a>
      </li>
    </ul>

    <ul class="contact-info__notes">
      <li>
        <BaseIcon name="clock" :size="20" />
        <span><strong>{{ PRACTICE.hours }}</strong><br />Termine nach Vereinbarung</span>
      </li>
      <li>
        <BaseIcon name="parking" :size="20" />
        <span>Parkplätze vor der Praxis vorhanden</span>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.contact-info {
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
  padding-block: clamp(1rem, 3vw, 2.5rem) 0;
  padding-inline-end: clamp(0rem, 2vw, 2rem);
}

.contact-info__header {
  display: grid;
  gap: var(--space-3);
}

.contact-info__list {
  display: grid;
  border-block-start: 1px solid var(--line);
}

.contact-info__list li {
  border-block-end: 1px solid var(--line);
}

.contact-row {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  min-height: 4.5rem;
  padding-block: var(--space-3);
  color: inherit;
  text-decoration: none;
  border-radius: var(--radius-sm);
  -webkit-tap-highlight-color: transparent;
}

.contact-row__icon {
  display: grid;
  place-items: center;
  flex: none;
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 50%;
  background: var(--blue-100);
  color: var(--blue-700);
  transition:
    background-color var(--duration-base) var(--ease-out),
    color var(--duration-base) var(--ease-out);
}

.contact-row__text {
  flex: 1;
  display: grid;
  min-width: 0;
}

.contact-row__label {
  color: var(--color-text-faint);
  font-size: var(--text-label);
  font-weight: var(--weight-semibold);
  letter-spacing: 0.02em;
}

.contact-row__value {
  color: var(--blue-950);
  font-size: clamp(0.9375rem, 0.9rem + 0.3vw, 1.0625rem);
  font-weight: var(--weight-semibold);
  letter-spacing: -0.008em;
  line-height: 1.35;
  overflow-wrap: anywhere;
}

.contact-row__arrow {
  color: var(--color-brand);
  transition: transform var(--duration-base) var(--ease-out);
}

.contact-row:active .contact-row__icon {
  background: var(--color-brand);
  color: var(--white);
}

@media (hover: hover) and (pointer: fine) {
  .contact-row:hover .contact-row__icon {
    background: var(--color-brand);
    color: var(--white);
  }

  .contact-row:hover .contact-row__arrow {
    transform: translateX(3px);
  }
}

.contact-info__notes {
  display: grid;
  gap: var(--space-3);
  color: var(--color-text-soft);
  font-size: var(--text-small);
  line-height: 1.5;
}

.contact-info__notes li {
  display: flex;
  gap: var(--space-3);
}

.contact-info__notes svg {
  margin-block-start: 0.0625rem;
  color: var(--color-brand);
}

.contact-info__notes strong {
  color: var(--blue-950);
}
</style>
