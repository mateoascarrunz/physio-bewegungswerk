<template>
    <ServicesContainer></ServicesContainer>
</template>
<script>
import ServicesContainer from '../components/dienstleistungen-services/ServicesContainer.vue';
export default{
    metaInfo: {
    title: 'Therapieangebot - Physio Bewegungswerk',
    meta: [
      { name: 'description', content: 'Herzlich willkommen beim Phyiso Bewegungswerk. Wir freuen uns, Ihnen nicht nur therapeutische Dienstleistungen anzubieten, sondern Ihnen bei der Verbesserung Ihrer Lebensqualität zu helfen. Unser Team steht Ihnen zur Verfügung, um Sie auf Ihrem Weg zu begleiten und die bestmögliche Betreuung zu gewährleisten. Unsere Ansätze und Techniken umfassen eine breite Palette bewährter Methoden, da jeder Mensch einzigartige Beschwerden, Bedürfnisse und Ziele hat. Wir passen unsere Herangehensweise an, um Ihre individuellen Anforderungen zu erfüllen und Ihre persönlichen Ziele zu erreichen.' },
    ]
    },
    components:{
        ServicesContainer,
    }
}
</script>