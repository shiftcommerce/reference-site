const express = require('express')
const compression = require('compression')
const next = require('next')
const bodyParser = require('body-parser')
const session = require('cookie-session')
const cookieParser = require('cookie-parser')
const sslRedirect = require('heroku-ssl-redirect')
const loggingMiddleware = require('express-pino-logger')
const uuid = require('uuid/v4')

// Environment
const production = process.env.NODE_ENV === 'production'
const test = process.env.NODE_ENV === 'test'
const dev = !test && !production

// Use environment to determine port
const standardPort = parseInt(process.env.PORT, 10) || 3000
const testPort = 3001
const port = test ? testPort : standardPort

const app = next({ dir: './client', dev })
const handle = app.getRequestHandler()

// Logger
const logger = require('./lib/logger')

// Api
const { fetchData } = require('./lib/api-server')
const { setSurrogateHeaders } = require('./lib/set-cache-headers')

// ShiftNext
const {
  getSessionExpiryTime,
  shiftContentSecurityPolicy,
  shiftFeaturePolicy,
  shiftRoutes,
  shiftSecurityHeaders,
  shiftLogger
} = require('@shiftcommerce/shift-next-routes')

module.exports = app.prepare().then(() => {
  const server = express()

  server.use(loggingMiddleware({
    logger: logger,
    useLevel: 'trace',
    genReqId: req => { return req.header('x-request-id') || uuid() } // either been told an id already, or create one
  }))

  const secure = (process.env.NO_HTTPS !== 'true')
  const sessionParams = {
    secret: process.env.SESSION_SECRET,
    secure: secure,
    sameSite: 'lax',
    expires: getSessionExpiryTime()
  }

  // Unique local IPv6 addresses have the same function as private addresses in IPv4
  // They are unique to the private organization and are not internet routable.
  server.set('trust proxy', 'uniquelocal')

  if (secure) server.use(sslRedirect())
  server.use(compression())
  server.use(session(sessionParams))
  server.use(cookieParser(process.env.SESSION_SECRET))
  server.use(bodyParser.json())
  server.use(bodyParser.urlencoded({ extended: true }))

  shiftLogger(server, logger)
  shiftContentSecurityPolicy(server, {
    connectHosts: process.env.CONNECT_SCRIPTS,
    frameHosts: process.env.FRAME_HOSTS,
    imageHosts: process.env.IMAGE_HOSTS,
    scriptHosts: process.env.SCRIPT_HOSTS,
    styleHosts: process.env.STYLE_HOSTS
  })
  shiftFeaturePolicy(server)
  shiftSecurityHeaders(server)
  shiftRoutes(server)

  server.get(/^(?!\/_next|\/static).*$/, (req, res) => {
    // @TODO This url sanitiser should be replaced with a whitelist
    // This may be handled by fastly to provided best caching performance
    // See https://docs.fastly.com/vcl/functions/querystring-regfilter-except/
    let slug = req.url.split('?')[0]
    if (slug === '/') {
      slug = '/homepage'
    }

    const directRouting = async (page) => {
      if (page.status === 200 && page.data.data.length !== 0) {
        const resourceId = page.data.data[0].attributes.resource_id
        const resourceType = page.data.data[0].attributes.resource_type

        setSurrogateHeaders(page.headers, res)

        switch (resourceType) {
          case 'Product':
            return app.render(req, res, '/product', Object.assign(req.query, { id: resourceId }))
          case 'Category':
            return app.render(req, res, '/category', Object.assign(req.query, { id: resourceId }))
          case 'StaticPage':
            return app.render(req, res, '/staticpage', Object.assign(req.query, { id: resourceId }))
        }
      }

      if ([301, 302].includes(page.status)) {
        return res.redirect(page.status, page.redirect.destination)
      }

      return handle(req, res)
    }

    const queryObject = {
      filter: {
        path: slug
      },
      page: {
        number: 1,
        size: 1
      },
      fields: {
        slugs: 'resource_type,resource_id,active,slug'
      }
    }

    const url = `${process.env.API_TENANT}/v1/slugs`
    const headers = { 'x-request-id': req.id }
    return fetchData(queryObject, url, headers).then(directRouting).catch((error) => {
      req.log.error(error)
    })
  })

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  return server.listen(port, (err) => {
    if (err) throw err
    logger.info(`Ready on http://localhost:${port}`)
  })
})
