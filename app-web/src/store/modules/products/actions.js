import api from '../../../api'

export default {
  fetchProduct ({commit, dispatch}, {publisher, product}) {
    commit('setLoadingProduct', true)

    return api.products.fetch(publisher, product)
      .then((product) => commit('setProduct', product))
      .finally(() => commit('setLoadingProduct', false));
  },

  fetchFeaturedProducts({commit, dispatch}, publisher) {
    commit('setLoadingProducts', true)

    return api.products.fetchFeaturedProducts(publisher)
      .then((products) => commit('setProducts', products))
      .finally(() => commit('setLoadingProducts', false));
  },

  async simulateCoupon ({commit, dispatch, state}, couponCode) {
    commit('setLoadingCoupon', true)

    try {
      commit('setCoupon', await api.coupons.simulate(state.product.publisher_founder_id, state.product.id, couponCode));
    } catch (err) {
      throw err;
    }

    commit('setLoadingCoupon', false);
    commit('setIsCouponSimulated', true);
  }
}
