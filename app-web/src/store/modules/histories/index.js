import actions from './actions'
import mutations from './mutations'
import getters from './getters'


// The good old "data" variable of the component
export const initialState = {
  fetchingData: false,
  rows: [],
  interval: null,
  refreshInterval: false,
  delay: 5000
}

export default {
  namespaced: true,
  state: initialState,
  actions,
  // Mutations are the synchronous operations throughout our state
  mutations,
  getters
};
