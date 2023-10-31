<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-lg-6 center center_flex hero_about_text" >
                <span class="title blue bold">Unser Behandlungsansatz</span>
                <br>
                
                <div class="left">
<span class="paragraph"> In unserer Therapiepraxis betrachten wir jeden Patienten als einzigartiges Individuum. Unser Therapieansatz ist flexibel, da wir individuell angepasste Behandlungspläne entwickeln, die auf die spezifischen Bedürfnisse und Ziele jedes Patienten zugeschnitten sind. Wir arbeiten eng mit unseren Patienten zusammen, um gemeinsam Strategien zu erarbeiten, die darauf abzielen, die gewünschten Ergebnisse zu erreichen.
<br>
<br>
Unser Ansatz ist ganzheitlich, was bedeutet, dass wir nicht nur Symptome behandeln, sondern auch die zugrunde liegenden Ursachen und den Gesamtzusammenhang berücksichtigen. Das Hauptziel ist es, langfristige Verbesserungen im Wohlbefinden unserer Patienten zu erreichen.
<br>
<br>
Wir legen grossen Wert darauf, dass wir jeden unserer Patienten respektvoll und individuell behandeln, und wir setzen uns dafür ein, maßgeschneiderte Lösungen für ihre speziellen Bedürfnisse anzubieten.<br>
<br></span>
<div class="btn_container">
  <div v-if="jobs.length !== 0">
<BaseButtonBlue @click="scrollToStellen">Offene Stellen</BaseButtonBlue></div>
<div>
<RouterLink class="nav-link" to="/faq"> <BaseButtonBlue class="margin_left">FAQ</BaseButtonBlue></RouterLink></div>
</div>
<br><br> 
                </div>
            </div>
            <div class="col-lg-6 img">
                <div class="img_hero_uberuns ">
                    <!-- <img class="logo" src="../../assets/images/physio_icon.svg" alt=""> -->
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
export default {
  data(){
        return{
jobs:[],
        }
    },
   
  methods: {
    scrollToStellen() {
      const stellenElement = document.getElementById('stellen');
      if (stellenElement) {
        stellenElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    },
  },
  mounted() {
        axios.get('https://strapi-physio-app.onrender.com/api/jobs')
            .then(response => {
                console.log(response.data.data);
                this.jobs = response.data.data;
            });
    },
};
</script>
<style scoped>
/* .logo{
        width: 10%;
        opacity: 1;
         margin-bottom: 30px;
         margin-right: 30px;
} */
.margin_left{
margin-left: 50px;
}
.img_hero_uberuns{
width: 100%;
height: 100%;
position: relative;
aspect-ratio: 1.3/1;
display: flex;
justify-content: flex-end;
    align-items: flex-end;


}
.btn_container{
display: flex;

justify-content: space-evenly
    }
.img_hero_uberuns::before {    
    content: '';
    background-image: url(../../assets/images/img_physio_team2.png);
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

@media (max-width: 990px){
    .img_hero_uberuns{
        aspect-ratio: 1.6/1;
    }
    .btn_container{
display: flex;

justify-content: space-evenly
    }
    .margin_left{
        margin-left: 0px;
    }
}

</style>