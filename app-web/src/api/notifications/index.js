import axios from 'axios'

export default class notifications {
  static all () {
    return axios.get('notifications').then(
      (response) => response.data.data
    )
  }

  static unread () {
    return axios.get('notifications/unread').then(
      (response) => response.data.data
    )
  }

  static markAsRead (notificationId) {
    return axios.post(`notifications/${notificationId}/mark-as-read`).then(
      (response) => response.data.data
    )
  }

  static markAllAsRead () {
    return axios.post(`notifications/mark-all-as-read`).then(
      (response) => response.data
    )
  }
}
