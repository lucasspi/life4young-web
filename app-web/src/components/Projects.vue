<template>
  <div class="projects-page">
    <hero-section set-classes="is-primary is-bold">
      <div class="container">
        <h1 class="title">
          {{ $t('projects.title') }}
        </h1>
      </div>
    </hero-section>
    <div class="container">
      <div class="columns is-centered">
        <div class="column is-half">
          <div class="box">
            <p class="has-text-centered">
              {{$t('projects.subtitle')}}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeroSection from './HeroSection.vue'
export default {
  components: {HeroSection},

  data() {
    return {};
  }
};
</script>

<style lang="scss">
</style>
