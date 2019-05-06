<template>
  <div class="modal" style="z-index: 999999999" :class="{'is-active': active}">
    <div class="modal-background"></div>
    <div class="modal-content">
      <div class="box">
        <div class="content">
          <figure class="image welcome-img">
            <img src="/static/lets_start.png" alt="">
          </figure>
        </div>

        <div class="title has-text-centered" v-html="$t('welcome-modal.title', {user_name: this.$auth.user().name})"></div>
        <div class="content is-size-5 has-text-justified">
          <p v-html="$t('welcome-modal.description')"></p>
        </div>

        <div class="control">
          <button @click="$emit('close')" class="button is-primary is-large is-fullwidth">
            <span>{{$t('welcome-modal.btn-start')}}</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {

    name: 'welcome-modal',

    props: ['active'],

    components: {

    },

    data () {

      return {
      }

    },
    mounted: function() {
    }
  }
</script>

<style lang="scss">
.welcome-img {
  img {
    width: 200px;
    height: auto;
    margin: 0 auto;
  }
}
</style>
