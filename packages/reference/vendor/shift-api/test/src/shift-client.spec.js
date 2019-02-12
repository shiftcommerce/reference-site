const SHIFTClient = require('../../src/shift-client')
const nock = require('nock')
const axios = require('axios')
const httpAdapter = require('axios/lib/adapters/http')

// Fixtures
const menuResponse = require('../fixtures/menu-response-payload')
const menuResponseParsed = require('../fixtures/menu-response-payload-parsed')
const cartResponse = require('../fixtures/new-cart-response')
const cartResponseParsed = require('../fixtures/new-cart-response-parsed')
const slugResponse = require('../fixtures/slug-response')
const slugResponseParsed = require('../fixtures/slug-response-parsed')

axios.defaults.adapter = httpAdapter

afterEach(() => { nock.cleanAll() })

describe('SHIFTClient', () => {
  describe('getMenusV1', () => {
    test('returns a correct response with a valid query', () => {
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
        .get(`/${process.env.API_TENANT}/v1/menus`)
        .query(true)
        .reply(200, menuResponse)

      return SHIFTClient.getMenusV1(query)
        .then(response => {
          expect(response.status).toEqual(200)
          expect(response.data).toEqual(menuResponseParsed)
        })
    })

    test('returns an error when called with an invalid query', () => {
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
        .get(`/${process.env.API_TENANT}/v1/menus`)
        .query(true)
        .reply(500)

      return SHIFTClient.getMenusV1(query)
        .catch(error => {
          expect.assertions(1)
          expect(error).toEqual(new Error('Request failed with status code 500'))
        })
    })
  })

  describe('getCartV1', () => {
    test('fetches cart id from cookie and cart from the api', () => {
      const req = {
        signedCookies: {
          cart: '35'
        }
      }

      nock(process.env.API_HOST)
        .get(`/${process.env.API_TENANT}/v1/carts/35`)
        .reply(200, { cart: 'cart_data' })

      return SHIFTClient.getCartV1(req.signedCookies.cart)
        .then(response => {
          expect(response.status).toEqual(200)
          expect(response.data).toEqual({ cart: 'cart_data' })
        })
    })
  })

  describe('createNewCartWithLineItemV1', () => {
    test('creates a new cart with LineItem', () => {
      const req = {
        signedCookies: {},
        session: {
          customerId: null
        },
        body: {
          variantId: '100',
          quantity: 4
        }
      }

      const res = {
        status: jest.fn(x => ({
          send: {}
        })),
        cookie: jest.fn()
      }

      nock(process.env.API_HOST)
        .post(`/${process.env.API_TENANT}/v1/carts`)
        .reply(201, cartResponse)

      return SHIFTClient.createNewCartWithLineItemV1(req, res)
        .then(response => {
          expect(response.status).toEqual(201)
          expect(response.data).toEqual(cartResponseParsed)
        })
    })

    test('creates a new cart with LineItem then assigns cart to customer if a customerId is present', () => {
      const req = {
        signedCookies: {},
        session: {
          customerId: null
        },
        body: {
          variantId: '100',
          quantity: 4
        }
      }

      const res = {
        status: jest.fn(x => ({
          send: {}
        })),
        cookie: jest.fn()
      }

      nock(process.env.API_HOST)
        .post(`/${process.env.API_TENANT}/v1/carts`)
        .reply(201, { data: { id: '3' } })

      return SHIFTClient.createNewCartWithLineItemV1(req, res)
        .then(response => {
          expect(response.status).toEqual(201)
          expect(response.data).toEqual({ id: '3' })
        })
    })
  })

  describe('addLineItemToCartV1', () => {
    test('adds lineItem to existing cart', () => {
      const cartId = '14'
      const req = {
        body: {
          variantId: '100',
          quantity: 4
        }
      }

      const addLineItemMock = nock(process.env.API_HOST)
        .post(`/${process.env.API_TENANT}/v1/carts/${cartId}/line_items`)
        .reply(201, { cart: 'cart_data' })

      // nock the get request after the post has finished

      nock(process.env.API_HOST)
        .get(`/${process.env.API_TENANT}/v1/carts/${cartId}`)
        .reply(200, { cart: 'cart_data' })

      return SHIFTClient.addLineItemToCartV1(req, {}, cartId)
        .then(response => {
          expect(response.status).toEqual(200)
          expect(response.data).toEqual({ cart: 'cart_data' })
          expect(addLineItemMock.isDone()).toBe(true)
        })
    })
  })

  describe('updateLineItemV1', () => {
    test('updates lineItem quantity to existing cart', () => {
      const cartId = '14'
      const lineItemId = '1'
      const newQuantity = 2

      const updateLineItemMock = nock(process.env.API_HOST)
        .patch(`/${process.env.API_TENANT}/v1/carts/${cartId}/line_items/${lineItemId}`)
        .reply(201)

      // nock the get request after the post has finished

      nock(process.env.API_HOST)
        .get(`/${process.env.API_TENANT}/v1/carts/${cartId}`)
        .reply(200, { cart: 'cart_data' })

      return SHIFTClient.updateLineItemV1(newQuantity, cartId, lineItemId)
        .then(response => {
          expect(response.status).toEqual(200)
          expect(response.data).toEqual({ cart: 'cart_data' })
          expect(updateLineItemMock.isDone()).toBe(true)
        })
    })
  })

  describe('deleteLineItemV1', () => {
    test('updates lineItem quantity to existing cart', () => {
      const cartId = '14'
      const lineItemId = '1'
      const newQuantity = 2

      const updateLineItemMock = nock(process.env.API_HOST)
        .patch(`/${process.env.API_TENANT}/v1/carts/${cartId}/line_items/${lineItemId}`)
        .reply(201)

      // nock the get request after the post has finished

      nock(process.env.API_HOST)
        .get(`/${process.env.API_TENANT}/v1/carts/${cartId}`)
        .reply(200, { cart: 'cart_data' })

      return SHIFTClient.updateLineItemV1(newQuantity, cartId, lineItemId)
        .then(response => {
          expect(response.status).toEqual(200)
          expect(response.data).toEqual({ cart: 'cart_data' })
          expect(updateLineItemMock.isDone()).toBe(true)
        })
    })
  })

  describe('setCartShippingMethodV1', () => {
    test('updates the cart with a shipping address id', () => {
      const cartId = '14'
      const shippingMethodId = '12'

      const updateCartMock = nock(process.env.API_HOST)
        .patch(`/${process.env.API_TENANT}/v1/carts/${cartId}`)
        .reply(200, { cart: 'updated_cart_data' })

      return SHIFTClient.setCartShippingMethodV1(cartId, shippingMethodId)
        .then(response => {
          expect(response.status).toEqual(200)
          expect(response.data).toEqual({ cart: 'updated_cart_data' })
          expect(updateCartMock.isDone()).toBe(true)
        })
    })
  })

  describe('getShippingMethodsV1', () => {
    test('returns shipping methods', () => {
      nock(process.env.API_HOST)
        .get(`/${process.env.API_TENANT}/v1/shipping_methods`)
        .reply(201, { shipping_methods: 'shipping_methods_data' })

      return SHIFTClient.getShippingMethodsV1()
        .then(response => {
          expect(response.status).toEqual(201)
          expect(response.data).toEqual({ shipping_methods: 'shipping_methods_data' })
        })
    })
  })

  describe('createCustomerAddressV1', () => {
    test('creates a new address', () => {
      const req = {
        body: {
          first_name: 'First name',
          last_name: 'Last name',
          line_1: 'Address line 1',
          line_2: 'Address line 2',
          city: 'City',
          country_code: 'Country code',
          zipcode: 'Zipcode'
        }
      }

      nock(process.env.API_HOST)
        .post(`/${process.env.API_TENANT}/v1/addresses`)
        .reply(201, { address: 'new_address_data' })

      return SHIFTClient.createCustomerAddressV1(req)
        .then(response => {
          expect(response.status).toEqual(201)
          expect(response.data).toEqual({ address: 'new_address_data' })
        })
    })
  })

  describe('setCartShippingAddressV1', () => {
    test('updates the cart with a shipping address id', () => {
      const cartId = '35'
      const addressId = '12'

      nock(process.env.API_HOST)
        .patch(`/${process.env.API_TENANT}/v1/carts/${cartId}`)
        .reply(200, { cart: 'updated_cart_data' })

      return SHIFTClient.setCartShippingAddressV1(addressId, cartId)
        .then(response => {
          expect(response.status).toEqual(200)
          expect(response.data).toEqual({ cart: 'updated_cart_data' })
        })
    })
  })

  describe('setCartBillingAddressV1', () => {
    test('updates the cart with a billing address id', () => {
      const cartId = '35'
      const addressId = '12'

      nock(process.env.API_HOST)
        .patch(`/${process.env.API_TENANT}/v1/carts/${cartId}`)
        .reply(200, { cart: 'updated_cart_data' })

      return SHIFTClient.setCartBillingAddressV1(addressId, cartId)
        .then(response => {
          expect(response.status).toEqual(200)
          expect(response.data).toEqual({ cart: 'updated_cart_data' })
        })
    })
  })

  describe('addCartCouponV1', () => {
    test('adds a coupon to cart when coupon code is valid', () => {
      const cartId = '17'
      const couponCode = 'ABC-DISCOUNT-XYZ'

      nock(process.env.API_HOST)
        .post(`/${process.env.API_TENANT}/v1/carts/${cartId}/coupons`)
        .reply(201, { coupon: 'coupon_data' })

      return SHIFTClient.addCartCouponV1(couponCode, cartId)
        .then(response => {
          expect(response.status).toEqual(201)
          expect(response.data).toEqual({ coupon: 'coupon_data' })
        })
    })
  })

  describe('fetchSlugDataV1', () => {
    it('endpoint returns a slug', () => {
      const queryObject = {
        filter: {
          path: 'coffee'
        },
        page: {
          number: 1,
          size: 1
        },
        fields: {
          slugs: 'resource_type,resource_id,active,slug'
        }
      }

      nock(process.env.API_HOST)
        .get(`/${process.env.API_TENANT}/v1/slugs`)
        .query(true)
        .reply(200, slugResponse)

      return SHIFTClient.fetchSlugDataV1(queryObject)
        .then(response => {
          expect(response.status).toEqual(200)
          expect(response.data).toEqual(slugResponseParsed)
        })
    })

    it('endpoint errors with incorrect data and returns console.log', () => {
      const queryObject = {
        filter: {
          path: 'incorrectslug'
        },
        page: {
          size: ''
        },
        fields: {
          slugs: 'resource_type,resource_id,active,slug'
        }
      }

      nock(process.env.API_HOST)
        .get(`/${process.env.API_TENANT}/v1/slugs`)
        .query(queryObject)
        .reply(500)

      return SHIFTClient.fetchSlugDataV1(queryObject)
        .catch(error => {
          expect.assertions(1)
          expect(error).toEqual(new Error('Request failed with status code 500'))
        })
    })
  })
})
