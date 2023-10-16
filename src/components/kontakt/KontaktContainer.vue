<template>
    <BasePageTransition></BasePageTransition>
    <div class="grid_container">
        <BaseBox class="grid_mobile box_maps">
            <GoogleMaps></GoogleMaps></BaseBox>
        <KontaktInfo class="grid_mobile"></KontaktInfo>
    </div>
    <KontaktForm></KontaktForm>
</template>

<script>
import KontaktInfo from './KontaktInfo.vue';
import KontaktForm from './KontaktForm.vue';
import GoogleMaps from '../GoogleMaps.vue';
export default{
    components:{
        
        KontaktInfo,
        KontaktForm,
        GoogleMaps
    }
}

</script>
<style scoped>
.box_maps{
    padding: 0px !important;
    overflow: hidden;
    min-height: 500px;
}
@media(max-width: 500px){
    .grid_mobile{
    padding-left: 0px !important;
    padding-right: 0px !important;
} 
}</style>
