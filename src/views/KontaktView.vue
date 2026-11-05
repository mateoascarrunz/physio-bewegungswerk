<script setup>
import KontaktInfo from '@/components/kontakt/KontaktInfo.vue';
import KontaktForm from '@/components/kontakt/KontaktForm.vue';
import GoogleMaps from '@/components/GoogleMaps.vue';
</script>

<template>
  <div class="page shell">
    <div class="contact bento">
      <KontaktInfo class="contact__info" />
      <KontaktForm class="contact__form" />
      <GoogleMaps class="contact__map" />
    </div>
  </div>
</template>

<style scoped>
.contact__info,
.contact__form,
.contact__map {
  grid-column: span 12;
}

@media (min-width: 60rem) {
  .contact__info {
    grid-column: span 5;
  }

  .contact__form {
    grid-column: span 7;
  }
}
</style>
