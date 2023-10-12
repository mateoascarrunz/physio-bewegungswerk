<template>
     <BaseBox :color="blue"  class="grid-col-2 relative">
        <div class="row">
            <div class="col-lg-9">
                <br>
     <span class="megatitle white block bold">Vereinbaren Sie einen Termin mit uns und bleiben Sie immer in Bewegung.</span>
    <br>
     <span class="paragraph white block">Ihre Gesundheit ist unsere Priorität. Buchen Sie jetzt Ihren Termin, um Unterstützung auf Ihrem Weg zu einem aktiveren Leben zu erhalten. Wir freuen uns darauf, Sie zu betreuen."</span>
     <br>
     <BaseButtonBlue > <span class="white">Termin Vereinbaren</span></BaseButtonBlue>
     <br>
    </div> 
    </div>
     <img class="icon" src="../../assets/images/physio_icon_white.svg" alt="">
     </BaseBox>
</template>
<script>
export default{
    inject:['blue', 'lightblue'],
}</script>
<style scoped>
.col-lg-9{
    margin-top: 50px;
margin-left: 100px;
margin-right: 100px;
margin-bottom: 50px;
z-index: 2;
}
.icon{
position: absolute;
right: 50px;
height: 90%;
bottom: 0px;
z-index: 1;
opacity: 0.3;
}</style>