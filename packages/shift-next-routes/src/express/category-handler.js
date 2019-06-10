const { SHIFTClient } = require('@shiftcommerce/shift-node-api')
const { setSurrogateHeaders } = require('../lib/set-cache-headers')

const categoryApiEndpointQuery = {
  include: 'template'
}

module.exports = {
  getCategory: async (req, res) => {
    const response = await SHIFTClient.getCategoryV1(
      req.params.id,
      { ...req.query, ...categoryApiEndpointQuery } // TODO: revisit as this method wont scale for customisation
    )

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
