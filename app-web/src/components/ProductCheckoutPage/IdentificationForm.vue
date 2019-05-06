<template>
  <form action="" method="post" @submit.prevent="onSubmitForm">
    <div class="columns is-multiline">
      <div class="column is-12">
        <div class="content has-text-centered" v-if="!isChainOfKnowledge">
          <p>{{$t("identification-form.instruction")}}</p>
        </div>
        <div class="content has-text-centered chain-of-knowledge" v-else>
          <h2>Bem-vind@ a corrente do bem!</h2>
          <p>Fique tranquilo, <strong>também não gostamos de spam.</strong> Essas informações são apenas para não termos usuários duplicados.</p>
        </div>
      </div>
      <div class="column is-12">
        <form-control :form="form" name="email" :label="$t('identification-form.labels.email')" control-class="has-icons-left">
          <input class="input" @keydown="onEmailKeydown" type="email" :placeholder="$t('identification-form.fields.email')" name="email" v-model="form.email" autocomplete="email">
          <div class="icon is-small is-left">
            <vue-material-icon name="email"></vue-material-icon>
          </div>
        </form-control>
      </div>
      <div v-if="!is_email_checked" class="column is-12">
        <div class="control has-text-centered">
          <button type="submit" class="button is-fullwidth is-primary" :class="{'is-loading': form.sendingData}">{{$t('identification-form.next')}}</button>
        </div>
        <div v-if="hasIntegrations" class="is-divider" data-content="OU"></div>
        <social-login @integration-detected="hasIntegrations = true" size="medium" verb="Continuar" :after-oauth-redirect-url="afterOauthRedirectUrl ? afterOauthRedirectUrl : window_location_href"></social-login>
      </div>
      <div v-if="is_email_checked && !has_signed_up" class="column is-12 has-not-signed-up">
        <div class="content">
          <p class="has-text-centered">
            {{ $t('identification-form.new-user-instructions') }}
          </p>
        </div>
        <form-control :form="form" name="password" :label="$t('identification-form.labels.email_confirmation')" control-class="has-icons-left">
          <input class="input" type="email" :placeholder="$t('identification-form.fields.email_confirmation')" name="password" v-model="form.password" autocomplete="email">
          <div class="icon is-small is-left">
            <vue-material-icon name="lock"></vue-material-icon>
          </div>
        </form-control>
        <form-control :form="form" name="password" :label="$t('identification-form.labels.phone_typing')" control-class="has-icons-left">
          <input class="input" type="email" :placeholder="$t('identification-form.fields.phone_typing')" name="password" v-model="form.password" autocomplete="email">
          <div class="icon is-small is-left">
            <vue-material-icon name="phone"></vue-material-icon>
          </div>
        </form-control>
        <form-control :form="form" name="name" :label="$t('identification-form.labels.name')" control-class="has-icons-left">
          <input type="text" class="input" :placeholder="$t('identification-form.fields.name')" name="name" v-model="form.name" autocomplete="name">
          <div class="icon is-small is-left">
            <vue-material-icon name="account_circle"></vue-material-icon>
          </div>
        </form-control>
        <form-control :form="form" name="document_number" :label="$t('identification-form.labels.document_number')" control-class="has-icons-left">
          <input class="input" type="text" v-mask="['###.###.###-##', '##.###.###/####-##']" :placeholder="$t('identification-form.fields.document_number')" name="document_number" v-model="form.document_number">
          <div class="icon is-small is-left">
            <vue-material-icon name="account_box"></vue-material-icon>
          </div>
        </form-control>
        <!--<form-control :form="form" name="recaptcha" :label="$t('identification-form.labels.captcha_verification')">
          <vue-recaptcha ref="recaptcha" :sitekey="recaptchaSiteKey" @verify="onCaptchaVerified"></vue-recaptcha>
        </form-control>-->
      </div>
      <div v-if="is_email_checked && has_signed_up" class="column is-12 has-already-signed-up">
        <div class="content">
          <p class="has-text-centered">
            {{ $t('identification-form.existing-user-instructions') }}
          </p>
        </div>
        <form-control :form="form" name="password" :label="$t('identification-form.labels.password')" control-class="has-icons-left">
          <input class="input" type="password" :placeholder="$t('identification-form.fields.password')" name="password" v-model="form.password">
          <div class="icon is-small is-left">
            <vue-material-icon name="lock"></vue-material-icon>
          </div>
        </form-control>
        <div class="content">
          <p><router-link to="/forgot-password">{{$t('identification-form.forgot-password')}}</router-link></p>
        </div>
      </div>
      <div v-if="is_email_checked" class="column is-12">
        <div class="control has-text-centered">
          <button v-if="has_signed_up" type="submit" class="button is-primary is-fullwidth" :class="{'is-loading': form.sendingData}">{{$t('identification-form.submit')}}</button>
          <invisible-recaptcha v-else :sitekey="recaptchaSiteKey" :validate="onCaptchaStart" :callback="onCaptchaVerified"
                               :class="'button is-primary is-fullwidth ' + (form.sendingData ? 'is-loading' : '')" type="submit" :disabled="form.sendingData">
            {{$t('identification-form.submit')}}
          </invisible-recaptcha>
          <p class="help is-danger" v-if="form.errors.has('recaptcha')" v-text="form.errors.get('recaptcha')"></p>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import { mapState } from 'vuex'
import store from '@/store'
import Form from '@/helpers/form'
import FormControl from '../Form/FormControl.vue'
import axios from 'axios'
import cookie from '@/helpers/cookie'
import InvisibleRecaptcha from 'vue-invisible-recaptcha'
import SocialLogin from '../Login/SocialLogin.vue'

