import actions from './actions';
import mutations from './mutations';
import getters from './getters';


// The good old "data" variable of the component
export const initialState = {
  projects: [],
  selected_project_id: null,
  videos: [],
  is_loading_videos: false,
  selected_videos: [],
  imported_videos: [],
  not_imported_videos: []
};

export default {
  namespaced: true,
  state: initialState,
  actions,
  // Mutations are the synchronous operations throughout our state
  mutations,
  getters
};
