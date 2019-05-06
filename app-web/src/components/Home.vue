<template>
  <div class="home-page">
    <section class="my-courses ">
      <div class="container" v-intro="'Veja diretamente na home os cursos que você já começou'" v-intro-step="6">
        <div class="columns is-multiline is-centered is-mobile">
          <div class="column is-6 is-12-mobile">
            <h1 class="title" style="color: #224584; font-weight: 700;">LIFE4YOUNG</h1>
            <h6 style="font-size: 16px; font-weight: 400; line-height: 1.7; color: #8a8a8a;">É um projeto de mapear dores e criar soluções para os problemas mais latentes da juventude. O projeto é uma ferramenta para pastores e líderes de jovens das igrejas locais. <br><br>Usamos de princípios bíblicos para gerar transformação e de valores de empreendedorismo para levantar futuros jovens empreendedores nas igrejas.</h6>
            <br>
            <router-link to="/p/escola/plano-mensal/checkout" class="button cta primary-btn rounded is-danger raised ">
              SAIBA MAIS
            </router-link>
          </div>
          <div class="column is-6-desktop is-12-mobile">
            <figure>
              <img src="/static/l4y11.png" alt="">
            </figure>
          </div>
        </div>
      </div>
    </section>
    <section class="l-section wpb_row height_large with_img with_overlay">
      <div class="l-section-img loaded" style="background-image: url(https://i0.wp.com/life4young.com/wp-content/uploads/2019/03/l4ysrt.jpg?fit=1000%2C667&amp;ssl=1);" data-img-width="1000" data-img-height="667"></div>
      <div class="l-section-overlay" style="background-color: rgba(34,69,132,0.82)"></div>
        <div class="l-section-h i-cf">
          <div class="g-cols type_default valign_middle">
            <div class="vc_col-sm-12 wpb_column vc_column_container">
              <div class="vc_column-inner">
                <div class="wpb_wrapper">
                  <div class="g-cols wpb_row type_default valign_bottom vc_inner ">
                    <div class="vc_col-sm-6 wpb_column vc_column_container">
                      <div class="vc_column-inner color_custom" style="color:#ffffff;">
                        <div class="wpb_wrapper">
                          <div class="wpb_text_column ">
                            <div class="wpb_wrapper">
                              <h2 class="textSolucoes"><strong style="color: white;">Soluções estratégicas para o<br>ministério de jovens local</strong></h2>
                              <h6 style="text-align: center; padding-top: 20px;"><span style="color: #d8d8d8;">Sabemos que a juventude é uma fase em que se passa por muitos<br>problemas e que muitos líderes tem dificuldade na hora de tratar todos<br>esses problemas dos jovens. Por esse motivo criamos o projeto: para dar<br>a você, líder e pastor, uma ferramenta para escutar as necessidades dos<br>jovens e co-criar juntamente com eles, <strong style="color: #d8d8d8;">soluções incríveis</strong>.</span></h6>
                              <div class="w-btn-wrapper align_center">
                                <a class="w-btn style_outlined color_primary icon_none" href="https://life4young.com/sobre-nos/" style="font-size:17px;">
                                  <span class="w-btn-label">JUNTE-SE A NÓS</span>
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="section container">
      <div class="columns section is-multiline is-mobile is-vcentered">
        <div class="column is-3-desktop is-12-mobile">
          <h3 style="font-size: 26px; letter-spacing: 0px; color: #224189; line-height: 1.6; margin: 0 0 1.5rem;">Feito em etapas<br>bem simples e com muita dinâmica para gerar interação com<br>os jovens</h3>
        </div>
        <div class="column is-1-desktop is-4-mobile align_center">
          <div class=" align_center" style="background: #f9a02b; width:80px; height: 80px; align-items: center; display: flex; justify-content: center; border-radius: 100%;">
            <font-awesome-icon icon="battery-quarter" style="color: white; font-size: 36px; text-align: center; " class="is-vcentered"></font-awesome-icon>
          </div>
        </div>
        <div class="column is-2-desktop is-8-mobile ">
          <h6 style="font-size: 17px; letter-spacing: 0px; color: #333333; line-height: 1.6; ">1 - Mapear as dores mais fortes</h6>
        </div>
        <div class="column is-1-desktop is-4-mobile align_center">
          <div class=" align_center" style="background: #f9a02b; width:80px; height: 80px; align-items: center; display: flex; justify-content: center; border-radius: 100%;">
            <font-awesome-icon icon="battery-three-quarters" style="color: white; font-size: 36px; text-align: center; " class="is-vcentered"></font-awesome-icon>
          </div>
        </div>
        <div class="column is-2-desktop is-8-mobile ">
          <h6 style="font-size: 17px; letter-spacing: 0px; color: #333333; line-height: 1.6;">2 - Contextualizar e Co-criar soluções</h6>
        </div>
        <div class="column is-1-desktop is-4-mobile align_center">
          <div class=" align_center" style="background: #f9a02b; width:80px; height: 80px; align-items: center; display: flex; justify-content: center; border-radius: 100%;">
            <font-awesome-icon icon="battery-full" style="color: white; font-size: 36px; text-align: center; " class="is-vcentered"></font-awesome-icon>
          </div>
        </div>
        <div class="column is-2-desktop is-8-mobile ">
          <h6 style="font-size: 17px; letter-spacing: 0px; color: #333333; line-height: 1.6;">3 - Aplicar e apresentar as soluções criadas</h6>
        </div>
      </div>
    </section>



  </div>