export default {

  name: 'identification-form',

  props: {
    isChainOfKnowledge: {
      default: false
    },
    afterOauthRedirectUrl: {
      default: null
    }
  },

  components: {
    FormControl, InvisibleRecaptcha, SocialLogin
  },

  computed: {
    window_location_href() {
      return window.location.href;
    }
  },

  data () {
    return {
      form: new Form({
        email: '',
        name: '',
        password: '',
        password_confirmation: '',
        recaptcha: '',
        document_number: '',
        invitation: '',
      }),
      is_email_checked: false,
      has_signed_up: false,
      recaptchaSiteKey: process.env.RECAPTCHA_SITE_KEY,
      phone_input: '',
      is_phone_input_valid: false,
      hasIntegrations: false
    }
  },

  methods: {
    onEmailKeydown(e) {
      if (e.keyCode === 9) { // tab, ignore
        return;
      }
      if (this.is_email_checked) {
        this.is_email_checked = false;
      }
    },
    /**
     * @param {string} number
     * the phone number inputted by user, will be formatted along with country code
     * // Ex: inputted: (AU) 0432 432 432
     * // number = '+61432421546'
     *
     * @param {Boolean} isValid
     * @param {string} country
     */
    onPhoneInput ({ number, isValid, country }) {
      console.log(number, isValid, country)
      if (isValid) {
        let numberFragments = number.split(' ');
        if (Array.isArray(numberFragments) && numberFragments.length > 0) {
          let smallNumbersCount = numberFragments.filter((num, idx, arr) => num.length <= 3);
          // Check if there is a local code with the country code
          if (smallNumbersCount.length >= 2) {
            this.is_phone_input_valid = isValid
            console.log(number, isValid, country)
            return;
          }
        }
      }
      console.log(number, false, country)
      this.is_phone_input_valid = false
    },
    onCaptchaStart() {
      this.form.sendingData = true;
      return true;
    },
    onCaptchaVerified(response) {
      console.log('Recaptcha Return: ', response);
      this.form.recaptcha = response;
      this.doSignup();
    },
    onSubmitForm () {
      if (!this.is_email_checked) {
        this.checkEmailSignedUp()
      }
      if (this.is_email_checked === true) {
        if (this.has_signed_up === true) {
          this.doLogin();
        } else if (this.has_signed_up === false) {
          this.doSignup();
        }
      }
    },
    checkEmailSignedUp () {
      this.form.sendingData = true
      axios.post('auth/check-email', {email: this.form.email}).then(
        (response) => {
          if (response.data && response.data.data && response.data.data.exists === true) {
            this.has_signed_up = true
          } else {
            this.has_signed_up = false
          }
          this.is_email_checked = true
          this.form.sendingData = false
        },
        (err) => {
          this.$swal({
            type: 'error',
            title: 'Erro!',
            html: '<p>Não foi possível checar o e-mail em nossos registros. Tente novamente mais tarde.</p>'
          })
          console.error(err)
          this.form.sendingData = false
        }
      )
    },
    doLogin() {
      this.form.sendingData = true
      let loginPayload = {
        data: {email: this.form.email, password: this.form.password},
        redirect: false
      };
      this.$auth.login(loginPayload).then(
        () => {
          let user = this.$auth.user()
          this.$store.commit('order/setUser', user)
          this.$emit('identified')
          this.$store.dispatch('onesignal/updateUserEmail', user)
          this.$store.dispatch('onesignal/sendTag', {key: 'signed_up', value: 1})
        },
        (err) => {
          if (typeof err.response === 'undefined') {
            this.$swal({
              type: 'error',
              title: this.$t('login.results.title_unknown_error'),
              html: this.$t('login.results.unknown_error')
            })
          } else if (typeof err.response.data.errors !== 'undefined') {
            let errorMsg = this.$t('login.errors.fix_form_errors')
            errorMsg += '<ul>'
            for (let i in err.response.data.errors) {
              let v = err.response.data.errors[i]
              if (Array.isArray(v)) {
                errorMsg += '<li>' + v.join('</li><li>') + '</li>'
              }
            }
            errorMsg += '</ul>'
            this.$swal({type: 'error', title: this.$t('login.errors.fix_form_errors_title'), html: errorMsg})
          } else {
            this.$swal({type: 'error', title: err.response.data})
          }
        }
      ).finally(() => this.form.sendingData = false)
    },

    doSignup() {
      if (this.form.recaptcha === '') {
        this.form.errors.record({
          recaptcha: [
            this.$t('login.errors.recaptcha_not_filled')
          ]
        });
        this.form.sendingData = false;
        return;
      }

      let cookieName = cookie.INVITE_COOKIE();
      if (cookie.check(cookieName)) {
        let invitationCookieVal = cookie.get(cookieName);
        this.form.invitation = invitationCookieVal;
      }

      this.form.post('auth/signup').then((response) => {
        let user = response.data;
        this.$store.dispatch('onesignal/updateUserEmail', user)
        this.$store.dispatch('onesignal/sendTag', {key: 'signed_up', value: 1})

        cookie.set('rememberMe', 'true', 15);
        this.$auth.token(null, user.signup_access_token);
        this.$auth.fetch();

        this.$store.commit('order/setUser', user)

        this.$emit('identified');
      }, (err) => {}
      )
    },

    resetForm() {
      this.is_email_checked = false;
      this.has_signed_up = false;
      this.form.reset();
    }
  }
}
</script>

<style lang="scss">

</style>
