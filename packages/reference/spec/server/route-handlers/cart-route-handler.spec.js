import axios from 'axios'
import nock from 'nock'
import httpAdapter from 'axios/lib/adapters/http'

import {
  getCartRenderer,
  addToCartRenderer,
  updateLineItemRenderer,
  deleteLineItemRenderer,
  setCartShippingAddressRenderer,
  setCartBillingAddressRenderer,
  createAddressRenderer,
  getShippingMethodsRenderer,
  setCartShippingMethodRenderer
} from '../../../server/route-handlers/cart-route-handler'

axios.defaults.adapter = httpAdapter

test('getCartRenderer fetches cart id from cookie and cart from the api', async () => {
  const req = {
    signedCookies: {
      cart: '35'
    }
  }

  const send = jest.fn()

  const res = {
    status: jest.fn(x => ({
      send: send
    }))
  }

  nock(process.env.API_HOST)
    .get(`/${process.env.API_TENANT}/v1/carts/35?`)
    .reply(200, { cart: 'cart_data' })

  await getCartRenderer()(req, res)

  expect(res.status).toHaveBeenCalledWith(200)
  expect(send).toHaveBeenCalledWith({ cart: 'cart_data' })
})

describe('addToCartRenderer', () => {
  test('adds to a correct cart when cart cookie is present', async () => {
    const req = {
      signedCookies: {
        cart: '29'
      },
      body: {
        variantId: '100',
        quantity: 4
      }
    }

    const send = jest.fn()

    const res = {
      status: jest.fn(x => ({
        send: send
      }))
    }

    const expectedBody = {
      data: {
        type: 'line_items',
        attributes: {
          cart_id: '29',
          item_id: '100',
          unit_quantity: 4,
          item_type: 'Variant'
        }
      }
    }

    const createLineItemMock = nock(process.env.API_HOST)
      .post(`/${process.env.API_TENANT}/v1/carts/29/line_items`, expectedBody)
      .reply(201)

    const getCartMock = nock(process.env.API_HOST)
      .get(`/${process.env.API_TENANT}/v1/carts/29?`)
      .reply(200, { cart: 'new_cart_data' })

    await addToCartRenderer()(req, res)

    expect(createLineItemMock.isDone()).toBe(true)
    expect(getCartMock.isDone()).toBe(true)
    expect(res.status).toHaveBeenCalledWith(200)
    expect(send).toHaveBeenCalledWith({ cart: 'new_cart_data' })
  })

  test('creates a new cart and a cookie when cookie is not present', async () => {
    const req = {
      signedCookies: {},
      session: {},
      body: {
        variantId: '100',
        quantity: 4
      }
    }

    const send = jest.fn()

    const res = {
      status: jest.fn(x => ({
        send: send
      })),
      cookie: jest.fn()
    }

    const expectedBody = {
      data: {
        type: 'carts',
        attributes: {
          initial_line_items: [{
            variant_id: '100',
            unit_quantity: 4
          }]
        }
      }
    }

    const createCartMock = nock(process.env.API_HOST)
      .post(`/${process.env.API_TENANT}/v1/carts`, expectedBody)
      .reply(201, { data: { id: '3' } })

    await addToCartRenderer()(req, res)

    expect(createCartMock.isDone()).toBe(true)
    expect(res.status).toHaveBeenCalledWith(201)
    const createCookieCall = res.cookie.mock.calls[0]
    expect(createCookieCall[0]).toEqual('cart')
    expect(createCookieCall[1]).toEqual('3')
  })

  test('creates a new cart and updates it with the customer id if one is present in the session', async () => {
    const req = {
      signedCookies: {},
      session: {
        customerId: '123'
      },
      body: {
        variantId: '100',
        quantity: 4
      }
    }

    const res = {
      status: jest.fn(x => ({
        send: jest.fn()
      })),
      cookie: jest.fn()
    }

    const expectedCreateCartBody = {
      data: {
        type: 'carts',
        attributes: {
          initial_line_items: [{
            variant_id: '100',
            unit_quantity: 4
          }]
        }
      }
    }

    const expectedUpdateCartBody = {
      data: {
        type: 'carts',
        attributes: {
          customer_account_id: '123'
        }
      }
    }

    const createCartMock = nock(process.env.API_HOST)
      .post(`/${process.env.API_TENANT}/v1/carts`, expectedCreateCartBody)
      .reply(201, { data: { id: '3' } })

    const updateCartMock = nock(process.env.API_HOST)
      .patch(`/${process.env.API_TENANT}/v1/carts/3`, expectedUpdateCartBody)
      .reply(200, { data: { id: '3' } })

    await addToCartRenderer()(req, res)

    expect(createCartMock.isDone()).toBe(true)
    expect(updateCartMock.isDone()).toBe(true)
  })
})

test('updateLineItemRenderer updates line item quantity', async () => {
  const req = {
    signedCookies: {
      cart: '35'
    },
    body: {
      lineItemId: '40',
      newQuantity: 2
    }
  }

  const send = jest.fn()

  const res = {
    status: jest.fn(x => ({
      send: send
    }))
  }

  const expectedUpdateLineItemPayload = {
    data: {
      type: 'line_items',
      attributes: {
        unit_quantity: 2
      }
    }
  }

  const updateLineItemMock = nock(process.env.API_HOST)
    .patch(`/${process.env.API_TENANT}/v1/carts/35/line_items/40`, expectedUpdateLineItemPayload)
    .reply(201)

  nock(process.env.API_HOST)
    .get(`/${process.env.API_TENANT}/v1/carts/35?`)
    .reply(200, { cart: 'updated_cart_data' })

  await updateLineItemRenderer()(req, res)

  expect(updateLineItemMock.isDone()).toBe(true)
  expect(res.status).toHaveBeenCalledWith(200)
  expect(send).toHaveBeenCalledWith({ cart: 'updated_cart_data' })
})

