<template>
    <div :style="{ 'background-color': color}">
        <slot></slot>
    </div>
</template>
<script>
export default{
    props: ['color']
}
</script>
<style scoped>
div{
    border-radius: 50px;
background: #F5F5F5;
padding: 50px;
height: 100%;
width: 100%;
position: relative;
}
@media (max-width: 500px){
    div{
    padding-left: 5% !important;
    padding-right: 5% !important;
}
}</style>