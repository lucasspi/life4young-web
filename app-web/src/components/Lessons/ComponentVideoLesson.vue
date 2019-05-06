<template>
  <div>

    <div v-if="subscription_courses.indexOf(course.id) !== -1 || selected_lesson.is_open || course.is_open" class="video-wrapper container">

        <iframe width="100px" height="100px"  id="stage_player" :src="`https://player.vimeo.com/video/${selected_lesson.vimeo_id || selected_lesson.remote_video_id}?autoplay=1&title=0&byline=0&portrait=0`" style="position:absolute;top:0;left:0;width:100%;height:100%;" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen allow="autoplay; encrypted-media"></iframe>

    </div>

    <section class="columns container is-vcentered videoDescriptionSection" style="margin-bottom: 1px; ">
      <div class="column is-3-mobile is-1-desktop is-vcentered" style="padding-right: 0;">
        <div class="courseLogo ">
          <img class="logoCourseLesson" v-if="img(course, 'avatar')" :src="img(course, 'avatar').image_url" :alt="course.name">
        </div>
      </div>
      <div class="column is-9-mobile is-11-desktop " style="padding:0px;">
        <h2  class="titleVideoDescription">{{course.name}}</h2>
      </div>
    </section>

    <section class="columns container is-vcentered is-multiline videoDescriptionSection is-mobile is-desktop" style="margin-bottom: 0px;">
      <div class="is-6-desktop is-12-mobile column">
        <div style="padding:20px;">
          <h2  class="titleVideoDescription2">{{selected_lesson.name}}</h2>
          <p class="textVideoDescription">{{selected_serie.name}} | {{course.name}}</p>
        </div>

      </div>
              <div class="column is-3-desktop">
          <button class="likeButton">
            <font-awesome-icon icon="thumbs-up" style="color: white; font-size: 18px;"></font-awesome-icon>
          </button>
          <router-link v-if="previous" :to="`/courses-dev/${course.slug}/${previous.serie.slug}/${previous.lesson.slug}`">
            <button class="previousButton">
              <font-awesome-icon icon="step-backward" style="color: #0691E6; font-size: 18px;"></font-awesome-icon>
            </button>
          </router-link>
          <router-link v-if="next" :to="`/courses-dev/${course.slug}/${next.serie.slug}/${next.lesson.slug}`">
            <button class="proximaAulaButton">
              Próxima aula
            </button>
          </router-link>
        </div>


    </section>
    <section class="container section" style="margin-bottom: 60px; padding-left:10px; padding-right:10px;">
      <p>{{selected_lesson.description}}</p>
    </section>
  </div>
</template>
<script>
import store from '@/store'
import {mapState, mapGetters} from 'vuex'
import Player from '@vimeo/player'
import LessonButtons from './LessonButtons'

