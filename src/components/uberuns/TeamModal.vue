<script setup>
import { computed, ref, useId, watch } from 'vue';
import BaseModal from '../base/BaseModal.vue';
import BaseIcon from '../base/BaseIcon.vue';
import BaseDisclosure from '../base/BaseDisclosure.vue';
import { sharedStyle } from '@/services/viewTransition';
import { cmsSrcset } from '@/services/cms';
import { describeMember } from '@/services/team';

const props = defineProps({
  /** The CMS entry to show. Clearing it closes the dialog. */
  member: { type: Object, default: null },
});

defineEmits(['close']);

const titleId = useId();
// The last person stays in place so their content is still there during the exit.
const shown = ref(null);

watch(
  () => props.member,
  (member) => {
    if (member) shown.value = describeMember(member);
  },
  { immediate: true },
);

const facts = computed(() =>
  [
    { icon: 'award', label: 'Ausbildung', value: shown.value?.diploma },
    { icon: 'globe', label: 'Sprachen', value: shown.value?.languages },
  ].filter((fact) => fact.value),
);
</script>

<template>
  <BaseModal :open="Boolean(member)" :labelledby="titleId" size="lg" @close="$emit('close')">
    <article v-if="shown" class="team-modal">
      <div class="team-modal__media" :style="sharedStyle('team', shown.id, 'modal', 'shared-media')">
        <img
          :src="shown.photo.url"
          :srcset="cmsSrcset(shown.photo.url)"
          sizes="(max-width: 48rem) 100vw, 26rem"
          :alt="shown.name"
          :width="shown.photo.width"
          :height="shown.photo.height"
        />
      </div>

      <div class="team-modal__body">
        <header class="team-modal__header">
          <p class="t-label">{{ shown.role }}</p>
          <h2 :id="titleId" class="t-h2">{{ shown.name }}</h2>
        </header>

        <blockquote v-if="shown.quote" class="team-modal__quote">„{{ shown.quote }}“</blockquote>

        <p class="t-body">{{ shown.description }}</p>

        <dl v-if="facts.length" class="team-modal__facts">
          <div v-for="fact in facts" :key="fact.label" class="team-modal__fact">
            <BaseIcon :name="fact.icon" :size="20" />
            <div>
              <dt>{{ fact.label }}</dt>
              <dd>{{ fact.value }}</dd>
            </div>
          </div>
        </dl>

        <div class="team-modal__details">
          <BaseDisclosure v-if="shown.education.length">
            <template #summary>Aus- und Weiterbildungen</template>
            <ul class="team-modal__list">
              <li v-for="(item, index) in shown.education" :key="item" :style="{ '--line': index }">{{ item }}</li>
            </ul>
          </BaseDisclosure>
          <BaseDisclosure v-if="shown.specialties.length">
            <template #summary>Therapeutische Spezialgebiete</template>
            <ul class="team-modal__list">
              <li v-for="(item, index) in shown.specialties" :key="item" :style="{ '--line': index }">{{ item }}</li>
            </ul>
          </BaseDisclosure>
        </div>

        <ul v-if="shown.contacts.length" class="team-modal__contacts">
          <li v-for="contact in shown.contacts" :key="contact.href">
            <a
              :href="contact.href"
              :target="contact.icon === 'linkedin' ? '_blank' : undefined"
              :rel="contact.icon === 'linkedin' ? 'noopener noreferrer' : undefined"
            >
              <BaseIcon :name="contact.icon" :size="18" />
              <span>{{ contact.label }}</span>
            </a>
          </li>
        </ul>
      </div>
    </article>
  </BaseModal>
</template>

<style>
.team-modal {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
}

.team-modal__media {
  aspect-ratio: 5 / 4;
  background: var(--surface);
}

.team-modal__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 50% 18%;
}

.team-modal__body {
  display: grid;
  align-content: start;
  gap: var(--space-5);
  padding: var(--space-5) var(--space-5) var(--space-6);
}

.team-modal__header {
  display: grid;
  gap: var(--space-2);
}

.team-modal__quote {
  padding-inline-start: var(--space-4);
  border-inline-start: 3px solid var(--color-accent);
  color: var(--blue-950);
  font-size: 1.0625rem;
  font-weight: var(--weight-medium);
  line-height: 1.45;
  letter-spacing: -0.008em;
  text-wrap: pretty;
}

.team-modal__facts {
  display: grid;
  gap: var(--space-3);
  padding: var(--space-4);
  border-radius: var(--radius-md);
  background: var(--surface);
}

.team-modal__fact {
  display: flex;
  gap: var(--space-3);
  color: var(--color-brand);
}

.team-modal__fact dt {
  color: var(--color-text-faint);
  font-size: var(--text-label);
  font-weight: var(--weight-semibold);
  letter-spacing: 0.02em;
}

.team-modal__fact dd {
  color: var(--blue-950);
  font-size: var(--text-small);
  font-weight: var(--weight-medium);
  line-height: 1.4;
}

.team-modal__details {
  display: grid;
}

.team-modal__list {
  display: grid;
  gap: var(--space-2);
  padding-block-end: var(--space-4);
  color: var(--color-text-soft);
  font-size: var(--text-small);
}

.team-modal__list li {
  position: relative;
  padding-inline-start: 1rem;
  text-wrap: pretty;
}

.team-modal__list li::before {
  content: '';
  position: absolute;
  inset-inline-start: 0;
  top: 0.6em;
  width: 0.3125rem;
  height: 0.3125rem;
  border-radius: 50%;
  background: var(--color-brand);
}

.team-modal__contacts {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

.team-modal__contacts a {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  min-height: 2.75rem;
  max-width: 100%;
  padding: 0.5rem 1rem;
  border-radius: 1.375rem;
  background: var(--blue-100);
  color: var(--blue-700);
  font-size: var(--text-small);
  font-weight: var(--weight-medium);
  text-decoration: none;
  overflow-wrap: anywhere;
  transition:
    background-color var(--duration-fast) var(--ease-out),
    color var(--duration-fast) var(--ease-out);
}

@media (hover: hover) and (pointer: fine) {
  .team-modal__contacts a:hover {
    background: var(--color-brand);
    color: var(--white);
  }
}

@media (min-width: 48rem) {
  .team-modal {
    grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
  }

  /* The photo fills its column and stays in view while a long biography scrolls. */
  .team-modal__media {
    aspect-ratio: auto;
  }

  .team-modal__media img {
    position: sticky;
    top: 0;
    max-height: calc(100vh - 3rem);
    max-height: calc(100dvh - 3rem);
  }

  .team-modal__body {
    padding: clamp(2rem, 4vw, 3.25rem) clamp(1.75rem, 3.6vw, 3rem);
    padding-block-start: clamp(2.5rem, 4.4vw, 3.5rem);
  }

  .team-modal__facts {
    grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
  }
}
</style>
