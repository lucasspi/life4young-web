
import axios from 'axios'

export default {

  _updateLoggedUser() {
    return 'auth/me';
  },

  updateLoggedUser(userData) {
    return axios.put(this._updateLoggedUser(), userData).then(
      (response) => response.data.data
    )
  },

  togglePlatformTour () {
    return axios.post('auth/me/toggle-tour').then(
      (response) => response.data.data
    );
  },

  resendWelcomeEmail() {
    return axios.post('auth/me/resend-welcome-email').then(
      (response) => response
    )
  },

  updateOnesignalId(onesignalId) {
    return axios.post('auth/me/onesignal', {onesignal_id: onesignalId}).then(
      (response) => response
    )
  },

  usersCount() {
    return axios.post('auth/users-count').then(
      (response) => response.data.data.count
    );
  },

  get(userId) {
    return axios.get(`auth/users/${userId}`).then(
      (response) => response.data.data
    );
  },

  uploadAvatar(formData, configs = null) {
    return axios.post(`/auth/me/img`, formData, configs).then(
      (response) => response.data.data
    )
  },

  deleteAvatar() {
    return axios.delete(`/auth/me/img`).then(
      (response) => response.data
    )
  }

}
