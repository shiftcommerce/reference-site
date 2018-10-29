// Lib
const { fetchOmsData } = require('./../lib/api-server')

function customerOrdersRenderer (url) {
  return async (req, res) => {
    const query = {
      filter: {
        account_reference: process.env.API_TENANT,
        customer_reference: req.session.customerId
      },
      fields: {
        customer_orders: 'account_reference,reference,placed_at,customer,pricing,line_items,shipping_addresses,shipping_methods'
      },
      include: 'customer,shipping_methods,shipping_addresses,billing_addresses,discounts,line_items,line_items.shipping_method,line_items.shipping_address,line_items.discounts,line_items.individual_prices,line_items.individual_prices.discounts,payments.billing_address'
    }

    const response = await fetchOmsData(query, url)

    if (response.status === 201) {
      const { data } = response.data

      return res.status(201).send(data)
    } else if (response.status === 422 || response.status === 404) {
      const errorData = response.data.errors

      return res.status(response.status).send(errorData)
    } else {
      const errorData = response.data

      return res.status(response.status).send(errorData)
    }
  }
}

module.exports = { customerOrdersRenderer }
