<template>
  <div class="user-dashboard">
    <hero-section set-classes="" not-waves="true" background-image="/static/hero2-background.png">
      <div class="container">
        <h1 class="title has-text-white">
          Bem-vindo(a), {{$auth.user().name}}!
        </h1>
      </div>
    </hero-section>
    <div class="container" v-if="appBrand === 'socialguider'">
      <p>&nbsp;</p>
      <div class="content">
        <p class="has-text-centered is-size-4">Para acompanhar o progresso de nossos lançamentos <router-link to="/leads">clique aqui.</router-link></p>
      </div>
    </div>
    <div class="container" v-if="appBrand === 'escoladearquitetos'">
      <initial-billet-notification></initial-billet-notification>

      <div class="columns is-multiline is-centered">
        <div class="column is-12">
          <p class="subtitle">Continue assistindo</p>
        </div>
        <div class="column">
          <div class="columns is-multiline is-centered">
            <course-card v-for="course in my_started_courses" :key="course.id" mode="card" :course="course"></course-card>
            <div v-if="my_started_courses == null || my_started_courses.length == 0" class="column is-half">
              <div class="content">
                <p class="has-text-centered">Você ainda não começou nenhum curso. <router-link to="/courses">Clique aqui para conferir todos os treinamentos da plataforma.</router-link></p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="columns">
        <div class="column is-12">
          <p></p>
        </div>
      </div>
      <div class="columns is-multiline is-centered">
        <div class="column is-12">
          <p class="subtitle">Todos meus cursos</p>
        </div>
        <div class="column is-12">
          <div class="columns is-multiline is-centered">
            <course-card v-for="course in my_not_started_courses" :key="course.id" mode="card" :course="course"></course-card>
          </div>
        </div>
      </div>
      <div v-if="false" class="columns is-multiline is-centered">
        <div class="column is-12">
          <p class="subtitle">Cursos concluídos</p>
        </div>
        <div class="column is-12">
          <div class="columns is-multiline is-centered">
            <!--<course-showcase  v-for="course in product.courses" :key="course.id" :publisher-slug="publisher_slug" :product-slug="product_slug" :course="course"></course-showcase>-->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState, mapGetters} from 'vuex'
import store from '@/store'
import HeroSection from './HeroSection.vue'
import CourseCard from './Courses/CourseCard.vue'
import WelcomeModal from './Home/WelcomeModal.vue'
import EmailWarningModal from './Home/EmailWarningModal.vue'
import MobileDetect from 'mobile-detect'
import InitialBilletNotification from './Home/InitialBilletNotification.vue'

export default {
  components: {
    WelcomeModal,
    EmailWarningModal,
    HeroSection,
    CourseCard,
    InitialBilletNotification
  },

  beforeRouteEnter (to, from, next) {
    let coursesRequests = [
      store.dispatch('courses/fetchMyCourses'),
      store.dispatch('courses/fetchAll', {
        params: {
          include: ['metadata_images', 'publisher', 'lesson_duration_sum'],
          include_count: ['lessons', 'watched_lessons']
        }
      })
    ]

    Promise.all(coursesRequests).then(
      () => next(vm => vm.startComponent())
    )
  },
  beforeRouteLeave (from, to, next) {
    this.$intro().exit()
    next()
  },

  data () {
    return {
      appBrand: process.env.APP_BRAND,
      welcomeModalActive: false,
      emailWarningModalActive: false
    }
  },

  computed: {
    // ...mapState('courses', ['my_courses', 'loading_my_courses']),
    ...mapGetters('courses', ['my_started_courses', 'my_not_started_courses', 'featured_courses']),
    ...mapGetters('metadata', {metadata: 'getMetadata'}),
    ...mapGetters('subscriptions', ['initial_pending_billet'])
  },

  methods: {
    startComponent () {
      let user = this.$auth.user()
      if (process.env.APP_BRAND !== 'socialguider') {
        let platformTour = this.metadata(user, 'platform_tour')
        if (platformTour == null) {
          let w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
          let h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

          let md = new MobileDetect(window.navigator.userAgent);
          if (!md.mobile()) {
            this.$store.commit('setIsTourOpen', true);
            this.welcomeModalActive = true;
          }

        }
      }
    },
    onCloseWelcomeModal () {
      this.welcomeModalActive = false;
      let intro = this.$intro();
      intro.setOptions({
        'nextLabel': 'Entendi',
        'prevLabel': 'Anterior',
        'skipLabel': 'Sair do tour',
        'doneLabel': 'Pronto!',
        'exitOnEsc': false,
        'exitOnOverlayClick': false,
        'overlayOpacity': 0
      })
      intro.start()
      intro.onexit((e) => {
        this.emailWarningModalActive = true;
      })
      intro.onchange((element) => {
        if (element.classList && element.classList.contains('should-open-menu-on-mobile')) {
          this.$store.commit("setMenuVisible", true);
        }
        if (element.classList && element.classList.contains('should-scroll-to-zero')) {
          this.$scrollTo(document.body, 1000);
        }
      })
    },
    onCloseEmailWarningModal () {
      this.$store.commit('setIsTourOpen', false);
      this.emailWarningModalActive = false;
      this.$store.dispatch('togglePlatformTour').then(() =>
        this.$auth.fetch({
          success: () => { console.log('The user is updated.') },
          error: () => {}
        })
      )
    }
  }
}
</script>

<style lang="scss">
.user-dashboard {
  margin-bottom: 50px;
  > .container {
    margin-top: 50px;
  }
}
</style>
