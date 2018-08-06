const express = require('express')
const next = require('next')
const { createReadStream } = require('fs')
const bodyParser = require('body-parser')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const fetchData = require('./requests/fetchDataRequest')
const api = require('./constants/apiUrls')
const handler = require('./routeHandlers/routeHandler')

app.prepare().then(() => {
  const server = express()

  server.use(bodyParser.json())
  server.use(bodyParser.urlencoded({ extended: true }))

  server.get('/search', (req, res) => {
    return app.render(req, res, '/search', req.query)
  })

  server.get('/slug', (req, res) => {
    return app.render(req, res, '/slug', req.query)
  })

  server.get('/serviceWorker.js', (req, res) => {
    res.setHeader('content-type', 'text/javascript')
    createReadStream('./serviceWorker.js').pipe(res)
  })

  server.get('/getCategory', handler.getRenderer(api.CategoryUrl))
  server.get('/getMenus', handler.getRenderer(api.MenuUrl))
  server.get('/getProduct/:id', handler.getRenderer(api.ProductUrl))
  server.get('/getSlug', handler.getRenderer(api.SlugUrl))
  server.get('/getStaticPage/:id', handler.getRenderer(api.PageUrl))

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

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
