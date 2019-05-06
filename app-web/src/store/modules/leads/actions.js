import api from '../../../api'
import createNotification from '../../../helpers/notification'
import metadataGetters from '../metadata/getters';
import {getRandomInt} from '../../../helpers'

export default {

  fetchSummary({ commit, state }) {
    return api.leads.fetchSummary().then(
      (response) => commit('setLeadsCount', response.data.data.leads_count),
      (err) => commit('setErrorMessage', err.response.data.message)
    );
  },

  fetchTotalLeads({commit, state}) {
    return api.leads.fetchTotalLeads().then(
      (response) => commit('setTotalLeadsCount', response.data.data.leads_count),
      (err) => commit('setErrorMessage', err.response.data.message)
    );
  },

  fetchPerDay({commit, state}) {
    return api.leads.fetchPerDay().then(
      (response) => commit('setLeadsPerDay', response.data.data),
      (err) => commit('setErrorMessage', err.response.data.message)
    );
  },

  fetchSummaryAndTotal({dispatch}) {
    return Promise.all([
      dispatch('fetchSummary'),
      dispatch('fetchTotalLeads')
    ]);
  },

  fetchAllOrders({commit, dispatch}, page) {
    commit("setLoadingOrders", true)
    return api.leads.fetchAllOrders(page).then(
      (response) => {
        commit('setOrders', response.data.data);
        commit('setOrdersLastPage', response.data.metadata.pagination.last_page)
      },
      (err) => {
        commit('setErrorMessage', err.response.data.message)
      }
    ).finally(
      () => commit("setLoadingOrders", false)
    )
  },

  fetchAllOrderSummary({commit, dispatch}) {
    commit("setLoadingOrderSummary", true)
    return api.leads.fetchAllOrderSummary().then(
      (response) => commit('setOrderSummary', response.data.data),
      (err) => commit('setErrorMessage', err.response.data.message)
    ).finally(
      () => commit('setLoadingOrderSummary', false)
    )
  },

  startInterval({ commit, dispatch, state }) {
    commit('setRefreshInterval', true);
    dispatch('loopInterval');
  },

  stopInterval({ commit }) {
    commit('setRefreshInterval', false);
  },

  loopInterval({ commit, dispatch, state }) {
    if (state.refreshInterval) {
      dispatch('fetchSummaryAndTotal').then(
        () => window.setTimeout(
          () => dispatch('loopInterval'), state.delay
        )
      );
    }
  },

  fetchInstantPurchases({commit, dispatch, state}, productId = null) {
    commit('setLoadingInstantPurchases', true);
    let seenInstantPurchases = localStorage.getItem('seen_instant_purchases')
    if (seenInstantPurchases) {
      seenInstantPurchases = JSON.parse(seenInstantPurchases);
    }

    return api.leads.fetchInstantPurchases(seenInstantPurchases, productId).then(
      (orders) => {
        commit('setInstantPurchases', orders)
        return orders
      }
    ).finally(
      () => commit('setLoadingInstantPurchases', false)
    )
  },

  startNotifyNextInstantPurchase({dispatch, commit, state}, productId) {
    commit('setStopInstantPurchases', false);
    if (!state.stop_instant_purchases && !state.lock_instant_purchases_notifications) {
      commit('setLockInstantPurchasesNotifications', true)
      dispatch('notifyNextInstantPurchase', productId)
    }
  },

  stopNotifyNextInstantPurchase({dispatch, commit}) {
    commit('setStopInstantPurchases', true);
  },

  async notifyNextInstantPurchase({commit, dispatch, state}, productId) {
    if (state.stop_instant_purchases) {
      commit('setStopInstantPurchases', false);
      commit('setLockInstantPurchasesNotifications', false);
      return;
    }
    let orders = state.instant_purchases;
    if (state.instant_purchases.length <= 0) {
      orders = await dispatch('fetchInstantPurchases', productId);
      if (!orders || orders.length <= 0) {
        orders = await dispatch('fetchInstantPurchases');
      }
    }
    const order = orders.pop();
    commit('addSeenInstantPurchases', [order.id]);
    commit('setInstantPurchases', orders);
    let phrase = null;
    let imageMetadata = null;
    const userFirstName = order.user.name.split(' ').shift();

    if (order.product_id === productId) {
      imageMetadata = metadataGetters.getMetadataImage()(order.product, 'avatar')
      if (!imageMetadata) {
        let maxCoursesInProduct = order.product.courses.length;
        let course = order.product.courses[getRandomInt(0, maxCoursesInProduct - 1)];
        imageMetadata = metadataGetters.getMetadataImage()(course, 'avatar');
      }
      phrase = (order.product.is_recurring ? `assinou` : `comprou `) + ` o pacote ${order.product.name}`;
    } else {
      let maxCoursesInProduct = order.product.courses.length;
      let course = order.product.courses[getRandomInt(0, maxCoursesInProduct - 1)];
      imageMetadata = metadataGetters.getMetadataImage()(course, 'avatar');
      phrase = order.product.is_recurring ? `assinou o pacote ${order.product.name}` : `comprou o curso ${course.name}`;
    }
    let notificationPayload = {
      message: `${userFirstName} ${phrase}`,
      position: '.bottom-left',
      duration: 4500,
      dateTime: order.created_at
    };
    if (imageMetadata) {
      notificationPayload['thumb'] = imageMetadata.image_url;
    }

    createNotification(notificationPayload)

    window.setTimeout(() => dispatch('notifyNextInstantPurchase'), getRandomInt(10 * 1000, 45 * 1000));
  },

  async inviteUserFriends({commit, dispatch, state}, {emails, extra_infos = null}) {
    commit('setIsInvitingFriends', true)
    try {
      await api.leads.inviteUserFriends(emails, extra_infos);
    } catch (error) {
      commit('setIsInvitingFriends', false)
      throw error
    }
    commit('setIsInvitingFriends', false)
  },

  async loadInvitations({commit, dispatch, state}, fromSegmentId) {
    commit('setIsLoadingInvitations', true)
    try {
      commit('setInvitations', await api.leads.fetchInvitations(fromSegmentId))
    } catch (error) {
      commit('setIsLoadingInvitations', false)
      throw error
    }
    commit('setIsLoadingInvitations', false)
  },

  fetchReward ({commit, dispatch}, reward) {
    commit('setLoadingReward', true)

    return api.leads.rewards.get(reward)
      .then((reward) => commit('setReward', reward))
      .finally(() => commit('setLoadingReward', false));
  }


}
