<template>
  <div class="profile-page">
    <hero-section :not-waves="true" set-classes="is-bold">
      <div class="container">
        <h1 class="title">
          Minhas compras (planos e pacotes)
        </h1>
        <router-link class="button is-light is-medium" to="/profile">Voltar para meu perfil</router-link>
      </div>
    </hero-section>

    <div class="container">
      <div class="columns is-multiline is-centered">
        <div class="column is-10">
          <table class="table" style="width: 100%;margin-top:1rem;">
            <thead>
            <th>#</th>
            <th>Pacote</th>
            <th class="has-text-centered">Método de pagamento</th>
            <th class="has-text-centered">Status</th>
            <th class="has-text-right">Opções</th>
            </thead>
            <tbody>
            <tr v-for="subscription in subscriptions">
              <td>{{subscription.id}}</td>
              <td :class="{'has-text-grey': subscription.product.deleted_at}" :title="subscription.product.deleted_at ? 'Este plano não é mais comercializado' : ''">
                <p>{{subscription.product.name}}</p>
                <p class="is-size-7">
                  <span class="tag is-light" v-if="subscription.product.is_recurring">Plano recorrente</span>
                  <span class="tag is-dark" v-if="!subscription.product.is_recurring">Compra única</span>
                  <span v-if="subscription.order" class="tag is-white" :class="{'has-text-light': subscription.subscription_status_id === subscription_status_trial}">
                      R$ {{format_price(subscription.order.price)}}
                      {{ subscription.product.is_recurring ? ' / ' : ''}}
                      {{subscription.product.is_recurring ? subscription.product.human_recurrency_period : ''}}
                    </span>
                  <span class="tag is-warning" v-if="subscription.subscription_status_id === subscription_status_trial">
                      Período de testes termina em:&nbsp;<strong>{{subscription.expires_at | moment('DD/MM/YYYY')}}</strong>
                    </span>
                </p>
              </td>
              <td class="has-text-centered">
                <p class="is-size-7 has-text-centered" v-if="subscription.order && subscription.order.payment_method && subscription.order.payment_method.name">
                  {{subscription.order.payment_method.name}}
                </p>
                <div v-if="subscription.is_cancelable && subscription.order && subscription.order.user_card && subscription.product && subscription.product.is_recurring" class="field has-addons justify-center tooltip" data-tooltip="Atualize o cartão de crédito registrado para cobrança desse pacote.">
                  <p class="control">
                    <button @click="onClickEditCard(subscription.id, subscription.order.user_card.id)" class="button is-large is-light">
                        <span class="icon is-size-2 is-large" style="height: 0.5em;">
                          <font-awesome-icon :icon="['fab', 'cc-' + subscription.order.user_card.brand]"></font-awesome-icon>
                        </span>
                      <span class="is-size-7">
                          <span class="is-uppercase">{{subscription.order.user_card.brand}}</span><br />
                          Final: {{subscription.order.user_card.label}}
                        </span>
                    </button>
                  </p>
                  <p class="control">
                    <button @click="onClickEditCard(subscription.id, subscription.order.user_card.id)" class="button is-large is-dark">
                        <span class="icon is-size-6">
                          <font-awesome-icon icon="edit"></font-awesome-icon>
                        </span>
                    </button>
                  </p>
                </div>
              </td>
              <td class="has-text-centered">
                <span class="tag is-uppercase is-size-7" :class="subscription.status.color_css">{{subscription.status.name}}</span>
              </td>
              <td class="has-text-right">
                <button v-if="subscription.product.is_recurring" @click="onClickCancelSubscription(subscription)" class="button is-default is-small has-icons-left" :disabled="!subscription.is_cancelable">
                  <span>Cancelar assinatura</span>
                </button>
              </td>
            </tr>
            </tbody>
          </table>

        </div>
      </div>
    </div>
    <subscription-card-modal @closed="card_modal_active = false" @done="onCardModalSuccess()" :active="card_modal_active" :subscription_id="card_modal_subscription_id" :user_card_id="card_modal_card_id"></subscription-card-modal>
  </div>
