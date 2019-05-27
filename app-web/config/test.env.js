'use strict'
const merge = require('webpack-merge')
const devEnv = require('./dev.env')

require('dotenv').config()

module.exports = merge(devEnv, {
  NODE_ENV: '"testing"',
  API_URL: JSON.stringify(process.env.API_URL),
  APP_BRAND: JSON.stringify(process.env.APP_BRAND),
  PAGARME_ENCRYPTION_KEY: JSON.stringify(process.env.PAGARME_ENCRYPTION_KEY),
  RECAPTCHA_SITE_KEY: JSON.stringify(process.env.RECAPTCHA_SITE_KEY),
  LANDING_PAGE_URL: JSON.stringify(process.env.LANDING_PAGE_URL),
  ANALYTICS_ID: JSON.stringify(process.env.ANALYTICS_ID),
  ONESIGNAL_APP_ID: JSON.stringify(process.env.ONESIGNAL_APP_ID),
  AUTH_CLIENT_ID: JSON.stringify(process.env.AUTH_CLIENT_ID),
  AUTH_CLIENT_SECRET: JSON.stringify(process.env.AUTH_CLIENT_SECRET)
})
