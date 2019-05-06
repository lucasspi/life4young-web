<template>
	<div class="first-login">

	 <section class="hero is-fullheight">
        <div class="hero-body">
            <div class="container has-text-centered">
                <div class="column is-4 is-offset-4">
                    <div class="box">
                        <logo></logo>
                        <form method="POST" action="" @submit.prevent="onSubmitFirstLoginForm()">
		                    <!--a class="button is-link is-block is-medium is-fullwidth">Entrar com Facebook</a>

							          <div class="is-divider" data-content="OU"></div -->

                            <div class="field">
                                <div class="control">
                                    <input class="input is-medium" v-model="credentials.email" :disabled="true" type="email" :placeholder="$t('first_login.fields.your_email')" autofocus="">
                                </div>
                            </div>

                            <div class="field">
                              <div class="control">
                                <p><vue-typer :text="$t('first_login.fields.caption')" :repeat="0"></vue-typer></p>
                              </div>
                            </div>

                            <div class="field">
                                <div class="control">
                                    <input class="input is-medium" v-model="credentials.password" type="password" :placeholder="$t('first_login.fields.your_password')">
                                </div>
                            </div>

                            <div class="field">
                                <div class="control">
                                    <input class="input is-medium" v-model="credentials.password_confirmation" type="password" :placeholder="$t('first_login.fields.your_password_again')">
                                </div>
                            </div>

                            <button type="submit" class="button is-success is-block is-medium is-fullwidth" :class="{'is-loading': sendingData}">
                              {{ $t('first_login.buttons.set_my_password') }}
                            </button>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    	</section>

	</div>
</template>

<script>
import Logo from "./Logo.vue";
import {Base64} from 'js-base64'

export default {
  name: "reset-password",

  components: {
    Logo
  },

  data() {
    return {
      error: '',
      credentials: {
        first_login_token: '',
        email: '',
        password: '',
        password_confirmation: ''
      },
      sendingData: false
    };
  },

	beforeRouteEnter(to, from, next) {
		next(vm => vm.setData(to.params));
  },

  beforeRouteUpdate(to, from, next) {
    this.setData(to.params);
    next();
  },

  methods: {
    setData(routeParams) {
      try {
        this.credentials.email = Base64.decode(routeParams.email);
        this.credentials.first_login_token = routeParams.token;
      } catch (e) {
        this.$swal({
          type: 'error',
          title: this.$t("reset_password.errors.invalid_reset_token_title"),
          html: this.$t("reset_password.errors.invalid_reset_token")
        })
      }
    },
    onSubmitFirstLoginForm() {
      this.sendingData = true;
      const data = this.credentials;
      this.axios.post('auth/first-login', data).then(
        (response) => {
          this.$swal({
            type: 'success',
            title: this.$t("reset_password.results.password_reseted_title"),
            html: this.$t("reset_password.results.password_reseted"),
            preConfirm: () => {
              return this.$auth.login({data: this.credentials});
            }
          }).then(
            () => this.$router.push({name: 'Home'}),
            (err) => {
              // @TODO: Error handling
            }
          )
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

.first-login {
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
