<template>
    <div class="container-fluid" id="uber_company">
        <div class="row relative">
            <div class="col-lg-6 center center_flex uber_company_text">
               <span class="title bold blue margintitle">Über Physio Bewegungswerk</span>

               <div class="left">
                <span class="subtitle bold">Vom Traum zur Realität: Unsere eigene Praxis - Eine Reise von 10 Jahren Zusammenarbeit.</span>
                <br>
                <br>
               <span class="paragraph">Aus einem gemeinsamen Traum wurde Wirklichkeit - Im Mai 2023 haben wir unsere eigene Praxis gegründet nachdem wir fast 10 Jahre Seite an Seite gearbeitet haben. Das gegenseitige Verständnis, die gemeinsame Heransgehenweise in unseren Behandlungen und das gegenseitige volle Vertrauen waren für uns beste Voraussetzungen, uns in ein neues Abenteuer zu stürzen und das Projekt eigene Praxis umzusetzen.</span>
               <br><br>
            </div>
            </div>
            <div class="col-lg-6">
                <div class="img_company_uberuns ">
                    
                
                </div>
</div>
        </div>
    </div>

</template>

<style scoped>

.img_company_uberuns{
width: 100%;
height: 100%;
position: relative;
aspect-ratio: 1.5/1;
display: flex;
justify-content: center;
    align-items: center;

}
.margintitle{
    margin-bottom: 40px;
}
.img_company_uberuns::before {    
    content: '';
    background-image: url(../../assets/images/img_physio_team.png);
    background-size: cover;
    background-position: center;
    position: absolute;
      top: 0px;
      right: 0px;
      bottom: 0px;
      left: 0px;
    opacity: 0.5;
    border-radius: 40px;
    z-index: -1;
    
    
}
.flex{
    display: flex;
}
@media(max-width:990px){
    .uber_company_text{
      
margin-top: 50px;
       padding-left: 5%;
       padding-right: 5%;
       z-index: 2;
}
.margintitle{
    margin-bottom: 10px;
}
}

</style>