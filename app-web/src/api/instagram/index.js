import axios from 'axios'

export default {

  myProfiles () {
    return axios.get('me/instagram/profiles')
      .then((response) => response.data.data)
  }

}
