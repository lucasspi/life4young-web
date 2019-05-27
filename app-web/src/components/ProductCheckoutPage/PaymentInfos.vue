
<template>
  <div class="payment-infos">
    <div class="wrap-box-payment">
      <div  :class="{'modal': is_mobile, 'is-active': show_payment_infos}">
        <div class="modal-background" v-if="is_mobile && show_payment_infos"></div>
        <div class="box payment" :class="{'modal-content': is_mobile}">
          <div class="free-trial content" id="payment-infos" v-if="product">
            <div class="before-payment">
              <p class="is-size-3 has-text-centered">Resumo {{ product.is_recurring ? 'da assinatura' : ''}}</p>
              <nav class="level is-mobile is-size-5">
                <div class="level-left">
                  <div class="level-item">
                    <small>Produto:</small>
                  </div>
                </div>
                <div class="level-right">
                  <div class="level-item" :title="product.name">
                    {{product.name}}
                  </div>
                </div>
              </nav>
              <div v-if="trial_days > 0">
                <nav class="level is-mobile coupon-complement is-size-5">
                  <div class="level-left">
                    <div class="level-item">
                      <small>Período de testes:</small>
                    </div>
                  </div>
                  <div class="level-right">
                    <div class="level-item">
                      {{trial_days}} dias grátis
                    </div>
                  </div>
                </nav>
                <nav class="level is-mobile coupon-complement is-size-5">
                  <div class="level-left">
                    <div class="level-item">
                      <small>Valor até {{ new Date() | moment("add", `${trial_days} days`) | moment('DD/MM/YYYY') }}:</small>
                    </div>
                  </div>
                  <div class="level-right">
                    <div class="level-item has-text-success is-size-4">
                      R$ 0,00
                    </div>
                  </div>
                </nav>
              </div>
              <nav class="level is-mobile is-size-5">
                <div class="level-left">
                  <div class="level-item">
                    <small>Preço:</small>
                  </div>
                </div>
                <div class="level-right">
                  <div class="level-item" :style="is_coupon_simulated ? 'text-decoration: line-through' : ''" :class="{'has-text-grey-light': is_coupon_simulated}">
                    R$ {{ format_price(is_coupon_simulated ? product_price_from : product_price) }}&nbsp;
                    <small v-if="product.is_recurring"> / {{ human_period }}</small>
                  </div>
                </div>
              </nav>
              <div v-if="is_coupon_simulated">
                <nav class="level is-mobile is-size-5">
                  <div class="level-left">
                    <div class="level-item">
                      <small>Cupom (<strong>{{coupon.code}}</strong>):</small>
                    </div>
                  </div>
                  <div class="level-right">
                    <div class="level-item">
                      {{coupon.amount_off ? `R$ ${format_price(coupon.amount_off)}` : `${coupon.percent_off}%`}}&nbsp;<small>de desconto</small><br />
                    </div>
                  </div>
                </nav>
                <nav  class="level is-mobile coupon-complement is-size-6">
                  <div class="level-left">
                    <div class="level-item">
                      <small v-if="coupon.trial_days > 0">Vlr. após período de testes:</small>
                      <small v-if="coupon.trial_days === 0">Valor com desconto:</small>
                    </div>
                  </div>
                  <div class="level-right">
                    <div class="level-item has-text-success">
                      <span class="has-text-success">R$ {{ format_price(coupon.product.price) }}</span>
                      <small>
                        <span class="has-text-success" v-if="coupon.product.is_recurring">/ {{ human_period }}</span>
                        ({{coupon.amount_off ? `R$ ${format_price(coupon.amount_off)}` : `${coupon.percent_off}%`}} OFF)
                      </small>
                    </div>
                  </div>
                </nav>
              </div>

              <div v-if="show_payment_form === false">
                <div class="columns is-centered is-multiline">
                  <div class="column">
                    <form-control :form="form" name="code" field-class="has-text-centered" label="Tem algum cupom de desconto?" label-class="has-text-centered">
                      <input @keydown="onCouponCodeKeydown" type="text" class="input" name="code" v-model="form.code" placeholder="Digite o código aqui">
                    </form-control>
                  </div>
                  <div class="column is-12">
                    <button v-if="has_coupon_code" class="button is-fullwidth is-primary" :class="{'is-primary': !has_coupon_code, 'is-success': has_coupon_code, 'is-loading': form.sendingData}" @click="onClickShowPaymentForm()">
                      <span>Aplicar cupom de desconto</span>
                    </button>
                  </div>
                </div>
              </div>
              <!-- Trial infos: -->
              <div class="columns is-multiline is-centered">
                <div class="column">
                  <div v-if="is_coupon_simulated && coupon.expires_at">
                    <div class="box is-success notification">
                      <p class="is-size-6 has-text-centered is-paddingless">
                        Este cupom expira em:
                      </p>
                      <countdown :until="coupon.expires_at"></countdown>
                    </div>
                    <button  v-if="is_mobile" class="button is-primary is-fullwidth" @click="toggleModal()" aria-label="close">Continuar</button>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </div>
        <button  v-if="is_mobile && show_payment_infos" class="modal-close is-large" @click="toggleModal()" aria-label="close"></button>
      </div>
      <div class="box-invisible">
        <div class="media coffee" v-if="product.is_recurring">
          <figure class="media-left image coffee">
            <img src="/static/coffe.png" alt="">
          </figure>
          <div class="media-content">
            <div class="content">
              <p>
                <strong>Mais barato que um cafézinho por dia.</strong><br />
                Apenas R$ {{format_price(daily_price)}} / dia.
              </p>
            </div>
          </div>
        </div>
        <div class="media satisfaction" v-if="product.is_recurring && (already_subscribed(product) || product.trial_days <= 0) && product.recurrency_frequency_in_days <= 31">
          <div class="media-content">
            <div class="content has-text-centered">
              Sem compromisso. Cancele quando quiser.
            </div>
          </div>
        </div>
        <div class="media vitalicio" v-if="!product.is_recurring">
          <figure class="media-left image coffee">
            <img src="/static/vitalicio.svg" alt="">
          </figure>
          <div class="media-content">
            <div class="content">
              <p>
                <strong>Acesso ilimitado e vitalício {{ product.courses.length > 1 ? 'aos cursos' : 'ao curso'}} na nossa plataforma:</strong><br />
                <small class="is-size-7">{{ product.courses.map((course) => course.name).join(', ') }}.</small>
              </p>
            </div>
          </div>
        </div>
        <div class="media courses" v-if="product.is_recurring">
          <div class="media-content has-text-centered">
            <div class="content">
              <p>
                <strong>{{ product.courses.length > 1 ? 'Cursos inclusos' : 'Curso incluso'}} nesta assinatura:</strong><br />
                <small class="is-size-7">{{ product.courses.map((course) => course.name).join(', ') }}.</small>
              </p>
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
    <div class="payment-info-bar" @click="toggleModal()" v-if="is_mobile">
      <div class="box">
        <nav class="level is-mobile is-size-5">
          <div class="level-left">
            <div class="level-item">
              <small>{{product.name}}</small>
            </div>
          </div>
          <div class="level-right">
            <div v-if="(product && product.trial_days > 0) || (is_coupon_simulated && coupon.trial_days > 0)" class="level-item">
              R$ 0,00
            </div>
            <div v-else class="level-item" :style="is_coupon_simulated ? 'text-decoration: line-through' : ''" :class="{'has-text-grey-light': is_coupon_simulated}">
              R$ {{ format_price(product.price) }}&nbsp;
              <small v-if="product.is_recurring"> / {{ human_period }}</small>
            </div>
          </div>
        </nav>
        <a v-if="!is_coupon_simulated">Tem cupom?</a>
        <div v-if="is_coupon_simulated">
          <nav class="level is-mobile coupon-complement is-size-6">
            <div class="level-left">
              <div class="level-item">
                <small>Cupom (<strong>{{coupon.code}}</strong>):</small>
              </div>
            </div>
            <div class="level-right">
              <div class="level-item has-text-success">
                <span class="has-text-success">R$ {{ format_price(coupon.product.price) }}</span>
                <small>
                  <span class="has-text-success" v-if="coupon.product.is_recurring">/ {{ human_period }}</span>
                  ({{coupon.amount_off ? `R$ ${format_price(coupon.amount_off)}` : `${coupon.percent_off}%`}} OFF)
                </small>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import store from '@/store'
