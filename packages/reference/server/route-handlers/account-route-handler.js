// Lib
const { fetchData, postData, patchData } = require('../lib/api-server')

// Platform api urls
const { platform } = require('./../constants/api-urls')

function postRenderer (url) {
  return async (req, res) => {
    const response = await postData(req.body, url)
    if (response.status === 201) {
      extractCustomerId(req, response.data.data)

      if (req.session.customerId) await assignCartToUser(req, res)

      return res.status(201).send(response.data)
    } else {
      let errorData
      if (response.status === 422 || response.status === 404) {
        errorData = response.data.errors
      } else {
        errorData = response.data
      }
      return res.status(response.status).send(errorData)
    }
  }
}

function extractCustomerId (req, data) {
  if (data.type === 'customer_accounts') {
    req.session.customerId = data.id
  } else if (data.type === 'customer_account_authentications') {
    req.session.customerId = data.relationships.customer_account.data.id
  }
}

async function assignCartToUser (req, res) {
  const cartId = req.signedCookies.cart
  if (cartId) {
    const payload = {
      data: {
        type: 'carts',
        attributes: {
          customer_account_id: req.session.customerId
        }
      }
    }
    await patchData(payload, platform.CartByIdUrl(cartId))
  // In there is no cart cookie fetch the last user's cart
  } else {
    const customerAccountResponse = await fetchData({}, platform.CustomerAccountUrl(req.session.customerId))

    res.cookie('cart', customerAccountResponse.data.included.find(i => i.type === 'carts').id, {
      signed: true,
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
    })
  }
}

module.exports = { postRenderer }
