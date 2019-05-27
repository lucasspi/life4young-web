import actions from './actions';
import mutations from './mutations';
import getters from './getters';


// The good old "data" variable of the component
export const initialState = {
  loading_posts: false,
  query_params: null,
  posts: [],
  posts_metadata: null,
  tags: [],
  loading_tags: false,

  post: null,
  loading_post: false,

  post_comments: [],
  loading_post_comments: false,
  post_comments_metadata: null,

  cancel_tokens: [],
};

export default {
  namespaced: true,
  state: initialState,
  actions,
  // Mutations are the synchronous operations throughout our state
  mutations,
  getters
};
