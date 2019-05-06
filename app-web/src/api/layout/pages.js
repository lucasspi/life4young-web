import axios from 'axios'

export default {

  get (pagesSlug) {
    return axios.get(`layout/pages/${pagesSlug}`).then(
      (response) => response.data.data
    )
  }

}
