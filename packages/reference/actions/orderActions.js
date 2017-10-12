// actionTypes
import * as types from './actionTypes'

// Actions
import { postEndpoint } from './apiActions'

// Handler
import { convertCheckoutToOrder } from './handlers/orderHandler'

export function createOrder (cart, checkout) {
  const request = {
    endpoint: `/createOrder`,
    body: convertCheckoutToOrder(cart, checkout),
    successActionType: types.CREATE_ORDER
  }
  return postEndpoint(request)
}
