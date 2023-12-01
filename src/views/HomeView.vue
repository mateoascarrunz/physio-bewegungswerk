<template>
  <div class="padding">
<TheHero></TheHero>
</div>
<HomeContainer></HomeContainer>
  </template>
  
  <script>
import TheHero from '../components/home/TheHero.vue';
import HomeContainer from '../components/home/HomeContainer.vue';
  export default {

    metaInfo: {
    title: 'Physio Bewegungswerk in Gossau',
    meta: [
      { name: 'description', content: 'Bleib beweglich. Vom Traum zur Realität: Unsere eigene Praxis - Eine Reise von 10 Jahren Zusammenarbeit' },
    ]
    },

    components:{
TheHero,
HomeContainer
    },
  };
  </script>
  <style>
.padding{
  margin-left: 30px;
  margin-right: 30px;
}
@media (max-width: 99px){
  .padding{
  margin-left: 20px;
  margin-right: 20px;
}
}</style>
