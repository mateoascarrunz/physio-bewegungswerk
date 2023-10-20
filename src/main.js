import { createApp } from 'vue'
import './assets/styles/style.css'
import './assets/styles/bootstrap.scss'
import App from './App.vue'
import router from './router'
import BaseBox from './components/base/BaseBox.vue'
import BaseButtonBlue from './components/base/BaseButtonBlue.vue';
import BaseButtonMag from './components/base/BaseButtonMag.vue';
import BasePopUp from './components/base/BasePopUp.vue';
import BaseCloseButton from './components/base/BaseCloseButton.vue';
import LoadScript from 'vue-plugin-load-script';
import vueCustomElement from 'vue-custom-element';
import BasePageTransition from './components/base/BasePageTransition.vue';
import { MotionPlugin } from '@vueuse/motion'


// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'
const app = createApp(App)

app.use(router)
app.use(LoadScript)
app.use(vueCustomElement)
app.use(MotionPlugin)

app
  .component('BaseBox', BaseBox)
  .component('BaseButtonBlue', BaseButtonBlue)
  .component('BaseButtonMag', BaseButtonMag)
  .component('BasePopUp', BasePopUp)
  .component('BaseCloseButton', BaseCloseButton)
  .component('BasePageTransition', BasePageTransition)




app.mount('#app')