import axios from 'axios'
import Comments from './comments'
import Form from '../../../helpers/form'

export default {
  all (queryParams, cancelToken = null) {
    const extraOptions = {};
    if (cancelToken) {
      extraOptions.cancelToken = cancelToken.token;
    }
    return axios.get(`community/posts`, {params: queryParams, ...extraOptions}).then(
      (response) => response.data
    )
  },
  createForm (defaultFields = {text: '', tag: ''}) {
    return new Form(defaultFields);
  },
  _create: () => `community/posts`,
  create () {
    return axios.post(this._create()).then(
      (response) => response.data.data
    )
  },
  get(post) {
    return axios.get(`community/posts/${post}`).then(
      (response) => response.data.data
    )
  },
  update (post, fields) {
    return axios.put(`community/posts/${post}`, fields).then(
      (response) => response.data.data
    )
  },
  delete (post) {
    return axios.delete(`community/posts/${post}`).then(
      (response) => response.data
    )
  },
  myPosts () {
    return axios.get(`community/myposts`).then(
      (response) => response.data.data
    )
  },
  updateImage (post, fields) {
    if (!(fields instanceof FormData)) {
      throw "Not a FormData fields";
    }
    return axios.post(`community/posts/${post}/img`).then(
      (response) => response.data.data
    )
  },
  comments (post) {
    if (post instanceof Object) {
      post = post.id;
    }
    return new Comments(post);
  },
  toggleLike (post) {
    return axios.post(`community/posts/${post}/likes`).then(
      (response) => response.data.data
    )
  }
}
