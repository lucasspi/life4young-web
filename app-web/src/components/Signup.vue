<template>
  <div class="signup">
    <p>&nbsp;</p>
    <div class="container is-fluid">
      <div class="columns">
        <div class="column is-12">
          <div class="steps" id="checkoutSteps">
            <div class="step-item is-active is-primary">
              <div class="step-marker">
              </div>
              <div class="step-details">
                <p class="step-title">Cadastro</p>
              </div>
            </div>
            <div class="step-item">
              <div class="step-marker">
                <div class="icon">
                  <vue-material-icon name="timeline"></vue-material-icon>
                </div>
              </div>
              <div class="step-details">
                <p class="step-title">Organizar meu evento!</p>
              </div>
            </div>
            <div class="steps-content">
              <div class="step-content is-active">
                <div class="columns  is-centered">
                  <div class="column box is-5">
                    <identification-form :is-chain-of-knowledge="is_chain_of_knowledge" @identified="onIdentification()" :after-oauth-redirect-url="redirectUrl ? redirectUrl : null"></identification-form>
                  </div>
                </div>
              </div>
              <div class="step-content">
                <div class="columns  is-centered">
                  <div class="column box is-8 has-text-centered">
                    <div v-if="is_chain_of_knowledge && !is_root_chain_of_knowledge">
                      <div class="title">Pronto!</div>
                      <p class="is-size-5">Clique no botão abaixo e inscreva-se com o <strong style="color:#5a96fc;">Facebook</strong> para acompanhar este e os próximos desafios: </p>
                      <p>&nbsp;</p>
                      <a :href="redirectUrl ? redirectUrl : '/'" class="button is-large is-success has-icons">
                        <span class="icon">
                          <vue-material-icon name="check" size="30"></vue-material-icon>
                        </span>
                        <span>Finalizar cadastro</span>
                      </a>
                      <p>&nbsp;</p>
                      <p class="is-size-7">* Abra com o <strong style="color:#5a96fc;">messenger do Facebook</strong> e clique em <strong style="color:#5a96fc;">começar.</strong></p>
                    </div>
                    <div v-else>
                      <div class="title">Pronto!</div>
                      <p class="is-size-4">
                        Você está cadastrado.
                        Só falta mais um passo.
                      </p>
                      <p>&nbsp;</p>
                      <p class="is-size-5" v-if="notification_supported">
                        Clique em <strong>Ativar avisos</strong>
                        abaixo, aceite para receber notificações, receba acesso
                        aos <strong>cursos gratuitos e futuras promoções</strong>.
                      </p>
                      <p>&nbsp;</p>
                      <button @click="onClickActivateNotifications" v-if="notification_supported" class="button is-fullwidth is-success has-icons" :class="{'is-loading': is_activating_notifications}">
                        <span class="icon">
                          <font-awesome-icon icon="bell"></font-awesome-icon>
                        </span>
                        <span>Ativar avisos</span>
                      </button>
                      <router-link v-else :to="redirectUrl ? redirectUrl : '/'" class="button is-fullwidth is-success has-icons">
                        <span class="icon">
                          <vue-material-icon name="timeline"></vue-material-icon>
                        </span>
                        <span>Organizar meu evento!</span>
                      </router-link>
                      <p>&nbsp;</p>
                      <p class="is-size-7">
                        <a href="javascript:void(0);" @click="onTroubleToActivate()">Está tendo problemas na última etapa? Entre em contato conosco</a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState, mapGetters} from 'vuex'
import bulmaSteps from 'bulma-extensions/bulma-steps/dist/js/bulma-steps.min.js'
import IdentificationForm from './ProductCheckoutPage/IdentificationForm.vue'
import AddressForm from './ProductCheckoutPage/AddressForm.vue'
import MobileDetect from 'mobile-detect'
import {checkRedirectUrl} from '../helpers'
import store from '../store'

function checkIsChainOfKnowledge(to) {
  let isChainOfKnowledge = false;
  if (to.query && to.query.hasOwnProperty('u') && to.query.u) {
    isChainOfKnowledge = true;
  }
  return isChainOfKnowledge;
}

