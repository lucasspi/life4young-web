import actions from './actions';
import mutations from './mutations';
import getters from './getters';


// The good old "data" variable of the component
export const initialState = {
  user: null,
  user_address: null,
  user_card: null,
  product: null,
  coupon: null,
  payment_method_id: null,
  affiliate_ref: null,
  is_coupon_simulated: false,
  is_creating_order: false,
  order: null,
  loading_order: false,
  order_errors: null,
  show_payment_form: false,
  gateway: null,
  show_payment_infos: false,
  orders: [],
  loading_orders: false
};

export default {
  namespaced: true,
  state: initialState,
  actions,
  // Mutations are the synchronous operations throughout our state
  mutations,
  getters
};
