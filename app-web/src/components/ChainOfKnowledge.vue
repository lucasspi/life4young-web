<template>
  <div class="chain-of-knowledge">
    <hero-section not-waves="true" set-classes="is-light">
      <div class="container">
        <h1 class="title has-text-centered is-size-1">Compartilhe seu amor por aprender</h1>
        <h2 class="subtitle">
        </h2>
      </div>
    </hero-section>
    <div class="container">
      <div class="columns">
        <div class="column is-4">
          <img src="/static/chain-of-knowledge.png" alt="" />
        </div>
        <div class="column is-6">
          <h1 class="title has-text-danger is-size-1 has-text-centered-mobile">
            <span v-html="metadata(content, 'title').value">
            </span>
            <span class="icon is-size-4">
              <font-awesome-icon icon="heart"></font-awesome-icon>
            </span>
          </h1>
          <div class="content has-text-centered-mobile" v-if="metadata(content, 'inspiring-text')" v-html="metadata(content, 'inspiring-text').value"></div>
          <p class="has-text-centered-mobile">
            <router-link :to="invites_link" class="button is-rounded is-success is-large">Quero participar</router-link>
          </p>
        </div>
      </div>

    </div>
    <invite-welcome-modal :active="invite_welcome_active" :user="user" :link="invites_link" @close="invite_welcome_active = false"></invite-welcome-modal>
  </div>
</template>

<script>
  import VueEmoji from 'emoji-vue'
  import Form from '@/helpers/form'
  import store from '../store'
  import api from '../api'
  import {mapState, mapGetters} from 'vuex'
  import HeroSection from './HeroSection'
  import cookie from '@/helpers/cookie'
  import {Base64} from 'js-base64'
  import InviteWelcomeModal from './ChainOfKnowledge/InviteWelcomeModal.vue'

  export default {

    name: 'chain-of-knowledge',

    components: {
      HeroSection,
      InviteWelcomeModal
    },

    beforeRouteEnter(to, from, next) {
      let dataParams = {};
      let cookieName = cookie.INVITE_COOKIE();
      if (cookie.check(cookieName)) {
        let invitationCookieVal = cookie.get(cookieName);
        dataParams.u = invitationCookieVal;
      }
      if (!dataParams.u && to.query.hasOwnProperty('u') && to.query.u) {
        dataParams.u = to.query.u;
      }
      let requests = [];

      if (dataParams.u && ['null', 'undefined'].indexOf(dataParams.u) === -1) {
        const userId = Base64.decode(dataParams.u);
        requests.push(store.dispatch('users/get', userId))
      }

      requests.push(store.dispatch('layout/fetchContent', api.layout.contents.types.chainOfKnowledge));

      Promise.all(requests).then(
        () => next(vm => vm.setData(null, dataParams))
      );
    },
    beforeRouteLeave(from, to, next) {
      next();
    },

    computed: {
      ...mapState('layout', ['content']),
      ...mapGetters('metadata', {metadata: 'getMetadata'}),
      ...mapState('users', ['user', 'loading_user']),
      invites_link() {
        return this.$auth.check() ? 'invites' : 'signup?u=' + this.invitationId /* + '&url=/invites' */
      }
    },

    data () {
      return {
        invitationId: null,
        invite_welcome_active: false
      }
    },

    methods: {
      setData(err, data) {
        if (err) {
          this.error = err.response.body.message;
        } else {
          if (data && data.hasOwnProperty('u') && data.u) {
            this.invitationId = data.u;
            this.invite_welcome_active = true;
          }
        }
      },
    }
  }
</script>

<style lang="scss">
  @import '~bulma/sass/utilities/_all';
  @import '~bulma/sass/elements/form';
  .emoji-vue-textarea {
    @extend .textarea;
  }
  .chain-of-knowledge {
    margin: 0px 0px 50px 0px;
    > .container {
      padding: 30px 0;

    }
  }
</style>
