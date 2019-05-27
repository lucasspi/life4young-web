
export default {
  setLeadsCount(state, leadsCount) {
    state.leads_count = leadsCount;
  },
  setLeadsPerDay(state, leadsPerDay) {
    state.leads_per_day = leadsPerDay;
  },
  setTotalLeadsCount(state, totalLeadsCount) {
    if (state.total_leads_count != state.old_total_leads_count) {
      state.old_total_leads_count = state.total_leads_count;
    }
    state.total_leads_count = totalLeadsCount;
  },
  setFetchingData(state, fetchingData) {
    state.fetchingData = fetchingData;
  },
  setErrorMessage(state, errMsg) {
    state.errorMessage = errMsg;
  },
  setDelay(state, delay) {
    state.delay = delay;
  },
  setRefreshInterval(state, refreshInterval) {
    state.refreshInterval = refreshInterval;
  },
  setOrders(state, orders) {
    state.orders = orders;
  },
  setLoadingOrders(state, loadingOrders) {
    state.loading_orders = loadingOrders;
  },
  setOrdersLastPage(state, ordersLastPage) {
    state.orders_last_page = ordersLastPage;
  },
  setOrderSummary(state, orderSummary) {
    state.order_summary = orderSummary;
  },
  setLoadingOrderSummary(state, loadingOrderSummary) {
    state.loading_order_summary = loadingOrderSummary;
  },
  setInstantPurchases(state, instantPurchases) {
    state.instant_purchases = instantPurchases;
  },
  setLoadingInstantPurchases(state, loadingInstantPurchases) {
    state.loading_instant_purchases = loadingInstantPurchases;
  },
  addSeenInstantPurchases(state, seenInstantPurchases) {
    let seenInstantPurchasesHistory = localStorage.getItem('seen_instant_purchases');
    if (!seenInstantPurchasesHistory) {
      seenInstantPurchasesHistory = [];
    } else {
      seenInstantPurchasesHistory = JSON.parse(seenInstantPurchasesHistory);
    }
    const pushIdToHistory = (id) => {
      const numberInstantPurchase = parseInt(id, 10);
      if (seenInstantPurchasesHistory.indexOf(numberInstantPurchase) === -1) {
        seenInstantPurchasesHistory.push(numberInstantPurchase)
      }
    }
    if (Array.isArray(seenInstantPurchases)) {
      seenInstantPurchases.forEach(pushIdToHistory)
    } else if (typeof seenInstantPurchases == "number" || typeof seenInstantPurchases == "string") {
      pushIdToHistory(seenInstantPurchases)
    }
    localStorage.setItem('seen_instant_purchases', JSON.stringify(seenInstantPurchasesHistory));
  },
  setStopInstantPurchases(state, stopInstantPurchases) {
    state.stop_instant_purchases = stopInstantPurchases;
  },
  setLockInstantPurchasesNotifications(state, lockInstantPurchasesNotifications) {
    state.lock_instant_purchases_notifications = lockInstantPurchasesNotifications
  },
  setIsInvitingFriends(state, isInvitingFriends) {
    state.is_inviting_friends = isInvitingFriends;
  },
  setInvitations(state, invitations) {
    state.invitations = invitations;
  },
  setIsLoadingInvitations(state, isLoadingInvitations) {
    state.is_loading_invitations = isLoadingInvitations;
  },
  setReward (state, reward) {
    state.reward = reward;
  },

  setLoadingReward(state, loadingReward) {
    state.loading_reward = loadingReward;
  },
}
