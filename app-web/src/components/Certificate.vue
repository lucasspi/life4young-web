<template>
  <div class="çertificate-page">
    <h1 class="title">{{certificate.id}}</h1>
    <a v-if="certificate.certificate_url" class="button is-large is-fullwidth" :href="certificate.certificate_url" target="_blank">Abrir certificado</a>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import store from '@/store'

export default {
  name: 'Certificate',

  beforeRouteEnter (to, from, next) {
    store.dispatch('certificates/fetch', to.params.certificateIdOrHash)
      .then(() => next(vm => vm.setData()))
  },
  beforeRouteUpdate (to, from, next) {
    store.dispatch('certificates/fetch', to.params.certificateIdOrHash)
      .then(() => {
        this.setData()
        next()
      })
  },
  beforeRouteLeave (from, to, next) {
    next()
  },

  computed: {
    ...mapState('certificates', [
      'certificate', 'loading_certificate'
    ])
  },

  methods: {
    setData () {

    }
  }
}
</script>

<style scoped>

</style>
