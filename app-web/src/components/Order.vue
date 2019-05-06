<template>
  <div class="order-page container">
    <div class="box">
      <div class="content has-text-centered">
        <div class="credit-card-feedback" v-if="order.payment_method_id == paymentMethods.CREDIT_CARD">
          <div v-if="has_credit_card_pending_feedback">
            <p>Seu pedido (#{{order.id}}) foi realizado com sucesso!</p>
            <p>Aguarde alguns instantes enquanto processamos seu pagamento...</p>
            <button class="button is-white is-loading"></button>
          </div>
          <div v-else>
            <!--
              WAITING: 1,
              AUTHORIZED: 2,
              PAID: 3,
              REFUNDED: 4,
              WAITING_PAYMENT: 5,
              PENDING_REFUND: 6,
              REFUSED: 7,
              CHARGEBACK: 8,
              CANCELED: 9,
              IN_ANALYSIS: 10,
              DISPUTE: 11
            -->
            <div v-if="order.transaction_status_id == transactionStatus.PAID">
              <p class="has-text-success">
                <vue-material-icon size="80" name="check_circle"></vue-material-icon>
              </p>
              <p>Seu pedido (#{{order.id}}) foi realizado e seu pagamento processado com sucesso!</p>
              <router-link class="button is-success is-fullwidth is-large" :to="`/dashboard`">Aprender!</router-link>
            </div>
            <div v-if="order.transaction_status_id == transactionStatus.AUTHORIZED">
              Transação autorizada
            </div>
            <div v-if="order.transaction_status_id == transactionStatus.REFUNDED">
              Transação reembolsada
            </div>
            <div v-if="order.transaction_status_id == transactionStatus.WAITING_PAYMENT">
              Aguardando pagamento
            </div>
            <div v-if="order.transaction_status_id == transactionStatus.PENDING_REFUND">
              Transação com reembolso pendente
            </div>
            <div v-if="order.transaction_status_id == transactionStatus.REFUSED">
              <p class="has-text-danger">
                <vue-material-icon size="80" name="cancel"></vue-material-icon>
              </p>
              <p>Transação recusada pelo emissor do cartão.</p>
              <p>Muitas vezes as transações são recusadas por motivos de segurança, para evitar uma fraude com seu cartão.</p>
              <p><strong>Recomendamos que você entre em contato com o emissor do cartão através do <u>telefone que se encontra na parte traseira de seu cartão de crédito.</u></strong></p>
              <router-link class="button is-success is-fullwidth" :to="`/p/${order.product.publisher_founder.slug}/${order.product.slug}/checkout`">Entrei em contato, tentar novamente</router-link>
            </div>
            <div v-if="order.transaction_status_id == transactionStatus.CHARGEBACK">
              Transação revertida/reembolsada (chargeback).
            </div>
            <div v-if="order.transaction_status_id == transactionStatus.CANCELED">
              Transação cancelada
            </div>
            <div v-if="order.transaction_status_id == transactionStatus.IN_ANALYSIS">
              Transação em análise
            </div>
            <div v-if="order.transaction_status_id == transactionStatus.DISPUTE">
              Transação em disputa
            </div>
            <p>&nbsp;</p>
            <h4>Informações do pedido:</h4>
            <p>Pacote: {{ order.product.name }}</p>
            <p>Número do pedido: #{{order.id}}</p>
          </div>
        </div>
        <div v-if="order.payment_method_id == paymentMethods.BILLET" class="boleto-feedback">
          <div v-if="has_pending_billet_generation">
            <p>Seu pedido (#{{order.id}}) foi realizado com sucesso!</p>
            <p>Aguarde alguns instantes enquanto geramos seu boleto...</p>
            <button class="button is-white is-loading"></button>
          </div>
          <div v-else>
            <p class="has-text-success">
              <vue-material-icon size="80" name="check_circle"></vue-material-icon>
            </p>
            <p>Seu pedido (#{{order.id}}) foi realizado com sucesso!</p>
            <p><strong>Falta apenas um passo</strong>. Realize o pagamento até o dia</strong></p>
            <h2>{{ order.last_transaction.billet_expires_at | moment("DD/MM/YYYY")}}</h2>
            <p>O pagamento pode levar de 1 a 3 dias úteis para cair em nosso sistema.</p>
            <p>Então, para você não ficar esperando <strong>nos envie um e-mail ou uma mensagem com o <u>comprovante de pagamento</u></strong> para que suas aulas sejam liberadas o quanto antes!</p>
            <hr>
            <h4>Informações do pedido:</h4>
            <p>
              Pacote: {{ order.product.name }}
            </p>
            <p>
              Data de vencimento: {{ order.last_transaction.billet_expires_at | moment("DD/MM/YYYY")}}
            </p>
            <p>Número do pedido: #{{order.id}}</p>
            <p><strong>Código de barras: {{ order.last_transaction.billet_barcode }} (<a href="javascript:void(0);" @click.prevent="copyToClipboard(order.last_transaction.billet_barcode)">copiar código de barras</a>)</strong></p>
            <a :href="order.last_transaction.billet_url" target="_blank" class="button is-success is-fullwidth is-medium">Visualizar seu boleto</a>
            <p>&nbsp;</p>
            <p>
              Você já pode acessar nossa plataforma e conferir os cursos que estão disponíveis
              <span v-if="order.product.trial_days <= 0">, <strong>mas ainda não poderá assistir as aulas</strong></span>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import store from '../store'
  import Clipboard from '../helpers/clipboard'
  import {mapState, mapGetters} from 'vuex'
  import api from '../api'

  export default {
    name: 'Order',

    beforeRouteEnter (to, from, next) {
      store.dispatch('order/fetchOrder', to.params.order_id).then(
        () => next((vm) => vm.startComponent())
      )
    },

    beforeRouteUpdate (to, from, next) {
      store.dispatch('order/fetchOrder', to.params.order_id).then(
        () => next((vm) => vm.startComponent())
      )
    },

    beforeRouteLeave (from, to, next) {
      next()
    },
    computed: {
      ...mapState("order", ["order"]),
      ...mapGetters('metadata', ['getMetadata']),
      has_pending_billet_generation() {
        return this.order.last_transaction &&
          !this.order.last_transaction.billet_url &&
          this.order.payment_method_id == api.orders.payment_methods.BILLET;
      },
      has_credit_card_pending_feedback() {
        return this.order.payment_method_id == api.orders.payment_methods.CREDIT_CARD &&
          this.order.transaction_status_id == api.orders.transaction_status.WAITING;
      }
    },

    mounted () {
    },

    data () {
      return {
        paymentMethods: api.orders.payment_methods,
        transactionStatus: api.orders.transaction_status
      }
    },

    methods: {
      startComponent() {
        if (this.has_pending_billet_generation || this.has_credit_card_pending_feedback) {
          this.checkForOrder();
        }
      },

      checkForOrder() {
        window.setTimeout(() => {
          this.$store.dispatch('order/fetchOrder', this.order.id).then(
            () => {
              if (this.order.payment_method_id == api.orders.payment_methods.CREDIT_CARD &&
                this.order.transaction_status_id == api.orders.transaction_status.PAID) {
                this.sendGoogleConversion();
              }
              if (this.has_pending_billet_generation || this.has_credit_card_pending_feedback) {
                this.checkForOrder()
              } else {
                window.setTimeout(() => this.$store.dispatch('subscriptions/fetchAll'), 1500);
              }
            }
          );
        }, 3500)
      },

      copyToClipboard(txt) {
        window.Clipboard.copy(txt);
        this.$swal({
          type: 'success',
          title: 'Pronto!',
          html: '<p>Código de barras copiado com sucesso!</p>'
        });
      },

      sendGoogleConversion() {
        let gConversionTracking = this.getMetadata(this.order.product, 'google_conversion_tracking')
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
.order-page {
  .box {
    margin-top: 50px;
    margin-bottom: 50px;
  }
}
</style>
