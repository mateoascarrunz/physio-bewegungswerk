<script setup>
import { computed } from 'vue';
import BaseIcon from './BaseIcon.vue';

const props = defineProps({
  icon: { type: String, required: true },
  /** Accessible name. Icon-only controls always need one. */
  label: { type: String, required: true },
  /** soft | solid | plain | floating */
  variant: { type: String, default: 'soft' },
  href: { type: String, default: null },
  size: { type: [Number, String], default: 20 },
  disabled: { type: Boolean, default: false },
});

const attributes = computed(() => {
  if (!props.href) return { type: 'button', disabled: props.disabled };
  return /^https?:/.test(props.href)
    ? { href: props.href, target: '_blank', rel: 'noopener noreferrer' }
    : { href: props.href };
});
</script>

<template>
  <component
    :is="href ? 'a' : 'button'"
    v-bind="attributes"
    class="icon-btn"
    :class="`icon-btn--${variant}`"
    :aria-label="label"
  >
    <BaseIcon :name="icon" :size="size" />
  </component>
</template>

<style>
.icon-btn {
  display: inline-grid;
  place-items: center;
  width: 2.75rem;
  height: 2.75rem;
  flex: none;
  border-radius: 50%;
  color: var(--blue-950);
  text-decoration: none;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  transition:
    background-color var(--duration-fast) var(--ease-out),
    box-shadow var(--duration-fast) var(--ease-out),
    color var(--duration-fast) var(--ease-out),
    opacity var(--duration-fast) var(--ease-out),
    transform var(--duration-fast) var(--ease-out);
}

.icon-btn svg {
  transition: transform var(--duration-base) var(--ease-out);
}

.icon-btn:active:not(:disabled) {
  transform: scale(0.94);
}

.icon-btn:disabled {
  cursor: default;
  opacity: 0.35;
}

.icon-btn--soft {
  background: var(--blue-100);
  color: var(--color-brand-hover);
}

.icon-btn--solid {
  background: var(--color-brand);
  color: var(--white);
}

.icon-btn--floating {
  background: var(--white);
  box-shadow: var(--shadow-sm);
}

@media (hover: hover) and (pointer: fine) {
  .icon-btn--soft:hover:not(:disabled) {
    background: var(--color-brand);
    color: var(--white);
  }

  .icon-btn--solid:hover:not(:disabled) {
    background: var(--color-brand-hover);
  }

  .icon-btn--plain:hover:not(:disabled) {
    background: var(--blue-100);
  }

  .icon-btn--floating:hover:not(:disabled) {
    background: var(--blue-950);
    color: var(--white);
  }

  .icon-btn:hover:not(:disabled) svg {
    transform: scale(1.06);
  }
}
</style>
