import api from '../../../api'

export default {

  fetchHistories ({ commit, state }) {
    return api.leads.fetchGeneralHistory().then(
      (response) => commit('setRows', response.data.data),
      (err) => commit('setErrorMessage', err.response.data.message)
    )
  },

  startInterval ({ commit, dispatch, state }) {
    commit('setRefreshInterval', true)
    dispatch('loopInterval')
  },

  stopInterval ({ commit }) {
    commit('setRefreshInterval', false)
  },

  loopInterval ({ commit, dispatch, state }) {
    if (state.refreshInterval) {
      dispatch('fetchHistories').then(
        () => window.setTimeout(
          () => dispatch('loopInterval'), state.delay
        )
      )
    }
  }

}
