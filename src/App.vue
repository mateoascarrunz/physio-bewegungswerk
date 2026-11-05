<script setup>
import { ref, watch } from 'vue';
import { RouterView, useRoute, useRouter } from 'vue-router';
import TheBanner from './components/TheBanner.vue';
import TheNavBar from './components/TheNavBar.vue';
import TheFooter from './components/TheFooter.vue';
import LogoAnimationIntro from './components/LogoAnimationIntro.vue';
import { isOverlayEntry } from '@/services/articleOverlay';
import { banners } from '@/services/cms';
import { canUseViewTransitions } from '@/services/viewTransition';

const route = useRoute();
const router = useRouter();
const main = ref(null);
// The first page appears at once; only moves between pages are animated, by the
// View Transitions API where available and by a short fade elsewhere.
const hasNavigated = ref(false);
const usesViewTransitions = canUseViewTransitions();

router.afterEach((_to, from) => {
  if (from.matched.length) hasNavigated.value = true;
});

// An article opened over the news grid keeps the grid's page alive underneath.
function viewKey(viewRoute) {
  return viewRoute.name === 'newsArticle' && isOverlayEntry() ? '/news' : viewRoute.path;
}

function focusMain() {
  main.value?.focus({ preventScroll: true });
}

// A new page moves focus to its content, so keyboard and screen reader users
// start there rather than back in the header. Opening or closing an article over
// the grid is not a new page: there the dialog manages focus.
watch(
  () => viewKey(route),
  (_to, from) => {
    if (from) focusMain();
  },
);
</script>

<template>
  <a class="skip-link" href="#main" @click.prevent="focusMain">Zum Inhalt springen</a>
  <LogoAnimationIntro />
  <TheBanner :banner-message="banners" />
  <TheNavBar />
  <main id="main" ref="main" tabindex="-1">
    <RouterView v-slot="{ Component, route: viewRoute }">
      <component :is="Component" v-if="usesViewTransitions" :key="viewKey(viewRoute)" />
      <Transition v-else :name="hasNavigated ? 'page' : 'page-none'" mode="out-in">
        <component :is="Component" :key="viewKey(viewRoute)" />
      </Transition>
    </RouterView>
  </main>
  <TheFooter />
</template>
