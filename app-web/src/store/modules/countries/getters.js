export default {
  countries_length(state) {
    if (state.countries) {
      return Object.keys(state.countries).length;
    }
    return 0;
  },
  states_length(state) {
    if (state.states) {
      return Object.keys(state.states).length;
    }
    return 0;
  },
  cities_length(state) {
    if (state.cities) {
      return Object.keys(state.cities).length;
    }
    return 0;
  }
}
