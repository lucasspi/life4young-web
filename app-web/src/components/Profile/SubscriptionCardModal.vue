<template>
  <div class="modal bank-account-modal" style="z-index: 99999;" :class="{'is-active': active}">
    <div class="modal-background"></div>
    <div class="modal-content">
      <div class="box">
        <form id="subscription_card_form" action="" method="post" @submit.prevent="onSubmitCreditCardForm">
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
            </div>
            <div class="column is-12">
              <div class="control has-text-centered">
                <button type="submit" class="button is-large is-fullwidth is-primary" :class="{'is-loading': form.sendingData}">
                  Atualizar método de pagamento
                </button>
              </div>
            </div>
            <div class="column is-12 ssl-certifications">
            </div>
          </div>
        </form>
      </div>
    </div>
    <button class="modal-close is-large" aria-label="close" @click="$emit('closed')"></button>
  </div>
</template>

<script>
  import FormControl from '../Form/FormControl.vue'
  import Form from '../../helpers/form'
  import cookie from '../../helpers/cookie'
  import api from '../../api'
  import {handleApiErrors} from '../../helpers'

  export default {

    name: 'subscription-card-modal',

    props: {
      'active': {default: false},
      'subscription_id': {default: null},
      'user_card_id': {default: null}
    },

    components: {
      FormControl
    },

    data () {
      return {
        pagarmeEncryptionKey: process.env.PAGARME_ENCRYPTION_KEY,
        card_form: new Form({
          card_number: '',
          card_holder_name: '',
          card_expiration_date: '',
          card_expiration_month: '',
          card_expiration_year: '',
          card_cvv: ''
        }),
        form: new Form({
          label: '',
          brand: '',
          payload: ''
        }),
        phone_input: '',
        is_phone_input_valid: false,

      }
    },
    mounted() {
      this.startComponent();
    },
    methods: {
      startComponent() {
        this.card = new Card({
          form: '#subscription_card_form',
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

            return this.$store.dispatch('subscriptions/updatePaymentMethod', {
              id: this.subscription_id,
              payment_method_id: api.orders.payment_methods.CREDIT_CARD,
              user_card_id: cardObject.id
            })
          })
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

</style>
