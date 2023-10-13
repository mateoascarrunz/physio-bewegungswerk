<template>
  <!-- <GoogleMap :api-key="apiKey" style="width: 100%; height: 500px" :center="center" :zoom="15">
    <Marker :options="{ position: center }" />
  </GoogleMap> -->
  <iframe class="maps" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1179.0080104470499!2d8.756155157914248!3d47.304151266319785!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x479abaf962e0e001%3A0xe403df275e61c4b8!2sBergstrasse%203!5e0!3m2!1ses-419!2sch!4v1696844098712!5m2!1ses-419!2sch"  style="border:0;"  loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
</template>
<!-- <script>
import { GoogleMap, Marker } from "vue3-google-map";

export default{
    components:{
        GoogleMap,
        Marker
    },
   
    data(){
        return{
            apiKey: 'AIzaSyDT6czxKjOP6ybZuQNuQED6Ly_oCeAeUU0',
            lat:null,
            lng: null,
        }
    }
}</script> -->
<style>
.maps{
width: 100%;
height: 100%;

}</style>