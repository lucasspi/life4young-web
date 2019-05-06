<template>
  <div class="invites rules">
    <div class="container">

      <div class="columns">
        <div class="column is-8">
          <p>&nbsp;</p>
          <h1 class="title is-size-2" v-html="metadata(content, 'title').value"></h1>
          <div class="content" v-html="metadata(content, 'body').value"></div>
          <button class="button is-large is-success is-rounded" :class="{'is-loading': starting_game}" @click.prevent="$emit('agreed')">
          <span class="icon">
            <font-awesome-icon icon="play"></font-awesome-icon>
          </span>
            <span>Iniciar</span>
          </button>
        </div>
        <div class="column is-4">
          <img src="/static/chain-of-knowledge-rules.png" alt="" />
        </div>
      </div>
      <div class="has-text-centered">
      </div>
    </div>
  </div>
</template>

<script>
  import VueEmoji from 'emoji-vue'
  import Form from '@/helpers/form'
  import HeroSection from '../HeroSection.vue'
  import {mapState, mapGetters} from 'vuex'
  import store from '@/store';
  import bulmaSteps from 'bulma-extensions/bulma-steps/dist/js/bulma-steps.min.js'

  export default {

    name: 'Invites',

    components: {
      HeroSection
    },

    beforeRouteEnter (to, from, next) {
      store.dispatch('leads/loadInvitations').then(
        () => next(vm => vm.setData(null, {}))
      );
    },
    beforeRouteLeave (from, to, next) {
      next()
    },

    computed: {
      ...mapState('layout', ['content']),
      ...mapGetters('metadata', {metadata: 'getMetadata'}),
      ...mapState('gamefication', ['starting_game']),
    },

    data () {
      return {

      }
    },

    methods: {

    }
  }
</script>

<style lang="scss">
  .invites.rules {
    margin: 50px 0;
    padding: 0 15px;
  }
</style>
