
export default {
  setUser(state, user) {
    state.user = user;
  },
  setUserAddress (state, userAddress) {
    state.user_address = userAddress;
  },
  setUserCard (state, userCard) {
    state.user_card = userCard;
  },
  setProduct (state, product) {
    state.product = product;
  },
  setCoupon (state, coupon) {
    state.coupon = coupon;
  },
  setIsCreatingOrder(state, isCreatingOrder) {
    state.is_creating_order = isCreatingOrder;
  },
  setOrder(state, order) {
    state.order = order;
  },
  setOrderErrors(state, errors) {
    state.order_errors = errors;
  },
  setShowPaymentForm(state, showPaymentForm) {
    state.show_payment_form = showPaymentForm;
  },
  setIsCouponSimulated(state, isCouponSimulated) {
    state.is_coupon_simulated = isCouponSimulated;
  },
  setPaymentMethodId(state, paymentMethodId) {
    state.payment_method_id = paymentMethodId;
  },
  setGateway (state, gateway) {
    state.gateway = gateway;
  },
  setShowPaymentInfos (state, showPaymentInfos) {
    state.show_payment_infos = showPaymentInfos;
  },
  setOrders(state, orders) {
    state.orders = orders;
  },
  setLoadingOrders(state, loadingOrders) {
    state.loading_orders = loadingOrders;
  },
  setLoadingOrder(state, loadingOrder) {
    state.loading_order = loadingOrder;
  }
}
