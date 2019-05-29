// Actions
import { readEndpoint } from './api-actions'
import * as types from './action-types'

const productRequest = (productId) => {
  return {
    endpoint: `/getProduct/${productId}`,
    requestActionType: types.GET_PRODUCT,
    successActionType: types.SET_PRODUCT
  }
}

export function readProduct (productId) {
  return (dispatch) => {
    return dispatch(readEndpoint(productRequest(productId)))
  }
}
