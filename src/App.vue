<script setup>
import { provide, ref } from 'vue';
import { RouterView, useRouter } from 'vue-router';
import TheBanner from './components/TheBanner.vue';
import TheNavBar from './components/TheNavBar.vue';
import TheFooter from './components/TheFooter.vue';
import LogoAnimationIntro from './components/LogoAnimationIntro.vue';
import { banners } from '@/services/cms';

provide('blue', '#3F63A7');
provide('lightblue', '#D6E3FF');

const isFirstRouteLoading = ref(true);
useRouter().isReady().finally(() => {
  isFirstRouteLoading.value = false;
});

</script>

<template>
  <LogoAnimationIntro />
  <TheBanner :bannerMessage="banners" />
  <TheNavBar />
  <div class="container-fluid">
    <main :class="{ main_first_load: isFirstRouteLoading }">


      <RouterView />

    </main>
    <TheFooter></TheFooter>
  </div>
</template>
