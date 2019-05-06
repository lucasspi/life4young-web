import api from '@/api'
import {getHumanRecurrencyPeriod} from '../../../helpers'
import orderGetters from '../order/getters'

export default {

  /**
   * Total quantity of lessons in this product
   * @param state
   * @returns {number}
   */
  product_lessons_count: (state) => {
    if (state.product && typeof state.product.courses !== 'undefined') {
      let courses = state.product.courses;
      let lessonCounting = 0;
      courses.forEach((course, idx, arr) => {
        lessonCounting += Array.isArray(course.lessons_count) && course.lessons_count.length > 0 ? course.lessons_count[0].total : 0;
      });
      return lessonCounting;
    }
    return 0;
  },

  /**
   * Lessons duration in hours
   * @param state
   * @returns {number}
   */
  product_lessons_duration_sum: (state) => {
    if (state.product && typeof state.product.courses !== 'undefined') {
      let courses = state.product.courses;
      let lessonsDuration = 0;
      courses.forEach((course, idx, arr) => {
        lessonsDuration += Array.isArray(course.lesson_duration_sum) && course.lesson_duration_sum.length > 0 ? course.lesson_duration_sum[0].duration : 0;
      });
      return parseInt(Math.ceil(lessonsDuration / 60 / 60))
    }
    return 0;
  },

  featured_products: (state) => {
    if (Array.isArray(state.products)) {
      return state.products.map((v, idx, arr) => {
        v.is_selected = (state.product ? v.id === state.product.id : false);
        return v;
      })
    }
    return [];
  },

  available_payment_methods: (state) => {
    return (product) => {
      let defaultList = [];
      if (product) {
        if (product && product.is_billet_enabled)
          defaultList.push({id: api.orders.payment_methods.BILLET, label: 'Boleto', icon: 'barcode'});
        defaultList.push({id: api.orders.payment_methods.CREDIT_CARD, label: 'Cartão de crédito', icon: 'credit-card'});
        defaultList.push({id: api.orders.payment_methods.PAYPAL, label: 'PayPal', icon: ['fab', 'paypal']})
      }
      return defaultList;
    }
  },

  human_period(state) {
    return getHumanRecurrencyPeriod(state.product);
  },

  product_price_from: orderGetters.product_price_from,
  product_price: orderGetters.product_price,
  trial_days: orderGetters.trial_days
}
