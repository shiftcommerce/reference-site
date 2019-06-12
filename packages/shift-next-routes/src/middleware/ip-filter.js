// Libraries
const expressIpfilter = require('express-ipfilter').IpFilter
const IpDeniedError = require('express-ipfilter').IpDeniedError

// Environment variables
const fastlyListFromEnv = process.env.FASTLY_IP_LIST ? process.env.FASTLY_IP_LIST.split(',') : ''
const customListFromEnv = process.env.CUSTOM_IP_LIST ? process.env.CUSTOM_IP_LIST.split(',') : ''

// Enable local requests
const localHostWhitelist = ['::1', '0.0.0.0', '::ffff:127.0.0.1']

const ipFilter = (server) => {
  const whiteList = [
    ...fastlyListFromEnv,
    ...customListFromEnv,
    ...localHostWhitelist,
  ]

  console.log("> IP Whitelisting enabled:", whiteList)

  server.use(expressIpfilter(whiteList, {
    mode: 'allow',
    logLevel: 'deny',
    trustProxy: ['loopback', 'uniquelocal']
  }))

  server.use((err, req, res, next) => {
    if (err instanceof IpDeniedError) {
      res.status(403)
      res.json({
        error: {
          status: 403,
          message: 'IP Address not authorised'
        }
      })
    } else {
      next()
    }
  })
}

module.exports = { ipFilter }
