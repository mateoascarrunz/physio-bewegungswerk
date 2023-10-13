
<template>
<BasePageTransition></BasePageTransition>
    <DropdownMenu v-if="Popup"> 
    <div  class="dropdown_button " v-for="service in services"  :key="service.title">
        <BaseButtonBlue  @click="selectService(service)" >{{service.title}}</BaseButtonBlue>
        
    </div>
        

    </DropdownMenu>
    <div class="container_first_box">
        <div class="grid_container">
            <BaseBox class=" grid-col-2">
                <div class="container">

                <div class="margin_title center">
                    <span class="title blue bold center">Therapieangebot</span>
                </div>
                <br>
                <span class="paragraph left">Herzlich willkommen im <strong class="bold">Physio Bewegungswerk!</strong>
                    <br>
                    <br>
                    Wir sind hier, um Ihnen nicht nur therapeutische Dienstleistungen anzubieten, sondern auch dabei zu unterstützen, ein aktiveres Leben zu führen. Wir stehen Ihnen zur Verfügung, um Sie auf Ihrer Reise zu begleiten und die bestmögliche Betreuung zu gewährleisten.
                   <br>
                    <br>
                    Entdecken Sie unsere verschiedenen Ansätze und bewährten Techniken:
Jeder Mensch ist einzigartig, daher haben auch unsere Patienten individuelle Beschwerden, Bedürfnisse und Ziele. Wir bieten eine breite Palette bewährter Methoden und Techniken an, um Ihre spezifischen Anforderungen zu erfüllen und Ihre persönlichen Ziele zu erreichen.
<br>
<br>
Egal, ob Sie sich von einer Operation erholen, mit chronischen Schmerzen kämpfen oder einfach Ihre Beweglichkeit und Lebensqualität verbessern möchten – wir sind hier, um Ihre Bedürfnisse zu verstehen und gemeinsam mit Ihnen passende Lösungen zu erarbeiten.</span>
                <!-- services -->
                <div class="container services_container">
                    <div class="row no_padding">
                        <div class="col-lg-4 order-last ">
                            <div class="sticky_element">
                            <div class="img_services_container center">
                               
                                <img v-if="selectedService !== null" class="img_services" :src="'/src/assets/images/' + selectedService.img" alt="">
                                <img v-if="selectedService === null" class="icon" src="../../assets/images/physio_icon.svg" alt="">
                                
                            </div>
                            <div class="text_info_btns center">
                                <span class="paragraph">Haben Sie Fragen?</span>
                                <br>
                                <div class="btn_ask">
                                    <BaseButtonBlue>Kontakt</BaseButtonBlue>
                                    <BaseButtonBlue>FAQ</BaseButtonBlue>
                                </div>
                                </div>
                        </div>
                        </div>
                        <div class="col-lg-8 order-first  text_services">
                            <span class="paragraph">Hier sind einige unserer herausragenden Dienstleistungen:</span>
                            <br>
                            <br>
                            <BaseButtonBlue @click="Popup = !Popup" class="services_button"><span v-if="selectedService !== null"  class="paragraph text_break" >{{ selectedService.title }}</span><span v-if="selectedService === null" class="subtitle">Wählen Sie eine Dienstleistung  +</span></BaseButtonBlue>
                            <br>
                            <br>
                            <span v-if="selectedService !== null" class="paragraph block" v-for="(paragraph, index) in selectedService.description" :key="index" v-html="paragraph"></span>
                        </div>
                    </div>
                </div>
            </div>
            </BaseBox>
    </div>
</div>
</template>

