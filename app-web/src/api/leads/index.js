import axios from 'axios'
import rewards from './rewards'

export default {

  rewards,

  fetchSummary() {
    return axios.get(`leads/summary`);
  },

  fetchTotalLeads() {
    return axios.get(`leads/total`);
  },

  fetchPerDay() {
    return axios.get(`leads/per-day`);
  },

  fetchGeneralHistory () {
    return axios.get(`leads/campaign-lead-total-histories`);
  },

  fetchAllOrders(page = 1) {
    return axios.get('leads/campaigns/orders', {params: {page}});
  },

  fetchAllOrderSummary() {
    return axios.get('leads/campaigns/orders/summary');
  },

  registerEmail(email) {
    return axios.post('leads', { email }).then(
      (response) => response.data
    )
  },

  fetchInstantPurchases(orders = [], product = null) {
    let postData = {};
    if (Array.isArray(orders) && orders.length > 0) {
      postData = {...postData, orders};
    }
    if (product) {
      postData = {...postData, product};
    }
    return axios.post('leads/integrations/instant-purchases', postData).then(
      (response) => response.data.data
    );
  },

  inviteUserFriends(emails = [], extra_infos = null) {
    return axios.post('leads/invitations', {emails, extra_infos}).then(
      (response) => response.data
    );
  },

  fetchInvitations(from_achievement_id) {
    let options = {};
    if (from_achievement_id) {
      options.params = {'filter[from_achievement_id]': from_achievement_id};
    }
    return axios.get('leads/invitations', options).then(
      (response) => response.data.data
    );
  }
}
