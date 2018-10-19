import * as types from '../actions/action-types'

export const orderHistoryRequest = () => {
  return {
    endpoint: `/orderHistory`,
    query: {
      fields: {
        order_histories: 'account_reference,reference,placed_at,customer,pricing,line_items,shipping_addresses,shipping_methods'
      },
      include: 'customer,shipping_methods,shipping_addresses,billing_addresses,discounts,line_items,line_items.shipping_method,line_items.shipping_address,line_items.discounts,line_items.individual_prices,line_items.individual_prices.discounts,payments.billing_address'
    },
    requestActionType: types.GET_ORDER_HISTORY,
    successActionType: types.SET_ORDER_HISTORY
  }
}