<script>
import DropdownMenu from  './DropdownMenu.vue'
export default{
    components:{
        DropdownMenu,
    },
    data(){
        return{
            Popup: false,
            selectedService: null,
            services:[
                {
                   title:'Myofasziale Triggerpunkt-Therapie',
                   description:['Bei der myofaszialen Triggerpunkt-Therapie werden Triggerpunkte mit gezielten Behandlungsgriffen behandelt. Mit einzelnen Fingern wird Druck auf die Verhärtung im Muskel ausgeübt, umso eine Normalisierung der Blutzirkulation und der Spannungsverhältnisse zu erreichen'],
                   img:'img_services_1.jpeg', 
                   vertical: true,
                },
                {
                   title:'Manuelle Therapie',
                   description:['Die manuelle Therapie in der Physiotherapie ist ein spezieller Ansatz zur Diagnose und Behandlung von Muskel-Skelett-Erkrankungen, die sich auf die Verwendung manueller Techniken durch Physiotherapeuten konzentriert. Diese Techniken beinhalten die gezielte Anwendung von Mobilisation, Gleitbewegungen, Traktion und Kompression, um Schmerzen zu lindern, die Gelenkbeweglichkeit zu verbessern, Muskelverspannungen zu lösen und die Funktion des Muskel-Skelett-Systems zu optimieren'],
                   img:'img_services_2.jpeg', 
                },
                {
                   title:'Postoperative Rehabilitation ',
                   description:[
        `
        Die postoperative Physiotherapie, auch als postoperative Rehabilitation oder postoperative Physiotherapie genannt, ist ein entscheidender Bestandteil des Genesungsprozesses nach chirurgischen Eingriffen. Ihr Hauptziel ist es, die Funktion und Mobilität des Patienten nach einer Operation wiederherzustellen oder zu verbessern, Schmerzen zu lindern und Komplikationen zu verhindern.
        `,
        `
        <strong>Bewertung und Diagnose:</strong> Die Rehabilitation beginnt normalerweise mit einer gründlichen Bewertung des Gesundheitszustands des Patienten, seiner funktionellen Fähigkeiten und der spezifischen Einschränkungen nach der Operation.
        `,
        `
        <strong>Schmerzkontrolle:</strong> Die Kontrolle von postoperativen Schmerzen ist ein wichtiger Bestandteil der Physiotherapie. Der Physiotherapeut kann Schmerzlinderungstechniken wie manuelle Therapie, Übungen und andere nicht-medikamentöse Ansätze anwenden.
        `,
        `
        <strong>Förderung der Mobilität:</strong> Die Physiotherapie zielt darauf ab, die Mobilität des Patienten zu fördern. Dies kann Übungen zur Verbesserung der Gelenkbeweglichkeit und Muskelkraft sowie Gehtraining und die Wiedererlangung der Selbstständigkeit bei alltäglichen Aktivitäten umfassen.
        `,
        `
        <strong>Vermeidung von Komplikationen:</strong> Postoperative Physiotherapie zielt auch darauf ab, Komplikationen zu verhindern, wie z. B. Thrombosen (Blutgerinnsel) oder Druckgeschwüre durch Immobilität. Dies kann durch gezielte Übungen und Mobilisation erreicht werden.
        `,
        `
        <strong>Anleitung und Schulung:</strong> Patienten erhalten Anleitung und Schulung in Bezug auf Übungen und Aktivitäten, die sie zu Hause oder in einer Rehabilitationsumgebung durchführen können, um die Genesung zu unterstützen.
        `,
        `
        <strong>Fortschrittsüberwachung:</strong> Die Rehabilitation wird eng überwacht, und der Therapieplan kann entsprechend den Fortschritten des Patienten angepasst werden.
        `,
        `
        <strong>Psychologische Unterstützung:</strong> Die postoperative Rehabilitation kann physisch und emotional anspruchsvoll sein. Physiotherapeuten bieten oft auch psychologische Unterstützung, um den Patienten bei der Bewältigung der emotionalen Aspekte der Genesung zu helfen.
        `,
        `
        Die postoperative Physiotherapie kann nach einer Vielzahl von Operationen erforderlich sein, einschließlich orthopädischer Eingriffe wie Hüft- oder Knieersatz, Herzoperationen, Bauchchirurgie, Wirbelspäuleneingriffen und vielen anderen. Sie ist entscheidend, um eine vollständige Genesung zu unterstützen und die Rückkehr des Patienten zu einem aktiven und funktionalen Leben zu ermöglichen.
        `,
      ],
                   img:'img_services_3.jpeg', 
                },
                {
                   title:'Rehabilitation und MTT',
                   description:[`MTT steht für "Medizinische Trainingstherapie" oder auch "Medizinisches Training" und ist eine wichtige Komponente in der Physiotherapie und Rehabilitation. Es handelt sich um ein spezialisiertes Training, das darauf abzielt, die körperliche Leistungsfähigkeit, Funktion und Mobilität von Patienten zu verbessern oder wiederherzustellen, die aufgrund von Verletzungen, Krankheiten oder chirurgischen Eingriffen eingeschränkt sind. Es wird auf Antrag bei der Krankenkasse während drei Monaten bis zu 36 mal übernommen.`,
        `Die Medizinische Trainingstherapie hat das Hauptziel, die funktionelle Gesundheit des Patienten zu fördern. Dies wird erreicht, indem gezielte Übungen und Trainingsprogramme entwickelt werden, die speziell auf die individuellen Bedürfnisse und die medizinische Geschichte des Patienten zugeschnitten sind.`,
        `Jedes MTT-Programm wird auf den individuellen Gesundheitszustand, die Diagnose und die Rehabilitationsziele des Patienten abgestimmt.`,
        `Die MTT umfasst eine breite Palette von Übungen, die darauf abzielen, die Muskeln, Gelenke und andere Gewebe des Körpers zu stärken, die Beweglichkeit zu verbessern und die Ausdauer zu erhöhen. Dies kann sowohl mit Hilfe von Geräten als auch mit freien Gewichten oder körpergewichtsbasierten Übungen erfolgen.`,
        `Während des MTT-Programms wird der Fortschritt des Patienten sorgfältig überwacht, und das Programm wird bei Bedarf angepasst, um sicherzustellen, dass die Rehabilitation erfolgreich verläuft.`,
        `Die Medizinische Trainingstherapie wird in verschiedenen medizinischen Bereichen eingesetzt, darunter:`,
        `Orthopädie: Zur Rehabilitation nach orthopädischen Eingriffen wie Gelenkersatz oder Verletzungen wie einem Bandscheibenvorfall.`,
        `Kardiologie: Zur Verbesserung der Herz-Kreislauf-Gesundheit bei Patienten mit Herzproblemen.`,
        `Neurologie: Bei Erkrankungen des Nervensystems wie Schlaganfall oder Parkinson, um die Muskelkontrolle und Mobilität zu verbessern.`,
        `Sportmedizin: Zur Verletzungsprävention und -rehabilitation bei Sportlern.`,],
                   img:'img_services_4.jpeg', 
                },
                {
                   title:'Manuelle Lymphdrainage inkl. Kompressionsbehandlung',
                   description:['Manuelle Lymphdrainage inkl. Kompressionsbehandlung '],
                   img:'img_services_5.jpeg', 
                },
                {
                   title:'Neurologische Rehabilitation nach Bobath (Schlaganfall, M. Parkinson, MS) ',
                   description:[`Neurologische Rehabilitation in der Physiotherapie ist ein ganzheitlicher Ansatz, der darauf abzielt, die Lebensqualität von Menschen mit neurologischen Beeinträchtigungen zu verbessern, ihre Selbstständigkeit zu fördern und die Fähigkeit zur Teilnahme am täglichen Leben zu maximieren. Es ist wichtig, dass diese Art der Rehabilitation von spezialisierten Physiotherapeuten durchgeführt wird, die über das notwendige Wissen und die Erfahrung in der Behandlung neurologischer Erkrankungen verfügen.`,
        `Die neurologische Rehabilitation in der Physiotherapie ist ein Spezialgebiet, das sich auf die Rehabilitation von Menschen mit neurologischen Erkrankungen oder Verletzungen des Nervensystems konzentriert. Dies kann Erkrankungen wie Schlaganfall, zerebrale Lähmung, Multiple Sklerose, Parkinson-Krankheit, Rückenmarkverletzungen und andere neurologische Störungen umfassen. Das Hauptziel der neurologischen Rehabilitation in der Physiotherapie besteht darin, die Funktion und die Lebensqualität von Menschen mit neurologischen Beeinträchtigungen zu verbessern.`,
        `Wir beide sind ausgebildete Bobath-Therapeuten und erarbeiten gemeinsam mit dem Patienten an einem von ihm festgelegten Ziel.`,
        `Bei vielen neurologischen Erkrankungen ist die Wiederherstellung der Gehfähigkeit ein wichtiges Ziel. Wir Physiotherapeuten arbeiten an Gangtraining und Mobilitätstechniken, um den Patienten zu helfen, sicherer und selbstständiger zu gehen.`],
                   img:'img_services_6.jpeg', 
                },
                {
                   title:'Ultraschalltherapie',
                   description:[`Die Ultraschalltherapie ist eine medizinische Behandlungsmethode, bei der hochfrequente Schallwellen verwendet werden, um gezielte Gewebetiefe im Körper zu erreichen.`,
        `Bei der Ultraschalltherapie werden Schallwellen mit einer Frequenz oberhalb des hörbaren Bereichs erzeugt. Diese Schallwellen können in das Körpergewebe eindringen, ohne die Haut zu verletzen.`,
        `Die Schallwellen erzeugen durch mechanische Schwingungen Wärme im Gewebe. Diese Erwärmung kann dabei helfen, Schmerzen zu lindern, die Durchblutung zu verbessern und die Muskelentspannung zu fördern.`,
        `Die Ultraschalltherapie wird häufig bei muskulären Verletzungen, Entzündungen und Schmerzen eingesetzt. Sie kann auch zur Behandlung von Sehnen- und Gelenkproblemen verwendet werden.`,
        `Während der Behandlung wird ein Ultraschallgel auf die Haut aufgetragen, um die Übertragung der Schallwellen zu verbessern. Ein Therapeut bewegt ein Handgerät, das die Schallwellen erzeugt, sanft über die betroffene Stelle.`,
        `Ultraschalltherapie gilt in der Regel als sicher und nicht-invasiv. Sie wird oft als Teil eines umfassenderen Rehabilitationsplans eingesetzt.`,],
                   img:'img_services_7.jpeg', 
                },
                {
                   title:'Atemtherapie',
                   description:['Erkrankungen der Lunge, Nachbehandlung nach Covid'],
                   img:'img_services_8.jpeg', 
                },
                {
                   title:'Geratrische Rehabilitation inkl. Sturzprophylaxe',
                   description:[`Die geriatrische Physiotherapie ist ein spezialisiertes Gebiet der Physiotherapie, das sich auf die Gesundheit und Rehabilitation älterer Menschen konzentriert. Mit zunehmendem Alter treten oft körperliche Veränderungen und gesundheitliche Herausforderungen auf, die eine spezielle Herangehensweise erfordern. Die geriatrische Physiotherapie zielt darauf ab, die Lebensqualität, die Mobilität und die Unabhängigkeit von älteren Menschen zu verbessern oder aufrechtzuerhalten.`,
        `Funktionserhalt und -verbesserung: Die Therapie konzentriert sich darauf, die alltäglichen Funktionen und Aktivitäten, wie Gehen, Aufstehen, Sitzen und Anziehen, zu erhalten oder zu verbessern. Dies trägt dazu bei, die Selbstständigkeit und Lebensqualität älterer Menschen zu steigern.`,
        `Sturzprävention: Stürze sind bei älteren Menschen eine häufige Ursache für Verletzungen. Die geriatrische Physiotherapie beinhaltet Übungen und Techniken zur Verbesserung des Gleichgewichts und der Stabilität, um das Sturzrisiko zu minimieren.`,
        `Schmerzmanagement: Viele ältere Menschen leiden an chronischen Schmerzen, sei es aufgrund von Arthrose, Osteoporose oder anderen Erkrankungen. Die Physiotherapeuten helfen bei der Schmerzlinderung und fördern die Beweglichkeit.`,
        `Rehabilitation nach Krankheit oder Verletzung: Nach einem Schlaganfall, einer Hüftfraktur oder anderen gesundheitlichen Ereignissen kann die geriatrische Physiotherapie eine wichtige Rolle bei der Wiederherstellung der Funktion und Mobilität spielen.`,
        `Mobilität und Fitness: Die Therapeuten fördern regelmäßige körperliche Aktivität, um die allgemeine Gesundheit und Fitness älterer Menschen zu erhalten. Dies kann die Herz-Kreislauf-Fitness, Muskelkraft und Ausdauer verbessern.`,
        `Anpassung an altersbedingte Veränderungen: Im Alter können Veränderungen wie Muskelschwund, Gelenksteifigkeit und verminderte Flexibilität auftreten. Die geriatrische Physiotherapie hilft dabei, mit diesen Veränderungen besser umzugehen und sie zu minimieren.`,
        `Kommunikation und Zusammenarbeit: Physiotherapeuten in der geriatrischen Rehabilitation arbeiten oft eng mit anderen Gesundheitsdienstleistern zusammen, um die umfassende Versorgung älterer Menschen sicherzustellen.`,
        `Die geriatrische Physiotherapie zielt darauf ab, ältere Menschen dabei zu unterstützen, aktive, unabhängige und qualitativ hochwertige Leben zu führen. Die Therapiepläne sind in der Regel individuell angepasst und berücksichtigen die spezifischen Bedürfnisse und Gesundheitszustände jedes Patienten.`,],
                   img:'img_services_9.jpeg', 
                },
                {
                   title:'Domizilbehandlungen / Hausbesuche',
                   description:[`Die Physiotherapie im häuslichen Umfeld ist eine Form der medizinischen Versorgung, bei der Physiotherapeuten Patienten in ihrem eigenen Zuhause behandeln.`,
        `Diese Art der Versorgung kann für Personen erforderlich sein, die aufgrund von Mobilitätsproblemen, schweren Krankheiten oder anderen gesundheitlichen Einschränkungen nicht in der Lage sind, in eine Praxis oder ein Krankenhaus zu gehen.`,],
                   img:'img_services_10.jpeg', 
                },
                {
                   title:'Mobilisation nach Mulligan',
                   description:[`Die Mulligan-Konzept-Physiotherapie ist eine spezialisierte physiotherapeutische Methode, die von dem neuseeländischen Physiotherapeuten Brian Mulligan entwickelt wurde. Diese Methode befasst sich hauptsächlich mit der Diagnose und Behandlung von Muskel-Skelett-Problemen und -Schmerzen. Das Mulligan-Konzept basiert auf manuellen Therapieansätzen und Übungen, die darauf abzielen, Schmerzen zu lindern, Beweglichkeit und Funktion wiederherzustellen und Fehlfunktionen des Muskel-Skelett-Systems zu korrigieren.`,
        `Hier sind einige der Grundprinzipien und Techniken des Mulligan-Konzepts:`,
        `Mobilisation mit Bewegung (MWM): Ein Schlüsselprinzip des Mulligan-Konzepts ist die Mobilisation von Gelenken während aktiver Bewegungen des Patienten. Der Physiotherapeut führt sanfte manuelle Techniken aus, um die Gelenke in eine verbesserte Position zu bringen, während der Patient eine bestimmte Bewegung durchführt. Dies kann dazu beitragen, Schmerzen zu lindern und die Beweglichkeit zu erhöhen.`,
        `Schmerz als Leitfaden: Schmerz ist ein wichtiger Leitfaden im Mulligan-Konzept. Wenn ein Patient während einer Bewegung Schmerzen empfindet, signalisiert dies dem Therapeuten, dass eine bestimmte Korrektur oder Technik angewendet werden sollte, um den Schmerz zu lindern und die Funktion zu verbessern.`,
        `Dynamische Bandagen und Tapes: Das Mulligan-Konzept beinhaltet manchmal den Einsatz von speziellen Bändern und Tapes, um die Gelenkbewegung zu unterstützen und zu stabilisieren.`,
        `Korrektur von Fehlfunktionen: Das Ziel des Konzepts ist es, Funktionsstörungen im Muskel-Skelett-System zu korrigieren. Dies kann durch die gezielte Anwendung von Mobilisationstechniken und Übungen erreicht werden.`,
        `Patientenaktive Beteiligung: Im Mulligan-Konzept wird viel Wert auf die aktive Beteiligung des Patienten gelegt. Der Patient wird ermutigt, Übungen und Bewegungen aktiv auszuführen, während der Therapeut die notwendigen manuellen Korrekturen vornimmt.`,
        `Individuelle Anpassung: Die Therapiepläne im Mulligan-Konzept sind individuell auf die Bedürfnisse und Ziele des Patienten zugeschnitten. Der Therapeut berücksichtigt den spezifischen Zustand und die Symptome des Patienten.`,
      ],
                   img:'img_services_11.jpeg', 
                },
                {
                   title:'Kinesio - Tape',
                   description:['Kinesio - Tape'],
                   img:'img_services_12.jpeg', 
                },


            ]
        }
    },
    methods:{

    
    selectService(service) {
      this.selectedService = service;
      this.Popup = false; 
    },
}
}
</script>

