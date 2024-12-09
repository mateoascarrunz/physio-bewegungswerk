<template>

    <div class="dropdown_container">
 
        <div class="menu parent">
            <BaseCloseButton @click="emitClose" ></BaseCloseButton>
            <span class="title blue">Behandlungstechniken</span>
        <br>
        <slot></slot>
    </div>
    </div>

</template>
<script>
import BaseCloseButton from '../base/BaseCloseButtonSticky.vue'

export default{
    components:{
        BaseCloseButton
    },
    methods: {
    emitClose() {
      this.$emit('closePopup');
    },
  },
    mounted() {
    document.body.classList.add('scroll-out');
  },
  unmounted() {
    document.body.classList.remove('scroll-out');
  }
}</script>
<style scoped>
.dropdown_container{
    position: fixed;
    top: 0px;
    left: 0px;
    z-index: 2;
    background-color: rgba(255, 255, 255, 0.123);
    height: 100vh;
    width: 100vw;
    backdrop-filter: blur(20px);
-webkit-backdrop-filter: blur(20px);
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: center;
}
.menu{
   display: flex;
    align-items: center;
    flex-direction: column;
    flex-wrap: nowrap;
    overflow-y: scroll;
    width: 100%;
    max-width: 900px;
    max-height: 800px;
    margin-left: auto;
    margin-right: auto;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.491);
position: relative;
    margin-top:50px;
    border: 1px solid white;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
    border-radius: 20px;

}
@media(max-width:990px){
    .menu{
        border:none;
        background-color: transparent;
        box-shadow:none;
    margin-top: 160px;

}   
}</style>