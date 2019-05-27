import api from '../../../api'
import metadataGetters from '../metadata/getters'
import {getRandomInt} from '../../../helpers'
import createNotification from '../../../helpers/notification'
import loadSeenNotificationsHistory from './common'


export default {
  async fetchUnread ({commit, dispatch}) {
    commit('setLoadingUnreadNotifications', true)
    let unreadNotifications;
    try {
      unreadNotifications = await api.notifications.unread();
      commit('setUnreadNotifications', unreadNotifications)
    } catch (error) {
      console.error('[store/modules/notifications] error trying to load unread notifications: ', error);
    }

    commit('setLoadingUnreadNotifications', false)

    return unreadNotifications;
  },

  async fetchAll ({commit}) {
    commit('setLoadingNotifications', true)

    try {
      commit('setNotifications', await api.notifications.all())
    } catch (error) {
      console.error('[store/modules/notifications] error trying to load notifications: ', error);
    }

    commit('setLoadingNotifications', false)
  },

  async dispatchNextNotification({commit, dispatch, state, getters}) {
    if (state.stop_check_notifications) {
      return;
    }
    let unreadNotifications = state.unread_notifications;
    if (state.unread_notifications.length <= 0) {
      unreadNotifications = await dispatch('fetchUnread');
    }

    const seenNotificationsHistory = loadSeenNotificationsHistory();

    let unseenNotifications = unreadNotifications.filter(
      (notification, idx, arr) => !getters.notificationSeenOnThisDevice(notification.id, seenNotificationsHistory)
    );

    if (unseenNotifications.length <= 0) {
      unreadNotifications = await dispatch('fetchUnread');
      window.setTimeout(() => dispatch('dispatchNextNotification'), getRandomInt(2 * 1000, 20 * 1000));
      return;
    }

    const notification = unseenNotifications.pop();
    commit('addSeenNotifications', [notification.id]);

    let notificationPayload = {
      message: notification.data.body,
      title: notification.data.subject,
      html: true,
      // duration: 5500,
      duration: 0,
      dateTime: notification.created_at
    };

    if (notification.data.action) {
      notificationPayload.action = notification.data.action;
    }

    if (notification.data.url) {
      notificationPayload.url = notification.data.url;
    }

    createNotification(notificationPayload)

    await dispatch('markAsRead', notification.id)

    window.setTimeout(() => dispatch('dispatchNextNotification'), getRandomInt(2 * 1000, 20 * 1000));
  },

  async markAsRead({commit, dispatch}, notification) {
    try {
      await api.notifications.markAsRead(notification)
    } catch (err) {
      console.error('[store/modules/notifications] error trying to mark notification as read: ', err);
    }
  }
}
