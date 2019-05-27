import axios from 'axios'

export default class Replies {
  constructor (post, comment) {
    this.post = post;
    this.comment = comment;
  }
  all () {
    return axios.get(`community/posts/${this.post}/comments/${this.comment}`).then(
      (response) => response.data.data.replies
    )
  }

  get (reply) {
    return axios.get(`community/posts/${this.post}/comments/${this.comment}`).then(
      (response) => response.data.data.replies.filter((r) => r.id === parseInt(reply)).pop()
    )
  }

  _create() {
    return `community/posts/${this.post}/comments/${this.comment}`;
  }

  create (reply) {
    return axios.post(this._create(), reply).then(
      (response) => response.data.data
    )
  }
}
