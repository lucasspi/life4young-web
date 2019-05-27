import axios from 'axios'

export default {

  /**
   * Load the user addresses
   * @returns {*}
   */
  fetch () {
    return axios.get(`users/addresses`)
      .then((response) => response.data.data)
  },

  fetchZipcodeInfo(zipcode) {
    return axios.post(`users/addresses/zipcode`, {zipcode})
      .then((response) => response.data.data);
  }

}
