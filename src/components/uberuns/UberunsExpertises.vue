<template>
    <BaseBox class="basebox">
<div class="center">
    <span class="title bold blue">Unsere Werte</span>
    <br>
    <br>
</div>
<div class="illustration" :class="{'safari': isSafari}">
<IconExpertiseContainer class="illu_background"  v-if="viewportWidth > 800"></IconExpertiseContainer>
<IconExpertiseContainerVertical class="illu_background"  v-if="viewportWidth < 800"></IconExpertiseContainerVertical>
<img class="icon icon_1" src="../../assets/images/icon_expertise_1.svg" alt=" expertise_1">
<IconLineDot v-if="viewportWidth > 800" class="icon icon_1 line"/>
    <div class="center illu_text text1" v-if="viewportWidth > 800">
        <span class="paragraph blue bold">Wertschätzung</span>
        <br>
        <div class="left">
            <span class="info blue">Wir pflegen eine <strong>wertschätzende</strong> und unterstützende Umgebung, in der wir kreativ auf die individuellen Ziele unserer Patienten eingehen.</span>
        </div>
    </div>
<BaseButtonBlue @click="popup1 = !popup1" v-if="viewportWidth < 800" class=" icon icon_1 margin_button"><span class="info">Wertschätzung</span></BaseButtonBlue>
<img class="icon icon_2" src="../../assets/images/icon_expertise_2.svg" alt="expertise_2">
<div class="center illu_text text2" v-if="viewportWidth > 800">
        <span class="paragraph blue bold">Kreativität</span>
        <br>
        <div class="left">
            <span class="info blue">Durch die fortlaufende Weiterbildung unserer Therapeuten und ihre <strong>kreative</strong> Herangehensweise an die Behandlung gewährleisten wir eine professionelle Physiotherapie gemäss den aktuellen Standards.</span>
        </div>
    </div>
<IconLineDot v-if="viewportWidth > 800" class="icon icon_2 line"/>
<BaseButtonBlue @click="popup2 = !popup2" v-if="viewportWidth < 800" class=" icon icon_2 margin_button"><span class="info">Kreativität</span></BaseButtonBlue>
<img class="icon icon_3" src="../../assets/images/icon_expertise_3.svg" alt="expertise_3">
<div class="center illu_text text3" v-if="viewportWidth > 800">
        <span class="paragraph blue bold">Vertrauen und Respekt</span>
        <br>
        <div class="left">
            <span class="info blue">Unsere Patienten und deren <strong>Vertrauen</strong> stehen für uns immer im Mittelpunkt der Therapie.
Für eine erfolgreiche Therapie ist eine <strong>respektvolle</strong> Beziehung und eine offene Kommunikation zwischen Patienten und Therapeuten elementar.</span>
        </div>
    </div>
<IconLineDot v-if="viewportWidth > 800" class="icon icon_3 line"/>
<BaseButtonBlue @click="popup3 = !popup3" v-if="viewportWidth < 800" class=" icon icon_3 margin_button"><span class="info">Vertrauen und Respekt</span></BaseButtonBlue>
</div>




<Teleport to="body">
<BasePopUp v-if="popup1" :theheight="'fit-content'">
    <BaseCloseButton @click="popup1 = !popup1"/>
    <br>
        <div class="center_flex height">
            <span class="title bold blue">Wertschätzung</span>
            <br>
            <span class="paragraph">Wir pflegen eine <strong>wertschätzende</strong> und unterstützende Umgebung, in der wir kreativ auf die individuellen Ziele unserer Patienten eingehen.</span>
            <br>

        </div>
        
</BasePopUp>
</Teleport>
<Teleport to="body">
<BasePopUp v-if="popup2" :theheight="'fit-content'">
    <BaseCloseButton @click="popup2 = !popup2"/>
    <br>
    <div class="center_flex height">
            <span class="title bold blue">Kreativität</span>
            <br>
            <span class="paragraph">Durch die fortlaufende Weiterbildung unserer Therapeuten und ihre <strong>kreative</strong> Herangehensweise an die Behandlung gewährleisten wir eine professionelle Physiotherapie gemäss den aktuellen Standards.</span>
            <br>

        </div>
