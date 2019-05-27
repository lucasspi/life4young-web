import axios from 'axios'

export default {

  /**
   * Load the user cards
   * @returns {*}
   */
  fetch () {
    return axios.get(`checkout/cards`)
      .then((response) => response.data.data)
  }

}
