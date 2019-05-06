<template>
  <div class="profile-page">
    <hero-section :not-waves="true" set-classes="is-bold">
      <div class="container">
        <h1 class="title">
          Meus dados
        </h1>
        <router-link class="button is-light is-medium" to="/profile">Voltar para meu perfil</router-link>
      </div>
    </hero-section>

    <div class="container">
      <div class="columns is-multiline is-centered">
        <div class="column is-10">
          <div class="box profile" style="margin-top: 1rem;">
            <h1 class="title has-text-centered">Dados cadastrais</h1>
            <form action="" @submit.prevent="onSubmitUpdateMe" method="post">
              <form-control :form="form" name="name" label="Nome completo" control-class="has-icons-left">
                <input type="text" placeholder="Seu nome completo" name="name" v-model="form.name" class="input">
                <div class="icon is-small is-left">
                  <font-awesome-icon icon="address-card"></font-awesome-icon>
                </div>
              </form-control>
              <form-control :form="form" name="document_number" label="Documento (CPF/CNPJ)" control-class="has-icons-left">
                <input class="input" :disabled="true" type="document_number" :placeholder="$t('profile.document_number')" name="document_number" v-model="form.document_number">
                <div class="icon is-small is-left">
                  <font-awesome-icon icon="address-card"></font-awesome-icon>
                </div>
              </form-control>
              <form-control :form="form" name="email" label="E-mail" control-class="has-icons-left">
                <input class="input" :disabled="true" type="email" :placeholder="$t('profile.email')" name="email" v-model="form.email">
                <div class="icon is-small is-left">
                  <vue-material-icon name="mail"></vue-material-icon>
                </div>
              </form-control>
              <form-control :form="form" name="phone_country_code" label="DDI (Código telefônico do país)" control-class="has-icons-left">
                <input class="input" :disabled="true" type="phone_country_code" :placeholder="$t('profile.phone_country_code')" name="phone_country_code" v-model="form.phone_country_code">
                <div class="icon is-small is-left">
                  <font-awesome-icon icon="flag"></font-awesome-icon>
                </div>
              </form-control>
              <form-control :form="form" name="phone_local_code" label="DDD (Código telefônico do local)" control-class="has-icons-left">
                <input class="input" :disabled="true" type="phone_local_code" :placeholder="$t('profile.phone_local_code')" name="phone_local_code" v-model="form.phone_local_code">
                <div class="icon is-small is-left">
                  <font-awesome-icon icon="flag"></font-awesome-icon>
                </div>
              </form-control>
              <form-control :form="form" name="phone_number" label="Telefone (sem DDI e/ou DDD)" control-class="has-icons-left">
                <input class="input" :disabled="true" type="phone_number" :placeholder="$t('profile.phone_number')" name="phone_number" v-model="form.phone_number">
                <div class="icon is-small is-left">
                  <font-awesome-icon icon="phone"></font-awesome-icon>
                </div>
              </form-control>
              <form-control :form="form" name="password" label="Senha atual (preencha só se desejar trocar)" control-class="has-icons-left">
                <input class="input" type="password" :placeholder="$t('profile.current_password')" name="password" v-model="form.current_password">
                <div class="icon is-small is-left">
                  <vue-material-icon name="lock"></vue-material-icon>
                </div>
              </form-control>
              <form-control :form="form" name="new_password" label="Nova senha" control-class="has-icons-left">
                <input class="input" type="password" :placeholder="$t('profile.new_password')" name="new_password" v-model="form.new_password">
                <div class="icon is-small is-left">
                  <vue-material-icon name="lock"></vue-material-icon>
                </div>
              </form-control>
              <form-control :form="form" name="new_password_confirmation" label="Confirme sua nova senha" control-class="has-icons-left">
                <input class="input" type="password" :placeholder="$t('profile.new_password_confirmation')" name="new_password_confirmation" v-model="form.new_password_confirmation">
                <div class="icon is-small is-left">
                  <vue-material-icon name="lock"></vue-material-icon>
                </div>
              </form-control>
              <div class="control has-text-centered">
                <button type="submit" class="button is-primary" :class="{'is-loading': form.sendingData}">{{$t('profile.update')}}</button>
              </div>
            </form>

          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import HeroSection from './HeroSection.vue'
  import FormControl from './Form/FormControl.vue'
  import Form from '@/helpers/form'

  export default {

    name: 'ProfileAccountSettings',

    components: {
      HeroSection,
      FormControl,
    },

    beforeRouteEnter (to, from, next) {
      next(vm => vm.startComponent())
    },
    beforeRouteLeave (from, to, next) {
      next()
      this.startComponent();
    },

    data () {
      return {
        form: new Form({
          name: this.$auth.user().name,
          nickname: this.$auth.user().nickname,
          document_number: this.$auth.user().document_number,
          phone_country_code: this.$auth.user().phone_country_code,
          phone_local_code: this.$auth.user().phone_local_code,
          phone_number: this.$auth.user().phone_number,
          email: this.$auth.user().email,
          current_password: '',
          new_password: '',
          new_password_confirmation: ''
        }),
        modalCropActive: false,
        modalCropSendingImage: false,
        modalCropUploadProgress: 0,
        card_modal_active: false,
        card_modal_subscription_id: null,
        card_modal_card_id: null,
      }
    },

    computed: {
    },

    methods: {
      startComponent () {

      },
      onSubmitUpdateMe () {
        this.$swal({
          type: 'question',
          title: 'Tem certeza?',
          html: '<p class="subtitle"><strong>Deseja atualizar os seus dados?</strong></p>',
          showCancelButton: true,
          confirmButtonText: 'Sim',
          cancelButtonText: 'Não',
          preConfirm: () => {
            return this.form.put('auth/me')
          }
        }).then((result) => {
          if (result.value) {
            this.$swal({
              type: 'success',
              title: 'Pronto!',
              html: 'Seus dados foram atualizados com sucesso!'
            }).then(() => {
              window.location.reload();
            })
          }
        }, (err) => {
          if (err && (err.message || err.hasOwnProperty('message'))) {
            this.$swal({type: 'error', title: 'Erro', html: err.message})
          }
        })
      }
    }
  }
</script>

<style lang="scss">

</style>
