<template>
  <div class="social-login">
    <button v-if="available_auth_integrations.indexOf('facebook') !== -1 && (!logging_in_provider || logging_in_provider === 'facebook')"
            @click.prevent="onClickLogin('facebook')"
            :class="{'is-loading': logging_in_provider === 'facebook', 'is-large': size === 'large', 'is-medium': size === 'medium', 'is-small': size === 'small'}"
            class="button is-fullwidth is-primary has-icons-left">
      <span class="icon">
        <font-awesome-icon :icon="['fab', 'facebook']"></font-awesome-icon>
      </span>
      <span>{{verb}} com o Facebook</span>
    </button>
    <button v-if="available_auth_integrations.indexOf('google') !== -1 && (!logging_in_provider || logging_in_provider === 'google')"
            @click.prevent="onClickLogin('google')"
            :class="{'is-loading': logging_in_provider === 'google', 'is-large': size === 'large', 'is-medium': size === 'medium', 'is-small': size === 'small'}"
            class="button is-fullwidth is-danger has-icons-left">
      <span class="icon">
        <font-awesome-icon :icon="['fab', 'google']"></font-awesome-icon>
      </span>
      <span>{{verb}} com o Google</span>
    </button>
    <!--<button v-if="available_auth_integrations.indexOf('vimeo') !== -1 && (!logging_in_provider || logging_in_provider === 'vimeo')"-->
            <!--@click="onClickLogin('vimeo')"-->
            <!--:class="{'is-loading': logging_in_provider === 'vimeo'}"-->
            <!--class="button is-fullwidth is-medium is-default has-icons-left">-->
      <!--<span class="icon">-->
        <!--<font-awesome-icon :icon="['fab', 'vimeo']"></font-awesome-icon>-->
      <!--</span>-->
      <!--<span>Entrar com o Vimeo</span>-->
    <!--</button>-->
  </div>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    name: 'social-login',

    props: {
      verb: {
        default: 'Entrar'
      },
      size: {
        default: 'large'
      },
      afterOauthRedirectUrl: {
        default: null
      }
    },

    components: {
    },

    data() {
      return {
        logging_in_provider: null
      };
    },

    computed: {
      ...mapState(['available_auth_integrations', 'loading_available_auth_integrations'])
    },

    mounted() {
      this.$store.dispatch('fetchAuthIntegrations').then(() => {
        if (Array.isArray(this.available_auth_integrations) && this.available_auth_integrations.length > 0) {
          this.$emit('integration-detected');
        }
      })
    },

    methods: {
      async onClickLogin (provider) {
        this.logging_in_provider = provider;
        if (this.afterOauthRedirectUrl) {
          await this.$store.dispatch('setAfterOauthRedirectUrl', this.afterOauthRedirectUrl);
        }
        const redirectUrl = await this.$store.dispatch('startLoginThroughAuthIntegration', provider);
        window.location.href = redirectUrl;
      }
    }
  };
</script>

<style lang="scss">
  .social-login {
    button { margin: 0.5em 0;}
  }
</style>
