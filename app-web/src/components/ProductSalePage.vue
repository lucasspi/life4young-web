<template>
  <div class="product-sale-page">
    <hero-section set-classes="is-dark is-bold" z-index="10" :no-footer="true" :not-waves="true" :background-image="null">
      <template slot="head">
        <nav class="level">
          <!-- Left side -->
          <div class="level-left">
            <div class="level-item">
              <nav class="breadcrumb is-centered" aria-label="breadcrumbs">
                <ul>
                  <router-link :to="`/`" tag="li"><a href="">Home</a></router-link>
                  <router-link :to="`/p/${product.publisher_founder.slug}/${product.slug}`" tag="li"><a href="">{{product.name}}</a></router-link>
                </ul>
              </nav>
            </div>
          </div>
        </nav>
      </template>

      <div class="container">
        <div class="columns">
          <div class="column is-8">
            <h1 class="title">
              {{ product.name }}
            </h1>
            <h2 class="subtitle">
              {{ product.publisher_founder.name }}
              <small v-if="noCounterSlugs.indexOf(product.slug) === -1" class="has-text-grey-light">
                ({{ users_count }} alunos)
              </small>
            </h2>

          </div>
          <div class="column is-4 wrap-product-navigation">
            <div class="box product-navigation">
              <figure class="media-left cover" v-if="product.courses.length === 1 || img(product, 'avatar')">
                <p class="image is-3by2">
                  <img src="/static/bg_course.png" :alt="product.name">
                </p>
                <img v-if="product.courses.length === 1 && product.courses[0].pivot.is_exclusive && img(product.courses[0], 'avatar')" :src="img(product.courses[0], 'avatar').image_url" :alt="product.courses[0].name" class="logo">
                <img v-else-if="img(product, 'avatar')" :src="img(product, 'avatar').image_url" :alt="product.name" class="logo">
              </figure>

              <nav class="level is-mobile">
                <div v-if="product.courses.length > 1" class="level-item has-text-centered has-text-primary" style="width: 33%;">
                  <div>
                    <p class="title has-text-grey-dark">{{product.courses.length}}</p>
                    <p class="heading">Cursos</p>
                  </div>
                </div>
                <div class="level-item has-text-centered has-text-primary" style="width: 33%;">
                  <div>
                    <p class="title has-text-grey-dark">{{product_lessons_count}}</p>
                    <p class="heading">Aulas</p>
                  </div>
                </div>
                <div v-if="product_lessons_duration_sum > 0" class="level-item has-text-centered has-text-primary" style="width: 33%;">
                  <div>
                    <p class="title has-text-grey-dark">{{product_lessons_duration_sum}}h</p>
                    <p class="heading">de conteúdo</p>
                  </div>
                </div>
              </nav>
              <div class="product-price-cta">
                <div class="product-price">
                  <div v-if="product.price === 0">
                    <div class="price">
                      <p class="value">Gratuito</p>
                    </div>
                    <p class="has-text-centered">
                      <small></small>
                    </p>
                  </div>
                  <div v-if="product.price > 0">
                    <div v-if="user_has_courses">
                      <p class="guarantee has-text-centered">
                        <small>Este curso já está disponível em sua conta.</small>
                      </p>
                    </div>
                    <div v-else>
                      <div class="price">
                        <p v-if="trial_days > 0" class="value">
                          R$ 0,00
                        </p>
                        <p v-else class="value" :style="coupon ? 'text-decoration: line-through;' : ''" :class="{'is-size-6 has-text-grey-light': coupon}">
                          <span v-if="product_price_from > 0" class="is-size-6 has-text-grey-light" style="text-decoration: line-through;">
                            R$ {{ format_price(product.price_from) }}
                          </span>
                          R$ {{ format_price(product_price) }}
                          <small class="recurring" v-if="product.is_recurring">/ {{ human_period }}</small>
                        </p>
                      </div>

                      <div v-if="coupon && !trial_days" class="coupon">
                        <p class="is-size-7 has-text-centered">
                          <strong>CUPOM DE DESCONTO
                            ({{coupon.percent_off ? '' : 'R$ '}}{{coupon.percent_off ? coupon.percent_off : coupon.amount_off}}{{coupon.percent_off ? '%' : ''}} OFF)
                          </strong>
                        </p>
                      </div>
                      <p v-if="product && trial_days > 0" class="guarantee has-text-centered">
                        <small>
                          <span class="is-size-3">Grátis por {{trial_days}} dia{{trial_days > 1 ? 's' : ''}}.</span> <br />
                          Após esse período:
                          <span v-if="product_price_from" class="has-text-grey-light" style="text-decoration: line-through;">
                            R$ {{ format_price(product_price_from) }}
                          </span>
                          R$ {{ format_price(product_price) }}
                          <small class="recurring" v-if="product.is_recurring">/ {{ human_period }}</small>
                          <span v-if="coupon">
                            <p class="is-size-7 has-text-centered">
                              <strong>
                                CUPOM DE DESCONTO
                                ({{coupon.percent_off ? '' : 'R$ '}}{{coupon.percent_off ? coupon.percent_off : coupon.amount_off}}{{coupon.percent_off ? '%' : ''}} OFF)
                              </strong>
                            </p>
                          </span>
                        </small>
                      </p>
                      <p v-else class="guarantee has-text-centered">
                        <small>Garantia de devolução do dinheiro em 07 dias</small>
                      </p>
                      <p class="guarantee has-text-centered">
                        <small>Certificado digital incluso</small>
                      </p>
                    </div>
                  </div>
                </div>
                <hr>
                <div class="product-cta">
                  <div v-if="user_has_courses">
                    <router-link :to="`/courses/${product.courses[0].slug}`" class="button is-fullwidth is-large is-primary has-icons-left">
                      <span class="icon">
                        <vue-material-icon name="timeline"></vue-material-icon>
                      </span>
                      <span>
                        Continuar curso
                      </span>
                    </router-link>
                    <hr v-if="!product.is_recurring && product.courses[0].pivot.is_exclusive">
                    <p v-if="!product.is_recurring && product.courses[0].pivot.is_exclusive">
                      <span v-if="product.price_from" class="has-text-grey-light" style="text-decoration: line-through;">
                            R$ {{ format_price(product.price_from) }}
                          </span>
                      R$ {{ format_price(product.price) }} -
                      <router-link :to="`/p/${product.publisher_founder.slug}/${product.slug}/checkout`">Comprar acesso vitalício</router-link>
                    </p>
                  </div>
                  <div v-else>
                    <div v-if="product_soldout && product_soldout === 'yes'" class="has-text-centered">
                      <strong class="subtitle has-text-danger has-text-centered">ESGOTADO</strong>
                    </div>
                    <span v-else>
                      <router-link v-if="product.price > 0" :to="`/p/${product.publisher_founder.slug}/${product.slug}/checkout` + (coupon ? `?c=${coupon.code}` : '')" class="button is-fullwidth is-large is-primary">
                        <span class="icon">
                          <vue-material-icon name="shopping_cart"></vue-material-icon>
                        </span>
                        <span v-if="product.is_recurring">
                          Assinar agora
                        </span>
                        <span v-else>
                          Comprar agora
                        </span>
                      </router-link>
                      <div v-else>
                        <router-link v-if="product.courses.length === 1" :to="$auth.check()  ? `/courses/${product.courses[0].slug}` : `/signup?url=/courses/${product.courses[0].slug}`" class="button is-fullwidth is-large is-primary">
                          <span class="icon">
                            <vue-material-icon name="timeline"></vue-material-icon>
                          </span>
                          <span>Inscrever-se</span>
                        </router-link>
                      </div>
                    </span>
                  </div>
                </div>
              </div>
              <div class="media security">
                <div class="media-content has-text-centered">
                  <img src="/static/ssl03.png" alt="Compra segura" title="Compra segura">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </hero-section>
    <div class="container">
    <div class="columns container">
      <div class="column is-8" style="margin: 30px 0;">
        <p>&nbsp;</p>
        <div v-if="coupon" class="box is-success has-text-centered notification is-right-paddingless is-left-paddingless is-top-paddingless">
          <p class="is-size-7 is-uppercase has-text-centered">
            <strong>Seu cupom de desconto expira em:</strong>
          </p>
          <div style="padding: 0 1.2em; margin: 1em 0 0.5em 0;">
            <countdown :until="coupon.expires_at"></countdown>
          </div>
        </div>
        <div class="course-selling-info" v-if="product.courses.length === 1">
          <p class="title">Descrição do curso</p>
          <div class="content" v-html="product.courses[0].description">
          </div>
          <p class="title">Conteúdo do curso</p>
          <div class="content">
            <ol style="margin-left: 0px !important;">
              <li v-for="serie in product.courses[0].series" :key="serie.id" class="li-section-lesson">
                <p class="internal-section-name">{{serie.name}}</p>
                <ul style="margin-left: 0px !important; margin-top: 0px !important;">
                  <li v-for="lesson in serie.lessons" :key="lesson.id" class="internal-list-lessons">
                    <span style="font-size: 13px; color: #bababa; padding-right: 10px;" >03:03</span>
                    {{lesson.name}}

                  </li>
                </ul>

              </li>
            </ol>
          </div>
        </div>
        <div class="courses-list" v-if="product.courses.length > 1">
          <div v-if="countdownSlugs.hasOwnProperty(product.slug)">
            <p><strong>Esta promoção expira em:</strong></p>
            <p>&nbsp;</p>
            <countdown  :until="chronometer_day(countdownSlugs[product.slug])"></countdown>
            <p>&nbsp;</p>
          </div>

          <div class="product-description content" v-html="product.description"></div>
          <h1 class="title">Cursos inclusos</h1>

          <course-showcase  v-for="course in product.courses" :key="course.id" :publisher-slug="publisher_slug" :product-slug="product_slug" :course="course"></course-showcase>

        </div>
        </div>
      </div>
      <div class="column is-4"></div>
    </div>
  </div>
