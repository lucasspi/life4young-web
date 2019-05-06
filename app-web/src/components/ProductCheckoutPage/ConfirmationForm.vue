<template>
  <div>
    <form action="" method="post" @submit.prevent="onSubmitForm">
      <div class="content has-text-centered">
        <p class="has-text-success" v-if="is_free_order">
          <vue-material-icon size="80" name="check_circle"></vue-material-icon>
        </p>
        <p class="is-size-3">Obrigado, <strong v-if="user">{{user.name}}</strong>!</p>
        <div v-if="order.payment_method_id == paymentMethods.CREDIT_CARD" class="credit-card-feedback">
          <p>Aguarde alguns instantes enquanto processamos seu pagamento.</p>
        </div>
        <div v-if="order.payment_method_id == paymentMethods.BILLET && is_free_order" class="boleto-feedback">
          <p>Você está agora a um clique de acessar os melhores cursos profissionalizantes do mercado.</p>
          <p>Você será redirecionado para a área de cursos, <router-link to="/">caso não seja, clique aqui.</router-link></p>
          <button class="button is-default is-large is-loading is-fullwidth"></button>
        </div>
        <div v-if="order.payment_method_id == paymentMethods.BILLET && !is_free_order" class="boleto-feedback">
          <p>Aguarde, vamos te redirecionar para a página de acompanhamento do seu pedido!</p>
        </div>
        <div v-if="order.payment_method_id == paymentMethods.PAYPAL" class="paypal-feedback">
          <p>Você agora está a um clique de acessar os melhores cursos profissionalizantes do mercado.</p>
          <button type="submit" class="button is-primary is-fullwidth is-large" :class="{'is-loading': cta_clicked}">Acessar plataforma</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
  import { mapState, mapGetters } from 'vuex'
  import store from '@/store'
  import Form from '@/helpers/form'
  import FormControl from '../Form/FormControl.vue'
  import axios from 'axios'
  import api from '../../api'
  import Clipboard from '../../helpers/clipboard'

  export default {

    name: 'confirmation-form',

    props: [],

    components: {
      FormControl
    },

    computed: {
      ...mapState("order", ["user", "user_address", "user_card", "product", "coupon", "order"]),
      ...mapGetters("order", ["is_free_order"])
    },

    mounted () {
    },

    data () {
      return {
        paymentMethods: api.orders.payment_methods,
        cta_clicked: false
      }
    },

    methods: {
      onSubmitForm () {
        this.cta_clicked = true;
        this.$emit('confirmed');
      },
      copyToClipboard(txt) {
        window.Clipboard.copy(txt);
        this.$swal({
          type: 'success',
          title: 'Pronto!',
          html: '<p>Código de barras copiado com sucesso!</p>'
        });
      }
    }
  }
</script>

<style lang="scss">
</style>
