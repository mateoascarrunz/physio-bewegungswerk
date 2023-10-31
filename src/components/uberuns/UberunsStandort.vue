
<template>
        <div class="grid_container padding_null">
    <BaseBox class="container_flex center grid-col-2 transition-3" v-motion-fade-visible-once>
        <span class="title bold blue z-1">Unsere Standort</span>
        <br>
        <span class="paragraph z-1">Bergstrasse 3, 8625 Gossau</span>
        <br>

        <a href="https://maps.app.goo.gl/cF5gTcjpVvmXUC6T7" target="_blank" rel="noopener noreferrer"><BaseButtonBlue z-1>Siehe Standort</BaseButtonBlue></a>
        <br>
        <BaseButtonBlue @click="PopupPhoto = !PopupPhoto">Impressionen</BaseButtonBlue>
    </BaseBox>
</div>
<BasePopUp v-if="PopupPhoto"  class="center">
    <BaseCloseButton @click="PopupPhoto = !PopupPhoto">
        </BaseCloseButton>
        <span class="title blue title_popup">Unser Standort</span>
        <div class="flex ">
          
        <swiper-container slides-per-view="1" speed="500" loop="true" css-mode="true" class="swiper_container" navigation="true" pagination="true" space-between="50px">
                    <swiper-slide class="swiper_slide" >
<img class="office_photo" src="../../assets/images/img_standort_2.jpg" alt="">
                    </swiper-slide>

                    <swiper-slide class="swiper_slide">
<img class="office_photo" src="../../assets/images/img_standort_3.jpg" alt="">
                    </swiper-slide>

                    <swiper-slide class="swiper_slide">
<img class="office_photo" src="../../assets/images/img_standort_4.jpg" alt="">
                    </swiper-slide>

                    <swiper-slide class="swiper_slide">
<img class="office_photo vertical" src="../../assets/images/img_standort_5.jpg" alt="">
                    </swiper-slide>

                    <swiper-slide class="swiper_slide">
<img class="office_photo" src="../../assets/images/img_standort_6.jpg" alt="">
                    </swiper-slide>

                </swiper-container>
            </div>
</BasePopUp>
</template>
<script>
import BasePopUp from '../base/BasePopUp.vue'
import BaseCloseButton from '../base/BaseCloseButton.vue'
export default{
    components:{
    BasePopUp,
    BaseCloseButton
    },
    data(){
        return{
            PopupPhoto: false
        }
    },
}
</script>
<style scoped>
.flex{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    position: relative;
}
.title_popup{
    position: absolute;
    top: 25px;
    left: 50%;
    transform: translateX(-50%);
}
.swiper_container{
    width: 100%;
    height: 90%;
    border-radius: 20px;
    overflow: hidden;
    margin-top: 20px;
    z-index: 3;}
.swiper_slide{
overflow: hidden;
}
.container_flex{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 600px;


}
.container_flex::before{

    content: '';
    background-image: url(../../assets/images/img_standort_1.jpg);
    background-size: cover;
    background-position: center;
    position: absolute;
      top: 0px;
      right: 0px;
      bottom: 0px;
      left: 0px;
    opacity: 0.3;
    border-radius: 40px;
    z-index: 0;
    

}
.office_photo{
   width: 100%;
   position: absolute;
left: 50%;
top: 50%;
transform: translate(-50%, -50%);
}
.vertical{
    width: auto !important;
    height: 100%;
}
</style>