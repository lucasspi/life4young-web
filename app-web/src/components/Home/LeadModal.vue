<template>
  <div class="modal lead-modal" style="z-index: 999999999" :class="{'is-active': active}">
    <div class="modal-background"></div>
    <div class="modal-content">
      <form action="" method="post" @submit.prevent="onSubmit">
        <div class="box">
          <div class="columns" style="display:flex">
            <div class="column is-3 is-3-mobile has-text-centered">
              <p class="image is-128x128 is-hidden-mobile">
                <img :src="image" alt="" class="is-rounded">
              </p>
              <p class="image is-64x64 is-hidden-tablet">
                <img :src="image" alt="" class="is-rounded">
              </p>
            </div>
            <div class="column is-9 is-9-mobile">
              <div class="is-size-2 is-size-5-mobile has-text-centered" v-html="$t(`lead-modal.${mode}.title`)"></div>
            </div>
          </div>
          <div class="content is-size-5 is-size-6-mobile has-text-justified">
            <p v-html="$t(`lead-modal.${mode}.description`)"></p>
          </div>
          <div class="wrap-form">
            <form-control :form="form" name="email" :label="$t('lead-modal.labels.email')" control-class="has-icons-left">
              <input type="text" class="input is-large" :placeholder="$t('lead-modal.fields.email')" name="email" v-model="form.email" autocomplete="email">
              <div class="icon is-small is-left">
                <vue-material-icon name="email"></vue-material-icon>
              </div>
            </form-control>
          </div>

          <div class="control">
            <button  class="button is-success is-large is-fullwidth" :class="{'is-loading': form.sendingData}">
              <span>{{$t(`lead-modal.${mode}.btn-store`)}}</span>
            </button>
          </div>
        </div>
      </form>
    </div>
    <button class="modal-close is-large" aria-label="close" @click="closeModal"></button>
  </div>
</template>

<script>
import FormControl from '../Form/FormControl.vue'
import Form from '../../helpers/form'
import cookie from '../../helpers/cookie'

export default {

  name: 'welcome-modal',

  props: {'active': {default: false}, 'image': {default: 'https://escola.nyc3.digitaloceanspaces.com/content/images/22a29b835edcf654e9dfea86efbd2f7d.jpg'}, 'mode': {default: 'exit'}},

  components: {
    FormControl
  },

  data () {
    return {
      form: new Form({
        email: '',
        segment_id: 4 // Mautic - Arquitetos - curso de design - https://mkt.wikischool.com.br/s/segments/view/4
      })
    }
  },
  methods: {
    onSubmit () {
      let email = this.form.email;
      this.form.post('leads?onesignal=1&mautic=1').then((response) => {
        this.$swal({
          type: 'success',
          title: 'Verifique seu e-mail!',
          html: '<p>Você está inscrito em nossa lista exclusiva de conteúdos gratuitos :)</p><p>Dentro de instantes <strong>você receberá um e-mail com um curso grátis especialmente selecionado para você.</strong></p>'
        })
        console.log('Email generated hash: ', response.data.hash);
        let emailAuthHash = response.data.hash;
        this.$store.dispatch('onesignal/registerEmail', {email, emailAuthHash}).then(
          () => this.$store.dispatch('onesignal/sendTag', {key: 'funnel_step', value: 1}),
          () => console.log('onesignal email error', arguments)
        )
        cookie.set(cookie.LEAD_COOKIE(), (new Date()).getTime(), 365);
        this.$emit('close')
      }, (err) => {

      })
    },
    closeModal() {
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss">
  .lead-modal {
    .wrap-form {
      margin: 45px 0;
    }
  }
</style>
