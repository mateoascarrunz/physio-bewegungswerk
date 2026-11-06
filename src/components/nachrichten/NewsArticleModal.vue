<script setup>
import { computed, defineAsyncComponent, nextTick, ref, useId, watch } from 'vue';
import { useRouter } from 'vue-router';
import BaseModal from '../base/BaseModal.vue';
import BaseViewerNav from '../base/BaseViewerNav.vue';
import { cmsSrcset } from '@/services/cms';
import { requestOverlay } from '@/services/articleOverlay';
import { articlePath, formatNewsDate, latestNews } from '@/services/news';
import { isSharedHolder, sharedStyle } from '@/services/viewTransition';

const BaseRichText = defineAsyncComponent(() => import('../base/BaseRichText.vue'));

/*
 * The news reading view over the grid: one shell size for every article, the cover
 * on top, a single reading column, and a bar at the bottom that steps to the
 * previous or next article. Only published articles from the content snapshot
 * are part of the sequence.
 */
const props = defineProps({
  /** The CMS article to show. Clearing it closes the dialog. */
  article: { type: Object, default: null },
});

defineEmits(['close']);

const router = useRouter();
const titleId = useId();
const shell = ref(null);
// Keeps the article on screen while the dialog plays its exit.
const shown = ref(null);
// Which way the last step went, so the next article arrives from that side.
const direction = ref(null);
const announcement = ref('');

const position = computed(() => latestNews.findIndex((entry) => entry.id === shown.value?.id));
const previous = computed(() => latestNews[(position.value - 1 + latestNews.length) % latestNews.length]);
const next = computed(() => latestNews[(position.value + 1) % latestNews.length]);

function toTop() {
  const scroller = shell.value?.closest('.modal__scroll');
  if (scroller) scroller.scrollTop = 0;
}

watch(
  () => props.article,
  async (article, before) => {
    if (!article) return;
    shown.value = article;
    if (!before) {
      direction.value = null;
      announcement.value = '';
      return;
    }
    announcement.value = `${article.title}, Artikel ${position.value + 1} von ${latestNews.length}`;
    // Every article starts at its beginning (also when Back or Forward brings it).
    await nextTick();
    toTop();
  },
  { immediate: true },
);

// The address follows the article, but replaces the entry, so Back still returns to the grid.
function step(offset) {
  if (latestNews.length < 2) return;
  direction.value = offset > 0 ? 'next' : 'previous';
  const target = offset > 0 ? next.value : previous.value;
  toTop();
  requestOverlay();
  router.replace({ path: articlePath(target), state: { overlay: true } });
}

function onKeydown(event) {
  if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey) return;
  if (event.target.closest('input, textarea, select')) return;
  if (event.key === 'ArrowRight') step(1);
  else if (event.key === 'ArrowLeft') step(-1);
  else return;
  event.preventDefault();
}
</script>

<template>
  <BaseModal
    class="news-viewer"
    :open="Boolean(article)"
    :labelledby="titleId"
    size="lg"
    immersive
    :surface-name="shown && isSharedHolder('news', shown.id, 'modal') ? 'shared-surface' : null"
    @close="$emit('close')"
  >
    <article v-if="shown" ref="shell" class="news-viewer__shell" :data-direction="direction" @keydown="onKeydown">
      <div class="news-viewer__media" :style="sharedStyle('news', shown.id, 'modal', 'shared-media')">
        <img
          :key="shown.id"
          class="news-viewer__cover"
          :src="shown.img.url"
          :srcset="cmsSrcset(shown.img.url)"
          sizes="(max-width: 52rem) 100vw, 52rem"
          :alt="shown.img.alternativeText || ''"
          :width="shown.img.width"
          :height="shown.img.height"
        />
      </div>

      <div :key="shown.id" class="news-viewer__content">
        <header class="news-viewer__header">
          <p class="news-viewer__meta">
            <time :datetime="shown.date">{{ formatNewsDate(shown.date) }}</time>
            <template v-if="shown.author">
              <span aria-hidden="true">·</span>
              <span>{{ shown.author }}</span>
            </template>
          </p>
          <h2 :id="titleId" class="news-viewer__title">{{ shown.title }}</h2>
          <p v-if="shown.subtitle" class="news-viewer__lead">{{ shown.subtitle }}</p>
        </header>
        <BaseRichText class="news-viewer__body prose" :markdown-text="shown.text" />
      </div>

      <BaseViewerNav
        v-if="latestNews.length > 1"
        label="Weitere News"
        noun="Artikel"
        :previous="previous.title"
        :next="next.title"
        :position="position + 1"
        :total="latestNews.length"
        @step="step"
      />
      <p class="sr-only" aria-live="polite">{{ announcement }}</p>
    </article>
  </BaseModal>
