import courses from './courses'
import leads from './leads'
import lessons from './lessons'
import instagram from './instagram'
import products from './products'
import countries from './countries'
import userAddresses from './userAddresses'
import userCards from './userCards'
import orders from './orders'
import users from './users'
import subscriptions from './subscriptions'
import coupons from './coupons'
import gateways from './gateways'
import courseStudent from './courseStudent'
import layout from './layout'
import gamefication from './gamefication'
import notifications from './notifications'
import community from './community'
import axios from 'axios'

export default {
  courses,
  leads,
  lessons,
  instagram,
  products,
  countries,
  userAddresses,
  userCards,
  orders,
  users,
  subscriptions,
  coupons,
  gateways,
  courseStudent,
  layout,
  gamefication,
  notifications,
  community,

  getPlatform () {
    return axios.get('platform').then(
      (response) => response.data.data
    );
  },

  getAuthIntegrations () {
    return axios.get(`auth/integrations`).then(
      (response) => response.data.data
    )
  },

  getAuthIntegrationRedirectUrl (provider) {
    return axios.get(`auth/integrations/${provider}/redirect`).then(
      (response) => response.data.data
    )
  },

  forwardCallbackCode (provider, queryParams) {
    return axios.get(`auth/integrations/${provider}/redirect/callback`, {params: queryParams}).then(
      (response) => response.data.data
    )
  },

  /**
   * @returns {CancelTokenSource}
   */
  createCancelToken() {
    return axios.CancelToken.source();
  }
}
