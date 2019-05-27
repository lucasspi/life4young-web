import axios from 'axios'

export default {

  /**
   * Load the countries
   */
  fetchAllCountries () {
    return axios.get(`i18n/countries`)
      .then((response) => response.data.data)
  },

  fetchStates(country) {
    return axios.get(`i18n/countries/${country}/states`)
      .then((response) => response.data.data)
  },

  fetchCities(country, state) {
    return axios.get(`i18n/countries/${country}/states/${state}/cities`)
      .then((response) => response.data.data)
  }

}
