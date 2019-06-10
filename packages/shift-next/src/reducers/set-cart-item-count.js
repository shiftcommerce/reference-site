// actionTypes
import * as types from '../actions/action-types'
import Cookies from 'js-cookie'

const initialState = 0

/**
 * Set the lineItemsCount cookie
 * @param  {Number} total
 */
const setLineItemCookie = (total) => {
  Cookies.set('lineItemsCount', total, { path: '/' })
}

/**
 * Set and return the total items in the cart
 * @param  {Object} state
 * @param  {Object} action
 * @return {Number} - The total items in the cart
 */
export default function setCartItemCount (state = initialState, action) {
  switch (action.type) {
    case types.SET_CART_ITEMS_COUNT:
      return action.count

    case types.CART_UPDATED:
      setLineItemCookie(action.payload.line_items_count)
      return action.payload.line_items_count

    case types.SET_ORDER:
      return 0

    default:
      return state
  }
}
