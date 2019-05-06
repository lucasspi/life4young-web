// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueMaterialIcon from 'vue-material-icon'
import VueAuth from '@websanova/vue-auth'
import VueTyperPlugin from 'vue-typer'
import VueSweetalert2 from 'vue-sweetalert2'
import VueI18n              from 'vue-i18n'
import { createI18n }       from '@/i18n'
import store                from '@/store'
import VueMoment from 'vue-moment'
import moment from 'moment'
import VueProgressBar from 'vue-progressbar'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import {
  faPaypal, faFacebook, faInstagram, faWhatsapp, faLinkedin, faGoogle, faVimeo,
  faCcVisa, faCcMastercard, faCcAmex, faCcDinersClub, faCcDiscover, faCcJcb,
  faTwitter
} from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { default as emojioneFilter } from './helpers/emojione'
import VueTheMask from 'vue-the-mask'
import VueIntro from 'vue-introjs';
import VueAnalytics from 'vue-analytics'
import VueScrollTo from 'vue-scrollto'
import VueTelInput from 'vue-tel-input'
import cookie from './helpers/cookie'
import SlideUpDown from 'vue-slide-up-down'

require('moment/locale/pt-br')
Vue.use(VueAxios, axios)
Vue.axios.defaults.baseURL = process.env.API_URL;
Vue.component(VueMaterialIcon.name, VueMaterialIcon)
!Vue.router && (Vue.router = router)
Vue.use(VueAuth, {
  auth: require('@websanova/vue-auth/drivers/auth/bearer.js'),
  http: require('@websanova/vue-auth/drivers/http/axios.1.x.js'),
  router: require('@websanova/vue-auth/drivers/router/vue-router.2.x.js'),
  parseUserData: function(data) {
    return data.data;
  },
  loginData: {
    url: 'auth/access-token',
    method: 'POST',
    fetchUser: true
  },
  fetchData: {
    url: 'auth/me',
    method: 'GET'
  },
  refreshData: {
    enabled: false
  },
  rolesVar: 'all_permissions'
})
Vue.use(VueTyperPlugin)
Vue.use(VueSweetalert2)
Vue.use(VueI18n)

Vue.use(VueMoment, {
  moment
})

const i18n = createI18n()
!Vue.i18n && (Vue.i18n = i18n)

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

Vue.use(VueProgressBar, options)

library.add(fas)
library.add(faPaypal)
library.add(faFacebook)
library.add(faInstagram)
library.add(faWhatsapp)
library.add(faLinkedin)
library.add(faGoogle)
library.add(faVimeo)
library.add(faCcVisa)
library.add(faCcMastercard)
library.add(faCcAmex)
library.add(faCcDinersClub)
library.add(faCcDiscover)
library.add(faCcJcb)
library.add(faTwitter)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(emojioneFilter)
Vue.use(VueTheMask)
Vue.use(VueIntro)
Vue.use(VueAnalytics, {
  id: process.env.ANALYTICS_ID
})

Vue.use(VueScrollTo, {
  container: "body",
  duration: 500,
  easing: "ease",
  offset: 0,
  force: true,
  cancelable: true,
  onStart: false,
  onDone: false,
  onCancel: false,
  x: false,
  y: true
})

Vue.use(VueTelInput)
Vue.component('slide-up-down', SlideUpDown)

Vue.config.productionTip = false

router.afterEach((to, from) => {
  let user = null;

  cookie.handleInvitationCookie(to)

  const callbackToMautic = () => {
    let pageviewPayload = {};
    if (Vue.auth.check()) {
      user = Vue.auth.user();
      const nameSplit = user.name.split(' ');
      const email = user.email;
      const firstname = nameSplit.shift();
      const lastname = nameSplit.join(' ');
      pageviewPayload = {email, firstname, lastname, signed_up: 1};
    }
    mt('send', 'pageview', pageviewPayload);
  };
  try {
    if (Vue.auth.ready() && Vue.auth.check()) {
      callbackToMautic();
    } else {
      Vue.auth.ready(callbackToMautic);
    }
  } catch (e) {}
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  store,
  components: { App },
  template: '<App/>'
})
