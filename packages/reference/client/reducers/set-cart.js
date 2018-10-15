// actionTypes
import * as types from '../actions/action-types'

export const cartInitialState = {
  error: false,
  lineItems: [],
  totalQuantity: 0
}

export default function setCart (state = cartInitialState, action) {
  let newState = Object.assign({}, state)
  switch (action.type) {
    case types.UPDATE_CART_LINE_ITEMS:
      newState.lineItems = action.cart.lineItems
      newState.totalQuantity = action.cart.totalQuantity
      return newState

    case types.STORE_CART:
      return Object.assign({}, state, action.cart)

    case types.INITIATE_CART:
      return Object.assign({}, cartInitialState)

    default:
      return newState
  }
}
