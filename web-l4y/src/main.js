import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import 'bootstrap';
import jQuery from 'jquery';
window.$ = window.jQuery = jQuery;
import 'popper.js';
import './assets/styles/app.scss';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import VueProgressBar from 'vue-progressbar'
import VueMoment from 'vue-moment'
import moment from 'moment';
require('moment/locale/pt-br');
Vue.use(VueMoment, {
  moment
});

Vue.use(VueProgressBar, options)
const options = {
  color: '#0090F7',
  failedColor: '#874b4b',
  thickness: '3px',
  transition: {
    speed: '0.2s',
    opacity: '0.6s',
    termination: 300
  },
  autoRevert: true,
  location: 'top',
  inverse: false
}

library.add(faCoffee)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
