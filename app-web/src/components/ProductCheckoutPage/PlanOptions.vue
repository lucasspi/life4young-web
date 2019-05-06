
<template>
  <div v-if="featured_products && featured_products.length > 0" class="columns is-centered is-multiline plan-options">
    <div class="column is-12">
      <div class="is-size-4 has-text-centered">Veja outras formas de pagamento disponíveis:</div>
    </div>
    <div class="column is-4" v-for="product in featured_products">
      <router-link :to="`/p/${product.publisher_founder.slug}/${product.slug}/checkout`" class="box" :class="{'is-active': order_product.id === product.id}">
        <div class="has-text-centered is-size-4 is-title">
          {{product.name}}
          <small v-if="order_product.id === product.id">(selecionado)</small>
        </div>
        <span class="level is-size-7">
          <span class="level-item payment-methods" v-for="paymentMethod in available_payment_methods(product)">
            <span><font-awesome-icon  :icon="paymentMethod.icon"></font-awesome-icon></span>
            <span>{{paymentMethod.label}}</span>
          </span>
        </span>
      </router-link>
    </div>
  </div>
</template>

<script>
  import { mapState, mapGetters } from 'vuex'
  import store from '@/store'
  import Form from '@/helpers/form'
  import FormControl from '../Form/FormControl.vue'
  import axios from 'axios'
  import Countdown from './Countdown.vue'
  import FormControlHorizontal from '../Form/FormControlHorizontal.vue'

  export default {

    name: 'payment-infos',

    props: [],

    components: {
      FormControl,
      FormControlHorizontal,
      Countdown
    },

    computed: {
      ...mapGetters('products', ['featured_products', 'available_payment_methods']),
      ...mapState('products', ['loading_products']),
      ...mapState('order', {'order_product': 'product'})
    },

    data () {
      return {
        animation: 0,
        form: new Form({
          code: ''
        })
      }
    },

    methods: { }
  }
</script>

<style lang="scss">
  .plan-options {
    .box {
      padding: 0.5rem 0.75rem 0.75rem 0.75rem;
      .is-title {
        margin-bottom: 5px;
      }
      &.is-active {
        box-shadow: inset 0 1px 2px rgba(10, 10, 10, 0.2), 0 0 0 1px #3273dc;
        background-color: rgba( 50,115,220,0.2);
      }
    }
    .payment-methods {
      svg {
        margin: 0 5px;
      }
    }
  }
</style>
