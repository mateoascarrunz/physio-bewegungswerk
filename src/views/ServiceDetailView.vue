<script setup>
import { computed, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import BaseButton from '@/components/base/BaseButton.vue';
import BaseCarousel from '@/components/base/BaseCarousel.vue';
import BaseIcon from '@/components/base/BaseIcon.vue';
import ServiceCard from '@/components/dienstleistungen-services/ServiceCard.vue';
import { responsiveImage } from '@/content/media';
import { BOOKING_URL } from '@/content/practice';
import { serviceDescriptions } from '@/content/serviceDescriptions';
import { findService, services, withSoftHyphens } from '@/content/services';
import { applyPageMeta } from '@/router/pageMeta';

const props = defineProps({
  serviceid: { type: String, required: true },
});

const route = useRoute();

const service = computed(() => findService(props.serviceid));
const position = computed(() => services.indexOf(service.value));
const paragraphs = computed(() => serviceDescriptions[props.serviceid] ?? []);
const image = computed(() => (service.value ? responsiveImage(service.value.image) : null));
const otherServices = computed(() => services.filter((entry) => entry !== service.value));
const previous = computed(() => services[(position.value - 1 + services.length) % services.length]);
const next = computed(() => services[(position.value + 1) % services.length]);

function stripTags(html) {
  return html.replace(/<[^>]+>/g, '');
}

// Unknown treatments never reach this view: the route sends them to the not found page.
watchEffect(() => {
  if (!service.value) return;
  applyPageMeta({
    path: route.path,
    meta: {
      title: `${service.value.title} - Physio Bewegungswerk`,
      description: stripTags(paragraphs.value[0] ?? ''),
    },
  });
});
</script>

<template>
  <div v-if="service" class="page shell">
    <BaseButton class="service__back" variant="text" size="sm" icon="arrow-left" to="/behandlungstechniken">
      Alle Behandlungstechniken
    </BaseButton>

    <div class="service bento">
      <article class="service__article">
        <header class="service__header">
          <p class="t-label">Behandlungstechnik {{ position + 1 }} von {{ services.length }}</p>
          <h1 class="t-h1">{{ withSoftHyphens(service.title) }}</h1>
        </header>
        <div class="service__media service__media--inline">
          <img
            v-bind="image"
            :style="{ objectPosition: service.focus }"
            sizes="96vw"
            alt=""
            width="1024"
            height="683"
            fetchpriority="high"
            decoding="async"
          />
        </div>
        <!-- Static treatment copy maintained in this repository, with inline emphasis. -->
        <div class="prose service__prose">
          <!-- eslint-disable-next-line vue/no-v-html -->
          <p v-for="(paragraph, index) in paragraphs" :key="index" v-html="paragraph"></p>
        </div>

        <nav class="service__pager" aria-label="Weitere Behandlungstechniken">
          <RouterLink
            class="service__pager-link"
            :to="{ name: 'behandlungstechnikenitem', params: { serviceid: previous.id } }"
          >
            <BaseIcon name="arrow-left" :size="20" />
            <span>
              <small>Vorherige</small>
              {{ previous.title }}
            </span>
          </RouterLink>
          <RouterLink
            class="service__pager-link service__pager-link--next"
            :to="{ name: 'behandlungstechnikenitem', params: { serviceid: next.id } }"
          >
            <span>
              <small>Nächste</small>
              {{ next.title }}
            </span>
            <BaseIcon name="arrow-right" :size="20" />
          </RouterLink>
        </nav>
      </article>

      <aside class="service__aside">
        <div class="service__media service__media--aside">
          <img
            v-bind="image"
            :style="{ objectPosition: service.focus }"
            sizes="38vw"
            alt=""
            width="1024"
            height="683"
            decoding="async"
          />
        </div>
        <div class="service__ask card card--blue">
          <h2 class="t-h3">Haben Sie Fragen?</h2>
          <p class="t-small">Wir beraten Sie gerne und finden gemeinsam den passenden Termin.</p>
          <BaseButton variant="accent" block arrow :href="BOOKING_URL">Termin vereinbaren</BaseButton>
          <div class="service__ask-links">
            <BaseButton variant="secondary" size="sm" block to="/kontakt">Kontakt</BaseButton>
            <BaseButton variant="secondary" size="sm" block to="/faq">FAQ</BaseButton>
          </div>
        </div>
      </aside>
    </div>

    <section class="section" aria-labelledby="service-others-title">
      <BaseCarousel label="Weitere Behandlungstechniken">
        <template #header>
          <h2 id="service-others-title" class="t-h2">Weitere Behandlungs&shy;techniken</h2>
        </template>
        <li v-for="entry in otherServices" :key="entry.id" class="service__slide">
          <ServiceCard :service="entry" sizes="(max-width: 40rem) 78vw, 26vw" />
        </li>
      </BaseCarousel>
    </section>
  </div>
</template>

<style scoped>
.service__back {
  margin-block-start: var(--space-2);
}

.service {
  margin-block-start: var(--space-4);
  row-gap: var(--space-6);
}

.service__article {
  grid-column: span 12;
  display: grid;
  gap: var(--space-5);
  min-width: 0;
}

.service__header {
  display: grid;
  gap: var(--space-3);
}

.service__media {
  overflow: hidden;
  border-radius: var(--radius-lg);
  background: var(--surface);
}

.service__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.service__media--inline {
  aspect-ratio: 3 / 2;
}

.service__media--aside {
  display: none;
}

.service__prose {
  font-size: 1.0625rem;
}

.service__prose :deep(p:first-child) {
  color: var(--color-text);
  font-size: var(--text-lead);
  line-height: 1.55;
}

.service__pager {
  display: grid;
  gap: var(--space-2);
  margin-block-start: var(--space-4);
}

.service__pager-link {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  min-height: 4.5rem;
  padding: var(--space-3) var(--space-4);
  border-radius: var(--radius-md);
  background: var(--surface);
  color: var(--blue-950);
  font-size: var(--text-small);
  font-weight: var(--weight-semibold);
  line-height: 1.35;
  text-decoration: none;
  transition: background-color var(--duration-fast) var(--ease-out);
}

.service__pager-link svg {
  color: var(--color-brand);
  transition: transform var(--duration-base) var(--ease-out);
}

.service__pager-link small {
  display: block;
  color: var(--color-text-faint);
  font-size: var(--text-label);
  font-weight: var(--weight-medium);
}

.service__pager-link--next {
  justify-content: space-between;
  text-align: end;
}

.service__pager-link:active {
  background: var(--blue-100);
}

@media (hover: hover) and (pointer: fine) {
  .service__pager-link:hover {
    background: var(--blue-100);
  }

  .service__pager-link:hover svg {
    transform: translateX(-3px);
  }

  .service__pager-link--next:hover svg {
    transform: translateX(3px);
  }
}

.service__aside {
  grid-column: span 12;
  display: grid;
  gap: var(--gap);
  align-content: start;
}

.service__ask {
  display: grid;
  gap: var(--space-3);
}

.service__ask .t-small {
  color: var(--blue-950);
}

.service__ask-links {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--space-2);
}

.service__slide {
  aspect-ratio: 4 / 5;
}

@media (min-width: 40rem) {
  .service__pager {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .service__media--inline {
    aspect-ratio: 21 / 10;
  }
}

/* Desktop: reading column on the left, photo and booking stay in view on the right. */
@media (min-width: 60rem) {
  .service__article {
    grid-column: span 7;
    padding-inline-end: clamp(0rem, 2vw, 2.5rem);
  }

  .service__media--inline {
    display: none;
  }

  .service__aside {
    position: sticky;
    top: calc(var(--header-h) + var(--header-offset) + var(--space-3));
    grid-column: span 5;
    align-self: start;
  }

  .service__media--aside {
    display: block;
    aspect-ratio: 3 / 2;
  }

  .service__ask {
    padding: clamp(1.25rem, 2vw, 1.75rem);
  }
}

/* Short laptop screens: the sticky column must still fit without being cut off. */
@media (min-width: 60rem) and (max-height: 50rem) {
  .service__media--aside {
    aspect-ratio: 2 / 1;
  }
}
</style>
