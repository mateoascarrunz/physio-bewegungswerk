<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';
import BaseButton from '../base/BaseButton.vue';
import BaseIcon from '../base/BaseIcon.vue';
import { BOOKING_URL, PRACTICE } from '@/content/practice';
import { teams } from '@/services/cms';

const MAX_DEPTH_PX = 6;

defineEmits(['select-person']);

function roleOf(name) {
  return teams.find((member) => member.name.trim() === name)?.workPosition ?? '';
}

const PEOPLE = [
  { key: 'marit', name: 'Marit Hesse', first: 'Marit', last: 'Hesse' },
  { key: 'dominik', name: 'Dominik Geissberger', first: 'Dominik', last: 'Geissberger' },
].map((person) => ({ ...person, role: roleOf(person.name) }));

const hero = ref(null);
const depth = ref(null);
// The sharper colour layers only serve mouse users, so touch devices skip them.
const hasPrecisePointer = ref(false);
let reducedMotion = true;
let frame = null;
let pointerX = 0;

function applyDepth() {
  frame = null;
  depth.value?.style.setProperty('--depth-x', `${pointerX.toFixed(1)}px`);
}

function onPointerMove(event) {
  if (reducedMotion || event.pointerType !== 'mouse' || !hero.value) return;
  const { left, width } = hero.value.getBoundingClientRect();
  pointerX = (0.5 - (event.clientX - left) / width) * 2 * MAX_DEPTH_PX;
  if (frame === null) frame = requestAnimationFrame(applyDepth);
}

function onPointerLeave() {
  pointerX = 0;
  if (frame === null) frame = requestAnimationFrame(applyDepth);
}

function discover() {
  hero.value?.nextElementSibling?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
}

onMounted(() => {
  hasPrecisePointer.value = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
});

onBeforeUnmount(() => {
  if (frame !== null) cancelAnimationFrame(frame);
});
</script>

