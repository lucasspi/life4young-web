<template>
	<div class="forgot-password">
      <div class="container has-text-centered">
          <div class="column is-4 is-offset-4">
              <div class="box">
                  <form method="POST" action="" @submit.prevent="onSubmitForgotPasswordForm()">
                  <!--a class="button is-link is-block is-medium is-fullwidth">Entrar com Facebook</a>

                  <div class="is-divider" data-content="OU"></div -->
                    <p class="has-text-centered subtitle">Esqueci minha senha</p>

                      <div class="field">
                          <div class="control">
                              <input class="input is-medium" v-model="credentials.email" autocomplete="email" type="email" :placeholder="$t('forgot_password.fields.your_email')" autofocus="">
                          </div>
                      </div>

                      <button type="submit" class="button is-primary is-block is-medium is-fullwidth" :class="{'is-loading': sendingData}">
                        {{ $t('forgot_password.buttons.recover_my_password') }}
                      </button>

                      <div class="is-divider" data-content="OU"></div>

                      <router-link tag="button" to="/login" class="button is-default is-block is-medium is-fullwidth">
                        {{ $t('forgot_password.buttons.sign_in') }}
                      </router-link>

                  </form>
              </div>
          </div>
      </div>

	</div>
</template>

<script>
import Logo from "./Logo.vue";

export default {
  name: "forgot-password",

  components: {
    Logo
  },

  data() {
    return {
      credentials: {
        email: ''
      },
      sendingData: false
    };
  },

  methods: {
    onSubmitForgotPasswordForm() {
      this.sendingData = true;
      const data = this.credentials;
      this.axios.post('auth/recover', data).then(
        (response) => {
          this.$swal({
            type: 'success',
            title: this.$t("forgot_password.results.password_reseted_title"),
            html: this.$t("forgot_password.results.password_reseted")
          })
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

// .main-content {
// 	margin: 0;
// }

.forgot-password {
  background-image: url(/static/hero-background.png);
  background-size: cover;
  .logo {
    img {
      @include opacity(1);
      width: 150px;
      margin: 0 0 20px;

      @media screen and (max-width: 991px) {
        width: 70px;
        height: auto;
        margin: 0 auto 28px;
      }
    }
  }

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
</style>
