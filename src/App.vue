<script setup>
import { onMounted, provide, ref } from 'vue';
import { RouterView } from 'vue-router';
import TheBanner from './components/TheBanner.vue';
import TheNavBar from './components/TheNavBar.vue';
import TheFooter from './components/TheFooter.vue';
import LogoAnimationIntro from './components/LogoAnimationIntro.vue';
import { fetchBanners } from '@/services/cms';

provide('blue', '#3F63A7');
provide('lightblue', '#D6E3FF');

const bannerMessage = ref([]);

onMounted(async () => {
  bannerMessage.value = await fetchBanners();
});
</script>

<template>
  <LogoAnimationIntro />
  <TheBanner :bannerMessage="bannerMessage" />
  <TheNavBar />
  <div class="container-fluid">
    <main>


      <RouterView />

    </main>
    <TheFooter></TheFooter>
  </div>
</template>