<template>
  <section ref="hero" class="hero" aria-labelledby="hero-title" @pointermove="onPointerMove" @pointerleave="onPointerLeave">
    <div class="hero__text">
      <p class="hero__eyebrow">Willkommen beim <strong>Physio Bewegungswerk</strong></p>
      <h1 id="hero-title" class="t-display hero__title">
        <span class="hero__word"><span>Bleib</span></span>{{ ' ' }}<br />
        <span class="hero__word hero__word--accent"><span>beweglich</span></span>
      </h1>
      <p class="t-lead hero__lead">Gerne stellen wir uns vor…</p>
      <div class="hero__actions">
        <BaseButton variant="accent" arrow :href="BOOKING_URL">Termin vereinbaren</BaseButton>
        <BaseButton variant="secondary" to="/uberuns">Mehr über uns</BaseButton>
      </div>
      <ul class="hero__facts">
        <li>
          <a :href="PRACTICE.mapsUrl" target="_blank" rel="noopener noreferrer">
            <BaseIcon name="map-pin" :size="18" />{{ PRACTICE.address }}
          </a>
        </li>
        <li>
          <a :href="PRACTICE.phone.href"><BaseIcon name="phone" :size="18" />{{ PRACTICE.phone.label }}</a>
        </li>
      </ul>
    </div>

    <button class="hero__cue" type="button" @click="discover">
      <span class="hero__cue-line" aria-hidden="true"></span>
      Entdecken
    </button>

    <div class="hero__stage">
      <div ref="depth" class="hero__depth">
        <picture class="hero__base">
          <source
            type="image/avif"
            srcset="
              @/assets/images/hero/hero-team-828.avif   828w,
              @/assets/images/hero/hero-team-1280.avif 1280w,
              @/assets/images/hero/hero-team-1920.avif 1920w,
              @/assets/images/hero/hero-team-2560.avif 2560w
            "
            sizes="(max-width: 47.99rem) 175vw, (max-width: 59.99rem) 130vw, 115vw"
          />
          <source
            type="image/webp"
            srcset="
              @/assets/images/hero/hero-team-828.webp   828w,
              @/assets/images/hero/hero-team-1280.webp 1280w,
              @/assets/images/hero/hero-team-1920.webp 1920w,
              @/assets/images/hero/hero-team-2560.webp 2560w
            "
            sizes="(max-width: 47.99rem) 175vw, (max-width: 59.99rem) 130vw, 115vw"
          />
          <img
            src="@/assets/images/hero/hero-team-1280.webp"
            alt="Marit Hesse und Dominik Geissberger in ihrer Praxis, gemeinsam an einem Gymnastikball"
            width="2560"
            height="1643"
            fetchpriority="high"
            decoding="async"
          />
        </picture>

        <!-- A soft light that glides behind whichever person has the focus. -->
        <span class="hero__spot" aria-hidden="true"></span>

        <template v-if="hasPrecisePointer">
          <picture class="hero__overlay hero__overlay--marit">
            <source
              type="image/avif"
              srcset="
                @/assets/images/hero/hero-marit-1280.avif 1280w,
                @/assets/images/hero/hero-marit-1920.avif 1920w,
                @/assets/images/hero/hero-marit-2560.avif 2560w
              "
              sizes="115vw"
            />
            <img src="@/assets/images/hero/hero-marit-1280.webp" alt="" width="2560" height="1643" loading="lazy" />
          </picture>
          <picture class="hero__overlay hero__overlay--dominik">
            <source
              type="image/avif"
              srcset="
                @/assets/images/hero/hero-dominik-1280.avif 1280w,
                @/assets/images/hero/hero-dominik-1920.avif 1920w,
                @/assets/images/hero/hero-dominik-2560.avif 2560w
              "
              sizes="115vw"
            />
            <img src="@/assets/images/hero/hero-dominik-1280.webp" alt="" width="2560" height="1643" loading="lazy" />
          </picture>
        </template>

        <!-- Each person is one large button; the two meet with no gap, so moving
             between them crossfades instead of dropping the emphasis. -->
        <button
          v-for="person in PEOPLE"
          :key="person.key"
          class="hero__person"
          :class="`hero__person--${person.key}`"
          type="button"
          :aria-label="`${person.name}, Profil öffnen`"
          @click="$emit('select-person', person.name)"
        >
          <span class="hero__chip">
            <span class="hero__chip-name">
              {{ person.first }}<span class="hero__chip-rest">&nbsp;{{ person.last }}</span>
            </span>
            <span v-if="person.role" class="hero__chip-role"><span>{{ person.role }}</span></span>
            <BaseIcon class="hero__chip-arrow" name="arrow-right" :size="16" />
          </span>
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  --hero-h: clamp(34rem, min(56vw, 100vh - var(--header-h) - 2 * var(--header-offset) - 3 * var(--gap)), 54rem);
  --hero-h: clamp(34rem, min(56vw, 100svh - var(--header-h) - 2 * var(--header-offset) - 3 * var(--gap)), 54rem);
  --stage-width: 172%;
  position: relative;
  display: flex;
  flex-direction: column;
  /* clip, not hidden: focus must never be able to scroll the artwork sideways. */
  overflow: hidden;
  overflow: clip;
  border-radius: var(--radius-xl);
  background: linear-gradient(180deg, var(--surface) 0%, #edf1f9 100%);
}

.hero__text {
  position: relative;
  z-index: 2;
  display: grid;
  justify-items: start;
  gap: var(--space-4);
  padding: clamp(1.75rem, 4vw, 3rem) var(--card-pad) 0;
}

.hero__eyebrow {
  color: var(--blue-700);
  font-size: var(--text-lead);
  font-weight: var(--weight-medium);
  line-height: 1.35;
  text-wrap: balance;
}

.hero__eyebrow strong {
  font-weight: var(--weight-bold);
}

.hero__title {
  color: var(--color-brand);
}

/* Each word rises out of its own line mask. The padding gives descenders room. */
.hero__word {
  display: inline-block;
  overflow: clip;
  padding-block-end: 0.16em;
  margin-block-end: -0.16em;
  vertical-align: top;
}

.hero__word > span {
  display: inline-block;
}

/* A short magenta stroke under the promise, drawn once the word has settled. */
.hero__word--accent {
  position: relative;
}

