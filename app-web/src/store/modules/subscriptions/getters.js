import api from '../../../api'

export default {
  subscription_courses(state) {
    let subscriptions = state.subscriptions;
    if (subscriptions && subscriptions.length > 0) {
      let coursesIds = [];
      subscriptions.forEach((subscription) => {
        if (subscription.product && subscription.is_cancelable) {
          let productCourses = subscription.product.product_courses;
          if (productCourses && productCourses.length > 0) {
            productCourses.forEach((productCourse) => coursesIds.push(productCourse.course_id))
          }
        }
      })
      return coursesIds;
    }
    return [];
  },

  my_available_courses(state) {
    let subscriptions = state.subscriptions;
    if (subscriptions && subscriptions.length > 0) {
      let courses = [];
      subscriptions.forEach((subscription) => {
        if (subscription.product && subscription.is_cancelable) {
          let productCourses = subscription.product.product_courses;
          if (productCourses && productCourses.length > 0) {
            productCourses.forEach((productCourse) => courses.push(productCourse.course))
          }
        }
      })
      return courses;
    }
    return [];
  },

  already_subscribed (state) {
    return (product) => {
      let subscriptions = state.subscriptions;
      if (subscriptions && subscriptions.length > 0) {
        let sameProductSubscriptions = subscriptions.filter((subscription) => subscription.product_id === product.id);
        return sameProductSubscriptions.length > 0;
      }
      return false;
    }
  },

  is_user_subscribed_on_recurring_plan (state) {
    let subscriptions = state.subscriptions;
    if (subscriptions && subscriptions.length > 0) {
      let sameProductSubscriptions = subscriptions.filter(
        (subscription) => {
          return subscription.product && subscription.is_cancelable && subscription.product.is_recurring
        }
      );
      return sameProductSubscriptions.length > 0;
    }
  },

  initial_pending_billet (state) {
    if (state.subscriptions && state.subscriptions.length <= 0) {
      let orders = state.orders;
      let transactionWaitingPayment = null;
      let filteredOrders = orders.filter(
        (order) => order.payment_method_id === api.orders.payment_methods.BILLET && order.last_transaction && order.last_transaction.billet_url
      );
      if (filteredOrders.length > 0) {
        return filteredOrders.shift().last_transaction;
      }
    }

    return null;
  }
}
