<script setup>
import { computed } from 'vue';
import { RouterLink } from 'vue-router';
import BaseIcon from './BaseIcon.vue';

const props = defineProps({
  /** primary | secondary | accent | inverse | text */
  variant: { type: String, default: 'primary' },
  /** md | sm */
  size: { type: String, default: 'md' },
  /** Internal route: renders a RouterLink. */
  to: { type: [String, Object], default: null },
  /** External or protocol link: renders an anchor. */
  href: { type: String, default: null },
  /** Leading icon name. */
  icon: { type: String, default: null },
  /** Trailing arrow that moves on hover. */
  arrow: { type: Boolean, default: false },
  block: { type: Boolean, default: false },
  loading: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  type: { type: String, default: 'button' },
});

const isExternal = computed(() => /^https?:/.test(props.href ?? ''));

const element = computed(() => {
  if (props.to) return RouterLink;
  return props.href ? 'a' : 'button';
});

const attributes = computed(() => {
  if (props.to) return { to: props.to };
  if (props.href) {
    return isExternal.value
      ? { href: props.href, target: '_blank', rel: 'noopener noreferrer' }
      : { href: props.href };
  }
  return { type: props.type, disabled: props.disabled || props.loading };
});
</script>

<template>
  <component
    :is="element"
    v-bind="attributes"
    class="btn"
    :class="[`btn--${variant}`, `btn--${size}`, { 'btn--block': block, 'is-loading': loading }]"
    :aria-busy="loading || undefined"
  >
    <span v-if="loading" class="btn__spinner" aria-hidden="true"></span>
    <BaseIcon v-else-if="icon" :name="icon" :size="size === 'sm' ? 18 : 20" />
    <span class="btn__label"><slot></slot></span>
    <BaseIcon v-if="arrow && !loading" class="btn__arrow" name="arrow-right" :size="size === 'sm' ? 18 : 20" />
  </component>
</template>

<style>
.btn {
  --btn-bg: var(--color-brand);
  --btn-fg: var(--white);
  --btn-border: transparent;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  min-height: 3rem;
  padding: 0.625rem 1.5rem;
  border-radius: var(--radius-pill);
  background: var(--btn-bg);
  box-shadow: inset 0 0 0 1.5px var(--btn-border);
  color: var(--btn-fg);
  font-size: 0.9375rem;
  font-weight: var(--weight-semibold);
  line-height: 1.2;
  letter-spacing: -0.005em;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  transition:
    background-color var(--duration-fast) var(--ease-out),
    box-shadow var(--duration-fast) var(--ease-out),
    color var(--duration-fast) var(--ease-out),
    transform var(--duration-fast) var(--ease-out);
}

.btn--sm {
  min-height: 2.75rem;
  padding: 0.5rem 1.125rem;
  font-size: 0.875rem;
}

.btn--block {
  display: flex;
  width: 100%;
}

.btn__arrow {
  transition: transform var(--duration-base) var(--ease-out);
}

.btn:active:not(:disabled) {
  transform: scale(0.98);
}

.btn:disabled,
.btn[aria-disabled='true'] {
  cursor: not-allowed;
  opacity: 0.55;
}

.btn.is-loading {
  cursor: progress;
  opacity: 0.85;
}

.btn--accent {
  --btn-bg: var(--color-accent);
}

.btn--secondary {
  --btn-bg: transparent;
  --btn-fg: var(--blue-950);
  --btn-border: var(--line-strong);
}

.btn--inverse {
  --btn-bg: var(--white);
  --btn-fg: var(--blue-950);
}

.btn--text {
  --btn-bg: transparent;
  --btn-fg: var(--color-brand);
  min-height: 2.75rem;
  padding: 0.25rem 0;
  border-radius: var(--radius-sm);
}

.btn--text .btn__label {
  background-image: linear-gradient(currentColor, currentColor);
  background-position: 0 100%;
  background-repeat: no-repeat;
  background-size: 0 1.5px;
  padding-block-end: 2px;
  transition: background-size var(--duration-base) var(--ease-out);
}

/* Each variant answers hover differently, with the same timing and easing. */
@media (hover: hover) and (pointer: fine) {
  .btn:hover .btn__arrow {
    transform: translateX(3px);
  }

  .btn--primary:hover:not(:disabled) {
    --btn-bg: var(--color-brand-hover);
  }

  .btn--accent:hover:not(:disabled) {
    --btn-bg: var(--color-accent-hover);
    box-shadow: 0 6px 18px rgb(226 9 127 / 0.26);
  }

  .btn--secondary:hover:not(:disabled) {
    --btn-bg: var(--blue-50);
    --btn-fg: var(--color-brand-hover);
    --btn-border: var(--color-brand);
  }

  .btn--inverse:hover:not(:disabled) {
    --btn-bg: var(--blue-200);
  }

  .btn--text:hover {
    --btn-fg: var(--color-brand-hover);
  }

  .btn--text:hover .btn__label {
    background-size: 100% 1.5px;
  }
}

.btn__spinner {
  width: 1.125rem;
  height: 1.125rem;
  border: 2px solid currentColor;
  border-inline-end-color: transparent;
  border-radius: 50%;
  animation: btn-spin 0.7s linear infinite;
}

@keyframes btn-spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
