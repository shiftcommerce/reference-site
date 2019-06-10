// actionTypes
import * as types from '../actions/action-types'

const initialState = {
  miniBagDisplayed: false
}

/**
 * Calculate the line items in the cart based on the quantity of each line item
 * @param  {Object} cart
 * @return {Object}
 */
const calculateCartLineItemsCount = (cart) => {
  if (cart.line_items.length === 0) {
    cart.line_items_count = 0
  } else {
    cart.line_items_count = cart.line_items.map(item => item.unit_quantity).reduce((accumulator, currentValue) => accumulator + currentValue)
  }

  return cart
}

export default function setCart (state = initialState, action) {
  let newState = Object.assign({}, state)

  switch (action.type) {
    case types.CART_UPDATED:
      return Object.assign({}, newState, calculateCartLineItemsCount(action.payload))

    case types.SET_ORDER:
      return {}

    case types.TOGGLE_MINIBAG:
      return Object.assign({}, state, { miniBagDisplayed: action.displayed })

    default:
      return newState
  }
}
