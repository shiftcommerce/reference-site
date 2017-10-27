const fetchData = require('./../lib/ApiServer')
const stripe = require('stripe')(process.env.SECRET_STRIPE_API_KEY)

// Product api urls
const api = require('./../constants/apiUrls')

// Fetch product details basing on the product id set in the params
function createOrderRenderer (nextApp) {
  return (req, res) => {
    const body = JSON.parse(req.body.body)
    const orderPayload = body.order_payload
    const cardToken = body.card_token
    const paymentMethod = body.payment_method

    if (paymentMethod === 'card') {
      stripe.charges.create({
        amount: orderPayload.data.attributes.paid_price_inc_tax,
        currency: orderPayload.data.attributes.currency,
        source: cardToken.id,
        capture: false
      }, (err, charge) => {
        if (err) {
          console.log(JSON.stringify(err))
          res.json(err)
        } else {
          orderPayload.data.attributes.transaction = {
            payment_gateway: 'stripe',
            action: 'auth',
            tokens: {
              charge: charge
            },
            amount: orderPayload.data.attributes.paid_price_inc_tax,
            currency: orderPayload.data.attributes.currency
          }
          placeOrder(req, res, orderPayload)
        }
      })
    } else {
      placeOrder(req, res, orderPayload)
    }
  }
}

module.exports = { createOrderRenderer }

function placeOrder (req, res, orderPayload) {
  const baseUrl = `${process.env.API_HOST}${api.CreateOrderUrl}.json_api`
  req.body = orderPayload
  // TODO: Remove this once auth app integrated
  const options = {
    headers: {
      Authorization: `Bearer ${process.env.OMS_ACCESS_TOKEN}`
    }
  }
  fetchData.postData(req, baseUrl, res, options)
}