<style scoped>
.margin_title {
    margin-top: 60px;
}
.img_services_container{
    border-radius: 50px;
    background-color: rgba(255, 255, 255, 1);
    aspect-ratio: 1/1;
    width: 100%;
    overflow: hidden;
    display: block;
    margin-left: auto;
    margin-right: auto;
    max-width: 500px;
    margin-top: 50px;
}
.sticky_element{
    position: sticky;
    top: 121px; 
}
.img_services{
    height: 100%;
    opacity: 0.5;
    background-color: white;

}
.services_button{
    display: block;
    width: 100%;
    padding-bottom: 15px;
    padding-top: 15px;
}
.text_services{
    display: flex;
    flex-direction: column;
    padding-right: 5%;
}
.dropdown_button{
    margin-top: 10px;
    margin-bottom: 10px;
    padding-left: 5%;
    padding-right: 5%;
}
.icon{
    position: absolute;
    left: 50%;
    top: 40%;
    transform: translate(-50%, -50%);
    width: 50%;
    opacity: 0.5;
}
.block{
    display: block;
    margin-bottom: 20px;
}
.text_info_btns{
    position: relative;
    margin-top: 20px;
    display: flex;
    flex-direction: column;

}
.btn_ask{
    display: flex;
    justify-content: space-evenly;
}
.no_padding{
    padding-left: 0px !important;
    padding-right: 0px !important;
}
.paragraph{
    line-height: inherit;
}

@media (max-width:990px){
    .text_services{

    padding-right: 0px;
    padding-left: 0px;
}
}
</style>