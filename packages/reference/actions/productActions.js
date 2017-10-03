// actionTypes
import * as types from './actionTypes'

// Actions
import { readEndpoint } from './apiActions'

export function readProduct (productID) {
  const request = {
    endpoint: `/getProduct/${productID}`,
    query: {
      include: 'variants,asset_files'
    },
    successActionType: types.SET_PRODUCT
  }
  return readEndpoint(request)
}
