const { getMenusV1 } = require('../../../src/endpoints/menu-endpoints')
const nock = require('nock')
const axios = require('axios')
const httpAdapter = require('axios/lib/adapters/http')
const { shiftApiConfig } = require('../../../src/index')

// Fixtures
const menuResponse = require('../../fixtures/menu-response-payload')

const menuDefaultQuery = {
  fields: {
    menu_items: 'title,slug,menu_items,item,background_image_link,background_image,published,canonical_path,meta_attributes',
    menus: 'title,reference,updated_at,menu_items'
  },
  filter: {
    filter: {
      reference: {
        eq: 'mega-menu'
      }
    }
  },
  include: 'menu_items'
}

axios.defaults.adapter = httpAdapter

beforeEach(() => {
  shiftApiConfig.set({
    apiHost: 'http://example.com',
    apiTenant: 'test_tenant'
  })
})

afterEach(() => { nock.cleanAll() })

describe('getMenusV1', () => {
  test('returns a correct response with a valid query', () => {

    nock(shiftApiConfig.get().apiHost)
      .get(`/${shiftApiConfig.get().apiTenant}/v1/menus`)
      .query(menuDefaultQuery)
      .reply(200, menuResponse)

    return getMenusV1(menuDefaultQuery)
      .then(response => {
        expect(response.status).toEqual(200)
        expect(response.data).toEqual(menuResponse)
      })
  })

  test('returns an error when called with an invalid query', () => {

    nock(shiftApiConfig.get().apiHost)
      .get(`/${shiftApiConfig.get().apiTenant}/v1/menus`)
      .query(true)
      .reply(500)

    return getMenusV1(menuDefaultQuery)
      .catch(error => {
        expect(error).toEqual(new Error('Request failed with status code 500'))
      })
  })
})