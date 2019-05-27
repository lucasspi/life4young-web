<template>
  <div class="sidebar" style="overflow: auto;" :class="{'is-active': is_mobile_menu_visible}">
    <router-link to="/perfil" @click.native="onClickToggleNavigation()" class="has-icon">
    <div class="columns is-mobile is-vcentered is-centered" v-if="$auth.check()" style="padding-top: 30px; padding:5px; background-color: #2b3544;">
      <div class="column is-3-mobile is-centered">
        <img v-if="$auth.user().avatar" :src="$auth.user().avatar.image_url" style="border-radius: 90px; width: 36px; height: 36px;">
      </div>
      <div class="column is-9-mobile">

            <router-link to="/perfil" style="text-align: left; color: white; font-weight: 700; line-height:1.1;     padding-left: 0px;">
            {{$auth.user().name}}<br><span style='font-weight: 300; color:#bababa; font-size:11px;'>{{$auth.user().points}}pts</span>
            </router-link>
      </div>
    </div>
    </router-link>


    <div class="inner" >
      <ul class="sidebar-menu">
        <li><span class="nav-section-title"></span></li>
        <li style="padding-top: 40px;">
          <router-link to="/" @click.native="onClickToggleNavigation()" class="has-icon">
            <div class="columns is-mobile is-centered is-vcentered">
              <div class="is-12-mobile">
                <p style="font-size: 17px;">Home</p>
              </div>
            </div>
          </router-link>
        </li>
        <li style="padding-top: 30px;">
          <router-link to="/open-courses" @click.native="onClickToggleNavigation()" class="has-icon">
            <div class="columns is-mobile is-centered is-vcentered">
              <div class="is-12-mobile">
                <p style="font-size: 17px;">Cursos</p>
              </div>
            </div>
          </router-link>
        </li>
        <li v-if="false" style="padding-top: 30px;">
          <router-link to="/community" @click.native="onClickToggleNavigation()" class="has-icon">
            <div class="columns is-mobile is-centered is-vcentered">
              <div class="is-12-mobile">
                <p style="font-size: 17px;">Comunidade</p>
              </div>
            </div>
          </router-link>
        </li>

        <li style="padding-top: 30px;" v-if="$auth.check()">
          <router-link to="/profile" @click.native="onClickToggleNavigation()" class="has-icon">
            <div class="columns is-mobile is-centered is-vcentered">
              <div class="is-12-mobile">
                <p style="font-size: 17px;">Meu Perfil</p>
              </div>
            </div>
          </router-link>
        </li>
        <li style="padding-top: 30px;" v-if="$auth.check()" @click="doLogout()">
          <div class="columns is-mobile is-centered is-vcentered">
            <div class="is-12-mobile" style="color: white;">
              <font-awesome-icon icon="sign-out-alt" style="color: #bababa; font-size: 18px; margin-right: 10px;"></font-awesome-icon>
              Logout
            </div>
          </div>
        </li>
        <li style="padding-top: 30px;" v-if="!$auth.check()">
          <router-link to="/login" @click.native="onClickToggleNavigation()" class="has-icon">
            <div class="columns is-mobile is-centered is-vcentered">
              <div class="is-12-mobile">
                <p style="font-size: 17px;">Fazer Login</p>
              </div>
            </div>
          </router-link>
        </li>
        <li style="padding-top: 30px;" v-if="!$auth.check()">
          <router-link to="/signup" @click.native="onClickToggleNavigation()" class="has-icon">
            <div class="columns is-mobile is-centered is-vcentered">
              <div class="is-12-mobile" style="background-color:#ff6126; padding:15px; border-radius: 40px; ">
                <p style="font-size: 17px; font-weight: 600;">Cadastre-se</p>
              </div>
            </div>
          </router-link>

        </li>
        <li style="padding-top: 30px;">
          <router-link to="/community" @click.native="onClickToggleNavigation()" class="has-icon">
            <div class="columns is-mobile is-centered is-vcentered">
              <div class="is-12-mobile">
              <router-link  class="navbar-item is-secondary" to="/search">
                <font-awesome-icon icon="search"></font-awesome-icon>
              </router-link>
              </div>
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
  import LessonFixedsidebar from '../Sidebar/LessonFixedsidebar.vue'
  export default {

    name: 'navbar-mobile',

    components: {
      Logo,
      MenuToggle,
      LoggedIn,
      LessonFixedsidebar
    },

    computed: {
      ...mapGetters({'is_menu_open': 'isMenuOpen'}),
      ...mapState(['is_mobile_menu_visible', 'is_tour_open']),
      ...mapState('courses', ['loading_my_courses', 'navbar_max_courses']),
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
        this.$store.commit("setMobileMenuVisible", !this.is_mobile_menu_visible )
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
