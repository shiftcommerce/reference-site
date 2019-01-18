const { fetchData, postData, patchData, deleteData } = require('./../lib/api-server')

// Product api urls
const { platform } = require('./../constants/api-urls')

function getCartRenderer () {
  return async (req, res) => {
    const cartId = req.signedCookies.cart
    const response = await fetchData({}, platform.CartByIdUrl(cartId))
    return res.status(response.status).send(response.data)
  }
}

function addToCartRenderer () {
  return async (req, res) => {
    const cartId = req.signedCookies.cart

    if (cartId) {
      return addLineItemToExistingCart(req, res, cartId)
    } else {
      return createNewCartWithItem(req, res)
    }
  }
}

async function addLineItemToExistingCart (req, res, cartId) {
  const payload = {
    data: {
      type: 'line_items',
      attributes: {
        cart_id: cartId,
        item_id: req.body.variantId,
        unit_quantity: req.body.quantity,
        item_type: 'Variant'
      }
    }
  }

  await postData(payload, platform.AddToCartUrl(cartId))

  const response = await fetchData({}, platform.CartByIdUrl(cartId))

  return res.status(response.status).send(response.data)
}

async function createNewCartWithItem (req, res) {
  const payload = {
    data: {
      type: 'carts',
      attributes: {
        initial_line_items: [{
          variant_id: req.body.variantId,
          unit_quantity: req.body.quantity
        }]
      }
    }
  }

  let response = await postData(payload, platform.CartUrl)

  if (req.session.customerId) {
    response = await assignCartToCustomer(response.data.data.id, req.session.customerId)
  }

  createCartCookie(res, response)

  return res.status(response.status).send(response.data)
}

function assignCartToCustomer (cartId, customerId) {
  return patchData({
    data: {
      type: 'carts',
      attributes: {
        customer_account_id: customerId
      }
    }
  }, platform.CartByIdUrl(cartId))
}

function createCartCookie (res, response) {
  res.cookie('cart', response.data.data.id, {
    signed: true,
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
  })
}

function updateLineItemRenderer () {
  return async (req, res) => {
    const payload = {
      data: {
        type: 'line_items',
        attributes: {
          unit_quantity: req.body.newQuantity
        }
      }
    }

    const cartId = req.signedCookies.cart
    await patchData(payload, platform.LineItemUrl(cartId, req.body.lineItemId))

    const response = await fetchData({}, platform.CartByIdUrl(cartId))

    return res.status(response.status).send(response.data)
  }
}

function deleteLineItemRenderer () {
  return async (req, res) => {
    const payload = {
      data: {
        type: 'line_items',
        attributes: {
          id: req.params.lineItemId
        }
      }
    }

    const cartId = req.signedCookies.cart
    await deleteData(platform.LineItemUrl(cartId, req.params.lineItemId), payload)

    const response = await fetchData({}, platform.CartByIdUrl(cartId))

    return res.status(response.status).send(response.data)
  }
}

function setCartShippingAddressRenderer () {
  return async (req, res) => {
    const payload = {
      data: {
        type: 'carts',
        attributes: {
          shipping_address_id: req.body.addressId
        }
      }
    }

    const cartId = req.signedCookies.cart
    const response = await patchData(payload, platform.CartByIdUrl(cartId))

    return res.status(response.status).send(response.data)
  }
}

function setCartBillingAddressRenderer () {
  return async (req, res) => {
    const payload = {
      data: {
        type: 'carts',
        attributes: {
          billing_address_id: req.body.addressId
        }
      }
    }

    const cartId = req.signedCookies.cart
    const response = await patchData(payload, platform.CartByIdUrl(cartId))

    return res.status(response.status).send(response.data)
  }
}

function createAddressRenderer () {
  return async (req, res) => {
    const payload = {
      data: {
        type: 'addresses',
        attributes: {
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          address_line_1: req.body.line_1,
          address_line_2: req.body.line_2,
          city: req.body.city,
          country: req.body.country_code,
          postcode: req.body.zipcode
        }
      }
    }

    const response = await postData(payload, platform.AddressesUrl)

    return res.status(response.status).send(response.data)
  }
}

function getShippingMethodsRenderer () {
  return async (req, res) => {
    const response = await fetchData({}, platform.ShippingMethodsUrl)

    return res.status(response.status).send(response.data)
  }
}

function setCartShippingMethodRenderer () {
  return async (req, res) => {
    const payload = {
      data: {
        type: 'carts',
        attributes: {
          shipping_method_id: req.body.shippingMethodId
        }
      }
    }

    const cartId = req.signedCookies.cart
    const response = await patchData(payload, platform.CartByIdUrl(cartId))

    return res.status(response.status).send(response.data)
  }
}

function addCartCouponRenderer () {
  return async (req, res) => {
    const payload = {
      data: {
        type: 'coupons',
        attributes: {
          coupon_code: req.body.couponCode
        }
      }
    }

    const cartId = req.signedCookies.cart

    const response = await postData(payload, platform.CartCouponsUrl(cartId))

    return res.status(response.status).send(response.data)
  }
}

module.exports = {
  getCartRenderer,
  addToCartRenderer,
  updateLineItemRenderer,
  deleteLineItemRenderer,
  setCartBillingAddressRenderer,
  setCartShippingAddressRenderer,
  createAddressRenderer,
  getShippingMethodsRenderer,
  setCartShippingMethodRenderer,
  addCartCouponRenderer
}
