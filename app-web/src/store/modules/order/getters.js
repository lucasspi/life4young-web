import api from '../../../api'
import cookie from '../../../helpers/cookie';
import metadata from '../metadata';
import {getHumanRecurrencyPeriod} from '../../../helpers'

export default {
  orderCreationPayload (state) {
    if (state.product == null || state.payment_method_id == null)
      return null;

    let orderPayload = {
      product_id: state.product.id,
      payment_method_id: state.payment_method_id,
      gateway: state.gateway
    };

    if (state.user_card && state.user_card.hasOwnProperty('id')) {
      orderPayload.user_card_id = state.user_card.id;
    }

    if (state.is_coupon_simulated) {
      orderPayload.coupon_id = state.coupon.id;
    }

    let cookieEls = [state.product.publisher_founder.slug, state.product.slug];
    let cookieName = cookie.REF_COOKIE(cookieEls);
    if (cookie.check(cookieName)) {
      let refCookieVal = cookie.get(cookieName);
      orderPayload.affiliate_ref = refCookieVal;
    }

    return orderPayload;
  },
  format_price (state) {
    return (price) => {
      return (`${parseFloat(price).toFixed(2)}`).replace('.', ',');
    }
  },
  daily_price(state) {
    if (!state.product)
      return 0;
    let productPrice = state.product.price;
    if (state.coupon && state.coupon.product) {
      productPrice = state.coupon.product.price;
    }
    if (state.product && state.product.recurrency_period === 'monthly') {
      let factor = 12 / state.product.recurrency_frequency;
      return (((productPrice) * factor) / 365);
    }
    return 0;
  },
  human_period(state) {
    return getHumanRecurrencyPeriod(state.product);
  },

  is_free_order(state) {
    return (state.product && state.product.price <= 0) || (state.coupon && state.coupon.product && state.coupon.product.price <= 0);
  },

  product_price_from(state) {
    const coupon = state.coupon;
    if (coupon) {
      return state.product.price;
    }
    if (state.product) {
      return state.product.price_from;
    }

    return 0;
  },
  product_price(state) {
    const coupon = state.coupon;
    if (coupon) {
      return state.coupon.product.price;
    }
    if (state.product) {
      return state.product.price;
    }

    return 0;
  },
  trial_days(state) {
    const coupon = state.coupon;
    if (coupon && coupon.trial_days > 0) {
      return coupon.trial_days;
    }
    const product = state.product;
    if (product) {
      return product.trial_days;
    }
    return 0;
  },

  orders_pending_conversion_tag(state) {
    return state.orders.filter(order => {
      let adsBilletConversion = metadata.getters.getMetadata('ads_billet_conversion');
      if (adsBilletConversion) {
        return false;
      }
      if (order.payment_method_id === api.orders.payment_methods.BILLET &&
          order.transaction_status_id === api.orders.transaction_status.PAID) {
        return true;
      }
    });
  }

}
