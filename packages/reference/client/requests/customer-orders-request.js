import * as types from '../actions/action-types'

export const customerOrdersRequest = () => {
  return {
    endpoint: `/customerOrders`,
    query: {
      fields: {
        customer_orders: 'account_reference,reference,placed_at,customer,pricing,line_items,shipping_addresses,shipping_methods'
      },
      include: 'customer,shipping_methods,shipping_addresses,billing_addresses,discounts,line_items,line_items.shipping_method,line_items.shipping_address,line_items.discounts,line_items.individual_prices,line_items.individual_prices.discounts,payments.billing_address'
    },
    requestActionType: types.GET_CUSTOMER_ORDERS,
    successActionType: types.SET_CUSTOMER_ORDERS
  }
}
