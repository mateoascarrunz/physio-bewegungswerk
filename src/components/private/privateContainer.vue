<template>
  <BasePageTransition></BasePageTransition>
  <div class="container_first_box">
    <div class="grid_container">
      <BaseBox class="grid-col-2">
        <div class="container">
          <div>
            <div>
              <div class="margin_title center">
                <span class="title blue bold center">Private Physiotherapie</span>
              </div>
              <br />

              <span class="paragraph left block">
                Gönnen Sie sich gezielte physiotherapeutische Behandlungen – ganz ohne ärztliche Verordnung.
                In unseren privaten Sessions nehmen wir uns Zeit für eine gründliche Anamnese, eine präzise
                Befundaufnahme und eine Behandlung, die genau zu Ihrem Alltag, Ihrem Körper und Ihrem
                Energielevel passt. Ziel ist es, Spannungen zu lösen, Beweglichkeit zurückzugewinnen,
                Schmerzen zu reduzieren und langfristig in Ihre Gesundheit zu investieren.
              </span>

              <span class="paragraph left block">
                Gemeinsam definieren wir Ihre Ziele und wählen evidenzbasierte Techniken, die zu Ihnen passen.
              </span>

              <!-- Was Sie erwartet -->
              <div class="block">
                <span class="subtitle">Was Sie erwartet</span><br />
                <ul>
                  <li><span class="paragraph left">Individuelle Befundaufnahme mit klaren, erreichbaren Zielen</span></li>
                  <li><span class="paragraph left">Manuelle Techniken zur Lösung von Muskel- und Faszienspannungen</span></li>
                  <li><span class="paragraph left">Aktive Übungsprogramme für Stabilität, Kraft und Mobilität</span></li>
                  <li><span class="paragraph left">Faszien-/Triggerpunkt-Behandlung &amp; Gelenkmobilisation (je nach Bedarf)</span></li>
                  <li><span class="paragraph left">Atem- und Entspannungstechniken zur Regeneration und Stressreduktion</span></li>
                  <li><span class="paragraph left">Ein kurzes, alltagstaugliches Heimprogramm für nachhaltige Ergebnisse</span></li>
                </ul>
              </div>

              <!-- Preise -->
              <div class="block">
                <span class="subtitle">Preise</span><br />
                <span class="paragraph left">25 Minuten – <strong>CHF 75.–</strong></span><br />
                <span class="paragraph left">50 Minuten – <strong>CHF 145.–</strong></span>
              </div>

              <!-- Für wen geeignet -->
              <div class="block">
                <span class="subtitle">Ideal für</span><br />
                <ul>
                  <li><span class="paragraph left">Menschen, die sich etwas Gutes tun und präventiv an ihrer Gesundheit arbeiten wollen</span></li>
                  <li><span class="paragraph left">Schnellere Regeneration nach dem Training &amp; Reduktion von Muskelkater</span></li>
                  <li><span class="paragraph left">Gezieltes Vorgehen bei Büro-/Alltagsverspannungen (Nacken, Rücken, Schulter)</span></li>
                  <li><span class="paragraph left">Frühes Gegensteuern bei wiederkehrenden Beschwerden</span></li>
                  <li><span class="paragraph left">Sanfter Wiedereinstieg nach Belastungspausen</span></li>
                </ul>
              </div>

              <!-- Hinweis Verordnung -->
              <div class="block" role="note" aria-label="Kostenübernahme">
  <span class="paragraph left">
    <strong>Hinweis:</strong> Mit ärztlicher Verordnung werden die Kosten von der
    Grundversicherung sowie von IV und MV übernommen.
  </span>

<RouterLink class="nav-link" to="/faq"> <BaseButtonBlue>Mehr im FAQ</BaseButtonBlue></RouterLink>

</div>


              <!-- CTAs -->
              <BaseButtonMag
                type="button"
                class="nav-link mag_btn white btn_magenta services_button"
                @click="goToLink()"
              >
                Termin vereinbaren
              </BaseButtonMag>
            </div>
          </div>
          <!-- services -->
        </div>
      </BaseBox>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      LinkAppointment: 'https://onlinecalendar.medidoc.ch/BookAppointment?cgid=GLLYOUHTXUK45FADLLmoKA&ssid=gUj7CbnQGk.1KiYHwBRBVg',
    }
  },
  methods: {

    goToLink() {
    window.open(this.LinkAppointment, '_blank');
  }
  },
  
};
</script>
<style scoped>
.services_container {
  padding-left: 0px;
  padding-right: 0px;
}
.margin_title {
  margin-top: 60px;
}
a {
  color: inherit !important;
}
.img_services_container {
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
.sticky_element {
  position: sticky;
  top: 121px;
}
.img_services {
  height: 100%;
  opacity: 0.5;
  background-color: white;
  left: 50%;
  transform: translateX(-50%);
  position: relative;
}
.services_vertical {
  width: 100% !important;
  height: auto !important;
}
.services_button {
  display: block;
  width: 100%;
  padding-bottom: 15px;
  padding-top: 15px;
}
.text_services {
  display: flex;
  flex-direction: column;
  padding-right: 5%;
}
.dropdown_button {
  margin-top: 10px;
  margin-bottom: 10px;
  padding-left: 5%;
  padding-right: 5%;
}
.icon {
  position: absolute;
  left: 50%;
  top: 40%;
  transform: translate(-50%, -50%);
  width: 50%;
  opacity: 0.5;
}
.btn_message {
  position: absolute;
  bottom: -40%;
  transform: translateY(50%);
}
.arrow {
  -webkit-transform: scaleX(-1);
  transform: scaleX(-1);
  display: block;
}
.block {
  display: block;
  margin-bottom: 20px;
}
.text_info_btns {
  position: relative;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
}
.btn_ask {
  display: flex;
  justify-content: space-evenly;
}
.no_padding {
  padding-left: 0px !important;
  padding-right: 0px !important;
}
.paragraph {
  line-height: inherit;
}
.btn_back {
  display: block;
  width: fit-content;
  /* position: sticky;
    top: 150px; */
  color: #e2097f;
}

@media (max-width: 990px) {
  .text_services {
    padding-right: 0px;
    padding-left: 0px;
  }
  .services_container {
    padding-left: inherit;
    padding-right: inherit;
  }
  .btn_message {
    display: none;
  }
}
</style>
