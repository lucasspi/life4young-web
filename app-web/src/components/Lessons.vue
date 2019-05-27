<template>
<div class="bodyMenuFixed">
  <fixed-sidebar-lesson></fixed-sidebar-lesson>
  <div class="columns responsiveMenuMobile ">
    <a href="javascript:void(0);"  @click="onClickToggleNavigation()">
      <div class="column is-2-mobile is-1-tablet menu4mobile is-centered">
        <font-awesome-icon icon="angle-right" style="color: white; font-size: 25px; text-align: center; margin-left:14px;"></font-awesome-icon>
      </div>
    </a>
  </div>
  <div class="columns reponsiveMenuTablet">
    <a href="javascript:void(0);"  @click="onClickToggleNavigation()">
      <div class="column is-1-mobile is-1-tablet menu4mobile is-centered">
        <font-awesome-icon icon="angle-right" style="color: white; font-size: 25px; text-align: center; margin-left:14px;"></font-awesome-icon>
      </div>
    </a>
  </div>
  <div v-if="selected_lesson">
    <component-video-lesson v-if="selected_lesson.type === 'video'"></component-video-lesson>
    <component-audio-lesson v-if="selected_lesson.type === 'audio'"></component-audio-lesson>
  </div>

<lesson-comments></lesson-comments>
<sidebar-lesson></sidebar-lesson>

</div>
</template>

<script>
import LessonComments from './Community/LessonComments'
import SidebarLesson from './Sidebar/SidebarLesson'
import FixedSidebarLesson from './Sidebar/LessonFixedsidebar'
import store from '@/store'
import {mapState, mapGetters} from 'vuex'
import ComponentVideoLesson from './Lessons/ComponentVideoLesson'
import ComponentAudioLesson from './Lessons/ComponentAudioLesson'

  function beforeRouterFunction (to, from, next) {
    Promise.all([
      store.dispatch('courses/fetchCourse', to.params.courseSlug),
      store.dispatch('subscriptions/fetchAll')
    ]).then(
      () => next(
        vm => vm.setLesson(to.params.serieSlug, to.params.lessonSlug)
      )
    )
  }

export default {

 components: {
   LessonComments,
   SidebarLesson,
   FixedSidebarLesson,
   ComponentVideoLesson,
   ComponentAudioLesson
  },


  beforeRouteEnter (to, from, next) {
    beforeRouterFunction(to, from, next);
  },

  beforeRouteUpdate (to, from, next) {
    beforeRouterFunction(to, from, next);
  },

  beforeRouteLeave (from, to, next) {
    next()
  },


  data() {
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
    setLesson(serie, lesson) {
      this.$store.commit('courses/setSelectedSerie', serie)
      this.$store.commit('courses/setSelectedLesson', lesson)
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

  }
}
</script>

<style>

/* Desktops and laptops ----------- */
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
@media only screen and (min-device-width : 320px) and (max-device-width : 480px) {

  .logoCourseLesson{
    float: left;
  }
}
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
