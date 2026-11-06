<script setup>
import BaseIcon from './BaseIcon.vue';

/*
 * The bar at the bottom of a reading view (team profiles, news articles) that
 * steps to the previous or next entry without going back to the grid. It stays
 * in reach at the bottom of the dialog's scroll area, and wraps around at either end.
 */
const props = defineProps({
  /** Accessible name of the bar, e.g. "Weitere Teammitglieder". */
  label: { type: String, required: true },
  /** What one entry is called in the button labels, e.g. "Profil" or "Artikel". */
  noun: { type: String, required: true },
  /** Titles of the neighbouring entries. */
  previous: { type: String, required: true },
  next: { type: String, required: true },
  /** Position of the current entry, counted from 1, and how many there are. */
  position: { type: Number, required: true },
  total: { type: Number, required: true },
});

defineEmits(['step']);

const count = (value) => String(value).padStart(2, '0');
const nounNext = props.noun === 'Profil' ? 'Nächstes' : 'Nächster';
const nounPrevious = props.noun === 'Profil' ? 'Vorheriges' : 'Vorheriger';
</script>

<template>
  <nav class="viewer-nav" :aria-label="label">
    <button type="button" class="viewer-nav__step" :aria-label="`${nounPrevious} ${noun}: ${previous}`" @click="$emit('step', -1)">
      <BaseIcon name="arrow-left" :size="18" />
      <span class="viewer-nav__name">{{ previous }}</span>
    </button>
    <p class="viewer-nav__count" aria-hidden="true">
      <span>{{ count(position) }}</span> / {{ count(total) }}
    </p>
    <button
      type="button"
      class="viewer-nav__step viewer-nav__step--next"
      :aria-label="`${nounNext} ${noun}: ${next}`"
      @click="$emit('step', 1)"
    >
      <span class="viewer-nav__name">{{ next }}</span>
      <BaseIcon name="arrow-right" :size="18" />
    </button>
  </nav>
</template>

<style>
.viewer-nav {
  position: sticky;
  z-index: 1;
  bottom: 0;
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-3);
  padding-block-end: max(var(--space-2), env(safe-area-inset-bottom));
  border-block-start: 1px solid var(--line);
  background: var(--white);
}

.viewer-nav__step {
  display: inline-flex;
  align-items: center;
  justify-self: start;
  gap: var(--space-2);
  min-width: 2.75rem;
  min-height: 2.75rem;
  max-width: 100%;
  padding: 0.5rem 0.75rem;
  border: 0;
  border-radius: var(--radius-pill);
  background: transparent;
  color: var(--blue-950);
  font: inherit;
  font-size: var(--text-small);
  font-weight: var(--weight-semibold);
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  transition:
    background-color var(--duration-fast) var(--ease-out),
    color var(--duration-fast) var(--ease-out);
}

.viewer-nav__step--next {
  justify-self: end;
}

.viewer-nav__step svg {
  flex: none;
  color: var(--color-brand);
  transition: transform var(--duration-base) var(--ease-out);
}

.viewer-nav__name {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.viewer-nav__step:active {
  background: var(--blue-100);
}

.viewer-nav__count {
  color: var(--color-text-faint);
  font-size: var(--text-small);
  font-weight: var(--weight-medium);
  font-variant-numeric: tabular-nums;
  letter-spacing: 0.04em;
}

.viewer-nav__count span {
  color: var(--blue-950);
  font-weight: var(--weight-bold);
}

@media (hover: hover) and (pointer: fine) {
  .viewer-nav__step:hover {
    background: var(--surface);
    color: var(--color-brand-hover);
  }

  .viewer-nav__step:hover svg {
    transform: translateX(-2px);
  }

  .viewer-nav__step--next:hover svg {
    transform: translateX(2px);
  }
}

/* Narrow phones: the arrows carry the names (they keep them in their labels). */
@media (max-width: 29.99rem) {
  .viewer-nav__name {
    display: none;
  }
}
</style>