.hero__word--accent::after {
  content: '';
  position: absolute;
  bottom: 0.02em;
  left: 0.05em;
  width: 1.4em;
  height: max(3px, 0.075em);
  border-radius: 99px;
  background: var(--color-accent);
  transform-origin: left center;
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  margin-block-start: var(--space-1);
}

.hero__facts {
  display: none;
  flex-wrap: wrap;
  gap: 0 var(--space-5);
  color: var(--color-text-soft);
  font-size: var(--text-small);
}

.hero__facts a {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  min-height: 2.75rem;
  border-radius: var(--radius-sm);
  text-decoration: none;
  transition: color var(--duration-fast) var(--ease-out);
}

.hero__facts svg {
  color: var(--color-brand);
}

@media (hover: hover) and (pointer: fine) {
  .hero__facts a:hover {
    color: var(--blue-700);
  }
}

.hero__cue {
  display: none;
}

/* The stage shares its box with the people, so percentages stay in step with
   the artwork at every width. People occupy roughly 47% to 93% of its width. */
.hero__stage {
  position: relative;
  flex: none;
  width: var(--stage-width);
  aspect-ratio: 2560 / 1643;
  margin-block-start: calc(var(--stage-width) * -0.15);
  margin-inline-start: calc(50% - var(--stage-width) * 0.705);
}

.hero__depth {
  position: absolute;
  inset: 0;
  transform: translate3d(var(--depth-x, 0), 0, 0);
  transition: transform var(--duration-slower) var(--ease-out);
}

.hero__base img,
.hero__overlay img {
  width: 100%;
  height: 100%;
}

.hero__base {
  display: block;
  position: absolute;
  inset: 0;
  transform-origin: 70% 100%;
  transition: opacity var(--duration-slow) var(--ease-out);
}

.hero__spot {
  position: absolute;
  top: 22%;
  bottom: 0;
  left: 0;
  width: 30%;
  background: radial-gradient(closest-side, rgb(255 255 255 / 0.95), rgb(255 255 255 / 0));
  opacity: 0;
  transform: translateX(var(--spot-x, 182%));
  transition:
    opacity var(--duration-slow) var(--ease-out),
    transform var(--duration-slower) var(--ease-out-expo);
  pointer-events: none;
}

.hero__overlay {
  display: block;
  position: absolute;
  inset: 0;
  opacity: 0;
  pointer-events: none;
  transform-origin: 70% 100%;
  transition: opacity var(--duration-slow) var(--ease-out);
}

.hero__person {
  position: absolute;
  bottom: 0;
  -webkit-tap-highlight-color: transparent;
}

.hero__person--marit {
  left: 46.5%;
  width: 22.5%;
  top: 36%;
}

.hero__person--dominik {
  left: 69%;
  width: 25%;
  top: 31%;
}

.hero__person:focus-visible {
  outline: none;
}

.hero__chip {
  position: absolute;
  left: 50%;
  /* Sized by its content, not by the half of the person it starts from. */
  width: max-content;
  bottom: clamp(0.625rem, 2.2vw, 1.75rem);
  display: inline-flex;
  align-items: center;
  min-height: 2.25rem;
  padding: 0.375rem 0.875rem;
  border-radius: var(--radius-pill);
  background: rgb(255 255 255 / 0.95);
  box-shadow: var(--shadow-sm);
  color: var(--blue-950);
  font-size: 0.8125rem;
  font-weight: var(--weight-semibold);
  letter-spacing: -0.005em;
  white-space: nowrap;
  transform: translateX(-50%);
  transition:
    background-color var(--duration-base) var(--ease-out),
    color var(--duration-base) var(--ease-out);
}

.hero__chip-rest {
  display: none;
}

/* The role unfolds next to the name; the chip is positioned on its own, so nothing else moves. */
.hero__chip-role {
  display: grid;
  grid-template-columns: 0fr;
  transition: grid-template-columns var(--duration-slow) var(--ease-out-expo);
}

