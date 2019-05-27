import axios from 'axios'

export default {

  get (rewardSlug) {
    return axios.get(`leads/rewards/${rewardSlug}`).then(
      (response) => response.data.data
    )
  },

}
