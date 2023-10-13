
<template>
        
    <BaseBox class="container_flex center">
        <span class="title bold blue z-1">Unsere Standort</span>
        <br>
        <span class="paragraph z-1">Bergstrasse 3, 8625 Gossau</span>
        <br>

        <a href="https://maps.app.goo.gl/cF5gTcjpVvmXUC6T7" target="_blank" rel="noopener noreferrer"><BaseButtonBlue z-1>Siehe Standort</BaseButtonBlue></a>
    </BaseBox>

</template>
<style scoped>
.container_flex{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 600px;


}
.container_flex::before{

    content: '';
    background-image: url(../../assets/images/img_standort_1.jpg);
    background-size: cover;
    background-position: center;
    position: absolute;
      top: 0px;
      right: 0px;
      bottom: 0px;
      left: 0px;
    opacity: 0.3;
    border-radius: 40px;
    z-index: 0;
    

}
</style>