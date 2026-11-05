<script setup>
import { onBeforeUnmount, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import BaseModal from './base/BaseModal.vue';
import BaseButton from './base/BaseButton.vue';
import BaseIcon from './base/BaseIcon.vue';
import { BOOKING_URL, NAV_LINKS, PRACTICE } from '@/content/practice';
import logoUrl from '@/assets/images/physio_logo_horizontal.svg';

const DESKTOP_QUERY = '(min-width: 75rem)';

const props = defineProps({
  open: { type: Boolean, default: false },
});

const emit = defineEmits(['update:open']);

const route = useRoute();
const links = [{ to: '/', label: 'Home' }, ...NAV_LINKS];
let desktopQuery = null;
let hasNavigated = false;

function close() {
  emit('update:open', false);
}

function isActive(path) {
  if (path === '/') return route.path === '/';
  return route.path === path || route.path.startsWith(`${path}/`);
}

function closeOnDesktop(event) {
  if (event.matches && props.open) close();
}

// The dialog returns focus to the menu button when it closes. After a page
// change the new content is the better place to continue from.
function followLink() {
  hasNavigated = true;
  close();
}

function onClosed() {
  if (hasNavigated) document.getElementById('main')?.focus({ preventScroll: true });
  hasNavigated = false;
}

watch(
  () => route.fullPath,
  () => {
    if (!props.open) return;
    hasNavigated = true;
    close();
  },
);

onMounted(() => {
  desktopQuery = window.matchMedia(DESKTOP_QUERY);
  desktopQuery.addEventListener('change', closeOnDesktop);
});

onBeforeUnmount(() => desktopQuery?.removeEventListener('change', closeOnDesktop));
</script>

<template>
  <BaseModal :open="open" variant="full" label="Menü" hide-close @close="close" @closed="onClosed">
    <div id="site-menu" class="menu">
      <div class="menu__bar">
        <RouterLink class="menu__logo" to="/" aria-label="Physio Bewegungswerk, zur Startseite" @click="close">
          <img :src="logoUrl" alt="" width="738" height="189" />
        </RouterLink>
        <button class="menu-toggle menu__close" type="button" aria-label="Menü schliessen" @click="close">
          <span class="menu-toggle__icon menu-toggle__icon--close" aria-hidden="true"></span>
        </button>
      </div>

      <nav class="menu__nav" aria-label="Menü">
        <ul class="menu__links">
          <li v-for="(link, index) in links" :key="link.to" :style="{ '--i': index }">
            <RouterLink
              class="menu__link"
              :class="{ 'is-active': isActive(link.to) }"
              :to="link.to"
              :aria-current="isActive(link.to) ? 'page' : undefined"
              @click="followLink"
            >
              <span>{{ link.softLabel ?? link.label }}</span>
              <BaseIcon class="menu__link-arrow" name="arrow-right" :size="22" />
            </RouterLink>
          </li>
        </ul>
      </nav>

      <div class="menu__aside">
        <BaseButton class="menu__cta" variant="accent" block arrow :href="BOOKING_URL">Termin vereinbaren</BaseButton>
        <ul class="menu__contact">
          <li>
            <a :href="PRACTICE.phone.href"><BaseIcon name="phone" :size="18" />{{ PRACTICE.phone.label }}</a>
          </li>
          <li>
            <a :href="PRACTICE.email.href"><BaseIcon name="mail" :size="18" />{{ PRACTICE.email.label }}</a>
          </li>
          <li>
            <a :href="PRACTICE.mapsUrl" target="_blank" rel="noopener noreferrer">
              <BaseIcon name="map-pin" :size="18" />{{ PRACTICE.address }}
            </a>
          </li>
        </ul>
      </div>
    </div>
  </BaseModal>
</template>

<style>
.menu {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  grid-template-rows: auto 1fr auto;
  min-height: 100%;
  padding-inline: max(var(--gutter), env(safe-area-inset-left)) max(var(--gutter), env(safe-area-inset-right));
  padding-block-end: max(var(--space-5), env(safe-area-inset-bottom));
}

.menu__bar {
  position: sticky;
  z-index: 1;
  top: 0;
  grid-column: 1 / -1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: calc(var(--header-h) + var(--header-offset));
  padding-block-start: var(--header-offset);
  padding-inline: clamp(0.875rem, 1.6vw, 1.5rem) 0.5rem;
  background: var(--white);
}

.menu__logo {
  display: block;
  border-radius: var(--radius-sm);
}

.menu__logo img {
  width: auto;
  height: clamp(2.25rem, 2rem + 0.5vw, 2.625rem);
}

/* The two lines of the menu button rotate into a cross as the menu opens. */
.menu-toggle .menu-toggle__icon--close {
  height: 1.25rem;
}

.menu-toggle .menu-toggle__icon--close::before,
.menu-toggle .menu-toggle__icon--close::after {
  top: calc(50% - 1px);
  bottom: auto;
  width: 100%;
  animation-duration: var(--duration-base);
  animation-timing-function: var(--ease-out);
}

.menu-toggle .menu-toggle__icon--close::before {
  transform: rotate(45deg);
  animation-name: menu-line-top;
}

.menu-toggle .menu-toggle__icon--close::after {
  transform: rotate(-45deg);
  animation-name: menu-line-bottom;
}

@keyframes menu-line-top {
  from {
    transform: translateY(-5px);
  }
}

@keyframes menu-line-bottom {
  from {
    transform: translateY(5px);
  }
}

.menu__nav {
  align-self: center;
  padding-block: clamp(0.5rem, 3vh, 2rem);
}

.menu__link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  min-height: 3rem;
  padding: clamp(0.35rem, 1.1vh, 0.75rem) clamp(0.875rem, 1.6vw, 1.5rem);
  border-radius: var(--radius-md);
  color: var(--blue-950);
  font-size: clamp(1.3125rem, 0.75rem + 2.8vw, 1.75rem);
  font-weight: var(--weight-semibold);
  letter-spacing: -0.024em;
  line-height: 1.15;
  text-decoration: none;
  overflow-wrap: break-word;
  transition:
    background-color var(--duration-fast) var(--ease-out),
    color var(--duration-fast) var(--ease-out);
}

