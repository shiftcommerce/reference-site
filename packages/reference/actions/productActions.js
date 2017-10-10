// actionTypes
import * as types from './actionTypes'

// Actions
import { readEndpoint } from './apiActions'

export function readProduct (productID) {
  const request = {
    endpoint: `/getProduct/${productID}`,
    query: {
      include: 'categories,variants,asset_files',
      fields: {
        categories: 'id,title',
        variants: 'id,meta_data',
        asset_files: 'url,alt_text'
      }
    },
    successActionType: types.SET_PRODUCT
  }
  return readEndpoint(request)
}
