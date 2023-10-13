<template>

    <div class="dropdown_container">
       
        <div class="menu">
            <span class="title blue">Behandlungstechniken</span>
        <br>
        <slot></slot>
    </div>
    </div>

</template>
<style scoped>
.dropdown_container{
    position: fixed;
    top: 0px;
    left: 0px;
    z-index: 2;
    background-color: rgba(255, 255, 255, 0.123);
    height: 100vh;
    width: 100vw;
    backdrop-filter: blur(20px);
-webkit-backdrop-filter: blur(20px);
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: center;
}
.menu{
   display: flex;
    align-items: center;
    flex-direction: column;
    flex-wrap: nowrap;
    overflow-y: scroll;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0px;
    left: 0px;
    padding-top: 180px;

}
@media(max-width:990px){
    .menu{

    padding-top: 160px;

}   
}</style>