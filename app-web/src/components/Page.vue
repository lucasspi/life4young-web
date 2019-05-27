<template>
  <div class="container">
    <h1 class="title has-text-centered">
      {{page.title}}
    </h1>

    <div class="has-text-justified" v-html="page.text"></div><br>

  </div>
</template>

<script>
  import {mapState, mapGetters} from 'vuex'
  import store from '@/store'

  export default {

    name: 'Page',

    components: {
      store
    },

    beforeRouteEnter (to, from, next) {
      store.dispatch('layout/fetchPages', to.params.slug)
        .then(
          () => next(
            vm => vm.setData(to.params.slug)
          ),
          () => console.log('error na promise')
        )
    },

    beforeRouteUpdate (to, from, next) {
      store.dispatch('layout/fetchPages', to.params.slug)
        .then(
          () => next(
            vm => vm.setData(to.params.slug)
          )
        )
    },

    beforeRouteLeave (from, to, next) {
      // store.commit("setMenuOpen", null);
      next()
    },

    data () {
      return {
        page_slug: ''
      }
    },

    computed: {
      ...mapState('layout', ['page', 'loading_page']),
      ...mapGetters(['isMobile']),
    },

    methods: {

      setData (page) {
        this.page_slug = page
        this.$scrollTo(document.body)
      }

    }
  }
</script>

<style lang="scss">

</style>
