<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-lg-6 center center_flex hero_about_text" >
                <span class="title blue bold">2 Physiotherapeuten</span>
                <br>
                
                <div class="left">
<span class="paragraph"> In unserer Therapiepraxis sehen wir jeden Menschen als individuelles Wesen mit einzigartigen Bedürfnissen und Hintergründen. Unser Therapieansatz zeichnet sich durch seine Anpassungsfähigkeit aus. Wir entwickeln unsere Behandlungspläne sorgfältig, um die spezifischen Anforderungen jedes einzelnen Patienten zu berücksichtigen. Dabei arbeiten wir eng mit unseren Patienten zusammen, um gemeinsam Strategien zu entwickeln, die darauf abzielen, die von ihnen festgelegten Ziele zu erreichen.
<br>
<br>
Unser Ansatz ist ganzheitlich, was bedeutet, dass wir nicht nur Symptome behandeln, sondern auch die zugrunde liegenden Ursachen und den Gesamtzusammenhang berücksichtigen. Unser Ziel ist es, langfristige Verbesserungen im Wohlbefinden unserer Patienten zu erreichen.
<br>
<br>
Insgesamt legen wir großen Wert darauf, dass jeder Mensch in unserer Obhut als einzigartiges Individuum behandelt wird, und wir arbeiten hart daran, individuelle Lösungen für individuelle Bedürfnisse anzubieten.
<br>
<br></span>
<div class="btn_container">
<BaseButtonBlue @click="scrollToStellen">Offene Stellen</BaseButtonBlue>
<BaseButtonBlue class="margin_left">FAQ</BaseButtonBlue>
</div>
<br><br>
                </div>
            </div>
            <div class="col-lg-6 img">
                <div class="img_hero_uberuns ">
                    <img class="logo" src="../../assets/images/physio_logo.svg" alt="">
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
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
};
</script>
<style scoped>
.logo{
        width: 35%;
}
.margin_left{
margin-left: 50px;
}
.img_hero_uberuns{
width: 100%;
height: 100%;
position: relative;
aspect-ratio: 1.3/1;
display: flex;
justify-content: center;
    align-items: center;


}
.img_hero_uberuns::before {    
    content: '';
    background-image: url(../../assets/images/img_physio1.png);
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