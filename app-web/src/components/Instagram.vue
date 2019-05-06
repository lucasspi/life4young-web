<template>
  <div class="instagram-page">
    <hero-section set-classes="is-primary is-bold">
      <div class="container">
        <h1 class="title">
          Instagram
        </h1>
      </div>
    </hero-section>
    <div class="container">
      <div class="steps" id="instagramSteps">
        <div class="step-item is-active is-primary">
          <div class="step-marker">
            <div class="icon">
              <vue-material-icon name="account_circle"></vue-material-icon>
            </div>
          </div>
          <div class="step-details">
            <p class="step-title">Cadastrar perfil</p>
          </div>
        </div>
        <div class="step-item">
          <div class="step-marker">
            <div class="icon">
              <vue-material-icon name="build"></vue-material-icon>
            </div>
          </div>
          <div class="step-details">
            <p class="step-title">Configurar</p>
          </div>
        </div>
        <div class="step-item">
          <div class="step-marker">
            <div class="icon">
              <vue-material-icon name="timeline"></vue-material-icon>
            </div>
          </div>
          <div class="step-details">
            <p class="step-title">Crescer</p>
          </div>
        </div>
        <div class="steps-content">
          <div class="step-content is-active">
            <div class="columns is-centered">
              <div class="column is-half">
                <div class="box">
                  <create-profile-form @created="steps.next_step()"></create-profile-form>
                </div>
              </div>
            </div>
          </div>
          <div class="step-content">
            <div v-for="profile in profiles" :key="profile.id" class="columns is-centered">
              <profile-configuration-box :profile="profile" css-classes="column is-half"></profile-configuration-box>
            </div>
          </div>
          <div class="step-content"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import store from '@/store';
import Form from '../helpers/form';
import FormControl from './Form/FormControl.vue'
import CreateProfileForm from './Instagram/CreateProfileForm.vue'
import ProfileConfigurationBox from './Instagram/ProfileConfigurationBox.vue'
import bulmaSteps from 'bulma-extensions/bulma-steps/dist/js/bulma-steps.min.js'
import HeroSection from './HeroSection.vue'


export default {
  components: {
    HeroSection,
    FormControl,
    CreateProfileForm,
    ProfileConfigurationBox,
  },

  beforeRouteEnter(to, from, next) {
    store.dispatch("instagram/fetchMyProfiles").then(
      () => next(vm => vm.setData())
    );
  },

  beforeRouteUpdate(to, from, next) {
    store.dispatch("instagram/fetchMyProfiles").then(
      () => next()
    );
  },

  beforeRouteLeave(from, to, next) {
    next();
  },

  data() {

    return {
      form: new Form({
        username: '',
        password: '',
        password_confirmation: ''
      }),
      steps: null
    };
  },

  computed: {
    ...mapState("instagram", ["profiles"])
  },

  methods: {
    setData() {
      this.steps = new bulmaSteps("#instagramSteps")
      this.setCorrectStep()
    },
    setCorrectStep() {
      if (this.profiles.length > 0) {
        this.steps.next_step()
      }
    }
  }
};
</script>

<style lang="scss">
.instagram-page {
  .hero {
    margin-bottom: 20px;
  }
}
</style>
