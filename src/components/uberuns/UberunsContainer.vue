<template>
    <BasePageTransition></BasePageTransition>
 <div class="grid_container">
<UberunsHero class="grid-col-2"></UberunsHero>
   
        <UberunsTeam class="grid-col-2 transition-3" v-motion-fade-visible-once/>
   
</div>
<UberunsStandort class="grid-col-2 transition-3" v-motion-fade-visible-once/>
<div class="grid_container">
    <UberunsCompany class="grid-col-2 transition-3" v-motion-fade-visible-once/>
    <UberunsExpertises class="grid-col-2 transition-3"  :color="lightblue" v-motion-fade-visible-once/>
    <UberunsStellen class="grid-col-2 transition-3" v-motion-fade-visible-once/>
    </div>
   
    
   


</template>
<script>
import UberunsHero from './UberunsHero.vue';
import UberunsTeam from './UberunsTeam.vue';
import UberunsStandort from './UberunsStandort.vue';
import UberunsCompany from './UberunsCompany.vue';
import UberunsExpertises from './UberunsExpertises.vue'
import UberunsStellen from './UberunsStellen.vue';

export default{
    components:{
    UberunsHero,
    UberunsTeam,
    UberunsStandort,
    UberunsCompany,
    UberunsExpertises,
    UberunsStellen

},
inject:['lightblue'],
}</script>