</template>

<script>
import {mapState, mapGetters} from 'vuex'
import store from '@/store'
import Player from '@vimeo/player'
import HeroSection from './HeroSection.vue'
import CourseShowcase from './ProductSalePage/CourseShowcase.vue'
import Countdown from './ProductCheckoutPage/Countdown.vue'
import moment from 'moment'
import {getRandomInt, getCouponCode} from '../helpers'

let scrollThresholdOffset;



export default {

  name: 'ProductSalePage',

  components: {
    HeroSection,
    CourseShowcase,
    Countdown
  },

  beforeRouteEnter (to, from, next) {
    /// p/:publisherSlug/:productSlug
    // store.commit("setMenuOpen", false);
    let request = store.dispatch('products/fetchProduct', {publisher: to.params.publisherSlug, product: to.params.productSlug});

    const couponCode = getCouponCode(to);
    if (couponCode) {
      request = request.then(
        () => store.dispatch('products/simulateCoupon', couponCode)
      );
    }

    request.then(
        () => next(
          vm => vm.setData(to.params.publisherSlug, to.params.productSlug)
        )
      )
  },

  beforeRouteUpdate (to, from, next) {
    let request = store.dispatch('products/fetchProduct', {publisher: to.params.publisherSlug, product: to.params.productSlug});

    const couponCode = getCouponCode(to);
    if (couponCode) {
      request = request.then(
        () => store.dispatch('products/simulateCoupon', couponCode)
      );
    }

    request.then(
        () => next(
          vm => vm.setData(to.params.publisherSlug, to.params.productSlug)
        )
      )
  },

  beforeRouteLeave (from, to, next) {
    // store.commit("setMenuOpen", null);
    store.dispatch('leads/stopNotifyNextInstantPurchase')
    next()
  },

  data () {
    return {
      publisher_slug: '',
      product_slug: '',
      countdownSlugs: {
        'pacote-arquiteto-autocad-sketchup-e-revit': 5,
        'pacote-trilhas-completas-autocad-sketchup-3ds-max-e-revit': 5,
        'plano-mensal-convidados': '2019-03-17 23:59:59',
        'cyber-monday-de-verdade': '2018-11-27 09:30:00'
      },
      noCounterSlugs: [
        'black-friday-de-verdade-pacote-especial'
      ]
    }
  },

  computed: {
    ...mapState(['users_count']),
    ...mapState('products', ['product', 'loading_product', 'coupon']),
    ...mapGetters('products', ['product_lessons_count', 'product_lessons_duration_sum', 'human_period', 'product_price_from', 'product_price', 'trial_days']),
    ...mapGetters('metadata', {img: 'getMetadataImage', metadata: 'getMetadata'}),
    ...mapGetters('order', ['format_price']),
    ...mapGetters('subscriptions', ['subscription_courses']),
    ...mapGetters(['isMobile']),
    user_has_courses () {
      return this.product && this.product.courses &&
          this.product.courses.length === 1 &&
          this.subscription_courses.filter(courseId => courseId === this.product.courses[0].id).length > 0
    },
    product_soldout () {
      let metadata = this.metadata(this.product, 'soldout')
      return metadata && metadata.value
    },
    chronometer_day () {
      return (dayINeed) => {
        if (typeof dayINeed === 'string') return dayINeed
        // const dayINeed = 5; // friday :)
        const today = moment().isoWeekday()
        let chronometerEnd = moment()
        if (today <= dayINeed) {
          chronometerEnd = chronometerEnd.isoWeekday(dayINeed)
        } else {
          chronometerEnd = chronometerEnd.add(1, 'weeks').isoWeekday(dayINeed)
        }
        return chronometerEnd.hour(23).minute(59).second(59).format('YYYY-MM-DD HH:mm:ss')
      }
    },

  },

  methods: {
    setData (publisher, product) {
      this.publisher_slug = publisher
      this.product_slug = product
      this.$scrollTo(document.body)
      window.setTimeout(
        () => this.$store.dispatch('leads/startNotifyNextInstantPurchase', this.product.id),
        getRandomInt(1, 10) * 1000
      )
    },
    scrollToggleMobileCalltoaction () {
      if (!this.isMobile) {
        return
      }
      const elementClass = 'product-price-cta'
      const stickyClass = 'sticky'
      const els = document.getElementsByClassName(elementClass)
      if (els.length > 0) {
        const el = els[0]
        const offsetTop = el.getBoundingClientRect().top
        console.log(`[offsetTop] ${offsetTop}`)
        const offsetScroll = window.scrollY
        console.log(`[offsetScroll] ${offsetScroll}`)
        if (!el.classList.contains(stickyClass) && offsetTop <= 0) {
          el.classList.add(stickyClass)
          scrollThresholdOffset = offsetScroll
          console.log(`[scrollToggleMobileCalltoaction] added sticky class | scrollThresholdOffset (${scrollThresholdOffset}) | offsetScroll (${offsetScroll})`)
        } else if (el.classList.contains(stickyClass) && offsetScroll <= scrollThresholdOffset) {
          el.classList.remove(stickyClass)
          console.log(`[scrollToggleMobileCalltoaction] removed sticky class | scrollThresholdOffset (${scrollThresholdOffset}) | offsetScroll (${offsetScroll})`)
        }
      }
    }
  },

  created () {
    window.addEventListener('scroll', this.scrollToggleMobileCalltoaction)
  },
  destroyed () {
    window.removeEventListener('scroll', this.scrollToggleMobileCalltoaction)
  }
}
</script>

