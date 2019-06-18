const { SHIFTClient } = require('@shiftcommerce/shift-node-api')
const MenuCache = require('../lib/menu-cache')
const { setSurrogateHeaders } = require('../lib/set-cache-headers')

module.exports = {
  getMenu: async (req, res) => {
    // initialize MenuCache client
    const menuCache = new MenuCache()
    // fetch cached menus
    let response = await menuCache.read()
    // check if there are no cached menus
    if (!response || Object.keys(response).length === 0) {
      // fetch menus from API
      response = await SHIFTClient.getMenusV1(req.query)
      // set Surrogate headers
      setSurrogateHeaders(response.headers, res)
      // cache API response
      menuCache.set(response)
    }

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
