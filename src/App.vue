<script setup>
import { ref, watch } from 'vue';
import { RouterView, useRoute, useRouter } from 'vue-router';
import TheBanner from './components/TheBanner.vue';
import TheNavBar from './components/TheNavBar.vue';
import TheFooter from './components/TheFooter.vue';
import LogoAnimationIntro from './components/LogoAnimationIntro.vue';
import { banners } from '@/services/cms';

const route = useRoute();
const main = ref(null);
const isFirstRouteLoading = ref(true);

useRouter().isReady().finally(() => {
  isFirstRouteLoading.value = false;
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
      <Transition name="page" mode="out-in">
        <component :is="Component" :key="viewRoute.path" />
      </Transition>
    </RouterView>
  </main>
  <TheFooter />
</template>
