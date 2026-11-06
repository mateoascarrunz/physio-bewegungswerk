<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import BaseButton from './base/BaseButton.vue';
import TheMobileMenu from './TheMobileMenu.vue';
import { BOOKING_URL, NAV_LINKS } from '@/content/practice';
import iconUrl from '@/assets/images/physio_icon.svg';

const route = useRoute();
const isMenuOpen = ref(false);
const menuOrigin = ref(null);
const isScrolled = ref(false);
const sentinel = ref(null);
let observer = null;

function isActive(path) {
  return route.path === path || route.path.startsWith(`${path}/`);
}

// The menu grows out of the button that opened it.
function openMenu(event) {
  const { left, top, width, height } = event.currentTarget.getBoundingClientRect();
  menuOrigin.value = `${Math.round(left + width / 2)}px ${Math.round(top + height / 2)}px`;
  isMenuOpen.value = true;
}

onMounted(() => {
  observer = new IntersectionObserver(([entry]) => {
    isScrolled.value = !entry.isIntersecting;
  });
  observer.observe(sentinel.value);
});

onBeforeUnmount(() => observer?.disconnect());
</script>

<template>
  <div ref="sentinel" class="header-sentinel" aria-hidden="true"></div>
  <header class="site-header" :class="{ 'is-scrolled': isScrolled }">
    <div class="site-header__bar">
      <RouterLink class="site-header__logo" to="/" aria-label="Physio Bewegungswerk, zur Startseite">
        <img :src="iconUrl" alt="" width="58" height="60" />
      </RouterLink>

      <nav class="site-nav" aria-label="Hauptnavigation">
        <ul class="site-nav__list">
          <li v-for="link in NAV_LINKS" :key="link.to" :class="{ 'site-nav__item--secondary': !link.priority }">
            <RouterLink
              class="site-nav__link"
              :class="{ 'is-active': isActive(link.to) }"
              :to="link.to"
              :aria-current="isActive(link.to) ? 'page' : undefined"
            >
              <span v-if="isActive(link.to)" class="site-nav__indicator" aria-hidden="true"></span>
              {{ link.label }}
            </RouterLink>
          </li>
        </ul>
      </nav>

      <div class="site-header__actions">
        <BaseButton class="site-header__cta" variant="accent" size="sm" :href="BOOKING_URL">
          <span class="site-header__cta-long">Termin vereinbaren</span>
          <span class="site-header__cta-short" aria-hidden="true">Termin</span>
          <span class="sr-only site-header__cta-sr">vereinbaren</span>
        </BaseButton>
        <button
          class="menu-toggle"
          type="button"
          aria-haspopup="dialog"
          aria-controls="site-menu"
          :aria-expanded="isMenuOpen"
          aria-label="Menü öffnen"
          @click="openMenu"
        >
          <span class="menu-toggle__icon" aria-hidden="true"></span>
        </button>
      </div>
    </div>
  </header>
  <TheMobileMenu v-model:open="isMenuOpen" :origin="menuOrigin" />
</template>

<style>
.header-sentinel {
  position: absolute;
  top: 0;
  left: 0;
  width: 1px;
  height: 12px;
  pointer-events: none;
}

/* The header keeps its place during page transitions; only the content changes. */
.site-header {
  position: sticky;
  z-index: 40;
  top: var(--header-offset);
  margin-block-start: var(--header-offset);
  padding-inline: var(--gutter);
  view-transition-name: site-header;
}

/* Proportions: the vertical space around the 44px controls equals the inset of the
   icon, so the bar reads as one even band rather than a tall floating slab. */
.site-header__bar {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  max-width: calc(var(--container) - 2 * var(--gutter));
  height: var(--header-h);
  margin-inline: auto;
  padding-inline: 0.625rem 0.5rem;
  border-radius: var(--radius-pill);
  background: rgb(255 255 255 / 0.94);
  box-shadow: 0 0 0 1px transparent;
  transform-origin: 50% 0;
  transition:
    box-shadow var(--duration-slow) var(--ease-out),
    background-color var(--duration-slow) var(--ease-out),
    transform var(--duration-slow) var(--ease-out-expo);
}

/* The bar arrives with the page when the logo intro lifts; on every other load it
   is simply there. It slides in rather than fading, so its colours, and the
   contrast of the booking button, are true on every frame. */
html.intro-lifted .site-header__bar {
  animation: header-in 640ms var(--ease-out-expo) backwards;
}

@keyframes header-in {
  from {
    transform: translateY(calc(-100% - var(--header-offset) - 0.5rem));
  }
}

/* After scrolling the bar tightens and lifts. Transforms only, so nothing below it moves. */
.is-scrolled .site-header__bar {
  background: var(--white);
  box-shadow:
    0 0 0 1px var(--line),
    var(--shadow-sm);
  transform: translateY(calc(var(--header-offset) * -0.5)) scale(0.985);
}

