import axios from 'axios'

export default {
  all (cancelToken = null) {
    const extraOptions = {};
    if (cancelToken) {
      extraOptions.cancelToken = cancelToken.token;
    }
    return axios.get(`community/tags`, extraOptions).then(
      (response) => response.data.data
    )
  },
  get (tag) {
    return axios.get(`community/tags/${tag}`).then(
      (response) => response.data.data
    )
  },
  create (name) {
    return axios.post(`community/tags`, {name}).then(
      (response) => response.data.data
    )
  },
  update (tag, fields) {
    return axios.put(`community/tags/${tag}`, fields).then(
      (response) => response.data.data
    )
  },
  destroy (tag) {
    return axios.delete(`community/tags/${tag}`).then(
      (response) => response.data
    )
  }
}
