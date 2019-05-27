<template>
  <transition
    :name="transition"
    mode="in-out"
    appear
    :appear-active-class="enterClass"
    :enter-active-class="enterClass"
    :leave-active-class="leaveClass"
  >
    <div class="modal all-white" style="z-index: 999999999" :class="{'is-active': active}">
      <div class="modal-background"></div>
      <div class="modal-content">
        <div class="box">
          <div class="content">
            <figure class="image welcome-img bounce-rotate">
              <img src="/static/high-five.jpg" alt="">
            </figure>
          </div>

          <div class="title has-text-centered">Parabéns!</div>
          <div class="content is-size-4 has-text-centered">
            <p>Você foi convidado por {{user.name}}</p>
          </div>

          <div class="control">
            <button @click="$emit('close')" class="button is-success is-rounded is-large is-fullwidth">
              <span>Quero participar</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {

    name: 'invite-welcome-modal',

    props: ['active', 'user'],

    components: {

    },

    data () {

      return {
        direction: 'left'
      }

    },
    computed: {

      transition () {
        return `bounce-${this.direction}`
      },
      enterClass () {
        return `bounceIn${this.direction}`
      },
      leaveClass () {
        return `bounceOut${this.direction}`
      },
    },
    mounted: function() {
    },

    methods: {
    }
  }
</script>

<style lang="scss">
</style>
