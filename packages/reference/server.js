const fetch = require('isomorphic-fetch')
const ServerJsonApiParser = require('./lib/ServerJsonApiParser.js')
const express = require('express')
const next = require('next')
const { createReadStream } = require('fs')
const bodyParser = require('body-parser')

// Custom route handlers
const productHandler = require('./routeHandlers/productRouteHandler')
const categoryHandler = require('./routeHandlers/categoryRouteHandler')
const orderHandler = require('./routeHandlers/orderRouteHandler')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()
  server.use(bodyParser.json())
  server.use(bodyParser.urlencoded({ extended: true }))

  server.get('/', (req, res) => {
    return app.render(req, res, '/', req.query)
  })

  server.get('/search', (req, res) => {
    return app.render(req, res, '/search', req.query)
  })

  server.get('/serviceWorker.js', (req, res) => {
    res.setHeader('content-type', 'text/javascript')
    createReadStream('./serviceWorker.js').pipe(res)
  })

  server.get('/products/:id', (req, res) => {
    return app.render(req, res, '/products/product', Object.assign(req.query, { id: req.params.id }))
  })

  server.get('/categories/:id', (req, res) => {
    return app.render(req, res, '/categories/category', Object.assign(req.query, { id: req.params.id }))
  })

  // Routes for local API calls
  server.get('/getProduct/:id', productHandler.getProductRenderer(app))
  server.get('/getCategory/:id', categoryHandler.getCategoryRenderer(app))
  server.get('/getCategories', categoryHandler.getCategoriesRenderer(app))
  server.post('/createOrder', orderHandler.createOrderRenderer(app))

  // if we need to specify routes e.g /search, they need to be placed above this.
  // Get any route that isn't for static assets or _next
  server.get(/^(?!\/_next|\/static).*$/, (req, res) => {
    const accessToken = process.env.CMS_ACCESS_TOKEN
    const headers = {
      'Content-Type': 'application/vnd.api+json',
      'Accept': 'application/vnd.api+json',
      'Authorization': `Bearer ${accessToken}`
    }

    function directRouting (router) {
      // Set the headers returned from the CMS
      res.set(router.headers)

      if (router.status_code === 200) {
        if (router.page.resource_type === 'Product') {
          return app.render(req, res, '/products/product', Object.assign(req.query, { id: router.page.resource_id }))
        } else if (router.page.resource_type === 'Category') {
          return app.render(req, res, '/categories/category', Object.assign(req.query, { id: router.page.resource_id }))
        }
      } else if (router.status_code === 301 || router.status_code === 302) {
        return res.redirect(router.status_code, router.redirect.destination)
      } else {
        return handle(req, res)
      }
    }

    async function fetchCmsData (url, headers) {
      try {
        let response = await fetch(url, {
          method: 'GET',
          headers: headers,
          timeout: 5000
        })
        if (response.ok) {
          let data = await response.json()
          let router = new ServerJsonApiParser().parse(data)
          return directRouting(router)
        } else {
          throw new Error(response.errors)
        }
      } catch (errors) {
        console.log('Error is', errors)
      }
    }
    fetchCmsData(`${process.env.CMS_API_STAGING_URL}${req.url}?include=page,redirect`, headers)
  })

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