.hero__chip-role > span {
  min-width: 0;
  overflow: hidden;
  padding-inline-start: 0;
  font-weight: var(--weight-medium);
  opacity: 0.85;
  transition: padding var(--duration-slow) var(--ease-out-expo);
}

.hero__chip-arrow {
  margin-inline-start: 0.375rem;
  transition: transform var(--duration-base) var(--ease-out);
}

.hero__person:focus-visible .hero__chip {
  outline: var(--focus-width) solid var(--focus-color);
  outline-offset: var(--focus-offset);
}

.hero__person:active .hero__chip,
.hero__person:focus-visible .hero__chip {
  background: var(--color-brand);
  color: var(--white);
}

/* Emphasis: the room and the other person recede, the chosen person stays crisp
   in a soft light. Opacity alone keeps the photographic layers aligned. */
@media (hover: hover) and (pointer: fine) {
  .hero__depth:has(.hero__person:hover) .hero__base,
  .hero__depth:has(.hero__person:focus-visible) .hero__base {
    opacity: 0.5;
  }

  .hero__depth:has(.hero__person:hover) .hero__spot,
  .hero__depth:has(.hero__person:focus-visible) .hero__spot {
    opacity: 1;
  }

  .hero__depth:has(.hero__person--marit:hover) .hero__spot,
  .hero__depth:has(.hero__person--marit:focus-visible) .hero__spot {
    --spot-x: 142%;
  }

  .hero__depth:has(.hero__person--dominik:hover) .hero__spot,
  .hero__depth:has(.hero__person--dominik:focus-visible) .hero__spot {
    --spot-x: 222%;
  }

  .hero__depth:has(.hero__person--marit:hover) .hero__overlay--marit,
  .hero__depth:has(.hero__person--marit:focus-visible) .hero__overlay--marit,
  .hero__depth:has(.hero__person--dominik:hover) .hero__overlay--dominik,
  .hero__depth:has(.hero__person--dominik:focus-visible) .hero__overlay--dominik {
    opacity: 1;
  }

  .hero__person:hover .hero__chip {
    background: var(--color-brand);
    color: var(--white);
  }

  .hero__person:is(:hover, :focus-visible) .hero__chip-role {
    grid-template-columns: 1fr;
  }

  .hero__person:is(:hover, :focus-visible) .hero__chip-role > span {
    padding-inline-start: 0.5rem;
  }

  .hero__person:hover .hero__chip-arrow {
    transform: translateX(3px);
  }
}

@media (min-width: 26.5rem) {
  .hero__chip-rest {
    display: inline;
  }
}

/* Tablet portrait: text above, people set right of centre to leave it breathing. */
@media (min-width: 48rem) {
  .hero {
    --stage-width: 128%;
  }

  .hero__text {
    gap: var(--space-5);
  }

  .hero__facts {
    display: flex;
  }

  .hero__stage {
    margin-block-start: calc(var(--stage-width) * -0.2);
    margin-inline-start: calc(66% - var(--stage-width) * 0.705);
  }

  .hero__chip {
    font-size: 0.875rem;
  }
}

