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

// Session variables
const defaultExpiryInSeconds = 30 * 24 * 60 * 60 // 30 days in seconds
const expiryInSeconds = (process.env.SESSSION_EXPIRY || defaultExpiryInSeconds) // user configured time in seconds
const sessionExpiryTime = new Date(Date.now() + expiryInSeconds * 1000)

// Api
const { fetchData } = require('./lib/api-server')
const { platform, oms } = require('./constants/api-urls')

// Handlers
const accountHandler = require('./route-handlers/account-route-handler')
const handler = require('./route-handlers/route-handler')
const orderHandler = require('./route-handlers/order-route-handler')
const orderHistoryHandler = require('./route-handlers/order-history-route-handler')

// Config
const imageHosts = process.env.IMAGE_HOSTS

module.exports = app.prepare().then(() => {
  const server = express()

  // Remove X-Powered-By: Express header as this could help attackers
  server.disable('x-powered-by')

  const sessionParams = {
    secret: process.env.SESSION_SECRET,
    secure: production,
    sameSite: 'lax',
    expires: sessionExpiryTime
  }

  // Unique local IPv6 addresses have the same function as private addresses in IPv4
  // They are unique to the private organization and are not internet routable.
  server.set('trust proxy', 'uniquelocal')

  server.use(sslRedirect())
  server.use(session(sessionParams))
  server.use(cookieParser())
  server.use(bodyParser.json())
  server.use(bodyParser.urlencoded({ extended: true }))
  server.use(securityHeaders({ imageHosts: imageHosts }))

  server.get('/search', (req, res) => {
    return app.render(req, res, '/search', req.query)
  })

  server.get('/slug', (req, res) => {
    return app.render(req, res, '/slug', req.query)
  })

  server.get('/account/login', (req, res) => {
    const { customerId } = req.session
    const { signedIn } = req.cookies

    // If there is no customerId, clear signedIn cookie and render login.
    if (!customerId) {
      res.clearCookie('signedIn')
      return app.render(req, res, '/account/login', req.query)
    }

    if (customerId && !signedIn) {
      req.session.expires = sessionExpiryTime
      res.cookie('signedIn', true, { expires: sessionExpiryTime })
    }
    res.redirect('/account/myaccount')
  })

  server.get('/account/myaccount', (req, res) => {
    const { customerId } = req.session
    const { signedIn } = req.cookies

    // If there is no customerId, clear signedIn cookie and render login.
    if (!customerId) {
      res.clearCookie('signedIn')
      return app.render(req, res, '/account/login', req.query)
    }

    if (customerId && !signedIn) {
      req.session.expires = sessionExpiryTime
      res.cookie('signedIn', true, { expires: sessionExpiryTime })
    }
    return app.render(req, res, '/account/myaccount', req.query)
  })

  server.get('/account/register', (req, res) => {
    return app.render(req, res, '/account/register', req.query)
  })

  server.get('/account/forgotpassword', (req, res) => {
    return app.render(req, res, '/account/forgotpassword', req.query)
  })

  server.get('/account/logout', (req, res) => {
    req.session = null
    res.clearCookie('signedIn')
    res.redirect('/')
  })

  server.get('/order', (req, res) => {
    return app.render(req, res, '/order')
  })

  server.get('/serviceWorker.js', (req, res) => {
    res.setHeader('content-type', 'text/javascript')
    createReadStream('./server/service-worker.js').pipe(res)
  })

  // Routes for local API calls
  server.get('/getCategory', handler.getRenderer(platform.CategoryUrl))
  server.get('/getMenus', handler.getRenderer(platform.MenuUrl))
  server.get('/getProduct/:id', handler.getRenderer(platform.ProductUrl))
  server.get('/getSlug', handler.getRenderer(platform.SlugUrl))
  server.get('/getStaticPage/:id', handler.getRenderer(platform.PageUrl))
  server.get('/orderHistory', orderHistoryHandler.orderHistoryRenderer(oms.orderHistoryUrl))

  server.post('/createOrder', orderHandler.createOrderRenderer())
  server.post('/register', accountHandler.accountRenderer(platform.RegisterUrl))
  server.post('/login', accountHandler.accountRenderer(platform.LoginUrl))

  server.get(/^(?!\/_next|\/static).*$/, (req, res) => {
    let slug = req.url

    if (slug === '/') {
      slug = '/homepage'
    }

    const directRouting = async (page) => {
      const { resource_id } = page.data.data[0].attributes
      const resourceType = page.data.data[0].attributes.resource_type

      if (page.status === 200) {
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
