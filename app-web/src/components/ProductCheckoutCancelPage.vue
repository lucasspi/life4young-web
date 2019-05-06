<template>
  <div class="product-sale-page">
    <div class="checkout-header has-text-centered">
      <img src="/static/logo.png" class="logo" alt="Escola de arquitetos">
    </div>
    <p>&nbsp;</p>
    <div class="container is-fluid">
      <div class="columns is-centered">
        <div class="column is-4">
          <div class="box">
            <cancel-confirmation-form @confirmed="onConfirm"></cancel-confirmation-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CancelConfirmationForm from './ProductCheckoutCancelPage/CancelConfirmationForm.vue'
import store from '@/store'

export default {
  components: {
    CancelConfirmationForm
  },

  name: 'ProductCheckoutCancelPage.vue',

  beforeRouteEnter (to, from, next) {
    /// p/:publisherSlug/:productSlug
    store.commit('setMenuOpen', false)
    store.dispatch('products/fetchProduct', {publisher: to.params.publisherSlug, product: to.params.productSlug})
      .then(() => next(vm => {
        vm.$auth.fetch({ success: () => {}, error: () => {} })
      }))
  },

  beforeRouteUpdate (to, from, next) {
    this.$auth.fetch({ success: () => {}, error: () => {} })
    store.dispatch('products/fetchProduct', {publisher: to.params.publisherSlug, product: to.params.productSlug})
      .then(() => next(vm => {}))
  },

  beforeRouteLeave (from, to, next) {
    store.commit('setMenuOpen', null)
    next()
  },

  methods: {
    onConfirm () {
      this.$store.dispatch('subscriptions/fetchAll')
      this.$auth.fetch({
        success: () => {
          this.$router.push('/')
        },
        error: () => {
          this.$router.push('/')
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
