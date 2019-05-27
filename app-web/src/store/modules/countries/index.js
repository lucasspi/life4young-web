import actions from './actions';
import mutations from './mutations';
import getters from './getters';


// The good old "data" variable of the component
export const initialState = {
  countries: [],
  states: [],
  cities: [],
  loading_countries: false,
  loading_states: false,
  loading_cities: false
};

export default {
  namespaced: true,
  state: initialState,
  actions,
  // Mutations are the synchronous operations throughout our state
  mutations,
  getters
};
