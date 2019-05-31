const { getProductV1 } = require('../../../src/endpoints/product-endpoints')
const nock = require('nock')
const axios = require('axios')
const httpAdapter = require('axios/lib/adapters/http')
const { shiftApiConfig } = require('../../../src/index')

// Fixtures
const productResponse = require('../../fixtures/product-response-payload')

const productDefaultQuery = {
  fields: {
    asset_files: 'id,image_height,image_width,s3_url',
    variants: 'id,meta_attributes,title,description,reference,ewis_eligible,product_id,sku,stock_allocated_level,stock_level,tax_code,stock_available_level,has_assets,price_includes_taxes,available_to_order,price,current_price,picture_url'
  },
  include: 'asset_files,variants,template,meta.*'
}

axios.defaults.adapter = httpAdapter

beforeEach(() => {
  shiftApiConfig.set({
    apiHost: 'http://example.com',
    apiTenant: 'test_tenant'
  })
})

afterEach(() => { nock.cleanAll() })

describe('getProductV1', () => {
  test('returns a product when given a correct id', () => {
    const productId = '172'

    nock(shiftApiConfig.get().apiHost)
      .get(`/${shiftApiConfig.get().apiTenant}/v1/products/${productId}`)
      .query(productDefaultQuery)
      .reply(200, productResponse)

    return getProductV1(productId, productDefaultQuery)
      .then(response => {
        expect(response.status).toEqual(200)
        expect(response.data).toEqual(productResponse)
      })
  })

  test('returns an error with incorrect id', () => {
    const productId = '200000'

    nock(shiftApiConfig.get().apiHost)
      .get(`/${shiftApiConfig.get().apiTenant}/v1/products/${productId}`)
      .query(productDefaultQuery)
      .reply(404, {
        'errors': [
          {
            'title': 'Record not found',
            'detail': 'The record identified by 200000 could not be found.',
            'code': '404',
            'status': '404'
          }
        ],
        'meta': {
          'facets': []
        }
      })

    expect.assertions(2)

    return getProductV1(productId, productDefaultQuery)
      .catch(error => {
        expect(error).toEqual(new Error('Request failed with status code 404'))
        expect(error.response.data.errors[0].title).toEqual('Record not found')
      })
  })
})