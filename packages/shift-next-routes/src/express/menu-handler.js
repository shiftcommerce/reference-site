// Libs
const MenuCache = require('../lib/menu-cache')
const { SHIFTClient } = require('@shiftcommerce/shift-node-api')
const { setSurrogateHeaders } = require('../lib/set-cache-headers')

module.exports = {
  getMenu: async (req, res, next, menuCache = new MenuCache()) => {
    let response = {}
    // check preview state and skip caching if `preview: true`
    if (req.query && req.query.preview === 'true') {
      // fetch menus from API and skip caching
      response = await fetchMenuFromAPI(req, res)
    } else {
      // fetch cached menus
      response = await menuCache.read()
      // check if there are no cached menus
      if (!response || Object.keys(response).length === 0) {
        // fetch menus from API
        response = await fetchMenuFromAPI(req, res)
        // cache API response
        menuCache.set(response)
      }
    }
    // set Surrogate headers
    setSurrogateHeaders(response.headers, res)

    switch (response.status) {
      case 404:
        return res.status(200).send({})
      case 422:
        req.log && req.log.error({ status: response.status, errors: response.data.errors })
        return res.status(response.status).send(response.data.errors)
      default:
        return res.status(response.status).send(response.data)
    }
  }
}

const fetchMenuFromAPI = async (req, res) => {
  // fetch menus from API
  const response = await SHIFTClient.getMenusV1(req.query)
  return response
}
