import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import getters from './getters'
import actions from './actions'
import mutations from './mutations'

import leads from './modules/leads/index'
import histories from './modules/histories/index'
import courses from './modules/courses/index'
import vimeoImporter from './modules/vimeoImporter/index'
import metadata from './modules/metadata/index'
import instagram from './modules/instagram/index'
import products from './modules/products/index'
import countries from './modules/countries/index'
import userAddresses from './modules/userAddresses/index'
import order from './modules/order/index'
import subscriptions from './modules/subscriptions/index'
import onesignal from './modules/onesignal/index'
import certificates from './modules/certificates/index'
import layout from './modules/layout/index'
import gamefication from './modules/gamefication/index'
import notifications from './modules/notifications/index'
import users from './modules/users/index'
import community from './modules/community/index'

Vue.use(Vuex)

export const initialState = {
  locale: null,
  locales: [],
  hide_menu: false,
  show_menu: false,
  intro: null,
  is_menu_visible: false,
  is_mobile_menu_visible: false,
  is_tour_open: false,
  notification_permission: null,
  notification_supported: null,
  is_lead_modal_open: false,
  is_lead_cookie: null,
  lead_modal_last_open: 0,
  lead_modal_pause_time: (7 * 24 * 60 * 60 * 1000),
  users_count: 0,
  platform: null,
  available_auth_integrations: [],
  loading_available_auth_integrations: false
}

const store = new Vuex.Store({
  plugins: [createLogger()],
  state: {...initialState},
  modules: {
    leads,
    histories,
    courses,
    vimeoImporter,
    metadata,
    instagram,
    products,
    countries,
    userAddresses,
    order,
    subscriptions,
    onesignal,
    certificates,
    layout,
    gamefication,
    notifications,
    users,
    community,
  },
  getters,
  actions,
  mutations
})

export default store
