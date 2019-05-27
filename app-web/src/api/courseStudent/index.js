import axios from 'axios'

export default {

  all (params) {
    return axios.get('certificates', {params})
      .then((response) => response.data.data)
  },

  get (courseStudentIdOrHash) {
    return axios.get(`certificates/${courseStudentIdOrHash}`)
      .then((response) => response.data.data)
  }

}
