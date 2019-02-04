const SHIFTClient = require('../../src/shift-client')
const nock = require('nock')
const axios = require('axios')
const httpAdapter = require('axios/lib/adapters/http')

// Fixtures
const menuResponsePayload = require('../fixtures/menu-response-payload')
const menuResponseParsed = require('../fixtures/menu-response-payload-parsed')

axios.defaults.adapter = httpAdapter

afterEach(() => { nock.cleanAll() })

describe('SHIFTClient', () => {
  describe('getMenusV1', () => {
    test('returns a correct response with a valid query', () => {
      const url = 'v1/menus'
      const query = {
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

      nock(process.env.API_HOST)
        .get(`/${process.env.API_TENANT}/${url}`)
        .query(true)
        .reply(200, menuResponsePayload)

      return expect(SHIFTClient.getMenusV1(query)).resolves.toEqual({ status: 200, data: menuResponseParsed })
    })

    test('returns an error when called with an invalid query', () => {
      const url = 'v1/menus'
      const query = {
        fields: {
          menu_items: 'title,slug,menu_items,item,background_image_link,background_image,published,canonical_path,meta_attributes',
          menus: 'title,reference,updated_at,menu_items'
        },
        filter: {
          filter: {
            reference: {
              e: 'mega-menu'
            }
          }
        },
        include: 'menu_items'
      }

      nock(process.env.API_HOST)
        .get(`/${process.env.API_TENANT}/${url}`)
        .query(true)
        .reply(500)

      return expect(SHIFTClient.getMenusV1(query)).rejects.toEqual(new Error('Request failed with status code 500'))
    })
  })
})
