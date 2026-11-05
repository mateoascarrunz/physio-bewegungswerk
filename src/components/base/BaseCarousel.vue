<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';
import BaseIconButton from './BaseIconButton.vue';

/*
 * Native scroll-snap carousel: swipe, trackpad and keyboard work without a
 * library, nothing moves on its own, and the content stays in the document.
 */
defineProps({
  /** Accessible name of the scrollable region. */
  label: { type: String, required: true },
  /** Places the controls over the slides instead of in the host's header. */
  overlayControls: { type: Boolean, default: false },
});

const track = ref(null);
const canGoBack = ref(false);
const canGoForward = ref(true);
let frame = null;
let resizeObserver = null;

function updateControls() {
  frame = null;
  const element = track.value;
  if (!element) return;
  canGoBack.value = element.scrollLeft > 4;
  canGoForward.value = element.scrollLeft + element.clientWidth < element.scrollWidth - 4;
}

function scheduleUpdate() {
  if (frame === null) frame = requestAnimationFrame(updateControls);
}

function move(direction) {
  const element = track.value;
  const slide = element?.firstElementChild;
  if (!slide) return;
  const gap = parseFloat(getComputedStyle(element).columnGap) || 0;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const pageSize = Math.max(1, Math.floor((element.clientWidth + gap) / (slide.offsetWidth + gap)));
  element.scrollBy({
    left: direction * pageSize * (slide.offsetWidth + gap),
    behavior: reduced ? 'auto' : 'smooth',
  });
}

function scrollToIndex(index) {
  const element = track.value;
  const slide = element?.children[index];
  if (slide) element.scrollLeft = slide.offsetLeft - element.offsetLeft;
}

defineExpose({ scrollToIndex });

onMounted(() => {
  updateControls();
  resizeObserver = new ResizeObserver(scheduleUpdate);
  resizeObserver.observe(track.value);
});

onBeforeUnmount(() => {
  resizeObserver?.disconnect();
  if (frame !== null) cancelAnimationFrame(frame);
});
</script>

<template>
  <div class="carousel" :class="{ 'carousel--overlay': overlayControls }">
    <div class="carousel__head">
      <slot name="header"></slot>
      <div class="carousel__controls">
        <BaseIconButton
          icon="arrow-left"
          :variant="overlayControls ? 'floating' : 'soft'"
          label="Zurück"
          :disabled="!canGoBack"
          @click="move(-1)"
        />
        <BaseIconButton
          icon="arrow-right"
          :variant="overlayControls ? 'floating' : 'soft'"
          label="Weiter"
          :disabled="!canGoForward"
          @click="move(1)"
        />
      </div>
    </div>
    <ul
      ref="track"
      class="carousel__track"
      tabindex="0"
      :aria-label="label"
      @scroll.passive="scheduleUpdate"
    >
      <slot></slot>
    </ul>
  </div>
</template>

<style>
.carousel {
  --slide-width: clamp(15.5rem, 26vw, 24rem);
  position: relative;
  display: grid;
  /* A scrolling row must never widen the page, whatever its content. */
  grid-template-columns: minmax(0, 1fr);
  gap: var(--space-4);
}

.carousel__head {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: var(--space-3) var(--space-5);
}

.carousel__controls {
  display: flex;
  gap: var(--space-2);
  margin-inline-start: auto;
}

.carousel__track {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: var(--slide-width);
  gap: var(--gap);
  /* The track runs out to the screen edge so a cropped card signals more to come. */
  margin-inline: calc(-1 * var(--gutter));
  padding: 2px var(--gutter);
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-padding-inline: var(--gutter);
  scrollbar-width: none;
  overscroll-behavior-x: contain;
}

.carousel__track::-webkit-scrollbar {
  display: none;
}

.carousel__track > * {
  scroll-snap-align: start;
  min-width: 0;
}

.carousel--overlay {
  display: block;
}

.carousel--overlay .carousel__head {
  position: absolute;
  z-index: 1;
  inset-inline-end: var(--space-3);
  inset-block-end: var(--space-3);
}
</style>
