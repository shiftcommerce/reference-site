// Libraries
const expressIpFilter  = require('express-ip-filter')

// Environment variable
const whitelistFromEnv = process.env.IP_WHITELIST ? process.env.IP_WHITELIST.split(',') : ''

// Enable local requests
const localHostWhitelist = ['::1', '0.0.0.0', '::ffff:127.0.0.1']

const ipFilter = (server) => {
  const whiteList = [
    ...whitelistFromEnv,
    ...localHostWhitelist,
  ]

  console.log("> IP Whitelisting enabled: \n", whiteList)

  server.use(expressIpFilter({
    strict: false,
    forbidden: '403: IP Address not authorised',
    filter: whiteList
  }))
}

module.exports = { ipFilter }
