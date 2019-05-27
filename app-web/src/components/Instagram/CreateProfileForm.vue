<template>
  <form action="" method="post" @submit.prevent="onSubmitForm">
    <div class="columns is-multiline">
      <div class="column is-12 has-text-centered">
        <div class="notification is-primary">
          Você deve deixar apenas <strong>1 dispositivo</strong> conectado a sua conta do Instagram!
        </div>
      </div>
      <div class="column is-12 has-text-centered">
        <img src="/static/logo-instagram.png" class="logo-instagram" alt="Instagram">
      </div>
      <div class="column is-12">
        <div class="content">
          <p>{{$t("instagram.form.instruction")}}</p>
        </div>
      </div>
      <div class="column is-12">
        <form-control :form="form" name="username" control-class="has-icons-left">
          <input class="input" type="username" :placeholder="$t('instagram.form.username')" name="username" v-model="form.username">
          <div class="icon is-small is-left">
            <vue-material-icon name="account_circle"></vue-material-icon>
          </div>
        </form-control>
        <form-control :form="form" name="password" control-class="has-icons-left">
          <input class="input" type="password" :placeholder="$t('instagram.form.password')" name="password" v-model="form.password">
          <div class="icon is-small is-left">
            <vue-material-icon name="lock"></vue-material-icon>
          </div>
        </form-control>
        <form-control :form="form" name="password_confirmation" control-class="has-icons-left">
          <input class="input" type="password" :placeholder="$t('instagram.form.password_confirmation')" name="password_confirmation" v-model="form.password_confirmation">
          <div class="icon is-small is-left">
            <vue-material-icon name="lock"></vue-material-icon>
          </div>
        </form-control>
      </div>
      <div class="column is-12">
        <div class="control has-text-centered">
          <button type="submit" class="button is-primary" :class="{'is-loading': form.sendingData}">{{$t('instagram.form.submit')}}</button>
        </div>
      </div>
      <div class="column is-12">
        <div class="content">
          <p class="has-text-centered"><a href="https://www.instagram.com/accounts/password/reset/" target="_blank">{{$t('instagram.forgot-password')}}</a></p>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import { mapState } from 'vuex'
import store from '@/store';
import Form from '@/helpers/form';
import FormControl from '../Form/FormControl.vue'


export default {
  name: 'create-profile-form',

  components: {
    FormControl
  },


  data() {

    return {
      form: new Form({
        username: '',
        password: '',
        password_confirmation: ''
      })
    };
  },

  computed: {
    ...mapState("instagram", ["profiles"])
  },

  methods: {
    setData() {

    },
    onSubmitForm() {
      // this.form.post
      // this.$swal()
      // @TODO: Colocar um alert de confirmação antes de submeter o formulario
      this.form.post('instagram/profiles').then(
        () => {
          this.$emit('created')
          store.dispatch("instagram/fetchMyProfiles")
        }
      )
    }
  }
};
</script>

<style lang="scss">
.logo-instagram {
  max-width: 50%;
}
</style>
