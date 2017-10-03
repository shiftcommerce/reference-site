const express = require('express')
const next = require('next')
const { createReadStream } = require('fs')

// Custom route handlers
const productHandler = require('./routeHandlers/productHandler')
const categoryHandler = require('./routeHandlers/categoryHandler')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()

  server.get('/', (req, res) => {
    return app.render(req, res, '/home/index', req.query)
  })

  server.get('/products/:id', (req, res) => {
    return app.render(req, res, '/products/product', Object.assign(req.query, req.params))
  })

  server.get('/categories/:id', (req, res) => {
    return app.render(req, res, '/categories/category', Object.assign(req.query, req.params))
  })

  server.get('/search', (req, res) => {
    return app.render(req, res, '/search', req.query)
  })

  server.get('/serviceWorker.js', (req, res) => {
    res.setHeader('content-type', 'text/javascript')
    createReadStream('./static/serviceWorker.js').pipe(res)
  })

  // Routes for local API calls
  server.get('/getProduct/:id', productHandler.getProductRenderer(app))
  server.get('/getCategory/:id', categoryHandler.getCategoryRenderer(app))
  server.get('/getCategories', categoryHandler.getCategoriesRenderer(app))

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
