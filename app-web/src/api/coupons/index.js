import axios from 'axios'

export default {
  simulate (publisher, product, code) {
    return axios.post(`checkout/coupons/simulate/${publisher}/${product}`, {code}).then(
      (response) => response.data.data
    );
  }
}
