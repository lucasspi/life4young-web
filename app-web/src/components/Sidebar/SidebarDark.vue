<template>
  <div class="sidebar" style="overflow: auto;" :class="{'is-active': is_menu_visible && is_menu_open}">
    <div class="sidebar-header">
      <img src="/static/logo_eda_white.png" alt="Escola de Arquitetos" />
      <a class="sidebar-close" href="javascript:void(0);"  @click="onClickToggleNavigation()">
        <font-awesome-icon icon="times"></font-awesome-icon>
      </a>
    </div>
    <div class="inner">
      <ul class="sidebar-menu">
        <li><span class="nav-section-title"></span></li>
        <li>
          <router-link to="/" @click.native="onClickToggleNavigation()" class="has-icon">
            <span class="icon"><font-awesome-icon icon="home"></font-awesome-icon></span>
            <span>Home</span>
          </router-link>
        </li>
        <li v-if="!$auth.check()">
          <router-link to="/login" @click.native="onClickToggleNavigation()" class="has-icon">
            <span class="icon"><font-awesome-icon icon="sign-in-alt"></font-awesome-icon></span>
            <span>Fazer login</span>
          </router-link>
        </li>
        <li v-if="!$auth.check()">
          <router-link to="/signup" @click.native="onClickToggleNavigation()" class="has-icon">
            <span class="icon"><font-awesome-icon icon="user-plus"></font-awesome-icon></span>
            <span>Cadastre-se</span>
          </router-link>
        </li>
        <li>
          <router-link v-if="$auth.check(`chain-of-knowledge`)" @click.native="onClickToggleNavigation()" to="/invites" class="has-icon">
            <span class="icon">
              <font-awesome-icon icon="heart"></font-awesome-icon>
            </span>
            <span>Corrente do bem</span>
          </router-link>
        </li>
        <li>
          <router-link to="/open-courses" @click.native="onClickToggleNavigation()" class="has-icon">
            <span class="icon"><font-awesome-icon icon="trophy"></font-awesome-icon></span>
            <span>Cursos gratuitos</span>
          </router-link>
        </li>
        <li v-if="$auth.check()">
          <router-link to="/profile" @click.native="onClickToggleNavigation()" class="has-icon">
            <span class="icon"><font-awesome-icon icon="user"></font-awesome-icon></span>
            <span>Meu perfil</span>
          </router-link>
        </li>
        <li class="have-children" v-if="$auth.check('view-courses') && my_courses.length > 0" :class="{'active': is_my_courses_open}">
          <a href="javascript:void(0);" class="has-icon" @click="is_my_courses_open = !is_my_courses_open">
            <span class="icon"><font-awesome-icon icon="play-circle"></font-awesome-icon></span>
            <span>Meus cursos</span>
          </a>
          <ul >
            <li v-for="course in my_courses" :key="course.id">
              <router-link :to="`/courses/${course.slug}`"  @click.native="onClickToggleNavigation()">
                <span class="image is-48x48">
                  <img :src="img(course, 'avatar').image_url" :alt="course.name">
                </span>
                <span class="name">
                  {{course.name}}
                  <progress v-if="course_progress(course) > 0" class="progress is-success" :value="course_progress(course)" max="100">15%</progress>
                </span>
              </router-link>
            </li>
            <li  v-if="my_courses_count > navbar_max_courses">
              <router-link  @click.native="onClickToggleNavigation()" to="/dashboard" class="is-size-7">Ver todos</router-link>
            </li>
          </ul>
        </li>
        <li v-if="$auth.check()">
          <a href="javascript:void(0);" @click="doLogout()" class="has-icon">
            <span class="icon">
              <font-awesome-icon icon="sign-out-alt"></font-awesome-icon>
            </span>
            <span>Logout</span>
          </a>
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

  export default {

    name: 'sidebar-dark',

    components: {
      Logo,
      MenuToggle,
      LoggedIn
    },

    computed: {
      ...mapGetters({'is_menu_open': 'isMenuOpen'}),
      ...mapState(['is_menu_visible', 'is_tour_open']),
      ...mapState('courses', ['loading_my_courses', 'navbar_max_courses']),
      ...mapGetters("courses", {my_courses: 'my_4_started_courses', course_progress: "course_progress", my_courses_count: 'my_courses_count'}),
      ...mapGetters("metadata", {img: 'getMetadataImage'})
    },

    data() {
      return {
        is_my_courses_open: false
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
</style>
