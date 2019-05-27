import api from '../../../api'

export default {
  fetchAddresses({commit, dispatch}) {
    commit('setLoadingAddresses', true);

    return api.userAddresses.fetch()
      .then((addresses) => commit('setAddresses', addresses))
      .finally(() => commit('setLoadingAddresses', false));
  },

  fetchZipcodeInfo({commit, dispatch}, zipcode) {
    commit('setLoadingZipcodeInfo', true);

    return api.userAddresses.fetchZipcodeInfo(zipcode)
      .then((zipcodeInfo) => commit('setZipcodeInfo', zipcodeInfo))
      .finally(() => commit('setLoadingZipcodeInfo', false));
  }
}
