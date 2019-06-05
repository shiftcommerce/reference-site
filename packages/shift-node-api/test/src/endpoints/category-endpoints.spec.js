const { getCategoryV1 } = require('../../../src/endpoints/category-endpoints')
const nock = require('nock')
const axios = require('axios')
const httpAdapter = require('axios/lib/adapters/http')
const { shiftApiConfig } = require('../../../src/index')

// Fixtures
const categoryResponse = require('../../fixtures/category-response')
const categoryQueryResponse = require('../../fixtures/category-query-response')

const categoryDefaultQuery = {
  fields: {
    asset_files: 's3_url,canonical_path',
    products: 'title,description,slug,canonical_path,reference,asset_files,min_price,max_price,min_current_price,max_current_price,rating,meta_attributes,updated_at',
    variants: 'price,meta_attributes,sku,asset_files',
    category_trees: 'path,slug'
  },
  include: 'asset_files,variants,bundles'
}

axios.defaults.adapter = httpAdapter

beforeEach(() => {
  shiftApiConfig.set({
    apiHost: 'http://example.com',
    apiTenant: 'test_tenant'
  })
})

afterEach(() => { nock.cleanAll() })

describe('getCategoryV1', () => {
  test('returns a category when given a correct id', () => {
    const categoryId = '56'

    nock(shiftApiConfig.get().apiHost)
      .get(`/${shiftApiConfig.get().apiTenant}/v1/category_trees/reference:web/categories/${categoryId}`)
      .query(categoryDefaultQuery)
      .reply(200, categoryResponse)

    return getCategoryV1(categoryId, categoryDefaultQuery)
      .then(response => {
        expect(response.status).toEqual(200)
        expect(response.data).toEqual(categoryResponse)
      })
  })

  test('returns a category with template when given a correct id and query', () => {
    const queryObject = {
      include: 'template'
    }

    nock(shiftApiConfig.get().apiHost)
      .get(`/${shiftApiConfig.get().apiTenant}/v1/category_trees/reference:web/categories/3`)
      .query(queryObject)
      .reply(200, categoryQueryResponse)

    return getCategoryV1(3, queryObject)
      .then(response => {
        expect(response.status).toEqual(200)
        expect(response.data).toEqual(categoryQueryResponse)
      })
  })

  test('endpoint errors with incorrect id and returns console.log', () => {
    nock(shiftApiConfig.get().apiHost)
      .get(`/${shiftApiConfig.get().apiTenant}/v1/category_trees/reference:web/categories/1`)
      .reply(404, {
        errors: [
          {
            title: 'Record not found',
            detail: 'The record identified by 1 could not be found.',
            code: '404',
            status: '404'
          }
        ],
        links: {
          self: '/reference/v1/category_trees/reference:web/categories/1'
        }
      })

    expect.assertions(3)

    return getCategoryV1(1)
      .catch(error => {
        expect(error).toEqual(new Error('Request failed with status code 404'))
        expect(error.response.data.errors[0].title).toEqual('Record not found')
        expect(error.response.data.errors[0].detail).toEqual('The record identified by 1 could not be found.')
      })
  })
})
