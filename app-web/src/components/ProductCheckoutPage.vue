<template>
  <div class="product-checkout-page">
    <p>&nbsp;</p>
    <div class="container is-fluid">
      <div class="columns">
        <div class="column">
          <div class="steps" id="checkoutSteps">
            <div class="step-item is-active is-primary">
              <div class="step-marker">
              </div>
              <div class="step-details">
                <p class="step-title">Passo 1</p>
              </div>
            </div>
            <div class="step-item">
              <div class="step-marker">
              </div>
              <div class="step-details">
                <p class="step-title">Passo 2</p>
              </div>
            </div>
            <div class="step-item">
              <div class="step-marker">
              </div>
              <div class="step-details">
                <p class="step-title">Passo 3</p>
              </div>
            </div>
            <div class="step-item">
              <div class="step-marker">
                <div class="icon">
                  <vue-material-icon name="timeline"></vue-material-icon>
                </div>
              </div>
              <div class="step-details">
                <p class="step-title">Aprender!</p>
              </div>
            </div>
            <div class="steps-content">
              <div class="step-content is-active">
                <div class="columns is-centered">
                  <div class="column is-8">
                    <identification-form @identified="onIdentification"></identification-form>
                  </div>
                </div>
              </div>
              <div class="step-content">
                <div class="columns is-centered">
                  <div class="column is-8">
                    <address-form @selected="onAddressFilled()"></address-form>
                  </div>
                </div>
              </div>
              <div class="step-content">
                <div class="columns is-centered">
                  <div class="column is-8">
                    <payment-form v-if="!is_free_order" @done="onPaymentSuccessful"></payment-form>
                    <div v-else>
                      <h1 class="title">Registrando seu pedido...</h1>
                      <p class="subtitle">Por favor aguarde</p>
                      <button class="button is-primary is-fullwidth is-loading"></button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="step-content">
                <div class="columns is-centered">
                  <div class="column is-8">
                    <confirmation-form @confirmed="onConfirmOrder"></confirmation-form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="column is-4">
          <payment-infos @freeordercoupon="onDetectFreeOrder()"></payment-infos>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState, mapGetters} from 'vuex'
import store from '@/store'
import Player from '@vimeo/player'
import HeroSection from './HeroSection.vue'
import CourseShowcase from './ProductSalePage/CourseShowcase.vue'
import bulmaSteps from 'bulma-extensions/bulma-steps/dist/js/bulma-steps.min.js'
import IdentificationForm from './ProductCheckoutPage/IdentificationForm.vue'
import PaymentForm from './ProductCheckoutPage/PaymentForm.vue'
import AddressForm from './ProductCheckoutPage/AddressForm.vue'
import ConfirmationForm from './ProductCheckoutPage/ConfirmationForm.vue'
import PaymentInfos from './ProductCheckoutPage/PaymentInfos.vue'
import PlanOptions from './ProductCheckoutPage/PlanOptions.vue'
import api from '../api'
import cookie from '../helpers/cookie'
import {getRandomInt, getCouponCode} from '../helpers'

function handleRefCookie (to) {
  if (to.query && to.query.hasOwnProperty('ref')) {
    let cookieEls = [to.params.publisherSlug, to.params.productSlug]
    let cookieName = cookie.REF_COOKIE(cookieEls)
    if (!cookie.check(cookieName)) {
      cookie.set(cookieName, to.query.ref, 15)
    }
  }
}

