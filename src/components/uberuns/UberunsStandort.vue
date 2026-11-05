<script setup>
import { ref, useId, watch } from 'vue';
import BaseButton from '../base/BaseButton.vue';
import BaseCarousel from '../base/BaseCarousel.vue';
import BaseModal from '../base/BaseModal.vue';
import { responsiveImage } from '@/content/media';
import { PRACTICE } from '@/content/practice';

const GALLERY = [
  { key: 'places/entrance', alt: 'Eingang der Praxis mit dem Logo auf den Fenstern' },
  { key: 'places/gym-long', alt: 'Heller Trainingsraum mit Geräten entlang der Fensterfront' },
  { key: 'places/gym-machines', alt: 'Trainingsgeräte vor grossen Fenstern' },
  { key: 'places/exterior', alt: 'Das Praxisgebäude an der Bergstrasse 3 in Gossau' },
  { key: 'places/waiting', alt: 'Wartebereich mit Sesseln und einem Regal' },
  { key: 'places/treatment', alt: 'Behandlungsraum mit Therapieliege' },
].map((photo) => ({ ...photo, ...responsiveImage(photo.key) }));

// Three of the gallery's photos stand in as a preview on the page itself.
const PREVIEW_INDEXES = [4, 5, 1];

const titleId = useId();
const heroImage = responsiveImage('places/exterior-wide');
const isGalleryOpen = ref(false);
const startIndex = ref(0);
const carousel = ref(null);

function openGallery(index = 0) {
  startIndex.value = index;
  isGalleryOpen.value = true;
}

// The dialog must be open and laid out before a slide can be scrolled into place.
watch(carousel, (instance) => {
  if (instance) requestAnimationFrame(() => instance.scrollToIndex(startIndex.value));
});
</script>

<template>
  <section class="location bento" aria-labelledby="location-title">
    <div v-reveal class="location__text card">
      <div class="location__heading">
        <h2 id="location-title" class="t-h2">Unser Standort</h2>
        <p class="t-lead">{{ PRACTICE.address }}</p>
      </div>
      <div class="location__actions">
        <BaseButton variant="secondary" arrow :href="PRACTICE.mapsUrl">Route planen</BaseButton>
        <BaseButton icon="images" @click="openGallery(0)">Impressionen</BaseButton>
      </div>
    </div>

    <div v-reveal="60" class="location__main">
      <img
        v-bind="heroImage"
        sizes="(max-width: 60rem) 96vw, 64vw"
        alt="Das Praxisgebäude an der Bergstrasse 3 unter blauem Himmel"
        width="1600"
        height="1200"
        loading="lazy"
        decoding="async"
      />
    </div>

    <button
      v-for="index in PREVIEW_INDEXES"
      :key="GALLERY[index].key"
      class="location__thumb zoom-trigger"
      type="button"
      :aria-label="`Impressionen öffnen: ${GALLERY[index].alt}`"
      @click="openGallery(index)"
    >
      <span class="zoom-media">
        <img
          :src="GALLERY[index].src"
          :srcset="GALLERY[index].srcset"
          sizes="32vw"
          alt=""
          width="1024"
          height="768"
          loading="lazy"
          decoding="async"
        />
      </span>
    </button>

    <BaseModal :open="isGalleryOpen" :labelledby="titleId" size="xl" @close="isGalleryOpen = false">
      <div class="gallery">
        <h2 :id="titleId" class="t-h3 gallery__title">Unser Standort</h2>
        <BaseCarousel ref="carousel" class="gallery__carousel" label="Fotos der Praxis" overlay-controls>
          <li v-for="photo in GALLERY" :key="photo.key" class="gallery__slide">
            <img :src="photo.src" :srcset="photo.srcset" sizes="(max-width: 80rem) 94vw, 76rem" :alt="photo.alt" />
          </li>
        </BaseCarousel>
      </div>
    </BaseModal>
  </section>
</template>

<style scoped>
.location__text {
  grid-column: span 12;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--space-5);
}

.location__heading {
  display: grid;
  gap: var(--space-2);
}

.location__actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

.location__main {
  grid-column: span 12;
  overflow: hidden;
  aspect-ratio: 3 / 2;
  border-radius: var(--radius-lg);
  background: var(--surface);
}

.location__main img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 50% 60%;
}

.location__thumb {
  grid-column: span 4;
  overflow: hidden;
  border-radius: var(--radius-lg);
  background: var(--surface);
  -webkit-tap-highlight-color: transparent;
}

.location__thumb .zoom-media {
  display: block;
  aspect-ratio: 1;
}

.location__thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

@media (min-width: 60rem) {
  .location__text {
    grid-column: span 4;
  }

  .location__main {
    grid-column: span 8;
    aspect-ratio: 21 / 10;
  }

  .location__thumb .zoom-media {
    aspect-ratio: 3 / 2;
  }
}

.gallery {
  display: grid;
  gap: var(--space-3);
  padding: var(--space-4);
}

.gallery__title {
  padding-inline-end: var(--space-8);
  min-height: 2.75rem;
  align-content: center;
}

.gallery__carousel {
  --gutter: 0px;
  --slide-width: 100%;
}

.gallery__slide {
  display: grid;
  place-items: center;
  height: min(72vh, 52rem);
  border-radius: var(--radius-md);
  background: var(--surface);
}

.gallery__slide img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
</style>
