import * as types from '../actions/action-types'

export const customerOrdersRequest = () => {
  return {
    endpoint: `/customerOrders`,
    requestActionType: types.GET_CUSTOMER_ORDERS,
    successActionType: types.SET_CUSTOMER_ORDERS
  }
}
