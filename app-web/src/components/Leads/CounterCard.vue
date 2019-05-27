<template>
  <div class="box is-fullwidth counter-card green has-text-centered" :class="classes">
    <div class="box-subtitle is-size-7" v-if="subtitle">
      {{subtitle}}
    </div>
    <div class="box-title is-size-7">
      {{label}}
      <span v-if="quantity <= 99">{{quantity}}</span>
      <span v-else>99+</span>
    </div>
    <div class="box-feat">{{counter}}</div>
  </div>
</template>

<script>
  export default {

    name: 'counter-card',

    props: ['label', 'subtitle', 'counter', 'quantity', 'classes'],

    components: {
    },

    computed: {
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
  .counter-card {
    position: relative;
    &.is-warning {
      background-color: lighten(yellow, 40%);
    }
    &.is-success {
      background-color: lighten(green, 60%);
    }
    &.is-danger {
      background-color: lighten(red, 40%);
    }
    .box-title {
      color: #092333;
      font-size: 15px;
      font-weight: 900;
      span {
        font-size: 11px;
        font-weight: 100;
        background-color: #e83749;
        position: absolute;
        right: -10px;
        top: -10px;
        padding: 5px;
        color: #FFF;
        border-radius: 100%;
        line-height: 20px;
        width: 30px;
      }
    }
    .box-feat {
      font-size: 14px;
      color: #4b4b4b;
    }
  }
</style>
