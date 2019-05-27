import actions from './actions';
import mutations from './mutations';
import getters from './getters';


// The good old "data" variable of the component
export const initialState = {
  courses: [],
  loading_courses: false,
  course: {is_completed: false},
  loading_course: false,
  selected_serie_id_or_slug: null,
  selected_lesson_id_or_slug: null,
  my_courses: [],
  loading_my_courses: false,
  navbar_max_courses: 4,
  public_courses: [],
  loading_public_courses: false
};

export default {
  namespaced: true,
  state: initialState,
  actions,
  // Mutations are the synchronous operations throughout our state
  mutations,
  getters
};
