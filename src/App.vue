<script setup>
import { RouterLink, RouterView } from 'vue-router'
import TheBanner from './components/TheBanner.vue';
import TheNavBar from './components/TheNavBar.vue';
import TheFooter from './components/TheFooter.vue';
</script>

<template>
  <TheBanner :bannerMessage="bannerMessage" />
  <TheNavBar/>
  <main>
    <RouterView/>

  </main>
<TheFooter></TheFooter>
</template>
<script>
import axios from 'axios';
export default {
provide(){
  return{
  blue: '#004FF1',
  lightblue: '#D6E3FF',
  bannerMessage : this.bannerMessage,

  }
},
data() {
      return {

            bannerMessage: [],
        
  
      };
    },
mounted(){
axios.get('http://localhost:1337/api/banners')
.then(response => {
  console.log(response.data.data);
  this.bannerMessage = response.data.data;
});
}

};
</script>

