
export default {
  setCountries(state, countries) {
    state.countries = countries
  },
  setStates(state, states) {
    state.states = states;
  },
  setCities(state, cities) {
    state.cities = cities;
  },
  setLoadingCountries(state, loadingCountries) {
    state.loading_countries = loadingCountries;
  },
  setLoadingStates(state, loadingStates) {
    state.loading_states = loadingStates;
  },
  setLoadingCities(state, loadingCities) {
    state.loading_cities = loadingCities;
  }
}
