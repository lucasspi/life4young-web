import api from '../../../api'
import getters from './getters'
import metadata from '../metadata'

export default {
  tryCreate ({commit, getters}) {
    commit('setIsCreatingOrder', true);
    let payloadData = getters.orderCreationPayload;
    return api.orders.create(payloadData).then(
      (order) => commit('setOrder', order),
      (err) => new Promise((resolve, reject) => { commit('setOrderErrors', err); reject(err); })
    ).finally(() => commit('setIsCreatingOrder', false))
  },

  fetchProduct ({commit, getters}, {publisher, product}) {
    return api.products.fetch(publisher, product).then(
      (product) => commit('setProduct', product)
    );
  },

  simulateCoupon ({commit, state}, code) {
    return api.coupons.simulate(state.product.publisher_founder_id, state.product.id, code).then(
      (coupon) => {
        commit('setCoupon', coupon)
        commit('setIsCouponSimulated', true)
      }
    );
  },

  fetchLastOrders({commit, state}) {
    commit('setLoadingOrders', false);

    return api.orders.fetchAll().then(
      (orders) => commit('setOrders', orders)
    ).finally(
      () => commit('setLoadingOrders', false)
    );
  },

  markAdsConversionSent({commit, state, dispatch}) {
    return dispatch('fetchLastOrders').then(
      () => getters.orders_pending_conversion_tag(state)
        .forEach((order) => {
          let gConversionTracking = metadata.getters.getMetadata(order.product, 'google_conversion_tracking')
          if (gConversionTracking) {
            gtag('event', 'conversion', { 'send_to': gConversionTracking.value, 'transaction_id': order.id })
          } else {
            gtag('event', 'conversion', { 'send_to': 'AW-969132948/iiMKCP-ZjYsBEJSXj84D', 'transaction_id': order.id })
          }
          api.orders.markAdsConversionSent(order.id)
        })
    )
  },

  /**
   *
   * @param commit
   * @param state
   * @param paypalData {token, payer_id}
   */
  verifyPaypalToken({commit, state}, paypalData) {
    if (paypalData.hasOwnProperty('PayerID') && !paypalData.hasOwnProperty('payer_id')) {
      paypalData.payer_id = paypalData.PayerID;
      delete paypalData.PayerID;
    }
    return api.gateways.proccessPaypalExpressCheckout(paypalData).then(
      (order) => {
        commit('setOrder', order)
        commit('setUser', order.user)
        commit('setProduct', order.product)
      },
      (err) => { /* how to handle errors? */ }
    )
  },

  fetchOrder({commit, state}, order_id) {
    commit('setLoadingOrder', true);
    return api.orders.fetch(order_id).then(
      (order) => {
        commit('setOrder', order)
        commit('setUser', order.user)
        commit('setProduct', order.product)
      },
      (err) => { /* how to handle errors? */ }
    ).finally(
      () => commit('setLoadingOrder', false)
    );
  },

  /**
   *
   * @param commit
   * @param state
   * @param conversionPayload {send_to, transaction_id}
   */
  markGoogleAdsConversion({commit, state}, conversionPayload) {
    let send_to = null;
    let transaction_id = null;

    if (conversionPayload && conversionPayload.hasOwnProperty('send_to')) {
      send_to = conversionPayload.send_to;
    } else {
      send_to = 'AW-969132948/iiMKCP-ZjYsBEJSXj84D';
    }

    if (conversionPayload && conversionPayload.hasOwnProperty('transaction_id')) {
      transaction_id = conversionPayload.transaction_id
    } else if (state.order && state.order.id) {
      transaction_id = state.order.id;
    }

    gtag('event', 'conversion', { send_to, transaction_id })
  }
}
