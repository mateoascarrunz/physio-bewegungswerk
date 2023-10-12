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
}</style>