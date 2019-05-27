<template>
  <div>
    <div class="subtitle is-size-3" v-if="product.trial_days > 0 || (is_coupon_simulated && coupon.trial_days > 0)">
      <span v-html="$t('payment-form.title-trial')"></span>
      <strong>{{$t('payment-form.title-trial-ends-at')}}{{ new Date() | moment("add", `${product.trial_days} days`) | moment('DD/MM/YYYY') }}</strong>
    </div>
    <div class="subtitle is-size-3" v-else v-html="$t('payment-form.title')">
    </div>
    <div class="subtitle is-size-4 has-text-grey-light">
      {{ product.trial_days > 0 || (is_coupon_simulated && coupon.trial_days > 0) ? $t('payment-form.subtitle-trial') :$t('payment-form.subtitle')}}
    </div>
    <div class="payment-methods-options">
      <div class="buttons-list has-text-left">
        <a v-for="paymentMethod in available_payment_methods(product)" class="button is-large has-icons-left is-fullwidth" :disabled="payment_method_id === paymentMethod.id" :class="{'is-primary': payment_method_id === paymentMethod.id}" @click="onSelectPaymentMethod(paymentMethod.id)"  :key="paymentMethod.id">
          <span class="icon is-large">
            <font-awesome-icon :icon="paymentMethod.icon"></font-awesome-icon>
          </span>
          <span>
            {{paymentMethod.label}}
          </span>
        </a>
      </div>
      <div v-html="product.payment_observations"></div>
    </div>
    <form v-if="payment_method_id === paypal_id" id="checkout_payment_form" action="" method="post" @submit.prevent="onSubmitPaypalForm">
      <div class="subtitle is-size-3" v-html="$t('payment-form.paypal.title')"></div>
      <div class="subtitle is-size-6 has-text-grey-light" v-html="$t('payment-form.paypal.subtitle')"></div>
      <div class="field">
        <label for="" class="label">Telefone</label>
        <div class="control">
          <vue-tel-input v-model="phone_input" :required="true" :placeholder="$t('identification-form.fields.phone_number')" @onInput="onPhoneInput" autocomplete="tel-national" :preferredCountries="['br']"></vue-tel-input>
        </div>
        <p class="help is-danger" v-if="userInfosForm.errors.has('phone_country_code')" v-text="userInfosForm.errors.get('phone_country_code')"></p>
        <p class="help is-danger" v-if="userInfosForm.errors.has('phone_local_code')" v-text="userInfosForm.errors.get('phone_local_code')"></p>
        <p class="help is-danger" v-if="userInfosForm.errors.has('phone_number')" v-text="userInfosForm.errors.get('phone_number')"></p>
      </div>
      <div class="content">
        <p class="is-size-7 has-text-grey has-text-justified" v-html="$t('payment-form.advise.p1', {terms_url, terms2_url})"></p>


        <p v-if="product.trial_days > 0" class="is-size-7 has-text-grey has-text-justified" v-html="$t('payment-form.advise.p2', {publisher_name: product.publisher_founder.name, product_name: product.name, product_price: `R$ ${format_price(product.price)} / ${human_period}`})"></p>
      </div>

      <div class="control has-text-centered">
        <button type="submit" class="button is-large is-fullwidth is-primary" :class="{'is-loading': is_creating_order}">
          <span v-if="product.trial_days > 0 && !already_subscribed(product)">{{$t('payment-form.submit_with_trial')}}</span>
          <span v-else>{{$t('payment-form.submit')}}</span>
        </button>
      </div>
    </form>
    <form v-if="payment_method_id === boleto_id" id="checkout_payment_form" action="" method="post" @submit.prevent="onSubmitBoletoForm">
      <div class="subtitle is-size-3" v-html="$t('payment-form.billet.title')"></div>
      <div class="subtitle is-size-6 has-text-grey-light" v-html="$t('payment-form.billet.subtitle')"></div>
      <div class="field">
        <label for="" class="label">Telefone</label>
        <div class="control">
          <vue-tel-input v-model="phone_input" :required="true" :placeholder="$t('identification-form.fields.phone_number')" @onInput="onPhoneInput" autocomplete="tel-national" :preferredCountries="['br']"></vue-tel-input>
        </div>
        <p class="help is-danger" v-if="userInfosForm.errors.has('phone_country_code')" v-text="userInfosForm.errors.get('phone_country_code')"></p>
        <p class="help is-danger" v-if="userInfosForm.errors.has('phone_local_code')" v-text="userInfosForm.errors.get('phone_local_code')"></p>
        <p class="help is-danger" v-if="userInfosForm.errors.has('phone_number')" v-text="userInfosForm.errors.get('phone_number')"></p>
      </div>
      <div class="content">
        <p class="is-size-7 has-text-grey has-text-justified" v-html="$t('payment-form.advise.p1', {terms_url, terms2_url})"></p>
        <p v-if="product.trial_days > 0" class="is-size-7 has-text-grey has-text-justified" v-html="$t('payment-form.advise.p2', {publisher_name: product.publisher_founder.name, product_name: product.name, product_price: `R$ ${format_price(product.price)} / ${human_period}`})"></p>
      </div>
      <div class="control has-text-centered">
        <button type="submit" class="button is-large is-fullwidth is-primary" :class="{'is-loading': is_creating_order}">
          <span v-if="product.trial_days > 0 && !already_subscribed(product)">{{$t('payment-form.submit_with_trial')}}</span>
          <span v-if="product.is_recurring && product.trial_days <= 0">{{$t('payment-form.submit')}}</span>
          <span v-if="!product.is_recurring && product.trial_days <= 0">{{$t('payment-form.submit-pay-with-billet')}}</span>
        </button>
      </div>
    </form>
    <form v-if="payment_method_id === credit_card_id" id="checkout_payment_form" action="" method="post" @submit.prevent="onSubmitCreditCardForm">
      <div class="subtitle is-size-3" v-html="$t('payment-form.credit-card.title')">
      </div>
      <div class="subtitle is-size-6 has-text-grey-light">
        {{$t('payment-form.credit-card.subtitle')}}
      </div>
      <div class="columns is-multiline">
        <div class="column is-12 has-text-centered">
          <div class="card-wrap"></div>
        </div>
        <div class="column is-12">
          <label class="label" :class="{ 'has-text-danger': card_form.errors.has(['card_number']) }">
            {{ $t('payment-form.fields.card_number') }}
          </label>
          <div class="field has-addons" tabindex="1">
            <div class="control has-icons-left card-number" @keydown="card_form.errors.clear('card_number')">
              <div class="icon is-small is-left">
                <vue-material-icon name="credit_card"></vue-material-icon>
              </div>
              <input class="input" type="text" :class="{'is-danger': card_form.errors.has('card_number')}"
                     :placeholder="$t('payment-form.placeholders.card_number')"
                     v-mask="'#### #### #### ####'"
                     name="card_number"
                     autocomplete="cc-number"
                     v-model="card_form.card_number" />
            </div>
            <div class="control card-expiration">
              <input class="input" type="text" :placeholder="$t('payment-form.placeholders.card_expiration_date')" name="card_expiration_date" v-model="card_form.card_expiration_date" autocomplete="cc-exp" />
            </div>
            <div class="control is-2 card-cvv">
              <input class="input" type="text" :placeholder="$t('payment-form.placeholders.card_cvv')" name="card_cvv" v-model="card_form.card_cvv" autocomplete="cc-csc" />
            </div>
          </div>
          <p class="help is-danger" v-if="card_form.errors.has('card_number')" v-text="card_form.errors.get('card_number')"></p>
          <p class="help is-danger" v-if="card_form.errors.has('card_expiration_date')" v-text="card_form.errors.get('card_expiration_date')"></p>
          <p class="help is-danger" v-if="card_form.errors.has('card_expiration_month')" v-text="card_form.errors.get('card_expiration_month')"></p>
          <p class="help is-danger" v-if="card_form.errors.has('card_expiration_year')" v-text="card_form.errors.get('card_expiration_year')"></p>
          <p class="help is-danger" v-if="card_form.errors.has('card_cvv')" v-text="card_form.errors.get('card_cvv')"></p>

        </div>

        <div class="column is-12">
          <form-control :form="card_form" name="card_holder_name" :label="$t('payment-form.fields.card_holder_name')" control-class="has-icons-left">
            <input class="input" type="text" :placeholder="$t('payment-form.placeholders.card_holder_name')" autocomplete="cc-name" name="card_holder_name" v-model="card_form.card_holder_name">
            <div class="icon is-small is-left">
              <vue-material-icon name="account_circle"></vue-material-icon>
            </div>
          </form-control>

          <div class="field">
            <label for="" class="label">Telefone</label>
            <div class="control">
              <vue-tel-input v-model="phone_input" :required="true" :placeholder="$t('identification-form.fields.phone_number')" @onInput="onPhoneInput" autocomplete="tel-national" :preferredCountries="['br']"></vue-tel-input>
            </div>
            <p class="help is-danger" v-if="userInfosForm.errors.has('phone_country_code')" v-text="userInfosForm.errors.get('phone_country_code')"></p>
            <p class="help is-danger" v-if="userInfosForm.errors.has('phone_local_code')" v-text="userInfosForm.errors.get('phone_local_code')"></p>
            <p class="help is-danger" v-if="userInfosForm.errors.has('phone_number')" v-text="userInfosForm.errors.get('phone_number')"></p>
          </div>
          <form-control v-if="$auth.user() && !$auth.user().document_number" :form="userInfosForm" name="document_number" label="CPF/CNPJ" control-class="has-icons-left">
            <input class="input" type="text" v-mask="['###.###.###-##', '##.###.###/####-##']" placeholder="000.000.000-00" name="document_number" v-model="userInfosForm.document_number">
            <div class="icon is-small is-left">
              <vue-material-icon name="account_box"></vue-material-icon>
            </div>
          </form-control>

        </div>
        <div class="column is-12">
          <div class="content">
            <p class="is-size-7 has-text-grey has-text-justified" v-html="$t('payment-form.advise.p1', {terms_url, terms2_url})"></p>
            <p v-if="product.trial_days > 0" class="is-size-7 has-text-grey has-text-justified" v-html="$t('payment-form.advise.p2', {publisher_name: product.publisher_founder.name, product_name: product.name, product_price: `R$ ${format_price(product.price)} / ${human_period}`})"></p>
          </div>
          <div class="control has-text-centered">
            <button type="submit" class="button is-large is-fullwidth is-primary" :class="{'is-loading': form.sendingData || is_creating_order}">
              <span v-if="product.is_recurring && product.trial_days > 0 && !already_subscribed(product)">{{$t('payment-form.submit_with_trial')}}</span>
              <span v-if="product.is_recurring && product.trial_days > 0 && already_subscribed(product)">{{$t('payment-form.submit')}}</span>
              <span v-if="product.is_recurring && product.trial_days <= 0">{{$t('payment-form.submit')}}</span>
              <span v-if="!product.is_recurring">{{$t('payment-form.submit-pay-with-cc')}}</span>
            </button>
          </div>
        </div>
        <div class="column is-12 ssl-certifications">
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import store from '@/store'
import Form from '@/helpers/form'
import FormControl from '../Form/FormControl.vue'
import axios from 'axios'
import api from '../../api'
import Card from 'card'
import {handleApiErrors} from '../../helpers'

