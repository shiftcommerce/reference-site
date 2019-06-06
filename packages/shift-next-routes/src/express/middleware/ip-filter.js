// Libraries
const ipfilter = require('express-ipfilter').IpFilter

// Enable local requests
const localHost = '::1,0.0.0.0,::ffff:127.0.0.1'.split(',')

// Whitelist the following IPs
const ipWhitelist = [...process.env.IP_WHITELIST.split(','), ...localHost]

const ipFilter = (server) => {
  server.use(ipfilter(ipWhitelist, { mode: 'allow', logLevel: 'deny' }))

  console.log("> IP's whitelisted", ipWhitelist)

  server.use((error, req, res, _next) => {
    if (error.name === 'IpDeniedError') {
      res.status(401)
    } else {
      res.status(error.status || 500)
    }

    res.json({ error: { message: 'IP not authorised', status: 401 }})
  })
}

module.exports = { ipFilter }
