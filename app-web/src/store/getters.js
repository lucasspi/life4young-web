import Vue from 'vue'
import MobileDetect from 'mobile-detect'

export default {
  currentLocale: (state) => {
    return state.locale
  },

  allLocales: (state) => {
    return state.locales
  },

  isMobile: (state) => {
    if (window && window.navigator && window.navigator.userAgent) {
      let md = new MobileDetect(window.navigator.userAgent);
      return md.mobile();
    }
    return null
  },

  isMenuOpen: (state) => {
    if (state.hide_menu) {
      return false
    }

    if (state.show_menu) {
      return true
    }

    let isMobile = false;

    if (window && window.navigator && window.navigator.userAgent) {
      let md = new MobileDetect(window.navigator.userAgent);
      isMobile = md.mobile();
    }

    try {
      return Vue.auth.check() || isMobile
    } catch (e) {
      return isMobile;
    }
  }
}
