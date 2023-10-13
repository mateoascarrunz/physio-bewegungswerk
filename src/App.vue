<script setup>
import { RouterLink, RouterView } from 'vue-router'
import TheBanner from './components/TheBanner.vue';
import TheNavBar from './components/TheNavBar.vue';
import TheFooter from './components/TheFooter.vue';
import LogoAnimationIntro from './components/LogoAnimationIntro.vue';
</script>

<template>
  <LogoAnimationIntro v-if="showComponent" :style="{ opacity: opacity,}"></LogoAnimationIntro>
  <TheBanner :bannerMessage="bannerMessage" />
  <TheNavBar />
  <div class="container-fluid">
    <main>


      <RouterView />

    </main>
    <TheFooter></TheFooter>
  </div>
</template>
<script>
import { register } from 'swiper/element/bundle';
register();
import axios from 'axios';
export default {
  provide() {
    return {
      blue: '#3F63A7',
      lightblue: '#D6E3FF',
      bannerMessage: this.bannerMessage,


    }
  },
  data() {
    return {

      bannerMessage: [],
      partnerImages: [],
      showComponent: true,
      opacity:1,


    };
  },
  mounted() {
    axios.get('https://strapi-physio-app.onrender.com/api/banners')
      .then(response => {
        console.log(response.data.data);
        this.bannerMessage = response.data.data;
      });

    axios.get('https://strapi-physio-app.onrender.com/api/partners?populate=*')
      .then(response => {
        console.log(response.data.data);
        this.partnerImages = response.data.data;
      })
      .catch(error => {
        console.error('Error fetching partner images:', error);
      });
       setTimeout(() => {
            this.opacity = 0;
                setTimeout(() => {
                    this.saveVisit();
                    this.showComponent = false;
                }, 1000);
        }, 6000);
        setTimeout(() => {
      document.body.classList.remove('popup-open');
    }, 6000);
    
  },
  beforeMount(){
        document.body.classList.add('popup-open');
        if (this.retrieveVisited()) {
      this.showComponent = false;
      document.body.classList.remove('popup-open');
      return;
    }
    },

   
  methods:{

retrieveVisited() {
  if (window.localStorage) {
    const lastVisitTimestamp = localStorage.getItem('lastVisitTimestamp');
    const now = new Date().getTime();
    const ONE_HOUR_IN_MS = 60 * 60 * 1000;

    if (lastVisitTimestamp && now - lastVisitTimestamp < ONE_HOUR_IN_MS) {
      console.log("is working")
      return true;
     
    } else {
      localStorage.setItem('lastVisitTimestamp', now.toString());
      console.log("is working else del medio")
      return false;
    }
  } else {
    console.log("is working else utlimo")
    return false;
  }
},
saveVisit() {
  if (window.localStorage) {
    localStorage.setItem('visited', 'true');
    localStorage.setItem('lastVisitTimestamp', new Date().getTime().toString());
  }
},
},


};
</script>
