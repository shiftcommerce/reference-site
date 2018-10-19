const { postData } = require('./../lib/api-server')
const stripe = require('stripe')(process.env.SECRET_STRIPE_API_KEY)

// Product api urls
const api = require('./../constants/api-urls')

function createOrderRenderer () {
  return (req, res) => {
    const body = req.body
    const orderPayload = { data: body.data }
    const cardToken = body.card_token
    const paymentMethod = body.payment_method

    if (paymentMethod === 'card') {
      stripe.charges.create({
        amount: Math.round(orderPayload.data.attributes.total * 100),
        currency: orderPayload.data.attributes.currency,
        source: cardToken.id,
        capture: false
      }, (err, charge) => {
        if (err) {
          console.log(err)
          res.json(err)
        } else {
          orderPayload.data.attributes.payment_transactions_resources = [{
            attributes: {
              payment_gateway_reference: 'secure_trading_payment_pages',
              transaction_type: 'authorisation',
              gateway_response: {
                charge: charge
              },
              status: 'success',
              amount: orderPayload.data.attributes.total,
              currency: orderPayload.data.attributes.currency
            },
            type: 'payment_transactions'
          }]
          orderPayload.data.attributes.ip_address = cardToken.client_ip
          placeOrder(req, res, orderPayload).catch((error) => {
            console.log('Error is ', error)
          })
        }
      })
    } else {
      placeOrder(req, res, orderPayload).catch((error) => {
        console.log('Error is ', error)
      })
    }
  }
}

async function placeOrder (req, res, orderPayload) {
  const url = `${api.CreateOrderUrl}.json_api`
  const response = await postData(orderPayload, url)

  return res.status(201).send(response.data)
}

module.exports = { createOrderRenderer }