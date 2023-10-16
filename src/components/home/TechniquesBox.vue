<template>
      <BaseBox class="relative techniques_box"> 
        <div class="techniques-container">
        <span class=" tech_title title bold blue text_break center">Behandlungs&shy;techniken</span>
       
        <swiper
        class="swiper"
    :modules="modules"
    :slides-per-view="1"
    navigation
    :pagination="{ clickable: true }"
    @swiper="onSwiper"
    @slideChange="onSlideChange"
  >
    <swiper-slide>
      <div class="img img1">
        <div class="white_fade"></div>
 
    </div>
    <div class="tech_text center">
      <span class="white  title2 ">Myofasziale Triggerpunkt-Therapie</span>
      <br>
      <br>
      <BaseButtonMag class="white mobil-nowhite">mehr</BaseButtonMag>
    </div>
  </swiper-slide>
    <swiper-slide>
      <div class="img img2">
        <div class="white_fade"></div>
      
    </div>
    <div class="tech_text center">
      <span class="white title2">Manuelle Therapie</span>
      <br>
      <BaseButtonMag class="white mobil-nowhite">mehr</BaseButtonMag>
    </div>
    </swiper-slide>
    <swiper-slide>
  <div class="img img3">
        <div class="white_fade"></div>
     
    </div>
    <div class="tech_text center">
      <span class="white title2">Postoperative Rehabilitation</span>
      <br>
      <BaseButtonMag class="white mobil-nowhite">mehr</BaseButtonMag>
    </div>
    </swiper-slide>
    <swiper-slide>
      <div class="img img4">
        <div class="white_fade"></div>
      
    </div>
    <div class="tech_text center">
      <span class="white  title2 ">Rehabilitation und Medizinische Trainingstherapie MTT</span>
      <br>
      <BaseButtonMag class="white mobil-nowhite">mehr</BaseButtonMag>
    </div>
    </swiper-slide>
    <swiper-slide>
      <div class="img img5">
        <div class="white_fade"></div>
      
    </div>
    <div class="tech_text center">
      <span class="white  title2 ">Manuelle Lymphdrainage inkl. Kompressionsbehandlung </span>
      <br>
      <BaseButtonMag class="white mobil-nowhite">mehr</BaseButtonMag>
    </div>
    </swiper-slide>
    <swiper-slide>
      <div class="img img6">
        <div class="white_fade"></div>
      
    </div>
    <div class="tech_text center">
      <span class="white  title2 ">Neurologische Rehabilitation nach Bobath (Schlaganfall, M. Parkinson, MS)</span>
      <br>
      <BaseButtonMag class="white mobil-nowhite">mehr</BaseButtonMag>
    </div>
    </swiper-slide>
    <swiper-slide>
      <div class="img img7">
        <div class="white_fade"></div>
      
    </div>
    <div class="tech_text center">
      <span class="white  title2 ">Elektrotherapie und Ultraschallbehandlungen inkl. Ionto-/Sonophorese</span>
      <br>
      <BaseButtonMag class="white mobil-nowhite">mehr</BaseButtonMag>
    </div>
    </swiper-slide>
    <swiper-slide>
      <div class="img img8">
        <div class="white_fade"></div>
      
    </div>
    <div class="tech_text center">
      <span class="white  title2 ">Atemtherapie</span>
      <br>
      <BaseButtonMag class="white mobil-nowhite">mehr</BaseButtonMag>
    </div>
    </swiper-slide>
    <swiper-slide>
      <div class="img img9">
        <div class="white_fade"></div>
      
    </div>
    <div class="tech_text center">
      <span class="white  title2 ">Geratrische Rehabilitation inkl. Sturzprophylaxe</span>
      <br>
      <BaseButtonMag class="white mobil-nowhite">mehr</BaseButtonMag>
    </div>
    </swiper-slide>
    <swiper-slide>
      <div class="img img10">
        <div class="white_fade"></div>
      
    </div>
    <div class="tech_text center">
      <span class="white  title2 ">Domizilbehandlungen / Hausbesuche</span>
      <br>
      <BaseButtonMag class="white mobil-nowhite">mehr</BaseButtonMag>
    </div>
    </swiper-slide>
    <swiper-slide>
      <div class="img img11">
        <div class="white_fade"></div>
      
    </div>
    <div class="tech_text center">
      <span class="white  title2 ">Mobilisation nach Mulligan</span>
      <br>
      <BaseButtonMag class="white mobil-nowhite">mehr</BaseButtonMag>
    </div>
    </swiper-slide>
    <swiper-slide>
      <div class="img img12">
        <div class="white_fade"></div>
      
    </div>
    <div class="tech_text center">
      <span class="white  title2 ">Kinesio - Taping  </span>
      <br>
      <BaseButtonMag class="white mobil-nowhite">mehr</BaseButtonMag>
    </div>
    </swiper-slide>
  </swiper>
  </div>
