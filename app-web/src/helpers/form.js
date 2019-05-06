import axios from 'axios'
import Errors from './errors'

export default class Form {
  /**
   * Create a new Form instance.
   *
   * @param {object} data
   */
  constructor(data) {
    this.originalData = data;

    for (let field in data) {
      this[field] = data[field];
    }

    this.errors = new Errors();
    this.sendingData = false;
  }

  isLoading() {
    return this.sendingData;
  }


  /**
   * Fetch all relevant data for the form.
   */
  data() {
    let data = {};

    for (let property in this.originalData) {
      data[property] = this[property];
    }

    return data;
  }


  /**
   * Reset the form fields.
   */
  reset() {
    for (let field in this.originalData) {
      this[field] = this.originalData[field];
    }

    this.errors.clear();
  }

  resetData(data) {
    this.originalData = data;

    for (let field in data) {
      this[field] = data[field];
    }
  }


  /**
   * Send a POST request to the given URL.
   * .
   * @param {string} url
   */
  post(url) {
    return this.submit('post', url);
  }


  /**
   * Send a PUT request to the given URL.
   * .
   * @param {string} url
   */
  put(url) {
    return this.submit('put', url);
  }


  /**
   * Send a PATCH request to the given URL.
   * .
   * @param {string} url
   */
  patch(url) {
    return this.submit('patch', url);
  }


  /**
   * Send a DELETE request to the given URL.
   * .
   * @param {string} url
   */
  delete(url) {
    return this.submit('delete', url);
  }


  /**
   * Submit the form.
   *
   * @param {string} requestType
   * @param {string} url
   */
  submit(requestType, url) {
    this.sendingData = true;
    return new Promise((resolve, reject) => {
      axios[requestType](url, this.data())
        .then(response => {
          this.onSuccess(response.data);

          resolve(response.data);
        })
        .catch(error => {
          //let errorInfos = (typeof error.body.errors != "undefined") ? error.body.errors :
          if (typeof error.response.data.errors != "undefined") {
            this.onFail(error.response.data.errors);
          } else {
            this.sendingData = false;
          }

          reject(error.response.data.errors || error.response.data);
        });
    });
  }


  /**
   * Handle a successful form submission.
   *
   * @param {object} data
   */
  onSuccess(data) {
    this.sendingData = false;
    this.reset();
  }


  /**
   * Handle a failed form submission.
   *
   * @param {object} errors
   */
  onFail(errors) {
    this.sendingData = false;
    this.errors.record(errors);
  }
}
