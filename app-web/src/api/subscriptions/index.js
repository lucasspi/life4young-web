import axios from 'axios'

export default {
  statuses: {
    TRIALING: 1,
    PAID: 2,
    PENDING_PAYMENT: 3,
    UNPAID: 4,
    CANCELED: 5,
    ENDED: 6
  },

  fetch() {
    return axios.get('me/subscriptions').then(
      (response) => response.data.data
    );
  },

  requestCancellation (subscriptionId) {
    return axios.post(`subscriptions/request-cancellation`, {subscription_id: subscriptionId}).then(
      () => true
    )
  },

  update (subscriptionId, subscriptionPayload) {
    return axios.put(`subscriptions/${subscriptionId}`, subscriptionPayload).then(
      (response) => response.data.data
    )
  }
}
