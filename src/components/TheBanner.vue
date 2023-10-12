<template>
  <div v-for="banner in bannerMessage" :key="banner.id">
    <div class="banner-container" v-if="banner.attributes.Visible">

        <div class="banner-message" >
  <span>{{ banner.attributes.BannerTitle + ' ' + '-' + ' ' }}</span>
<span>{{ banner.attributes.BannerTitle + ' ' + '-' + ' ' }}</span>
<span>{{ banner.attributes.BannerTitle + ' ' + '-' + ' ' }}</span>
<span>{{ banner.attributes.BannerTitle + ' ' + '-' + ' ' }}</span>
<span>{{ banner.attributes.BannerTitle + ' ' + '-' + ' ' }}</span>
<span>{{ banner.attributes.BannerTitle + ' ' + '-' + ' ' }}</span>
<span>{{ banner.attributes.BannerTitle + ' ' + '-' + ' ' }}</span>
<span>{{ banner.attributes.BannerTitle + ' ' + '-' + ' ' }}</span>
<span>{{ banner.attributes.BannerTitle + ' ' + '-' + ' ' }}</span>
<span>{{ banner.attributes.BannerTitle + ' ' + '-' + ' ' }}</span>
<span>{{ banner.attributes.BannerTitle + ' ' + '-' + ' ' }}</span>
<span>{{ banner.attributes.BannerTitle + ' ' + '-' + ' ' }}</span>
<span>{{ banner.attributes.BannerTitle + ' ' + '-' + ' ' }}</span>
<span>{{ banner.attributes.BannerTitle + ' ' + '-' + ' ' }}</span>
          
      </div>
      <div class="banner-message" >
<span>{{ banner.attributes.BannerTitle + ' ' + '-' + ' ' }}</span>
<span>{{ banner.attributes.BannerTitle + ' ' + '-' + ' ' }}</span>
<span>{{ banner.attributes.BannerTitle + ' ' + '-' + ' ' }}</span>
<span>{{ banner.attributes.BannerTitle + ' ' + '-' + ' ' }}</span>
<span>{{ banner.attributes.BannerTitle + ' ' + '-' + ' ' }}</span>
<span>{{ banner.attributes.BannerTitle + ' ' + '-' + ' ' }}</span>
<span>{{ banner.attributes.BannerTitle + ' ' + '-' + ' ' }}</span>
<span>{{ banner.attributes.BannerTitle + ' ' + '-' + ' ' }}</span>
<span>{{ banner.attributes.BannerTitle + ' ' + '-' + ' ' }}</span>
<span>{{ banner.attributes.BannerTitle + ' ' + '-' + ' ' }}</span>
<span>{{ banner.attributes.BannerTitle + ' ' + '-' + ' ' }}</span>
<span>{{ banner.attributes.BannerTitle + ' ' + '-' + ' ' }}</span>
<span>{{ banner.attributes.BannerTitle + ' ' + '-' + ' ' }}</span>
<span>{{ banner.attributes.BannerTitle + ' ' + '-' + ' ' }}</span>




</div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      bannerMessage: Array, // Define the prop to accept an array
    },
  };
  </script>
  
  
  <style scoped>
    .banner-message {
    color: white;
    font-size: 30px;
    font-weight: 700;
  } 
  .banner-container{
    background-color: #004FF1;
    position: relative;
    width: 100%;
    top: 0px;
    left: 0px;
    overflow: hidden;
    padding:  12px 0px;
    white-space: nowrap;
  }
  .banner-message{

    animation: 105s moveBanner infinite linear;
    display: inline-block;

  }
  

  
  @keyframes moveBanner {
from{
    transform: translateX(0);
}
to{
    transform: translateX(-100%);
}
}
@media (max-width: 991px){
  .banner-message {

    font-size:16px;

  } 
}
  </style>
  