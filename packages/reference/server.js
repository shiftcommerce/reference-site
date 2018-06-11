const express = require('express')
const next = require('next')
const { createReadStream } = require('fs')
const bodyParser = require('body-parser')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const fetchSlugData = require('./requests/fetchSlugDataRequest')

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

  server.get(/^(?!\/_next|\/static).*$/, (req, res) => {
    const slug = req.url

    const directRouting = async (page) => {
      const { resource_id, active } = page.data.data.attributes
      const resourceType = page.data.data.attributes.resource_type

      if (page.status === 200 && active === true) {
        switch (resourceType) {
          case 'Product':
            return app.render(req, res, '/product', Object.assign(req.query, { id: resource_id }))
          case 'Category':
            return app.render(req, res, '/category', Object.assign(req.query, { id: resource_id }))
          case 'StaticPage':
            return app.render(req, res, '/page', Object.assign(req.query, { id: resource_id }))
        }
      }

      if ([301, 302].includes(page.status)) {
        return res.redirect(page.status, page.redirect.destination)
      }

      return handle(req, res)
    }

    return fetchSlugData(slug).then(directRouting)
  })

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
