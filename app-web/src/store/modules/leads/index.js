import actions from './actions';
import mutations from './mutations';
import getters from './getters';


// The good old "data" variable of the component
export const initialState = {
  fetchingData: false,
  errorMessage: '',
  total_leads_count: null,
  old_total_leads_count: 0,
  leads_per_day: null,
  leads_count: null,
  interval: null,
  refreshInterval: false,
  delay: 5000,
  orders: [],
  loading_orders: false,
  orders_last_page: null,
  order_summary: [],
  loading_order_summary: false,

  instant_purchases: [],
  loading_instant_purchases: false,
  instant_purchases_seen: [],
  loaded_instant_purchases: false,
  stop_instant_purchases: false,
  lock_instant_purchases_notifications: false,
  is_inviting_friends: false,
  invitations: [],
  is_loading_invitations: false,

  reward: null,
  loading_reward: false,
  rewards: [],
  loading_rewards: false,

};

export default {
  namespaced: true,
  state: initialState,
  actions,
  // Mutations are the synchronous operations throughout our state
  mutations,
  getters
};