export default {

  name: 'ProductCheckoutPage',

  components: {
    HeroSection,
    CourseShowcase,
    IdentificationForm,
    PaymentForm,
    AddressForm,
    ConfirmationForm,
    PaymentInfos,
    PlanOptions
  },

  beforeRouteEnter (to, from, next) {
    /// p/:publisherSlug/:productSlug
    handleRefCookie(to)
    store.commit('setMenuOpen', false)

    let request = store.dispatch('products/fetchProduct', {publisher: to.params.publisherSlug, product: to.params.productSlug})

    const couponCode = getCouponCode(to);
    if (couponCode) {
      request = request.then(() => {
        store.commit('order/setProduct', store.state.products.product)
        store.dispatch('order/simulateCoupon', couponCode)
      })
    }

    request.then(
      () => next(
        vm => vm.setData(to.params.publisherSlug, to.params.productSlug, couponCode)
      )
    );
  },

  beforeRouteUpdate (to, from, next) {
    handleRefCookie(to)

    let request = store.dispatch('products/fetchProduct', {publisher: to.params.publisherSlug, product: to.params.productSlug});

    const couponCode = getCouponCode(to);
    if (couponCode) {
      request = request.then(() => {
        store.commit('order/setProduct', store.state.products.product)
        store.dispatch('order/simulateCoupon', couponCode)
      })
    }

    request.then(
        () => {
          this.setData(to.params.publisherSlug, to.params.productSlug, couponCode)
          next(vm => {})
        }
      )
  },

  beforeRouteLeave (from, to, next) {
    store.commit('setMenuOpen', null)
    store.dispatch('lead/stopNotifyNextInstantPurchase')
    Tawk_API.showWidget();
    next()
  },

  data () {
    return {
      publisher_slug: '',
      product_slug: '',
      steps: null,
      stepNumber: 1,
      redirect_url: null
    }
  },

  computed: {
    ...mapState('products', ['product', 'loading_product']),
    ...mapState('order', ['show_payment_form', 'order', 'coupon']),
    ...mapState('order', {'orderProduct': 'product'}),
    ...mapGetters('products', ['product_lessons_count', 'product_lessons_duration_sum']),
    ...mapGetters('metadata', ['getMetadata']),
    ...mapGetters('order', ['is_free_order']),
    ...mapState('userAddresses', ['addresses'])
  },

  methods: {
    setData (publisher, product, resetCoupon = true) {
      this.publisher_slug = publisher
      this.product_slug = product
      this.steps = new bulmaSteps('#checkoutSteps')
      this.checkIfUserLoggedIn()
      this.setOrderProduct()
      this.$store.commit('order/setPaymentMethodId', null)
      if (resetCoupon) {
        this.$store.commit('order/setCoupon', null)
        this.$store.commit('order/setIsCouponSimulated', false)
      }
      this.$scrollTo(document.body);
      window.setTimeout(
        () => this.$store.dispatch('leads/startNotifyNextInstantPurchase', this.product.id),
        getRandomInt(1, 10) * 1000
      );
      Tawk_API.hideWidget();
    },
    nextStep() {
      this.steps.next_step();
      this.stepNumber = this.stepNumber + 1;
    },
    setOrderProduct () {
      this.$store.commit('order/setProduct', this.product)
      // if (this.product.product_courses)
      if (this.product.courses && this.product.courses.length === 1 && this.product.courses[0].pivot.is_exclusive) {
        console.log('Set Product: ', this.product.courses);
        let route = this.$router.resolve({
          name: 'course',
          params: {
            courseSlug: this.product.courses[0].slug
          }
        });
        this.redirect_url = route.href;
      }
    },
    checkIfUserLoggedIn () {
      if (this.$auth.check()) {
        this.$store.commit('order/setUser', this.$auth.user())
        this.nextStep()
        this.checkIfUserHasAddress()
      }
    },
    checkIfUserHasAddress () {
      this.$store.dispatch('userAddresses/fetchAddresses').then(() => {
        if (Array.isArray(this.addresses) && this.addresses.length > 0) {
          this.$store.commit('order/setUserAddress', this.addresses[0])
          this.nextStep()
        }
      })
    },
    // step 1 result
    onIdentification () {
      this.nextStep()
      this.$scrollTo(document.body);
      this.$store.dispatch('subscriptions/fetchAll')
      this.$ga.event('productCheckoutPage', 'onIdentification', this.product.slug)
      this.$store.dispatch('onesignal/sendTag', {key: 'cart_item', value: this.product.slug})
    },
    // step 2 result
    onAddressFilled () {
      this.nextStep()
      this.$scrollTo(document.body);
      this.$ga.event('productCheckoutPage', 'onAddressFilled', this.product.slug)

      this.onDetectFreeOrder();
    },
    onDetectFreeOrder() {
      if (this.is_free_order && this.stepNumber === 3) {
        //this is a free product, let the user go right into the platform
        this.$store.commit('order/setGateway', 'pagarme');
        this.$store.commit('order/setPaymentMethodId', api.orders.payment_methods.BILLET);
        this.$store.dispatch('order/tryCreate').then(
          () => {
            this.nextStep();
            this.onConfirmOrder(5000);
          }
        )
      }
    },
    // step 3 result
    onPaymentSuccessful () {
      this.nextStep()
      this.$scrollTo(document.body);
      if (this.order.payment_method_id === api.orders.payment_methods.BILLET) {
        this.$ga.event('productCheckoutPage', 'onBilletGeneratedSuccessful', this.product.slug, this.product.price)
        this.$store.dispatch('onesignal/sendTag', {key: 'billet_generated', value: this.order.id})
        this.$router.push(`/orders/${this.order.id}`)
      }
      if (this.order.payment_method_id === api.orders.payment_methods.CREDIT_CARD) {
        this.$ga.event('productCheckoutPage', 'onCreditCardPaymentSuccessful', this.product.slug, this.product.price)
        this.$router.push(`/orders/${this.order.id}`)
      }
      if (this.order.payment_method_id === api.orders.payment_methods.PAYPAL) {
        let paypalExpressCheckoutLink = this.getMetadata(this.order, 'paypal_express_checkout_link')
        if (paypalExpressCheckoutLink) {
          this.$ga.event('productCheckoutPage', 'onPaypalExpressCheckoutRedirectSuccessful', this.product.slug, this.product.price)
          window.location.href = paypalExpressCheckoutLink.value
          this.$swal({
            type: 'info',
            title: this.$t('checkout-page.paypal.will-be-redirected.title'),
            html: this.$t('checkout-page.paypal.will-be-redirected.message'),
            showCancelButton: false,
            showLoaderOnConfirm: true,
            confirmButtonText: 'GO',
            allowOutsideClick: false,
            preConfirm: () => {
              return new Promise((resolve, reject) => {
                window.setTimeout(() => {
                  resolve()
                }, 5000)
              })
            }
          })
          this.$swal.clickConfirm()
        } else {
          this.$swal({
            type: 'error',
            title: this.$t('checkout-page.paypal.express-link-not-found.title'),
            html: this.$t('checkout-page.paypal.express-link-not-found.message')
          })
        }
      }
    },
    onConfirmOrder (waitTime = 1) {
      window.setTimeout(
        () => {
          this.$store.dispatch('subscriptions/fetchAll')
          this.$auth.fetch({
            success: () => {
              this.$router.push(this.redirect_url ? this.redirect_url : '/')
            },
            error: () => {
              this.$router.push(this.redirect_url ? this.redirect_url : '/')
            }
          })
        },
        waitTime
      )
    },
    sendGoogleConversion() {
      let gConversionTracking = this.getMetadata(this.orderProduct, 'google_conversion_tracking')
      if (gConversionTracking) {
        this.$store.dispatch('order/markGoogleAdsConversion', {send_to: gConversionTracking.value, transaction_id: this.order.id})
      } else {
        this.$store.dispatch('order/markGoogleAdsConversion', { transaction_id: this.order.id })
      }
    }
  }
}
</script>

<style lang="scss">
  @import "../assets/mixins.scss";
  .product-checkout-page {
    margin: 50px 0;
    @media screen and (max-width: 991px) {
      margin-left: 10px;
      margin-right: 10px;
    }
  }
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