</BasePopUp>
</Teleport>
<Teleport to="body">
<BasePopUp v-if="popup3"  :theheight="'fit-content'">
    <BaseCloseButton @click="popup3 = !popup3" />
    <br>
        <div class="center_flex height">
            <span class="title bold blue">Vertrauen und Respekt</span>
            <br>
            <span class="paragraph">Unsere Patienten und deren <strong>Vertrauen</strong> stehen für uns immer im Mittelpunkt der Therapie.
Für eine erfolgreiche Therapie ist eine <strong>respektvolle</strong> Beziehung und eine offene Kommunikation zwischen Patienten und Therapeuten elementar.</span>
            <br>

        </div>
       
</BasePopUp>
</Teleport>

    </BaseBox>
</template>
<script>


import IconExpertiseContainer from '../icon/IconExpertiseContainer.vue';
import IconExpertiseContainerVertical from '../icon/IconExpertiseContainerVertical.vue';
import IconLineDot from '../icon/IconLineDot.vue';

export default{
components:{
    IconExpertiseContainer,
    IconExpertiseContainerVertical,
    IconLineDot,
   

},
data() {
    return {
      viewportWidth: window.innerWidth,
      popup1:false,
      popup2:false,
      popup3:false,
      isSafari: /^((?!chrome|android).)*safari/i.test(navigator.userAgent),
    };
  },
  created() {
    // Listen for window resize events to update viewportWidth
    window.addEventListener('resize', this.handleResize);
  },
  destroyed() {
    // Remove the resize event listener when the component is destroyed
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    handleResize() {
      // Update viewportWidth when the window is resized
      this.viewportWidth = window.innerWidth;
    },
  },
};
</script>

<style scoped>
.basebox{
    height: 1000px;
}
.illustration{
    width: fit-content;
    position: relative;
    display: table;
    margin-left: auto;
    margin-right: auto;

}
.illu_background{
    width: 100%;
    max-height: 1500px;
    display: block;
    margin-left: auto;
    margin-right: auto;
    position: relative;
}
.illu_text{
    width: 22vw;
    position: absolute;
    top: 140%;
}
.text1{
    left: -2%;
}
.text2{
    left: 50%;
    transform: translateX(-50%);
}
.text3{
    right: -2%;
}
.icon{
    position: absolute;
    width: 15%;
}
.icon_1{
 
    width: 15%;
    left: 6%;
    top: 45%;
    transform: translateY(-50%);

}
.icon_2{
 
 width: 15%;
 left: 50%;
 top: 45%;
 transform: translate(-50%, -50%);

}
.line{
    top: 120% !important;
}
.icon_3{
 
 width: 15%;
 right: 6%;
 top: 45%;
 transform: translateY(-50%);

}
.margin_button{
    margin-top: 45%;
}
.height{
    height: 100%;
}
    .safari{
    width: 1306px !important;
}

@media (max-width:1490px){
    .line{
    top: 33vw !important;
}
.safari{
    width: 100% !important;
}
.illu_text{

    top: 40vw;
}
}
@media (max-width:800px){
    .basebox{
    height: inherit;
}
    .illu_background{
height: inherit;
}
.illustration{
    width: 100%;
    position: relative;
    display: block;
    margin-left: 0px;
    margin-right: auto;

}
.icon{
    width: 50%;
}
.icon_1{

    left: 50%;
    top: 8%;
    transform: translateX(-50%) !important;

}
.icon_2{

left: 50%;
top: 42%;
transform: translateX(-50%) !important;

}
.icon_3{
left: 50%;
top:80%;

transform: translateX(-50%) !important;

}
}</style>