import Form from '@/helpers/form'
import FormControl from '../Form/FormControl.vue'
import axios from 'axios'
import Countdown from './Countdown.vue'
import FormControlHorizontal from '../Form/FormControlHorizontal.vue'
import MobileDetect from 'mobile-detect'

export default {

  name: 'payment-infos',

  props: [],

  components: {
    FormControl,
    FormControlHorizontal,
    Countdown
  },

  computed: {
    ...mapState('order', ['product', 'show_payment_form', 'coupon', 'is_coupon_simulated', 'show_payment_infos']),
    ...mapGetters('subscriptions', ['already_subscribed']),
    ...mapGetters('order', ['format_price', 'daily_price', 'human_period', 'is_free_order', 'product_price_from', 'product_price', 'trial_days']),
    has_coupon_code () {
      return this.form.code && this.form.code.length > 0
    },
    is_mobile() {
      let md = new MobileDetect(window.navigator.userAgent);
      return md.mobile();
    }
  },

  data () {
    return {
      animation: 0,
      form: new Form({
        code: ''
      })
    }
  },

  methods: {
    toggleModal() {
      this.$store.commit('order/setShowPaymentInfos', !this.show_payment_infos)
    },
    onCouponCodeKeydown(e) {
      if (e.keyCode === 13) {
        e.preventDefault();
        this.onClickShowPaymentForm();
      }
    },
    onClickShowPaymentForm (scrollToElement = 'checkout_payment_form') {
      if (this.has_coupon_code && !this.is_coupon_simulated) {
        this.form.sendingData = true;
        this.$store.dispatch('order/simulateCoupon', this.form.code).then(
          () => {
            this.onClickShowPaymentForm('payment-infos');
            if (this.is_free_order) {
              this.$emit('freeordercoupon')
            }
          },
          (err) => {
            if (typeof err.response === "undefined") {
              this.$swal({
                type: 'error',
                title: this.$t('login.results.title_unknown_error'),
                html: this.$t('login.results.unknown_error')
              })
            } else if (typeof err.response.data.errors !== "undefined") {
              let errorMsg = '';
              errorMsg += '<ul>';
              for (let i in err.response.data.errors) {
                let v = err.response.data.errors[i];
                if (Array.isArray(v)) {
                  errorMsg += '<li>' + v.join('</li><li>') + '</li>';
                }
              }
              errorMsg += '</ul>';
              this.$swal({type: 'error', title: this.$t('login.errors.fix_form_errors_title'), html: errorMsg})
            } else {
              this.$swal({type: 'error', title: err.response.data.message})
            }
          }
        ).finally(() => { this.form.sendingData = false });
        return;
      }
      this.$store.commit('order/setShowPaymentForm', true)
      window.setTimeout(() =>
        this.$scrollTo(document.getElementById(scrollToElement))
        , 1000)
    }
  }
}
</script>

