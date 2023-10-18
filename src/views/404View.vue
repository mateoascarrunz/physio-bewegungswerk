<template>
<div class="container error_container center">
    <div>
    <span class="ultramegatitle blue bold">404</span>
<br>
    <span class="megatitle blue">Hoppla!</span>
</div><div>
    <span class="paragraph blue">"Sie haben sich verlaufen. Kein Problem, bleib beweglich. <br>
Kehren Sie zur Startseite zurück, um den Weg zur Gesundheit zu finden.</span>
<br>
<br>
<RouterLink class="nav-link" to="/"><BaseButtonBlue>Home</BaseButtonBlue></RouterLink>
</div>
   
    <Icon404 class="icon_notfound"></Icon404>
</div>
</template>
<script>

import Icon404 from '../components/icon/Icon404.vue';

export default{
    components:{
    Icon404,

}
}</script>
<style>
.error_container{
width: 100vw;
height: 80vh;
display: flex;
flex-direction: column;
align-items: center;

}
.icon_notfound{
    margin-bottom: 50px;
    width: 80%;
    height: auto;
}
</style>