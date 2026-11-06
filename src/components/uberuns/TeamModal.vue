<script setup>
import { computed, nextTick, ref, useId, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import BaseModal from '../base/BaseModal.vue';
import BaseIcon from '../base/BaseIcon.vue';
import BaseDisclosure from '../base/BaseDisclosure.vue';
import { sharedStyle } from '@/services/viewTransition';
import { cmsSrcset, teams } from '@/services/cms';
import { describeMember } from '@/services/team';

/*
 * The team profile viewer: one shell of the same size for every person, with the
 * portrait beside the text on wider screens. Only the text scrolls, the name stays
 * at the top while it does, and the controls at the bottom step through the team
 * without going back to the grid.
 */
const props = defineProps({
  /** The CMS entry to show. Clearing it closes the dialog. */
  member: { type: Object, default: null },
});

defineEmits(['close']);

const route = useRoute();
const router = useRouter();
const titleId = useId();
const article = ref(null);
// The last person stays in place so their content is still there during the exit.
const shown = ref(null);
// Which way the last step went, so the new profile arrives from that side.
const direction = ref(null);
const announcement = ref('');

const roster = teams.map((entry) => ({ id: entry.id, name: entry.name.trim() }));
const position = computed(() => roster.findIndex((entry) => entry.id === shown.value?.id));
const previous = computed(() => roster[(position.value - 1 + roster.length) % roster.length]);
const next = computed(() => roster[(position.value + 1) % roster.length]);
const count = (value) => String(value).padStart(2, '0');

watch(
  () => props.member,
  async (member, before) => {
    if (!member) return;
    shown.value = describeMember(member);
    if (!before) {
      direction.value = null;
      announcement.value = '';
      return;
    }
    announcement.value = `${shown.value.name}, ${shown.value.role}, ${position.value + 1} von ${roster.length}`;
    // A new person starts at the top, with every section closed (the content is keyed).
    await nextTick();
    const scroller = article.value?.closest('.modal__scroll');
    if (scroller) scroller.scrollTop = 0;
  },
  { immediate: true },
);

// Replacing the address keeps Back meaning "back to the grid".
function step(offset) {
  if (roster.length < 2) return;
  direction.value = offset > 0 ? 'next' : 'previous';
  const target = offset > 0 ? next.value : previous.value;
  router.replace({ query: { ...route.query, team: target.id } });
}

function onKeydown(event) {
  if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey) return;
  if (event.target.closest('input, textarea, select')) return;
  if (event.key === 'ArrowRight') step(1);
  else if (event.key === 'ArrowLeft') step(-1);
  else return;
  event.preventDefault();
}

const facts = computed(() =>
  [
    { icon: 'award', label: 'Ausbildung', value: shown.value?.diploma },
    { icon: 'globe', label: 'Sprachen', value: shown.value?.languages },
  ].filter((fact) => fact.value),
);
</script>