.menu__link.is-active {
  background: var(--blue-100);
  color: var(--blue-700);
}

.menu__link-arrow {
  display: none;
  color: var(--color-brand);
  opacity: 0;
  transform: translateX(-6px);
  transition:
    opacity var(--duration-fast) var(--ease-out),
    transform var(--duration-base) var(--ease-out);
}

.menu__link.is-active .menu__link-arrow {
  opacity: 1;
  transform: none;
}

@media (hover: hover) and (pointer: fine) {
  .menu__link:hover {
    background: var(--surface);
  }

  .menu__link:hover .menu__link-arrow {
    opacity: 1;
    transform: none;
  }
}

.menu__link:active {
  background: var(--blue-100);
}

.menu__links > li {
  animation: menu-item-in var(--duration-slow) var(--ease-out) both;
  animation-delay: calc(var(--i) * 24ms);
}

@keyframes menu-item-in {
  from {
    opacity: 0;
    transform: translateY(0.625rem);
  }
}

.menu__aside {
  display: grid;
  gap: var(--space-4);
  padding-inline: clamp(0.875rem, 1.6vw, 1.5rem);
  animation: menu-item-in var(--duration-slow) var(--ease-out) 120ms both;
}

.menu__contact {
  display: grid;
  gap: var(--space-1);
  font-size: 0.9375rem;
}

.menu__contact a {
  display: inline-flex;
  align-items: center;
  gap: var(--space-3);
  min-height: 2.75rem;
  color: var(--color-text-soft);
  overflow-wrap: anywhere;
  text-decoration: none;
  border-radius: var(--radius-sm);
}

.menu__contact a svg {
  color: var(--color-brand);
}

@media (hover: hover) and (pointer: fine) {
  .menu__contact a:hover {
    color: var(--blue-700);
  }
}

/* Tablets in portrait: links on the left, booking and contact in their own card. */
@media (min-width: 40rem) and (min-height: 34rem) {
  .menu {
    grid-template-columns: minmax(0, 7fr) minmax(0, 5fr);
    grid-template-rows: auto 1fr;
    column-gap: var(--space-6);
  }

  .menu__aside {
    align-self: center;
    padding: var(--card-pad);
    border-radius: var(--radius-lg);
    background: var(--blue-50);
  }

  .menu__link {
    font-size: clamp(1.5rem, 3.3vw, 2.25rem);
  }

  .menu__link-arrow {
    display: block;
  }
}

/* Landscape phones: two columns of compact links so nothing needs a long scroll. */
@media (max-height: 33.99rem) {
  .menu {
    grid-template-rows: auto auto auto;
  }

  .menu__links {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    column-gap: var(--space-4);
  }

  .menu__link {
    min-height: 2.75rem;
    font-size: 1.125rem;
    letter-spacing: -0.012em;
  }

  .menu__aside {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    align-items: start;
  }
}
</style>
