import actions from './actions';
import mutations from './mutations';
import getters from './getters';


// The good old "data" variable of the component
export const initialState = {
  contents: [],
  is_loading_contents: false,
  is_contents_loaded: false,
  content: null,
  is_loading_content: false,
  page: null,
  loading_page: false,
  pages: [],
  loading_pages: false
};

export default {
  namespaced: true,
  state: initialState,
  actions,
  // Mutations are the synchronous operations throughout our state
  mutations,
  getters
};
