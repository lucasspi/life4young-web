import actions from './actions';
import mutations from './mutations';
import getters from './getters';


// The good old "data" variable of the component
export const initialState = {
  product: null,
  loading_product: false,
  products: [],
  loading_products: false,
  coupon: null,
  is_coupon_simulated: false,
  loading_coupon: false
};

export default {
  namespaced: true,
  state: initialState,
  actions,
  // Mutations are the synchronous operations throughout our state
  mutations,
  getters
};
