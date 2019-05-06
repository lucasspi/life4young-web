import loadSeenNotificationsHistory from './common'

export default {
  notificationSeenOnThisDevice (state) {
    return (notificationId, seenNotificationsHistory = null) => {
      if (!seenNotificationsHistory) {
        seenNotificationsHistory = loadSeenNotificationsHistory();
      }

      return seenNotificationsHistory.indexOf(notificationId) !== -1;
    }
  }
}
