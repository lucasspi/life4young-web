import api from '../../../api'


export default {
  async get ({commit}, userId) {
    commit('setLoadingUser', true);
    try {
      commit('setUser', await api.users.get(userId));
    } catch (err) {
      throw err;
    }
    commit('setLoadingUser', false);
  },

  async deleteAvatar ({commit}) {
    await api.users.deleteAvatar()
  }
}