test('deleteLineItemRenderer updates line item quantity', async () => {
  const req = {
    signedCookies: {
      cart: '35'
    },
    params: {
      lineItemId: '40'
    }
  }

  const send = jest.fn()

  const res = {
    status: jest.fn(x => ({
      send: send
    }))
  }

  const expectedDeleteLineItemPayload = {
    data: {
      type: 'line_items',
      attributes: {
        id: '40'
      }
    }
  }

  const deleteLineItemMock = nock(process.env.API_HOST)
    .delete(`/${process.env.API_TENANT}/v1/carts/35/line_items/40`, expectedDeleteLineItemPayload)
    .reply(201)

  nock(process.env.API_HOST)
    .get(`/${process.env.API_TENANT}/v1/carts/35?`)
    .reply(200, { cart: 'updated_cart_data' })

  await deleteLineItemRenderer()(req, res)

  expect(deleteLineItemMock.isDone()).toBe(true)
  expect(res.status).toHaveBeenCalledWith(200)
  expect(send).toHaveBeenCalledWith({ cart: 'updated_cart_data' })
})

test('setCartShippingAddressRenderer updates the cart with a shipping address id', async () => {
  const req = {
    signedCookies: {
      cart: '35'
    },
    body: {
      addressId: '12'
    }
  }

  const send = jest.fn()

  const res = {
    status: jest.fn(x => ({
      send: send
    }))
  }

  const expectedUpdateCartPayload = {
    data: {
      type: 'carts',
      attributes: {
        shipping_address_id: '12'
      }
    }
  }

  const updateCartMock = nock(process.env.API_HOST)
    .patch(`/${process.env.API_TENANT}/v1/carts/35`, expectedUpdateCartPayload)
    .reply(200, { cart: 'updated_cart_data' })

  await setCartShippingAddressRenderer()(req, res)

  expect(updateCartMock.isDone()).toBe(true)
  expect(res.status).toHaveBeenCalledWith(200)
  expect(send).toHaveBeenCalledWith({ cart: 'updated_cart_data' })
})

test('setCartBillingAddressRenderer updates the cart with a billing address id', async () => {
  const req = {
    signedCookies: {
      cart: '35'
    },
    body: {
      addressId: '12'
    }
  }

  const send = jest.fn()

  const res = {
    status: jest.fn(x => ({
      send: send
    }))
  }

  const expectedUpdateCartPayload = {
    data: {
      type: 'carts',
      attributes: {
        billing_address_id: '12'
      }
    }
  }

  const updateCartMock = nock(process.env.API_HOST)
    .patch(`/${process.env.API_TENANT}/v1/carts/35`, expectedUpdateCartPayload)
    .reply(200, { cart: 'updated_cart_data' })

  await setCartBillingAddressRenderer()(req, res)

  expect(updateCartMock.isDone()).toBe(true)
  expect(res.status).toHaveBeenCalledWith(200)
  expect(send).toHaveBeenCalledWith({ cart: 'updated_cart_data' })
})

test('createAddressRenderer creates a new address', async () => {
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

  const send = jest.fn()

  const res = {
    status: jest.fn(x => ({
      send: send
    }))
  }

  const expectedCreateAddressPayload = {
    data: {
      type: 'addresses',
      attributes: {
        first_name: 'First name',
        last_name: 'Last name',
        address_line_1: 'Address line 1',
        address_line_2: 'Address line 2',
        city: 'City',
        country: 'Country code',
        postcode: 'Zipcode'
      }
    }
  }

  const createAddressMock = nock(process.env.API_HOST)
    .post(`/${process.env.API_TENANT}/v1/addresses`, expectedCreateAddressPayload)
    .reply(201, { address: 'new_address_data' })

  await createAddressRenderer()(req, res)

  expect(createAddressMock.isDone()).toBe(true)
  expect(res.status).toHaveBeenCalledWith(201)
  expect(send).toHaveBeenCalledWith({ address: 'new_address_data' })
})

test('getShippingMethodsRenderer returns shipping methods', async () => {
  const send = jest.fn()

  const res = {
    status: jest.fn(x => ({
      send: send
    }))
  }

  nock(process.env.API_HOST)
    .get(`/${process.env.API_TENANT}/v1/shipping_methods?`)
    .reply(201, { shipping_methods: 'shipping_methods_data' })

  await getShippingMethodsRenderer()({}, res)

  expect(res.status).toHaveBeenCalledWith(201)
  expect(send).toHaveBeenCalledWith({ shipping_methods: 'shipping_methods_data' })
})

test('setCartShippingMethodRenderer updates the cart with a billing address id', async () => {
  const req = {
    signedCookies: {
      cart: '35'
    },
    body: {
      shippingMethodId: '12'
    }
  }

  const send = jest.fn()

  const res = {
    status: jest.fn(x => ({
      send: send
    }))
  }

  const expectedUpdateCartPayload = {
    data: {
      type: 'carts',
      attributes: {
        shipping_method_id: '12'
      }
    }
  }

  const updateCartMock = nock(process.env.API_HOST)
    .patch(`/${process.env.API_TENANT}/v1/carts/35`, expectedUpdateCartPayload)
    .reply(200, { cart: 'updated_cart_data' })

  await setCartShippingMethodRenderer()(req, res)

  expect(updateCartMock.isDone()).toBe(true)
  expect(res.status).toHaveBeenCalledWith(200)
  expect(send).toHaveBeenCalledWith({ cart: 'updated_cart_data' })
})