<style lang="scss">
  @import "../assets/mixins.scss";
  .li-section-lesson{
    border-radius: 5px;
    border: transparent;
    list-style-type: none;
    background-color: #f9f9f9;
    margin-top: 15px !important;
    box-shadow: 0 0 8px 0 rgba(17,22,26,.16), 0 4px 8px 0 rgba(17,22,26,.08), 0 8px 16px 0 rgba(17,22,26,.08);
  }
  .internal-section-name{
    font-weight: 600;
    font-size: 22px;
    background-color: #f0f0f0;
    padding: 10px;
    margin-bottom: 0px !important;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }
  .internal-list-lessons:hover{
    background-color: #f0f0f0;
    cursor: pointer;
  }
  .internal-list-lessons{
    list-style-type: none;
    cursor: pointer;
    padding: 10px;
    border-top: 1px solid #dadada;
    line-height: 2.2;
    transition: 0.5s;
    margin-top:0px !important;
  }

  .product-sale-page {
    @media screen and (max-width: 991px) {
      .container {
        margin-left: 10px;
        margin-right: 10px;
      }
    }
    .media.security {
      margin-top: 1.5rem;
      border-top: 2px solid whitesmoke;
      padding-top: 1rem;
      img { max-width: 125px; height: auto;}
    }
  }
  .box.course-navigation {
    .subtitle {
      color: $preto;
      font-size: 18px;
    }
  }
  .wrap-product-navigation {
    position: relative;
  }
  .product-navigation {
    position: absolute;
    width: 100%;
    @media screen and (max-width: 991px) {
      position: initial;
    }
    .media-left {
      &.cover {
        width: 100%;
        margin-right: 0;
        position: relative;
        @media screen and (max-width: 600px) {
          width: 100%;
        }
        .image {
          margin-bottom: 0;
          img {

          }
        }
        .logo {
          position: absolute;
          top: 0;
          bottom: 0;
          right: 0;
          left: 0;
          width: 25%;
          margin: auto;
          box-shadow: 3px 3px 5px -1px rgba(158,158,158,1);
        }
      }
    }
    .level {
      margin: 15px 0;
      .title {
        font-size: 22px;
      }
    }
    .price {
      text-align: center;
      .value {
        font-size: 28px;
        &.from-value {
          font-size: 18px;
        }
        span {
          margin-right: 10px;
        }
        small {
          color: #CCC;
        }
        color: #1a1a1a;
        .recurring {
          color: #1f1f1f;
        }
      }
    }
  }
  .product-price-cta {
    &.sticky {
      box-shadow: 0px -1px 10px -1px rgba(0,0,0,0.75);
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      height: 100px;
      background-color: #fff;
      .product-price {
        padding: 5px 15px;
        .price {
          text-align: left;
          .value {
            font-size: 1rem;
            .is-size-6 {
              font-size: 0.9rem !important;
            }
          }
        }
        p.guarantee { display: none; }
      }
      hr {
        display: none;
      }
      .product-cta {
        padding: 5px 15px;
        .button {
          justify-content: left;
          font-size: 1.2rem;
        }
      }
    }
  }
</style>
