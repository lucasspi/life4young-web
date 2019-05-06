<template>
  <nav id="navbar-clone" class="navbar is-fresh is-transparent" role="navigation" aria-label="main navigation">
    <div class="container">
      <div class="navbar-brand">
        <logo></logo>

        <a class="navbar-item is-hidden-desktop is-hidden-tablet" @click="onClickToggleNavigation()">
          <div id="menu-icon-wrapper" class="menu-icon-wrapper" style="visibility: visible;" :class="{'open': is_menu_visible}">
            <svg width="1000px" height="1000px">
              <path class="path1" d="M 300 400 L 700 400 C 900 400 900 750 600 850 A 400 400 0 0 1 200 200 L 800 800"></path>
              <path class="path2" d="M 300 500 L 700 500"></path>
              <path class="path3" d="M 700 600 L 300 600 C 100 600 100 200 400 150 A 400 380 0 1 1 200 800 L 800 200"></path>
            </svg>
            <button id="menu-icon-trigger" class="menu-icon-trigger"></button>
          </div>
        </a>

        <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="cloned-navbar-menu"  @click="onClickToggleNavigation()">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="cloned-navbar-menu" class="navbar-menu is-fixed">

        <div class="navbar-start">
          <a class="navbar-item is-hidden-mobile"  @click="onClickToggleNavigation()">
            <div id="cloned-menu-icon-wrapper" class="menu-icon-wrapper" :class="{'open': is_menu_visible}" style="visibility: visible;">
              <svg width="1000px" height="1000px">
                <path class="path1" d="M 300 400 L 700 400 C 900 400 900 750 600 850 A 400 400 0 0 1 200 200 L 800 800"></path>
                <path class="path2" d="M 300 500 L 700 500"></path>
                <path class="path3" d="M 700 600 L 300 600 C 100 600 100 200 400 150 A 400 380 0 1 1 200 800 L 800 200"></path>
              </svg>
              <button id="cloned-menu-icon-trigger" class="menu-icon-trigger"></button>
            </div>
          </a>
        </div>

        <div class="navbar-end">
          <router-link class="navbar-item is-secondary" to="/">
            Home
          </router-link>
          <router-link class="navbar-item is-secondary" v-if="$auth.check('view-courses')" to="/courses">
            Treinamentos
          </router-link>
          <router-link to="/contact" class="navbar-item is-secondary">
            Fale Conosco
          </router-link>
          <router-link to="/login" v-if="!$auth.check()" class="navbar-item is-secondary">
            Fazer login
          </router-link>
          <router-link :to="$auth.check() ? '/profile' : '/signup'" class="navbar-item">
            <span v-if="!$auth.check()" class="button signup-button rounded secondary-btn raised">
              Cadastre-se
            </span>
            <span v-else  class="button signup-button rounded secondary-btn raised">
              <vue-material-icon name="account_circle"></vue-material-icon> Meu perfil
            </span>
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
  import Logo from '../Logo.vue'
  import MenuToggle from '../MenuToggle.vue'
  import LoggedIn from '../LoggedIn.vue'
  import {mapState, mapGetters} from 'vuex'

  export default {

    name: 'navbar-fixed',

    components: {
      Logo,
      MenuToggle,
      LoggedIn
    },

    computed: {
      ...mapGetters({'is_menu_open': 'isMenuOpen'}),
      ...mapState(['is_menu_visible', 'is_tour_open'])
    },

    data() {
      return {
        // toggleMenu: true
      }
    },

    methods: {
      onScroll() {
        if ($('#navbar-clone').length) {
          $(window).scroll(function() {    // this will work when your window scrolled.
            var height = $(window).scrollTop();  //getting the scrolling height of window
            if(height  > 50) {
              $("#navbar-clone").addClass('is-active');
            } else{
              $("#navbar-clone").removeClass('is-active');
            }
          });
        }
      }
    }
  }
</script>

<style lang="scss">
</style>
