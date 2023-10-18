<template>
    <div class="grid_container">
        <BaseBox class="grid-col-2">
            <div class="container-fluid">
            <div class="row">
                <div class="col-lg-4 center">
                    <img class="logo" src="../assets/images/physio_logo.svg" alt="">
                    <br>
                    <br>
                    <span class="info block grey">Physio Bewegungswerk GmbH</span>
                    <span class="info block bold">Bergstrasse 3, 8625 Gossau</span>
                    <span class="info block"><span class="bold">Email: </span><a href="mailto:info@physio-bewegungswerk.ch"><span class="info">info@physio-bewegungswerk.ch</span></a></span>
                    <span class="info block"><span class="bold">Tel: </span><a href="tel:0445436368"><span class="info">044 543 63 68</span></a></span>
                    <span class="info block"><span class="bold">Mobil: </span><a href="tel:0765436368"><span class="info">076 543 63 68</span></a></span>
                </div>
                <div class="col-lg-4 center">
                    <div class=" links_container">
                   <span class="subtitle bold block">Quick Links </span>
                   <RouterLink class="nav-link" to="/">
                <span class="info block links" >Home</span>
                </RouterLink>
                <RouterLink class="nav-link" to="/behandlungstechniken"><span class="info block links" >Unsere Behandlungstechniken</span> </RouterLink>
                <RouterLink class="nav-link" to="/uberuns"><span class="info block links" >Über uns</span></RouterLink>
                    <RouterLink class="nav-link" to="/news"><span class="info block links" >News</span></RouterLink>
                   <a href="https://onlinecalendar.medidoc.ch/BookAppointment?cgid=GLLYOUHTXUK45FADLLmoKA&ssid=gUj7CbnQGk.1KiYHwBRBVg" target="_blank"><span class="info block links" >Termin Vereinbaren</span></a>
                </div>
                </div>
                <div class="col-lg-4 center">
                    <div class=" links_container">
                   <span class="subtitle bold block">Support </span>
                   <RouterLink class="nav-link" to="/kontakt"> <span class="info block links" >Kontakt</span></RouterLink>
                   <RouterLink class="nav-link" to="/faq"> <span class="info block links" >FAQ</span></RouterLink>
                  <a href="https://data.physio-bewegungswerk.ch/admin/" target="_blank"><span class="info block links" >Admin</span></a>

                </div>
                </div>
                <div class="col-lg-12 center">
                    <span class="info"> <span class="bold">Öffnungszeit: Mo-Fr</span> 8-18 Uhr -</span>
                    <span class="info"> Parkplätze vor der Praxis vorhanden </span>
                </div>
                <div class="col-lg-12 info_footer">
                    <hr class="blue">
                    <div class="row">
                        <div class="col-lg-6 flex_mobile_lastlinks left">
                            <RouterLink class="nav-link" to="/impressum"><span class="info links blue"> Impressum  </span></RouterLink>
                            <RouterLink class="nav-link" to="/datenschutz"><span class="info links blue" > Datenschutz </span></RouterLink>
                </div>
                <div class="col-lg-6 right center_mobile">
                    <span class="info blue">Designed and Developed by: <a class="semibold blue" target="_blank" rel="noopener noreferrer" href="https://mateoascarrunz.com/">Mateo Ascarrunz</a></span>
                  
                </div>
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
a{
    text-decoration: none;
    color: inherit;
    cursor: pointer;
    transition: all 0.3s ease;
}
a:hover{
text-decoration: underline;
}
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
  color: #3F63A7;
}
hr{
    opacity: 0.5;
    margin-top: 0px;
}
.flex_mobile_lastlinks{
    display: flex;
    flex-direction:row;
}
@media (max-width: 990px){
    .grid_container{
    margin-top: -15px;
}
.links_container{
    text-align: center;
}
.links{
    margin-right: 0px;
}
.info_footer{
    margin-top: 50px;
}
.flex_mobile_lastlinks{
    display: flex;
    justify-content: space-evenly;
}
.center_mobile{
    text-align: center;
    margin-top: 20px;
}
}
</style>