export default {

  name: 'payment-form',

  props: [],

  components: {
    FormControl
  },

  computed: {
    ...mapState('userCards', [
      'cards', 'loading_cards'
    ]),
    ...mapState("order", ["product", 'is_creating_order','show_payment_form', 'coupon', 'is_coupon_simulated', 'payment_method_id']),
    ...mapGetters("subscriptions", ['already_subscribed']),
    ...mapGetters('order', ['format_price', 'human_period']),
    ...mapGetters('products', ['available_payment_methods'])
  },

  mounted () {
    this.$store.dispatch('userCards/fetchCards')
  },

  data () {
    return {
      pagarmeEncryptionKey: process.env.PAGARME_ENCRYPTION_KEY,
      //payment_method_id: null,
      credit_card_id: api.orders.payment_methods.CREDIT_CARD,
      boleto_id: api.orders.payment_methods.BILLET,
      paypal_id: api.orders.payment_methods.PAYPAL,
      card_form: new Form({
        card_number: '',
        card_holder_name: '',
        card_expiration_date: '',
        card_expiration_month: '',
        card_expiration_year: '',
        card_cvv: ''
      }),
      userInfosForm: new Form({
        phone_country_code: '',
        phone_local_code: '',
        phone_number: ''
      }),
      form: new Form({
        label: '',
        brand: '',
        payload: ''
      }),
      terms_url: 'https://escoladearquitetos.com.br/termos-de-uso',
      terms2_url: 'https://escoladearquitetos.com.br/termos-de-compra',
      card: null,
      phone_input: '',
      is_phone_input_valid: false
    }
  },

  methods: {
    onSelectPaymentMethod(paymentMethodId) {
      this.$store.commit('order/setPaymentMethodId', paymentMethodId);
      window.setTimeout(() => {
          this.$scrollTo(document.getElementById('checkout_payment_form'));
          if (paymentMethodId === api.orders.payment_methods.CREDIT_CARD) {
            this.card = new Card({
              form: '#checkout_payment_form',
              container: '.card-wrap',
              formSelectors: {
                numberInput: 'input[name="card_number"]', // optional — default input[name="number"]
                expiryInput: 'input[name="card_expiration_date"]', // optional — default input[name="expiry"]
                cvcInput: 'input[name="card_cvv"]', // optional — default input[name="cvc"]
                nameInput: 'input[name="card_holder_name"]' // optional - defaults input[name="name"]
              },
              placeholders: {
                number: '•••• •••• •••• ••••',
                name: 'NOME DO PORTADOR',
                expiry: '••/••',
                cvc: '•••'
              },
              messages: {
                validDate: 'data\nde validade',
                monthYear: 'mm/aa'
              }
            });
          }
      }, 500);
      if (this.payment_method_id === this.paypal_id) {
        /*window.setTimeout(() => this.onSubmitPaypalForm(), 1500);*/
      }
    },
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
    extractPhoneFragments() {
      if (!this.is_phone_input_valid) {
        this.$swal({
          type: 'error',
          title: this.$t('payment-form.errors.title'),
          html: this.$t('login.errors.phone_not_valid')
        })
        return false;
      }
      let phoneNumber = this.phone_input.split(' ');
      const phoneFragments = {
        phone_country_code: phoneNumber.shift(),
        phone_local_code: phoneNumber.shift(),
        phone_number: phoneNumber.join('')
      };
      return phoneFragments;
    },
    updatePhoneInfos() {
      const phoneFragments = this.extractPhoneFragments();
      if (!phoneFragments) {
        return new Promise((resolve, reject) => {
          reject();
        });
      }
      this.$store.commit('order/setIsCreatingOrder', true);
      if (this.$auth.user() && !this.$auth.user().document_number) {
        this.userInfosForm.originalData.document_number = '';
      }
      for (let field in phoneFragments) {
        this.userInfosForm[field] = phoneFragments[field];
      }
      return this.userInfosForm.put(api.users._updateLoggedUser()).then(
        a => a
      )
    },
    onSubmitPaypalForm() {
      this.$store.commit('order/setGateway', 'paypal');
      this.updatePhoneInfos()
        .then(() => this.$store.dispatch('order/tryCreate'))
        .then(
          () => this.$emit('done'),
          (err) => {
            this.$swal({
              type: 'error',
              title: this.$t('payment-form.errors.title'),
              html: this.$t('payment-form.errors.paypal_error_msg', {msg: handleApiErrors(err.response)})
            })
          }
        )
    },
    onSubmitBoletoForm() {
      this.$store.commit('order/setGateway', 'pagarme');
      this.updatePhoneInfos()
        .then(() => this.$store.dispatch('order/tryCreate'))
        .then(
          () => this.$emit('done'),
          (err) => {
            this.$swal({
              type: 'error',
              title: this.$t('payment-form.errors.title'),
              html: this.$t('payment-form.errors.billet_error_msg', {msg: handleApiErrors(err.response)})
            })
          }
        )
    },
    onSubmitCreditCardForm () {
      let card = this.card_form;
      // card.card_expiration_date = `${card.card_expiration_month}/${card.card_expiration_year}`;
      let validations = pagarme.validate({card})
      console.log('validations: ', validations);
      let errors = {
        has: false,
        card_number: [],
        card_holder_name: [],
        card_expiration_date: [],
        card_expiration_month: [],
        card_expiration_year: [],
        card_cvv: []
      };
      if (validations.card.brand === 'unknown') {
        errors.card_number.push(this.$t('payment-form.errors.brand_unknown'));
        errors.has = true;
      }
      if (validations.card.card_cvv === false) {
        errors.card_cvv.push(this.$t('payment-form.errors.card_cvv'));
        errors.has = true;
      }
      if (validations.card.card_expiration_date === false) {
        this.$swal({type: 'error', title: this.$t('payment-form.errors.title'), html: this.$t('payment-form.errors.card_expiration_date')});
        errors.has = true;
      }
      if (validations.card.card_expiration_month === false) {
        errors.card_expiration_month.push(this.$t('payment-form.errors.card_expiration_month'));
        errors.has = true;
      }
      if (validations.card.card_expiration_year === false) {
        errors.card_expiration_year.push(this.$t('payment-form.errors.card_expiration_year'));
        errors.has = true;
      }

      if (errors.has) {
        return this.card_form.onFail(errors);
      }

      this.form.sendingData = true;
      pagarme.client
        .connect({
          encryption_key: this.pagarmeEncryptionKey
        })
        .then(client => client.security.encrypt(card))
        .then(cardHash => {
          console.log('[hash final] ', cardHash)
          this.form.brand = validations.card.brand;
          this.form.label = card.card_number.substr(card.card_number.length - 4, 4);
          this.form.payload = cardHash;

          this.form.originalData = {...this.form.originalData, ...this.card_form.originalData};
          const cardFormData = this.card_form.data();
          for (let field in cardFormData) {
            this.form[field] = cardFormData[field];
          }
          return this.form.post('checkout/cards');
        })
        .then((response) => {
          let cardObject = response.data;

          this.$store.commit('order/setUserCard', cardObject);
          this.$store.commit('order/setGateway', 'pagarme');

          return this.updatePhoneInfos()
        })
        .then(() => this.$store.dispatch('order/tryCreate'))
        .then((response) => {
          // order created... or not
          this.$emit('done')
        }, (err) => {
          // order error...
          this.$swal({
            type: 'error',
            title: this.$t('payment-form.errors.title'),
            html: this.$t('payment-form.errors.credit_card_error_msg', {msg: handleApiErrors(err.response)})
          })
        })
        .finally(() => { this.form.sendingData = false })
    }
  }
}
</script>

<style lang="scss">
  @import '~bulma/sass/utilities/mixins';
  @include mobile() {
    .card-wrap {
      zoom: 0.9;
    }
    .control {
      &.card-number {
        width: 58%;
      }
      &.card-expiration {
        width: 22%;
      }
      &.card-cvv {
        width: 20%;
      }
    }
  }
  @include desktop() {
    .control {
      &.card-number {
        width: 66.6666666666%;
      }
      &.card-expiration {
        width: 16.6666666667%;
      }
      &.card-cvv {
        width: 16.6666666667%;
      }
    }

  }
  .ssl-certifications {
    margin-top: 10px;
    img {
      opacity: 0.8;
      &.sq {
        max-width: 60px;
      }
      &.sp {
        max-width: 150px;
      }
    }
  }
  .buttons-list {
    margin-bottom: 40px;
    .button {
      border-radius: 0;
      border-top-color: transparent;
      &:first-child {
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
        border-top-color: #dbdbdb;
      }
      &:last-child {
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;
      }
    }
  }
</style>
