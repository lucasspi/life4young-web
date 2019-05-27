<template>
  <div class="course-page" v-if="course && selected_serie && selected_lesson">
    <hero-section set-classes="is-dark is-bold" not-waves="true">
      <template slot="head">
        <nav class="level" style="margin-top: 20px;">
          <!-- Left side -->
          <div class="level-left">
            <div class="level-item">
              <nav class="breadcrumb is-centered" aria-label="breadcrumbs">
                <ul>
                  <router-link to="/courses" tag="li"><a href="">Treinamentos</a></router-link>
                  <router-link :to="`/courses/${course.slug}`" tag="li"><a href="">{{course.name}}</a></router-link>
                  <router-link :to="`/courses/${course.slug}`" tag="li"><a href="">{{selected_serie.name}}</a></router-link>
                  <router-link :to="`/courses/${course.slug}/${selected_serie.slug}/${selected_lesson.slug}`" active-class="is-active" tag="li"><a href="">{{selected_lesson.name}}</a></router-link>
                </ul>
              </nav>
            </div>
          </div>
        </nav>
      </template>

      <div class="container">
          <div class="columns is-multiline">
            <div class="column is-12">
              <p class="title is-bordered">{{ selected_lesson.name }}</p>
            </div>
            <div class="column is-8">
              <div v-if="subscription_courses.indexOf(course.id) !== -1 || selected_lesson.is_open || course.is_open" class="video-wrapper">
                <iframe  id="stage_player" :src="`https://player.vimeo.com/video/${selected_lesson.vimeo_id}?autoplay=1&title=0&byline=0&portrait=0`" style="position:absolute;top:0;left:0;width:100%;height:100%;" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen allow="autoplay; encrypted-media"></iframe>
              </div>
              <div v-else class="box">
                <div class="content has-text-centered" v-if="initial_pending_billet">
                  <p class="is-size-4 has-text-danger">Ops, identificamos que você não tem uma assinatura ativa.</p>
                  <initial-billet-notification></initial-billet-notification>
                  <div class="is-divider" data-content="OU"></div>
                  <p class="">Inicie sua assinatura do nosso plano mensal (apenas cartão de crédito).</p>
                  <router-link to="/p/escola/plano-mensal/checkout" class="button is-success has-icons-left">
                    <span class="icon">
                      <font-awesome-icon icon="credit-card"></font-awesome-icon>
                    </span>
                    <span>Iniciar minha assinatura</span>
                  </router-link>
                </div>
                <div v-else class="content has-text-centered">
                  <p class="is-size-4 has-text-danger">Ops, identificamos que você não tem uma assinatura ativa.</p>
                  <p>Para continuar assistindo, clique no botão abaixo para iniciar sua assinatura.</p>
                  <hr>
                  <div class="columns has-text-left" v-if="product && daily_price < 5 && product.is_recurring">
                    <div class="column is-3">
                      <figure class="image is-4by3">
                        <img src="/static/coffe.png" alt="">
                      </figure>
                    </div>
                    <div class="column is-9">
                      <p class="is-size-4">
                        R$ {{ format_price(product.price) }}
                        <small>/ {{ product.recurrency_frequency > 1 ? `${product.recurrency_frequency} mêses` : 'mês'}}</small>
                      </p>
                      <p class="is-size-5">Mais barato que um cafézinho por dia (menos de R$ {{ format_price(daily_price) }} / dia).</p>
                    </div>
                  </div>
                  <router-link to="/p/escola/plano-mensal/checkout" class="button is-success cta-buy has-icons-left">
                    <span class="icon">
                      <vue-material-icon size="40" name="play_arrow"></vue-material-icon>
                    </span>
                    <span>Iniciar minha assinatura</span>
                  </router-link>
                </div>
              </div>

              <div v-if="false" class="buttons has-addons is-centered">
                <span v-for="speed in playback_speeds"
                      class="button is-small"
                      :class="{'is-primary': speed == playback_speed, 'is-selected': speed == playback_speed, 'is-disabled': is_setting_playback || !is_vimeo_player_loaded}"
                      @click="setPlaybackSpeed(speed)">
                  {{speed}}x
                </span>
              </div>
            </div>
            <div class="column is-4">
              <div class="box course-navigation">
                <p v-if="next">
                  <span class="subtitle">Próxima aula</span>
                </p>
                <router-link v-if="next" :to="`/courses/${course.slug}/${next.serie.slug}/${next.lesson.slug}`">
                  <article class="media related-card">
                    <div class="media-left" v-if="metadata(next.lesson, 'picture_100x75')">
                      <figure class="image">
                        <img :src="metadata(next.lesson, 'picture_100x75').value" :alt="next.lesson.name">
                      </figure>
                    </div>
                    <div class="media-content">
                      <div class="content">
                        <p>
                          <span class="video-title">{{ next.lesson.name }}</span>
                          <span class="video-subtitle">{{ next.serie.name }}</span>
                        </p>
                      </div>
                    </div>
                  </article>
                </router-link>
                <hr>
                <p v-if="previous">
                  <span class="subtitle">Aula anterior</span>
                </p>
                <router-link v-if="previous" :to="`/courses/${course.slug}/${previous.serie.slug}/${previous.lesson.slug}`">
                  <article class="media related-card">
                    <div class="media-left" v-if="metadata(previous.lesson, 'picture_100x75')">
                      <figure class="image">
                        <img :src="metadata(previous.lesson, 'picture_100x75').value" :alt="previous.lesson.name">
                      </figure>
                    </div>
                    <div class="media-content">
                      <div class="content">
                        <p>
                          <span class="video-title">{{ previous.lesson.name }}</span>
                          <span class="video-subtitle">{{ previous.serie.name }}</span>
                        </p>
                      </div>
                    </div>
                  </article>
                </router-link>
                <hr>
                <button v-if="subscription_courses.indexOf(course.id) !== -1 || selected_lesson.is_open || course.is_open" class="button is-fullwidth is-primary" :class="{'is-loading': is_marking_lesson}" @click="markLessonWatched()">
                  <span class="icon">
                    <vue-material-icon name="done"></vue-material-icon>
                  </span>
                  <span>
                    Já assisti, quero ir pra próxima
                  </span>
                </button>
              </div>
            </div>

            <div class="column is-12">
              <div class="title is-size-6 has-text-centered">
                <p>Progresso geral no curso:</p>
              </div>
              <progress v-if="course_progress(course) > 0" class="progress course is-success" :value="course_progress(course)" max="100">15%</progress>
            </div>
          </div>

        </div>
    </hero-section>
    <p>&nbsp;</p>
    <div class="container is-fluid">
      <div class="columns is-multiline">
        <div class="column is-12">

        </div>
        <div class="column is-12">
          <div class="content" v-html="selected_lesson.description"></div>
        </div>
        <div class="column is-12">
          <!--<comments commentable-type="lessons" :commentable-id="selected_lesson.id"></comments>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Comments from './Comments.vue'
