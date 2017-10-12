// actionTypes
import * as types from '../actions/actionTypes'

export const cartInitialState = {
  lineItems: []
}

export default function setCart (state = cartInitialState, action) {
  let newState = Object.assign({}, state)
  switch (action.type) {
    case types.UPDATE_CART_LINE_ITEMS:
      newState.lineItems = action.cart.lineItems
      return newState

    case types.STORE_CART:
      return Object.assign({}, state, action.cart)

    case types.INITIATE_CART:
      return cartInitialState

    default:
      return newState
  }
}
