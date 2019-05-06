<template>
  <div class="product-sale-page">
    <div class="checkout-header has-text-centered">
      <img src="/static/logo.png" class="logo" alt="Escola de arquitetos">
    </div>
    <p>&nbsp;</p>
    <div class="container is-fluid">
      <div class="columns is-centered">
        <div class="column is-8">
          <div class="box">
            <confirmation-form @confirmed="onConfirmOrder"></confirmation-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState, mapGetters} from 'vuex'
import store from '@/store'
import ConfirmationForm from './ProductCheckoutPage/ConfirmationForm.vue'
import api from '../api'

export default {

  name: 'ProductCheckoutSuccessPage',

  components: {
    ConfirmationForm
  },

  beforeRouteEnter (to, from, next) {
    /// p/:publisherSlug/:productSlug
    store.commit('setMenuOpen', false)
    let gateway = null;

    if (to.query.hasOwnProperty('g')) {
      if (to.query.g === 'paypal') {
        gateway = 'paypal';
      }
    }

    let requests = [
      store.dispatch('products/fetchProduct', {publisher: to.params.publisherSlug, product: to.params.productSlug})
    ];

    if (gateway === 'paypal') {
      requests.push(store.dispatch('order/verifyPaypalToken', to.query))
    }

    Promise.all(requests).then(
        () => next(
          vm => {
            if (gateway === 'paypal') {
              vm.setPaypal(to.query);
            }
          }
        )
      )
  },

  beforeRouteUpdate (to, from, next) {
    let gateway = null;

    if (to.query.hasOwnProperty('g')) {
      if (to.query.g === 'paypal') {
        gateway = 'paypal';
      }
    }

    let requests = [
      store.dispatch('products/fetchProduct', {publisher: to.params.publisherSlug, product: to.params.productSlug})
    ];

    if (gateway === 'paypal') {
      requests.push(store.dispatch('order/verifyPaypalToken', to.query))
    }

    Promise.all(requests)
      .then(
        () => next(
          vm => {
            if (gateway === 'paypal') {
              vm.setPaypal(to.query)
            }
          }
        )
      )
  },

  beforeRouteLeave (from, to, next) {
    store.commit('setMenuOpen', null)
    next()
  },

  data () {
    return {
      publisher_slug: '',
      product_slug: '',
      steps: null,
      paypal: {
        token: null,
        payer_id: null
      }
    }
  },

  computed: {
    ...mapState('products', ['product', 'loading_product']),
    ...mapState('order', ['show_payment_form', 'order']),
    ...mapGetters('products', ['product_lessons_count', 'product_lessons_duration_sum']),
    ...mapGetters('metadata', ['getMetadata'])
  },

  methods: {
    setPaypal(data) {
      let gConversionTracking = this.getMetadata(this.product, 'google_conversion_tracking')
      if (gConversionTracking) {
        gtag('event', 'conversion', { 'send_to': gConversionTracking.value, 'transaction_id': this.order.id })
      } else {
        gtag('event', 'conversion', { 'send_to': 'AW-969132948/iiMKCP-ZjYsBEJSXj84D', 'transaction_id': this.order.id })
      }
      if (data && data.hasOwnProperty('token')) {
        this.paypal.token = data.token;
      }
      if (data && data.hasOwnProperty('PayerID')) {
        this.paypal.payer_id = data.PayerID;
      }
      this.$auth.ready(() => {
        this.$store.commit('order/setUser', this.$auth.user());
      })
    },
    onConfirmOrder() {
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

<style lang="scss">
  @import "../assets/mixins.scss";

  .box.course-navigation {
    .subtitle {
      color: $preto;
      font-size: 18px;
    }
  }
  .box.payment {
    background-color: #4C4C4C;
    color: #FFF;
    .subtitle, strong {
      color: #FFF;
    }
    label.label {
      color: #FFF;
    }
    .vue-typer .custom.char {
      color: #FFF;
    }
  }
  .steps .step-item .step-details {
    .step-title {
      font-size: 13px;
    }
  }
  .steps .step-item.is-completed .step-marker,
  .steps .step-item.is-completed.is-primary .step-marker{
    background-color: rgba(0, 144, 247, 1);
  }
  .product-navigation {
    .price {
      text-align: center;
      .value {
        font-size: 35px;
        small {
          color: #CCC;
        }
        color: #1a1a1a;
        .recurring {
          color: #1f1f1f;
        }
      }
    }
  }
</style>
