// actionTypes
import * as actionTypes from '../constants/actionTypes'

export default function setCart (state = { lineItems: [] }, action) {
  let newState = Object.assign({}, state)
  switch (action.type) {
    case actionTypes.UPDATE_CART_LINE_ITEMS:
      newState.lineItems = action.cart.lineItems
      return newState
    case actionTypes.STORE_CART:
      return Object.assign({}, state, action.cart)
  }
  return newState
}
