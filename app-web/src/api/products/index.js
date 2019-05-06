import axios from 'axios'

export default {

  /**
   *
   * @param publisher int|string
   * @param product int|string
   * @returns {*}
   */
  fetch (publisher, product) {
    return axios.get(`publishers/${publisher}/products/${product}`)
      .then((response) => response.data.data)
  },

  fetchFeaturedProducts(publisher) {
    return axios.get(`publishers/${publisher}/products`)
      .then((response) => response.data.data)
  }

}
