import actions from './actions';
import mutations from './mutations';
import getters from './getters';


// The good old "data" variable of the component
export const initialState = {
  notifications: [],
  loading_notifications: false,
  unread_notifications: [],
  loading_unread_notifications: false,
  stop_check_notifications: false,
};

export default {
  namespaced: true,
  state: initialState,
  actions,
  // Mutations are the synchronous operations throughout our state
  mutations,
  getters
};
