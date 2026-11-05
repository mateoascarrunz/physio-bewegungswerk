<script setup>
import BaseIcon from './BaseIcon.vue';

defineProps({
  /** Ordered trail; the last item is the current page and has no link. */
  items: { type: Array, required: true },
});
</script>

<template>
  <nav class="breadcrumbs" aria-label="Sie sind hier">
    <ol>
      <li v-for="(item, index) in items" :key="item.label">
        <RouterLink v-if="item.to && index < items.length - 1" :to="item.to">{{ item.label }}</RouterLink>
        <span v-else aria-current="page">{{ item.label }}</span>
        <BaseIcon v-if="index < items.length - 1" name="chevron-right" :size="14" />
      </li>
    </ol>
  </nav>
</template>

<style>
.breadcrumbs ol {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-1) var(--space-2);
  color: var(--color-text-faint);
  font-size: var(--text-small);
}

.breadcrumbs li {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  min-width: 0;
}

.breadcrumbs a {
  display: inline-flex;
  align-items: center;
  min-height: 2.75rem;
  border-radius: var(--radius-sm);
  color: var(--color-brand);
  font-weight: var(--weight-medium);
  text-decoration: none;
  background-image: linear-gradient(currentColor, currentColor);
  background-position: 0 calc(100% - 0.7rem);
  background-repeat: no-repeat;
  background-size: 0 1px;
  transition: background-size var(--duration-base) var(--ease-out);
}

.breadcrumbs [aria-current='page'] {
  overflow: hidden;
  max-width: min(60vw, 28rem);
  color: var(--color-text-soft);
  text-overflow: ellipsis;
  white-space: nowrap;
}

@media (hover: hover) and (pointer: fine) {
  .breadcrumbs a:hover {
    background-size: 100% 1px;
  }
}
</style>