export default {

  name: 'SignUp',

  components: {
    IdentificationForm,
    AddressForm
  },

  beforeRouteEnter (to, from, next) {
    let redirectUrl = checkRedirectUrl(to);
    let isChainOfKnowledge = checkIsChainOfKnowledge(to);
    store.dispatch('loadPlatform').then(() => {
      next(vm => {
        try {
          vm.setIsRootChainOfKnowledge(to.query.u === 'null');
        } catch (e) { console.error(e) }
          vm.setData(redirectUrl);
          vm.setIsChainOfKnowledge(isChainOfKnowledge);
      })
    })
  },

  beforeRouteUpdate (to, from, next) {
    this.redirectUrl = checkRedirectUrl(to);
    this.is_chain_of_knowledge = checkIsChainOfKnowledge(to);
    try {
      this.is_root_chain_of_knowledge = to.query.u === 'null';
    } catch (e) { console.error(e) }

    next(vm => {})
  },

  beforeRouteLeave (from, to, next) {
    next()
  },

  data () {
    return {
      steps: null,
      redirectUrl: null,
      is_activating_notifications: false,
      is_chain_of_knowledge: false,
      is_root_chain_of_knowledge: false,
    }
  },

  computed: {
    ...mapState(['platform']),
    ...mapState('products', ['product', 'loading_product']),
    ...mapState('order', ['show_payment_form', 'order']),
    ...mapGetters('products', ['product_lessons_count', 'product_lessons_duration_sum']),
    ...mapGetters('metadata', ['getMetadata']),
    ...mapState('userAddresses', ['addresses']),
    ...mapState('onesignal', ['notification_permission', 'notification_supported']),
    is_iphone () {
      if (window && window.navigator && window.navigator.userAgent) {
        let md = new MobileDetect(window.navigator.userAgent);
        return md.is('iPhone') || md.is('iPad');
      }
      return false;
    },
    Tawk_API: () => Tawk_API
  },

  methods: {
    setData (url) {
      if (url) {
        this.redirectUrl = url;
      }
      this.steps = new bulmaSteps('#checkoutSteps')
      this.checkIfUserLoggedIn()
      this.$scrollTo(document.body);
    },
    setIsChainOfKnowledge (isChainOfKnowledge) {
      this.is_chain_of_knowledge = isChainOfKnowledge;
      if (this.is_chain_of_knowledge && !this.redirectUrl) {
        if (this.is_root_chain_of_knowledge) {
          this.redirectUrl = '/invites';
        } else if (this.platform && this.platform.signup_invited_redirect_uri && this.platform.signup_invited_redirect_uri.value) {
          const redirectUri = this.platform.signup_invited_redirect_uri.value;
          this.redirectUrl = redirectUri;
        } else {
          this.redirectUrl = '/chain-of-knowledge';
        }
      }
    },
    setIsRootChainOfKnowledge (isRootChainOfKnowledge) {
      this.is_root_chain_of_knowledge = isRootChainOfKnowledge;
    },
    checkIfUserLoggedIn () {
      if (this.$auth.check()) {
        this.steps.next_step()
      }
    },
    // step 1
    onIdentification () {
      this.steps.next_step()
      this.$scrollTo(document.body);
      this.$ga.event('signup', 'onIdentification', 'success')
    },
    onClickActivateNotifications() {
      this.is_activating_notifications = true;

      this.$store.dispatch('onesignal/subscribeToNotifications').then(() => {
        this.$router.push(this.redirectUrl ? this.redirectUrl : '/');
        this.is_activating_notifications = false;
      })
    },
    onTroubleToActivate() {
      try {
        Tawk_API.maximize();
      } catch (e) {}

      this.$router.push(this.redirectUrl ? this.redirectUrl : '/');
    }
  }
}
</script>

<style lang="scss">
.signup {
  $cinzinha: #e2e2e2;
  background-color: $cinzinha;
}
</style>
