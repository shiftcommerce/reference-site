// Libs
const { PayPalClient } = require('../lib/paypal-client')

module.exports = {
  patchOrder: async (req, res) => {
    req.log.debug({
      msg: 'PayPal patchOrder handler',
      args: {
        id: req.body.payPalOrderId,
        ref: req.body.purchaseUnitsReferenceId,
        cart: req.body.cart
       }
    })
    const response = await PayPalClient.patchOrder(
      req.body.payPalOrderID,
      req.body.purchaseUnitsReferenceID,
      req.body.cart
    )
    return res.status(response.status).send(response.data)
  },
  authorizeOrder: async (req, res) => {
    req.log.debug({
      msg: 'PayPal authorizeOrder handler',
      args: {
        id: req.body.payPalOrderId,
       }
    })
    const response = await PayPalClient.authorizeOrder(
      req.body.payPalOrderID
    )
    return res.status(response.status).send(response.data)
  }
}