<template>
  <BaseModal class="team-viewer" :open="Boolean(member)" :labelledby="titleId" size="lg" @close="$emit('close')">
    <article v-if="shown" ref="article" class="team-viewer__shell" :data-direction="direction" @keydown="onKeydown">
      <div class="team-viewer__media" :style="sharedStyle('team', shown.id, 'modal', 'shared-media')">
        <img
          :key="shown.id"
          class="team-viewer__photo"
          :src="shown.photo.url"
          :srcset="cmsSrcset(shown.photo.url)"
          sizes="(max-width: 47.99rem) 100vw, 26rem"
          :alt="shown.name"
          :width="shown.photo.width"
          :height="shown.photo.height"
        />
      </div>

      <div class="team-viewer__main">
        <header :key="`head-${shown.id}`" class="team-viewer__header">
          <p class="t-label team-viewer__role">{{ shown.role }}</p>
          <h2 :id="titleId" class="team-viewer__name">{{ shown.name }}</h2>
        </header>

        <div :key="shown.id" class="team-viewer__content">
          <blockquote v-if="shown.quote" class="team-viewer__quote">„{{ shown.quote }}“</blockquote>

          <p class="team-viewer__bio">{{ shown.description }}</p>

          <div class="team-viewer__details">
            <dl v-if="facts.length" class="team-viewer__facts">
              <div v-for="fact in facts" :key="fact.label" class="team-viewer__fact">
                <BaseIcon :name="fact.icon" :size="20" />
                <div>
                  <dt>{{ fact.label }}</dt>
                  <dd>{{ fact.value }}</dd>
                </div>
              </div>
            </dl>

            <div v-if="shown.education.length || shown.specialties.length" class="team-viewer__sections">
              <BaseDisclosure v-if="shown.education.length">
                <template #summary>
                  <span class="team-viewer__summary">
                    Aus- und Weiterbildungen
                    <span class="team-viewer__badge" aria-hidden="true">{{ shown.education.length }}</span>
                  </span>
                </template>
                <ul class="team-viewer__list">
                  <li v-for="(item, index) in shown.education" :key="item" :style="{ '--line': index }">{{ item }}</li>
                </ul>
              </BaseDisclosure>
              <BaseDisclosure v-if="shown.specialties.length">
                <template #summary>
                  <span class="team-viewer__summary">
                    Therapeutische Spezialgebiete
                    <span class="team-viewer__badge" aria-hidden="true">{{ shown.specialties.length }}</span>
                  </span>
                </template>
                <ul class="team-viewer__list">
                  <li v-for="(item, index) in shown.specialties" :key="item" :style="{ '--line': index }">{{ item }}</li>
                </ul>
              </BaseDisclosure>
            </div>

            <ul v-if="shown.contacts.length" class="team-viewer__contacts">
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
        </div>

        <nav v-if="roster.length > 1" class="team-viewer__nav" aria-label="Weitere Teammitglieder">
          <button
            type="button"
            class="team-viewer__step"
            :aria-label="`Vorheriges Profil: ${previous.name}`"
            @click="step(-1)"
          >
            <BaseIcon name="arrow-left" :size="18" />
            <span class="team-viewer__step-name">{{ previous.name }}</span>
          </button>
          <p class="team-viewer__count" aria-hidden="true">
            <span>{{ count(position + 1) }}</span> / {{ count(roster.length) }}
          </p>
          <button
            type="button"
            class="team-viewer__step team-viewer__step--next"
            :aria-label="`Nächstes Profil: ${next.name}`"
            @click="step(1)"
          >
            <span class="team-viewer__step-name">{{ next.name }}</span>
            <BaseIcon name="arrow-right" :size="18" />
          </button>
        </nav>
        <p class="sr-only" aria-live="polite">{{ announcement }}</p>
      </div>
    </article>
  </BaseModal>
</template>

<style>
/*
 * One height for every profile: the shell never grows with its content, the text
 * scrolls inside it instead, and only once (the dialog's own scroll area).
 */
.team-viewer {
  --viewer-h: min(42rem, calc(100vh - 3rem));
  --viewer-h: min(42rem, calc(100dvh - 3rem));
  height: var(--viewer-h);
}

/* A deeper, calmer backdrop for this dialog, with a light blur where it is cheap enough. */
.team-viewer::backdrop {
  background: rgb(0 20 62 / 0.78);
}

@supports (backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px)) {
  .team-viewer::backdrop {
    background: rgb(0 28 84 / 0.62);
    -webkit-backdrop-filter: blur(8px);
    backdrop-filter: blur(8px);
  }
}

/* Block layout, so the shell grows with a long profile (and the portrait can stay
   in place beside it) while still filling the height of a short one. */
.team-viewer .modal__scroll {
  display: block;
  scroll-padding-block: 6rem 5rem;
}

.team-viewer__shell {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  min-height: 100%;
}

.team-viewer__media {
  overflow: hidden;
  aspect-ratio: 4 / 3;
  background: var(--surface);
}

.team-viewer__photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 50% 18%;
}

