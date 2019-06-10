// actionTypes
import * as types from '../actions/action-types'
import Cookies from 'js-cookie'

const initialState = {
  miniBagDisplayed: false
}

/**
 * Calculate the line items in the cart based on the quantity of each line item
 * @param  {Object} cart
 * @return {Object}
 */
const calculateCartLineItemsCount = (cart) => {
  if (!cart.line_items) {
    return cart
  }

  if (cart.line_items.length === 0) {
    cart.line_items_count = 0
  } else {
    cart.line_items_count = cart.line_items.map(item => item.unit_quantity).reduce((accumulator, currentValue) => accumulator + currentValue)
  }

  return cart
}

/**
 * Set the lineItemsCount cookie
 * @param  {Number} total
 */
const setLineItemCookie = (total) => {
  Cookies.set('lineItemsCount', total, { path: '/' })
}

export default function setCart (state = initialState , action) {
  let newState = Object.assign({}, state)

  switch (action.type) {
    case types.SET_CART_ITEMS_COUNT:
      return Object.assign({}, newState, { line_items_count: action.count })

    case types.CART_UPDATED:
      const newCart = calculateCartLineItemsCount(action.payload)
      setLineItemCookie(newCart.line_items_count)
      return Object.assign({}, newState, newCart)

    case types.SET_ORDER:
      return {}

    case types.TOGGLE_MINIBAG:
      return Object.assign({}, state, { miniBagDisplayed: action.displayed })

    default:
      return newState
  }
}
