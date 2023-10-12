<template>
<div class="card_container">
  <!-- <img src="../../assets/images/img_news_1.jpeg" class="img" alt=""> -->
  <div class="card-body">
    <slot>

    </slot>
  </div>
</div>
</template>
<style scoped>
.card_container{
    width: 400px;
height: 560px;

    position: relative; 
    display: flex;
    align-items: center;
    justify-content: center;
    

}
.card_container::before {    
    content: '';
    background-image: url(../../assets/images/img_news_1.jpeg);
    background-size: cover;
    background-position: center;
    position: absolute;
      top: 0px;
      right: 0px;
      bottom: 0px;
      left: 0px;
    opacity: 0.5;
    border-radius: 40px;
    
}
.img{
    height: 100%;
    overflow: hidden;
}
.card-body{
    position: absolute;
    bottom: 0px;
    right: 0px;
    background-color: red;
    width: 100%;
    height: 60%;
    border-radius: 40px;
background: rgba(255, 255, 255, 0.50);
backdrop-filter: blur(10px);
padding: 25px 25px 10px 25px;
}</style>