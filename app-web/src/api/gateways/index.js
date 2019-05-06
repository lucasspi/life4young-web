import axios from 'axios'

export default {
  /**
   * Return the order referenced by the paypal
   * @param paypalData
   * @returns {Promise<AxiosResponse<Order> | never>}
   */
  proccessPaypalExpressCheckout (paypalData) {
    return axios.post('gateways/integrations/paypal/proccess-express-checkout', paypalData).then(
      (response) => response.data.data
    )
  }
}
