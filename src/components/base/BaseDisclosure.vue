<script setup>
import { onBeforeUnmount, ref } from 'vue';

defineProps({
  /** Starts expanded. */
  open: { type: Boolean, default: false },
});

const OPEN = { duration: 460, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' };
const CLOSE = { duration: 280, easing: 'cubic-bezier(0.65, 0, 0.35, 1)' };

const details = ref(null);
const content = ref(null);
let animation = null;

function animateHeight(from, to, timing) {
  animation?.cancel();
  animation = content.value.animate(
    [
      { height: `${from}px`, opacity: from === 0 ? 0 : 1 },
      { height: `${to}px`, opacity: to === 0 ? 0 : 1 },
    ],
    timing,
  );
  return animation;
}

// A native <details> with a measured height animation: the content's real
// height is used every time, so long or changing content never jumps.
function toggle(event) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  event.preventDefault();
  const element = details.value;
  const isClosing = element.classList.contains('is-closing');

  if (element.open && !isClosing) {
    element.classList.add('is-closing');
    animateHeight(content.value.offsetHeight, 0, CLOSE).onfinish = () => {
      element.open = false;
      element.classList.remove('is-closing');
      animation = null;
    };
    return;
  }

  const start = isClosing ? content.value.offsetHeight : 0;
  element.classList.remove('is-closing');
  element.open = true;
  animateHeight(start, content.value.scrollHeight, OPEN).onfinish = () => {
    animation = null;
  };
}

onBeforeUnmount(() => animation?.cancel());
</script>

<template>
  <details ref="details" class="disclosure" :open="open">
    <summary @click="toggle">
      <slot name="summary"></slot>
      <span class="disclosure__icon" aria-hidden="true"></span>
    </summary>
    <div ref="content" class="disclosure__content">
      <slot></slot>
    </div>
  </details>
</template>

<style>
.disclosure {
  border-block-start: 1px solid var(--line);
}

.disclosure:last-child {
  border-block-end: 1px solid var(--line);
}

.disclosure > summary {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  min-height: 3.25rem;
  padding-block: var(--space-3);
  border-radius: var(--radius-sm);
  color: var(--blue-950);
  font-size: 0.9375rem;
  font-weight: var(--weight-semibold);
  list-style: none;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  transition: color var(--duration-fast) var(--ease-out);
}

.disclosure > summary::-webkit-details-marker {
  display: none;
}

.disclosure__content {
  overflow: hidden;
}

/* Plus turns into minus: the upright stroke turns flat and fades into the other. */
.disclosure__icon {
  position: relative;
  flex: none;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  background: var(--blue-100);
  transition: background-color var(--duration-base) var(--ease-out);
}

.disclosure__icon::before,
.disclosure__icon::after {
  content: '';
  position: absolute;
  top: calc(50% - 0.75px);
  left: 25%;
  width: 50%;
  height: 1.5px;
  border-radius: 1px;
  background: var(--color-brand);
  transition:
    transform var(--duration-slow) var(--ease-out-expo),
    opacity var(--duration-base) var(--ease-out),
    background-color var(--duration-base) var(--ease-out);
}

.disclosure__icon::after {
  transform: rotate(90deg);
}

.disclosure[open]:not(.is-closing) .disclosure__icon {
  background: var(--color-brand);
}

.disclosure[open]:not(.is-closing) .disclosure__icon::before,
.disclosure[open]:not(.is-closing) .disclosure__icon::after {
  background: var(--white);
}

.disclosure[open]:not(.is-closing) .disclosure__icon::after {
  opacity: 0;
  transform: rotate(180deg);
}

/* Lines of an opened section arrive in reading order. */
.disclosure[open] .disclosure__content li {
  animation: disclosure-line var(--duration-slower) var(--ease-out-expo) both;
  animation-delay: calc(min(var(--line, 0), 10) * 35ms + 60ms);
}

@keyframes disclosure-line {
  from {
    opacity: 0;
    transform: translateY(0.5rem);
  }
}

@media (hover: hover) and (pointer: fine) {
  .disclosure > summary:hover {
    color: var(--color-brand-hover);
  }

  .disclosure > summary:hover .disclosure__icon {
    background: var(--blue-200);
  }

  .disclosure[open]:not(.is-closing) > summary:hover .disclosure__icon {
    background: var(--color-brand-hover);
  }
}
</style>
