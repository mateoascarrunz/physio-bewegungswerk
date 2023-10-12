import { createApp } from 'vue'
import './assets/styles/style.css'
import './assets/styles/bootstrap.scss'
import App from './App.vue'
import router from './router'
import BaseBox from './components/base/BaseBox.vue'
import BaseButtonBlue from './components/base/BaseButtonBlue.vue';
import BaseButtonMag from './components/base/BaseButtonMag.vue';

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'
const app = createApp(App)

app.use(router)

app
  .component('BaseBox', BaseBox)
  .component('BaseButtonBlue', BaseButtonBlue)
  .component('BaseButtonMag', BaseButtonMag)



app.mount('#app')