</template>

<script>
import {mapState, mapGetters} from 'vuex'
import store from '@/store'
import HeroSection from './HeroSection.vue'
import CourseOffer from './Home/CourseOffer.vue'
import WelcomeModal from './Home/WelcomeModal.vue'
import EmailWarningModal from './Home/EmailWarningModal.vue'
import MobileDetect from 'mobile-detect'
import InitialBilletNotification from './Home/InitialBilletNotification.vue'
import Vue from 'vue'
import CourseCard from './Courses/CourseCard.vue'
import api from '../api'
import cookie from '../helpers/cookie'

export default {
  components: {
    WelcomeModal,
    EmailWarningModal,
    InitialBilletNotification,
    CourseOffer,
    CourseCard
  },

  beforeRouteEnter (to, from, next) {
    store.dispatch('layout/fetchContent', api.layout.contents.types.chainOfKnowledge);

    let coursesRequests = [
      store.dispatch('courses/fetchAllPublic', {
        params: {
          include: ['metadata_images', 'publisher', 'exclusive_product_course', 'exclusive_product_course.product', 'lesson_duration_sum'],
          include_count: ['lessons', 'watched_lessons']
        }
      })
    ]
    Promise.all(coursesRequests).then(
      () => next(vm => vm.startComponent())
    );
  },
  beforeRouteLeave (from, to, next) {
    this.$intro().exit()
    next()
  },

  data () {
    return {
      appBrand: process.env.APP_BRAND,
      welcomeModalActive: false,
      emailWarningModalActive: false
    }
  },

  computed: {
    // ...mapState('courses', ['my_courses', 'loading_my_courses']),
    ...mapState('onesignal', ['notification_permission', 'notification_supported', 'is_tour_open']),
    ...mapGetters({'is_menu_open': 'isMenuOpen' }),
    ...mapState('courses', ['loading_public_courses']),
    ...mapGetters('metadata', {metadata: 'getMetadata'}),
    ...mapGetters('courses', ['my_4_started_courses', 'public_courses']),
    ...mapState('layout', ['content']),
    ...mapState('gamefication', ['progress']),
    invitationId() {
      let cookieName = cookie.INVITE_COOKIE();
      if (cookie.check(cookieName)) {
        let invitationCookieVal = cookie.get(cookieName);
        return invitationCookieVal;
      } else {
        return null;
      }
    }
  },

  methods: {
    startComponent () {
      if (process.env.APP_BRAND !== 'socialguider') {
        let readyCallback = () => {
          if (this.$auth.check()) {
            store.dispatch('courses/fetchMyCourses')
            let user = this.$auth.user()
            let platformTour = this.metadata(user, 'platform_tour')
            if (platformTour == null) {
              let w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
              let h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)

              let md = new MobileDetect(window.navigator.userAgent)
              if (!md.mobile()) {
                this.$store.commit('setIsTourOpen', true)
                this.welcomeModalActive = true
              }
            }
          }
        }

        if (this.$auth.ready()) { readyCallback() } else { this.$auth.ready(readyCallback) }
      }
    },
    onCloseWelcomeModal () {
      this.welcomeModalActive = false
      let intro = this.$intro()
      intro.setOptions({
        'nextLabel': 'Entendi',
        'prevLabel': 'Anterior',
        'skipLabel': 'Sair do tour',
        'doneLabel': 'Pronto!',
        'exitOnEsc': false,
        'exitOnOverlayClick': false,
        'overlayOpacity': 0
      })
      intro.start()
      intro.onexit((e) => {
        this.emailWarningModalActive = true
      })
      intro.onchange((element) => {
        if (element.classList && element.classList.contains('should-open-menu-on-mobile')) {
          this.$store.commit('setMenuVisible', true)
        }
        if (element.classList && element.classList.contains('should-scroll-to-zero')) {
          this.$scrollTo(document.body, 1000)
        }
      })
    },
    onCloseEmailWarningModal () {
      this.$store.commit('setIsTourOpen', false)
      this.emailWarningModalActive = false
      this.$store.dispatch('togglePlatformTour').then(() =>
        this.$auth.fetch({
          success: () => { console.log('The user is updated.') },
          error: () => {}
        })
      )
    },

    onClickResendEmailButton () {
      this.$swal({
        type: 'info',
        title: this.$t('resend-email-alert.confirm.title'),
        html: this.$t('resend-email-alert.confirm.message'),
        preConfirm: () => this.$store.dispatch('resendWelcomeEmail'),
        showLoaderOnConfirm: true,
        allowOutsideClick: false,
        showCancelButton: true,
        confirmButtonText: this.$t('resend-email-alert.confirm.btn-confirm'),
        cancelButtonText: this.$t('resend-email-alert.confirm.btn-cancel')
      }).then((res) => {
        if (res.dismiss && res.dismiss === 'cancel') {
          return
        }

        this.$swal({
          type: 'success',
          title: this.$t('resend-email-alert.result.title'),
          html: this.$t('resend-email-alert.result.message')
        })
      }, (err) => {
        this.$swal({
          type: 'error',
          title: this.$t('resend-email-alert.error.title'),
          html: this.$t('resend-email-alert.error.message', {error_msg: err})
        })
      })
    }
  }
}
</script>

