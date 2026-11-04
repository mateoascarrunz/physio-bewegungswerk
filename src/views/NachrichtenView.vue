<template>
<NachrichtenContainer/>
</template>
<script>
import NachrichtenContainer from '../components/nachrichten/NachrichtenContainer.vue';
export default{
    metaInfo: {
    title: 'News - Physio Bewegungswerk',
    meta: [
      { name: 'description', content: 'Bleibe auf dem neuesten Stand in der Welt der Physiotherapie. Unsere News-Sektion bietet aktuelle Informationen, Forschungsergebnisse und Expertenmeinungen rund um physiotherapeutische Methoden, Gesundheitstipps und inspirierende Geschichten von Patienten. Entdecke die neuesten Entwicklungen und praktischen Ratschläge, um deine Gesundheit und Lebensqualität zu verbessern.' },
    ]
    },
    components:{
        NachrichtenContainer
    }
}</script>