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
const cartHandler = require('./route-handlers/cart-route-handler')
const handler = require('./route-handlers/route-handler')
const orderHandler = require('./route-handlers/order-route-handler')
const customerOrdersHandler = require('./route-handlers/customer-orders-route-handler')
const addressBookHandler = require('./route-handlers/address-book-route-handler')

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
    expires: sessionExpiryTime
  }

  // Unique local IPv6 addresses have the same function as private addresses in IPv4
  // They are unique to the private organization and are not internet routable.
  server.set('trust proxy', 'uniquelocal')

  server.use(sslRedirect())
  server.use(session(sessionParams))
  server.use(cookieParser(process.env.SESSION_SECRET))
  server.use(bodyParser.json())
  server.use(bodyParser.urlencoded({ extended: true }))
  server.use(securityHeaders({ imageHosts: imageHosts, scriptHosts: scriptHosts }))

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
    const { customerId } = req.session
    // If there is a customerId, redirect to my account page.
    if (customerId) {
      res.redirect('/account/myaccount')
    }
    return app.render(req, res, '/account/register', req.query)
  })

  server.get('/account/forgotpassword', (req, res) => {
    return app.render(req, res, '/account/forgotpassword', req.query)
  })

  server.get('/account/logout', (req, res) => {
    req.session = null
    res.clearCookie('signedIn')
    res.clearCookie('cart', { signed: true })
    res.redirect('/')
  })

  server.get('/order', (req, res) => {
    // Context: When a customer successfully places an order via checkout,
    // the redirect to the order confirmation page occurs on the client side.
    // This serverside route is only hit when a full page reload is initiated.
    // As state is lost on page reload, the logic below redirects to Account page
    // where the user can view their order in the order history.
    res.redirect(302, '/account/myaccount')
  })

  server.get('/checkout', (req, res) => {
    return handle(req, res)
  })

  server.get('/serviceWorker.js', (req, res) => {
    res.setHeader('content-type', 'text/javascript')
    createReadStream('./server/service-worker.js').pipe(res)
  })

  // Routes for local API calls
  server.get('/getCategory/:id', handler.getRenderer(platform.CategoryUrl))
  server.get('/getMenus', handler.getRenderer(platform.MenuUrl))
  server.get('/getProduct/:id', handler.getRenderer(platform.ProductUrl))
  server.get('/getSlug', handler.getRenderer(platform.SlugUrl))
  server.get('/getStaticPage/:id', handler.getRenderer(platform.PageUrl))
  server.get('/getAccount', accountHandler.getRenderer(platform.AccountUrl))
  server.get('/customerOrders', customerOrdersHandler.customerOrdersRenderer(oms.customerOrdersUrl))
  server.get('/addressBook', addressBookHandler.addressBookRenderer(platform.AddressBookUrl))

  server.post('/addCartCoupon', cartHandler.addCartCouponRenderer())
  server.post('/addToCart', cartHandler.addToCartRenderer())
  server.post('/createAddress', cartHandler.createAddressRenderer())
  server.post('/deleteLineItem/:lineItemId', cartHandler.deleteLineItemRenderer())
  server.get('/getCart', cartHandler.getCartRenderer())
  server.get('/getShippingMethods', cartHandler.getShippingMethodsRenderer())
  server.post('/setCartBillingAddress', cartHandler.setCartBillingAddressRenderer())
  server.post('/setCartShippingAddress', cartHandler.setCartShippingAddressRenderer())
  server.post('/setShippingMethod', cartHandler.setCartShippingMethodRenderer())
  server.post('/updateLineItem', cartHandler.updateLineItemRenderer())

  server.post('/createOrder', orderHandler.createOrderRenderer())

  server.post('/register', accountHandler.postRenderer(platform.AccountUrl))
  server.post('/login', accountHandler.postRenderer(platform.LoginUrl))

  server.post('/createAddressBookAddress', addressBookHandler.postAddressRenderer(platform.AddressesUrl))
  server.delete(/\/deleteAddress\/*/, addressBookHandler.deleteAddressRenderer(platform.AddressUrl))

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
