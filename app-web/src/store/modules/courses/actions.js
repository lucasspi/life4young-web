import api from '../../../api'

export default {
  fetchMyCourses ({commit, dispatch}, params) {
    commit('setLoadingMyCourses', true)

    return api.courses.myCourses(params)
      .then((myCourses) => commit('setMyCourses', myCourses))
      .finally(() => commit('setLoadingMyCourses', false));
  },
  fetchAll ({commit, dispatch}, {params}) {
    commit('setLoadingCourses', true)

    return api.courses.all(params)
      .then((courses) => commit('setCourses', courses))
      .finally(() => commit('setLoadingCourses', false))
  },
  fetchCourse ({ commit, dispatch }, courseSlugOrId) {
    commit('setLoadingCourse', true)
    return api.courses.get(courseSlugOrId)
      .then((course) => commit('setCourse', course))
      .finally(() => commit('setLoadingCourse', false))
  },
  fetchAllPublic({commit, dispatch}, {params}) {
    commit('setLoadingPublicCourses', true)

    return api.courses.allPublic(params)
      .then((courses) => commit('setPublicCourses', courses))
      .finally(() => commit('setLoadingPublicCourses', false))
  },
  refreshCourse ({ dispatch, state }) {
    if (typeof state.course !== 'undefined' && state.course.hasOwnProperty('slug'))
      return dispatch('fetchCourse', state.course.slug);
    return new Promise((resolve, reject) => resolve());
  },
  markLessonWatched ({ dispatch, state, commit }, {serie, lesson}) {
    return api.courses.markLessonWatched(state.course.slug, serie, lesson);
  }
}