<style lang="scss">
  .free-trial {
    min-height: 198px;
    .vue-typer {
      .custom.char {
        color: #4a4a4a;
      }
    }
    .box.notification.is-success {
      padding: 1.25rem;
    }

  }
  .ssl-certifications {
    margin-top: 10px;
    img {
      opacity: 0.8;
      &.sq {
        max-width: 60px;
      }
      &.sp {
        max-width: 150px;
      }
    }
  }
  .media.coffee {
    .media-content {
      padding-left: 15px;
      padding-top: 5px;
    }
  }
  .media.vitalicio {
    .media-content {
      padding-left: 15px;
    }
  }
  .wrap-box-payment {
    .box-invisible {
      padding: 1.25rem;
    }
    .level {
      margin-bottom: 0.75rem;
    }
  }
  .media.security {
    img {
      max-width: 140px;
      height: auto;
    }
  }
  figure.coffee.image {
    width: 40px;
    height: auto;
    margin: 0 auto;
    @media screen and (max-width: 600px) {
      padding-top: 0;
      margin: 0;
      img {
          position: initial;
          width: 40px;
          height: auto;
          padding-top: 0;
      }
    }
  }
  .payment-infos {
    margin-bottom: 100px;
  }
  .payment-info-bar {
    position: fixed;
    bottom: 5px;
    left: 5px;
    right: 5px;
    height: 100px;
    z-index: 30;
    .box {
      padding: 0.5rem;
      background-color: #4C4C4C;
      color: #FFF;
      a {
        color: #FCF;
      }
    }
    nav.level {
      margin-bottom: 0.3rem;
      .level-right, .level-left {
        max-width: 50%;
        .level-item {
          width: 100%;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          justify-content: left;
        }
      }
    }
  }
  .box.payment.modal-content {

  }
  .before-payment {
    nav.level {
      .level-right, .level-left {
        max-width: 50%;
        .level-item {
          width: 100%;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          justify-content: left;
        }
      }
    }
  }
</style>
