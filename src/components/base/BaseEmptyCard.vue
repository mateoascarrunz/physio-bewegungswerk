<template>
<div class="card_container transition-5">
 
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


.card-body{
    position: absolute;
    bottom: 0px;
    right: 0px;
    width: 100%;
    height: 100%;
    border-radius: 40px;
    display:flex;
padding: 25px 25px 10px 25px;
justify-content: center;
    align-items: center;
    border: 2px dashed #3F63A7;
    flex-direction: column;
}
@media(max-width:990px) {
  .card_container{
    width: 280px;
height: 460px;

}
}
</style>
