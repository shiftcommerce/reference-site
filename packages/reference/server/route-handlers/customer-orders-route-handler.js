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
        customer_orders: 'account_reference,reference,placed_at,line_items,pricing,shipping_methods,shipping_addresses,discounts',
        line_items: 'quantity,sku,pricing,shipping_method,shipping_address,discounts',
        shipping_methods: 'label,price',
        shipping_addresses: 'name,company,lines,city,state,postcode,country',
        discounts: 'label,amount_inc_tax,coupon_code'
      },
      include: 'customer,shipping_methods,shipping_addresses,discounts,line_items,line_items.shipping_method,line_items.shipping_address,line_items.discounts'
    }

    const response = await fetchOmsData(query, url)

    if (response.status === 201) {
      const { data } = response.data

      return res.status(201).send(data)
    } else if (response.status === 422 || response.status === 404) {
      return res.status(response.status).send(response.data.errors)
    } else {
      return res.status(response.status).send(response.data)
    }
  }
}

module.exports = { customerOrdersRenderer }
