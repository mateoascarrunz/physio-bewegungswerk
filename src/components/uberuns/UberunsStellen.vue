<template>
    <BaseBox class="center stelle_container" id="stellen">
    <span class="title blue bold title_stelle">Offene Stellen</span>
    <br>
    <br>
    <div class="container">
    <BaseStelleBox></BaseStelleBox>
</div>
    
    
    
    </BaseBox>
</template>
<script>
import BaseStelleBox from '../base/BaseStelleBox.vue';
export default{

    components:{
        BaseStelleBox
    },
}
</script>
<style scoped>
.container{
    margin-top: 20px;
}
</style>