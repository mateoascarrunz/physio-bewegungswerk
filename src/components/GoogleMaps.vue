<script setup>
import { ref } from 'vue';
import BaseButton from './base/BaseButton.vue';
import BaseIcon from './base/BaseIcon.vue';
import { responsiveImage } from '@/content/media';
import { PRACTICE } from '@/content/practice';

const EMBED_URL =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1179.0080104470499!2d8.756155157914248!3d47.304151266319785!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x479abaf962e0e001%3A0xe403df275e61c4b8!2sBergstrasse%203!5e0!3m2!1ses-419!2sch!4v1696844098712!5m2!1ses-419!2sch';

const image = responsiveImage('places/entrance');

// Google only receives a request once someone chooses to load the map, which
// also keeps the page fast for everyone who just wants the phone number.
const isMapLoaded = ref(false);
</script>

<template>
  <section v-reveal:mask class="map drift" aria-labelledby="map-title">
    <h2 id="map-title" class="sr-only">So finden Sie uns</h2>
    <iframe
      v-if="isMapLoaded"
      class="map__frame"
      :src="EMBED_URL"
      title="Karte: Physio Bewegungswerk, Bergstrasse 3, 8625 Gossau"
      referrerpolicy="no-referrer-when-downgrade"
    ></iframe>
    <template v-else>
      <img
        class="map__photo"
        v-bind="image"
        sizes="96vw"
        alt="Eingang der Praxis an der Bergstrasse 3 in Gossau"
        width="1511"
        height="881"
        loading="lazy"
        decoding="async"
      />
      <div class="map__panel">
        <p class="map__address">
          <BaseIcon name="map-pin" :size="20" />
          <span><strong>{{ PRACTICE.street }}</strong>, {{ PRACTICE.city }}</span>
        </p>
        <div class="map__actions">
          <BaseButton size="sm" arrow :href="PRACTICE.mapsUrl">In Google Maps öffnen</BaseButton>
          <BaseButton variant="secondary" size="sm" @click="isMapLoaded = true">Karte hier laden</BaseButton>
        </div>
        <p class="map__note">Beim Laden der Karte werden Daten an Google übertragen.</p>
      </div>
    </template>
  </section>
</template>

<style scoped>
.map {
  position: relative;
  display: grid;
  overflow: hidden;
  margin-block-start: var(--section-gap);
  border-radius: var(--radius-xl);
  background: var(--surface);
}

.map__frame {
  display: block;
  width: 100%;
  height: clamp(22rem, 56vw, 36rem);
  border: 0;
}

.map__photo {
  width: 100%;
  height: clamp(13rem, 42vw, 34rem);
  object-fit: cover;
}

.map__panel {
  display: grid;
  gap: var(--space-3);
  padding: var(--card-pad);
}

.map__address {
  display: flex;
  gap: var(--space-2);
  color: var(--color-text-soft);
  font-size: var(--text-lead);
  line-height: 1.4;
}

.map__address svg {
  margin-block-start: 0.1875rem;
  color: var(--color-brand);
}

.map__address strong {
  color: var(--blue-950);
}

.map__actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

.map__note {
  color: var(--color-text-faint);
  font-size: 0.8125rem;
  line-height: 1.4;
}

@media (min-width: 60rem) {
  .map__panel {
    position: absolute;
    left: var(--space-5);
    bottom: var(--space-5);
    width: min(27rem, 100% - 2 * var(--space-5));
    border-radius: var(--radius-lg);
    background: var(--white);
    box-shadow: var(--shadow-md);
  }
}
</style>
