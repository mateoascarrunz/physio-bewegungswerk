<template>
<BasePageTransition></BasePageTransition>
    <div class="container-hero"> 
    <div class="grid_container">

        <Transition name="slide-fade" v-intersect="onIntersect">
        <PartnersBox class="grid-col-2" :color="lightblue">


        </PartnersBox>
    </Transition>
      <TechniquesBox class="grid_mobile">
        
      </TechniquesBox >
      <UberunsBox class="grid_mobile"/>
    </div>
      <NachrichtenBox/>
      <div class="grid_container">
       <ActionBox class="grid_mobile"/>
    </div>

</div>

</template>
<script>
import TechniquesBox from './TechniquesBox.vue';
import ActionBox from './ActionBox.vue';
import NachrichtenBox from './NachrichtenBox.vue'
import PartnersBox from './PartnersBox.vue';
import UberunsBox from './UberunsBox.vue';

export default{
    components:{
        ActionBox,
        NachrichtenBox,
        TechniquesBox,
        PartnersBox,
        UberunsBox
    },
    data(){
        return{
            inViewport: false,
        }
    },
    methods: {
    onIntersect(entries) {
      this.inViewport = entries[0].isIntersecting;
    },
  },
    inject:['blue', 'lightblue'],
}</script>
<style >


.img_cover{
    object-fit: cover;
}
</style>