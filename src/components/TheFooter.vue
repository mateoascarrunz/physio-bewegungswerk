<script setup>
import BaseIcon from './base/BaseIcon.vue';
import { BOOKING_URL, PRACTICE } from '@/content/practice';
import logoUrl from '@/assets/images/physio_logo.svg';

const CMS_ADMIN_URL = 'https://data.physio-bewegungswerk.ch/admin/';

const year = new Date().getFullYear();

function backToTop() {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
  document.getElementById('main')?.focus({ preventScroll: true });
}
</script>

<template>
  <footer class="site-footer shell">
    <div class="site-footer__panel">
      <div v-reveal:assemble class="site-footer__grid">
        <div class="site-footer__brand">
          <img class="site-footer__logo" :src="logoUrl" alt="Physio Bewegungswerk" width="120" height="137" loading="lazy" />
          <address class="site-footer__address">
            <strong>{{ PRACTICE.company }}</strong>
            <span>{{ PRACTICE.address }}</span>
          </address>
        </div>

        <div class="site-footer__contact">
          <h2 class="site-footer__heading">Kontakt</h2>
          <ul class="site-footer__list">
            <li>
              <a :href="PRACTICE.email.href"><BaseIcon name="mail" :size="18" />{{ PRACTICE.email.label }}</a>
            </li>
            <li>
              <a :href="PRACTICE.phone.href"><BaseIcon name="phone" :size="18" />{{ PRACTICE.phone.label }}</a>
            </li>
            <li>
              <a :href="PRACTICE.mobile.href"><BaseIcon name="mobile" :size="18" />{{ PRACTICE.mobile.label }}</a>
            </li>
          </ul>
        </div>

        <nav class="site-footer__nav" aria-label="Quick Links">
          <h2 class="site-footer__heading">Quick Links</h2>
          <ul class="site-footer__list">
            <li><RouterLink to="/">Home</RouterLink></li>
            <li><RouterLink to="/behandlungstechniken">Unsere Behandlungs&shy;techniken</RouterLink></li>
            <li><RouterLink to="/private">Private Physiotherapie</RouterLink></li>
            <li><RouterLink to="/uberuns">Über uns</RouterLink></li>
            <li><RouterLink to="/news">News</RouterLink></li>
          </ul>
        </nav>

        <nav class="site-footer__nav" aria-label="Support">
          <h2 class="site-footer__heading">Support</h2>
          <ul class="site-footer__list">
            <li><RouterLink to="/kontakt">Kontakt</RouterLink></li>
            <li><RouterLink to="/faq">FAQ</RouterLink></li>
            <li>
              <a :href="BOOKING_URL" target="_blank" rel="noopener noreferrer">Termin vereinbaren</a>
            </li>
            <li>
              <a :href="CMS_ADMIN_URL" target="_blank" rel="noopener noreferrer">Admin</a>
            </li>
          </ul>
        </nav>
      </div>

      <div class="site-footer__legal">
        <ul class="site-footer__legal-links">
          <li><RouterLink to="/impressum">Impressum</RouterLink></li>
          <li><RouterLink to="/datenschutz">Datenschutz</RouterLink></li>
        </ul>
        <p>© {{ year }} {{ PRACTICE.company }}. Alle Rechte vorbehalten.</p>
        <button class="site-footer__top" type="button" @click="backToTop">
          <BaseIcon name="arrow-up" :size="16" />
          Nach oben
        </button>
        <p>
          Designed and Developed by
          <a href="https://mateoascarrunz.com/" target="_blank" rel="noopener noreferrer">Mateo Ascarrunz</a>
        </p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  margin-block: var(--section-gap) var(--gutter);
}

.site-footer__panel {
  padding: var(--card-pad);
  border-radius: var(--radius-xl);
  background: var(--surface);
}

.site-footer__grid {
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: var(--space-6) var(--gap);
}

.site-footer__brand {
  grid-column: span 12;
  display: flex;
  align-items: center;
  gap: var(--space-5);
}

.site-footer__contact {
  grid-column: span 12;
}

.site-footer__nav {
  grid-column: span 6;
}

.site-footer__logo {
  flex: none;
  width: clamp(5rem, 7vw, 6.5rem);
  height: auto;
}

.site-footer__address {
  display: grid;
  gap: var(--space-1);
  font-style: normal;
  font-size: var(--text-small);
  color: var(--color-text-soft);
}

.site-footer__address strong {
  color: var(--blue-950);
}

.site-footer__heading {
  margin-block-end: var(--space-2);
  color: var(--blue-950);
  font-size: var(--text-small);
  font-weight: var(--weight-bold);
  letter-spacing: -0.005em;
}

.site-footer__list {
  display: grid;
  font-size: var(--text-small);
  line-height: 1.35;
}

.site-footer__list a {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  min-height: 2.25rem;
  color: var(--color-text-soft);
  text-decoration: none;
  border-radius: 6px;
  overflow-wrap: break-word;
  transition: color var(--duration-fast) var(--ease-out);
}

.site-footer__list svg {
  color: var(--color-brand);
}

.site-footer__legal {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-2) var(--space-6);
  margin-block-start: var(--space-6);
  padding-block-start: var(--space-4);
  border-block-start: 1px solid var(--line-strong);
  color: var(--color-text-faint);
  font-size: 0.8125rem;
}

.site-footer__legal a {
  display: inline-flex;
  align-items: center;
  min-height: 2.25rem;
  color: var(--blue-700);
  font-weight: var(--weight-medium);
  text-decoration: none;
  border-radius: 6px;
}

.site-footer__top {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  min-height: 2.25rem;
  padding-inline: var(--space-3);
  border-radius: var(--radius-pill);
  background: var(--white);
  color: var(--blue-700);
  font-size: 0.8125rem;
  font-weight: var(--weight-semibold);
  transition:
    background-color var(--duration-fast) var(--ease-out),
    color var(--duration-fast) var(--ease-out);
}

.site-footer__top svg {
  transition: transform var(--duration-base) var(--ease-out-expo);
}

@media (hover: hover) and (pointer: fine) {
  .site-footer__top:hover {
    background: var(--color-brand);
    color: var(--white);
  }

  .site-footer__top:hover svg {
    transform: translateY(-2px);
  }
}

.site-footer__legal-links {
  display: flex;
  gap: var(--space-5);
}

@media (hover: hover) and (pointer: fine) {
  .site-footer__list a:hover {
    color: var(--blue-700);
  }

  .site-footer__legal a:hover {
    text-decoration: underline;
  }
}

@media (min-width: 48rem) {
  .site-footer__brand {
    grid-column: span 12;
  }

  .site-footer__contact,
  .site-footer__nav {
    grid-column: span 4;
  }
}

@media (min-width: 75rem) {
  .site-footer__brand {
    grid-column: span 3;
    flex-direction: column;
    align-items: flex-start;
  }

  .site-footer__contact {
    grid-column: span 3;
  }

  .site-footer__nav {
    grid-column: span 3;
  }
}
</style>
