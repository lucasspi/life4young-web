<template>
  <div class="product-sale-page">

    <hero-section set-classes="is-dark is-bold" :no-footer="true" :not-waves="true" :background-image="null">
      <template slot="head">
        <nav class="level">
          <!-- Left side -->
          <div class="level-left">
            <div class="level-item">
              <nav class="breadcrumb is-centered" aria-label="breadcrumbs">
                <ul>
                  <router-link :to="`/rewards`" tag="li"><a href="">Recompensas</a></router-link>
                  <router-link :to="`/rewards/${reward.slug}`" tag="li"><a href="">{{reward.title}}</a></router-link>
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
              {{ reward.title }}
            </h1>
          </div>

          <div class="column is-4 wrap-product-navigation">
            <div class="box product-navigation">
              <figure class="media-left cover" v-if="reward && img(reward, 'avatar')">
                <p class="image is-3by2">
                  <img src="/static/bg_course.png" :alt="reward.title">
                </p>
                <img v-if="reward.length === 1 && reward.pivot.is_exclusive && img(reward, 'avatar')" :src="img(reward, 'avatar').image_url" :alt="reward.title" class="logo">
                <img v-else-if="img(reward, 'avatar')" :src="img(reward, 'avatar').image_url" :alt="reward.title" class="logo">
              </figure>

              <div class="product-price-cta">
                <div class="product-price">
                  <div>
                    <div>
                      <p class="guarantee ">
                        Para acessar o conteúdo, deixe seu e-mail e o nome abaixo:
                      </p>
                    </div>
                  </div>
                </div>
                <hr>
                <div class="product-cta">
                  <form action="" method="post" @submit.prevent="onSubmitForm">
                    <div class="columns is-multiline">
                      <div class="column is-12">
                        <form-control :form="form" name="email" control-class="has-icons-left">
                          <input class="input" type="email" placeholder="Email" name="email" v-model="form.email" autocomplete="email">
                          <div class="icon is-small is-left">
                            <vue-material-icon name="email"></vue-material-icon>
                          </div>
                        </form-control>
                      </div>
                      <div class="column is-12 has-not-signed-up">
                        <form-control :form="form" name="name" control-class="has-icons-left">
                          <input type="text" class="input" placeholder="Nome" name="name" v-model="form.name" autocomplete="name">
                          <div class="icon is-small is-left">
                            <vue-material-icon name="account_circle"></vue-material-icon>
                          </div>
                        </form-control>
                      </div>
                      <div class="column is-12">
                        <div class="control has-text-centered">
                          <button type="submit" class="button is-primary is-fullwidth" :class="{'is-loading': form.sendingData}">Enviar</button>
                        </div>
                      </div>
                    </div>
                  </form>

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
      <div class="columns">
        <div class="column is-8" style="margin: 30px 0;">
          <p>&nbsp;</p>
          <div class="course-selling-info">
            <div class="content" v-html="reward.text"></div>
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
  import HeroSection from './HeroSection.vue'
  import CourseShowcase from './ProductSalePage/CourseShowcase.vue'
  import Countdown from './ProductCheckoutPage/Countdown.vue'
  import Form from '@/helpers/form'
  import FormControl from './Form/FormControl.vue'
  import {Base64} from 'js-base64'

  let scrollThresholdOffset;

  export default {

    name: 'Rewards',

    components: {
      HeroSection,
      CourseShowcase,
      Countdown,
      FormControl
    },

    beforeRouteEnter (to, from, next) {
      store.dispatch('leads/fetchReward', to.params.slug)
        .then(
          () => next(
            vm => {
              vm.setSlug(to.params.slug)
              vm.setReferedUserId(to.query && to.query.hasOwnProperty('u') ? to.query.u : null)
            }
          )
        )
    },

    beforeRouteUpdate (to, from, next) {
      store.dispatch('leads/fetchReward', to.params.slug)
        .then(
          () => next(
            vm => {
              vm.setSlug(to.params.slug)
              vm.setReferedUserId(to.query && to.query.hasOwnProperty('u') ? to.query.u : null)
            }
          )
        )
    },

    beforeRouteLeave (from, to, next) {
      // store.commit("setMenuOpen", null);
      next()
    },

    data () {
      return {
        form: new Form({
          email: '',
          name: '',
          segment_id: '',
          user_id: null
        }),
        is_email_checked: false,
        reward_slug: ''
      }
    },

    computed: {
      ...mapState(['users_count']),
      ...mapState('leads', ['reward', 'loading_reward']),
      ...mapGetters('metadata', {img: 'getMetadataImage'}),
      ...mapGetters(['isMobile']),
    },

    methods: {
      setSlug (reward) {
        this.reward_slug = reward
        this.$scrollTo(document.body)
      },

      setReferedUserId (userId) {
        if (userId) {
          this.form.user_id = Base64.decode(userId);
        }
      },

      onSubmitForm () {
        this.form.segment_id = this.reward.mautic_segment_id;
        this.form.post('leads?mautic=1').then((response) => {
          this.$swal({type: 'success', title: "Pronto! Você receberá em breve o email com seu material."});
        });
      },


      resetForm() {
        this.has_signed_up = false;
        this.form.reset();
      }
    }
  }
</script>

<style lang="scss">
  @import "../assets/mixins.scss";
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
