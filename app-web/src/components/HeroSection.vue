<template>
  <section class="hero" :class="setClasses.indexOf('is-light') !== -1 ? setClasses : setClasses + ' is-dark'">
      <div class="hero-video">
        <slot name="video"></slot>
      </div>
      <div class="hero-head">
        <slot name="head"></slot>
      </div>
      <div class="hero-body" :style="{zIndex}">
        <slot></slot>
      </div>
    </section>
</template>

<script>
	export default {
    name: 'hero-section',

    props: {
      'set-classes': {},
      'background-image': {default: '/static/hero-background.png'},
      'not-waves': {},
      'waves-size': {},
      'no-footer': {default: false},
      'z-index': {default: 0}
    },

		components: {
		},

		data() {
			return { };
    },

    methods: {
      startInterval() {
        store.dispatch("leads/startInterval");
      }
    }
	}
</script>

<style lang="scss">

</style>
