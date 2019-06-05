const { SHIFTClient } = require('@shiftcommerce/shift-node-api')
const { setSurrogateHeaders } = require('../lib/set-cache-headers')

const categoryApiEndpointQuery = {
  fields: {
    asset_files: 's3_url,canonical_path',
    products: 'title,description,slug,canonical_path,reference,asset_files,min_price,max_price,min_current_price,max_current_price,rating,meta_attributes,updated_at',
    variants: 'price,meta_attributes,sku,asset_files',
    category_trees: 'path,slug'
  },
  include: 'asset_files,variants,bundles'
}

module.exports = {
  getCategory: async (req, res) => {
    req.query = { ...req.query, ...categoryApiEndpointQuery }
    const response = await SHIFTClient.getCategoryV1(req.params.id, req.query)

    setSurrogateHeaders(response.headers, res)

    switch (response.status) {
      case 404:
        return res.status(200).send({})
      case 422:
        return res.status(response.status).send(response.data.errors)
      default:
        return res.status(response.status).send(response.data)
    }
  }
}
