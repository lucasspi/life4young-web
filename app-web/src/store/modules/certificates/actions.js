import api from '../../../api'

export default {
  fetch({commit, dispatch}, certificateHashOrId) {
    commit('setLoadingCertificate', true)
    return api.courseStudent.get(certificateHashOrId).then(
      (certificate) => commit('setCertificate', certificate)
    ).finally(
      () => commit('setLoadingCertificate', false)
    )
  },

  fetchAll({commit, dispatch}) {
    commit('setLoadingCertificates', true)
    return api.courseStudent.all().then(
      (certificates) => commit('setCertificates', certificates)
    ).finally(
      () => commit('setLoadingCertificates', false)
    )
  }
}
