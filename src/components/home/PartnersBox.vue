<template>

  <BaseBox class="partner center" v-if="partnerImages.length > 0" >

<span class="title blue partners_title">Partners</span>
<br>

        <swiper-container
    class="swiper"
    :slides-per-view="computedSlidesPerView"
    navigation="true"
    autoplay-delay="3000"
    autoplay-disable-on-interaction="false"
  >
  <swiper-slide v-for="partner in partnerImages" :key="partner.id" class="img_container">
    <img class="img_partner" :class="{ 'horizontal_img': partner.attributes.isHorizontal }" :src="partner.attributes.Partner_logo.data[0].attributes.url"
        :alt="partner.attributes.Partner_logo.data[0].attributes.name" />
  </swiper-slide>

</swiper-container>

  </BaseBox>

</template>

<script>
import { fetchPartners } from '@/services/cms';
import { registerSwiperElement } from '@/services/swiperElement';

export default {
  data() {
    return {
      partnerImages: [],
      // Add a data property to store the current window width
      windowWidth: window.innerWidth,
    };
  },
  created() {
    registerSwiperElement();
    window.addEventListener('resize', this.handleWindowResize);
    this.handleWindowResize();
  },
  mounted() {
    fetchPartners().then((partners) => {
      this.partnerImages = partners;
    });
  },
  computed: {
    computedSlidesPerView() {
      // Use this.windowWidth to calculate slides per view
      const totalPartner = this.partnerImages.length;
      if (totalPartner === 1) {
        return 1;
      } else if (totalPartner === 2) {
        return 2;
      } else {
        // Determine the number of slides per view based on the viewport width
        if (this.windowWidth < 890) {
          return 1; 

        } else {
          return 3; // Default value
        }
      }
    },
  },
  beforeDestroy() {
    // Remove the event listener when the component is destroyed
    window.removeEventListener('resize', this.handleWindowResize);
  },
  methods: {
    // Define a method to handle window resize
    handleWindowResize() {
      this.windowWidth = window.innerWidth;
    },
  },
};
</script>


<style scoped>
.partner {
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;

}
.img_partner{
height: 65%;
width: auto;
}
.horizontal_img{
  height: auto !important;
  width: 65% !important;
  max-width: 300px;

}
.img_container{
display: flex;
justify-content: center;
    align-items: center;
}
  .swiper{
    width: 100%;
    height: 100%;
  }
.swiper-pagination-bullets.swiper-pagination-horizontal{
bottom: -30px !important;
}
</style>