.team-viewer__main {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

/* The name stays at the top while the text scrolls; a hairline appears once it has. */
.team-viewer__header {
  position: sticky;
  z-index: 1;
  top: 0;
  display: grid;
  gap: var(--space-1);
  padding: var(--space-5) 4rem var(--space-4) var(--space-5);
  background: var(--white);
}

.team-viewer__name {
  color: var(--blue-950);
  font-size: clamp(1.625rem, 1.4rem + 0.9vw, 2.125rem);
  font-weight: var(--weight-bold);
  line-height: 1.12;
  letter-spacing: -0.02em;
  text-wrap: balance;
}

@supports (animation-timeline: scroll()) {
  .team-viewer__header::after {
    content: '';
    position: absolute;
    inset-inline: 0;
    bottom: 0;
    height: 1px;
    background: var(--line);
    animation: viewer-header-rule linear both;
    animation-timeline: scroll(nearest);
    animation-range: 0 3rem;
  }
}

@keyframes viewer-header-rule {
  from {
    opacity: 0;
  }
}

.team-viewer__content {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: var(--space-5);
  padding: var(--space-2) var(--space-5) var(--space-6);
}

.team-viewer__quote {
  padding-inline-start: var(--space-4);
  border-inline-start: 3px solid var(--color-accent);
  color: var(--blue-950);
  font-size: 1.0625rem;
  font-weight: var(--weight-medium);
  line-height: 1.45;
  letter-spacing: -0.008em;
  text-wrap: pretty;
}

.team-viewer__bio {
  max-width: 62ch;
  color: var(--color-text-soft);
  line-height: 1.65;
  text-wrap: pretty;
}

/* Structured details settle at the bottom of a short profile instead of leaving a gap there. */
.team-viewer__details {
  display: grid;
  gap: var(--space-5);
  margin-block-start: auto;
}

.team-viewer__facts {
  display: grid;
  gap: var(--space-3);
  padding: var(--space-4);
  border-radius: var(--radius-md);
  background: var(--surface);
}

.team-viewer__fact {
  display: flex;
  gap: var(--space-3);
  color: var(--color-brand);
}

.team-viewer__fact dt {
  color: var(--color-text-faint);
  font-size: var(--text-label);
  font-weight: var(--weight-semibold);
  letter-spacing: 0.02em;
}

.team-viewer__fact dd {
  color: var(--blue-950);
  font-size: var(--text-small);
  font-weight: var(--weight-medium);
  line-height: 1.4;
}

.team-viewer__sections .disclosure > summary {
  min-height: 3rem;
  padding-block: var(--space-2);
}

.team-viewer__summary {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
}

.team-viewer__badge {
  min-width: 1.5rem;
  padding: 0.0625rem 0.4375rem;
  border-radius: var(--radius-pill);
  background: var(--surface);
  color: var(--color-text-soft);
  font-size: var(--text-label);
  font-weight: var(--weight-semibold);
  font-variant-numeric: tabular-nums;
  text-align: center;
}

.team-viewer__list {
  display: grid;
  gap: var(--space-2);
  padding-block-end: var(--space-4);
  color: var(--color-text-soft);
  font-size: var(--text-small);
  line-height: 1.5;
}

.team-viewer__list li {
  position: relative;
  padding-inline-start: 1rem;
  text-wrap: pretty;
}

.team-viewer__list li::before {
  content: '';
  position: absolute;
  inset-inline-start: 0;
  top: 0.6em;
  width: 0.3125rem;
  height: 0.3125rem;
  border-radius: 50%;
  background: var(--color-brand);
}

.team-viewer__contacts {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

.team-viewer__contacts a {
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

/* Steps through the team; always in reach at the bottom of the shell. */
.team-viewer__nav {
  position: sticky;
  z-index: 1;
  bottom: 0;
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-3);
  padding-block-end: max(var(--space-2), env(safe-area-inset-bottom));
  border-block-start: 1px solid var(--line);
  background: var(--white);
}

.team-viewer__step {
  display: inline-flex;
  align-items: center;
  justify-self: start;
  gap: var(--space-2);
  min-width: 2.75rem;
  min-height: 2.75rem;
  max-width: 100%;
  padding: 0.5rem 0.75rem;
  border: 0;
  border-radius: var(--radius-pill);
  background: transparent;
  color: var(--blue-950);
  font: inherit;
  font-size: var(--text-small);
  font-weight: var(--weight-semibold);
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  transition:
    background-color var(--duration-fast) var(--ease-out),
    color var(--duration-fast) var(--ease-out);
}

.team-viewer__step--next {
  justify-self: end;
}

.team-viewer__step svg {
  flex: none;
  color: var(--color-brand);
  transition: transform var(--duration-base) var(--ease-out);
}

.team-viewer__step-name {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.team-viewer__step:active {
  background: var(--blue-100);
}

.team-viewer__count {
  color: var(--color-text-faint);
  font-size: var(--text-small);
  font-weight: var(--weight-medium);
  font-variant-numeric: tabular-nums;
  letter-spacing: 0.04em;
}

.team-viewer__count span {
  color: var(--blue-950);
  font-weight: var(--weight-bold);
}

@media (hover: hover) and (pointer: fine) {
  .team-viewer__contacts a:hover {
    background: var(--color-brand);
    color: var(--white);
  }

  .team-viewer__step:hover {
    background: var(--surface);
    color: var(--color-brand-hover);
  }

  .team-viewer__step:hover svg {
    transform: translateX(-2px);
  }

  .team-viewer__step--next:hover svg {
    transform: translateX(2px);
  }
}

/* Phones: the names would crowd the controls, so the arrows carry them (they keep their labels). */
@media (max-width: 29.99rem) {
  .team-viewer__step-name {
    display: none;
  }
}

/* Phones: the shell fills the screen up to the safe area, so no page shows around it. */
@media (max-width: 39.99rem) {
  .team-viewer {
    --viewer-h: calc(100vh - 0.75rem);
    --viewer-h: calc(100dvh - max(0.75rem, env(safe-area-inset-top)));
  }

  .team-viewer.modal--sheet .modal__scroll {
    padding-block-end: 0;
  }
}

/* Wider screens: portrait and text side by side, the portrait filling its column. */
@media (min-width: 48rem) {
  .team-viewer__shell {
    grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
  }

  .team-viewer__media {
    position: sticky;
    top: 0;
    height: var(--viewer-h);
    aspect-ratio: auto;
  }

  .team-viewer__header {
    padding: clamp(2rem, 3.6vw, 2.75rem) 4.25rem var(--space-4) clamp(1.75rem, 3.2vw, 2.75rem);
  }

  .team-viewer__content {
    padding-inline: clamp(1.75rem, 3.2vw, 2.75rem);
  }

  .team-viewer__nav {
    padding-inline: clamp(1rem, 2.2vw, 2rem);
  }

  .team-viewer__facts {
    grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
  }
}

/* Stepping to another person: the text slides in from the side of the step, the portrait settles. */
@media (prefers-reduced-motion: no-preference) {
  .team-viewer__shell[data-direction] .team-viewer__content,
  .team-viewer__shell[data-direction] .team-viewer__header {
    animation: viewer-next 420ms var(--ease-out-expo) both;
  }

  .team-viewer__shell[data-direction='previous'] .team-viewer__content,
  .team-viewer__shell[data-direction='previous'] .team-viewer__header {
    animation-name: viewer-previous;
  }

  .team-viewer__shell[data-direction] .team-viewer__photo {
    animation: viewer-photo 520ms var(--ease-out-expo) both;
  }
}

@keyframes viewer-next {
  from {
    opacity: 0;
    transform: translateX(1.25rem);
  }
}

@keyframes viewer-previous {
  from {
    opacity: 0;
    transform: translateX(-1.25rem);
  }
}

@keyframes viewer-photo {
  from {
    opacity: 0;
    transform: scale(1.04);
  }
}
</style>
