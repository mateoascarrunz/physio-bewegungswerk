<template>
    <div class="page_intro">
<BaseLogoAnimation class="logo"></BaseLogoAnimation>
    </div>
</template>
<script>
import BaseLogoAnimation from './base/BaseLogoAnimation.vue';
export default{
    components:{
        BaseLogoAnimation
    },
}</script>
<style scoped>
.page_intro{
    margin-top: 0px;
    width: 100vw;
    height: 100vh;
    position: fixed;
background-color: rgb(255, 255, 255);
display: flex;
place-content: center;
    align-items: center;
    z-index: 9999;  
    transition: all ease 0.5s;
}
.logo{
    width: 30vw;
    max-width: 400px;
    min-width: 200px;
    height: fit-content;
}
</style>