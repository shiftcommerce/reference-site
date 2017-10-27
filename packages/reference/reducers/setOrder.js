// actionTypes
import * as types from '../actions/actionTypes'

export const initialState = {
  cardTokenRequested: false,
  cardToken: {},
  paymentError: null,
  loading: true,
  error: false
}

export default function setOrder (state = initialState, action) {
  switch (action.type) {
    case types.CREATE_ORDER:
      return Object.assign({}, state, action.payload)

    case types.REQUEST_CARD_TOKEN:
      return Object.assign({}, state, {cardTokenRequested: action.value})

    case types.SET_CARD_TOKEN:
      return Object.assign({}, state, {cardToken: action.value})

    case types.SET_PAYMENT_ERROR:
      return Object.assign({}, state, {paymentError: action.value})
    default:
      return state
  }
}
