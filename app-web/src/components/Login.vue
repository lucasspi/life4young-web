<template>
	<div class="login">
      <div class="container has-text-centered">
        <div class="column is-4 is-offset-4">
          <social-login @integration-detected="hasIntegrations = true"></social-login>
          <div v-if="hasIntegrations" class="is-divider" data-content="OU"></div>
        </div>
          <div class="column is-4 is-offset-4">
              <div class="box">
                  <form method="POST" action="" @submit.prevent="onSubmitLoginForm()">
                    <p class="has-text-centered subtitle">Acessar a plataforma</p>
                  <!--a class="button is-link is-block is-medium is-fullwidth">Entrar com Facebook</a>

                  <div class="is-divider" data-content="OU"></div -->

                      <div class="field">
                          <div class="control">
                              <input class="input is-medium" v-model="credentials.email" autocomplete="email" type="email" :placeholder="$t('login.fields.your_email')" autofocus="">
                          </div>
                      </div>

                      <div class="field">
                          <div class="control">
                              <input class="input is-medium" v-model="credentials.password" type="password" :placeholder="$t('login.fields.your_password')">
                          </div>
                      </div>
                      <div class="field">
                        <label class="checkbox">
                          <input type="checkbox" name="remember_me" v-model="credentials.remember_me" value="1">
                          {{$t('login.fields.remember_me')}}
                        </label>
                      </div>
                      <button type="submit" class="button primary-btn is-block is-medium is-fullwidth" :class="{'is-loading': sendingData}">
                        {{ $t('login.buttons.sign_in') }}
                      </button>


                      <p>
                        <br />
                        <router-link to="/forgot-password" class=" ">

                          <a clss href="../">{{$t('login.buttons.forgot_my_password')}}</a>
                        </router-link>
                      </p>

                      <!--div class="is-divider" data-content="OU"></div>

        <router-link tag="button" to="/register" class="button is-info is-outlined is-block is-medium is-fullwidth">Cadastrar</router-link -->

                  </form>
              </div>

            <div class="is-divider" data-content="OU"></div>
            <router-link to="/signup" class="button secondary-btn is-block is-medium is-fullwidth">{{$t('login.buttons.sign_up')}}</router-link>
          </div>
      </div>
	</div>
</template>

<script>
import Logo from "./Logo.vue";
import SocialLogin from './Login/SocialLogin.vue';
import {checkRedirectUrl} from '../helpers'

export default {
  name: "Login",

  components: {
    Logo, SocialLogin
  },

  beforeRouteEnter (to, from, next) {
    let redirectUrl = checkRedirectUrl(to);

    next(vm => {
      vm.setRedirectUrl(redirectUrl);
    })
  },

  beforeRouteUpdate (to, from, next) {
    this.redirectUrl = checkRedirectUrl(to);

    next(vm => {})
  },

  data() {
    return {
      credentials: {
        email: '',
        password: '',
        remember_me: ''
      },
      sendingData: false,
      redirectUrl: null,
      hasIntegrations: false
    };
  },

  methods: {
    setRedirectUrl(redirectUrl) {
      this.redirectUrl = redirectUrl;
    },
    onSubmitLoginForm() {
      this.sendingData = true;
      const data = this.credentials
      const loginPayload = {
        data,
        rememberMe: data.remember_me === "1",
        redirect: (this.redirectUrl ? this.redirectUrl : '/')
      }
      // const redirectUrl = this.redirectUrl;
      // const redirectToRightPage = () => this.$router.push()
      this.$auth.login(loginPayload).then(
        (response) => {
          this.$store.dispatch('subscriptions/fetchAll')
          // this.$store.dispatch('onesignal/updateUserEmail', this.$auth.user())
          this.$store.dispatch('onesignal/sendTag', {key: 'signed_up', value: 1})
        },
        (err) => {
          if (typeof err.response === "undefined") {
            this.$swal({
              type: 'error',
              title: this.$t('login.results.title_unknown_error'),
              html: this.$t('login.results.unknown_error')
            })
          } else if (typeof err.response.data.errors !== "undefined") {
            let errorMsg = this.$t('login.errors.fix_form_errors');
            errorMsg += '<ul>';
            for (let i in err.response.data.errors) {
              let v = err.response.data.errors[i];
              if (Array.isArray(v)) {
                errorMsg += '<li>' + v.join('</li><li>') + '</li>';
              }
            }
            errorMsg += '</ul>';
            this.$swal({type: 'error', title: this.$t('login.errors.fix_form_errors_title'), html: errorMsg})
          } else {
            this.$swal({type: 'error', title: err.response.data})
          }
        }
      ).finally(() => this.sendingData = false)
    }
  }
};
</script>

<style lang="scss">
@import "../assets/mixins.scss";

.login {
  //@include defaultGradient();
  $cinzinha: #e2e2e2;
  background-color: $cinzinha;
  .is-divider[data-content]::after, .is-divider-vertical[data-content]::after {
    background-color: $cinzinha;
  }
  .subtitle {
    color: #434343;
  }
  /*background-image: url(/static/hero-background.png);*/
  background-size: cover;
  &.socialguider {
    background-image: url(/static/login-background.png);
  }
  .logo {
    img {
      @include opacity(1);
      width: 350px;
      margin: 0 0 20px;

      @media screen and (max-width: 991px) {
        width: 70px;
        height: auto;
        margin: 0 auto 28px;
      }
    }
  }
  input {text-align: center}

  .links {
    text-align: center;

    li {
      display: inline-block;
      margin: 0 7px;
      a {
        color: $branco;
      }
    }
  }
}

.socialguider .logo img {
  width: 200px;
  height: auto;
}
</style>
