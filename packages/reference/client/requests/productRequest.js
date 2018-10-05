import * as types from '../actions/actionTypes'

export const productRequest = (productId) => {
  return {
    endpoint: `/getProduct/${productId}`,
    query: {
      include: 'asset_files,variants,bundles,template,meta.*'
    },
    requestActionType: types.GET_PRODUCT,
    successActionType: types.SET_PRODUCT
  }
}
