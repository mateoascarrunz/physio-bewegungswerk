<template>
  <div>
  <div class="grid_container padding_null_top"> 
  <BaseBox class="center grid-col-2">
    <span class="title">Kontaktieren Sie uns!</span><br> <span>Bei offenen Fragen sind wir gerne per E-Mail oder
      telefonisch von Montag bis Freitag von 09:00 bis 17:00 Uhr erreichbar.</span><br><br>
    <div class="container left">
      <form @submit.prevent="sendEmail">
        <div class="mb-3">
          <label for="name" class="form-label">Vor- und Nachname * </label>
          <input type="text" class="form-control " id="name" placeholder="Max Mustermann" v-model="name" :class="{ 'error': namenotfilled }">
        </div>
        <div class="row">
          <div class="col-lg-6">
            <div class="mb-3">
              <label for="telefonnummer" class="form-label">Telefonnummer</label>
              <input type="number" class="form-control" id="telefonnummer" placeholder="+41 22 123 45 67" v-model="phone">
            </div>
          </div>
          <div class="col-lg-6">
            <div class="mb-3">
              <label for="email" class="form-label">Email* </label >
              <input type="email" class="form-control" id="email" placeholder="max.mustermann@example.com"
                v-model="email"  :class="{ 'error': emailnotfilled }">
            </div>
          </div>
          <div class="col-12">
            <div class="mb-3">
              <label for="text" class="form-label">Nachricht* </label>
              <textarea class="form-control text-area" id="text" rows="3" placeholder="Nachricht*"
                v-model="text" :class="{ 'error': textnotfilled }"></textarea>
            </div>
          </div>
        </div>
      </form>
    </div>
    <span class="pargraph magenta" v-if="validationFailed">Bitte füllen Sie alle mit einem Sternchen (*) gekennzeichneten Felder aus</span>
    <br>
    <BaseButtonMag type="submit" @click="sendEmail" >Senden</BaseButtonMag>
  </BaseBox>
</div>
  <div v-if="showmodal" class="modal fade show" id="exampleModal" tabindex="-1"  aria-labelledby="exampleModalLabel" aria-hidden="true" style="display: block;">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header center">
       
        <button type="button" class="btn-close" @click="closeModal"></button>
      </div>
      <div class="modal-body center">
        <div class="spinner-border text-primary" role="status" v-if="success === null">
  <span class="visually-hidden">Loading...</span>
</div>
        <span class="paragraph mainfont green bold" v-if="success === 'success'">Vielen Dank für Ihre Nachricht! </span>
        <span class="paragraph mainfont green bold" v-if="success === 'error'">Es tut uns leid, aber Ihre Nachricht konnte nicht erfolgreich übermittelt werden.</span>
        <br><br>
        <span class="minitext mainfont green" v-if="success === 'success'">Wir haben Ihre Anfrage erhalten und werden uns innerhalb von 24 Stunden an Werktagen bei Ihnen melden. </span>
        <span class="minitext mainfont green"  v-if="success === 'error'">Bitte überprüfen Sie Ihre Angaben und versuchen Sie es erneut. Wenn das Problem weiterhin besteht, können Sie uns direkt unter der E-Mail-Adresse <br> <strong class="bold">info@physio-bewegungswerk.ch</strong> kontaktieren. <br> <br>Wir entschuldigen uns für die Unannehmlichkeiten.</span>
      </div>

    </div>
  </div>
</div>
</div>
</template>
<script>
import emailjs from 'emailjs-com';

export default {
  data() {
    return {
      name: '',
      phone: '',
      email: '',
      text: '',
      success: null,
      namenotfilled:false,
      emailnotfilled:false,
      textnotfilled:false,
      validationFailed : false,
      showmodal: false,

    }
  },
  methods: {
closeModal(){
  this.showmodal= false;
},
    sendEmail() {
      console.log('sendEmail method called');
      if (!this.name) {
        this.namenotfilled = true;
        this.validationFailed = true;
        this.showmodal= false;
      } else {
        this.namenotfilled = false;
      }

      if (!this.email) {
        this.emailnotfilled = true;
        this.validationFailed = true;
        this.showmodal= false;
      } else {
        this.emailnotfilled = false;
      }

      if (!this.text) {
        this.textnotfilled = true;
        this.validationFailed = true;
        this.showmodal= false;
      } else {
        this.textnotfilled = false;
      }

      if (this.name && this.email && this.text) {
        this.validationFailed = false;
      }

      if (!this.validationFailed) {
        this.showmodal = true; 
      }

      const templateParams = {
        name: this.name,
        number: this.phone,
        email: this.email,
        message: this.text,
      };

      if(!this.validationFailed) {emailjs
        .send('service_bphnx5s', 'template_1yau1ec', templateParams, 'JwRQLh9SOb9XYUb-k')
        
        .then((response) => {
          this.validationFailed = false;
          console.log('Email sent successfully:', response);
          this.success = 'success';

        })
        .catch((error) => {
          this.validationFailed = false;
          console.error('Email sending failed:', error);
          this.success = 'error';
        });
      }
    },
  },
  watch: {
    showmodal(newValue) {
      if (newValue) {
        document.body.classList.add('scroll-out');
      } else {
        document.body.classList.remove('scroll-out');
      }
    },
  },
  mounted() {
    this.$watch('showmodal', (newValue) => {
      if (newValue) {
        document.body.classList.add('scroll-out');
      } else {
        document.body.classList.remove('scroll-out');
      }
    });
  }
}
</script>









<style>
.form-label {
  font-family: 'Montserrat', sans-serif;
  margin-left: 13px;
}

.form-control {
  border-radius: 50px !important;
  font-family: 'Montserrat', sans-serif;
}

.text-area {
  border-radius: 20px !important;
}

.modal-footer{
  border-top: none;
  display: flex;
  justify-content: center
}
.modal-header{
  border-bottom: none;
}
.modal-content{
  border-radius: 25px;

}
.error{
border: 1px solid #E2097F !important;
}
.modal{
  background: #ffffff70;
    backdrop-filter: blur(10px);
}</style>