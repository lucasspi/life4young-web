<template>
  <div class="sidebar sidebar-lesson" style="overflow: auto;" :class="{'is-active': is_menu_visible && is_menu_open}">
    <div class="sidebar-header" style="background: #293341; margin: auto;">
      <div class="columns is-mobile">
        <div class="column is-1-desktop is-1-mobile">
          <a class="sidebar-close" href="javascript:void(0);"  @click="onClickToggleNavigation()">
            <font-awesome-icon icon="chevron-left"></font-awesome-icon>
          </a>
        </div>
        <div class="column is-3-desktop is-3-mobile">
          <img v-if="img(course, 'avatar')" :src="img(course, 'avatar').image_url" :alt="course.name" />
        </div>
        <div class="column is-9-desktop is-8-mobile" style="padding-left: 0px;">
          <h2 class="courseTitle">{{course.name}}</h2>
        </div>
      </div>
    </div>
    <div class="" style="background: #293341; margin: auto; padding-left:5px; padding-right: 5px; padding-bottom: 30px;">
      <div class="columns is-mobile is-multiline is-centered">
        <div class="column is-2-desktop is-2-mobile">
          <h2 style="padding-left:5px; color: white; font-size: 11px; font-weight: 300; line-height: 1.1; text-align: center;">{{course_progress(course)}}%</h2>
        </div>
        <div class="column is-10-desktop is-10-mobile " style="">
          <progress class="progress is-success" :value="course_progress(course)" max="100"></progress>
        </div>
      </div>
    </div>
    <div class="series-loop" v-for="serie in course.series" :key="serie.id">
      <div class="inner innerClass">
        <div class="columns is-vcentered">
          <div class="column is-12">
            <h2 class="serieTitle">Serie: {{serie.name}}</h2>
          </div>
        </div>
      </div>
      <div class="inner" style="background: #485A74;">
        <ul id="mainUlLesson" class="sidebar-menu">
          <li><span class="nav-section-title"></span></li>
          <li v-for="lesson in serie.lessons" :key="lesson.id">
            <router-link :to="`/courses-dev/${course.slug}/${serie.slug}/${lesson.slug}`" @click.native="onClickToggleNavigation()" class="has-icon">
              <div class="columns is-mobile is-vcentered">
                <div class="column is-2-desktop is-2-mobile" style="margin-right:0px;">
                  <!-- {{lesson.type}} video, audio, text, exam -->
                  <!-- lesson.type === 'video' -->

                  <font-awesome-icon v-if="lesson.type === 'video'" icon="play-circle" style="font-size:18px;" :style="lesson.watched_students_count > 0 ? 'color: darkgray;' : ''"></font-awesome-icon>
                  <font-awesome-icon v-if="lesson.type === 'text'" icon="pencil-alt" style="font-size:18px;" :style="lesson.watched_students_count > 0 ? 'color: darkgray;' : ''"></font-awesome-icon>
                  <font-awesome-icon v-if="lesson.type === 'audio'" icon="headphones" style="font-size:18px;" :style="lesson.watched_students_count > 0 ? 'color: darkgray;' : ''"></font-awesome-icon>
                  <font-awesome-icon v-if="lesson.type === 'exam'" icon="list-ul" style="font-size:18px;" :style="lesson.watched_students_count > 0 ? 'color: darkgray;' : ''"></font-awesome-icon>
                </div>
                <div class="is-11-mobile">
                <p :style="lesson.watched_students_count > 0 ? 'color: darkgray; font-size: 14px;' : 'font-size: 14px;'">{{lesson.name}}</p>
                </div>
              </div>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
    <div class="inner" style="background: #334258;">
      <ul class="sidebar-menu">
        <li>
          <router-link to="/" @click.native="onClickToggleNavigation()" class="has-icon">
            <div class="columns is-vcentered" style="margin-top:0px;">
              <div class="column is-2-desktop" style="margin-right:0px;">
                <font-awesome-icon icon="comment-dots" style="font-size:22px;"></font-awesome-icon>
              </div>
              <p class="is-vcentered" style="font-size: 14px;">Comunidade</p>
            </div>
          </router-link>
        </li>
        <li  v-if="$auth.check()">
          <router-link to="/" @click.native="onClickToggleNavigation()" class="has-icon">
            <div class="columns is-vcentered" style="margin-top:0px;">
              <div class="column is-2-desktop" style="margin-right:0px;">
                <font-awesome-icon icon="sign-out-alt" style="font-size:22px;"></font-awesome-icon>
              </div>
              <p class="is-vcentered" style="font-size: 14px;">Logout</p>
            </div>
          </router-link>
        </li>
        </ul>
      </div>
  </div>
</template>

<script>
  import Logo from '../Logo.vue'
  import MenuToggle from '../MenuToggle.vue'
  import LoggedIn from '../LoggedIn.vue'
  import {mapState, mapGetters} from 'vuex'
  import LessonFixedsidebar from './LessonFixedsidebar.vue'
  export default {

    name: 'sidebar-lesson',

    components: {
      Logo,
      MenuToggle,
      LoggedIn,
      LessonFixedsidebar
    },

    computed: {
      ...mapGetters({'is_menu_open': 'isMenuOpen'}),
      ...mapState(['is_menu_visible', 'is_tour_open']),
      ...mapState('courses', ['loading_my_courses', 'navbar_max_courses', 'course']),
      ...mapGetters("courses", {my_courses: 'my_4_started_courses', course_progress: "course_progress", my_courses_count: 'my_courses_count'}),
      ...mapGetters("metadata", {img: 'getMetadataImage'})
    },

    data() {
      return {
        is_my_courses_open: false,
        items: [1,2,3,4]
      }
    },

    mounted() {
      this.$store.dispatch('courses/fetchMyCourses')
    },

    methods: {
      onClickToggleNavigation() {
        this.$store.commit("setMenuVisible", !this.is_menu_visible)
      },
      doLogout() {
        this.$auth.logout({redirect: '/', makeRequest: false})
        this.onClickToggleNavigation()
        this.$store.dispatch('onesignal/logoutEmail')
      }
    }
  }
</script>

<style lang="scss">
.sidebar-lesson {
  .sidebar-header {
    .sidebar-close {
      background-color: transparent;
    }
  }
  .courseTitle{
    padding-left:5px;
    color: white;
    font-size: 14px;
    font-weight: 300;
    line-height: 1.3;

  }
  .serieTitle{
    padding-left: 5px;
    color: white;
    font-size: 16px;
    font-weight: 300;
    line-height: 1.4;
    text-align: left;
  }
  .innerClass{
    background: #334258;
    margin: auto;
    padding-top: 30px;
    padding-bottom: 30px;
  }
  ul#mainUlLesson li{
  transition: 0.7s;
  }

  ul#mainUlLesson li:hover{
    background-color: #868c94;

  }
}

</style>
