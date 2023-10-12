<template>
      <BaseBox class="techniques-container"> 
        <span class=" tech_title title bold blue">Behandlungstechniken</span>
        <div class="white_fade"></div>
        <swiper
    :modules="modules"
    :slides-per-view="1"
    :space-between="50"
    navigation
    :pagination="{ clickable: true }"
    @swiper="onSwiper"
    @slideChange="onSlideChange"
  >
    <swiper-slide>
      <div class="img img1">
      <div class="tech_text center">
      <span class="white  title ">Myofasziale Triggerpunkt-Therapie</span>
      <br>
      <BaseButtonMag class="white">mehr</BaseButtonMag>
    </div>
    </div>
  </swiper-slide>
    <swiper-slide>
      <div class="img img2">
      <div class="tech_text center">
      <span class="white  title ">Manuelle Therapie</span>
      <br>
      <BaseButtonMag class="white">mehr</BaseButtonMag>
    </div>
    </div>
    </swiper-slide>
    <swiper-slide>
      <div class="img img3">
      <div class="tech_text center">
      <span class="white  title ">Postoperative Rehabilitation</span>
      <br>
      <BaseButtonMag class="white">mehr</BaseButtonMag>
    </div>
    </div>
    </swiper-slide>
    <swiper-slide>
      <div class="img img4">
      <div class="tech_text center">
      <span class="white  title ">Rehabilitation und Medizinische Trainingstherapie MTT</span>
      <br>
      <BaseButtonMag class="white">mehr</BaseButtonMag>
    </div>
    </div>
    </swiper-slide>
    <swiper-slide>
      <div class="img img5">
      <div class="tech_text center">
      <span class="white  title ">Manuelle Lymphdrainage inkl. Kompressionsbehandlung </span>
      <br>
      <BaseButtonMag class="white">mehr</BaseButtonMag>
    </div>
    </div>
    </swiper-slide>
    <swiper-slide>
      <div class="img img6">
      <div class="tech_text center">
      <span class="white  title ">Neurologische Rehabilitation nach Bobath (Schlaganfall, M. Parkinson, MS)</span>
      <br>
      <BaseButtonMag class="white">mehr</BaseButtonMag>
    </div>
    </div>
    </swiper-slide>
    <swiper-slide>
      <div class="img img7">
      <div class="tech_text center">
      <span class="white  title ">Elektrotherapie und Ultraschallbehandlungen inkl. Ionto-/Sonophorese</span>
      <br>
      <BaseButtonMag class="white">mehr</BaseButtonMag>
    </div>
    </div>
    </swiper-slide>
    <swiper-slide>
      <div class="img img8">
      <div class="tech_text center">
      <span class="white  title ">Atemtherapie</span>
      <br>
      <BaseButtonMag class="white">mehr</BaseButtonMag>
    </div>
    </div>
    </swiper-slide>
    <swiper-slide>
      <div class="img img9">
      <div class="tech_text center">
      <span class="white  title ">Geratrische Rehabilitation inkl. Sturzprophylaxe</span>
      <br>
      <BaseButtonMag class="white">mehr</BaseButtonMag>
    </div>
    </div>
    </swiper-slide>
    <swiper-slide>
      <div class="img img10">
      <div class="tech_text center">
      <span class="white  title ">Domizilbehandlungen / Hausbesuche</span>
      <br>
      <BaseButtonMag class="white">mehr</BaseButtonMag>
    </div>
    </div>
    </swiper-slide>
    <swiper-slide>
      <div class="img img11">
      <div class="tech_text center">
      <span class="white  title ">Mobilisation nach Mulligan</span>
      <br>
      <BaseButtonMag class="white">mehr</BaseButtonMag>
    </div>
    </div>
    </swiper-slide>
    <swiper-slide>
      <div class="img img12">
      <div class="tech_text center">
      <span class="white  title ">Kinesio - Taping  </span>
      <br>
      <BaseButtonMag class="white">mehr</BaseButtonMag>
    </div>
    </div>
    </swiper-slide>
  </swiper>
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
background: linear-gradient(179deg, #FFF 1%, rgba(255, 255, 255, 0.00) 99%);
width: 100%;
height: 50%;
position: absolute;
top: 0px;
left: 0x;
z-index: 2;
opacity: 0.9;
}
.tech_title{
  position: absolute;
  z-index: 3;
  left: 50%;
  top: 5%;
  transform: translate(-50%);
}
.tech_text{
  position: absolute;
  left: 50%;
  top:70%;
  transform: translate(-50%, -50%);
}
.img {
    background-size: cover;
    background-position: center;
    height: 100%;
    width: 100%;
    border-radius: 40px;
    position: relative;
}
.img1{
  background-image: url(../../assets/images/img_news_1.jpeg);
}
.img2{
  background-image: url(../../assets/images/img_news_1.jpeg);
}
.img3{
  background-image: url(../../assets/images/img_news_1.jpeg);
}
.img4{
  background-image: url(../../assets/images/img_news_1.jpeg);
}
.img5{
  background-image: url(../../assets/images/img_news_1.jpeg);
}
.img6{
  background-image: url(../../assets/images/img_news_1.jpeg);
}
.img7{
  background-image: url(../../assets/images/img_news_1.jpeg);
}
.img8{
  background-image: url(../../assets/images/img_news_1.jpeg);
}
.img9{
  background-image: url(../../assets/images/img_news_1.jpeg);
}
.img10{
  background-image: url(../../assets/images/img_news_1.jpeg);
}
.img11{
  background-image: url(../../assets/images/img_news_1.jpeg);
}
.img12{
  background-image: url(../../assets/images/img_news_1.jpeg);
}

.swiper{
    height: 100% ;
}
.techniques-container{
width: 50vw !important;
height: 700px !important;
padding: 0px;
position: relative;
border-radius: 40px;
}
</style>