</template>

<style>
/*
 * One shell for every article: it never grows with the text, which scrolls inside
 * it (the dialog's own scroll area, the only one). Short articles keep the reading
 * bar at the bottom of the shell.
 */
.news-viewer {
  --modal-width: 52rem;
  /* 48rem, or 70% of a tall screen such as a tablet held upright, never taller than the screen. */
  --viewer-h: min(max(48rem, 70vh), calc(100vh - 3rem));
  --viewer-h: min(max(48rem, 70dvh), calc(100dvh - 3rem));
  height: var(--viewer-h);
}

.news-viewer .modal__scroll {
  display: block;
  scroll-padding-block: 2rem 5rem;
}

.news-viewer__shell {
  display: flex;
  flex-direction: column;
  min-height: 100%;
}

.news-viewer__media {
  flex: none;
  overflow: hidden;
  aspect-ratio: 2 / 1;
  background: var(--surface);
}

.news-viewer__cover {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* One reading column, about 65 characters wide, shared by the title and the text. */
.news-viewer__content {
  flex: 1;
  width: 100%;
  max-width: calc(40rem + 2 * var(--viewer-pad));
  margin-inline: auto;
  --viewer-pad: clamp(1.25rem, 4.5vw, 3rem);
  padding: clamp(1.5rem, 3.5vw, 2.5rem) var(--viewer-pad) clamp(2rem, 4.5vw, 3rem);
}

.news-viewer__header {
  display: grid;
  gap: var(--space-3);
  padding-block-end: clamp(1.25rem, 2.5vw, 1.75rem);
  margin-block-end: clamp(1.25rem, 2.5vw, 1.75rem);
  border-block-end: 1px solid var(--line);
}

.news-viewer__meta {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  color: var(--color-brand);
  font-size: var(--text-label);
  font-weight: var(--weight-semibold);
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.news-viewer__title {
  color: var(--blue-950);
  font-size: clamp(1.625rem, 1.35rem + 1.1vw, 2.25rem);
  font-weight: var(--weight-bold);
  line-height: 1.12;
  letter-spacing: -0.022em;
  text-wrap: balance;
}

.news-viewer__lead {
  color: var(--color-text-soft);
  font-size: clamp(1.0625rem, 1rem + 0.25vw, 1.1875rem);
  line-height: 1.5;
  text-wrap: pretty;
}

.news-viewer__body {
  min-height: 6rem;
  font-size: 1.0625rem;
  line-height: 1.7;
}

/* Phones: the shell fills the screen up to the safe area. */
@media (max-width: 39.99rem) {
  .news-viewer {
    --viewer-h: calc(100vh - 0.75rem);
    --viewer-h: calc(100dvh - max(0.75rem, env(safe-area-inset-top)));
  }

  .news-viewer.modal--sheet .modal__scroll {
    padding-block-end: 0;
  }

  .news-viewer__media {
    aspect-ratio: 16 / 10;
  }
}

/* Wider screens: a slightly wider crop, so the first lines of the text show beneath it. */
@media (min-width: 48rem) {
  .news-viewer__media {
    aspect-ratio: 21 / 9;
  }
}

@media (prefers-reduced-motion: no-preference) {
  .news-viewer__shell[data-direction] .news-viewer__content {
    animation: viewer-next 420ms var(--ease-out-expo) both;
  }

  .news-viewer__shell[data-direction='previous'] .news-viewer__content {
    animation-name: viewer-previous;
  }

  .news-viewer__shell[data-direction] .news-viewer__cover {
    animation: viewer-photo 520ms var(--ease-out-expo) both;
  }
}
</style>
