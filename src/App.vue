<script setup>
import { ref, watch } from 'vue';
import { RouterView, useRoute, useRouter } from 'vue-router';
import TheBanner from './components/TheBanner.vue';
import TheNavBar from './components/TheNavBar.vue';
import TheFooter from './components/TheFooter.vue';
import LogoAnimationIntro from './components/LogoAnimationIntro.vue';
import { banners } from '@/services/cms';

const route = useRoute();
const router = useRouter();
const main = ref(null);
const isFirstRouteLoading = ref(true);
// The first page appears at once; only moves between pages fade.
const hasNavigated = ref(false);

router.isReady().finally(() => {
  isFirstRouteLoading.value = false;
});

router.afterEach((_to, from) => {
  if (from.matched.length) hasNavigated.value = true;
});

function focusMain() {
  main.value?.focus({ preventScroll: true });
}

// A new page moves focus to its content, so keyboard and screen reader users
// start there rather than back in the header.
watch(
  () => route.path,
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
  <main id="main" ref="main" tabindex="-1" :class="{ main_first_load: isFirstRouteLoading }">
    <RouterView v-slot="{ Component, route: viewRoute }">
      <Transition :name="hasNavigated ? 'page' : 'page-none'" mode="out-in">
        <component :is="Component" :key="viewRoute.path" />
      </Transition>
    </RouterView>
  </main>
  <TheFooter />
</template>