</BaseBox>
</template>
<script>
  // import Swiper core and required modules
  import { Navigation, Pagination, A11y } from 'swiper/modules';

  // Import Swiper Vue.js components
  import { Swiper, SwiperSlide } from 'swiper/vue';

  // Import Swiper styles
  import 'swiper/css';
  import 'swiper/css/navigation';
  import 'swiper/css/pagination';

  // Import Swiper styles
  export default {
    components: {
      Swiper,
      SwiperSlide,
    },
    setup() {
      const onSwiper = (swiper) => {
        console.log(swiper);
      };
      const onSlideChange = () => {
        console.log('slide change');
      };
      return {
        onSwiper,
        onSlideChange,
        modules: [Navigation, Pagination, A11y],
      };
    },

  };
</script>
<style scoped>

.white_fade{
  border-radius: 38px 38px 0px 0px;
  background: linear-gradient(0deg, #00000078 1%, rgba(255, 255, 255, 0) 99%);
width: 100%;
height: 100%;
position: absolute;
top: 0px;
left: 0x;
z-index: -1;
opacity: 1;
position: relative;
}
.tech_title{
  position: absolute;
  z-index: 3;
  left: 50%;
  top: 5%;
  transform: translate(-50%);
  width: 100%;
    padding-left: 5%;
    padding-right: 5%;
}
.tech_text{
  position: absolute;
  left: 50%;
  top:70%;
  transform: translate(-50%, -50%);
  z-index: 2;

}
.img {
    background-size: cover;
    background-position: center;
    height: 100%;
    width: 100%;
    border-radius: 40px;
    position: relative;
    opacity: 0.5;
    background-color: transparent;
}
.img1{
  background-image: url(../../assets/images/img_services_1.jpeg);
}
.img2{
  background-image: url(../../assets/images/img_services_2.jpeg);
}
.img3{
  background-image: url(../../assets/images/img_services_3.jpeg);
}
.img4{
  background-image: url(../../assets/images/img_services_4.jpeg);
}
.img5{
  background-image: url(../../assets/images/img_services_5.jpeg);
}
.img6{
  background-image: url(../../assets/images/img_services_6.jpeg);
}
.img7{
  background-image: url(../../assets/images/img_services_7.jpeg);
}
.img8{
  background-image: url(../../assets/images/img_services_8.jpeg);
}
.img9{
  background-image: url(../../assets/images/img_services_9.jpeg);
}
.img10{
  background-image: url(../../assets/images/img_services_10.jpeg);
}
.img11{
  background-image: url(../../assets/images/img_services_11.jpeg);
}
.img12{
  background-image: url(../../assets/images/img_services_12.jpeg);
}

.swiper{
    height: 100% ;
}
.techniques-container{
width: 100% !important;
height: 100%;
padding: 0px;
top: 0px;
left: 0px;
position: absolute;
border-radius: 40px;
overflow: hidden;
}
@media (max-width:990px){
  .techniques_box{
    aspect-ratio: 1/1.3;
    max-height: 600px;
  }
}
</style>