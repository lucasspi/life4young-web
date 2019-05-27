<template>
  <div class="contact-page">
    <hero-section set-classes="" not-waves="true" background-image="/static/hero2-background.png">
      <div class="container">
        <h1 class="title has-text-white">
          Fale conosco
        </h1>
      </div>
    </hero-section>

    <div class="container">
      <div class="columns is-centered">
        <div class="column is-half">
          <div class="box">
            <form action="" method="post" @submit.prevent="onSubmitContactForm">
              <div class="subtitle is-size-3">
                {{$t('contact-form.title')}}
              </div>
              <div class="content">
                <p v-html="$t('contact-form.description')"></p>
              </div>
              <div class="columns is-multiline">
                <div class="column is-12">
                  <form-control :form="form" name="message">
                    <textarea class="textarea is-large" :placeholder="$t('contact-form.placeholders.message')" name="message" v-model="form.message"></textarea>
                  </form-control>
                </div>
                <div class="column is-12">
                  <div class="control has-text-centered">
                    <button type="submit" class="button is-large is-fullwidth is-primary" :class="{'is-loading': form.sendingData}">{{$t('contact-form.submit')}}</button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Form from '../helpers/form'
  import HeroSection from './HeroSection.vue'

  export default {
    components: {
      HeroSection
    },

    beforeRouteEnter (to, from, next) {
      next(vm => vm.startComponent())
    },
    beforeRouteLeave (from, to, next) {
      next()
    },

    data () {
      return {
        form: new Form({
          message: ''
        })
      }
    },

    methods: {
      startComponent () {
        // chores
      },
      onSubmitContactForm() {
        this.form.post('auth/contact-staff').then(
          (response) => {
            this.$swal({
              type: 'success',
              title: this.$t('contact-form.result.title'),
              html: this.$t('contact-form.result.message')
            })
          }
        )
      }
    }
  }
</script>

<style lang="scss">
.contact-page {
  .container {
    margin-top: 50px;
    margin-bottom: 50px;
  }
}
</style>
