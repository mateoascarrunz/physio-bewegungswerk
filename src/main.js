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
import BasePageTransition from './components/base/BasePageTransition.vue';
import { reveal } from './directives/reveal';

import 'bootstrap/js/dist/collapse';
const app = createApp(App)

app.use(router)
app.directive('reveal', reveal)

app
  .component('BaseBox', BaseBox)
  .component('BaseButtonBlue', BaseButtonBlue)
  .component('BaseButtonMag', BaseButtonMag)
  .component('BasePopUp', BasePopUp)
  .component('BaseCloseButton', BaseCloseButton)
  .component('BasePageTransition', BasePageTransition)




app.mount('#app')