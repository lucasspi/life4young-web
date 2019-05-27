import api from '../../../api'

export default {
  fetchCountries ({commit, dispatch}) {
    commit('setLoadingCountries', false)

    return api.countries.fetchAllCountries()
      .then((countries) => commit('setCountries', countries))
      .finally(() => commit('setLoadingCountries', false));
  },
  fetchStates ({commit, dispatch}, country) {
    commit('setLoadingStates', true)

    return api.countries.fetchStates(country)
      .then((states) => commit('setStates', states))
      .finally(() => commit('setLoadingStates', false));
  },
  fetchCities ({commit, dispatch}, {country, state}) {
    commit('setLoadingCities', true)

    return api.countries.fetchCities(country, state)
      .then((cities) => commit('setCities', cities))
      .finally(() => commit('setLoadingCities', false));
  }
}
