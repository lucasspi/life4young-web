<template>
  <form action="" method="post" @submit.prevent="onSubmitForm">

    <div class="columns is-multiline">
      <div class="column is-12">
        <div class="content">
          <p>{{$t("address-form.instruction")}}</p>
        </div>
      </div>
      <div class="column is-12">
        <form-control :form="form" name="zipcode" :label="$t('address-form.fields.zipcode')" :control-class="'has-icons-left ' + (loading_zipcode_info ? 'is-loading' : '')">
          <input class="input" @keydown="onZipcodeKeydown" type="text" :placeholder="$t('address-form.placeholders.zipcode')" name="zipcode" v-mask="'#####-###'" v-model="form.zipcode" autocomplete="postal-code">
          <div class="icon is-small is-left">
            <vue-material-icon name="my_location"></vue-material-icon>
          </div>
          <p class="help"><a href="http://www.buscacep.correios.com.br/" target="_blank">Não sei meu CEP</a></p>
          <button type="button" class="button is-primary" :class="{'is-loading': form.sendingData, 'is-fullwidth': !is_zipcode_checked}" @click.prevent="onSearchZipcode">{{$t('address-form.search_zipcode')}}</button>
        </form-control>
      </div>
    </div>
      <div class="columns is-multiline" v-if="is_zipcode_checked">
        <!--<div class="column is-12">
          <form-control :form="form" name="country_cca3_id" :label="$t('address-form.fields.country_cca3_id')">
            <div class="select is-fullwidth" :class="{'is-loading': loading_countries}">
              <select name="country_cca3_id" id="" v-model="form.country_cca3_id" @change="onSelectCountry">
                <option> &#45;&#45; {{$t('address-form.placeholders.country_cca3_id')}} &#45;&#45; </option>
                <option v-for="country in countries" :key="country.code_iso3" :value="country.code_iso3">{{country['name']}}</option>
              </select>
            </div>
          </form-control>
        </div>-->
        <div class="column is-12" v-if="(states && states_length > 0) || loading_states">
          <form-control :form="form" name="state_postal_id" :label="$t('address-form.fields.state_postal_id')" control-class="has-icons-left">
            <div class="select is-fullwidth" :class="{'is-loading': loading_states}" @change="onSelectState">
              <select :disabled="true" name="state_postal_id" id="state_postal_id" v-model="form.state_postal_id">
                <option> -- {{$t('address-form.placeholders.state_postal_id')}} -- </option>
                <option v-for="(state, idx) in states" :key="idx" :value="state.code">{{state.name}}</option>
              </select>
            </div>
            <div class="icon is-left">
              <vue-material-icon name="location_on"></vue-material-icon>
            </div>
          </form-control>
        </div>
        <div class="column is-12" v-if="(cities && cities_length > 0) || loading_cities">
          <form-control :form="form" name="city_id" :label="$t('address-form.fields.city_id')" control-class="has-icons-left">
            <div class="select is-fullwidth" :class="{'is-loading': loading_cities}">
              <select :disabled="true" name="city_id" id="city_id" v-model="form.city_id">
                <option> -- {{$t('address-form.placeholders.city_id')}} -- </option>
                <option v-for="(city, city_slug, idx) in cities" :key="idx" :value="city.code">{{city.name}}</option>
              </select>
            </div>
            <div class="icon is-left">
              <vue-material-icon name="location_city"></vue-material-icon>
            </div>
          </form-control>
        </div>
        <div class="column is-9">
          <form-control :form="form" name="address" :label="$t('address-form.fields.address')" control-class="has-icons-left">
            <input class="input" type="text" :disabled="form.address !== '' && !is_zipcode_incomplete" :placeholder="$t('address-form.placeholders.address')" name="address" v-model="form.address">
            <div class="icon is-small is-left">
              <vue-material-icon name="home"></vue-material-icon>
            </div>
          </form-control>
        </div>
        <div class="column is-3">
          <form-control :form="form" name="number" :label="$t('address-form.fields.number')" control-class="has-icons-left">
            <input class="input" type="text" :placeholder="$t('address-form.placeholders.number')" name="number" v-model="form.number">
            <div class="icon is-small is-left">
              <vue-material-icon name="local_convenience_store"></vue-material-icon>
            </div>
          </form-control>
        </div>
        <div class="column is-12">
          <form-control :form="form" name="neighborhood" :label="$t('address-form.fields.neighborhood')" control-class="has-icons-left">
            <input class="input" type="text" :disabled="form.neighborhood !== '' && !is_zipcode_incomplete" :placeholder="$t('address-form.placeholders.neighborhood')" name="neighborhood" v-model="form.neighborhood">
            <div class="icon is-small is-left">
              <vue-material-icon name="home"></vue-material-icon>
            </div>
          </form-control>
        </div>
        <div class="column is-12">
          <form-control :form="form" name="complement" :label="$t('address-form.fields.complement')" control-class="has-icons-left">
            <input class="input" type="text" :placeholder="$t('address-form.placeholders.complement')" name="complement" v-model="form.complement">
            <div class="icon is-small is-left">
              <vue-material-icon name="info"></vue-material-icon>
            </div>
          </form-control>
        </div>
        <div class="column is-12">
          <div class="control has-text-centered">
            <button type="submit" class="button is-primary" :class="{'is-loading': form.sendingData, 'is-fullwidth': is_zipcode_checked}">{{$t('address-form.submit')}}</button>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import store from '@/store'
