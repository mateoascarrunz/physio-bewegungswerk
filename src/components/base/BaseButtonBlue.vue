<template>
    <button type="button" class="btn"><span class="paragraph"><slot></slot></span></button>
</template>

<style scoped>
.btn{
  border-radius: 100px;
  border: 1px solid #3F63A7!important;
  padding-left: 20px !important;
  padding-right: 20px !important;
  background: rgba(255, 255, 255, 0.10);
backdrop-filter: blur(20px);
-webkit-backdrop-filter: blur(20px);
color: rgba(0, 28, 84, 1);
}
.btn:hover{
  color: white !important;
  background: #3F63A7;
  box-shadow: 0px 4px 12px 0px rgba(0, 0, 0, 0.25);
}
.btn:focus{
color: rgba(0, 28, 84, 0.771) !important;
border: 2px solid #3F63A7;
background: rgba(255, 255, 255, 0.50);
box-shadow: 0px 4px 12px 0px rgba(0, 0, 0, 0.25);

}
@media (max-width: 991px){
  .btn{

 background-color: #F5F5F5;

}}
</style>