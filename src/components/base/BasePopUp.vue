
<template>
    <div class="background">
        <div class="container-fluid"> 


        <BaseBox class="box"  :style="{height: theheight }">
          
        <slot></slot>
        </BaseBox>
    </div>
    </div>
</template>
<script>
export default {
  props:{
  theheight: {
      type: String,
      default: '85vh', 
    },
  },
  mounted() {
    document.body.classList.add('scroll-out');
  },
  unmounted() {
    document.body.classList.remove('scroll-out');
  }
};
</script>
<style scoped>
.background{
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100vw;
    height:100vh ;
    background-color: rgba(255, 255, 255, 0.225);
    z-index: 3;
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    padding: 100px 50px 50px 50px;
    display: flex;
    align-items: center

}
.box{
overflow-y: auto;
}

</style>