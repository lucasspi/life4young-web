
export default {
  INVITE_COOKIE() {
    return 'eda-invitation-u'
  },

  REF_COOKIE(components) {
    return `scharq-${components.join('-')}`;
  },

  LEAD_COOKIE() {
    return 'eda-newsletter'
  },

  OAUTH_AFTER_REDIRECT() {
    return `wksch-oauth-redir`;
  },

  handleInvitationCookie (to) {
    if (to.query && to.query.hasOwnProperty('u')) {
      let cookieName = this.INVITE_COOKIE()
      if (!this.check(cookieName)) {
        this.set(cookieName, to.query.u, 15)
      }
    }
  },

  set (cname, cvalue, exdays) {
    let d = new Date()
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000))
    let expires = 'expires=' + d.toUTCString()
    document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/'
  },

  get (cname) {
    var name = cname + '='
    var ca = document.cookie.split(';')
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i]
      while (c.charAt(0) == ' ') {
        c = c.substring(1)
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length)
      }
    }
    return ''
  },

  check (cookieName) {
    var cookie = this.get(cookieName)
    if (cookie !== '') {
      return true
    } else {
      return false
    }
  }
}
