<template>
  <div class="profile-page">
    <hero-section :not-waves="true" set-classes="is-bold">
      <div class="container">
        <h1 class="title">
          Meu Perfil
        </h1>
        <h2 class="subtitle">
          Gerencia todas as informações cadastradas em sua conta através das opções abaixo.
        </h2>
      </div>
    </hero-section>

    <div class="container">
      <div class="columns is-multiline is-centered" style="margin-top: 2rem;">
        <div class="column is-4">
          <router-link to="/profile/account-settings" class="button is-fullwidth multiline has-icons-left is-light is-large">
            <span class="icon">
              <font-awesome-icon icon="address-card"></font-awesome-icon>
            </span>
            <span>Meus dados</span>
          </router-link>
        </div>
        <div class="column is-4 has-text-centered">
          <router-link to="/profile/public-settings" class="button is-fullwidth multiline has-icons-left is-light is-large">
            <span class="icon">
              <font-awesome-icon icon="user-friends"></font-awesome-icon>
            </span>
            <span>Perfil público</span>
          </router-link>
        </div>
        <div class="column is-4 has-text-centered">
          <router-link to="/profile/subscriptions" class="button is-fullwidth multiline has-icons-left is-light is-large">
            <span class="icon">
              <font-awesome-icon icon="file-invoice-dollar"></font-awesome-icon>
            </span>
            <span>Minhas compras</span>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from '@/store'
import {mapState,mapGetters} from 'vuex'
import HeroSection from './HeroSection.vue'
import FormControl from './Form/FormControl.vue'
import Form from '@/helpers/form'
import api from '../api'
import SubscriptionCardModal from './Profile/SubscriptionCardModal.vue'


export default {

	  name: 'Profile',

	  components: {
    HeroSection,
    FormControl,
    SubscriptionCardModal,
  },

  beforeRouteEnter (to, from, next) {
    next(vm => vm.startComponent())
  },
  beforeRouteLeave (from, to, next) {
    next()
  },

  data () {
    return {
      }
  },

  computed: {
  },

  methods: {

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

  .button {
    &.multiline {
      height: 6rem;
    }
  }

</style>