export default {

    name: 'component-video-lesson',

    component:{
      LessonButtons,
    },

  data() {
    return {
      vimeo_player: null,
      is_vimeo_player_loaded: false,
      is_marking_lesson: false,
      playback_speeds: [0.5, 1, 1.5, 2],
      playback_speed: 1,
      is_setting_playback: false
    }
  },

  mounted () {
      window.setTimeout(() => {
        this.vimeo_player = new Player('stage_player')
        this.vimeo_player.on('ended', (data) => this.markLessonWatched(lesson))
        this.is_vimeo_player_loaded = true
      }, 500)
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
    ...mapGetters('metadata', {metadata: 'getMetadata', img: 'getMetadataImage'}),
    ...mapState("order", ["product"]),
    ...mapGetters("order", ["format_price", "daily_price"])
  },

  methods: {
    setLesson(serie, lesson) {
      this.$store.commit('courses/setSelectedSerie', serie)
      this.$store.commit('courses/setSelectedLesson', lesson)
      window.setTimeout(() => {
        this.vimeo_player = new Player('stage_player')
        this.vimeo_player.on('ended', (data) => this.markLessonWatched(lesson))
        this.is_vimeo_player_loaded = true
      }, 500)
      window.scrollTo(0, 0)
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
    onClickToggleNavigation () {

      this.$store.commit("setMenuVisible", !this.is_menu_visible)

    },
    onClickButtonTrouble() {
      try {
        Tawk_API.setAttributes({
            'name'     : this.$auth.user().name,
            'email'    : this.$auth.user().email,
            'lesson_id': this.selected_lesson.id
        }, function(error){});
        Tawk_API.maximize();
      } catch (e) {}

      this.$router.push(this.redirectUrl ? this.redirectUrl : '/');
    }

  }


}
</script>
<style>
  .video-wrapper {
    padding: 50% 0 0 0;
    position: relative;

    @media screen and (max-width: 600px) {
      padding: 75% 0 0 0;
      margin: 0px -30px 0px -30px;
    }
  }
@media only screen  and (min-device-width : 1023px) {
  .responsiveMenuMobile{
    display:none !important;
    left:0;
  }
  .reponsiveMenuTablet{
    display:none !important;
    left:0;
  }
  .logoCourseLesson{
    height: 40px;
    width: 40px;
  }

}
/* iPads (portrait and landscape) ----------- */
@media only screen and (min-device-width : 768px) and (max-device-width : 1024px) {
  .responsiveMenuMobile{
    display:none;
  }
  .logoCourseLesson{
    width:40px;
    height: 40px;
    margin-right: 20px;
    margin-bottom: 20px;
    float: left;
  }
    .courseLogo{
  padding-bottom:10px;
}
}
/* Smartphones (portrait and landscape) ----------- */

.menu4mobile{
  background-color: #ff6126;
  border-bottom-right-radius: 20px;
  border-top-right-radius: 20px;

}
.courseLogo{
  padding-left:20px;
}

.likeButton{
  background-color: #0691E6;
  border-radius: 5px;
  padding:10px;
  border: transparent;
  cursor: pointer;
}
.previousButton{
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  background-color: white;
  cursor: pointer;
  padding:10px;
  border-color: #e0e0e0;
}
.proximaAulaButton{
  cursor: pointer;
  font-size: 16px;
  font-weight:600;
  border-color:transparent;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  padding:10px;
  background-color:  #0691E6;
  color: white;
}
.reportarProblemaButton{

  cursor: pointer;
  font-size: 16px;
  font-weight:600;
  border-color: #0691E6;
  border-radius: 5px;
  padding:10px;
  background-color: transparent;
  color: #0691E6;
  transition: 0.4s;
}
.reportarProblemaButton:hover {
  color:#333333;
  border-color: #333333;
  opacity: 1;

}
.titleVideoDescription{
  text-align: left;
  font-size: 24px;
  font-weight:600;
  line-height:1.9;
}
.titleVideoDescription2{
  text-align: left;
  font-size: 24px;
  font-weight:600;
  line-height:1.9;
}
.textVideoDescription{
  text-align: left;
  font-size: 16px;
  font-weight:300;
}
.videoDescriptionSection{
    background-color: #F0F2F5;
    width:100%;
    margin:auto;
    margin-top:0px !important;
  }
  .videoHeightforMobile{
    width: 100%;
    height: 643px;
    text-align: center;
    margin: auto;
    display: block;

    margin-top:2%;

  }
  @media only screen and (min-device-width : 320px) and (max-device-width : 480px) {

    .reponsiveMenuTablet{
      display:none;
    }

    .logoCourseLesson{
      float: left;
    }
    .videoDescriptionSection{
      padding-top:20px;
      padding-bottom:20px;
    }
    .is-3-mobile.is-1-desktop.column{
      padding: 0px;
    }
   .videoHeightforMobile{
      height: 211px;
      width: 100%;
    }
    .titleVideoDescription{
      font-size: 18px;
      line-height:1.4;
      padding-left: 85px;
    }
    .titleVideoDescription2{
      font-size: 18px;
      line-height:1.4;

    }
    .textVideoDescription{
      font-size: 13px;
      display: static;
    }
    .columns.is-mobile > .column.is-6 {
      width: 30%;
    }
    .columns.is-mobile > .column.is-1{
      width: 5.33333%;
    }
    .likeButton{
      background-color: #0691E6;
      border-radius: 5px;
      padding:10px;
      border: transparent;
    }
    .previousButton{
      border-top-left-radius: 5px;
      border-bottom-left-radius: 5px;
      background-color: white;
      padding:10px;
      border-color: #e0e0e0;
    }
    .proximaAulaButton{
      font-size: 13px;
      font-weight:600;
      border-color:transparent;
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
      padding:10px;
      background-color:  #0691E6;
      color: white;
    }
    .reportarProblemaButton{
      margin-left: 30px;
      margin-right: 10px;
      font-size: 13px;
    }

}
@media only screen and (min-device-width : 768px) and (max-device-width : 1024px) {
   .videoHeightforMobile{
      height: 450px;
      width:100%;
    }
    .titleVideoDescription{
      font-size: 18px;
      line-height:1.4;
    }
    .columns.is-mobile > .column.is-6 {
        width: 30%;
    }
    .columns.is-mobile > .column.is-1{
          width: 5.33333%;
    }
}
</style>
