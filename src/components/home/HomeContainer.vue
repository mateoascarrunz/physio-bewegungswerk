<template>
    <div class="container-fluid-costume"> 
    <div class="grid_container">
        <BaseBox class="grid-col-2" :color="lightblue">

        </BaseBox>
      <TechniquesBox>
        
      </TechniquesBox>
        <BaseBox></BaseBox>
      <NachrichtenBox/>
       <ActionBox/>
    </div>
</div>

</template>
<script>
import TechniquesBox from './TechniquesBox.vue';
import ActionBox from './ActionBox.vue';
import NachrichtenBox from './NachrichtenBox.vue'
export default{
    components:{
        ActionBox,
        NachrichtenBox,
        TechniquesBox
    },
    inject:['blue', 'lightblue'],
}</script>
<style >

.container-fluid-costume{
    margin-top: -80px;
    padding: 0px;
}

.img_cover{
    object-fit: cover;
}
</style>