<style lang="scss">
  .home-page {

.w-btn-wrapper {
    margin: .3rem 0;
    margin-top: 30px;
}
.align_center {
    text-align: center;
}

    .textSolucoes{
      font-size: 34px;
      letter-spacing: 0px;
      text-align: center;
      color: white !important;
      line-height: 1.4;
    }

    .l-canvas.sidebar_none .l-section{
      padding-left: 2.5rem;
      padding-right: 2.5rem;
    }
    .wpb_row {
      position: relative;
    }
    .l-section {
      position: relative;
      margin: 0 auto;
    }
    .l-section:before {
    content: '';
    display: table;
}
.l-section-img.loaded {
    opacity: 1;
}
.l-section-img {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-position: center center;
    background-size: cover;
    opacity: 0;
    transition: opacity 0.5s;
}
.l-section-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(34,69,132,0.82);
}
.l-section.height_large .l-section-h {
    padding: 6rem 0;
}
.l-main .l-section-h {
    z-index: 1;
}
.header_hor .l-subheader-h, .l-titlebar-h, .l-main-h, .l-section-h, .w-tabs-section-content-h, .w-blog-post-body {
    max-width: 1140px;
}
.l-section-h {
    position: relative;
    margin: 0 auto;
    width: 100%;
}
.g-cols.valign_middle, .g-cols.valign_bottom {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
}
.g-cols.type_default {
    margin: 0 -1.5rem;
}
.g-cols.valign_middle>div, .g-cols.valign_bottom>div {
    display: flex;
    justify-content: center;
    flex-direction: column;
}
.g-cols.valign_middle>div>.vc_column-inner {
    justify-content: center;
}
.g-cols.valign_middle>div>.vc_column-inner, .g-cols.valign_bottom>div>.vc_column-inner {
    display: flex;
    justify-content: center;
    flex-direction: column;
    flex-grow: 1;
    flex-shrink: 0;
}
.g-cols.type_default>div>.vc_column-inner {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
}
.g-cols.valign_middle, .g-cols.valign_bottom {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
}
.g-cols.type_default {
    margin: 0 -1.5rem;
}

.g-cols.valign_bottom>div {
    display: flex;
    flex-direction: column;
}
.upb_video_class, .wpb_column, .wpb_row {
    position: relative;
}
.g-cols.valign_bottom>div>.vc_column-inner {
    justify-content: flex-end;
}
.w-btn.color_primary.style_outlined {
    color: #f9a02c !important;
        margin-top: 30px;
}
.w-btn.style_outlined {
    background-color: transparent!important;

}
.w-btn-label {

    position: relative;
    font-size: 17px;
    line-height: 3.2;
    font-weight: 700!important;
    text-align: center;
    white-space: nowrap;
}
a.w-btn.style_outlined.color_primary.icon_none {
    margin-top: 30px;
    border: 2px solid #f9a02c;
    padding: 15px;
    border-radius: 100px;
}




 //
    .buttonSaibaMais{
      display: inline-block;
      vertical-align: top;
      margin-right: 1rem;
      font-size: 17px;
      border-radius: 100px;
      font-weight: bold;


      transition: background-color 0.3s,box-shadow 0.3s,opacity 0.3s,color 0.3s;
    }

    @media screen and (max-width: 991px) {
      margin-left: 10px;
      margin-right: 10px;
    }
  }

.my-courses {
  padding: 25px 0;
  margin-bottom: 50px;
}
  .public-courses {
    padding: 25px 0;
  }
</style>
