import Vue from 'vue'
import api from '../api'
import createNotification from '../helpers/notification'
import cookie from '../helpers/cookie'

export default {
  setCurrentLocale ({commit}, locale) {
    // save current locale in local storage
    // Vue.localStorage.save('locale', locale);

    // Set global values
    Vue.i18n && (Vue.i18n.locale = locale)
    Vue.axios && (Vue.axios.defaults.headers.common['X-Lang'] = locale)
    // apiClient.setLocale(locale);

    commit('setCurrentLocale', locale)
  },

  setAllLocalesAvailable ({commit}, locales) {
    commit('setAllLocalesAvailable', locales)
  },

  togglePlatformTour () {
    return api.users.togglePlatformTour()
  },

  resendWelcomeEmail() {
    return api.users.resendWelcomeEmail()
  },

  fetchUsersCount({commit}) {
    return api.users.usersCount().then(
      (numberOfUsers) => commit('setUsersCount', numberOfUsers)
    )
  },

  instantNotification({commit}, payload) {
    createNotification({
      ...payload,
      // type: '',
      // message: `${userFirstName} ${phrase}`,
      // position: '.bottom-left',
      // duration: 4500,
      // dateTime: order.created_at
    });
  },

  updateLoggedUser({commit}, userData) {
    return api.users.updateLoggedUser(userData);
  },

  async loadPlatform ({commit}) {
    commit('setPlatform', await api.getPlatform());
  },

  async fetchAuthIntegrations ({commit}) {
    commit('setLoadingAvailableAuthIntegrations', true);
    commit('setAvailableAuthIntegrations', await api.getAuthIntegrations());
    commit('setLoadingAvailableAuthIntegrations', false);
  },

  startLoginThroughAuthIntegration({commit, dispatch}, provider) {
    return api.getAuthIntegrationRedirectUrl(provider);
  },

  finishLoginThroughAuthIntegration({commit, dispatch}, {provider, queryParams = null}) {
    return api.forwardCallbackCode(provider, queryParams);
  },

  setAfterOauthRedirectUrl({commit, dispatch}, url) {
    return new Promise((resolve, reject) => {
      const cookieName = cookie.OAUTH_AFTER_REDIRECT();
      cookie.set(cookieName, url);

      window.setTimeout(() => resolve(), 50);
    });
  },

  getAfterOauthRedirectUrl({commit, dispatch}) {
    return new Promise((resolve, reject) => {
      const cookieName = cookie.OAUTH_AFTER_REDIRECT();
      if (cookie.check(cookieName)) {
        const url = cookie.get(cookieName);
        cookie.set(cookieName, null, -999);
        return resolve(url);
      }
      return reject();
    });
  }
}