import {mapState, mapGetters} from 'vuex'
import store from '@/store'
import Player from '@vimeo/player'
import HeroSection from './HeroSection.vue'
import InitialBilletNotification from './Home/InitialBilletNotification.vue'

export default {

  name: 'Lesson',

  components: {
    Comments,
    HeroSection,
    InitialBilletNotification
  },

  beforeRouteEnter (to, from, next) {
    Promise.all([
      store.dispatch('courses/fetchCourse', to.params.courseSlug),
      store.dispatch('subscriptions/fetchAll')
    ]).then(
      () => next(
        vm => vm.setLesson(to.params.serieSlug, to.params.lessonSlug)
      )
    )
  },

  beforeRouteUpdate (to, from, next) {
    Promise.all([
      store.dispatch('courses/fetchCourse', to.params.courseSlug),
      store.dispatch('subscriptions/fetchAll')
    ]).then(
      () => {
        this.setLesson(to.params.serieSlug, to.params.lessonSlug)
        next()
      }
    )
  },

  beforeRouteLeave (from, to, next) {
    next()
  },

	  data () {
	    return {
      course_slug: '',
      serie_slug: '',
      lesson_slug: '',
      vimeo_player: null,
      is_vimeo_player_loaded: false,
      is_marking_lesson: false,
      playback_speeds: [0.5, 1, 1.5, 2],
      playback_speed: 1,
      is_setting_playback: false
	    }
  },

  computed: {
    ...mapState('courses', ['course']),
    ...mapGetters('courses', {
      'selected_serie': 'selected_serie',
      'selected_lesson': 'selected_lesson',
      'next': 'next_serie_lesson',
      'previous': 'previous_serie_lesson',
      course_progress: 'course_progress'
    }),
    ...mapGetters('subscriptions', ['subscription_courses', 'initial_pending_billet']),
    ...mapGetters('metadata', {metadata: 'getMetadata'}),
    ...mapState("order", ["product"]),
    ...mapGetters("order", ["format_price", "daily_price"])
  },

  methods: {
    setLesson (serie, lesson) {
      store.commit('courses/setSelectedSerie', serie)
      store.commit('courses/setSelectedLesson', lesson)
      window.setTimeout(() => {
        this.vimeo_player = new Player('stage_player')
        this.vimeo_player.on('ended', (data) => this.markLessonWatched(lesson))
        this.is_vimeo_player_loaded = true
      }, 500)
      window.scrollTo(0, 0)
      this.$store.dispatch('order/fetchProduct', {publisher: 'escola', product: 'plano-mensal'})
    },
    markLessonWatched () {
      this.$swal({
        type: 'question',
        title: 'Tem certeza?',
        html: '<p class="subtitle"><strong>Deseja marcar essa aula como assistida e ir para próxima?</strong></p>',
        showCancelButton: true,
        confirmButtonText: 'Sim, marcar como assistida',
        cancelButtonText: 'Não, quero assistir de novo',
        preConfirm: () => {
          this.is_marking_lesson = true
          return store.dispatch('courses/markLessonWatched', {serie: this.selected_serie.slug, lesson: this.selected_lesson.slug})
        }
      }).then((result) => {
        if (result.value) {
          this.$store.dispatch('courses/fetchMyCourses');
          if (this.next && this.next.lesson) {
            this.$router.push(`/courses/${this.course.slug}/${this.next.serie.slug}/${this.next.lesson.slug}`)
          } else {
            this.$router.push(`/courses/${this.course.slug}`)
          }
        }
      }).finally(() => this.is_marking_lesson = false)
    },
    setData (err, data) {
      if (err) {
        this.error = err.response.body.message
      } else {
        for (let field in data) {
          this[field] = data[field]
        }
      }
    },
    setPlaybackSpeed (s) {
      this.is_setting_playback = true
      this.vimeo_player.setPlaybackRate(s).then(
        (playbackRate) => { this.playback_speed = playbackRate },
        (err) => { console.log('vimeo player playback error: ', err); this.$swal({type: 'error', title: 'Erro', html: '<p>Ocorreu um erro ao tentar setar a velocidade de playback do vídeo.</p>'}) }
      ).finally(() => { this.is_setting_playback = false })
    }
  }
}
</script>

<style lang="scss">
  @import "../assets/mixins.scss";

  .box.course-navigation {
    .subtitle {
      color: $preto;
      font-size: 18px;
    }
  }
  .progress.course {
    height: 2px;
  }

  .video-wrapper {
    padding: 50% 0 0 0;
    position: relative;

    @media screen and (max-width: 600px) {
      padding: 75% 0 0 0;
      margin: 0px -30px 0px -30px;
    }
  }
  .cta-buy {
    @include pulse($green, 10px, 'pulsegreen');
  }
  @media screen and (max-width: 600px) {
    .course-page {
      .hero {
        .hero-body {
          padding-top: 10px;
        }
      }
    }
  }
</style>
