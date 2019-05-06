
export default {
  setSubscriptions (state, subscriptions) {
    state.subscriptions = subscriptions;
  },
  setIsLoadingSubscriptions (state, isLoadingSubscriptions) {
    state.is_loading_subscriptions = isLoadingSubscriptions;
  },
  setOrders(state, orders) {
    state.orders = orders;
  },
  setIsLoadingOrders(state, isLoadingOrders) {
    state.is_loading_orders = isLoadingOrders;
  }
}