/* From tablet landscape the classic composition returns: text left, people right. */
@media (min-width: 60rem) {
  .hero {
    --stage-width: min(116%, var(--hero-h) * 2.15);
    justify-content: center;
    min-height: var(--hero-h);
  }

  .hero__text {
    width: min(50%, 42rem);
    padding-block: var(--card-pad);
  }

  .hero__stage {
    position: absolute;
    right: -5.5%;
    bottom: 0;
    margin: 0;
  }

  .hero__base {
    mask-image: linear-gradient(90deg, transparent 20%, #000 46%);
  }

  .hero__cue {
    position: absolute;
    z-index: 2;
    bottom: clamp(1rem, 2vw, 1.75rem);
    left: var(--card-pad);
    display: inline-flex;
    align-items: center;
    gap: var(--space-3);
    min-height: 2.75rem;
    padding-inline-end: var(--space-2);
    border-radius: var(--radius-sm);
    color: var(--color-text-soft);
    font-size: var(--text-label);
    font-weight: var(--weight-semibold);
    letter-spacing: var(--tracking-label);
    text-transform: uppercase;
    transition: color var(--duration-fast) var(--ease-out);
  }

  .hero__cue-line {
    position: relative;
    width: 2.5rem;
    height: 1.5px;
    overflow: hidden;
    background: var(--line-strong);
  }

  .hero__cue-line::after {
    content: '';
    position: absolute;
    inset: 0;
    background: var(--color-brand);
    transform: translateX(-101%);
    transition: transform var(--duration-slow) var(--ease-out-expo);
  }

  @media (hover: hover) and (pointer: fine) {
    .hero__cue:hover {
      color: var(--blue-700);
    }

    .hero__cue:hover .hero__cue-line::after {
      transform: none;
    }
  }
}
</style>

<style>
/*
 * The entrance. Not scoped, because it depends on the html element: while the logo
 * intro covers the page nothing plays, and everything starts fresh as it lifts.
 * Each step only moves or reveals what is already laid out, so the page is usable
 * from the first frame and nothing shifts.
 */
@media (prefers-reduced-motion: no-preference) {
  html:not(.intro-pending) .hero {
    animation: hero-frame 900ms var(--ease-out-expo) backwards;
  }

  html:not(.intro-pending) .hero__text > :not(.hero__title),
  html:not(.intro-pending) .hero__cue {
    animation: hero-rise var(--duration-slower) var(--ease-out-expo) backwards;
  }

  html:not(.intro-pending) .hero__eyebrow {
    animation-delay: 80ms;
  }

  html:not(.intro-pending) .hero__word > span {
    animation: hero-word 820ms var(--ease-out-expo) 160ms backwards;
  }

  html:not(.intro-pending) .hero__word--accent > span {
    animation-delay: 240ms;
  }

  html:not(.intro-pending) .hero__word--accent::after {
    animation: hero-stroke var(--duration-slower) var(--ease-out-expo) 780ms backwards;
  }

  html:not(.intro-pending) .hero__lead {
    animation-delay: 320ms;
  }

  html:not(.intro-pending) .hero__actions {
    animation-delay: 400ms;
  }

  html:not(.intro-pending) .hero__facts {
    animation-delay: 480ms;
  }

  html:not(.intro-pending) .hero__cue {
    animation-delay: 1100ms;
  }

  html:not(.intro-pending) .hero__stage {
    animation: hero-stage 1200ms var(--ease-out-expo) 60ms backwards;
  }

  html:not(.intro-pending) .hero__chip {
    animation: hero-chip var(--duration-slower) var(--ease-out-expo) 820ms backwards;
  }

  html:not(.intro-pending) .hero__person--dominik .hero__chip {
    animation-delay: 900ms;
  }
}

@keyframes hero-frame {
  from {
    clip-path: inset(2.5% 2.5% 2.5% 2.5% round var(--radius-xl));
  }

  to {
    clip-path: inset(0 0 0 0 round var(--radius-xl));
  }
}

/* Text and buttons are unmasked rather than faded, so their colours and contrast
   are true on every frame of the entrance. */
@keyframes hero-rise {
  from {
    clip-path: inset(0 0 100% 0);
    transform: translateY(0.75rem);
  }

  to {
    clip-path: inset(0);
  }
}

@keyframes hero-word {
  from {
    transform: translateY(105%);
  }
}

@keyframes hero-stroke {
  from {
    transform: scaleX(0);
  }
}

@keyframes hero-stage {
  from {
    transform: translateY(1.75rem) scale(1.02);
  }
}

@keyframes hero-chip {
  from {
    clip-path: inset(0 50% round var(--radius-pill));
    translate: 0 0.75rem;
  }

  to {
    clip-path: inset(0 round var(--radius-pill));
  }
}

/* As the visitor scrolls on, the photograph settles back into the page. */
@supports (animation-timeline: view()) {
  @media (prefers-reduced-motion: no-preference) {
    .hero__base,
    .hero__overlay {
      animation: hero-recede linear both;
      animation-timeline: view();
      animation-range: exit 0% exit 100%;
    }
  }
}

@keyframes hero-recede {
  to {
    scale: 0.94;
    translate: 0 3%;
  }
}
</style>
