
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
                <span class="paragraph left">
                    Herzlich willkommen beim <strong class="bold">Phyiso Bewegungswerk.</strong> Wir freuen uns, Ihnen nicht nur therapeutische Dienstleistungen anzubieten, sondern Ihnen bei der Verbesserung Ihrer Lebensqualität zu helfen. Unser Team steht Ihnen zur Verfügung, um Sie auf Ihrem Weg zu begleiten und die bestmögliche Betreuung zu gewährleisten.
                   <br>
                    <br>
                    Unsere Ansätze und Techniken umfassen eine breite Palette bewährter Methoden, da jeder Mensch einzigartige Beschwerden, Bedürfnisse und Ziele hat. Wir passen unsere Herangehensweise an, um Ihre individuellen Anforderungen zu erfüllen und Ihre persönlichen Ziele zu erreichen.
<br>
<br>
Egal, ob Sie sich von einer Operation erholen, mit chronischen Schmerzen kämpfen oder Ihre Beweglichkeit und Lebensqualität verbessern möchten, wir sind hier, um gemeinsam geeignete Lösungen zu entwickeln.</span>
<br>
<br>
                <!-- services -->
                <div class="container services_container">
                    <div class="row no_padding">
                        <div class="col-lg-4 order-last ">
                            <div class="sticky_element">
                            <div class="img_services_container center">
                               
                                <img v-if="selectedService !== null" class="img_services" :class="{ 'services_vertical': selectedService.vertical }" :src="'/src/assets/images/' + selectedService.img" alt="">
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
                            <span class="paragraph">Hier sind unsere Dienstleistungen:</span>
                            <br>
                            <br>
                            <BaseButtonBlue @click="Popup = !Popup" class="services_button relative"><span v-if="selectedService !== null"  class="paragraph text_break" >{{ selectedService.title }}</span><span v-if="selectedService === null" class="subtitle">Wählen Sie eine Dienstleistung  +</span>
                            <div class="btn_message left" v-if="selectedService === null">
                                <IconArrow class="arrow"></IconArrow>
                                <span class="paragraph  magenta">Wählen Sie eine Dienstleistung,
                                    <br> 
