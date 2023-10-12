<template>
    <button type="button" class="btn">
      <span>
      <slot></slot>
    </span>
    </button>
</template>
<script>
export default {
  props: {
   textWhite: String,
  }
};
</script>
<style scoped>

.btn{
  border-radius: 100px;
  border: 1px solid #E2097F !important;
  padding-left: 20px !important;
  padding-right: 20px !important;
  background: rgba(255, 255, 255, 0.10);
backdrop-filter: blur(20px);
-webkit-backdrop-filter: blur(20px);
}
.btn:hover{
  color: white !important;
  background: #E2097F;
  box-shadow: 0px 4px 12px 0px rgba(0, 0, 0, 0.25);
}
.btn:focus{
color: rgba(0, 28, 84, 0.771) !important;
border: 2px solid #E2097F;
background: rgba(255, 255, 255, 0.50);
box-shadow: 0px 4px 12px 0px rgba(0, 0, 0, 0.25);

}

@media (max-width: 991px){
  .btn{

 background-color: #F5F5F5;

}}
</style>