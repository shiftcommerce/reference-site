// Libraries
import Cookies from 'js-cookie'

// Actions
import * as actionTypes from './action-types'
import { readEndpoint, postEndpoint } from './api-actions'

const fetchCartRequest = {
  endpoint: '/getCart',
  successActionType: actionTypes.CART_UPDATED
}

export function readCart (options = {}) {
  return (dispatch, getState) => {
    // Only fetch the cart if needed, otherwise do nothing
    if ((Cookies.get('cart') && !getState().cart.id) || options.force) {
      return dispatch(readEndpoint(fetchCartRequest))
    } else {
      return Promise.resolve()
    }
  }
}

const updateLineItemQuantityRequest = (lineItemId, newQuantity) => {
  return {
    endpoint: '/updateLineItem',
    body: { lineItemId, newQuantity },
    successActionType: actionTypes.CART_UPDATED
  }
}

export const deleteLineItemRequest = (lineItemId) => {
  return {
    endpoint: `/deleteLineItem/${lineItemId}`,
    successActionType: actionTypes.CART_UPDATED
  }
}

export function updateLineItemQuantity (lineItemId, newQuantity) {
  return postEndpoint(updateLineItemQuantityRequest(lineItemId, newQuantity))
}

export function deleteLineItem (lineItemId) {
  return postEndpoint(deleteLineItemRequest(lineItemId))
}
