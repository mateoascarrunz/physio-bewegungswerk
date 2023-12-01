<template>
    <BaseBox class="base_box">
            <div class="center_flex index_high" >
                <div class="center_flex z-1 contact_text">
                <span class="title bold blue">Kontakt</span>
                <br>
                <br>
                <br>
                <div>
                <span class="paragraph">
                 <IconLocation class="icon"/><span class="paragraph"> Bergstrasse 3, 8625 Gossau</span>
                </span>
                <br>

                <span class="paragraph">
                  <IconPhoneLine class="icon"/> <span class="paragraph"> 044 543 63 68</span>
                </span>
                <br>

                <span class="paragraph">
                    <IconPhoneLine class="icon"/><span class="paragraph"> 076 543 63 68 (mobil)</span>
                </span>
                <br>

                <span class="paragraph">
                   <IconEmailLine class="icon"/><span class="paragraph"> info@physio-bewegungswerk.ch</span>
                </span>
            </div>
                <br>
           

            </div>
            <div class="contact_box center z-1">
                <div class="info_contact">
                <span class="info"><strong>Termine nach Vereinbarung</strong></span>
                <br>
                <span class="info">Parkplätze vor der Praxis vorhanden </span>
            </div>
        </div>
                <BaseContactBox>
                <IconLinkedin class="btn_link" @click="openURL"/>
                <IconPhone class="btn_link" @click="makePhoneCall"/>
                <IconEmail class="btn_link" @click="sendEmail"/>
            </BaseContactBox>

            </div>
            <img class="logo" src="../../assets/images/physio_icon.svg" alt="">
        </BaseBox>
</template>
<script>
import BaseContactBox from '../base/BaseContactBox.vue';
import IconLocation from '../icon/IconLocation.vue';
import IconPhoneLine from '../icon/IconPhoneLine.vue';
import IconEmailLine from '../icon/IconEmailLine.vue';
import IconLinkedin from '../icon/IconLinkedIn.vue';
import IconPhone from '../icon/IconPhone.vue';
import IconEmail from '../icon/IconEmail.vue';
export default{
    components:{
        BaseContactBox,
        IconLocation,
        IconPhoneLine,
        IconEmailLine,
        IconLinkedin,
        IconPhone,
        IconEmail,

    
    },
    methods:{
        sendEmail() {
      window.location.href = 'mailto:info@physio-bewegungswerk.ch';
    },
    openURL() {
      window.open('https://www.linkedin.com/company/100080030', '_blank');
    },
    makePhoneCall() {
      window.location.href = 'tel:0445436368';
    },
    }
}</script>
<style scoped>

.index_high{
    z-index: 2;
    position: relative;
}
.btn_link{
    z-index: 2;
    position: relative;
}
.contact_text{
    margin-bottom: 200px;
    margin-top: 100px;
    z-index: 2;

}
.contact_box{
position: absolute;
bottom: 0px;
width: 100%;
left: 50%;
transform: translateX(-50%);
min-width: 500px;
}
.info_contact{
position: absolute;
left: 50%;
transform: translateX(-50%);
bottom: 120px;
}
.logo{
    position: absolute;
    bottom: 0px;
    right: 20px;
    height: 80%;
    opacity: 0.1;
    z-index: 0;
}
.icon{
    width: 30px;
}
.base_box{
    overflow-x: hidden;
}

</style>