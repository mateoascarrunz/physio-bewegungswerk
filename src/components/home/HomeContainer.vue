<template>
  <BasePageTransition></BasePageTransition>
  <div class="container-hero">
    <div class="grid_container">
      <PartnersBox class="grid-col-2 transition-3" :color="lightblue"   :delay="100">
      </PartnersBox>
      <TechniquesBox class="grid_mobile transition-3"  v-motion-fade-visible-once>

      </TechniquesBox>
      <UberunsBox class="grid_mobile transition-3"  v-motion-fade-visible-once/>
    </div>
    <NachrichtenBox />
    <div class="grid_container">
      <ActionBox class="grid_mobile transition-3"  v-motion-fade-visible-once :delay="100"/>
    </div>

  </div>
</template>
<script>
import TechniquesBox from './TechniquesBox.vue';
import ActionBox from './ActionBox.vue';
import NachrichtenBox from './NachrichtenBox.vue'
import PartnersBox from './PartnersBox.vue';
import UberunsBox from './UberunsBox.vue';

export default {
  components: {
    ActionBox,
    NachrichtenBox,
    TechniquesBox,
    PartnersBox,
    UberunsBox
  },
  inject: ['blue', 'lightblue'],
}
</script>
<style >
.img_cover {
  object-fit: cover;
}
</style>