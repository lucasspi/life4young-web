<template>
  <div class="login">
    <div class="container has-text-centered">
      <h1 class="title is-size-1">Aguarde</h1>
      <p class="subtitle is-size-3">Estamos fazendo seu login, você será redirecionado em instantes...</p>
      <button class="button is-loading is-white is-large"></button>
    </div>
  </div>
</template>

<script>
  import Logo from "./Logo.vue";
  import SocialLogin from './Login/SocialLogin.vue';
  import {checkRedirectUrl} from '../helpers'
  import store from '../store'
  import cookie from '../helpers/cookie'
  import Vue from 'vue'

  export default {
    name: "Login",

    components: {
      Logo, SocialLogin
    },

    beforeRouteEnter (to, from, next) {
      // let redirectUrl = checkRedirectUrl(to);
      const provider = to.params.provider;
      let queryParams = to.query;

      let cookieName = cookie.INVITE_COOKIE();
      if (cookie.check(cookieName)) {
        let invitationCookieVal = cookie.get(cookieName);
        queryParams.invitation = invitationCookieVal;
      }

      next(vm => {
        vm.provider = provider;
        vm.queryParams = queryParams;
        vm.startComponent();
      })
    },

    beforeRouteUpdate (to, from, next) {
      this.redirectUrl = checkRedirectUrl(to);

      next(vm => {})
    },

    data() {
      return {
        provider: null,
        queryParams: null
      };
    },

    methods: {
      startComponent () {
        const provider = this.provider;
        const queryParams = this.queryParams;
        store.dispatch('finishLoginThroughAuthIntegration', {provider, queryParams}).then((user) => {
          // If everything went fine we're going to onboard the user
          if (user && user.access_token) {
            cookie.set('rememberMe', 'true', 15);
            this.$auth.token(null, user.access_token);
            this.$auth.fetch({
              params: {},
              success: () => {
                this.$store.dispatch('getAfterOauthRedirectUrl').then(
                  (url) => {
                    window.location.href = url;
                  },
                  () => this.$router.push(
                    '/',
                    () => window.setTimeout(() => {
                      window.location.reload(true);
                    }, 1000)
                  )
                )
              },
              error: () => {
                console.log('[finishLoginThroughAuthIntegration] [vueauth]')
                this.$swal({
                  type: 'error',
                  title: 'Erro!!',
                  html: '<p>Erro ao tentar fazer login, não foi possível carregar os detalhes do seu usuário.</p>'
                });
              }
            });
          }
        }, (err) => {
          if (err && err.response && err.response.data && err.response.data.message) {
            const msg = err.response.data.message;
            this.$swal({
              type: 'error',
              title: 'Erro!',
              html: `<p>${msg}</p>`
            }).then(() => {
              this.$router.push('/login')
            })
          }
        })
      }
    }
  };
</script>

<style lang="scss">

</style>
