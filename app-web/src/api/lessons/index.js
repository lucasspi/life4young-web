import axios from 'axios'

export default {

  create (cursoSlugOrId, serieSlugOrId, lessonData) {
    return axios.post(`courses/${cursoSlugOrId}/series/${serieSlugOrId}/lessons`, lessonData)
      .then((response) => response.data.data)
  }

}
