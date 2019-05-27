import api from '../../../api'

export default {
  fetchAll ({dispatch}) {
    return Promise.all([
      dispatch('fetchAllSubscriptions'),
      dispatch('fetchAllOrders')
    ]);
  },
  fetchAllSubscriptions ({commit, dispatch}) {
    commit('setIsLoadingSubscriptions', true)

    return api.subscriptions.fetch()
      .then((subscriptions) => commit('setSubscriptions', subscriptions))
      .finally(() => commit('setIsLoadingSubscriptions', false));
  },
  fetchAllOrders ({commit, dispatch}) {
    commit('setIsLoadingOrders', true)

    return api.orders.fetchAll()
      .then((orders) => commit('setOrders', orders))
      .finally(() => commit('setIsLoadingOrders', false));
  },
  cancel ({commit, dispatch}, subscriptionId) {
    return api.subscriptions.requestCancellation(subscriptionId)
      .then(() => {});
  },
  updatePaymentMethod ({commit, dispatch}, subscription) {
    return api.subscriptions.update(subscription.id, subscription);
  }
}
