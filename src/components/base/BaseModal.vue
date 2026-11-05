<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import BaseIconButton from './BaseIconButton.vue';

/*
 * The single modal foundation for the site, built on the native <dialog>.
 * showModal() supplies focus containment, an inert background, top-layer
 * stacking and focus restoration; this component adds the entrance and exit.
 */
// A little longer than the entrance itself, so the class never cuts it short.
const OPEN_DURATION_MS = 320;
const CLOSE_DURATION_MS = 180;

const props = defineProps({
  open: { type: Boolean, default: false },
  /** Id of the element that titles the dialog. */
  labelledby: { type: String, default: null },
  /** Fallback accessible name when there is no visible title. */
  label: { type: String, default: null },
  /** sheet: centred panel that becomes a bottom sheet on phones. full: entire viewport. */
  variant: { type: String, default: 'sheet' },
  /** sm | md | lg | xl */
  size: { type: String, default: 'md' },
  closeLabel: { type: String, default: 'Schliessen' },
  hideClose: { type: Boolean, default: false },
});

const emit = defineEmits(['close', 'closed']);

const dialog = ref(null);
const isRendered = ref(false);
const isClosing = ref(false);
// The entrance only plays when opening, never again on a resize or rotation.
const isEntering = ref(false);
let closeTimer = null;
let openTimer = null;
let pointerStartedOnBackdrop = false;

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

async function show() {
  clearTimeout(closeTimer);
  clearTimeout(openTimer);
  isClosing.value = false;
  isEntering.value = true;
  isRendered.value = true;
  await nextTick();
  if (dialog.value && !dialog.value.open) dialog.value.showModal();
  openTimer = setTimeout(() => {
    isEntering.value = false;
  }, OPEN_DURATION_MS);
}

function finishClosing() {
  clearTimeout(closeTimer);
  if (dialog.value?.open) dialog.value.close();
  if (!isRendered.value) return;
  isRendered.value = false;
  isClosing.value = false;
  // The browser can close a dialog by itself, for example on a repeated Escape.
  if (props.open) emit('close');
  emit('closed');
}

function hide() {
  if (!isRendered.value) return;
  if (prefersReducedMotion()) {
    finishClosing();
    return;
  }
  isClosing.value = true;
  closeTimer = setTimeout(finishClosing, CLOSE_DURATION_MS);
}

watch(
  () => props.open,
  (open) => (open ? show() : hide()),
);

onMounted(() => {
  if (props.open) show();
});

onBeforeUnmount(() => {
  clearTimeout(closeTimer);
  clearTimeout(openTimer);
  if (dialog.value?.open) dialog.value.close();
});

function onPointerDown(event) {
  pointerStartedOnBackdrop = event.target === dialog.value;
}

function onClick(event) {
  // Only a press that began and ended on the backdrop closes, so selecting
  // text and releasing outside the panel leaves the dialog open.
  if (event.target === dialog.value && pointerStartedOnBackdrop) emit('close');
  pointerStartedOnBackdrop = false;
}

defineExpose({ dialog });
</script>

<template>
  <dialog
    v-if="isRendered"
    ref="dialog"
    class="modal"
    :class="[`modal--${variant}`, `modal--${size}`, { 'is-entering': isEntering, 'is-closing': isClosing }]"
    :aria-labelledby="labelledby || undefined"
    :aria-label="labelledby ? undefined : label"
    @cancel.prevent="emit('close')"
    @close="finishClosing"
    @pointerdown="onPointerDown"
    @click="onClick"
  >
    <BaseIconButton
      v-if="!hideClose"
      class="modal__close"
      variant="floating"
      icon="close"
      :label="closeLabel"
      @click="emit('close')"
    />
    <div class="modal__scroll">
      <slot></slot>
    </div>
  </dialog>
</template>

<style>
.modal {
  --modal-width: 46rem;
  width: min(var(--modal-width), calc(100vw - 2 * var(--gutter)));
  max-width: none;
  max-height: calc(100vh - 3rem);
  max-height: calc(100dvh - 3rem);
  margin: auto;
  padding: 0;
  overflow: hidden;
  border: 0;
  border-radius: var(--radius-xl);
  background: var(--white);
  color: var(--color-text);
  box-shadow: var(--shadow-lg);
}

.modal[open] {
  display: flex;
}

.modal.is-entering {
  animation: modal-in var(--duration-base) var(--ease-out);
}

.modal::backdrop {
  background: var(--color-overlay);
}

.modal.is-entering::backdrop {
  animation: modal-fade-in var(--duration-base) var(--ease-out);
}

.modal.is-closing {
  animation: modal-out 180ms var(--ease-in-out) forwards;
}

.modal.is-closing::backdrop {
  animation: modal-fade-out 180ms var(--ease-in-out) forwards;
}

.modal--sm {
  --modal-width: 32rem;
}

.modal--lg {
  --modal-width: 62rem;
}

.modal--xl {
  --modal-width: 80rem;
}

.modal__scroll {
  flex: 1;
  min-width: 0;
  overflow-y: auto;
  overscroll-behavior: contain;
  -webkit-overflow-scrolling: touch;
}

.modal__close {
  position: absolute;
  z-index: 2;
  top: var(--space-3);
  right: var(--space-3);
}

/* Phones: a nearly full-height sheet that respects the safe areas. */
@media (max-width: 39.99rem) {
  .modal--sheet {
    width: 100%;
    max-height: calc(100vh - 0.75rem);
    max-height: calc(100dvh - max(0.75rem, env(safe-area-inset-top)));
    margin: auto 0 0;
    border-end-start-radius: 0;
    border-end-end-radius: 0;
  }

  .modal--sheet.is-entering {
    animation-name: modal-sheet-in;
  }

  .modal--sheet.is-closing {
    animation-name: modal-sheet-out;
  }

  .modal--sheet .modal__scroll {
    padding-block-end: env(safe-area-inset-bottom);
  }
}

.modal--full {
  width: 100%;
  height: 100vh;
  height: 100dvh;
  max-height: none;
  margin: 0;
  border-radius: 0;
  box-shadow: none;
}

.modal--full.is-entering {
  animation-name: modal-full-in;
}

.modal--full.is-closing {
  animation-name: modal-full-out;
}

@keyframes modal-in {
  from {
    opacity: 0;
    transform: translateY(0.75rem) scale(0.985);
  }
}

@keyframes modal-out {
  to {
    opacity: 0;
    transform: translateY(0.5rem) scale(0.99);
  }
}

@keyframes modal-sheet-in {
  from {
    opacity: 0;
    transform: translateY(2rem);
  }
}

@keyframes modal-sheet-out {
  to {
    opacity: 0;
    transform: translateY(1.5rem);
  }
}

@keyframes modal-full-in {
  from {
    opacity: 0;
    transform: translateY(-0.5rem);
  }
}

@keyframes modal-full-out {
  to {
    opacity: 0;
    transform: translateY(-0.25rem);
  }
}

@keyframes modal-fade-in {
  from {
    opacity: 0;
  }
}

@keyframes modal-fade-out {
  to {
    opacity: 0;
  }
}
</style>
