const express = require('express')
const next = require('next')
const { createReadStream } = require('fs')
const bodyParser = require('body-parser')
const session = require('cookie-session')
const cookieParser = require('cookie-parser')
const sslRedirect = require('heroku-ssl-redirect')

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

// Middleware
const securityHeaders = require('./middleware/security-headers')

// Api
const { fetchData } = require('./lib/api-server')

// ShiftNext
const { shiftRoutes } = require('@shiftcommerce/shift-next-routes')

const { getSessionExpiryTime } = require('@shiftcommerce/shift-next')

// Config
const imageHosts = process.env.IMAGE_HOSTS
const scriptHosts = process.env.SCRIPT_HOSTS

module.exports = app.prepare().then(() => {
  const server = express()

  // Remove X-Powered-By: Express header as this could help attackers
  server.disable('x-powered-by')

  const sessionParams = {
    secret: process.env.SESSION_SECRET,
    secure: production,
    sameSite: 'lax',
    expires: getSessionExpiryTime()
  }

  // Unique local IPv6 addresses have the same function as private addresses in IPv4
  // They are unique to the private organization and are not internet routable.
  server.set('trust proxy', 'uniquelocal')

  // server.use(sslRedirect())
  server.use(session(sessionParams))
  server.use(cookieParser(process.env.SESSION_SECRET))
  server.use(bodyParser.json())
  server.use(bodyParser.urlencoded({ extended: true }))
  server.use(securityHeaders({ imageHosts: imageHosts, scriptHosts: scriptHosts }))

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
        const { resource_id } = page.data.data[0].attributes
        const resourceType = page.data.data[0].attributes.resource_type

        switch (resourceType) {
          case 'Product':
            return app.render(req, res, '/product', Object.assign(req.query, { id: resource_id }))
          case 'Category':
            return app.render(req, res, '/category', Object.assign(req.query, { id: resource_id }))
          case 'StaticPage':
            return app.render(req, res, '/staticpage', Object.assign(req.query, { id: resource_id }))
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
    return fetchData(queryObject, url).then(directRouting).catch((error) => { console.log('Error is', error) })
  })

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  return server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
