<script setup>
import { computed } from 'vue';
import BaseIcon from '../base/BaseIcon.vue';
import { responsiveImage } from '@/content/media';
import { withSoftHyphens } from '@/content/services';

const props = defineProps({
  service: { type: Object, required: true },
  /** Overrides the service's own title, for the shorter home page wording. */
  title: { type: String, default: null },
  /** Slot width hint for the browser's image choice. */
  sizes: { type: String, default: '(max-width: 40rem) 92vw, 33vw' },
  /** Position number shown on the card, when the list is numbered. */
  index: { type: Number, default: null },
  headingTag: { type: String, default: 'h3' },
});

const image = computed(() => responsiveImage(props.service.image));
const displayTitle = computed(() => withSoftHyphens(props.title ?? props.service.title));
const number = computed(() => (props.index === null ? null : String(props.index).padStart(2, '0')));
</script>

<template>
  <RouterLink
    class="service-card zoom-trigger"
    :to="{ name: 'behandlungstechnikenitem', params: { serviceid: service.id } }"
  >
    <span class="service-card__media zoom-media">
      <img
        v-bind="image"
        :sizes="sizes"
        :style="{ objectPosition: service.focus }"
        alt=""
        width="1024"
        height="683"
        loading="lazy"
        decoding="async"
      />
    </span>
    <span v-if="number" class="service-card__number" aria-hidden="true">{{ number }}</span>
    <div class="service-card__footer">
      <component :is="headingTag" class="service-card__title">{{ displayTitle }}</component>
      <span class="service-card__arrow"><BaseIcon name="arrow-right" :size="20" /></span>
    </div>
  </RouterLink>
</template>

<style>
.service-card {
  position: relative;
  isolation: isolate;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  min-height: 100%;
  overflow: hidden;
  border-radius: var(--radius-lg);
  background: var(--blue-800);
  color: var(--white);
  text-decoration: none;
  -webkit-tap-highlight-color: transparent;
}

.service-card__media {
  position: absolute;
  z-index: -2;
  inset: 0;
}

.service-card__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Two stacked gradients: a constant base for legibility, a second that fades in on hover. */
.service-card::before,
.service-card::after {
  content: '';
  position: absolute;
  z-index: -1;
  inset: 0;
  pointer-events: none;
}

.service-card::before {
  background: linear-gradient(
    180deg,
    rgb(0 28 84 / 0) 38%,
    rgb(0 28 84 / 0.2) 54%,
    rgb(0 28 84 / 0.58) 74%,
    rgb(0 28 84 / 0.88) 100%
  );
}

.service-card::after {
  background: linear-gradient(180deg, rgb(63 99 167 / 0.1) 0%, rgb(0 28 84 / 0.5) 100%);
  opacity: 0;
  transition: opacity var(--duration-slow) var(--ease-out);
}

.service-card__number {
  position: absolute;
  top: var(--space-4);
  left: var(--space-4);
  padding: 0.125rem 0.625rem;
  border-radius: var(--radius-pill);
  background: rgb(255 255 255 / 0.92);
  color: var(--blue-950);
  font-size: var(--text-label);
  font-weight: var(--weight-semibold);
  font-variant-numeric: tabular-nums;
  letter-spacing: 0.02em;
}

.service-card__footer {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: var(--space-4);
  padding: clamp(1rem, 1.8vw, 1.5rem);
}

.service-card__title {
  min-width: 0;
  color: var(--white);
  font-size: var(--text-h3);
  font-weight: var(--weight-semibold);
  line-height: var(--leading-snug);
  letter-spacing: -0.014em;
  text-wrap: balance;
  hyphens: manual;
  overflow-wrap: break-word;
}

.service-card__arrow {
  display: grid;
  place-items: center;
  flex: none;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background: var(--white);
  color: var(--blue-950);
  transition:
    background-color var(--duration-base) var(--ease-out),
    color var(--duration-base) var(--ease-out);
}

.service-card__arrow svg {
  transition: transform var(--duration-base) var(--ease-out);
}

.service-card:active .service-card__arrow {
  background: var(--color-brand);
  color: var(--white);
}

.service-card:focus-visible {
  outline-offset: 2px;
}

.service-card:focus-visible::after {
  opacity: 1;
}

@media (hover: hover) and (pointer: fine) {
  .service-card:hover::after {
    opacity: 1;
  }

  .service-card:hover .service-card__arrow {
    background: var(--color-brand);
    color: var(--white);
  }

  .service-card:hover .service-card__arrow svg {
    transform: translateX(2px);
  }
}
</style>
