import axios from 'axios'

export default {
  payment_methods: {
    BILLET: 1,
    CREDIT_CARD: 2,
    DEBIT_CARD: 3,
    BANK_TRANSFER: 4,
    MOIP_BALANCE: 5,
    BCASH_BALANCE: 6,
    PAYPAL: 7,
    HOTMART_BALANCE: 8,
    SAMSUNG_PAY: 9
  },
  transaction_status: {
    WAITING: 1,
    AUTHORIZED: 2,
    PAID: 3,
    REFUNDED: 4,
    WAITING_PAYMENT: 5,
    PENDING_REFUND: 6,
    REFUSED: 7,
    CHARGEBACK: 8,
    CANCELED: 9,
    IN_ANALYSIS: 10,
    DISPUTE: 11
  },
  create (data) {
    return axios.post(`checkout/orders`, data).then(
      (response) => response.data.data
    );
  },
  fetchAll (take = 10) {
    return axios.get(`checkout/orders`, {params: {take}}).then(
      (response) => response.data.data
    );
  },
  markAdsConversionSent (order_id) {
    return axios.post(`checkout/orders/${order_id}/ads-conversion`).then(
      (response) => response.data
    );
  },
  fetch (order_id) {
    return axios.get(`checkout/orders/${order_id}`).then(
      (response) => response.data.data
    );
  }
}
