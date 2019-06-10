// actionTypes
import * as types from '../actions/action-types'
import Cookies from 'js-cookie'

const initialState = 0

export default function setCartItemCount (state = initialState , action) {
  switch (action.type) {
    case types.SET_CART_ITEMS_COUNT:
      return action.count

    case types.CART_UPDATED:
      const reducer = (accumulator, currentValue) => accumulator + currentValue
      const total = action.payload.line_items.map(item => item.unit_quantity).reduce(reducer)
      Cookies.set('lineItemsCount', total, { path: '/' })
      return total

    case types.SET_ORDER:
      return 0

    default:
      return state
  }
}
