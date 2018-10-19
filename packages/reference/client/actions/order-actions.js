// actionTypes
import * as types from './action-types'

// Actions
import { readEndpoint, postEndpoint } from './api-actions'

// Handler
import { convertCheckoutToOrder } from './handlers/order-handler'

// Request
import { orderHistoryRequest } from '../requests/order-history-request'

export function createOrder (cart, checkout, order) {
  const request = {
    endpoint: '/createOrder',
    body: convertCheckoutToOrder(cart, checkout, order),
    requestActionType: types.CREATE_ORDER,
    successActionType: types.SET_ORDER,
    errorActionType: types.ERROR_ORDER
  }
  return postEndpoint(request)
}

export function requestCardToken (boolean) {
  return {
    type: types.REQUEST_CARD_TOKEN,
    value: boolean
  }
}

export function setCardToken (token) {
  return (dispatch, getState) => {
    dispatch({
      type: types.SET_CARD_TOKEN,
      value: token
    })
    dispatch(createOrder(getState().cart, getState().checkout, getState().order))
  }
}

export function setPaymentError (message) {
  return {
    type: types.SET_PAYMENT_ERROR,
    value: message
  }
}

export function setCardErrors (boolean) {
  return {
    type: types.CARD_ERRORS,
    errors: boolean
  }
}

export function getOrderHistoryOverview () {
  return readEndpoint(orderHistoryRequest())
}