import Form from '@/helpers/form'
import FormControl from '../Form/FormControl.vue'
import axios from 'axios'

export default {

  name: 'address-form',

  props: [],

  components: {
    FormControl
  },

  computed: {
    ...mapState('countries', [
      'countries', 'loading_countries',
      'states', 'loading_states',
      'cities', 'loading_cities'
    ]),
    ...mapGetters('countries', [
      'countries_length', 'states_length', 'cities_length'
    ]),
    ...mapState('userAddresses', [
      'addresses', 'loading_addresses', 'zipcode_info', 'loading_zipcode_info'
    ])
  },

  mounted () {
    this.$store.dispatch('countries/fetchCountries')
  },

  activated() {
    console.log('hey I was activated')
  },

  data () {
    return {
      form: new Form({
        type: 'casa',
        address: '',
        number: '',
        complement: '',
        zipcode: '',
        neighborhood: '',
        country_cca3_id: 'BRA',
        state_postal_id: '',
        city_id: ''
      }),
      is_zipcode_checked: false,
      is_zipcode_incomplete: false
    }
  },

  methods: {
    onZipcodeKeydown(e) {
      if (e.keyCode === 13) {
        e.preventDefault();
        this.onSearchZipcode();
      }
    },
    onSelectCountry (e) {
      return this.$store.dispatch('countries/fetchStates', this.form.country_cca3_id)
    },
    onSelectState (e) {
      return this.$store.dispatch('countries/fetchCities', {
        country: this.form.country_cca3_id,
        state: this.form.state_postal_id
      })
    },
    onSearchZipcode() {
      this.form.sendingData = true;
      this.$store.dispatch('userAddresses/fetchZipcodeInfo', this.form.zipcode)
        .then(
          () => {
            this.form.country_cca3_id = 'BRA';

            if (this.zipcode_info.street !== '') {
              this.form.address = this.zipcode_info.street;
              this.is_zipcode_incomplete = false;
            } else
              this.is_zipcode_incomplete = true;

            if (this.zipcode_info.neighborhood !== '') {
              this.form.neighborhood = this.zipcode_info.neighborhood;
              this.is_zipcode_incomplete = false;
            } else
              this.is_zipcode_incomplete = true;

            this.is_zipcode_checked = true;
            return this.onSelectCountry(null)
          },
          (err) => {
            this.$swal({
              type: 'error',
              title: this.$t('address-form.errors.zipcode_not_found_title'),
              html: this.$t('address-form.errors.zipcode_not_found')
            })
            this.is_zipcode_checked = false;
          }
        )
        .then(
          () => {
            this.form.state_postal_id = this.zipcode_info.state;
            return this.onSelectState(null)
          }
        )
        .then(
          () => {
            let foundCity = false;
            this.cities.forEach((city) => {
              if (city.name === this.zipcode_info.city) {
                this.form.city_id = city.code;
                foundCity = true;
              }
            })
            if (!foundCity) {
              debugger;
            }
          }
        )
        .finally(() => { this.form.sendingData = false })
    },
    onSubmitForm () {
      if (!this.is_zipcode_checked) {
        this.onSearchZipcode();
        return;
      }

      this.form.post('users/addresses').then(
        (response) => {
          this.$store.commit('order/setUserAddress', response.data)
          this.$emit('selected')
        }
      )
    }
  }
}
</script>

<style lang="scss">
</style>
