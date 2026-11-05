<template>
      <BaseBox class="relative techniques_box"> 
        <div class="techniques-container">
        <span class=" tech_title title bold blue text_break center">Behandlungs&shy;techniken</span>
       
        <swiper-container
        class="swiper"
    :slides-per-view="1"
    :spaceBetween="40"
    speed="300" autoplay="true"
                    navigation="true"
                    loop="true" 
  >
    <swiper-slide>
      <div class="img img1">
        <div class="white_fade"></div>
 
    </div>
    <div class="tech_text center">
      <span class="white  title2 ">Myofasziale Triggerpunkt-Therapie</span>
      <br>
      <br>
      <router-link :to="{ name: 'behandlungstechnikenitem', params: { serviceid: '1' } }"><BaseButtonMag class="white mobil-nowhite">mehr</BaseButtonMag></router-link>
    </div>
  </swiper-slide>
    <swiper-slide>
      <div class="img img2">
        <div class="white_fade"></div>
      
    </div>
    <div class="tech_text center">
      <span class="white title2">Manuelle Therapie</span>
      <br>
      <router-link :to="{ name: 'behandlungstechnikenitem', params: { serviceid: '2' } }"><BaseButtonMag class="white mobil-nowhite">mehr</BaseButtonMag></router-link>
    </div>
    </swiper-slide>
    <swiper-slide>
  <div class="img img3">
        <div class="white_fade"></div>
     
    </div>
    <div class="tech_text center">
      <span class="white title2">Postoperative Rehabilitation</span>
      <br>
            <router-link :to="{ name: 'behandlungstechnikenitem', params: { serviceid: '3' } }"><BaseButtonMag class="white mobil-nowhite">mehr</BaseButtonMag></router-link>
    </div>
    </swiper-slide>
    <swiper-slide>
      <div class="img img4">
        <div class="white_fade"></div>
      
    </div>
    <div class="tech_text center">
      <span class="white  title2 ">Rehabilitation und Medizinische Trainingstherapie MTT</span>
      <br>
            <router-link :to="{ name: 'behandlungstechnikenitem', params: { serviceid: '4' } }"><BaseButtonMag class="white mobil-nowhite">mehr</BaseButtonMag></router-link>
    </div>
    </swiper-slide>
    <swiper-slide>
      <div class="img img5">
        <div class="white_fade"></div>
      
    </div>
    <div class="tech_text center">
      <span class="white  title2 ">Manuelle Lymphdrainage inkl. Kompressionsbehandlung </span>
      <br>
            <router-link :to="{ name: 'behandlungstechnikenitem', params: { serviceid: '5' } }"><BaseButtonMag class="white mobil-nowhite">mehr</BaseButtonMag></router-link>
    </div>
    </swiper-slide>
    <swiper-slide>
      <div class="img img6">
        <div class="white_fade"></div>
      
    </div>
    <div class="tech_text center">
      <span class="white  title2 ">Neurologische Rehabilitation nach Bobath (Schlaganfall, M. Parkinson, MS)</span>
      <br>
            <router-link :to="{ name: 'behandlungstechnikenitem', params: { serviceid: '6' } }"><BaseButtonMag class="white mobil-nowhite">mehr</BaseButtonMag></router-link>
    </div>
    </swiper-slide>
    <swiper-slide>
      <div class="img img7">
        <div class="white_fade"></div>
      
    </div>
    <div class="tech_text center">
      <span class="white  title2 ">Elektrotherapie und Ultraschallbehandlungen inkl. Ionto-/Sonophorese</span>
      <br>
            <router-link :to="{ name: 'behandlungstechnikenitem', params: { serviceid: '8' } }"><BaseButtonMag class="white mobil-nowhite">mehr</BaseButtonMag></router-link>
    </div>
    </swiper-slide>
    <swiper-slide>
      <div class="img img8">
        <div class="white_fade"></div>
      
    </div>
    <div class="tech_text center">
      <span class="white  title2 ">Atemtherapie</span>
      <br>
            <router-link :to="{ name: 'behandlungstechnikenitem', params: { serviceid: '9' } }"><BaseButtonMag class="white mobil-nowhite">mehr</BaseButtonMag></router-link>
    </div>
    </swiper-slide>
    <swiper-slide>
      <div class="img img9">
        <div class="white_fade"></div>
      
    </div>
    <div class="tech_text center">
      <span class="white  title2 ">Geriatrische Rehabilitation und Sturzprofilaxe</span>
      <br>
      <router-link :to="{ name: 'behandlungstechnikenitem', params: { serviceid: '10' } }">
  <BaseButtonMag class="white mobil-nowhite">mehr</BaseButtonMag>
</router-link>

    </div>
    </swiper-slide>
    <swiper-slide>
      <div class="img img10">
        <div class="white_fade"></div>
      
    </div>
    <div class="tech_text center">
      <span class="white  title2 ">Domizilbehandlungen / Hausbesuche</span>
      <br>
            <router-link :to="{ name: 'behandlungstechnikenitem', params: { serviceid: '11' } }"><BaseButtonMag class="white mobil-nowhite">mehr</BaseButtonMag></router-link>
    </div>
    </swiper-slide>
    <swiper-slide>
      <div class="img img11">
        <div class="white_fade"></div>
      
    </div>
    <div class="tech_text center">
      <span class="white  title2 ">Mobilisation nach Mulligan</span>
      <br>
            <router-link :to="{ name: 'behandlungstechnikenitem', params: { serviceid: '12' } }"><BaseButtonMag class="white mobil-nowhite">mehr</BaseButtonMag></router-link>
    </div>
    </swiper-slide>
    <swiper-slide>
      <div class="img img12">
        <div class="white_fade"></div>
      
    </div>
    <div class="tech_text center">
      <span class="white  title2 ">Kinesio - Taping  </span>
      <br>
            <router-link :to="{ name: 'behandlungstechnikenitem', params: { serviceid: '13' } }"><BaseButtonMag class="white mobil-nowhite">mehr</BaseButtonMag></router-link>
    </div>
    </swiper-slide>
  </swiper-container>
  
  </div>
</BaseBox>
</template>
<script>
import { registerSwiperElement } from '@/services/swiperElement';

export default {
  created() {
    registerSwiperElement();
  },
};
</script>
<style scoped>

.white_fade{
  border-radius: 38px 38px 0px 0px;
  background: linear-gradient(0deg, #00000078 1%, rgba(255, 255, 255, 0) 99%);
  border-radius: 50px;
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
    border-radius: 50px;
    position: relative;
    opacity: 0.5;
    background-color: transparent;
}
.img1{
  background-image: url(../../assets/images/img_services_myofasziale.jpg);
}
.img2{
  background-image: url(../../assets/images/img_services_manuelle.webp);
}
.img3{
  background-image: url(../../assets/images/img_services_postoperative.webp);
}
.img4{
  background-image: url(../../assets/images/img_services_mtt.webp);
}
.img5{
  background-image: url(../../assets/images/img_services_lymphdrainage.jpg);
}
.img6{
  background-image: url(../../assets/images/img_services_neurologische.webp);
}
.img7{
  background-image: url(../../assets/images/img_services_elektrotherapie.webp);
}
.img8{
  background-image: url(../../assets/images/img_services_atemtherapie.webp);
}
.img9{
  background-image: url(../../assets/images/img_services_geratrische.webp);
}
.img10{
  background-image: url(../../assets/images/img_services_domizilbehandlungen.webp);
}
.img11{
  background-image: url(../../assets/images/img_services_mobilisation.webp);
}
.img12{
  background-image: url(../../assets/images/img_services_kinesio.jpg);
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