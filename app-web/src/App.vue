<template>
	<div id="app" :class="appBrand">
    <vue-progress-bar></vue-progress-bar>
    <section class="hero is-default is-bold">
      <navbar></navbar>
      <navbar-mobile></navbar-mobile>

      <router-view name="herobody" class="hero-body"></router-view>
      <router-view name="herofoot" class="hero-foot"></router-view>
    </section>

    <router-view />
    <footer-render></footer-render>


    <lead-modal :active="is_lead_modal_open" :mode="modal_mode" @close="$store.commit('setIsLeadModalOpen', {isLeadModalOpen: false, isMobile: is_mobile})"></lead-modal>
	</div>
</template>

<script>
import Mind from './components/Mind.vue'
import Navigation from './components/Navigation.vue'
import Foot from './components/Foot.vue'
import {mapGetters, mapState} from 'vuex'
import Navbar from './components/Header/Navbar.vue'
import NavbarMobile from './components/Header/NavbarMobile.vue'
import FooterDark from './components/Footer/FooterDark.vue'
import SidebarDark from './components/Sidebar/SidebarDark'
import LeadModal from './components/Home/LeadModal.vue'
import cookie from './helpers/cookie'
import createNotification from './helpers/notification'
import FooterRender from './components/Footer/FooterRender'

export default {
  name: 'App',

  components: {
    SidebarDark,
    Mind,
    Navigation,
    Foot,
    Navbar,
    NavbarMobile,
    FooterDark,
    SidebarDark,
    LeadModal,
    FooterRender
  },

  data () {
    return {
      externalRoutes: ['login'],
      appBrand: process.env.APP_BRAND,
      is_banner_pinned: true,
      lastKnownScrollY: 0,
      currentScrollY: 0,
      modal_mode: 'exit'
    }
  },

  computed: {
    ...mapGetters({'is_menu_open': 'isMenuOpen', 'is_mobile': 'isMobile' }),
    ...mapState(['is_menu_visible', 'is_tour_open', 'is_lead_modal_open', 'is_lead_cookie']),
    hasHeroContent () {
      return this.$route.matched[0] &&
          this.$route.matched[0].components &&
          (!!this.$route.matched[0].components.herobody || !!this.$route.matched[0].components.herofoot)
    }
  },

  mounted () {
    //  [App.vue specific] When App.vue is finish loading finish the progress bar
    this.$Progress.finish()
    this.$store.dispatch('fetchUsersCount');
    // this.$store.dispatch('notifications/dispatchNextNotification');
    //this.$store.dispatch('leads/fetchInstantPurchases')
    let initialCb = () => {
      if (this.$auth.check()) {
        this.$store.dispatch('subscriptions/fetchAll')
        this.$store.dispatch('orders/markAdsConversionSent')
      }
    };

    if (this.$auth.ready()) { initialCb(); } else { this.$auth.ready(initialCb); }

    this.loadOneSignal()

    this.$store.commit('setIsLeadCookie', cookie.get(cookie.LEAD_COOKIE()))

    window.setTimeout(
      () => {
        console.log('[setTimeout] attaching mouseout event');
        document.addEventListener("mouseleave", () => this.openNewsletterModal(), false)
      },
      2000
    )
  },

  created () {
    //  [App.vue specific] When App.vue is first loaded start the progress bar
    this.$Progress.start()
    //  hook the progress bar to start before we move router-view
    this.$router.beforeEach((to, from, next) => {
      //  does the page we want to go to have a meta.progress object
      if (to.meta.progress !== undefined) {
        let meta = to.meta.progress
        // parse meta tags
        this.$Progress.parseMeta(meta)
      }
      //  start the progress bar
      this.$Progress.start()
      //  continue to next page
      next()
    })
    //  hook the progress bar to finish after we've finished moving router-view
    this.$router.afterEach((to, from) => {
      //  finish the progress bar
      this.$Progress.finish()
    })
  },

  methods: {
    openNewsletterModal(mode = 'exit') {
      console.log('[document.onMouseOut] dispatched');
      let openModalCb = () => {
        if (!this.$auth.check()) {
          this.modal_mode = mode;
          this.$store.commit('setIsLeadModalOpen', {isLeadModalOpen: true, isMobile: this.is_mobile})
        }
      }

      if (this.$auth.ready()) { openModalCb() } else { this.$auth.ready(openModalCb) }
    },
    loadOneSignal () {
      console.log('Will try to register onesignal appid: ', process.env.ONESIGNAL_APP_ID)

      this.$store.dispatch('onesignal/init')
      this.$store.dispatch('onesignal/attachOnSubscriptionChange')
      this.$store.dispatch('onesignal/updateNotificationSupport')
      this.$store.dispatch('onesignal/updateNotificationPermission')

      let updateUserEmail = () => {
        this.$store.dispatch('onesignal/updateUserEmail', this.$auth.user())
        this.$store.dispatch('onesignal/sendTag', {key: 'signed_up', value: 1})
      }

      if (this.$auth.ready()) { updateUserEmail() } else { this.$auth.ready(updateUserEmail) }
    },
  }
}
</script>

<style lang="scss">
  $azul: rgba(0,144,247,0.8);
  $primary: $azul;
  $box-radius: 3px;
  $box-shadow: 0 0 0 rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(0, 0, 0, 0.1);

  @import '~bulma/bulma';
	@import '~bulma-extensions/bulma-tooltip/src/sass/index';
  @import '~bulma-extensions/bulma-steps/src/sass/index';
  @import "~bulma-extensions/bulma-divider/src/sass/index";
  @import '~bulma-extensions/bulma-carousel/src/sass/index';
  @import '~bulma-helpers/bulma-helpers';
  @import '~intro.js/introjs';
  @import '~croppie/croppie';
  @import '~animate.css/animate';
  @import '~croppie/croppie';
  @import './assets/mixins.scss';
  @import './assets/introjs_theme.scss';
	// @import './assets/reset.scss';
  @import './assets/geral.scss';



  .mobile-free-course-banner {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 80px;
    background-color: #AFF27E;
    padding: 15px;
    z-index: 900;
    transition: transform 0.25s ease-in-out;
    &.unpinned {
      transform: translateY(80px);
    }
    &.pinned {
      transform: translateY(0px);
    }
    p {
      color: #000;
      line-height: 17px;
      font-size: 14px;
      margin-bottom: 0;
    }
    img {
      max-height: 50px;
      width: auto;
    }
  }
</style>
