<template>
	<div class="reset-password">

	 <section class="hero is-fullheight">
        <div class="hero-body">
            <div class="container has-text-centered">
                <div class="column is-4 is-offset-4">

                    <div class="box">
                      <logo></logo>
                        <form method="POST" action="" @submit.prevent="onSubmitResetPasswordForm()">
		                    <!--a class="button is-link is-block is-medium is-fullwidth">Entrar com Facebook</a>

							          <div class="is-divider" data-content="OU"></div -->

                            <div class="field">
                                <div class="control">
                                    <input class="input is-medium" v-model="credentials.email" :disabled="true" type="email" :placeholder="$t('reset_password.fields.your_email')" autofocus="">
                                </div>
                            </div>

                            <div class="field">
                                <div class="control">
                                    <input class="input is-medium" v-model="credentials.password" type="password" :placeholder="$t('reset_password.fields.your_password')">
                                </div>
                            </div>

                            <div class="field">
                                <div class="control">
                                    <input class="input is-medium" v-model="credentials.password_confirmation" type="password" :placeholder="$t('reset_password.fields.your_password_again')">
                                </div>
                            </div>

                            <button type="submit" class="button is-primary is-block is-medium is-fullwidth" :class="{'is-loading': sendingData}">
                              {{ $t('reset_password.buttons.reset_my_password') }}
                            </button>

                            <div class="is-divider" data-content="OU"></div>

                            <router-link tag="button" to="/login" class="button is-default is-block is-medium is-fullwidth">
                              {{ $t('reset_password.buttons.sign_in') }}
                            </router-link>

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
function handleError(response) {
  if (typeof response === "undefined") {
    this.$swal({
      type: 'error',
      title: this.$t('login.results.title_unknown_error'),
      html: this.$t('login.results.unknown_error')
    })
  } else if (typeof response.data.errors !== "undefined") {
    let errorMsg = this.$t('login.errors.fix_form_errors');
    errorMsg += '<ul>';
    for (let i in response.data.errors) {
      let v = response.data.errors[i];
      if (Array.isArray(v)) {
        errorMsg += '<li>' + v.join('</li><li>') + '</li>';
      } else if (typeof v === "string") {
        errorMsg += `<li>${v}</li>`;
      }
    }
    errorMsg += '</ul>';
    this.$swal({type: 'error', title: this.$t('login.errors.fix_form_errors_title'), html: errorMsg})
  } else {
    this.$swal({type: 'error', title: response.data})
  }
}
export default {
  name: "reset-password",

  components: {
    Logo
  },

  data() {
    return {
      error: '',
      credentials: {
        token: '',
        email: '',
        password: '',
        password_confirmation: ''
      },
      sendingData: false
    };
  },

	beforeRouteEnter(to, from, next) {
		window.setTimeout(
      () => next(vm => vm.setData(to.params)),
      750
    );
  },

  beforeRouteUpdate(to, from, next) {
    this.setData(to.params);
    next();
  },

  methods: {
    setData(routeParams) {
      try {
        this.credentials.email = Base64.decode(routeParams.email);
        this.credentials.token = routeParams.token;
      } catch (e) {
        this.$swal({
          type: 'error',
          title: this.$t("reset_password.errors.invalid_reset_token_title"),
          html: this.$t("reset_password.errors.invalid_reset_token")
        })
      }
    },
    onSubmitResetPasswordForm() {
      this.sendingData = true;
      const data = this.credentials;
      this.axios.post('auth/password/reset', data).then(
        (response) => {
          let responseData = response.data;
          if (responseData.success) {
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
          } else {
            (handleError.bind(this))(response);
          }
        },
        (err) => {
          (handleError.bind(this))(err.response);
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

.reset-password {
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
