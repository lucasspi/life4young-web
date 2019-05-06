<template>
  <div class="course-page">
    <hero-section not-waves="true" set-classes="video is-bold">
      <template v-if="first_lesson" slot="video">
        <div class="overlay"></div>
        <div style="padding:56.25% 0 0 0;position:relative;">
          <iframe
            :src="`https://player.vimeo.com/video/${first_lesson.vimeo_id}?title=0&byline=0&portrait=0&background=1#t=6m2s`"
            style="position:absolute;top:0;left:0;width:100%;height:100%;"
            frameborder="0"
            webkitallowfullscreen
            mozallowfullscreen
            allowfullscreen>
          </iframe>
        </div>
      </template>
      <template slot="head">
        <nav class="level" style="margin-top: 20px;">
          <!-- Left side -->
          <div class="level-left">
            <div class="level-item">
              <nav class="breadcrumb is-centered" aria-label="breadcrumbs">
                <ul>
                  <router-link to="/courses" tag="li"><a href="">Treinamentos</a></router-link>
                  <router-link :to="`/courses/${course.slug}`" active-class="is-active" tag="li"><a href="">{{course.name}}</a></router-link>
                </ul>
              </nav>
            </div>
          </div>
        </nav>
      </template>
      <div class="container">
        <div class="columns">
          <div class="column is-8">
            <div class="columns">
              <div class="column">
                <figure v-if="img(course, 'avatar')" class="media-left">
                  <p class="image is-64x64">
                    <img :src="img(course, 'avatar').image_url" :alt="course.name">
                  </p>
                </figure>
              </div>
              <div class="column is-10">
                <h1 class="title">
                  {{ course.name }}
                </h1>
                <h2 class="subtitle">
                  {{ course.publisher.name }}
                </h2>
              </div>
            </div>
            <progress v-if="course_progress(course) > 0" class="progress is-success" :class="{'is-xsmall': mode == 'card'}" :value="course_progress(course)" max="100">15%</progress>
          </div>
          <div class="column is-4">
            <p class="has-text-centered">
              <router-link v-if="next && next.serie && next.lesson" :to="`/courses/${course.slug}/${next.serie.slug}/${next.lesson.slug}`" class="button btn-continue-course is-medium is-success has-icons-left">
                <span class="icon is-left is-large">
                  <vue-material-icon class="is-large" name="play_arrow"></vue-material-icon>
                </span>
                <span v-if="course_progress(course) > 0">Continuar assistindo</span>
                <span v-else>Começar curso</span>
              </router-link>
            </p>
          </div>
        </div>
      </div>
    </hero-section>
    <p>&nbsp;</p>
    <div class="container is-fluid">
      <nav class="level is-mobile">
        <div class="level-item has-text-centered has-text-primary">
          <div>
            <p class="heading">Séries</p>
            <p class="title">{{course.series_count}}</p>
          </div>
        </div>
        <div class="level-item has-text-centered has-text-primary">
          <div>
            <p class="heading">Aulas</p>
            <p class="title">{{course.lessons_count}}</p>
          </div>
        </div>
        <div v-if="lesson_duration_total_in_hours.num > 0" class="level-item has-text-centered has-text-primary">
          <div>
            <p class="heading">Carga horária</p>
            <p class="title">{{lesson_duration_total_in_hours.num}}{{lesson_duration_total_in_hours.unit}}</p>
          </div>
        </div>
        <div class="level-item has-text-centered has-text-primary">
          <div>
            <p class="heading">Progresso</p>
            <p class="title">{{course_progress(course)}}%</p>
          </div>
        </div>
        <!-- <div class="level-item has-text-centered">
          <div>
            <p class="heading">Completado por</p>
            <p class="title">789</p>
          </div>
        </div> -->
      </nav>
      <div class="subtitle">Sobre o curso</div>
      <div class="content" v-html="course.description"></div>
    </div>
    <p>&nbsp;</p>
    <div class="container is-fluid">
      <div v-for="serie in course.series" :key="serie.id" class="columns is-multiline">
        <div class="column is-12">
          <p class="title is-bordered">
            {{ serie.name }}
            <span v-if="$auth.check('manage-courses')" class="actions">
              <router-link :to="`/courses/vimeo-importer/${course.slug}/${serie.slug}`" class="button has-icon is-small is-primary"><span><i class="fa fa-vimeo"></i></span><span>Importar aulas do vimeo</span></router-link>
            </span>
          </p>
        </div>

        <lesson-card v-for="lesson in serie.lessons" :key="lesson.id" :course="course" :serie="serie" :lesson="lesson"></lesson-card>
      </div>
    </div>
  </div>
</template>

<script>
import store from '@/store'
import {mapState, mapGetters} from 'vuex'
import HeroSection from './HeroSection.vue'
import LessonCard from './Course/LessonCard.vue'

export default {

  name: 'Course',

  components: {
    HeroSection,
    LessonCard
  },

  beforeRouteEnter (to, from, next) {
    store.dispatch('courses/fetchCourse', to.params.courseSlug)
      .then(() => next(vm => vm.setData()))
  },
  beforeRouteUpdate (to, from, next) {
    store.dispatch('courses/fetchCourse', to.params.courseSlug)
      .then(() => {
        this.setData()
        next()
      })
  },
  beforeRouteLeave (from, to, next) {
    next()
  },

  computed: {
    ...mapState('courses', ['course']),
    ...mapGetters('courses', {
      'lesson_duration_total_in_hours': 'lessonDurationTotalInHours',
      course_progress: 'course_progress',
      'next': 'next_unwatched_lesson'
    }),
    ...mapGetters('metadata', {metadata: 'getMetadata', img: 'getMetadataImage'}),
    first_lesson () {
      let state = this.$store.state.courses
      if (state.course && state.course.series && state.course.series.length > 0 && state.course.series[0].lessons && state.course.series[0].lessons.length > 0) {
        return state.course.series[0].lessons[0]
      }
      return null
    }
  },

  data () {
    return {
    }
  },

  methods: {
    setData () {
      window.scrollTo(0, 0);
    }
  }
}
</script>

<style lang="scss">
@import "../assets/mixins";
.btn-continue-course {
  @include pulse(#FFF, 10px, 'pulse_white');
}
  .course-page {
    margin-bottom: 50px;
    @media screen and (max-width: 991px) {
      .container {
        margin-left: 10px;
        margin-right: 10px;
      }
    }
  }
</style>
