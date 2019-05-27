
export default {
  setProduct (state, product) {
    state.product = product;
  },
  setLoadingProduct(state, loadingProduct) {
    state.loading_product = loadingProduct;
  },
  setProducts(state, products) {
    state.products = products;
  },
  setLoadingProducts(state, loadingProducts) {
    state.loading_products = loadingProducts;
  },
  setCoupon(state, coupon) {
    state.coupon = coupon;
  },
  setLoadingCoupon(state, loadingCoupon) {
    state.loading_coupon = loadingCoupon;
  },
  setIsCouponSimulated(state, isCouponSimulated) {
    state.is_coupon_simulated = isCouponSimulated;
  }
}
