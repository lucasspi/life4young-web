import axios from 'axios'
import Replies from './replies'
import Form from '../../../helpers/form'

export default class Comments {
  constructor (post) {
    this.post = post;
  }
  all () {
    return axios.get(`community/posts/${this.post}/comments`).then(
      (response) => response.data
    )
  }

  get (comment) {
    return axios.get(`community/posts/${this.post}/comments/${comment}`).then(
      (response) => response.data.data
    )
  }

  update (comment, fields) {
    return axios.put(`community/posts/${this.post}/comments/${comment}`, fields).then(
      (response) => response.data.data
    )
  }

  createForm (defaultFields = {body: ''}) {
    return new Form(defaultFields);
  }

  _create() { return `community/posts/${this.post}/comments`; }

  create (comment) {
    return axios.post(this._create(), comment).then(
      (response) => response.data.data
    )
  }

  delete (comment) {
    return axios.delete(`community/posts/${this.post}/comments/${comment}`);
  }

  updateImage (comment, fields) {
    if (!(fields instanceof FormData)) {
      throw {msg: 'Not a FormData fields'};
    }
    return axios.post(`community/posts/${this.post}/comments/${comment}/img`).then(
      (response) => response.data.data
    )
  }

  replies (comment) {
    return new Replies(this.post, comment);
  }

  toggleLike (comment) {
    return axios.post(`community/posts/${this.post}/comments/${comment}/likes`).then(
      (response) => response.data.data
    )
  }

}