</template>

<script>
  import Vue from 'vue'
  import VueCroppie from 'vue-croppie';
  import axios from 'axios'
  import FirstTeamBadgeIcon from './Icons/FirstTeamBadgeIcon.vue'
  import store from '@/store'
  import {mapState,mapGetters} from 'vuex'
  import HeroSection from './HeroSection.vue'
  import FormControl from './Form/FormControl.vue'
  import Form from '@/helpers/form'
  import api from '../api'
  import SubscriptionCardModal from './Profile/SubscriptionCardModal.vue'
  Vue.use(VueCroppie);

  export default {

    name: 'Profile',

    components: {
      FirstTeamBadgeIcon,
      HeroSection,
      FormControl,
      SubscriptionCardModal,
    },

    beforeRouteEnter (to, from, next) {
      store.dispatch('subscriptions/fetchAll').then(
        () => next(vm => vm.startComponent())
      )
    },
    beforeRouteLeave (from, to, next) {
      store.dispatch('subscriptions/fetchAll').then(
        () => next(vm => vm.startComponent())
      )
      next()
    },

    data () {
      return {
        card_modal_active: false,
        card_modal_subscription_id: null,
        card_modal_card_id: null,
      }
    },

    computed: {
      ...mapState('subscriptions', ['subscriptions', 'is_loading_subscriptions']),
      payment_method_credit_card() {
        return api.orders.payment_methods.CREDIT_CARD;
      },
      subscription_status_trial() {
        return api.subscriptions.statuses.TRIALING
      },
      ...mapGetters('order', ['format_price']),
      ...mapState('subscriptions', ['subscriptions', 'is_loading_subscriptions']),
    },

    methods: {
      startComponent () {

      },
      onClickEditCard (subscriptionId, userCardId) {
        this.card_modal_active = true;
        this.card_modal_subscription_id = subscriptionId;
        this.card_modal_card_id = userCardId;
      },
      onCardModalSuccess() {
        this.card_modal_active = false;
        this.$swal({type: 'success', title: 'Pronto!', html: '<p>Seu método de pagamento foi atualizado com sucesso</p>'})
      },
      onClickCancelSubscription(subscription) {
        this.$swal({
          type: 'info',
          title: this.$t('profile.cancel-subscription.confirm.title'),
          html: this.$t('profile.cancel-subscription.confirm.message'),
          preConfirm: () => this.$store.dispatch('subscriptions/cancel', subscription.id),
          showLoaderOnConfirm: true,
          allowOutsideClick: false,
          showCancelButton: true,
          confirmButtonText: this.$t('profile.cancel-subscription.confirm.btn-confirm'),
          cancelButtonText: this.$t('profile.cancel-subscription.confirm.btn-cancel')
        }).then((res) => {
          if (res.dismiss && res.dismiss === 'cancel') {
            return;
          }
          this.$store.dispatch('subscriptions/fetchAll');
          this.$swal({
            type: 'success',
            title: this.$t('profile.cancel-subscription.result.title'),
            html: this.$t('profile.cancel-subscription.result.message')
          })
        }, (err) => {
          this.$swal({
            type: 'error',
            title: this.$t('profile.cancel-subscription.error.title'),
            html: this.$t('profile.cancel-subscription.error.message', {error_msg: err})
          })
        })
      }
    }
  }
</script>

<style lang="scss">
  .profile-page {
    margin-bottom: 50px;
  }
  .stat-val {
    font-size: 3em;
    padding-top: 20px;
    font-weight: bold;
  }

  .stat-key {
    font-size: 1.4em;
    font-weight: 200
  }

  .section.profile-heading .column.is-2-tablet.has-text-centered + .has-text-centered {
    border-left: 1px dotted rgba(0, 0, 0, .2);
  }

  .container.profile {
    margin-top: 1%;
  }

  .control.is-pulled-left span.select {
    margin-right: 5px;
    border-radius: 2px;
  }


</style>
