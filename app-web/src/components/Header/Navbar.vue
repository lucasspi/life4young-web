<template>
  <!--<div>-->
    <!--<div class="level is-mobile">-->
      <!--<div class="toggleResponsive level-left">-->
        <!--<MenuToggle></MenuToggle>-->
      <!--</div>-->

      <!--<div class="level-left">-->
        <!--<logo></logo>-->
      <!--</div>-->

      <!--<div class="level-right">-->
        <!--<LoggedIn></LoggedIn>-->
      <!--</div>-->
    <!--</div>-->
  <!--</div>-->
  <nav class="navbar is-fresh is-transparent no-shadow mainMenuStyles" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <logo></logo>
          <section class="toogleMenuMobile" style="display: contents;">
            <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" @click="onClickToggleNavigation()">
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </section>
      </div>

      <div id="navbar-menu" class="navbar-menu is-static">
        <div class="navbar-end">
          <router-link v-intro="'Para voltar à página inicial, <strong>é só clicar aqui</strong>.'" v-intro-step="2" class="navbar-item is-secondary colorButtonMenu" to="/">
            HOME
          </router-link>
          <router-link  v-intro="'Para acompanhar mais sobre a plataforma <strong>é só clicar aqui</strong>.'" v-intro-step="3" class="navbar-item is-secondary" to="/about-us" >
            SOBRE O L4Y
          </router-link>
          <!--<div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link">
              Dropdown
            </a>

            <div class="navbar-dropdown">
              <a class="navbar-item">
                Dropdown item
              </a>
            </div>
          </div>-->
          <router-link v-if="!$auth.check()"  to="/login" class="navbar-item is-secondary">
            LOGIN
          </router-link>

          <router-link :to="$auth.check() ? ($auth.check(`chain-of-knowledge`) ? '/invites' : '/eventmanager') : '/signup'" v-intro="'Aqui você pode conferir sua dashboard de aprendizado, acompanhar seu progresso em nossos cursos e acessar novos cursos.'" v-intro-step="4" class="navbar-item">
            <span  class="button signup-button rounded secondary-btn raised">
              ORGANIZAR UM EVENTO
            </span>
            </router-link>


        <navbar-user v-if="$auth.check()"></navbar-user>
        </div>


      </div>

  </nav>


</template>

<script>
  import Logo from '../Logo.vue'
  import MenuToggle from '../MenuToggle.vue'
  import LoggedIn from '../LoggedIn.vue'
  import {mapState, mapGetters} from 'vuex'
  import NavbarUser from './NavbarUser.vue'

  export default {

    name: 'navbar',

    components: {
      Logo,
      MenuToggle,
      LoggedIn,
      NavbarUser
    },

    computed: {
      ...mapGetters({'is_menu_open': 'isMenuOpen'}),
      ...mapState(['is_mobile_menu_visible', 'is_tour_open'])
    },

    data() {
      return {
        // toggleMenu: true
      }
    },

    methods: {
      onClickToggleNavigation() {
        this.$store.commit("setMobileMenuVisible", !this.is_mobile_menu_visible)
      }
    }
  }
</script>

<style lang="scss">
.mainMenuStyles{

.colorButtonMenu{
  color: #234189;
}

@media only screen  and (min-width : 1224px) {
  .toogleMenuMobile{
    display: none;

  }
}
}

/*
<a v-if="$auth.check()" href="javascript:void(0);" v-intro="'Para sair de sua conta, é só clicar aqui.'" v-intro-step="5" @click.prevent="$auth.logout({redirect: '/', makeRequest: false})" class="navbar-item is-secondary has-icon">
            <span class="icon">
              <font-awesome-icon icon="sign-out-alt"></font-awesome-icon>
            </span>
            <span>Logout</span>
          </a>*/
</style>


