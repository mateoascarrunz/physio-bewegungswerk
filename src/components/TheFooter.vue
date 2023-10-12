<template>
    <div class="grid_container">
        <BaseBox class="grid-col-2">
            <div class="row">
                <div class="col-lg-4 center">
                    <img class="logo" src="../assets/images/physio_logo.svg" alt="">
                    <br>
                    <br>
                    <span class="info block grey">Physio Bewegungswerk GmbH</span>
                    <span class="info block bold">Bergstrasse 3, 8625 Gossau</span>
                    <span class="info block"><span class="bold">Email: </span><span class="info">info@physio-bewegungswerk.ch</span></span>
                    <span class="info block"><span class="bold">Tel: </span><span class="info">044 543 63 68</span></span>
                    <span class="info block"><span class="bold">Mobil: </span><span class="info">076 543 63 68</span></span>
                </div>
                <div class="col-lg-4 center">
                    <div class=" links_container">
                   <span class="subtitle bold block">Quick Links </span>
                   <RouterLink class="nav-link" to="/">
                <span class="info block links" >Home</span>
                </RouterLink>
                <RouterLink class="nav-link" to="/dienstleistungen"><span class="info block links" >Unsere Dienstleistungen</span> </RouterLink>
                <RouterLink class="nav-link" to="/uberuns"><span class="info block links" >Über uns</span></RouterLink>
                    <RouterLink class="nav-link" to="/nachrichten"><span class="info block links" >Nachrichten</span></RouterLink>
                   <a><span class="info block links" >Termin Vereinbaren</span></a>
                </div>
                </div>
                <div class="col-lg-4 center">
                    <div class=" links_container">
                   <span class="subtitle bold block">Support </span>
                   <RouterLink class="nav-link" to="/kontakt"> <span class="info block links" >Kontakt</span></RouterLink>
                   <RouterLink class="nav-link" to="/faq"> <span class="info block links" >FAQ</span></RouterLink>
                </div>
                </div>
                <div class="col-lg-12 center">
                    <span class="info"> <span class="bold">Öffnungszeit: Mo-Fr</span> 8-18 Uhr -</span>
                    <span class="info"> Parkplätze vor der Praxis vorhanden </span>
                </div>
                <div class="col-lg-12">
                    <hr class="blue">
                    <div class="row">
                        <div class="col-lg-6 left">
                    <span class="info links blue"> Impressum  </span>
                   <span class="info links blue" > Datenschutz </span>
                </div>
                <div class="col-lg-6 right">
                    <span class="info blue">Design and Develop by: <a class="semibold blue" href="https://mateoascarrunz.com/">Mateo Ascarrunz</a></span>
                  
                </div>
                </div>
                </div>
            </div></BaseBox>
            <div class="grid-col-2 center ">
                <span class="grey info">© 2023 Physio Bewegungswerk GmbH All rights reserved</span>
            </div>
            
   
</div>
</template>

<style scoped>

.grid_container{
    margin-top: -30px;
}
.logo{
    width: 167px;
}
.links_container{
    margin-top: 50px;
    width: 250px;
    margin-left: auto;
    margin-right: auto;
    text-align: left;
}
.links{
    margin-top: 10px;
    margin-bottom: 10px;
    transition: all ease-in-out 0.3s;
    margin-right: 30px;
}
.links:hover{
  font-weight: 600;
  color: #004FF1;
}
hr{
    opacity: 0.5;
    margin-top: 0px;
}
</style>