um mehr zu erfahren</span>
                            </div></BaseButtonBlue>
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
import IconArrow from '../icon/IconArrow.vue';
export default{
    components:{
        DropdownMenu,
        IconArrow
    },
    data(){
        return{
            Popup: false,
            selectedService: null,
            services:[
                {
                   title:'Myofasziale Triggerpunkt-Therapie',
                   description:[`Die Triggerpunkttherapie ist eine Behandlungsmethode, die darauf ausgerichtet ist, schmerzhafte Triggerpunkte in den Muskeln zu identifizieren und gezielt zu behandeln. Triggerpunkte sind lokale Verhärtungen in den Muskeln, die aufgrund von Verspannungen, Verletzungen oder anderen Ursachen auftreten können. Diese schmerzhaften Knoten in den Muskeln führen oft zu Beschwerden und können die Beweglichkeit einschränken.`,
        `Der Prozess der Triggerpunkttherapie beginnt mit der Identifizierung der Triggerpunkte. Dies geschieht oft durch manuelle Untersuchung und das Ertasten von schmerzhaften Stellen im Muskelgewebe.`,
        `Sobald die Triggerpunkte identifiziert sind, werden verschiedene Techniken angewendet, um sie zu behandeln. Dies umfasst in der Regel manuellen Druck, bei dem der Therapeut gezielt Druck auf die Triggerpunkte ausübt, um die Verspannungen zu lösen. Gleichzeitig können spezielle Dehnungsübungen gezeigt werden, um die Muskeln zu entspannen und die Flexibilität zu fördern.`,
        `Die Therapie kann auch Massage und myofasziale Techniken beinhalten, um die Muskulatur weiter zu entspannen und die Durchblutung zu verbessern. Oft erhält der Patient Anleitungen für Selbstmanagement-Techniken, einschließlich der Möglichkeit, Triggerpunkte selbst zu massieren und Dehnungsübungen zu Hause durchzuführen, um die Schmerzen zu lindern.`,
        `Diese Therapie kann bei verschiedenen Erkrankungen eingesetzt werden, bei denen Muskelverspannungen und schmerzhafte Triggerpunkte eine Rolle spielen, wie beispielsweise bei Nacken- und Rückenschmerzen, Kopfschmerzen, Tennisellenbogen und Fibromyalgie. Trotz möglicher Schmerzen während der Therapie zielt die Triggerpunkttherapie darauf ab, langfristige Linderung und eine verbesserte Muskelgesundheit zu bieten.`,],
                   img:'img_services_myofasziale.jpg', 
                   vertical: true,
                },
                {
                   title:'Manuelle Therapie',
                   description:[`Die manuelle Therapie in der Physiotherapie ist ein spezieller Ansatz zur Diagnose und Behandlung von Muskel-Skelett-Erkrankungen, die sich auf die Verwendung manueller Techniken durch Physiotherapeuten konzentriert.`,
        `Diese Techniken beinhalten die gezielte Anwendung von Mobilisation, Gleitbewegungen, Traktion und Kompression, um Schmerzen zu lindern, die Gelenkbeweglichkeit zu verbessern, Muskelverspannungen zu lösen und die Funktion des Muskel-Skelett-Systems zu optimieren.`,],
                   img:'img_services_manuelle.jpeg', 
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
                   img:'img_services_postoperative.jpeg', 
                },
                {
                   title:'MTT',
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
                   img:'img_services_mtt.jpeg', 
                },
                {
                   title:'Manuelle Lymphdrainage inkl. Kompressionsbehandlung',
                   description:[`Die Manuelle Lymphdrainage (MLD) ist eine spezielle Technik, die in der Physiotherapie häufig angewendet wird. In diesem Kontext dient die Manuelle Lymphdrainage dazu, lymphatische Stauungen zu behandeln und den Lymphfluss im Körper zu fördern. Physiotherapeuten, die auf MLD spezialisiert sind, nutzen spezifische Handgriffegriffe und Techniken, um die Lymphgefäße anzuregen und Stauungen zu reduzieren. Dabei handelt es sich um eine sanfte und schmerzfreie Technik.`,
        `Die Manuelle Lymphdrainage in der Physiotherapie wird oft bei verschiedenen Gesundheitsproblemen eingesetzt, darunter:`,
        `Lymphödeme: Dies sind Schwellungen, die aufgrund einer gestörten Lymphdrainage auftreten. MLD kann dazu beitragen, diese Schwellungen zu reduzieren und die Lebensqualität der Betroffenen zu verbessern.`,
        `Nach Operationen: Nach chirurgischen Eingriffen kann es zu Schwellungen und Flüssigkeitsansammlungen im operierten Bereich kommen. MLD kann helfen, diese postoperativen Schwellungen zu reduzieren und die Genesung zu unterstützen.`,
        `Traumatische Verletzungen: Bei Verletzungen wie Verstauchungen oder Prellungen kann MLD dazu beitragen, Schwellungen zu verringern und den Heilungsprozess zu beschleunigen.`,
        `Entzündliche Erkrankungen: Bei bestimmten entzündlichen Erkrankungen, wie Rheuma, kann MLD zur Linderung von Schwellungen und Beschwerden beitragen.`,
        `Die Kombination aus Manueller Lymphdrainage und Kompressionsbehandlung ist oft sehr effektiv bei der Behandlung von Lymphödemen und anderen lymphatischen Erkrankungen. Die MLD löst Stauungen und bewegt die Lymphflüssigkeit, während die Kompressionsbehandlung hilft, den Fortschritt der Schwellung zu verhindern und die erzielten Effekte aufrechtzuerhalten.`,
      ],
                   img:'img_services_lymphdrainage.jpg', 
                },
                {
                   title:'Neurologische Rehabilitation nach Bobath (Schlaganfall, M. Parkinson, MS) ',
                   description:[`Neurologische Rehabilitation in der Physiotherapie ist ein ganzheitlicher Ansatz, der darauf abzielt, die Lebensqualität von Menschen mit neurologischen Beeinträchtigungen zu verbessern, ihre Selbstständigkeit zu fördern und die Fähigkeit zur Teilnahme am täglichen Leben zu maximieren. Es ist wichtig, dass diese Art der Rehabilitation von spezialisierten Physiotherapeuten durchgeführt wird, die über das notwendige Wissen und die Erfahrung in der Behandlung neurologischer Erkrankungen verfügen.`,
        `Die neurologische Rehabilitation in der Physiotherapie ist ein Spezialgebiet, das sich auf die Rehabilitation von Menschen mit neurologischen Erkrankungen oder Verletzungen des Nervensystems konzentriert. Dies kann Erkrankungen wie Schlaganfall, zerebrale Lähmung, Multiple Sklerose, Parkinson-Krankheit, Rückenmarkverletzungen und andere neurologische Störungen umfassen. Das Hauptziel der neurologischen Rehabilitation in der Physiotherapie besteht darin, die Funktion und die Lebensqualität von Menschen mit neurologischen Beeinträchtigungen zu verbessern.`,
        `Wir beide sind ausgebildete Bobath-Therapeuten und erarbeiten gemeinsam mit dem Patienten an einem von ihm festgelegten Ziel.`,
        `Bei vielen neurologischen Erkrankungen ist die Wiederherstellung der Gehfähigkeit ein wichtiges Ziel. Wir Physiotherapeuten arbeiten an Gangtraining und Mobilitätstechniken, um den Patienten zu helfen, sicherer und selbstständiger zu gehen.`],
                   img:'img_services_neurologische.jpeg', 
                },
                {
                   title:'Ultraschalltherapie',
                   description:[`Die Ultraschalltherapie ist eine medizinische Behandlungsmethode, bei der hochfrequente Schallwellen verwendet werden, um gezielte Gewebetiefe im Körper zu erreichen. Bei der Ultraschalltherapie werden Schallwellen mit einer Frequenz oberhalb des hörbaren Bereichs erzeugt. Diese Schallwellen können in das Körpergewebe eindringen, ohne die Haut zu verletzen.`,
        `Die Schallwellen erzeugen durch mechanische Schwingungen Wärme im Gewebe. Diese Erwärmung kann dabei helfen, Schmerzen zu lindern, die Durchblutung zu verbessern und die Muskelentspannung zu fördern.`,
        `Die Ultraschalltherapie wird häufig bei muskulären Verletzungen, Entzündungen und Schmerzen eingesetzt. Sie kann auch zur Behandlung von Sehnen- und Gelenkproblemen verwendet werden.`,
        `Während der Behandlung wird ein Ultraschallgel auf die Haut aufgetragen, um die Übertragung der Schallwellen zu verbessern. Ein Therapeut bewegt ein Handgerät, das die Schallwellen erzeugt, sanft über die betroffene Stelle.`,
        `Ultraschalltherapie gilt in der Regel als sicher und nicht-invasiv. Sie wird oft als Teil eines umfassenderen Rehabilitationsplans eingesetzt.`,],
                   img:'img_services_ultraschalltherapie.jpeg', 
                },
                {
                   title:'Elektrotherapie',
                   description:[`Die Elektrotherapie ist eine bewährte Behandlungsmethode, die elektrische Ströme gezielt einsetzt, um Schmerzen zu lindern, die Muskelfunktion zu verbessern und die Gesundheit des Gewebes zu fördern. Diese vielseitige Technik bietet eine Bandbreite von Anwendungen, die auf die individuellen Bedürfnisse der Patienten abgestimmt sind.`,
        `Eine der häufigsten Anwendungen der Elektrotherapie ist die Transkutane Elektrische Nervenstimulation (TENS). Hierbei werden schwache elektrische Impulse mithilfe von Elektroden auf die Haut übertragen, um Schmerzen zu lindern. Diese Methode kann Schmerzsignale im Nervensystem blockieren oder abschwächen.`,
        `Eine weitere wichtige Anwendung ist die Neuromuskuläre Elektrostimulation (NMES), die dazu dient, Muskeln zu stimulieren und zu stärken. Insbesondere bei Muskelschwäche oder nach Verletzungen kann NMES die normale Muskelaktivität wiederherstellen.`,
        `Interferenzstrom (IFS) ist eine Technik, die zwei hochfrequente Wechselströme verwendet, um tiefere Gewebe zu stimulieren. IFS verbessert die Durchblutung und reduziert Schmerzen, insbesondere bei Verletzungen und schmerzhaften Zuständen.`,
        `Schließlich ermöglicht die Iontophorese die gezielte Abgabe von Medikamenten durch die Haut in das Gewebe, was bei entzündlichen Erkrankungen äußerst hilfreich ist.`,
        `Wir passen die Elektrotherapie individuell an die Bedürfnisse jedes Patienten an. Die Art, Menge und Dauer der Elektrotherapie variieren je nach den Symptomen, der Diagnose und dem Gesundheitszustand des Patienten, um eine optimale Schmerzlinderung, Muskelstärkung und Genesung zu gewährleisten.`,],
                   img:'img_services_elektrotherapie.jpeg', 
                },
                {
                   title:'Atemtherapie',
                   description:[`Die Atemtherapie ist eine therapeutische Technik, die darauf abzielt, die Atmung zu verbessern und Atemprobleme zu behandeln.`,
        `Die Kernprinzipien der Atemtherapie umfassen das Bewusstsein für die eigene Atmung, das Erkennen und Korrigieren von ungesunden Atemmustern wie flacher Atmung oder Hyperventilation, die Steigerung der Atemkapazität und -effizienz durch Atemübungen, die gezielte Stärkung der Atemmuskulatur und die Verbesserung der Atemkontrolle.`,
        `Die Therapie kann auch Entspannungstechniken einschließen, die helfen, Stress und Anspannung abzubauen, und den Patienten befähigen, ihre Atmung bewusst zu kontrollieren. In einigen Fällen werden Atemhilfsmittel wie Masken oder Atemgeräte verwendet, um die Atmung zu unterstützen, insbesondere bei Menschen mit schweren Lungenerkrankungen.`,
        `Die Anwendungsgebiete der Atemtherapie sind breit gefächert und umfassen Erkrankungen wie Asthma, chronisch obstruktive Lungenerkrankung (COPD), Atembeschwerden nach Operationen oder Verletzungen, Hyperventilationssyndrom, Atemstörungen bei Schlafapnoe und mehr. Die Therapie ist immer auf die individuellen Bedürfnisse und Symptome des Patienten zugeschnitten.`,
        `Insgesamt dient die Atemtherapie dazu, die Atmung zu optimieren, Atemprobleme zu behandeln und die Lebensqualität der Patienten zu verbessern.`,],
                   img:'img_services_atemtherapie.jpeg', 
                },
                {
                   title:'Geratrische Rehabilitation inkl. Sturzprophylaxe',
                   description:[`Die geriatrische Physiotherapie ist ein spezialisiertes Gebiet der Physiotherapie, das sich auf die Gesundheit und Rehabilitation älterer Menschen konzentriert. Mit zunehmendem Alter treten oft körperliche Veränderungen und gesundheitliche Herausforderungen auf, die eine spezielle Herangehensweise erfordern. Die geriatrische Physiotherapie zielt darauf ab, die Lebensqualität, die Mobilität und die Unabhängigkeit von älteren Menschen zu verbessern oder aufrechtzuerhalten.`,
                   `Hier sind einige der Schlüsselelemente der geriatrischen Physiotherapie:`,
        ` <strong>Funktionserhalt und -verbesserung:</strong> Die Therapie konzentriert sich darauf, die alltäglichen Funktionen und Aktivitäten, wie Gehen, Aufstehen, Sitzen und Anziehen, zu erhalten oder zu verbessern. Dies trägt dazu bei, die Selbstständigkeit und Lebensqualität älterer Menschen zu steigern.`,
        ` <strong>Sturzprävention:</strong> Stürze sind bei älteren Menschen eine häufige Ursache für Verletzungen. Die geriatrische Physiotherapie beinhaltet Übungen und Techniken zur Verbesserung des Gleichgewichts und der Stabilität, um das Sturzrisiko zu minimieren.`,
        ` <strong>Schmerzmanagement:</strong> Viele ältere Menschen leiden an chronischen Schmerzen, sei es aufgrund von Arthrose, Osteoporose oder anderen Erkrankungen. Die Physiotherapeuten helfen bei der Schmerzlinderung und fördern die Beweglichkeit.`,
        ` <strong>Rehabilitation nach Krankheit oder Verletzung:</strong> Nach einem Schlaganfall, einer Hüftfraktur oder anderen gesundheitlichen Ereignissen kann die geriatrische Physiotherapie eine wichtige Rolle bei der Wiederherstellung der Funktion und Mobilität spielen.`,
        ` <strong>Mobilität und Fitness:</strong> Die Therapeuten fördern regelmäßige körperliche Aktivität, um die allgemeine Gesundheit und Fitness älterer Menschen zu erhalten. Dies kann die Herz-Kreislauf-Fitness, Muskelkraft und Ausdauer verbessern.`,
        ` <strong>Anpassung an altersbedingte Veränderungen:</strong> Im Alter können Veränderungen wie Muskelschwund, Gelenksteifigkeit und verminderte Flexibilität auftreten. Die geriatrische Physiotherapie hilft dabei, mit diesen Veränderungen besser umzugehen und sie zu minimieren.`,
        ` <strong>Kommunikation und Zusammenarbeit:</strong> Physiotherapeuten in der geriatrischen Rehabilitation arbeiten oft eng mit anderen Gesundheitsdienstleistern zusammen, um die umfassende Versorgung älterer Menschen sicherzustellen.`,
        `Die geriatrische Physiotherapie zielt darauf ab, ältere Menschen dabei zu unterstützen, aktive, unabhängige und qualitativ hochwertige Leben zu führen. Die Therapiepläne sind in der Regel individuell angepasst und berücksichtigen die spezifischen Bedürfnisse und Gesundheitszustände jedes Patienten.`,],
                   img:'img_services_geratrische.jpeg', 
                },
                {
                   title:'Domizilbehandlungen / Hausbesuche',
                   description:[`Die Physiotherapie im häuslichen Umfeld ist eine Form der medizinischen Versorgung, bei der Physiotherapeuten Patienten in ihrem eigenen Zuhause behandeln.`,
        `Diese Art der Versorgung kann für Personen erforderlich sein, die aufgrund von Mobilitätsproblemen, schweren Krankheiten oder anderen gesundheitlichen Einschränkungen nicht in der Lage sind, in eine Praxis oder ein Krankenhaus zu gehen.`,],
                   img:'img_services_domizilbehandlungen.jpeg', 
                },
                {
                   title:'Mobilisation nach Mulligan',
                   description:[`Die Mulligan-Konzept-Physiotherapie ist eine spezialisierte physiotherapeutische Methode, die von dem neuseeländischen Physiotherapeuten Brian Mulligan entwickelt wurde. Diese Methode befasst sich hauptsächlich mit der Diagnose und Behandlung von Muskel-Skelett-Problemen und -Schmerzen. Das Mulligan-Konzept basiert auf manuellen Therapieansätzen und Übungen, die darauf abzielen, Schmerzen zu lindern, Beweglichkeit und Funktion wiederherzustellen und Fehlfunktionen des Muskel-Skelett-Systems zu korrigieren.`,
        `Hier sind einige der Grundprinzipien und Techniken des Mulligan-Konzepts:`,
        `<strong>Mobilisation mit Bewegung (MWM):</strong> Ein Schlüsselprinzip des Mulligan-Konzepts ist die Mobilisation von Gelenken während aktiver Bewegungen des Patienten. Der Physiotherapeut führt sanfte manuelle Techniken aus, um die Gelenke in eine verbesserte Position zu bringen, während der Patient eine bestimmte Bewegung durchführt. Dies kann dazu beitragen, Schmerzen zu lindern und die Beweglichkeit zu erhöhen.`,
        `<strong>Schmerz als Leitfaden:</strong> Schmerz ist ein wichtiger Leitfaden im Mulligan-Konzept. Wenn ein Patient während einer Bewegung Schmerzen empfindet, signalisiert dies dem Therapeuten, dass eine bestimmte Korrektur oder Technik angewendet werden sollte, um den Schmerz zu lindern und die Funktion zu verbessern.`,
        `<strong>Dynamische Bandagen und Tapes:</strong> Das Mulligan-Konzept beinhaltet manchmal den Einsatz von speziellen Bändern und Tapes, um die Gelenkbewegung zu unterstützen und zu stabilisieren.`,
        `<strong>Korrektur von Fehlfunktionen:</strong> Das Ziel des Konzepts ist es, Funktionsstörungen im Muskel-Skelett-System zu korrigieren. Dies kann durch die gezielte Anwendung von Mobilisationstechniken und Übungen erreicht werden.`,
        `<strong>Patientenaktive Beteiligung:</strong> Im Mulligan-Konzept wird viel Wert auf die aktive Beteiligung des Patienten gelegt. Der Patient wird ermutigt, Übungen und Bewegungen aktiv auszuführen, während der Therapeut die notwendigen manuellen Korrekturen vornimmt.`,
        `<strong>Individuelle Anpassung:</strong> Die Therapiepläne im Mulligan-Konzept sind individuell auf die Bedürfnisse und Ziele des Patienten zugeschnitten. Der Therapeut berücksichtigt den spezifischen Zustand und die Symptome des Patienten.`,
      ],
                   img:'img_services_mobilisation.jpeg', 
                },
                {
                   title:'Kinesio - Tape',
                   description:[`Kinesiotaping, oft auch als Kinesiologie-Tape oder Kinesio-Tape bezeichnet, ist eine Therapiemethode, die in der Physiotherapie und Sportmedizin angewendet wird. Bei dieser Technik werden spezielle, elastische Klebebänder auf die Haut aufgebracht. Die Grundidee besteht darin, diese Tapes so anzulegen, dass sie unterschiedliche therapeutische Ziele erreichen.`,
        `Einer der Hauptzwecke des Kinesiotapings ist die Unterstützung und Stabilisierung von Gelenken und Muskeln. Dies kann besonders hilfreich bei Verletzungen oder zur Vorbeugung von Überlastungsschäden sein. Das elastische Tape erlaubt jedoch immer noch eine gewisse Bewegungsfreiheit, im Gegensatz zu starren Verbänden oder Gips, was während der Rehabilitation von Vorteil sein kann.`,
        `Ein weiterer Vorteil des Kinesiotapings ist die Schmerzlinderung. Das Tape kann die Durchblutung fördern und Druck von schmerzhaften Stellen nehmen, was dazu beitragen kann, Schmerzen zu reduzieren. Durch das Anheben der Haut unter dem Tape kann auch der Lymphfluss verbessert werden, was bei der Reduzierung von Schwellungen hilfreich ist.`,
        `Darüber hinaus beeinflusst das Kinesiotape die sensorische Wahrnehmung der Haut, was dem Körper helfen kann, auf Verletzungen oder Beschwerden zu reagieren. Kinesiotape wird bei verschiedenen Zuständen eingesetzt, einschließlich Muskelverletzungen, Gelenkschmerzen und Überlastungssyndromen, und kann auch zur Verbesserung der sportlichen Leistung verwendet werden.`,],
                   img:'img_services_kinesio.jpg', 
                },


            ]
        }
    },
    methods:{

    
    selectService(service) {
      this.selectedService = service;
      this.Popup = false; 
    },
},
}
</script>

<style scoped>
.services_container{
    padding-left: 0px;
    padding-right: 0px;
}
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
    left: 50%;
    transform: translateX(-50%);
    position: relative;

}
.services_vertical{
    width: 100% !important;
    height: auto !important;
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
.btn_message{
    position: absolute;
    bottom: -40%;
    transform: translateY(50%);
}
.arrow{
    -webkit-transform: scaleX(-1);
  transform: scaleX(-1);
  display: block;
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
.services_container{
    padding-left: inherit;
    padding-right: inherit;
}
.btn_message{
    display: none;
}
}
</style>