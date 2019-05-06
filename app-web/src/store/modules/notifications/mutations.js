import loadSeenNotificationsHistory from './common'

export default {
  setNotifications: (state, notifications) => state.notifications = notifications,
  setLoadingNotifications: (state, loadingNotifications) => state.loading_notifications = loadingNotifications,
  setUnreadNotifications: (state, unreadNotifications) => state.unread_notifications = unreadNotifications,
  setLoadingUnreadNotifications: (state, loadingUnreadNotifications) => state.loading_unread_notifications = loadingUnreadNotifications,

  addSeenNotifications (state, seenNotifications) {
    const seenNotificationsHistory = loadSeenNotificationsHistory();
    const pushIdToHistory = (id) => {
      if (seenNotificationsHistory.indexOf(id) === -1) {
        seenNotificationsHistory.push(id)
      }
    }
    if (Array.isArray(seenNotifications)) {
      seenNotifications.forEach(pushIdToHistory)
    } else if (typeof seenNotifications == "number" || typeof seenNotifications == "string") {
      pushIdToHistory(seenNotifications)
    }
    localStorage.setItem('seen_notifications', JSON.stringify(seenNotificationsHistory));
  },
}
