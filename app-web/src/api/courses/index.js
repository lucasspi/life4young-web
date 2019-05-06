import axios from 'axios'
import integrations from './integrations/index'

export default {

  integrations,

  all (params) {
    return axios.get('courses', {params})
      .then((response) => response.data.data)
  },

  allPublic (params) {
    return axios.get('courses/public', {params})
      .then((response) => response.data.data)
  },

  get (courseIdOrSlug) {
    return axios.get(`courses/${courseIdOrSlug}`)
      .then((response) => response.data.data)
  },

  markLessonWatched (courseIdOrSlug, serieIdOrSlug, lessonIdOrSlug) {
    return axios.post(`courses/${courseIdOrSlug}/series/${serieIdOrSlug}/lessons/${lessonIdOrSlug}/watched`)
  },

  create (courseData) {
    return axios.post(`courses`, courseData)
      .then((response) => response.data.data)
  },

  myCourses(params) {
    return axios.get('me/courses', {params})
      .then((response) => response.data.data);
  }

}
