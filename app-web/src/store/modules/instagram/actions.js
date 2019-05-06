
import api from '../../../api';

export default {

  fetchMyProfiles ({commit, state}) {
    return api.instagram.myProfiles().then(
      (profiles) => commit('setProfiles', profiles)
    )
  }
}
