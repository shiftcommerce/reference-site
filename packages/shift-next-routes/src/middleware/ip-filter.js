// Libraries
const ipfilter = require('express-ipfilter').IpFilter
const IpDeniedError = require('express-ipfilter').IpDeniedError

// Environment variables
const fastlyListFromEnv = process.env.FASTLY_IP_LIST ? process.env.FASTLY_IP_LIST.split(',') : ''
const customListFromEnv = process.env.CUSTOM_IP_LIST ? process.env.CUSTOM_IP_LIST.split(',') : ''

// Enable local requests
const localHostWhitelist = [
  '::1', '0.0.0.0', '::ffff:127.0.0.1',
  'loopback', 'linklocal', 'uniquelocal'
]

const mergedWhiteList = [
  ...localHostWhitelist,
  ...fastlyListFromEnv,
  ...customListFromEnv,
]

const herokuFilterMiddlewareErrorHandler = (err, req, res, _next) => {
  if (err instanceof IpDeniedError) {
    res.status(403).json({
      error: {
        status: 403,
        message: 'IP Address not authorised'
      }
    })
  }
}

const herokuFilterMiddleware = (req, res, next) => {
  if (/.herokuapp.com/.test(req.hostname)) {
    console.log('Header', req.headers['x-forwarded-for'])
    console.log('IP:', req.ip)
    console.log('IPS:', req.ips)

    ipfilter(mergedWhiteList, { mode: 'allow', logLevel: 'all', trustProxy: mergedWhiteList })(req, res, next)
  } else {
    next()
  }
}

const ipFilter = (server) => {
  console.log('> IP Whitelisting enabled:', mergedWhiteList)

  server.use(herokuFilterMiddleware)
  server.use(herokuFilterMiddlewareErrorHandler)
}

module.exports = { ipFilter }
