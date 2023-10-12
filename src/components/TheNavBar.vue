<template>
   <!-- Navbar-->
  <nav class="sticky-top  navbar navbar-expand-lg flex-lg-nowrap flex-wrap">
    <div class="container-fluid">
            <a class="navbar-brand" href="index.html"><img style="width: 75%;" src="../assets/images/physio_icon.svg" alt="Physio icon"></a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
        <div class="navbar-collapse collapse justify-content-center" id="navbarNavDropdown">
            <ul class="navbar-nav mx-auto">
              
                <li class="nav-item">
                    <RouterLink class="nav-link" to="/">Home
                </RouterLink>
                </li>
                <li class="nav-item">
                     <RouterLink class="nav-link" to="/dienstleistungen"> Unsere Dienstleistungen </RouterLink>
                </li>
                <li class="nav-item">
                      <RouterLink class="nav-link" to="/uberuns"> Über uns </RouterLink>
                </li>
                <li class="nav-item">
                      <RouterLink class="nav-link" to="/nachrichten"> Nachrichten </RouterLink>
                </li>
                <li class="nav-item">
                    <RouterLink class="nav-link" to="/kontakt"><span class="" aria-current="page" href=""> Kontakt </span>
                </RouterLink>
                </li>
         
        </ul>
        <ul class="navbar-nav navbar-termin">
          <li class="nav-item-contact ">
            <!-- link to software -->
              <BaseButtonMag type="button" class="nav-link  btn_magenta" href="something.html">Termin Vereinbaren</BaseButtonMag>
          </li>
      </ul>
    
        </div>
    
    </div>
</nav>

</template>

<style scoped>
.sticky-top{
top: 28px !important;

}
.navbar{
    border-radius: 3rem;
    margin-top: 40px;
    margin-left: 8%;
    margin-right: 8%;
    height: 5rem;
    font-weight: bold;
    z-index: 10 !important;
    background: rgba(255, 255, 255, 0.10);
backdrop-filter: blur(20px);
-webkit-backdrop-filter: blur(20px);

}
.nav-link{
    color: rgba(0, 28, 84, 0.50);
    font-weight: 400;
    font-family: 'Montserrat', sans-serif;
}
.router-link-active {
  border-bottom: 1px solid #004FF1;
  font-weight: 600;
  color: #004FF1;
  text-decoration: underline;
  
}
a{
  text-decoration: none !important;
}
.nav-link:hover{
    color: rgba(0, 28, 84, 1);
     border-bottom-color:  rgba(0, 28, 84, 1);
}
s
.white{
    color: white !important;
}
.lightgrey{
    color: #7B7B7B !important;
}

.nav-item{
    margin-left: 0.938rem;
    margin-right: 0.938rem;
}

.nav-item-contact{
    margin-right: 20px;

}
.navbar-toggler{
    border-radius: 200px;
    aspect-ratio: 1/1;
    border: none;
}
.navbar-toggler:focus{
    box-shadow: none;
    border: 1px solid #E2097F;
}




@media (max-width: 991px){
.navbar-nav {
border-radius: 50px;
background: #D6E3FF;

    text-align: center;
margin-top: 50px;
padding: 20PX;
}
.navbar-termin{
    margin-top: 30px;  
    background-color: transparent !important;
    box-shadow: none;
}
.router-link-active {
  width: max-content;
  margin-left: auto;
  margin-right: auto;
  
}
.nav-item-contact {
    margin-right: 0rem;
    margin-bottom: 0rem ;
    margin-top: 0rem;
    display: block;
    margin-left: auto;
    margin-right: auto;
}
}
</style>