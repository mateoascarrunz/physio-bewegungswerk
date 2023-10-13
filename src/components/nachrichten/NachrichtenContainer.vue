<template>
    <BasePageTransition></BasePageTransition>
    <div class="container_first_box">
     <div class="grid_container">
        <NachrichtenHero class="grid-col-2"></NachrichtenHero>
    </div>
        <NachrichtenCards  />

    </div>
</template>
<script>
import NachrichtenHero from './NachrichtenHero.vue';
import NachrichtenCards from './NachrichtenCards.vue';
export default{
    components:{
        NachrichtenHero,
        NachrichtenCards
    }
}

</script>