// actionTypes
import * as types from '../actions/action-types'

export const initialState = {
  loading: true
}

export default function setOrders (state = initialState, action) {
  switch (action.type) {
    case types.GET_ORDER_HISTORY:
      return Object.assign({}, state)

    case types.SET_ORDER_HISTORY:
      return Object.assign({}, state, action.payload, { loading: false })

    default:
      return state
  }
}