.site-header__logo {
  display: grid;
  place-items: center;
  flex: none;
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 50%;
  transition: background-color var(--duration-fast) var(--ease-out);
}

.site-header__logo img {
  width: auto;
  height: 2.125rem;
  transition: transform var(--duration-slow) var(--ease-out-expo);
}

@media (hover: hover) and (pointer: fine) {
  .site-header__logo:hover {
    background: var(--blue-50);
  }

  .site-header__logo:hover img {
    transform: rotate(-8deg) scale(1.05);
  }
}

.site-nav {
  display: none;
  flex: 1;
  min-width: 0;
}

.site-nav__list {
  display: flex;
  justify-content: center;
  gap: 0.125rem;
}

.site-nav__link {
  position: relative;
  isolation: isolate;
  display: inline-flex;
  align-items: center;
  height: 2.5rem;
  padding-inline: 0.875rem;
  border-radius: var(--radius-pill);
  color: var(--blue-950);
  font-size: 0.9375rem;
  font-weight: 550;
  letter-spacing: -0.006em;
  text-decoration: none;
  white-space: nowrap;
  transition: color var(--duration-fast) var(--ease-out);
}

/* Hover: a soft pill grows in behind the label. */
.site-nav__link::before {
  content: '';
  position: absolute;
  z-index: -2;
  inset: 0;
  border-radius: inherit;
  background: var(--surface);
  opacity: 0;
  transform: scale(0.88);
  transition:
    opacity var(--duration-fast) var(--ease-out),
    transform var(--duration-base) var(--ease-out-expo);
}

/* The active pill is one named element, so page transitions slide it from link to link. */
.site-nav__indicator {
  position: absolute;
  z-index: -1;
  inset: 0;
  border-radius: inherit;
  background: var(--blue-100);
  view-transition-name: nav-indicator;
}

.site-nav__link.is-active {
  color: var(--blue-700);
}

@media (hover: hover) and (pointer: fine) {
  .site-nav__link:not(.is-active):hover {
    color: var(--blue-700);
  }

  .site-nav__link:not(.is-active):hover::before {
    opacity: 1;
    transform: none;
  }
}

.site-header__actions {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  margin-inline-start: auto;
}

.site-header__cta {
  white-space: nowrap;
}

.site-header__cta-short,
.site-header__cta-sr {
  display: none;
}

.menu-toggle {
  display: grid;
  place-items: center;
  flex: none;
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 50%;
  background: var(--blue-100);
  color: var(--blue-950);
  -webkit-tap-highlight-color: transparent;
  transition:
    background-color var(--duration-fast) var(--ease-out),
    transform var(--duration-fast) var(--ease-out);
}

.menu-toggle:active {
  transform: scale(0.94);
}

@media (hover: hover) and (pointer: fine) {
  .menu-toggle:hover {
    background: var(--blue-200);
  }
}

/* Two offset lines: lighter than the classic three-bar stack, and the same
   shape rotates into the close icon inside the menu. */
.menu-toggle__icon {
  position: relative;
  display: block;
  width: 1.25rem;
  height: 0.75rem;
}

.menu-toggle__icon::before,
.menu-toggle__icon::after {
  content: '';
  position: absolute;
  inset-inline-end: 0;
  height: 2px;
  border-radius: 2px;
  background: currentColor;
  transition: width var(--duration-base) var(--ease-out-expo);
}

.menu-toggle__icon::before {
  top: 0;
  width: 100%;
}

.menu-toggle__icon::after {
  bottom: 0;
  width: 65%;
}

@media (hover: hover) and (pointer: fine) {
  .menu-toggle:hover .menu-toggle__icon::after {
    width: 100%;
  }
}

/* Phones: icon, a short booking pill where it fits, and the menu. */
@media (max-width: 47.99rem) {
  .site-header__cta-long {
    display: none;
  }

  .site-header__cta-short {
    display: inline;
  }

  .site-header__cta-sr {
    display: inline;
  }

  .site-header__cta {
    padding-inline: 1rem;
  }
}

@media (max-width: 22.49rem) {
  .site-header__cta {
    display: none;
  }
}

/* Landscape phones: the bar would eat too much of a short screen. */
@media (max-height: 30rem) {
  .site-header {
    position: relative;
    top: 0;
  }
}

/* Tablet landscape and small laptops: three key links, the rest in the menu. */
@media (min-width: 60rem) {
  .site-nav {
    display: block;
  }

  .site-nav__item--secondary {
    display: none;
  }
}

/* Full navigation only once every label fits on one line with room to spare. */
@media (min-width: 75rem) {
  .site-nav__item--secondary {
    display: block;
  }

  .menu-toggle {
    display: none;
  }
}
</style>
