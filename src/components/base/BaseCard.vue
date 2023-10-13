<template>
<div class="card_container">
  <slot name="img_card"></slot>
  <div class="card-body" :style="{height: theheight }">
    <slot>

    </slot>
  </div>
</div>
</template>
<script>
export default{
  props:{
  theheight: {
      type: String,
      default: '60%', 
    },
    background: {
      type: String,
    },

  },

}</script>
<style scoped>
.card_container{
    width: 400px;
height: 560px;

    position: relative; 
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 40px;
    overflow: hidden;
    background-color: white;

}
@media(max-width:990px) {
  .card_container{
    width: 280px;
height: 460px;
  }

}
@media(max-width: 500px){
  .card_container{
    width: 100%;

}
}


.card-body{
    position: absolute;
    bottom: 0px;
    right: 0px;
    background-color: red;
    width: 100%;
    border-radius: 40px;
background: rgba(255, 255, 255, 0.50);
backdrop-filter: blur(10px);
-webkit-backdrop-filter: blur(10px);
padding: 25px 25px 10px 25px;
}</style>